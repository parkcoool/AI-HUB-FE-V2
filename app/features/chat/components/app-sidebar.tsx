import { MessageCirclePlus } from "lucide-react";
import { Suspense } from "react";
import { Link } from "react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { Spinner } from "~/components/ui/spinner";
import { useGetUserQuery } from "~/features/auth/hooks/use-get-user-query";

import { ChatRoomList } from "./chat-room-list";
import { NavUser } from "./nav-user";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeRoomId?: string;
}

export function AppSidebar({ activeRoomId, ...props }: AppSidebarProps) {
  const { data: user } = useGetUserQuery();

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
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <Spinner className="size-8" />
            </div>
          }
        >
          <ChatRoomList activeRoomId={activeRoomId} />
        </Suspense>
      </SidebarContent>

      {/* 푸터 */}
      <SidebarFooter>
        <NavUser username={user.username} email={user.email} />
      </SidebarFooter>
    </Sidebar>
  );
}
