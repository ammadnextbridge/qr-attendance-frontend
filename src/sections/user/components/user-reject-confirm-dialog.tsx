import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { IChangeUserStatusPayload, userService } from "@/services/user.service";
import { IUser } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  currentUser: IUser;
};

export default function UserRejectConfirmDialog({
  open,
  onClose,
  currentUser,
}: Props) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [rejectionReason, setRejectionReason] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setRejectionReason(value);
  };

  const { mutate: updateStatus, isPending } = useMutation({
    mutationKey: ["Update Status"],
    mutationFn: (payload: IChangeUserStatusPayload) =>
      userService.changeUserStatus(payload),
  });

  const handleSubmit = () => {
    updateStatus(
      {
        userId: currentUser.id,
        status: "rejected",
        rejectionReason,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["users"] });
          toast({
            title: "Success",
            description: "Successfully updated status ",
          });
          onClose();
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message,
          });
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm</DialogTitle>
          <DialogDescription>
            Are you sure you want to reject this user?
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Label htmlFor="rejectionReason">Rejection Reason</Label>
          <Textarea
            rows={4}
            id="rejectionReason"
            className="col-span-3"
            onChange={handleChange}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {isPending ? <LoadingSpinner /> : " Yes, Reject"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
