import { TrashIcon } from "@heroicons/react/solid";
import { useRecoilValue } from "recoil";
import { TeamAddForm } from "./TeamAddForm";
import { TeamSelectModal } from "./TeamSelectModal";
import { playerInfoByTeamNameState, TeamUnJoinPlayerInfoState } from "@/lib/playerInfo/selectors";
import { teamInfoState } from "@/lib/teamInfo/selectors";

const TeamBoard = () => {
  const teamInfo = useRecoilValue(teamInfoState);
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
        {[...teamInfo.teamNames.values()].map(({ teamName, teamColor }) => (
          <tbody key={teamName} className="border-b">
            <tr>
              <td>{teamName}</td>
              <td>
                {joinPlayerInfo.get(teamName)?.map((playerInfo) => (
                  <div key={playerInfo.playerId}>{playerInfo.playerName}</div>
                ))}
              </td>
              <td>
                <button className="bg-red-500 py-1 pl-2 pr-3 rounded flex items-center text-white font-bold">
                  <TrashIcon className="w-6 h-6 mr-2" />
                  <span>削除</span>
                </button>
              </td>
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
