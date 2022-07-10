import { useRecoilCallback } from "recoil";
import { GameMetadata } from "../stats/types/stat";
import { gameInfoAtom } from "./atoms";

export const useAddPaifu = () =>
  useRecoilCallback(({ set }) => (metadata: GameMetadata) => {
    set(gameInfoAtom, (prev) =>
      prev.findIndex((gameInfo) => gameInfo.metadata.uuid === metadata.uuid) === -1
        ? [...prev, { metadata, showDetail: false }].sort((a, b) =>
            a.metadata.timestamp > b.metadata.timestamp ? -1 : 1,
          )
        : prev,
    );
  });

export const useToggleShowGameDetail = () =>
  useRecoilCallback(({ set }) => (uuid: string) => {
    set(gameInfoAtom, (prev) =>
      prev.map((gameInfo) =>
        gameInfo.metadata.uuid === uuid
          ? { ...gameInfo, showDetail: !gameInfo.showDetail }
          : gameInfo,
      ),
    );
  });
