import { useRecoilValue } from "recoil";
import useSWR from "swr";
import { useAddPaifu } from "./gameInfo/operations";
import { useJoinTeam, useUpdatePlayerStats } from "./playerInfo/operations";
import { playerInfoState } from "./playerInfo/selectors";
import { ConvertToMjaiFormat } from "./stats";
import { useAddTeam } from "./teamInfo/operations";
import { TeamColor } from "@/components/team-score/TeamAddForm";

type useSampleDataReturnType = [() => JSX.Element];
//よくわからない(https://vercel.com/guides/loading-static-file-nextjs-api-route)
const fetcher = (url: any) => fetch(url).then((res) => res.json());
const teams: { name: string; color: TeamColor }[] = [
  {
    name: "アキレス",
    color: "red",
  },
  {
    name: "アトラス",
    color: "indigo",
  },
  {
    name: "ゼウス",
    color: "yellow",
  },
  {
    name: "ヘラクレス",
    color: "green",
  },
];

const players: { accountId: number; teamName: string; playerName: string }[] = [
  { accountId: 67943777, teamName: "アキレス", playerName: "めでたい郡道" },
  { accountId: 69656899, teamName: "アトラス", playerName: "ずんたん　" },
  { accountId: 70720216, teamName: "ゼウス", playerName: "talotso" },
  { accountId: 71170938, teamName: "アキレス", playerName: "たかちゃん　" },
  { accountId: 71937449, teamName: "ヘラクレス", playerName: "松本ですけども" },
  { accountId: 71963011, teamName: "アトラス", playerName: "歌衣メイカ" },
  { accountId: 72012605, teamName: "ヘラクレス", playerName: "千羽黒乃" },
  { accountId: 72024968, teamName: "アトラス", playerName: "白雪レイド" },
  { accountId: 72042909, teamName: "ゼウス", playerName: "鴨神にゅう" },
  { accountId: 72082063, teamName: "ヘラクレス", playerName: "渋谷ハジメ2434" },
  { accountId: 72082516, teamName: "ゼウス", playerName: "天開司@Vtuber" },
  { accountId: 73140269, teamName: "ゼウス", playerName: "ぶぎぼのフラ" },
  { accountId: 75136411, teamName: "ヘラクレス", playerName: "はねるくみちょ" },
  { accountId: 75245417, teamName: "アトラス", playerName: "ルイキャミ" },
  { accountId: 75293431, teamName: "アキレス", playerName: "咲乃もこ" },
  { accountId: 75295925, teamName: "アキレス", playerName: "あまみゃ" },
];

export const useSampleData = () => {
  const playerInfos = useRecoilValue(playerInfoState);
  const { data } = useSWR("/api/hello", fetcher);
  const addPaifu = useAddPaifu();
  const updatePlayerStats = useUpdatePlayerStats();
  const teamAdd = useAddTeam();
  const joinTeam = useJoinTeam();
  const onClick = () => {
    const paifus = (data.data as string[]).map((data) => JSON.parse(data));
    for (const paifu of paifus) {
      const [events, metadata] = ConvertToMjaiFormat(paifu);
      addPaifu(metadata);
      for (const playerId of [0, 1, 2, 3]) {
        updatePlayerStats(playerId, events, metadata);
        console.log(playerInfos);
      }
    }
    for (const { stat } of Object.values(playerInfos)) {
      console.log("id name", stat.playerId, stat.playerName);
    }
    for (const { name, color } of teams) {
      teamAdd(name, color);
    }
    for (const { accountId, teamName } of players) {
      joinTeam(accountId.toString(), teamName);
    }
  };

  return [
    () => (
      <button
        className="bg-blue-500 text-white rounded-full py-1 px-2 hover:bg-blue-300 h-10 w-64"
        onClick={onClick}
      >
        サンプルデータを表示する
      </button>
    ),
  ];
};
