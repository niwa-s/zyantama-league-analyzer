import assert, { ok } from "assert";
import { ArrayOfLength } from "../utils.js";
import Event from "./types/event.js";
import { GameMetadata } from "./types/stat.js";
import { Tile, TileStr } from "./types/tile";
/*
export const readFromFilePath = (filePath: string) => {
  let json = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }))
  return ConvertToMjaiFormat(json)
}*/
/* "jingsuanyuandian": 30000,
          "shunweima_2": 10,
          "shunweima_3": -10,
          "shunweima_4": -30, */

function calcFinalTeamPoints(
  ranks: number[],
  finalScores: number[],
  rule: any
) {
  let initPoint = rule.init_point; // 最初の持ち点
  let oka = rule.jingsuanyuandian; // おそらくオカ
  let uma2 = rule.shunweima_2; // おそらく2位のウマ
  let uma3 = rule.shunweima_3; // おそらく3位のウマ
  let uma4 = rule.shunweima_4; // おそらく4位のウマ
  

  let zyuniPoints = [
    -(uma2 + uma3 + uma4) + (oka - initPoint) * 4 / 1000,
    uma2,
    uma3,
    uma4
  ]
  let teamPoints = [0, 0, 0, 0];

  // 順位点が変更されている場合
  if (initPoint && oka && uma2 && uma3 && uma4) {
    for (const i of [0, 1, 2, 3]) {
      teamPoints[i] = Number(((finalScores[i] - oka) / 1000 + zyuniPoints[ranks[i]] + 0.00001).toFixed(1));
    }
  }
  // 順位点が変更されていない場合(つまり段位戦ルール)
  else {
  }
  return teamPoints;
}

