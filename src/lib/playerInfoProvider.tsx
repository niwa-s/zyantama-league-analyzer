import { createContext, Dispatch, useReducer, useState } from "react";
import { GameMetadata } from "../lib/stats/types/stat";
import { ConvertToMjaiFormat, Stat, Event } from "./stats";

const PlayerInfoContext = createContext(
  {} as {
    pinfoState: PlayerInfoType;
    pinfoDispatch: Dispatch<PlayerInfoActionType>;
  },
);
type PlayerInfo = {
  stat: Stat;
  uuids: string[];
};
type PlayerInfoType = {
  [K in string]: PlayerInfo;
};
const initialState: PlayerInfoType = {};
type PlayerInfoActionType = {
  type: "UPDATE_PLAYER_STATS";
  payload: {
    playerId: number;
    events: Event[];
    metadata: GameMetadata;
  };
};
function reducer(state: PlayerInfoType, action: PlayerInfoActionType): PlayerInfoType {
  switch (action.type) {
    case "UPDATE_PLAYER_STATS":
      let { playerId, events, metadata } = action.payload;
      let accountId = metadata.accountIds[playerId];
      let playerInfo = null;
      if (!state[accountId]) {
        console.log("new player:", accountId);
        playerInfo = {
          stat: new Stat(),
          uuids: [],
        };
      } else {
        playerInfo = state[accountId];
      }
      if (!playerInfo.uuids.includes(metadata.uuid)) {
        console.log("new data:", metadata.uuid);
        playerInfo.stat = Stat.updateFromEvents(playerInfo.stat, events, playerId);
        playerInfo.uuids.push(metadata.uuid);
        return {
          ...state,
          [accountId]: {
            stat: playerInfo.stat,
            uuids: [...playerInfo.uuids],
          },
        };
      } else {
        return state;
      }
    default:
      return state;
  }
}

type Props = {
  children: React.ReactNode;
};
const PlayerInfoProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <PlayerInfoContext.Provider value={{ pinfoState: state, pinfoDispatch: dispatch }}>
      {children}
    </PlayerInfoContext.Provider>
  );
};
