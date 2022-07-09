import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { classNames } from "../lib/class-names";

type useSubNavbarResult = [
  string,
  Dispatch<SetStateAction<string>>,
  () => JSX.Element
];
export const useSubNavbar = (labels: readonly string[], gameDetailUUID: string): useSubNavbarResult => {
  const [subNavbarLabel, setSubNavbarLabel] = useState<string>("試合結果");
  return [
    subNavbarLabel,
    setSubNavbarLabel,
    () => (
      <div className="flex pt-2">
        {labels
          .filter((label) => label !== "試合詳細" || gameDetailUUID !== "")
          .map((label) => (
            <button
              key={label}
              className={classNames(
                "m-2",
                "text-gray",
                "hover:bg-gray-700",
                "hover:bg-gray-100",
                "text-gray-500",
                "font-bold",
                "py-2",
                "px-4",
                "rounded-full",
                subNavbarLabel === label && "text-gray-800 bg-gray-100"
              )}
              onClick={() => setSubNavbarLabel(label)}
            >
              {label}
            </button>
          ))}
      </div>
    ),
  ];
};
