import { TrashIcon } from "@heroicons/react/solid";
import { useRecoilValue } from "recoil";
import TeamStatsTable from "../TeamStatsTable";
import { TeamAddForm } from "./TeamAddForm";
import { TeamSelectModal } from "./TeamSelectModal";
import { useUnJoinTeam } from "@/lib/playerInfo/operations";
import { playerInfoByTeamNameState, TeamUnJoinPlayerInfoState } from "@/lib/playerInfo/selectors";
import { teamInfoState } from "@/lib/teamInfo/selectors";

const TeamBoard = () => {
  const teamInfo = useRecoilValue(teamInfoState);
  console.log("teamInfo:", teamInfo);
  const unjoinTeam = useUnJoinTeam();
  const joinPlayerInfo = useRecoilValue(playerInfoByTeamNameState);
  const unJoinPlayerInfo = useRecoilValue(TeamUnJoinPlayerInfoState);
  return (
    <div className="w-full">
      <table>
        <thead className="border-b">
          <tr className="text-left">
            <th>チーム名</th>
            <th>メンバー</th>
          </tr>
        </thead>
        {[...teamInfo.values()].map(({ teamName, teamColor }) => (
          <tbody key={teamName} className="border-b">
            <tr>
              <td className={`bg-${teamColor}-200 text-black px-2 text-center`}>{teamName}</td>
              <td>
                {joinPlayerInfo.get(teamName)?.map((playerInfo) => (
                  <div className="flex" key={playerInfo.stat.playerId}>
                    <div className="p-1">{playerInfo.stat.playerName}</div>
                    <button
                      className="bg-red-500 my-1 px-1 rounded flex items-center text-white font-bold hover:bg-red-300"
                      onClick={() => unjoinTeam(playerInfo.stat.playerId)}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </td>
              <td></td>
            </tr>
          </tbody>
        ))}
      </table>
      <TeamAddForm />
      <table>
        <thead>
          <tr>
            <th>チーム未設定のプレイヤー</th>
          </tr>
        </thead>
        <tbody>
          {unJoinPlayerInfo.map(({ stat: { playerId, playerName } }) => (
            <tr key={playerId}>
              <td>{playerName}</td>
              <td>
                <TeamSelectModal accountId={playerId} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TeamBoard;
