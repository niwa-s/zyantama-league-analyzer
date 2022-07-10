import { classNames } from "@/lib/utils";
type Props = {
  teamName: string;
  teamColor: string;
};
export const TeamLabel = ({ teamName, teamColor }: Props) => {
  return <div className={classNames(teamColor, "rounded")}>{teamName}</div>;
};
