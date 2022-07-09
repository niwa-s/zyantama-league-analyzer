import {
  CartesianAxis,
  CartesianGrid,
  Label,
  Legend,
  ReferenceLine,
} from "recharts";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { GameMetadata, GameResultByPlayer } from "../lib/stats/types/stat";

type Props = {
  playerResults: GameResultByPlayer[][];
  metadata: GameMetadata;
};

const ScoreLineChart = ({ playerResults, metadata }: Props) => {
  console.log("scorelinechart", metadata, playerResults)
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
          stroke="#ef4444"
          dot={false}
          strokeWidth={5}
        />
        <Line
          name={metadata.playerNames[1]}
          dataKey={"scores[1]"}
          stroke="#3b82f6"
          dot={false}
          strokeWidth={5}
        />
        <Line
          name={metadata.playerNames[2]}
          dataKey={"scores[2]"}
          stroke="#22c55e"
          dot={false}
          strokeWidth={5}
        />
        <Line
          name={metadata.playerNames[3]}
          dataKey={"scores[3]"}
          stroke="#eab208"
          dot={false}
          strokeWidth={5}
        />
        <ReferenceLine
          y={scores[scores.length - 1].scores[0]}
          label={
            <Label
              position="right"
              value={scores[scores.length - 1].scores[0]}
              style={{ fill: "rgba(239, 68, 68, 1)" }}
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
              style={{ fill: "rgba(59, 130, 246, 1)" }}
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
              style={{ fill: "rgba(34, 197, 94, 1)" }}
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
              style={{ fill: "rgba(234, 178, 8, 1)" }}
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
