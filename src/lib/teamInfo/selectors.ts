import { selector, selectorFamily } from "recoil";
import { playerInfoByTeamNameState } from "../playerInfo/selectors";
import { Stat } from "../stats";
import { teamInfoAtom } from "./atoms";
import { TeamInfo } from "./types";

export const teamInfoState = selector({
  key: "teamInfo",
  get: ({ get }) => {
    let teamInfoSlim = get(teamInfoAtom);
    let teamInfo = new Map<string, TeamInfo>();
    const playerInfoByTeamName = get(playerInfoByTeamNameState);
    for (const { teamName, teamColor } of teamInfoSlim.values()) {
      const playerInfos = playerInfoByTeamName.get(teamName);
      if (!playerInfos) continue;
      let stat = new Stat();
      for (const playerInfo of playerInfos) {
        stat = Stat.add(stat, playerInfo.stat);
      }
      stat.playerName = teamName;
      teamInfo.set(teamName, {
        teamName,
        teamColor,
        stat,
      });
    }
    return teamInfo;
  },
});

/*
export const teamInfoWithStatState = selector({
  key: "teamInfoWithStat",
  get: ({ get }) => {
    const teamInfo = get(teamInfoState);
    const teamInfos = 
  }
});
export const teamStatState = selector({
  key: "teamStat",
  get: ({ get }) => {
    const playerInfoByTeamName = get(playerInfoByTeamNameState);
    const teamInfo = get(teamInfoState);
    const teamStats = new Map<string, Stat>();
    for (const { teamName } of teamInfo.values()) {
      const playerInfos = playerInfoByTeamName.get(teamName)!;
      let stat = new Stat();
      for (const playerInfo of playerInfos) {
        stat = Stat.add(stat, playerInfo.stat);
      }
      stat.playerName = teamName;
      teamStats.set(teamName, stat);
    }
    return teamStats;
  }
})*/
