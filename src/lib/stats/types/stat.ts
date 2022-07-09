import { kyokuInfoToString } from "../utils";
import Event from "./event";
export type GameResult = {
  index: number;
  kyoku: string;
  kyotaku: string;
  oya: string;
  ryukyoku: string;

  p1Result: string;
  p1State: string;
  p1Delta: string;
  p1Score: string;

  p2Result: string;
  p2State: string;
  p2Delta: string;
  p2Score: string;

  p3Result: string;
  p3State: string;
  p3Delta: string;
  p3Score: string;

  p4Result: string;
  p4State: string;
  p4Delta: string;
  p4Score: string;
};
export type GameMetadata = {
  uuid: string;
  timestamp: string;
  day: string;
  gameTitle?: string;
  playerNames: string[];
  teamNames?: string[];
  ranks: number[];
  finalScores: number[];
  teamPoints: number[];
};
type KyokuState = {
  kyoku?: string;
  kyotaku?: string;
  oya?: string;
  ryukyoku?: string;
};
export type GameResultByPlayer = {
  result: string;
  state: string;
  delta: number;
  score: number;
} & KyokuState;

// 参考 https://github.com/Equim-chan/Mortal/blob/main/libriichi/src/stat.rs
class Stat {
  playerName: string;
  game: number;
  round: number;
  oya: number;

  teampoint: number;
  point: number;
  rank1: number;
  rank2: number;
  rank3: number;
  rank4: number;
  tobi: number;

  fuuro: number;
  fuuroNum: number;
  fuuroPoint: number;
  fuuroAgari: number;
  fuuroAgariJun: number;
  fuuroAgariPoint: number;
  fuuroHoujuu: number;

  agari: number;
  agariAsOya: number;
  agariJun: number;
  agariPointOya: number;
  agariPointKo: number;

  houjuu: number;
  houjuuJun: number;
  houjuuToOya: number;
  houjuuPointToOya: number;
  houjuuPointToKo: number;

  riichi: number;
  riichiAsOya: number;
  riichiJun: number;
  riichiAgari: number;
  riichiAgariPoint: number;
  riichiAgariJun: number;
  riichiHoujuu: number;
  riichiRyukyoku: number;
  riichiPoint: number;
  okkakeRiichi: number;
  okkakerareRiichi: number;

  damaAgari: number;
  damaAgariJun: number;
  damaAgariPoint: number;

  ryukyoku: number;
  ryukyokuPoint: number;

  yakuman: number;
  nagashiMangan: number;

  gameResultStore: Map<string, GameResultByPlayer[]>;

  constructor() {
    this.playerName = "";
    this.game = 0;
    this.round = 0;
    this.oya = 0;
    this.agari = 0;

    this.agariJun = 0;
    this.agariAsOya = 0;
    this.agariPointOya = 0;
    this.agariPointKo = 0;

    this.riichi = 0;
    this.riichiJun = 0;
    this.riichiAgari = 0;
    this.riichiAgariJun = 0;
    this.riichiAgariPoint = 0;
    this.riichiPoint = 0;
    this.riichiHoujuu = 0;
    this.riichiAsOya = 0;
    this.okkakeRiichi = 0;
    this.okkakerareRiichi = 0;

    this.fuuro = 0;
    this.fuuroNum = 0;
    this.fuuroAgari = 0;
    this.fuuroAgariJun = 0;
    this.fuuroAgariPoint = 0;
    this.fuuroPoint = 0;
    this.fuuroHoujuu = 0;

    this.damaAgari = 0;
    this.damaAgariJun = 0;
    this.damaAgariPoint = 0;

    this.yakuman = 0;
    this.nagashiMangan = 0;

    this.houjuu = 0;
    this.houjuuJun = 0;
    this.houjuuToOya = 0;
    this.houjuuPointToOya = 0;
    this.houjuuPointToKo = 0;

    this.ryukyoku = 0;
    this.ryukyokuPoint = 0;
    this.riichiRyukyoku = 0;

    this.teampoint = 0;
    this.point = 0;
    this.rank1 = 0;
    this.rank2 = 0;
    this.rank3 = 0;
    this.rank4 = 0;
    this.tobi = 0;

    this.gameResultStore = new Map();
  }

