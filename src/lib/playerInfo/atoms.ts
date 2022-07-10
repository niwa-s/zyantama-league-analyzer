import { atom } from "recoil";
import { PlayerInfoAtom } from "./types";

export const playerInfoAtom = atom<PlayerInfoAtom>({
  key: "playerInfoAtom",
  default: {},
});
