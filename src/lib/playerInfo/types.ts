import { Stat } from "../stats";
import { TeamColor } from "@/components/team-score/TeamAddForm";

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
  teamColor?: TeamColor;
} & PlayerInfoSlim;

export type PlayerInfoAtom = {
  [accountId: string]: PlayerInfoSlim;
};
