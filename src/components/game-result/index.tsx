import { ArrowsExpandIcon, TrashIcon, XIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { Batch } from "../Batch";
import FileInputField from "../fileinput-field";
import { GameDetail } from "../game-detail";
import { useAddPaifu, useRemovePaifu, useToggleShowGameDetail } from "@/lib/gameInfo/operations";
import { gameInfoState } from "@/lib/gameInfo/selectors";
import { playerInfoAtom } from "@/lib/playerInfo/atoms";
import { useUpdatePlayerStats } from "@/lib/playerInfo/operations";
import { playerInfoState } from "@/lib/playerInfo/selectors";
import { ConvertToMjaiFormat } from "@/lib/stats";
import { useSampleData } from "@/lib/useSampleData";

export function GameResult() {
  const [SampleButton] = useSampleData();
  //const { pinfoDispatch, pinfoState } = useContext(PlayerInfoContext);
  const removePaifu = useRemovePaifu();
  const playerInfo = useRecoilValue(playerInfoState);
  const updatePlayerStats = useUpdatePlayerStats();
  const addPaifu = useAddPaifu();
  const toggleShowGameDetail = useToggleShowGameDetail();
  const gameInfo = useRecoilValue(gameInfoState);
  const useHandleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget as HTMLInputElement;
    const files = target.files!;
    for (const file of Object.values(files)) {
      const text = await file.text();
      const [events, metadata] = ConvertToMjaiFormat(JSON.parse(text));
      addPaifu(metadata);
      for (const playerId of [0, 1, 2, 3]) {
        console.log("add player:", metadata.playerNames[playerId]);
        updatePlayerStats(playerId, metadata);
      }
    }
  };
  return (
    <div className="w-full">
      <table className="w-full">
        <thead className="border-b">
          <tr className="text-left">
            <th>日付</th>
            <th>プレイヤー</th>
          </tr>
        </thead>
        {gameInfo.map(({ metadata, showDetail }) => (
          <tbody key={metadata.uuid}>
            <tr className="border-b text-left" key={"game-result" + metadata.uuid}>
              <td className="">{metadata.day}</td>
              <td className="flex flex-wrap">
                {metadata.playerNames.map((playerName, i) => (
                  <div key={playerName} className={`w-1/2`}>
                    {`[${metadata.dannis[i]}]`} {playerName} {`[${metadata.finalScores[i]}]`}
                  </div>
                ))}
              </td>
              <td>
                {showDetail ? (
                  <button
                    onClick={() => {
                      toggleShowGameDetail(metadata.uuid);
                    }}
                    className="bg-red-500 py-2 pl-3 pr-4 rounded flex items-center text-white font-bold hover:bg-red-300"
                  >
                    <XIcon className="w-6 h-6 mr-2" />
                    閉じる
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      toggleShowGameDetail(metadata.uuid);
                    }}
                    className="bg-blue-500 py-2 pl-3 pr-4 rounded flex items-center text-white font-bold hover:bg-blue-300"
                  >
                    <ArrowsExpandIcon className="w-6 h-6 mr-2" />
                    詳細を見る
                  </button>
                )}
              </td>
              <td>
                <button
                  className="bg-red-500 hover:bg-red-300 py-2 pl-3 pr-4 rounded flex items-center text-white font-bold"
                  onClick={() => removePaifu(metadata.uuid)}
                >
                  <TrashIcon className="w-6 h-6 mr-2" />
                  <span>削除</span>
                </button>
              </td>
            </tr>
            {showDetail && (
              <tr className="border-b" key={"game-detail" + metadata.uuid}>
                <td colSpan={5}>
                  <GameDetail UUID={metadata.uuid} />
                </td>
              </tr>
            )}
          </tbody>
        ))}
      </table>
      <div className="flex items-center">
        <div className="flex-1">
          <FileInputField onChange={useHandleFileChange}></FileInputField>
        </div>
        <div className="flex flex-col text-smjustify-center flex-1">
          <div>
            <a
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              rel="noopener noreferrer"
              href="https://twitter.com/shiniki_league_?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
            >
              神域リーグ
            </a>
            の成績を表示します。
          </div>
          <SampleButton />
        </div>
      </div>
    </div>
  );
}
