import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from "~/components/ui/sidebar";

import { ChatRoomDeleteDialog } from "./chat-room-delete-dialog";
import { ChatRoomRenameDialog } from "./chat-room-rename-dialog";

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

  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // 사이드바 전환 버튼 클릭 핸들러
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
            <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)}>
              <Trash />
              <DropdownMenuLabel>삭제</DropdownMenuLabel>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 제목 수정 다이얼로그 */}
        <ChatRoomRenameDialog
          roomId={roomId}
          open={showRenameDialog}
          onOpenChange={setShowRenameDialog}
          title={title}
        />

        {/* 채팅방 삭제 다이얼로그 */}
        <ChatRoomDeleteDialog
          roomId={roomId}
          title={title}
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
        />
      </div>
    </SidebarMenuItem>
  );
}
