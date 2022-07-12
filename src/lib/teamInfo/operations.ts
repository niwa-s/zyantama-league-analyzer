import { useRecoilCallback } from "recoil";
import { teamInfoAtom } from "./atoms";
import { TeamColor } from "@/components/team-score/TeamAddForm";

export const useAddTeam = () =>
  useRecoilCallback(({ set }) => (teamName: string, teamColor: TeamColor) => {
    set(teamInfoAtom, (prev) => ({
      ...prev,
      teamNames: prev.teamNames.set(teamName, { teamName, teamColor }),
    }));
  });
