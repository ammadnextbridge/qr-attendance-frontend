// import { Row } from "@tanstack/react-table";
// import { MoreHorizontal } from "lucide-react";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";

// interface DataTableRowActionsProps<TData> {
//   row: Row<TData>;
// }

// export function DataTableRowActions<TData>({
//   row,
// }: DataTableRowActionsProps<TData>) {
//   const user = row.original;

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="ghost"
//           className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
//         >
//           <MoreHorizontal />
//           <span className="sr-only">Open menu</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end" className="w-[160px]">
//         <DropdownMenuItem>Edit</DropdownMenuItem>
//         <DropdownMenuItem>Make a copy</DropdownMenuItem>
//         <DropdownMenuItem>Favorite</DropdownMenuItem>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem>
//           Delete
//           <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

import { Row } from "@tanstack/react-table";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IUser } from "@/types/user";
import UserRejectConfirmDialog from "./user-reject-confirm-dialog";
import { useBoolean } from "@/hooks/use-boolean";
import { useUpdateUserStatus } from "@/services/user.service";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { updateStatus, isUpdating } = useUpdateUserStatus();
  const confirm = useBoolean();
  const user = row.original as IUser;

  // Don't show actions if user is already approved or rejected
  if (user.status !== "pending") {
    return null;
  }

  const handleApprove = () => {
    updateStatus(
      { userId: user.id, status: "approved" },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["users"] });
          toast({
            title: "Success",
            description: "Successfully approved user",
          });
        },
      }
    );
  };

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800 hover:border-green-300"
              onClick={handleApprove}
              disabled={isUpdating}
            >
              <Check className="h-4 w-4 " />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Approve</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-8 border-red-200  text-red-700 hover:bg-red-50 hover:text-red-800 hover:border-red-300"
              onClick={confirm.onTrue}
              disabled={isUpdating}
            >
              <X className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Reject</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <UserRejectConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        currentUser={user}
      />
    </div>
  );
}
