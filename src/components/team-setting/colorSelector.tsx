import { TeamColor } from "./TeamAddForm";
import { classNames } from "@/lib/utils";

type Props = {
  selectedColor: TeamColor;
  onClick: (color: TeamColor) => (e: React.MouseEvent<HTMLButtonElement>) => void;
};

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
            `bg-${color}-500 hover:bg-${color}-700`,
            color === selectedColor && "ring-2 ring-blue-500",
          )}
        ></button>
      ))}
    </div>
  );
};
