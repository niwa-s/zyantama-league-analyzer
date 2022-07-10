import { Stat } from "../stats";

export type PlayerInfo = {
  stat: Stat;
  uuids: string[];
  team:
    | {
        type: "join";
        name: string;
      }
    | {
        type: "unjoin";
      };
};

export type PlayerInfoAtom = {
  [x: string]: PlayerInfo;
};
