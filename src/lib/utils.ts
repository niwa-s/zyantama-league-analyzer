import { TeamColor } from "@/components/team-score/TeamAddForm";

// 参考: https://qiita.com/uhyo/items/3bc5f951f922804ede51
type ArrayOfLength<N extends number, T> = ArrayOfLengthRec<N, T, []>;
type ArrayOfLengthRec<Num, Elm, T extends unknown[]> = T["length"] extends Num
  ? T
  : ArrayOfLengthRec<Num, Elm, [Elm, ...T]>;

export type { ArrayOfLength };

//
// 参考: https://zenn.dev/warabi/articles/2521222d57a71f
export type UiState<T extends { status: string } & Record<string, unknown>> = T;

export const classNames = (...classes: (string | undefined | boolean | null)[]) =>
  classes.filter(Boolean).join(" ");

export function teamColorToHex(color: TeamColor) {
  if (color === "red") {
    return "#EF4444"
  } else if (color === "indigo") {
    return "#6366f1"
  } else if (color === "green") {
    return "#22c55e"
  } else if (color === "pink") {
    return "#ec4899"
  } else if (color === "purple") {
    return "#a855f7"
  } else {
    return "#eab308"
  }
}