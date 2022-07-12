import { TeamColor } from "./TeamAddForm";
import { classNames } from "@/lib/utils";

type Props = {
  selectedColor: TeamColor;
  onClick: (color: TeamColor) => (e: React.MouseEvent<HTMLButtonElement>) => void;
};

// tailwindはテンプレートリテラルで生成したスタイルを認識できない? (bg-${color}-700など)
const styleByTeamColor = {
  indigo: {
    hoverBg: "hover:bg-indigo-700"
  },
  yellow: {
    hoverBg: "hover:bg-yellow-700"
  },
  red: {
    hoverBg: "hover:bg-red-700"
  },
  purple: {
    hoverBg: "hover:bg-purple-700"
  },
  pink: {
    hoverBg: "hover:bg-pink-700"
  },
  green: {
    hoverBg: "hover:bg-green-700"
  },
}


const teamColors: TeamColor[] = ["indigo", "yellow", "red", "purple", "pink", "green"];

export const ColorSelector = ({ selectedColor, onClick }: Props) => {

  return (
    <div className="flex px-2 h-8 rounded-3xl items-center gap-2">
      {teamColors.map((color) => (
        <button
          key={color}
          onClick={onClick(color)}
          className={classNames(
            "h-5 w-5 rounded-full",
            `bg-${color}-500 ${styleByTeamColor[color].hoverBg}`,
            color === selectedColor && "ring-2 ring-blue-500",
          )}
        ></button>
      ))}
    </div>
  );
};
