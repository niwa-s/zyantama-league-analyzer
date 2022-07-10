import { GameMetadata } from "../stats/types/stat";
import { UiState } from "../utils";

export type GameInfo = {
    metadata: GameMetadata,
    showDetail: boolean,
}

export type GameInfoAtom = GameInfo[]

export type GameInfoUiState = UiState<
    | { status: "Loading"; gameInfo: GameInfo[] }
    | { status: "Loaded"; gameInfo: GameInfo[] }
>;