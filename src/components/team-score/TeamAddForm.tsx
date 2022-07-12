import { useState } from "react";
import { TeamLabel } from "../TeamLabel";
import { ColorSelector } from "./colorSelector";
import { useJoinTeam } from "@/lib/playerInfo/operations";
import { useAddTeam } from "@/lib/teamInfo/operations";

export type TeamColor = "indigo" | "yellow" | "red" | "purple" | "pink" | "green";

export const TeamAddForm = () => {
  const addTeam = useAddTeam();
  const [teamName, setTeamName] = useState("");
  const [selectedTeamColor, setSelectedTeamColor] = useState<TeamColor>("indigo");
  const onColorSelecterClick = (color: TeamColor) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectedTeamColor(color);
  };
  return (
    <div className="flex border-b">
      {/*<TeamLabel teamColor="black" teamName={teamName} />*/}
      <input
        className="focus:outline-none"
        type="text"
        placeholder="チーム名"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />
      <ColorSelector selectedColor={selectedTeamColor} onClick={onColorSelecterClick} />
      <button
        className="border bg-teal-500 hover:bg-teal-700 text-white py-1 px-2 rounded"
        onClick={(event) => {
          event.preventDefault();
          if (teamName === "") {
            return;
          }
          addTeam(teamName.trim(), selectedTeamColor);
          setTeamName("");
        }}
      >
        追加する
      </button>
    </div>
  );
};

/*
<form class="w-full max-w-sm">
  <div class="flex items-center border-b border-teal-500 py-2">
    <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Jane Doe" aria-label="Full name">
    <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
      Sign Up
    </button>
    <button class="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
      Cancel
    </button>
  </div>
</form>
*/
