import { CartesianAxis, CartesianGrid, Label, Legend, ReferenceLine } from "recharts";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useRecoilValue } from "recoil";
import { GameMetadata, GameResultByPlayer } from "../lib/stats/types/stat";
import { TeamColor } from "./team-setting/TeamAddForm";
import { playerInfoState } from "@/lib/playerInfo/selectors";
import { teamInfoState, teamScoresState } from "@/lib/teamInfo/selectors";
import { teamColorToHex } from "@/lib/utils";

const TeamScoreLineChart = () => {
  const [scores, gamelabels, teamOrders] = useRecoilValue(teamScoresState);
  console.log("scores", scores);
  const playerInfo = useRecoilValue(playerInfoState);
  const teamInfo = useRecoilValue(teamInfoState);
  const teamInfos = [...teamInfo].map(([teamName, teamInfo]) => ({
    teamName: teamName,
    teamColor: teamInfo.teamColor,
  }));
  console.log("teamInfos:", teamInfos);
  let chartInfo = [{ scores: Array(teamInfo.size).fill(0), gamelabels: "" }];
  for (let i = 0; i < scores.length; i++) {
    chartInfo.push({
      scores: scores[i],
      gamelabels: gamelabels[i],
    });
  }

  // 5:3
  return (
    //<ResponsiveContainer width="70%" height={500}>
    <LineChart
      className="mx-auto"
      width={1000}
      height={500}
      data={chartInfo}
      margin={{
        top: 20,
        right: 100,
        left: 20,
        bottom: 20,
      }}
    >
      <YAxis />
      <CartesianGrid horizontal={false} />
      {teamInfos.map(({ teamName, teamColor }, i) => {
        return (
          <Line
            key={teamName}
            dataKey={`scores[${i}]`}
            name={teamOrders[i]}
            stroke={teamColorToHex(teamColor)}
            dot={false}
            strokeWidth={5}
          />
        );
      })}
      {teamInfos.map((teamInfo, i) => (
        <ReferenceLine
          key={teamInfo.teamName}
          y={chartInfo[chartInfo.length - 1].scores[i]}
          label={
            <Label
              position="right"
              value={chartInfo[chartInfo.length - 1].scores[i].toFixed(1)}
              style={{ fill: teamColorToHex(teamInfo.teamColor) }}
            />
          }
          strokeWidth={0}
        />
      ))}

      <XAxis dataKey={"gamelabels"} />
      <Legend />
    </LineChart>
    //</ResponsiveContainer>
  );
};
export default TeamScoreLineChart;
/*
<Line
        name={metadata.playerNames[0]}
        dataKey={"scores[0]"}
        stroke={teamColorToHex(playerColors[0]!)}
        dot={false}
        strokeWidth={5}
      />
      <Line
        name={metadata.playerNames[1]}
        dataKey={"scores[1]"}
        stroke={teamColorToHex(playerColors[1]!)}
        dot={false}
        strokeWidth={5}
      />
      <Line
        name={metadata.playerNames[2]}
        dataKey={"scores[2]"}
        stroke={teamColorToHex(playerColors[2]!)}
        dot={false}
        strokeWidth={5}
      />
      <Line
        name={metadata.playerNames[3]}
        dataKey={"scores[3]"}
        stroke={teamColorToHex(playerColors[3]!)}
        dot={false}
        strokeWidth={5}
      />
      

      <ReferenceLine
        y={scores[scores.length - 1].scores[0]}
        label={
          <Label
            position="right"
            value={scores[scores.length - 1].scores[0]}
            style={{ fill: teamColorToHex(playerColors[0]!) }}
          />
        }
        strokeWidth={0}
      />
      <ReferenceLine
        y={scores[scores.length - 1].scores[1]}
        label={
          <Label
            position="right"
            value={scores[scores.length - 1].scores[1]}
            style={{ fill: teamColorToHex(playerColors[1]!) }}
          />
        }
        strokeWidth={0}
      />
      <ReferenceLine
        y={scores[scores.length - 1].scores[2]}
        label={
          <Label
            position="right"
            value={scores[scores.length - 1].scores[2]}
            style={{ fill: teamColorToHex(playerColors[2]!) }}
          />
        }
        strokeWidth={0}
      />
      <ReferenceLine
        y={scores[scores.length - 1].scores[3]}
        label={
          <Label
            position="right"
            value={scores[scores.length - 1].scores[3]}
            style={{ fill: teamColorToHex(playerColors[3]!) }}
          />
        }
        strokeWidth={0}
      />
*/
