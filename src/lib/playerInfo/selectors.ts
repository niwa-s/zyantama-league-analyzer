import { selector, selectorFamily } from "recoil";
import Stat, { GameResultByPlayer } from "../stats/types/stat";
import { playerInfoAtom } from "./atoms";
import { PlayerInfo } from "./types";

export const playerInfoState = selector({
  key: "playerInfo",
  get: ({ get }) => get(playerInfoAtom),
});

export const TeamUnJoinPlayerInfoState = selector({
  key: "TeamUnJoinPlayerInfo",
  get: ({ get }) => {
    const playerInfo = get(playerInfoState);
    const playerInfoByTeam = Object.values(playerInfo).filter(
      (playerInfo) => playerInfo.team.type === "unjoin",
    );
    return playerInfoByTeam;
  },
});
export const playerInfoByTeamNameState = selector({
  key: "playerInfoByTeamName",
  get: ({ get }) => {
    const playerInfos = get(playerInfoState);
    const playerInfoByTeamName = new Map<string, Stat[]>();
    Object.values(playerInfos).forEach((playerInfo) => {
      if (playerInfo.team.type === "join") {
        if (!playerInfoByTeamName.has(playerInfo.team.name)) {
          playerInfoByTeamName.set(playerInfo.team.name, []);
        }
        playerInfoByTeamName.get(playerInfo.team.name)!.push(playerInfo.stat);
      }
    });
    return playerInfoByTeamName;
  },
});

// チームごとのプレイヤーの情報を取得する

type GameDetailByUuidParams = {
  UUID: string;
  accountIds: string[];
};
export const GameDetailByUuidState = selectorFamily<GameResultByPlayer[][], GameDetailByUuidParams>(
  {
    key: "GameDetailByUuid",
    get:
      ({ UUID, accountIds }) =>
      ({ get }) => {
        const playerInfo = get(playerInfoAtom);
        const players = accountIds.map((accountId) => playerInfo[accountId]);
        const gameDetail = players.map((player) => player.stat.gameResultStore.get(UUID)!);
        return gameDetail;
      },
  },
);
