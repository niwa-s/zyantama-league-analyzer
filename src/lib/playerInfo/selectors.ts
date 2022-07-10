import { selector, selectorFamily } from "recoil";
import { GameResultByPlayer } from "../stats/types/stat";
import { playerInfoAtom } from "./atoms";
import { PlayerInfoAtom } from "./types";

export const playerInfoState = selector({
  key: "playerInfoAtom",
  get: ({ get }) => get(playerInfoAtom),
});

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
