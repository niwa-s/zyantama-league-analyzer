import { selector, selectorFamily } from "recoil";
import { gameInfoByAccountIdState, gameInfoByUuidState } from "../gameInfo/selectors";
import { Stat, GameResultByPlayer } from "../stats";
import { teamInfoAtom } from "../teamInfo/atoms";
import { teamInfoState } from "../teamInfo/selectors";
import { playerInfoAtom } from "./atoms";
import { PlayerInfo } from "./types";
import { TeamColor } from "@/components/team-setting/TeamAddForm";

export const playerInfoState = selector({
  key: "playerInfo",
  get: ({ get }) => {
    const playerInfoSlim = get(playerInfoAtom);
    const playerInfos: {
      [accountId: string]: PlayerInfo;
    } = {};
    const playerStats = get(playerStatsByAccountIdState);
    const teamInfo = get(teamInfoAtom);
    for (const [accountId, { team }] of Object.entries(playerInfoSlim)) {
      const uuids = get(gameInfoByAccountIdState(accountId)).map((metadata) => metadata.uuid);
      if (uuids.length === 0) continue;
      playerInfos[accountId] = {
        team,
        stat: playerStats[accountId],
        uuids,
        teamColor: team.type === "join" ? teamInfo.get(team.name)?.teamColor : undefined,
      };
    }
    return playerInfos;
  },
});

export const playerStatsByAccountIdState = selector({
  key: "playerStatsByAccountId",
  get: ({ get }) => {
    const playerInfos = get(playerInfoAtom);
    const playerStats: { [accountId: string]: Stat } = {};
    for (let accountId of Object.keys(playerInfos)) {
      const metadatas = get(gameInfoByAccountIdState(accountId));
      let stat = new Stat();
      for (const { uuid } of metadatas) {
        const { metadata } = get(gameInfoByUuidState(uuid));
        console.log("accountId: ", accountId, "uuid: ", uuid, "metadata: ", metadata);
        const playerId = metadata.accountIds.indexOf(accountId);
        console.assert(playerId >= 0, "accountId not found");

        stat = Stat.updateFromEvents(stat, metadata.events, playerId);
      }
      playerStats[accountId] = stat;
    }
    return playerStats;
  },
});

export const TeamUnJoinPlayerInfoState = selector({
  key: "TeamUnJoinPlayerInfo",
  get: ({ get }) => {
    const playerInfo = get(playerInfoState);
    const playerInfoByTeam = Object.values(playerInfo).filter(
      (playerInfo) => playerInfo.team.type === "unjoin",
    );
    return playerInfoByTeam;
  },
});
export const playerInfoByTeamNameState = selector({
  key: "playerInfoByTeamName",
  get: ({ get }) => {
    const playerInfos = get(playerInfoState);
    const playerInfoByTeamName = new Map<string, PlayerInfo[]>();
    Object.values(playerInfos).forEach((playerInfo) => {
      if (playerInfo.team.type === "join") {
        if (!playerInfoByTeamName.has(playerInfo.team.name)) {
          playerInfoByTeamName.set(playerInfo.team.name, []);
        }
        playerInfoByTeamName.get(playerInfo.team.name)!.push(playerInfo);
      }
    });
    return playerInfoByTeamName;
  },
});

type GameDetailByUuidParams = {
  UUID: string;
  accountIds: string[];
};
export const GameDetailByUuidState = selectorFamily<GameResultByPlayer[][], GameDetailByUuidParams>(
  {
    key: "GameDetailByUuid",
    get:
      ({ UUID, accountIds }) =>
      ({ get }) => {
        const playerInfo = get(playerInfoState);
        const players = accountIds.map((accountId) => playerInfo[accountId]);
        const gameDetail = players.map((player) => player.stat.gameResultStore.get(UUID)!);
        return gameDetail;
      },
  },
);
