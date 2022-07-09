import { useContext } from "react";
import ScoreLineChart from "../ScoreLineChart";
import GameDetailTable from "../gameDetailTable";
import { GameInfoStoreContext } from "@/lib/gameInfoProvider";
import { PlayerInfoContext } from "@/lib/playerInfoProvider";

type Props = {
  UUID: string;
}
export function GameDetail({ UUID }: Props) {
  const { gstoreState, gstoreDispatch } = useContext(GameInfoStoreContext)
  const { pinfoState, pinfoDispatch } = useContext(PlayerInfoContext)
  const gameInfo = gstoreState.info.find(({metadata}) => metadata.uuid === UUID)!
  const playerResults = gameInfo.metadata.accountIds.map(accountId => (
    pinfoState[accountId].stat.gameResultStore.get(UUID)!
  ))
  return (
    <div className="container">
      <ScoreLineChart metadata={gameInfo.metadata} playerResults={playerResults}/>
      <GameDetailTable metadata={gameInfo.metadata} playerResults={playerResults}/>
    </div>
  )
}