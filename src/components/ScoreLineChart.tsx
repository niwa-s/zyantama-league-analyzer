import { CartesianAxis, CartesianGrid, Label, Legend, ReferenceLine } from "recharts";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useRecoilValue } from "recoil";
import { GameMetadata, GameResultByPlayer } from "../lib/stats/types/stat";
import { TeamColor } from "./team-score/TeamAddForm";
import { playerInfoState } from "@/lib/playerInfo/selectors";
import { teamColorToHex } from "@/lib/utils";

type Props = {
  playerResults: GameResultByPlayer[][];
  metadata: GameMetadata;
};

const ScoreLineChart = ({ playerResults, metadata }: Props) => {
  const playerInfo = useRecoilValue(playerInfoState);
  let scores = [{ scores: [25000, 25000, 25000, 25000], roundInfo: "" }];
  for (let i = 0; i < playerResults[0].length; i++) {
    scores.push({
      scores: [0, 1, 2, 3].map((pId) => playerResults[pId][i].score),
      roundInfo: playerResults[0][i].kyoku!.slice(0, 2),
    });
  }

  for (let i = scores.length - 1; i > 1; i--) {
    if (scores[i].roundInfo === scores[i - 1].roundInfo) {
      scores[i].roundInfo = "";
    }
  }
  let playerColors = metadata.accountIds.map((accountId) => playerInfo[accountId].teamColor);
  for (let i of [0, 1, 2, 3]) {
    for (const color of ["red", "indigo", "green", "yellow"] as TeamColor[]) {
      if (!playerColors[i] && playerColors.filter((c) => c === color).length === 0) {
        playerColors[i] = color;
        break;
      }
    }
  }

  // 5:3
  return (
    //<ResponsiveContainer width="70%" height={500}>
    <LineChart
      className="mx-auto"
      width={900}
      height={500}
      data={scores}
      margin={{
        top: 20,
        right: 80,
        left: 20,
        bottom: 20,
      }}
    >
      <YAxis />
      <CartesianGrid horizontal={false} />
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
      <XAxis dataKey={"roundInfo"} />
      <Legend />
    </LineChart>
    //</ResponsiveContainer>
  );
};
export default ScoreLineChart;
