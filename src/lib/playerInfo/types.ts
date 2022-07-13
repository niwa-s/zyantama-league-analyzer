import { Stat } from "../stats";

export type PlayerInfoSlim = {
  team:
    | {
        type: "join";
        name: string;
      }
    | {
        type: "unjoin";
      };
};

export type PlayerInfo = {
  stat: Stat;
  uuids: string[];
} & PlayerInfoSlim;

export type PlayerInfoAtom = {
  [accountId: string]: PlayerInfoSlim;
};
