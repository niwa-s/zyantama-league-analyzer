import { Stat } from "../stats";

export type PlayerInfo = {
  stat: Stat;
  uuids: string[];
};

export type PlayerInfoAtom = {
  [x: string]: PlayerInfo;
};
