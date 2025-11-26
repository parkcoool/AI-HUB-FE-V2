import { ChartLine, MessageCirclePlus, Settings } from "lucide-react";
import * as React from "react";
import { Link } from "react-router";

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
import type { ChatRoom } from "~/features/chat/types";

import { ChatRoomMenuItem } from "./chat-room-menu-item";

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
                  <ChatRoomMenuItem
                    chatRoom={chatRoom}
                    key={chatRoom.roomId}
                    isActive={activeRoomId === chatRoom.roomId}
                  />
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
