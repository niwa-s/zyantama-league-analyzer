import { Stat } from "../stats";
import { TeamColor } from "@/components/team-setting/TeamAddForm";

export type TeamInfoSlim = {
  teamName: string;
  teamColor: TeamColor;
};

export type TeamInfo = {
  teamName: string;
  teamColor: TeamColor;
  stat: Stat;
};
export type TeamInfoAtom = Map<string, TeamInfoSlim>;
