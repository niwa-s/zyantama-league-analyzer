import { useRecoilCallback } from "recoil";
import { teamInfoAtom } from "./atoms";
import { TeamInfoSlim } from "./types";
import { TeamColor } from "@/components/team-setting/TeamAddForm";

export const useAddTeam = () =>
  useRecoilCallback(({ set }) => (teamName: string, teamColor: TeamColor) => {
    set(
      teamInfoAtom,
      (prev) =>
        new Map<string, TeamInfoSlim>([...prev.entries(), [teamName, { teamName, teamColor }]]),
    );
  });
