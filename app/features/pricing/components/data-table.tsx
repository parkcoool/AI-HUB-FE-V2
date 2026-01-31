import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import * as React from "react";
import { z } from "zod";

import { Badge } from "~/components/ui/badge";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { useListModelsPricingQuery } from "../hooks/use-list-models-pricing-query";

export const schema = z.object({
  modelId: z.number(),
  modelName: z.string(),
  displayName: z.string(),
  inputPricePer1m: z.number(),
  outputPricePer1m: z.number(),
  isActive: z.boolean(),
});

const columnLabels: Record<string, string> = {
  displayName: "모델",
  inputPricePer1m: "입력 가격 / 100만 토큰",
  outputPricePer1m: "출력 가격 / 100만 토큰",
  isActive: "활성화 상태",
};

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    accessorKey: "displayName",
    header: columnLabels.displayName,
    cell: ({ row }) => (
      <div>
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.displayName}
        </Badge>
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "inputPricePer1m",
    header: () => (
      <div className="w-full text-right">
        입력 가격 <span className="text-xs text-muted-foreground">/ 100만 토큰</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {row.original.inputPricePer1m.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })}
      </div>
    ),
  },
  {
    accessorKey: "outputPricePer1m",
    header: () => (
      <div className="w-full text-right">
        출력 가격 <span className="text-xs text-muted-foreground">/ 100만 토큰</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {row.original.outputPricePer1m.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })}
      </div>
    ),
  },
  {
    accessorKey: "isActive",
    header: () => <div className="w-full text-center">{columnLabels.isActive}</div>,
    cell: ({ row }) => (
      <div className="text-center">
        <Badge variant={row.original.isActive ? "default" : "secondary"}>
          {row.original.isActive ? "활성" : "비활성"}
        </Badge>
      </div>
    ),
  },
];

export function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const { data } = useListModelsPricingQuery();

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    getRowId: (row) => row.modelId.toString(),
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Table className="h-full">
      <TableHeader className="bg-muted sticky top-0 z-10">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              가격 정보가 없습니다.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export function DataTableSkeleton() {
  return (
    <Table className="h-full">
      <TableHeader className="bg-muted sticky top-0 z-10">
        <TableRow>
          <TableHead>{columnLabels.displayName}</TableHead>
          <TableHead>
            <div className="w-full text-right">
              입력 가격 <span className="text-xs text-muted-foreground">/ 100만 토큰</span>
            </div>
          </TableHead>
          <TableHead>
            <div className="w-full text-right">
              출력 가격 <span className="text-xs text-muted-foreground">/ 100만 토큰</span>
            </div>
          </TableHead>
          <TableHead>
            <div className="w-full text-center">{columnLabels.isActive}</div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-5 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-16 mx-auto" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
