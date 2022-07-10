// 参考: https://github.com/Equim-chan/Mortal/blob/main/libriichi/src/mjai/event.rs
import { TileStr } from "./tile.js";
import { ArrayOfLength } from "@/lib/utils.js";

type StartGame = {
  type: "startGame";
  names: ArrayOfLength<4, string>;
  uuid: string;
};

type StartKyoku = {
  type: "startKyoku";
  bakaze: TileStr;
  kyoku: number;
  honba: number;
  kyotaku: number;
  oya: number;
  scores: ArrayOfLength<4, number>;
  tehais: ArrayOfLength<4, TileStr[]>;
  playerNames: ArrayOfLength<4, string>;
  accountIds: ArrayOfLength<4, string>;
  unixTimestamp: number;
};

type Tsumo = {
  type: "tsumo";
  actor: number;
  pai: TileStr;
};

type Dahai = {
  type: "dahai";
  actor: number;
  pai: TileStr;
  tsumogiri: boolean;
};

type Chi = {
  type: "chi";
  actor: number;
  target: number;
  pai: TileStr;
  consumed: ArrayOfLength<2, TileStr>;
};

type Pon = {
  type: "pon";
  actor: number;
  target: number;
  pai: TileStr;
  consumed: ArrayOfLength<2, TileStr>;
};

type Daiminkan = {
  type: "daiminkan";
  actor: number;
  target: number;
  pai: TileStr;
  consumed: ArrayOfLength<3, TileStr>;
};

type Kakan = {
  type: "kakan";
  actor: number;
  pai: TileStr;
  consumed: ArrayOfLength<3, TileStr>;
};

type Ankan = {
  type: "ankan";
  actor: number;
  consumed: ArrayOfLength<4, TileStr>;
};

type Dora = {
  type: "dora";
  dora_marker: TileStr;
};

type Reach = {
  type: "reach";
  actor: number;
  friten: boolean;
};

type ReachAccepted = {
  type: "reachAccepted";
  actor: number;
};

type Hora = {
  type: "hora";
  actor: number;
  target: number;
  tsumo: boolean;
  deltas: ArrayOfLength<4, number>;
  ura_markers: TileStr[];
};

type Ryukyoku = {
  type: "ryukyoku";
  deltas: ArrayOfLength<4, number>;
};

type EndKyoku = {
  type: "endKyoku";
};

type EndGame = {
  type: "endGame";
  finalScores: ArrayOfLength<4, number>;
  ranks: ArrayOfLength<4, number>;
  teampoints: ArrayOfLength<4, number>;
};

type Event =
  | StartGame
  | StartKyoku
  | Tsumo
  | Dahai
  | Chi
  | Pon
  | Daiminkan
  | Kakan
  | Ankan
  | Dora
  | Reach
  | ReachAccepted
  | Hora
  | Ryukyoku
  | EndKyoku
  | EndGame;
export default Event;
