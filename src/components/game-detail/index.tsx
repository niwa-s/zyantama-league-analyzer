import { useContext } from "react";
import { useRecoilValue } from "recoil";
import ScoreLineChart from "../ScoreLineChart";
import GameDetailTable from "../gameDetailTable";
import { gameInfoByUuidState } from "@/lib/gameInfo/selectors";
import { playerInfoAtom } from "@/lib/playerInfo/atoms";
import { GameDetailByUuidState } from "@/lib/playerInfo/selectors";

type Props = {
  UUID: string;
};
export function GameDetail({ UUID }: Props) {
  const gameInfo = useRecoilValue(gameInfoByUuidState(UUID));
  console.log("gameInfo:", gameInfo);
  const playerResults = useRecoilValue(
    GameDetailByUuidState({ UUID, accountIds: gameInfo.metadata.accountIds }),
  );
  console.log("playerResults: ", playerResults);
  return (
    <div className="container">
      <ScoreLineChart metadata={gameInfo.metadata} playerResults={playerResults} />
      <GameDetailTable metadata={gameInfo.metadata} playerResults={playerResults} />
    </div>
  );
}
