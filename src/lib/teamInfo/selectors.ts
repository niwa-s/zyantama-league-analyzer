import { selector, selectorFamily } from "recoil";
import { teamInfoAtom } from "./atoms";

export const teamInfoState = selector({
  key: "teamInfo",
  get: ({ get }) => get(teamInfoAtom),
});
export const teamInfoByTeamNameState = selector({
  key: "teamColorByTeamName",
  get: ({ get }) => {
    const teamInfo = get(teamInfoAtom);
    const map = teamInfo.teamNames;
    return map;
  },
});
