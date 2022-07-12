import { Popover } from "@headlessui/react";
import { useRecoilValue } from "recoil";
import { useJoinTeam } from "@/lib/playerInfo/operations";
import { teamInfoState } from "@/lib/teamInfo/selectors";

type Props = {
  accountId: string;
};
export function TeamSelectModal({ accountId }: Props) {
  const teamInfo = useRecoilValue(teamInfoState);
  const joinTeam = useJoinTeam();
  return (
    <Popover className="relative">
      <Popover.Button className={"bg-blue-500 text-white rounded-full py-1 px-2 hover:bg-blue-300"}>
        チームに追加する
      </Popover.Button>

      <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-4">
        <div className="overflow-hidden rounded-lg shadow-lg ring-1  ring-black ring-opacity-5">
          <div className="relative grid gap-2 bg-white p-7">
            <div className="text-center">チームを選択してください</div>
            {[...teamInfo.teamNames.values()].map(({ teamName, teamColor }) => (
              <button
                onClick={() => joinTeam(accountId, teamName)}
                key={teamName}
                className={`flex items-center bg-${teamColor}-200 hover:bg-${teamColor}-500 rounded-full p-2`}
              >
                {teamName}
              </button>
            ))}
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
}
