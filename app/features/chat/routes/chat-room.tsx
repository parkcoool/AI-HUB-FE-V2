import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";

import { AppSidebar } from "../components/app-sidebar";
import { Chat } from "../components/chat";

import type { Route } from "./+types/chat-room";

export default function ChatRoomPage({ params }: Route.LoaderArgs) {
  const { roomId } = params;

  return (
    <SidebarProvider>
      <AppSidebar activeRoomId={roomId} />

      <SidebarInset>
        <header className="h-16 shrink-0 items-center gap-2 border-b px-4 flex md:hidden">
          <SidebarTrigger className="-ml-1" />
        </header>

        <Chat activeRoomId={roomId} />
      </SidebarInset>
    </SidebarProvider>
  );
}
