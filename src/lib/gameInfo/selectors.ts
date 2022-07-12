import { selector, selectorFamily } from "recoil";
import { GameMetadata } from "../stats/types/stat";

import { gameInfoAtom } from "./atoms";
import { GameInfo } from "./types";

export const gameInfoState = selector({
  key: "gameInfoAtom",
  get: ({ get }) => get(gameInfoAtom),
});
export const gameInfoByUuidState = selectorFamily<GameInfo, string>({
  key: "gameInfoByUuid",
  get:
    (UUID: string) =>
    ({ get }) => {
      const gameInfo = get(gameInfoAtom).find((gameInfo) => gameInfo.metadata.uuid === UUID);
      console.log("gameInfo:", gameInfo);
      return gameInfo!;
    },
});
export const gameInfoByAccountIdState = selectorFamily<GameMetadata[], string>({
  key: "gameInfoByAccountId",
  get:
    (accountId: string) =>
    ({ get }) => {
      const gameInfo = get(gameInfoAtom)
        .filter((gameInfo) => gameInfo.metadata.accountIds.includes(accountId))
        .map((gameInfo) => gameInfo.metadata);
      console.log("gameInfo:", gameInfo);
      return gameInfo!;
    },
});
