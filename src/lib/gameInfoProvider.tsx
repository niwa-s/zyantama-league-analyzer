import React, { createContext, Dispatch } from "react";
import { GameMetadata } from "./stats/types/stat";

export const GameInfoStoreContext = createContext(
  {} as {
    gstoreState: GameInfoStoreState;
    gstoreDispatch: Dispatch<GameInfoStoreAction>;
  }
);
type GameInfoStoreState = {
  info: { metadata: GameMetadata; showDetail: boolean }[];
};
type GameInfoStoreAction =
  | {
      type: "ADD_PAIFU";
      payload: GameMetadata;
    }
  | {
      type: "TOGGLE_SHOW_DETAIL";
      payload: {
        uuid: string;
      };
    };

function reducer(
  state: GameInfoStoreState,
  action: GameInfoStoreAction
): GameInfoStoreState {
  switch (action.type) {
    case "ADD_PAIFU":
      if (
        state.info.findIndex(
          ({ metadata }) => metadata.timestamp === action.payload.timestamp
        ) !== -1
      ) {
        return state;
      }
      let newInfo = [
        ...state.info,
        { metadata: action.payload, showDetail: false },
      ];
      newInfo.sort((a, b) => {
        return a.metadata.timestamp > b.metadata.timestamp ? 1 : -1;
      });
      console.log("newInfo:", newInfo);
      return {
        info: newInfo,
      };
    case "TOGGLE_SHOW_DETAIL":
      let toggledInfo = state.info.map((info) => {
        if (info.metadata.uuid === action.payload.uuid) {
          return {
            ...info,
            showDetail: !info.showDetail,
          };
        } else {
          return info;
        }
      })
      toggledInfo.sort((a, b) => {
        return a.metadata.timestamp > b.metadata.timestamp ? 1 : -1;
      });
      return {
        info: toggledInfo
      };
    default:
      return state;
  }
}

type Props = {
  children: React.ReactNode;
};

export function PaifuStoreProvider({ children }: Props) {
  const [state, dispatch] = React.useReducer(reducer, {
    info: [],
  });
  return (
    <GameInfoStoreContext.Provider
      value={{ gstoreState: state, gstoreDispatch: dispatch }}
    >
      {children}
    </GameInfoStoreContext.Provider>
  );
}
