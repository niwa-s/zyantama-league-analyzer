import { useRecoilCallback } from "recoil";
import { Event } from "../stats";
import Stat, { GameMetadata } from "../stats/types/stat";
import { teamInfoAtom } from "../teamInfo/atoms";
import { TeamInfoAtom } from "../teamInfo/types";
import { playerInfoAtom } from "./atoms";
import { PlayerInfo, PlayerInfoAtom, PlayerInfoSlim } from "./types";

export const useUpdatePlayerStats = () =>
  useRecoilCallback(({ set, snapshot }) => (playerId: number, metadata: GameMetadata) => {
    let preState = snapshot.getLoadable<PlayerInfoAtom>(playerInfoAtom).contents;
    let accountId = metadata.accountIds[playerId];
    console.log("accountId", accountId);

    let playerInfo: PlayerInfoSlim = { team: { type: "unjoin" } };

    set(playerInfoAtom, () => ({
      ...preState,
      [accountId]: playerInfo,
    }));
  });
export const useJoinTeam = () =>
  useRecoilCallback(({ set, snapshot }) => (accountId: string, teamName: string) => {
    let preState = snapshot.getLoadable<PlayerInfoAtom>(playerInfoAtom).contents;
    if (!preState[accountId]) {
      return;
    }

    let playerInfo: PlayerInfoSlim = { team: { type: "unjoin" } };

    let teams = snapshot.getLoadable<TeamInfoAtom>(teamInfoAtom).contents;
    if (teams.get(teamName)) {
      playerInfo.team = { type: "join", name: teamName };
      set(playerInfoAtom, () => ({
        ...preState,
        [accountId]: playerInfo,
      }));
    }
  });
export const useUnJoinTeam = () =>
  useRecoilCallback(({ set, snapshot }) => (accountId: string) => {
    let preState = snapshot.getLoadable<PlayerInfoAtom>(playerInfoAtom).contents;
    if (!preState[accountId]) {
      return;
    }

    let playerInfo: PlayerInfoSlim = { team: { type: "unjoin" } };

    set(playerInfoAtom, () => ({
      ...preState,
      [accountId]: playerInfo,
    }));
  });
