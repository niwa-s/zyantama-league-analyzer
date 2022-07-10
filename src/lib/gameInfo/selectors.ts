import { selector, selectorFamily } from "recoil";

import { gameInfoAtom } from "./atoms";
import { GameInfo } from "./types";

export const gameInfoState = selector({
  key: "gameInfoAtom",
  get: ({ get }) => get(gameInfoAtom),
});
export const gameInfoByUuid = selectorFamily<GameInfo, string>({
  key: "gameInfoByUuid",
  get:
    (UUID: string) =>
    ({ get }) => {
      const gameInfo = get(gameInfoAtom).find((gameInfo) => gameInfo.metadata.uuid === UUID);
      return gameInfo!;
    },
});
