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
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar";

import type { ChatRoom } from "../types";

interface ChatRoomMenuItemProps extends React.ComponentProps<typeof SidebarMenuItem> {
  chatRoom: ChatRoom;
  isActive?: boolean;
}

export function ChatRoomMenuItem({ chatRoom, isActive = false, ...props }: ChatRoomMenuItemProps) {
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [title, setTitle] = useState(chatRoom.title);

  // 저장 버튼 비활성화 여부
  const isSaveDisabled = title.trim().length === 0 || title === chatRoom.title;

  return (
    <SidebarMenuItem className="relative" {...props}>
      {/* 버튼 */}
      <SidebarMenuButton asChild isActive={isActive} className="flex justify-between p-5">
        <Link to={`/chat/${chatRoom.roomId}`}>{chatRoom.title}</Link>
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
            <DialogHeader>
              <DialogTitle>채팅 제목 수정</DialogTitle>
              <DialogDescription>채팅방의 제목을 수정합니다.</DialogDescription>
            </DialogHeader>

            <div className="grid flex-1 gap-2">
              <Label htmlFor="chat-room-title" className="sr-only">
                제목
              </Label>
              <Input
                id="chat-room-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">취소</Button>
              </DialogClose>
              <Button type="submit" disabled={isSaveDisabled}>
                변경 사항 저장
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </SidebarMenuItem>
  );
}
