type TileStr =
  | "1m"
  | "2m"
  | "3m"
  | "4m"
  | "5m"
  | "6m"
  | "7m"
  | "8m"
  | "9m" // m
  | "1p"
  | "2p"
  | "3p"
  | "4p"
  | "5p"
  | "6p"
  | "7p"
  | "8p"
  | "9p" // p
  | "1s"
  | "2s"
  | "3s"
  | "4s"
  | "5s"
  | "6s"
  | "7s"
  | "8s"
  | "9s" // s
  | "E"
  | "S"
  | "W"
  | "N"
  | "P"
  | "F"
  | "C" // z
  | "5mr"
  | "5pr"
  | "5sr" // a
  | "?";

class Tile {
  #tile: TileStr;
  constructor(tile: string) {
    const reg = /^(([1-9][m|p|s])|(E|S|W|N|P|F|C)|(5[m|p|s]r))$/;
    if (!reg.test(tile)) {
      console.log(`invalid tile format: ${tile}`);
      this.#tile = "?";
    } else {
      this.#tile = tile as TileStr;
    }
  }
  get val(): TileStr {
    return this.#tile;
  }

  // TODO: Nextjsの問題でプライベートメソッドを使うとエラーになるので一旦publicにしておく
  static isMJSoulTileFormat(tile: string): boolean {
    // 0~9m, 0~9p, 0~9s, 1~7zのどれか
    const mjsoulReg = /^(([0-9][m|p|s])|([1-7]z))$/;
    return mjsoulReg.test(tile);
  }
  static bakazeFromNum(num: number): TileStr {
    switch (num) {
      case 0:
        return "E";
      case 1:
        return "S";
      case 2:
        return "W";
      case 3:
        return "N";
      default:
        console.log(`invalid bakaze number: ${num}`);
        return "?";
    }
  }

  static fromMJSoul(tile: string): TileStr {
    if (!this.isMJSoulTileFormat(tile)) {
      console.log(`invalid tile format: ${tile}`);
      return "?";
    }

    if (tile[0] === "0") {
      switch (tile[1]) {
        case "m":
          return "5mr";
        case "s":
          return "5sr";
        case "p":
          return "5pr";
        default:
          console.log(`invalid tile format: ${tile}`);
          return "?";
      }
    }

    switch (tile) {
      case "1z":
        return "E";
      case "2z":
        return "S";
      case "3z":
        return "W";
      case "4z":
        return "N";
      case "5z":
        return "P";
      case "6z":
        return "F";
      case "7z":
        return "C";
      default:
        return tile as TileStr;
    }
  }
  public toString = (): string => {
    return this.val;
  };
}

export { Tile };
export type { TileStr };
