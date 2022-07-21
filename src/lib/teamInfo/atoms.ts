import { atom } from "recoil";
import { TeamInfo, TeamInfoAtom } from "./types";

export const teamInfoAtom = atom<TeamInfoAtom>({
  key: "teamInfoAtom",
  default: new Map<string, TeamInfo>(),
});
