import { selector, selectorFamily } from "recoil";
import { gameInfoState } from "../gameInfo/selectors";
import { playerInfoByTeamNameState, playerInfoState } from "../playerInfo/selectors";
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
      let stat = new Stat();
      if (playerInfos) {
        for (const playerInfo of playerInfos) {
          stat = Stat.add(stat, playerInfo.stat);
        }
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

type TeamScoresState = [number[][], string[], string[]];
export const teamScoresState = selector<TeamScoresState>({
  key: "teamScores",
  get: ({ get }) => {
    let teamInfo = get(teamInfoState);
    let gameInfo = get(gameInfoState);
    let playerInfo = get(playerInfoState);

    let scores: number[][] = [];
    let teamIds = new Map<string, number>();
    let teamNum = teamInfo.size;
    [...teamInfo].forEach(([teamName, _], i) => {
      teamIds.set(teamName, i);
    });
    console.log("teamIds: ", teamIds);

    let gamelabels = [];
    let idx = 1;
    for (const { metadata } of [...gameInfo.values()].reverse()) {
      const isTeamGame =
        metadata.accountIds.filter((id) => playerInfo[id].team.type === "join").length === 4;
      if (!isTeamGame) continue;

      let curScores = Array(teamNum).fill(0);
      for (const i of [0, 1, 2, 3]) {
        const accountId = metadata.accountIds[i];
        const teamName = (playerInfo[accountId].team as any).name;
        const teamId = teamIds.get(teamName)!;
        const score = metadata.teamPoints[i];

        console.log(
          "metadata:",
          metadata,
          "teamName",
          teamName,
          "score: ",
          score,
          "teamId: ",
          teamId,
        );
        curScores[teamId] = score;
      }
      scores.push(curScores);
      gamelabels.push(`第${idx}試合`);
      idx++;
    }
    for (let i = 1; i < scores.length; i++) {
      for (let j = 0; j < teamNum; j++) {
        scores[i][j] += scores[i - 1][j];
      }
    }
    const teamOrders = [...teamIds.keys()];
    return [scores, gamelabels, teamOrders];
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
