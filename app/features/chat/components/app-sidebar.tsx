import { MessageCirclePlus } from "lucide-react";
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

import { useListChatRoomsQuery } from "../hooks/use-list-chat-rooms-query";

import { ChatRoomMenuItem } from "./chat-room-menu-item";
import { NavUser } from "./nav-user";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeRoomId?: string;
}

export function AppSidebar({ activeRoomId, ...props }: AppSidebarProps) {
  const { data: chatRooms } = useListChatRoomsQuery({});

  return (
    <Sidebar {...props}>
      <SidebarContent>
        {/* 내비게이션 메뉴 */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={false} className="p-5">
                  <Link to="/chat">
                    <MessageCirclePlus />새 채팅
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* 채팅 방 목록 */}
        {chatRooms?.content && (
          <SidebarGroup>
            <SidebarGroupLabel>채팅</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {chatRooms.content.map((chatRoom) => (
                  <ChatRoomMenuItem
                    title={chatRoom.title}
                    roomId={chatRoom.roomId}
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
        <NavUser username="User Name" email="user@example.com" />
      </SidebarFooter>
    </Sidebar>
  );
}