  updateFromEvents(events: Event[], player_id: number) {
    let curScores = [0, 0, 0, 0];
    let finalScore = 0;
    let riichiDeclared = false;
    let riichiAccepted = false;
    let othersRiichiDeclared = false;
    let curOya = 0;
    let curKyotaku = 0;
    let jun = 0;
    let fuuroNum = 0;
    let kyokuState: KyokuState = {};
    let isRyukyoku = false;
    let gameResult = [];
    let preScores = [25000, 25000, 25000, 25000];
    let state = "";
    let result = "";
    let uuid = "";
    this.game++;
    for (const event of events) {
      const type = event.type;
      if (type === "startGame") {
        uuid = event.uuid;
      } else if (type === "startKyoku") {
        const { oya, scores, bakaze, kyotaku, kyoku, honba, playerNames } = event;
        this.round++;
        this.playerName = playerNames[player_id];

        curScores = [...scores];
        curKyotaku = kyotaku;
        riichiDeclared = false;
        riichiAccepted = false;
        othersRiichiDeclared = false;
        curOya = oya;
        isRyukyoku = false;
        state = "";
        result = "";
        if (curOya === player_id) {
          this.oya++;
        }
        kyokuState = {
          kyoku: kyokuInfoToString(bakaze, kyoku, honba),
          kyotaku: (kyotaku * 1000).toLocaleString(),
          oya: playerNames[oya],
        };
        jun = 0;
        fuuroNum = 0;
      } else if (type === "dahai") {
        const { actor } = event;
        if (actor === player_id) {
          jun++;
        }
      } else if (type === "chi" || type === "pon" || type === "daiminkan") {
        const { actor } = event;
        if (actor === player_id) {
          fuuroNum++;
        }
      } else if (type === "reach") {
        const { actor } = event;
        if (actor === player_id) {
          riichiDeclared = true;
          this.riichi++;
          this.riichiJun += jun;
          if (curOya === player_id) {
            this.riichiAsOya++;
          }
          if (othersRiichiDeclared) {
            this.okkakeRiichi++;
          }
        } else if (riichiDeclared) {
          this.okkakerareRiichi++;
        } else {
          othersRiichiDeclared = true;
        }
      } else if (type === "reachAccepted") {
        const { actor } = event;
        curScores[actor] -= 1000;
        if (actor === player_id) {
          riichiAccepted = true;
        }
      } else if (type === "hora") {
        const { actor, target, deltas, tsumo } = event;

        for (let i = 0; i < 4; i++) {
          curScores[i] += deltas[i];
        }
        curKyotaku = 0;
        if (actor === player_id) {
          result = tsumo ? "ツモ" : "ロン";
          let point = deltas[player_id] - Number(riichiAccepted) * 1000;
          this.agari++;
          this.agariJun += jun;

          if (curOya === player_id) {
            this.agariAsOya++;
            this.agariPointOya += point;
          } else {
            this.agariPointKo += point;
          }

          if (riichiAccepted) {
            this.riichiAgari++;
            this.riichiAgariJun += jun;
            this.riichiAgariPoint += point;
            this.riichiPoint += point;
          } else if (fuuroNum > 0) {
            this.fuuroAgari++;
            this.fuuroAgariJun += jun;
            this.fuuroAgariPoint += point;
            this.fuuroPoint += point;
          } else {
            this.damaAgari++;
            this.damaAgariJun += jun;
            this.damaAgariPoint += point;
          }

          if (
            (curOya === player_id && point >= 48000) ||
            (curOya !== player_id && point >= 32000)
          ) {
            this.yakuman++;
          }
        } else if (target === player_id) {
          result = "放銃";
          let point = deltas[player_id];
          this.houjuu++;
          this.houjuuJun += jun;

          if (curOya === actor) {
            this.houjuuToOya++;
            this.houjuuPointToOya += point;
          } else {
            this.houjuuPointToKo += point;
          }

          if (riichiDeclared) {
            this.riichiHoujuu++;
            this.riichiPoint += point;
          } else if (fuuroNum > 0) {
            this.fuuroHoujuu++;
            this.fuuroPoint += point;
          }
        }
      } else if (type === "ryukyoku") {
        const { deltas } = event;

        isRyukyoku = true;
        result = deltas[player_id] > 0 ? "聴牌" : "";
        for (let i = 0; i < 4; i++) {
          curScores[i] += deltas[i];
        }

        let point = deltas[player_id];
        this.ryukyoku++;
        this.ryukyokuPoint += point;
        if (riichiAccepted) {
          this.riichiRyukyoku++;
          this.riichiPoint += point - 1000;
        } else if (fuuroNum > 0) {
          this.fuuroPoint += point;
        }

        if (point >= 8000) {
          this.nagashiMangan++;
        }
      } else if (type === "endKyoku") {
        if (fuuroNum > 0) {
          this.fuuro++;
          this.fuuroNum += fuuroNum;
        }
        kyokuState.ryukyoku = isRyukyoku ? "流局" : "";
        if (fuuroNum > 0) {
          state = `${fuuroNum}副露`;
        } else if (riichiDeclared) {
          state = "立直";
        }
        gameResult.push({
          ...kyokuState,
          result: result,
          state: state,
          delta: curScores[player_id] - preScores[player_id],
          score: curScores[player_id],
        });
        preScores = [...curScores];
      } else if (type === "endGame") {
        const { finalScores, ranks, teampoints } = event;
        finalScore = finalScores[player_id];
        this.point += finalScore - 25000;
        this.teampoint += teampoints[player_id];
        if (finalScore < 0) {
          this.tobi++;
        }
        const rank = ranks[player_id];
        if (rank === 0) {
          this.rank1++;
        } else if (rank === 1) {
          this.rank2++;
        } else if (rank === 2) {
          this.rank3++;
        } else if (rank === 3) {
          this.rank4++;
        }
        this.gameResultStore.set(uuid, gameResult);
      }
    }
  }

