import { selector } from "recoil";
import { teamInfoAtom } from "./atoms"

export const teamInfoState = selector({
    key: "teamInfo",
    get: ({ get }) => get(teamInfoAtom),
})
