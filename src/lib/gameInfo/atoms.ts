import { atom } from "recoil";
import { GameInfoAtom } from "./types";

export const gameInfoAtom = atom<GameInfoAtom>({
  key: "gameInfo",
  default: [],
});
