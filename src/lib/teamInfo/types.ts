export type TeamInfo = {
  teamName: string;
  teamColor: string;
};
export type TeamInfoAtom = {
  teamNames: Map<string, TeamInfo>;
};
