import {
  // eslint-disable-next-line import/named
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { classNames } from "../lib/class-names";
import { GameMetadata, GameResult, GameResultByPlayer } from "../lib/stats/types/stat";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

function createData(playerResults: GameResultByPlayer[][]) {
  let gameResult: GameResult[] = [];
  let kyokuNum = playerResults[0].length;

  for (let i = 0; i < kyokuNum; i++) {
    const [p1, p2, p3, p4] = [
      playerResults[0][i],
      playerResults[1][i],
      playerResults[2][i],
      playerResults[3][i],
    ];
    gameResult.push({
      index: i + 1,
      kyoku: p1.kyoku!,
      kyotaku: p1.kyotaku!,
      oya: p1.oya!,
      ryukyoku: p1.ryukyoku!,

      p1Result: p1.result,
      p1Delta: p1.delta.toLocaleString(),
      p1Score: p1.score.toLocaleString(),
      p1State: p1.state,

      p2Result: p2.result,
      p2Delta: p2.delta.toLocaleString(),
      p2Score: p2.score.toLocaleString(),
      p2State: p2.state,

      p3Result: p3.result,
      p3Delta: p3.delta.toLocaleString(),
      p3Score: p3.score.toLocaleString(),
      p3State: p3.state,

      p4Result: p4.result,
      p4Delta: p4.delta.toLocaleString(),
      p4Score: p4.score.toLocaleString(),
      p4State: p4.state,
    });
  }

  return gameResult;
}
function createPlayerFooter(playerId: number) {}

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

let day = " ";
const gameTitle = "第4節 第2試合";
const teamNames: string[] = ["player1", "player2", "player3", "player4"];
const playerNames: string[] = ["a", "a", "a", "a"];

const numberCell = (info: any) => <div className="text-right px-2">{info.getValue()}</div>;
const textCell = (info: any) => <div className="text-center px-2">{info.getValue()}</div>;

function createPlayerColumn(playerId: 1 | 2 | 3 | 4): ColumnDef<GameResult> {
  return {
    header: playerNames[playerId - 1],
    //cell: (info) => <div>{info.getValue() + "test"}</div>,
    footer: (props) => props.column.id,
    columns: [
      {
        header: "結果",
        accessorKey: `p${playerId}Result`,
        cell: textCell,
        footer: () => "test",
      },
      {
        header: "状態",
        accessorKey: `p${playerId}State`,
        cell: textCell,
      },
      {
        header: "局収支",
        accessorKey: `p${playerId}Delta`,
        cell: (info) => (
          <div
            className={classNames(
              "text-right",
              "px-2",
              info.getValue()[0] === "-"
                ? "text-red-500"
                : info.getValue() !== "0"
                ? "text-blue-500"
                : "hidden",
            )}
          >
            {info.getValue()}
          </div>
        ),
      },
      {
        header: "得点",
        accessorKey: `p${playerId}Score`,
        cell: numberCell,
      },
    ],
  };
}

const columns: ColumnDef<GameResult>[] = [
  {
    header: day,
    footer: (props) => props.column.id,
    columns: [
      {
        header: gameTitle,
        footer: (props) => props.column.id,
        columns: [
          {
            header: " ",
            footer: (props) => props.column.id,
            accessorKey: "index",
            cell: (info) => <div className="text-center px-1">{info.getValue()}</div>,
          },
          {
            header: "局",
            footer: (props) => props.column.id,
            accessorKey: "kyoku",
            cell: textCell,
          },
          {
            header: "供託",
            footer: (props) => props.column.id,
            accessorKey: "kyotaku",
            cell: numberCell,
          },
          {
            header: "親",
            footer: (props) => props.column.id,
            accessorKey: "oya",
            cell: textCell,
          },
          {
            header: "流局",
            footer: (props) => props.column.id,
            accessorKey: "ryukyoku",
            cell: textCell,
          },
        ],
      },
    ],
  },
  {
    header: teamNames[0],
    footer: (props) => props.column.id,
    columns: [createPlayerColumn(1)],
  },
  {
    header: teamNames[1],
    footer: (props) => props.column.id,
    columns: [createPlayerColumn(2)],
  },
  {
    header: teamNames[2],
    footer: (props) => props.column.id,
    columns: [createPlayerColumn(3)],
  },
  {
    header: teamNames[3],
    footer: (props) => props.column.id,
    columns: [createPlayerColumn(4)],
  },
];

const _columns: ColumnDef<Person>[] = [
  {
    header: "Name",
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
    ],
  },
  {
    header: "Info",
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: "age",
        header: () => "Age",
        footer: (props) => props.column.id,
        cell: (info) => <div className="text-right px-1">{info.getValue()}</div>,
      },
      {
        header: "More Info",
        columns: [
          {
            accessorKey: "visits",
            header: () => <span>Visits</span>,
            footer: (props) => props.column.id,
            cell: (info) => <div className="text-right px-1">{info.getValue()}</div>,
          },
          {
            accessorKey: "status",
            header: "Status",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "progress",
            header: "Profile Progress",
            footer: (props) => props.column.id,
            cell: (info) => <div className="text-right px-1">{info.getValue()}</div>,
          },
        ],
      },
    ],
  },
];