function ConvertToMjaiFormat(mjsoulPaifu: any): [Event[], GameMetadata] {
  let paifu: any = mjsoulPaifu.data.data;
  let events: Event[] = [];

  let gameResult = mjsoulPaifu.head.result;
  let accountsInfo = mjsoulPaifu.head.accounts;
  let finalScores: ArrayOfLength<4, number> = [0, 0, 0, 0];
  let ranks: ArrayOfLength<4, number> = [0, 0, 0, 0];
  let playerNames = accountsInfo.map((account: any) => account.nickname);
  gameResult.players.forEach((player: any, rank: number) => {
    finalScores[player.seat] = player.part_point_1;
    ranks[player.seat] = rank;
  });
  let timestamp = new Date(Number(mjsoulPaifu.head.start_time) * 1000);
  let gameMetadata: GameMetadata = {
    uuid: mjsoulPaifu.head.uuid,
    timestamp: timestamp.toISOString(),
    day: `${timestamp.getFullYear()}年${
      timestamp.getMonth() + 1
    }月${timestamp.getDate()}日`,
    playerNames,
    ranks: ranks,
    finalScores: finalScores,
    teamPoints: calcFinalTeamPoints(
      ranks,
      finalScores,
      mjsoulPaifu.head.config.mode.detail_rule
    ),
  };
  events.push({
    type: "startGame",
    names: playerNames,
    uuid: mjsoulPaifu.head.uuid,
  })

  for (const event of paifu.actions) {
    if (event.type !== 1) {
      if (event.type === 4 && event.game_event === 2) {
        events.push({
          type: "endGame",
          finalScores: finalScores,
          ranks: ranks,
          teampoints: gameMetadata.teamPoints as ArrayOfLength<4, number>,
        });
      }
      continue;
    }
    const name = event.result.name;
    const data = event.result.data;
    let isLiqi = Array(4).fill(false);
    let isFriten = Array(4).fill(false);

    if (name === ".lq.RecordNewRound") {
      isLiqi = Array(4).fill(false);
      isFriten = Array(4).fill(false);

      const oyaId = [0, 1, 2, 3].find(
        (playerId) => data[`tiles${playerId}`].length === 14
      );
      const tehais = [0, 1, 2, 3].map((playerId) => {
        const tehai = data[`tiles${playerId}`] as string[];
        return tehai.map((tile) => Tile.fromMJSoul(tile));
      }) as ArrayOfLength<4, TileStr[]>;

      events.push({
        type: "startKyoku",
        bakaze: Tile.bakazeFromNum(data.chang),
        kyoku: data.ju,
        honba: data.ben,
        kyotaku: data.liqibang,
        oya: oyaId!,
        scores: data.scores,
        tehais: tehais,
        playerNames: playerNames,
      });
    } else if (name === ".lq.RecordDealTile") {
      if (data.liqi) {
        events.push({
          type: "reachAccepted",
          actor: data.liqi.seat,
        });
      }

      events.push({
        type: "tsumo",
        actor: data.seat,
        pai: Tile.fromMJSoul(data.tile),
      });

      if (data.doras) {
        events.push({
          type: "dora",
          // TODO: 配列の最後尾が新しいドラなのか調べてない...
          dora_marker: Tile.fromMJSoul(data.doras[data.doras.length - 1]),
        });
      }
    } else if (name === ".lq.RecordDiscardTile") {
      isFriten = data.zhenting;

      events.push({
        type: "dahai",
        actor: data.seat,
        pai: Tile.fromMJSoul(data.tile),
        tsumogiri: data.moqie,
      });

      if (data.is_liqi && isLiqi[data.seat] === false) {
        events.push({
          type: "reach",
          actor: data.seat,
          friten: isFriten[data.seat],
        });
        isLiqi[data.seat] = true;
      }
    } else if (name === ".lq.RecordChiPengGang") {
      if (data.liqi) {
        events.push({
          type: "reachAccepted",
          actor: data.liqi.seat,
        });
      }
      const type = data.type;
      // チー
      if (type === 0) {
        events.push({
          type: "chi",
          actor: data.seat,
          target: data.froms[2],
          pai: Tile.fromMJSoul(data.tiles[2]),
          consumed: [
            Tile.fromMJSoul(data.tiles[0]),
            Tile.fromMJSoul(data.tiles[1]),
          ],
        });

        // ポン
      } else if (type === 1) {
        events.push({
          type: "pon",
          actor: data.seat,
          target: data.froms[2],
          pai: Tile.fromMJSoul(data.tiles[2]),
          consumed: [
            Tile.fromMJSoul(data.tiles[0]),
            Tile.fromMJSoul(data.tiles[1]),
          ],
        });

        // カン
      } else {
        events.push({
          type: "daiminkan",
          actor: data.seat,
          target: data.froms[2],
          pai: Tile.fromMJSoul(data.tiles[3]),
          consumed: [
            Tile.fromMJSoul(data.tiles[0]),
            Tile.fromMJSoul(data.tiles[1]),
            Tile.fromMJSoul(data.tiles[2]),
          ],
        });
      }
    } else if (name === ".lq.RecordAnGangAddGang") {
      const type = data.type;
      // 加槓
      if (type === 2) {
        events.push({
          type: "kakan",
          actor: data.seat,
          pai: data.tiles,
          consumed: [
            Tile.fromMJSoul(data.tiles),
            Tile.fromMJSoul(data.tiles),
            Tile.fromMJSoul(data.tiles),
          ],
        });

        // 暗槓
      } else if (type === 3) {
        events.push({
          type: "ankan",
          actor: data.seat,
          consumed: [
            Tile.fromMJSoul(data.tiles),
            Tile.fromMJSoul(data.tiles),
            Tile.fromMJSoul(data.tiles),
            Tile.fromMJSoul(data.tiles),
          ],
        });
      } else {
        console.log(`[.lq.RecordAnGangAddGang] unknown type: ${type}`);
        console.log(`${data}`);
      }

      // 直前に、加槓・大明槓があった場合、今回の槓と同時に裏ドラがめくられるらしい
      if (data.doras) {
        events.push({
          type: "dora",
          dora_marker: Tile.fromMJSoul(data.doras[data.doras.length - 1]),
        });
      }
    } else if (name === ".lq.RecordHule") {
      const { old_scores, delta_scores, scores, hules } = data;
      const isTsumo = hules[0].zimo;
      const uradora = [];
      for (const hule of hules) {
        if (hule.li_doras) {
          uradora.push(
            hule.li_doras.map((tile: string) => Tile.fromMJSoul(tile))
          );
          break;
        }
      }

      if (isTsumo) {
        const hule = hules[0];
        events.push({
          type: "hora",
          actor: hule.seat,
          target: hule.seat,
          deltas: delta_scores,
          ura_markers: uradora,
          tsumo: isTsumo,
        });
      } else {
        const targetPlayer = (delta_scores as number[]).findIndex((d) => d < 0);
        assert(
          targetPlayer !== -1,
          `[.lq.RecordHule] targetPlayer not found
${JSON.stringify(data)}`
        );
        for (const hule of hules) {
          events.push({
            type: "hora",
            actor: hule.seat,
            target: targetPlayer,
            deltas: delta_scores,
            ura_markers: uradora,
            tsumo: isTsumo,
          });
        }
      }
      events.push({
        type: "endKyoku",
      });
    } else if (name === ".lq.RecordNoTile") {
      events.push({
        type: "ryukyoku",
        deltas: data.scores[0].delta_scores || [0, 0, 0, 0],
      });
      events.push({
        type: "endKyoku",
      });
    } else {
      console.log(`unknown name: ${name}`);
    }
  }
  //console.log(util.inspect(events, { showHidden: false, depth: null, colors: false, maxArrayLength: null }))
  //console.log(JSON.stringify(events));

  return [events, gameMetadata];
}

export default ConvertToMjaiFormat;
