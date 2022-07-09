import { TrashIcon } from "@heroicons/react/solid";
import { useContext, useState } from "react";
import FileInputField from "../fileinput-field";
import { GameDetail } from "../game-detail";
import { GameInfoStoreContext } from "@/lib/gameInfoProvider";
import { PlayerInfoContext } from "@/lib/playerInfoProvider";
import { ConvertToMjaiFormat } from "@/lib/stats";

export function GameResult() {
  const { pinfoDispatch, pinfoState } = useContext(PlayerInfoContext);
  const { gstoreDispatch, gstoreState } = useContext(GameInfoStoreContext);
  console.log("pstorestate:", gstoreState);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const target = event.currentTarget as HTMLInputElement;
    const files = target.files!;
    for (const file of Object.values(files)) {
      const text = await file.text();
      const [events, metadata] = ConvertToMjaiFormat(JSON.parse(text));
      gstoreDispatch({
        type: "ADD_PAIFU",
        payload: metadata,
      });
      for (const playerId of [0, 1, 2, 3]) {
        console.log("add player:", metadata.playerNames[playerId]);
        pinfoDispatch({
          type: "UPDATE_PLAYER_STATS",
          payload: {
            playerId,
            events,
            metadata,
          },
        });
      }
    }
  };
  console.log(pinfoState);
  return (
    <div className="w-full">
      <table className="w-full">
        <thead className="border-b">
          <tr className="text-left">
            <th>日付</th>
            <th>プレイヤー</th>
          </tr>
        </thead>
        {gstoreState.info.map(({ metadata, showDetail }) => (
          <tbody key={metadata.uuid}>
            <tr
              className="border-b text-left"
              key={"game-result" + metadata.uuid}
            >
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
                    gstoreDispatch({
                      type: "TOGGLE_SHOW_DETAIL",
                      payload: { uuid: metadata.uuid },
                    });
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
      <FileInputField onChange={handleFileChange}></FileInputField>
    </div>
  );
}
