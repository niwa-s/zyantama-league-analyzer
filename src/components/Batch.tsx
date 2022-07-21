import { classNames } from "@/lib/utils";

type Props = {
  color: string;
  name: string;
};

function Batch({ color, name }: Props) {
  return (
    <span
      className={classNames(
        "inline-flex",
        "items-center",
        "gap-1.5",
        "py-1.5",
        "px-3",
        "rounded-full",
        "text-xs",
        "font-medium",
        `bg-${color}-100`,
        `text-${color}-800`,
      )}
    >
      {name}
    </span>
  );
}

export { Batch };
