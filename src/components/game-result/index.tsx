import { TrashIcon } from "@heroicons/react/solid";
import { useRecoilValue } from "recoil";
import FileInputField from "../fileinput-field";
import { GameDetail } from "../game-detail";
import { useAddPaifu, useToggleShowGameDetail } from "@/lib/gameInfo/operations";
import { gameInfoState } from "@/lib/gameInfo/selectors";
import { playerInfoAtom } from "@/lib/playerInfo/atoms";
import { useUpdatePlayerStats } from "@/lib/playerInfo/operations";
import { ConvertToMjaiFormat } from "@/lib/stats";

export function GameResult() {
  //const { pinfoDispatch, pinfoState } = useContext(PlayerInfoContext);
  const playerInfo = useRecoilValue(playerInfoAtom);
  const updatePlayerStats = useUpdatePlayerStats();
  const addPaifu = useAddPaifu();
  const toggleShowGameDetail = useToggleShowGameDetail();
  const gameInfo = useRecoilValue(gameInfoState);
  console.log("pstorestate:", playerInfo);
  const useHandleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget as HTMLInputElement;
    const files = target.files!;
    for (const file of Object.values(files)) {
      const text = await file.text();
      const [events, metadata] = ConvertToMjaiFormat(JSON.parse(text));
      addPaifu(metadata);
      for (const playerId of [0, 1, 2, 3]) {
        console.log("add player:", metadata.playerNames[playerId]);
        updatePlayerStats(playerId, events, metadata);
        /*
        pinfoDispatch({
          type: "UPDATE_PLAYER_STATS",
          payload: {
            playerId,
            events,
            metadata,
          },
        });*/
      }
    }
  };
  //console.log(pinfoState);
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
                {metadata.playerNames.map((playerName) => (
                  <div key={playerName} className="w-1/2">
                    {playerName}
                  </div>
                ))}
              </td>
              <td>
                <button
                  onClick={() => {
                    toggleShowGameDetail(metadata.uuid);
                  }}
                >
                  詳細ページ
                </button>
              </td>
              <td>
                <button className="bg-red-500 py-2 pl-3 pr-4 rounded flex items-center text-white font-bold">
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
      <FileInputField onChange={useHandleFileChange}></FileInputField>
    </div>
  );
}
