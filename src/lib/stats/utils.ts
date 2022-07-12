import assert from "assert";
import { TileStr } from "./types/tile";

function changToBakaze(chang: number) {
  assert(chang >= 0 && chang <= 3, "chang must be 0, 1, 2 or 3");
  return ["E", "S", "W", "N"][chang];
}

function kyokuInfoToString(bakaze: TileStr, kyoku: number, honba: number) {
  let bakazeStr = "";
  if (bakaze == "E") {
    bakazeStr = "東";
  } else if (bakaze == "S") {
    bakazeStr = "南";
  } else if (bakaze == "W") {
    bakazeStr = "西";
  } else if (bakaze == "N") {
    bakazeStr = "北";
  }
  return `${bakazeStr}${kyoku + 1}局 ${honba}本場`;
}
function toPercentFormat(num: number, fixed?: number) {
  if (fixed == null) {
    fixed = 2;
  }
  return (num * 100).toFixed(fixed).toString() + "%";
}

export { toPercentFormat, changToBakaze, kyokuInfoToString, danniIdToString };

function danniIdToString(id: number) {
  console.log("danni: ", id)
  switch (id) {
    case 10101:
      return "初心1";
    case 10102:
      return "初心2";
    case 10103:
      return "初心3";
    case 10201:
      return "雀士1";
    case 10202:
      return "雀士2";
    case 10203:
      return "雀士3";
    case 10301:
      return "雀傑1";
    case 10302:
      return "雀傑2";
    case 10303:
      return "雀傑3";
    case 10401:
      return "雀豪1";
    case 10402:
      return "雀豪2";
    case 10403:
      return "雀豪3";
    case 10501:
      return "雀聖1";
    case 10502:
      return "雀聖2";
    case 10503:
      return "雀聖3";
    case 10601:
      return "魂天";
    default:
      const kontenLevel = id % 100;
      console.log("段位不明: ", id, `魂天${kontenLevel.toString()}として扱う`)
      return `魂天${kontenLevel.toString()}`;
  }
}