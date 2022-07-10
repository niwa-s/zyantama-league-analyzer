import { ChangeEvent, ChangeEventHandler, useContext, useEffect, useState } from "react";
import StatsTable from "../components/playerStatsTable";
import { GameDetail } from "@/components/game-detail";
import { GameResult } from "@/components/game-result";
import TeamBoard from "@/components/team-score";
import { useSubNavbar } from "@/lib/useSubNavbar";

const SamplePage = () => {
  const [gameDetailUUID, setGameDetailUUID] = useState<string>("");

  const [subNavbarLabel, setSubNavbarLabel, SubNavbar] = useSubNavbar(
    ["試合結果", "個人成績", "チーム成績", "試合詳細"],
    gameDetailUUID,
  );

  return (
    <div className="container mx-auto px-4 flex-1">
      <SubNavbar />
      {subNavbarLabel === "試合結果" && <GameResult />}
      {subNavbarLabel === "個人成績" && <StatsTable />}
      {subNavbarLabel === "チーム成績" && <TeamBoard />}
      {subNavbarLabel === "試合詳細" && <GameDetail UUID={gameDetailUUID} />}
    </div>
  );
};
export default SamplePage;