type Props = {
  playerResults: GameResultByPlayer[][];
  metadata: GameMetadata;
};

function getResultColCss(val: string) {
  switch (val) {
    case "ツモ":
      return "bg-yellow-100";
    case "ロン":
      return "bg-orange-100";
    case "聴牌":
      return "bg-green-100";
    case "放銃":
      return "bg-blue-100";
    default:
      return "";
  }
}
function getPlayerTableHeaderCss(playerId: number) {
  switch (playerId) {
    case 1:
      return "bg-red-100";
    case 2:
      return "bg-blue-100";
    case 3:
      return "bg-green-100";
    case 4:
      return "bg-yellow-100";
    default:
      return "";
  }
}

function Table({ playerResults, metadata }: Props) {
  columns[0].header = metadata.day;
  columns[0].footer = "試合結果";
  for (const i of [0, 1, 2, 3]) {
    columns[i + 1].columns![0].header = metadata.playerNames[i];
    columns[i + 1].header = teamNames[i];

    console.log("finalscores:", metadata.finalScores);
    columns[i + 1].footer = () => (
      <div>{`${metadata.ranks[i] + 1}着   ${metadata.teamPoints[i]}pts`}</div>
    );
  }

  const [data] = useState(() => [...createData(playerResults)]);
  day = metadata.day;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  //console.log("getHeaderGroups:", table.getHeaderGroups())
  return (
    <div className="p-2">
      <table className="border-2 border-solid border-black">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            {
              //console.log("headerGroup: ", headerGroup);
            }
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, i) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={classNames(
                      "border-2 border-solid px-1 py-1 border-black bg-gray-200",
                      header.depth <= 2 && getPlayerTableHeaderCss(i),
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            );
          })}
        </thead>
        <tbody className="">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="odd:bg-gray-100">
              {row.getVisibleCells().map((cell) => {
                {
                  //console.log(cell);
                }
                return (
                  <td
                    key={cell.id}
                    className={classNames(
                      "border",
                      "border-solid",
                      (cell.column.columnDef.header === "得点" ||
                        cell.column.columnDef.header === "流局") &&
                        "border-r-black border-r-2",
                      cell.column.columnDef.header === "結果" && getResultColCss(cell.getValue()),
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => {
            {
              console.log("footerGroup", footerGroup);
            }
            return (
              <tr key={footerGroup.id} className={classNames()}>
                {footerGroup.headers
                  .filter((header) => header.depth === 1)
                  .map((header, i) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={classNames("border-2 border-solid p-1 border-black text-3xl")}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.footer, header.getContext())}
                    </th>
                  ))}
              </tr>
            );
          })}
        </tfoot>
      </table>
    </div>
  );
}
export default Table;
