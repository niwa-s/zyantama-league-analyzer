import assert from 'assert';
import { TileStr } from './types/tile';

function changToBakaze(chang: number) {
  assert(chang >= 0 && chang <= 3, "chang must be 0, 1, 2 or 3");
  return ["E", "S", "W", "N"][chang];
}

function kyokuInfoToString(bakaze: TileStr, kyoku: number, honba: number) {
  let bakazeStr = ""
  if (bakaze == "E") {
    bakazeStr = "東"
  } else if (bakaze == "S") {
    bakazeStr = "南"
  } else if (bakaze == "W") {
    bakazeStr = "西"
  } else if (bakaze == "N") {
    bakazeStr = "北"
  }
  return `${bakazeStr}${kyoku + 1}局 ${honba}本場`;
}
function toPercentFormat(num: number, fixed?: number) {
  if (fixed == null) {
    fixed = 2;
  }
  return (num * 100).toFixed(fixed).toString() + "%"
}

export { toPercentFormat ,changToBakaze, kyokuInfoToString };
