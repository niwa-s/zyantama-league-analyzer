import { useRecoilValue } from "recoil";
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

/*

メモ: これでサンプルファイルを読み込める
const dir = path.join(process.cwd(), 'siniki-paifu');
fs.readdir(dir, (e,file) => {
  console.log(file)
}

*/
const fileNames: string[] = [
  "mahjongsoul_paifu_220508-33d67351-5ec4-4799-9a26-a78c1da05b4f.json",
  "mahjongsoul_paifu_220508-63f4659a-3256-45ef-9573-df6812d6e4ad.json",
  "mahjongsoul_paifu_220508-64b55c21-c560-47e2-b417-ffb4d800e7ff.json",
  "mahjongsoul_paifu_220523-c96156c3-504d-4e9c-b162-6ff0e703cabb.json",
  "mahjongsoul_paifu_220523-df66bbd9-f8db-4ea5-94df-2f27f2d33a6d.json",
  "mahjongsoul_paifu_220523-f8180ee9-698c-4942-9cd1-1c9c1f4eba1d.json",
  "mahjongsoul_paifu_220606-92e8b75e-ec12-4471-b9f8-538f47065f98.json",
  "mahjongsoul_paifu_220606-bc946b78-2e32-42be-9113-36a7b71d523b.json",
  "mahjongsoul_paifu_220606-e76631ee-d137-40f9-8a58-0c7b202d1aa8.json",
  "mahjongsoul_paifu_220620-273cc7e4-2a8b-4f20-96e7-b5a926514f65.json",
  "mahjongsoul_paifu_220620-43eea012-01f1-4cff-b724-c8f22c10eaba.json",
  "mahjongsoul_paifu_220620-7a09105a-cfd9-445a-b11b-22f27596f129.json",
  "mahjongsoul_paifu_220704-1a8972e8-6c0f-4c8d-9e4f-f1225cee421f.json",
  "mahjongsoul_paifu_220704-3035b7e8-89af-40d5-8ee7-645a002e953d.json",
  "mahjongsoul_paifu_220704-ea2cdae9-08a6-4c31-bf6d-c6dd45f21623.json",
];

export const useSampleData = () => {
  const paifus: string[] = [];
  // 本当は読み込み完了を待つ必要があるけど、ボタンが押される前には完了していそう？
  fileNames.forEach((fileName) => {
    import(`../../siniki-paifu/${fileName}`).then((res) => {
      paifus.push(res.default as string);
    });
  });
  const playerInfos = useRecoilValue(playerInfoState);
  const addPaifu = useAddPaifu();
  const updatePlayerStats = useUpdatePlayerStats();
  const teamAdd = useAddTeam();
  const joinTeam = useJoinTeam();
  const onClick = () => {
    //const paifus = (data.data as string[]).map((data) => JSON.parse(data));
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
