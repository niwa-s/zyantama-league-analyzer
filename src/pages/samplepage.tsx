import { ChangeEvent, ChangeEventHandler, useContext, useEffect, useState } from "react";
import StatsTable from "../components/playerStatsTable";
import TeamStatsTable from "@/components/TeamStatsTable";
import { GameDetail } from "@/components/game-detail";
import { GameResult } from "@/components/game-result";
import TeamBoard from "@/components/team-setting";
import { TeamScore } from "@/components/teamScore";
import { useSampleData } from "@/lib/useSampleData";
import { useSubNavbar } from "@/lib/useSubNavbar";

const SamplePage = () => {
  const [gameDetailUUID, setGameDetailUUID] = useState<string>("");

  const [subNavbarLabel, setSubNavbarLabel, SubNavbar] = useSubNavbar(
    ["試合結果", "個人成績", "チーム成績", "チーム設定"],
    gameDetailUUID,
  );

  return (
    <div className="container mx-auto px-4 flex-1">
      <SubNavbar />
      {subNavbarLabel === "試合結果" && <GameResult />}
      {subNavbarLabel === "個人成績" && <StatsTable />}
      {subNavbarLabel === "チーム成績" && <TeamScore />}
      {subNavbarLabel === "チーム設定" && <TeamBoard />}
    </div>
  );
};
export default SamplePage;
