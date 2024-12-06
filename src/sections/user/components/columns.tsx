import { ColumnDef } from "@tanstack/react-table";

import { statuses } from "../data/data";
import { Badge } from "@/components/ui/badge";
import { IUser } from "@/types/user";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { fDate } from "@/utils/format-time";
import { Center } from "@/types/user";
export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue("role")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Registered At" />
    ),
    cell: ({ row }) => <div>{fDate(row.getValue("createdAt"))}</div>,
  },
  {
    accessorKey: "center",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Center" />
    ),
    cell: ({ row }) => {
      const center = row.getValue("center") as Center; // Assert the type as Center
      return <div>{center?.name}</div>;
    },
      },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <Badge variant={status.variant} className="py-1">
          {status.icon && <status.icon className="mr-2 h-4 w-4" />}
          <span>{status.label}</span>
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },

  
];
