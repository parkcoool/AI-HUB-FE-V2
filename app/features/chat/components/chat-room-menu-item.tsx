import { DialogDescription } from "@radix-ui/react-dialog";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Field, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from "~/components/ui/sidebar";

import { useChangeChatRoomTitleMutation } from "../hooks/use-change-chat-room-title-mutation";

interface ChatRoomMenuItemProps extends React.ComponentProps<typeof SidebarMenuItem> {
  roomId: string;
  title: string;
  isActive?: boolean;
}

export function ChatRoomMenuItem({
  roomId,
  title,
  isActive = false,
  ...props
}: ChatRoomMenuItemProps) {
  const { setOpenMobile } = useSidebar();
  const { mutate: changeTitle } = useChangeChatRoomTitleMutation({ roomId });

  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  // 저장 버튼 비활성화 여부
  const isSaveDisabled = newTitle.trim().length === 0 || newTitle === title;

  // 제목 변경 핸들러
  const handleChangeTitle = () => {
    if (isSaveDisabled) return;
    changeTitle({ title: newTitle.trim() });
    setShowRenameDialog(false);
  };

  // 버튼 클릭 핸들러
  const handleButtonClick = () => {
    setOpenMobile(false);
  };

  return (
    <SidebarMenuItem className="relative" {...props}>
      {/* 버튼 */}
      <SidebarMenuButton
        asChild
        isActive={isActive}
        className="flex justify-between p-5"
        onClick={handleButtonClick}
      >
        <Link to={`/chat/${roomId}`}>{title}</Link>
      </SidebarMenuButton>

      {/* 드롭다운 메뉴 */}
      <div className="absolute right-1 z-10 top-0 bottom-0 flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setShowRenameDialog(true)}>
              <Edit />
              <DropdownMenuLabel>제목 수정</DropdownMenuLabel>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash />
              <DropdownMenuLabel>삭제</DropdownMenuLabel>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 제목 수정 다이얼로그 */}
        <Dialog open={showRenameDialog} onOpenChange={setShowRenameDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleChangeTitle();
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
      </div>
    </SidebarMenuItem>
  );
}
