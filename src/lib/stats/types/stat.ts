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
  accountIds: string[];
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
  playerId: string;
  playerName: string;
  playerNameUpdatedAt: number;
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
    this.playerId = "";
    this.playerName = "";
    // 古い日付であれば何でもいいが、この数字は-271,821年の4月20日を表しているらしい
    // https://stackoverflow.com/questions/11526504/minimum-and-maximum-date
    this.playerNameUpdatedAt = 0;
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

  static add(lsh: Stat, rsh: Stat): Stat {
    const result = new Stat();
    result.playerId = lsh.playerId;
    result.playerName = lsh.playerName;
    result.playerNameUpdatedAt = lsh.playerNameUpdatedAt;
    result.game = lsh.game + rsh.game;
    result.round = lsh.round + rsh.round;
    result.oya = lsh.oya + rsh.oya;
    result.agari = lsh.agari + rsh.agari;
    result.agariJun = lsh.agariJun + rsh.agariJun;
    result.agariAsOya = lsh.agariAsOya + rsh.agariAsOya;
    result.agariPointOya = lsh.agariPointOya + rsh.agariPointOya;
    result.agariPointKo = lsh.agariPointKo + rsh.agariPointKo;
    result.riichi = lsh.riichi + rsh.riichi;
    result.riichiJun = lsh.riichiJun + rsh.riichiJun;
    result.riichiAgari = lsh.riichiAgari + rsh.riichiAgari;
    result.riichiAgariJun = lsh.riichiAgariJun + rsh.riichiAgariJun;
    result.riichiAgariPoint = lsh.riichiAgariPoint + rsh.riichiAgariPoint;
    result.riichiPoint = lsh.riichiPoint + rsh.riichiPoint;
    result.riichiHoujuu = lsh.riichiHoujuu + rsh.riichiHoujuu;
    result.riichiAsOya = lsh.riichiAsOya + rsh.riichiAsOya;
    result.okkakeRiichi = lsh.okkakeRiichi + rsh.okkakeRiichi;
    result.okkakerareRiichi = lsh.okkakerareRiichi + rsh.okkakerareRiichi;
    result.fuuro = lsh.fuuro + rsh.fuuro;
    result.fuuroNum = lsh.fuuroNum + rsh.fuuroNum;
    result.fuuroAgari = lsh.fuuroAgari + rsh.fuuroAgari;
    result.fuuroAgariJun = lsh.fuuroAgariJun + rsh.fuuroAgariJun;
    result.fuuroAgariPoint = lsh.fuuroAgariPoint + rsh.fuuroAgariPoint;
    result.fuuroPoint = lsh.fuuroPoint + rsh.fuuroPoint;
    result.fuuroHoujuu = lsh.fuuroHoujuu + rsh.fuuroHoujuu;
    result.damaAgari = lsh.damaAgari + rsh.damaAgari;
    result.damaAgariJun = lsh.damaAgariJun + rsh.damaAgariJun;
    result.damaAgariPoint = lsh.damaAgariPoint + rsh.damaAgariPoint;
    result.yakuman = lsh.yakuman + rsh.yakuman;
    result.nagashiMangan = lsh.nagashiMangan + rsh.nagashiMangan;
    result.houjuu = lsh.houjuu + rsh.houjuu;
    result.houjuuJun = lsh.houjuuJun + rsh.houjuuJun;
    result.houjuuToOya = lsh.houjuuToOya + rsh.houjuuToOya;
    result.houjuuPointToOya = lsh.houjuuPointToOya + rsh.houjuuPointToOya;
    result.houjuuPointToKo = lsh.houjuuPointToKo + rsh.houjuuPointToKo;
    result.ryukyoku = lsh.ryukyoku + rsh.ryukyoku;
    result.ryukyokuPoint = lsh.ryukyokuPoint + rsh.ryukyokuPoint;
    result.riichiRyukyoku = lsh.riichiRyukyoku + rsh.riichiRyukyoku;
    result.teampoint = lsh.teampoint + rsh.teampoint;
    result.point = lsh.point + rsh.point;
    result.rank1 = lsh.rank1 + rsh.rank1;
    result.rank2 = lsh.rank2 + rsh.rank2;
    result.rank3 = lsh.rank3 + rsh.rank3;
    result.rank4 = lsh.rank4 + rsh.rank4;
    result.tobi = lsh.tobi + rsh.tobi;
    result.gameResultStore = new Map([...lsh.gameResultStore, ...rsh.gameResultStore]);
    return result;
  }

  static updateFromEvents(preStat: Stat, events: Event[], player_id: number): Stat {
    let stat = new Stat();
    stat = Stat.add(stat, preStat);
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
    stat.game++;
    for (const event of events) {
      const type = event.type;
      if (type === "startGame") {
        uuid = event.uuid;
      } else if (type === "startKyoku") {
        const {
          oya,
          scores,
          bakaze,
          kyotaku,
          kyoku,
          honba,
          playerNames,
          accountIds,
          unixTimestamp,
        } = event;
        stat.round++;
        if (
          stat.playerName !== playerNames[player_id] &&
          stat.playerNameUpdatedAt < unixTimestamp
        ) {
          stat.playerName = playerNames[player_id];
          stat.playerNameUpdatedAt = unixTimestamp;
        }
        stat.playerId = accountIds[player_id];

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
          stat.oya++;
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
          stat.riichi++;
          stat.riichiJun += jun;
          if (curOya === player_id) {
            stat.riichiAsOya++;
          }
          if (othersRiichiDeclared) {
            stat.okkakeRiichi++;
          }
        } else if (riichiDeclared) {
          stat.okkakerareRiichi++;
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
          stat.agari++;
          stat.agariJun += jun;

          if (curOya === player_id) {
            stat.agariAsOya++;
            stat.agariPointOya += point;
          } else {
            stat.agariPointKo += point;
          }

          if (riichiAccepted) {
            stat.riichiAgari++;
            stat.riichiAgariJun += jun;
            stat.riichiAgariPoint += point;
            stat.riichiPoint += point;
          } else if (fuuroNum > 0) {
            stat.fuuroAgari++;
            stat.fuuroAgariJun += jun;
            stat.fuuroAgariPoint += point;
            stat.fuuroPoint += point;
          } else {
            stat.damaAgari++;
            stat.damaAgariJun += jun;
            stat.damaAgariPoint += point;
          }

          if (
            (curOya === player_id && point >= 48000) ||
            (curOya !== player_id && point >= 32000)
          ) {
            stat.yakuman++;
          }
        } else if (target === player_id) {
          result = "放銃";
          let point = deltas[player_id];
          stat.houjuu++;
          stat.houjuuJun += jun;

          if (curOya === actor) {
            stat.houjuuToOya++;
            stat.houjuuPointToOya += point;
          } else {
            stat.houjuuPointToKo += point;
          }

          if (riichiDeclared) {
            stat.riichiHoujuu++;
            stat.riichiPoint += point;
          } else if (fuuroNum > 0) {
            stat.fuuroHoujuu++;
            stat.fuuroPoint += point;
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
        stat.ryukyoku++;
        stat.ryukyokuPoint += point;
        if (riichiAccepted) {
          stat.riichiRyukyoku++;
          stat.riichiPoint += point - 1000;
        } else if (fuuroNum > 0) {
          stat.fuuroPoint += point;
        }

        if (point >= 8000) {
          stat.nagashiMangan++;
        }
      } else if (type === "endKyoku") {
        if (fuuroNum > 0) {
          stat.fuuro++;
          stat.fuuroNum += fuuroNum;
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
        stat.point += finalScore - 25000;
        stat.teampoint += teampoints[player_id];
        if (finalScore < 0) {
          stat.tobi++;
        }
        const rank = ranks[player_id];
        if (rank === 0) {
          stat.rank1++;
        } else if (rank === 1) {
          stat.rank2++;
        } else if (rank === 2) {
          stat.rank3++;
        } else if (rank === 3) {
          stat.rank4++;
        }
        stat.gameResultStore.set(uuid, gameResult);
      }
    }
    return stat
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
