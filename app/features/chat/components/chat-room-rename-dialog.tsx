import { useState } from "react";

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
import { Field, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";

import { useChangeChatRoomTitleMutation } from "../hooks/use-change-chat-room-title-mutation";

interface ChatRoomRenameDialogProps {
  roomId: string;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
}

export function ChatRoomRenameDialog({
  roomId,
  open,
  onOpenChange,
  title,
}: ChatRoomRenameDialogProps) {
  const { mutate: changeTitle } = useChangeChatRoomTitleMutation({ roomId });

  const [newTitle, setNewTitle] = useState(title);

  // 저장 버튼 비활성화 여부
  const isSaveDisabled = newTitle.trim().length === 0 || newTitle === title;

  // 제목 변경 핸들러
  const handleChangeTitle = (newTitle: string) => {
    changeTitle({ title: newTitle.trim() });
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleChangeTitle(newTitle);
          }}
        >
          <DialogHeader>
            <DialogTitle>채팅 제목 수정</DialogTitle>
            <DialogDescription>채팅방의 제목을 수정합니다.</DialogDescription>
          </DialogHeader>

          <div className="grid flex-1 gap-2 py-4">
            <Field>
              <FieldLabel htmlFor="chat-room-title" className="sr-only">
                제목
              </FieldLabel>
              <Input
                id="chat-room-title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </Field>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                취소
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSaveDisabled}>
              변경 사항 저장
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
