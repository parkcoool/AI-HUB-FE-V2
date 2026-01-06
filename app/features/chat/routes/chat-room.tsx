import { Chat } from "../components/chat";

import type { Route } from "./+types/chat-room";

export default function ChatRoomPage({ params }: Route.LoaderArgs) {
  const { roomId } = params;

  return <Chat roomId={roomId} />;
}
