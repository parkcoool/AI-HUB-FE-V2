import { Button } from "~/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "~/components/ui/dialog";
import { Spinner } from "~/components/ui/spinner";

import { useDeleteUserMutation } from "../hooks/use-delete-user-mutation";

interface UserDeleteDialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function UserDeleteDialog({ open, onOpenChange }: UserDeleteDialogProps) {
  const { mutate: deleteUser, isPending: isDeletingUser } = useDeleteUserMutation();

  // 계정 삭제 핸들러
  const handleDeleteUser = () => {
    deleteUser();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDeleteUser();
          }}
        >
          <DialogHeader>
            <DialogTitle>계정 삭제</DialogTitle>
            <DialogDescription>계정을 삭제합니다. 이 작업은 되돌릴 수 없습니다.</DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4">
            <DialogClose asChild disabled={isDeletingUser}>
              <Button type="button" variant="outline">
                취소
              </Button>
            </DialogClose>
            <Button type="submit" variant="destructive" disabled={isDeletingUser} className="gap-1">
              {isDeletingUser && <Spinner className="size-4 mr-2" />}
              {isDeletingUser ? "계정 삭제 중..." : "계정 삭제"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
