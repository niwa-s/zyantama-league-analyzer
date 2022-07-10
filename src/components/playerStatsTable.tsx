import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import { ArrowSmUpIcon } from "@heroicons/react/solid";
import {
  // eslint-disable-next-line import/named
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  // eslint-disable-next-line import/named
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useContext, useState } from "react";
import { useRecoilValue } from "recoil";
import { classNames } from "../lib/class-names";
import { Stat } from "../lib/stats";
import { toPercentFormat } from "../lib/stats/utils";
import { playerInfoAtom } from "@/lib/playerInfo/atoms";

const columns: ColumnDef<Stat>[] = [
  {
    header: "チーム名",
    cell: () => <div className="text-center">test</div>,
  },
  {
    header: "選手名",
    accessorKey: "playerName",
    cell: (info) => <div className="text-center">{info.getValue()}</div>,
  },
  {
    header: "ポイント",
    accessorKey: "teampoint",
    cell: (info) => <>{Number(info.getValue().toFixed(1)).toLocaleString()}</>,
  },
  {
    header: "試合数",
    accessorKey: "game",
  },
  {
    header: "総局数",
    accessorKey: "round",
  },
  {
    header: "一位率",
    accessorKey: "rank1Rate",
    cell: (info) => <>{toPercentFormat(info.getValue(), 0)}</>,
  },
  {
    header: "二位率",
    accessorKey: "rank2Rate",
    cell: (info) => <>{toPercentFormat(info.getValue(), 0)}</>,
  },
  {
    header: "三位率",
    accessorKey: "rank3Rate",
    cell: (info) => <>{toPercentFormat(info.getValue(), 0)}</>,
  },
  {
    header: "四位率",
    accessorKey: "rank4Rate",
    cell: (info) => <>{toPercentFormat(info.getValue(), 0)}</>,
  },
  /*
  {
    header: "和了回数",
    accessorKey: "agari",
  },
  {
    header: "和了点",
    accessorKey: "totalPoint"
  },
  {
    header: "リーチ回数",
    accessorKey: "riichi",
  },
  {
    header: "放銃回数",
    accessorKey: "houjuu"
  },
  {
    header: "放銃点",
    accessorKey: "totalHoujuuPoint"
  },
  {
    header: "副露局数",
    accessorKey: "fuuro",
  },
  */
  {
    header: "リーチ率",
    accessorKey: "riichiRate",
    cell: (info) => <>{toPercentFormat(info.getValue())}</>,
  },
  {
    header: "副露率",
    accessorKey: "fuuroRate",
    cell: (info) => <>{toPercentFormat(info.getValue())}</>,
  },
  {
    header: "和了率",
    accessorKey: "agariRate",
    cell: (info) => <>{toPercentFormat(info.getValue())}</>,
  },
  {
    header: "平均打点",
    accessorKey: "avgPointPerAgari",
    cell: (info) => <>{Number(info.getValue().toFixed()).toLocaleString()}</>,
  },
  {
    header: "放銃率",
    accessorKey: "houjuuRate",
    cell: (info) => <>{toPercentFormat(info.getValue())}</>,
  },
  {
    header: "平均放銃点",
    accessorKey: "avgPointPerHoujuu",
    cell: (info) => <>{Number(info.getValue().toFixed()).toLocaleString()}</>,
  },
];

function StatsTable() {
  const  playerInfo = useRecoilValue(playerInfoAtom)
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState(() =>
    Object.entries(playerInfo).map(([_, s]) => s.stat)
  );
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table className="border-2 border-solid border-black">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="border-2 border-solid px-1 py-1 border-black bg-gray-200"
                >
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: classNames(
                          "flex justify-center items-center",
                          header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : ""
                        ),
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <ChevronUpIcon className="w-3 h-3 text-gray-400 " />,
                        desc: <ChevronDownIcon className="w-3 h-3 text-gray-400" />,
                      }[header.column.getIsSorted() as string] ??
                      <div className="text-gray-400">
                        <ChevronUpIcon className="w-3 h-3"/>
                        <ChevronDownIcon className="w-3 h-3"/>
                      </div>
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="odd:bg-gray-100">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={classNames(
                    "border",
                    "border-solid",
                    "text-right",
                    "px-2"
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StatsTable;
