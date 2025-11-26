import { AppSidebar } from "~/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import type { Route } from "./+types/chat-room";
import type { ChatRoom } from "~/types/shared";

const chatRooms: ChatRoom[] = [
  {
    roomId: "room-1",
    title: "General Chat",
    coinUsage: 120,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-06-10T12:00:00Z",
    userId: "user-123",
  },
  {
    roomId: "room-2",
    title: "Project Discussion",
    coinUsage: 85,
    createdAt: "2024-02-20T14:30:00Z",
    updatedAt: "2024-06-11T09:15:00Z",
    userId: "user-123",
  },
  {
    roomId: "room-3",
    title: "Random Talks",
    coinUsage: 45,
    createdAt: "2024-03-05T08:20:00Z",
    updatedAt: "2024-06-12T11:45:00Z",
    userId: "user-123",
  },
];

export default function ChatRoomPage({ params }: Route.LoaderArgs) {
  const { roomId } = params;

  return (
    <SidebarProvider>
      <AppSidebar activeRoomId={roomId} chatRooms={chatRooms} />

      <SidebarInset>
        <header className="h-16 shrink-0 items-center gap-2 border-b px-4 flex md:hidden">
          <SidebarTrigger className="-ml-1" />
        </header>

        <div className="flex flex-1"></div>
      </SidebarInset>
    </SidebarProvider>
  );
}
