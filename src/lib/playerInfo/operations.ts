import { useRecoilCallback } from "recoil";
import { Event } from "../stats";
import Stat, { GameMetadata } from "../stats/types/stat";
import { teamInfoAtom } from "../teamInfo/atoms";
import { TeamInfoAtom } from "../teamInfo/types";
import { playerInfoAtom } from "./atoms";
import { PlayerInfo, PlayerInfoAtom } from "./types";

export const useUpdatePlayerStats = () =>
  useRecoilCallback(
    ({ set, snapshot }) =>
      (playerId: number, events: Event[], metadata: GameMetadata) => {
        let preState = snapshot.getLoadable<PlayerInfoAtom>(playerInfoAtom).contents;
        let accountId = metadata.accountIds[playerId];
        console.log("accountId", accountId);

        // クラスの状態を更新するうまい方法がわからない...
        let playerInfo: PlayerInfo = { stat: new Stat(), uuids: [], team: { type: "unjoin" } };

        if (preState[accountId]) {
          playerInfo.stat = Stat.add(playerInfo.stat, preState[accountId].stat);
          playerInfo.uuids = [...preState[accountId].uuids];
        }

        if (!playerInfo.uuids.includes(metadata.uuid)) {
          playerInfo.stat = Stat.updateFromEvents(playerInfo.stat, events, playerId);
          console.log("update playerInfo", playerInfo, preState[accountId]);
          playerInfo.uuids.push(metadata.uuid);
          console.log(`${playerInfo.stat.playerName}:`, playerInfo);
          set(playerInfoAtom, () => ({
            ...preState,
            [accountId]: playerInfo,
          }));
        }
      },
  );
export const useJoinTeam = () =>
  useRecoilCallback(({ set, snapshot }) => (accountId: string, teamName: string) => {
    let preState = snapshot.getLoadable<PlayerInfoAtom>(playerInfoAtom).contents;
    if (!preState[accountId]) {
      return;
    }

    let playerInfo: PlayerInfo = { stat: new Stat(), uuids: [], team: { type: "unjoin"}}
    playerInfo.stat = Stat.add(playerInfo.stat, preState[accountId].stat);
    playerInfo.uuids = [...preState[accountId].uuids];

    let teams = snapshot.getLoadable<TeamInfoAtom>(teamInfoAtom).contents;
    if (teams.get(teamName)) {
      playerInfo.team = { type: "join", name: teamName };
      set(playerInfoAtom, () => ({
        ...preState,
        [accountId]: playerInfo,
      }));
    }
  });
