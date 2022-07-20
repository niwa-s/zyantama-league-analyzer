import { TeamColor } from "@/components/team-score/TeamAddForm";

export type TeamInfo = {
  teamName: string;
  teamColor: TeamColor;
};
export type TeamInfoAtom = {
  teamNames: Map<string, TeamInfo>;
};
