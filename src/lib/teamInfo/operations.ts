import { useRecoilCallback } from "recoil";
import { teamInfoAtom } from "./atoms";

export const useAddTeam = () =>
  useRecoilCallback(({ set }) => (teamName: string) => {
    set(teamInfoAtom, (prev) => ({
      ...prev,
      teamNames: prev.teamNames.set(teamName, { teamName, teamColor: "gray" }),
    }));
  });