  #totalPt(points: number[]) {
    let sum = 0;
    for (const point of points) {
      sum += point;
    }
    return sum;
  }
  #avgPt(points: number[]) {
    return this.#totalPt(points) / this.game;
  }
  get totalPoint() {
    return this.agariPointKo + this.agariPointOya;
  }
  get totalHoujuuPoint() {
    return this.houjuuPointToKo + this.houjuuPointToOya;
  }
  get avgRank() {
    return this.#avgPt([1, 2, 3, 4]);
  }
  get rank1Rate() {
    return this.rank1 / this.game;
  }
  get rank2Rate() {
    return this.rank2 / this.game;
  }
  get rank3Rate() {
    return this.rank3 / this.game;
  }
  get rank4Rate() {
    return this.rank4 / this.game;
  }
  get tobiRate() {
    return this.tobi / this.game;
  }
  get avgPointPerGame() {
    return this.point / this.game;
  }
  get avgPointPerRound() {
    return this.point / this.round;
  }
  get avgPointPerAgari() {
    if (this.agari === 0) {
      return 0;
    }
    return (this.agariPointKo + this.agariPointOya) / this.agari;
  }
  get avgPointPerOyaAgari() {
    return this.agariPointOya / this.agariAsOya;
  }
  get avgPointPerKoAgari() {
    return this.agariPointKo / (this.agari - this.agariAsOya);
  }
  get avgPointPerRiichiAgari() {
    return this.riichiAgariPoint / this.riichiAgari;
  }
  get avgPointPerFuuroAgari() {
    return this.fuuroAgariPoint / this.fuuroAgari;
  }
  get avgPointPerDamaAgari() {
    return this.damaAgariPoint / this.damaAgari;
  }
  get avgPointPerRyukyoku() {
    return this.ryukyokuPoint / this.ryukyoku;
  }
  get avgAgariJun() {
    return this.agariJun / this.agari;
  }
  get avgRiichiAgariJun() {
    return this.riichiAgariJun / this.riichiAgari;
  }
  get avgFuuroAgariJun() {
    return this.fuuroAgariJun / this.fuuroAgari;
  }
  get avgDamaAgariJun() {
    return this.damaAgariJun / this.damaAgari;
  }
  get avgPointPerHoujuu() {
    if (this.houjuu === 0) {
      return 0;
    }
    return (this.houjuuPointToKo + this.houjuuPointToOya) / this.houjuu;
  }
  get avgPointPerHoujuuToOya() {
    return this.houjuuPointToOya / this.houjuuToOya;
  }
  get avgPointPerHoujuuToKo() {
    return this.houjuuPointToKo / (this.houjuu - this.houjuuToOya);
  }
  get avgHoujuuJun() {
    return this.houjuuJun / this.houjuu;
  }
  get agariRate() {
    return this.agari / this.round;
  }
  get houjuuRate() {
    return this.houjuu / this.round;
  }
  get riichiRate() {
    return this.riichi / this.round;
  }
  get fuuroRate() {
    return this.fuuro / this.round;
  }
  get ryukyokuRate() {
    return this.ryukyoku / this.round;
  }
  get agariRateAfterRiichi() {
    return this.riichiAgari / this.riichi;
  }
  get houjuuRateAfterRiichi() {
    return this.riichiHoujuu / this.riichi;
  }
  get okkakeRiichiRate() {
    return this.okkakeRiichi / this.riichi;
  }
  get okkakerareRiichiRate() {
    return this.okkakerareRiichi / this.riichi;
  }
  get avgRiichiJun() {
    return this.riichiJun / this.riichi;
  }
  get avgRiichiPoint() {
    return this.riichiPoint / this.riichi;
  }
  get agariRateAsOya() {
    return this.agariAsOya / this.oya;
  }
  get agariAsOyaRate() {
    return this.agariAsOya / this.agari;
  }
  get houjuuToOyaRate() {
    return this.houjuuToOya / this.houjuu;
  }
  get avgFuuroNum() {
    return this.fuuroNum / this.fuuro;
  }
  get agariRateAfterFuuro() {
    return this.fuuroAgari / this.fuuro;
  }
  get houjuuRateAfterFuuro() {
    return this.fuuroHoujuu / this.fuuro;
  }
  get avgFuuroPoint() {
    return this.fuuroPoint / this.fuuro;
  }
  get yakumanRate() {
    return this.yakuman / this.game;
  }
  get nagashiManganRate() {
    return this.nagashiMangan / this.game;
  }
}

export default Stat;
