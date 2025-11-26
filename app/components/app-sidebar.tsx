import { ChartLine, Edit, MessageCirclePlus, MoreHorizontal, Settings, Trash } from "lucide-react";
import * as React from "react";
import { Link } from "react-router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import type { ChatRoom } from "~/types/shared";

import { Button } from "./ui/button";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeRoomId?: string;
  chatRooms: ChatRoom[];
}

export function AppSidebar({ activeRoomId, chatRooms, ...props }: AppSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        {/* 내비게이션 메뉴 */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={false} className="p-5">
                  <Link to="/room">
                    <MessageCirclePlus />새 채팅
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={false} className="p-5">
                  <Link to="/usage">
                    <ChartLine />
                    사용량
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* 채팅 방 목록 */}
        {chatRooms.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>채팅</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {chatRooms.map((chatRoom) => (
                  <SidebarMenuItem className="relative" key={chatRoom.roomId}>
                    {/* 버튼 */}
                    <SidebarMenuButton
                      asChild
                      isActive={activeRoomId === chatRoom.roomId}
                      className="flex justify-between p-5"
                    >
                      <Link to={`/room/${chatRoom.roomId}`}>{chatRoom.title}</Link>
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
                          <DropdownMenuItem>
                            <Edit />
                            <DropdownMenuLabel>제목 수정</DropdownMenuLabel>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Trash />
                            <DropdownMenuLabel>삭제</DropdownMenuLabel>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      {/* 푸터 */}
      <SidebarFooter>
        <SidebarMenuItem>
          <SidebarMenuButton asChild isActive={false} className="p-5">
            <Link to="/settings">
              <Settings />
              설정
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}
