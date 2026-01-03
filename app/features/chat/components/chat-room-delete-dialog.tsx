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

import { useDeleteChatRoomMutation } from "../hooks/use-delete-chat-room-mutation";

interface ChatRoomDeleteDialogProps {
  roomId: string;
  title: string;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ChatRoomDeleteDialog({
  roomId,
  title,
  open,
  onOpenChange,
}: ChatRoomDeleteDialogProps) {
  const { mutate: deleteChatRoom } = useDeleteChatRoomMutation({ roomId });

  // 채팅방 삭제 핸들러
  const handleDeleteChatRoom = () => {
    deleteChatRoom();
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDeleteChatRoom();
          }}
        >
          <DialogHeader>
            <DialogTitle>{title} 삭제</DialogTitle>
            <DialogDescription>
              채팅방을 삭제합니다. 이 작업은 되돌릴 수 없습니다.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                취소
              </Button>
            </DialogClose>
            <Button type="submit" variant="destructive">
              삭제
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
