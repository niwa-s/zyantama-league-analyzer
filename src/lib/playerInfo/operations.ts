import { useRecoilCallback } from "recoil";
import { Event } from "../stats";
import Stat, { GameMetadata } from "../stats/types/stat";
import { playerInfoAtom } from "./atoms";
import { PlayerInfo, PlayerInfoAtom } from "./types";

export const useUpdatePlayerStats = () =>
  useRecoilCallback(
    ({ set, snapshot }) =>
      (playerId: number, events: Event[], metadata: GameMetadata) => {
        let preState = snapshot.getLoadable<PlayerInfoAtom>(playerInfoAtom).contents;
        let accountId = metadata.accountIds[playerId];
        console.log("accountId", accountId);
        let playerInfo: PlayerInfo = { stat: new Stat(), uuids: [] };

        if (preState[accountId]) {
          playerInfo.stat = Stat.add(playerInfo.stat, preState[accountId].stat);
        }
        
        if (!playerInfo.uuids.includes(metadata.uuid)) {
          playerInfo.stat = Stat.updateFromEvents(playerInfo.stat, events, playerId);
          console.log("update playerInfo", playerInfo, preState[accountId]);
          playerInfo.uuids.push(metadata.uuid);
          console.log(`${playerInfo.stat.playerName}:`,playerInfo)
          set(playerInfoAtom, () => ({
            ...preState,
            [accountId]: playerInfo,
          }));
        }
      },
  );
