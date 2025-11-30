import { useListChatRoomsQuery } from "../hooks/use-list-chat-rooms-query";

import { ChatRoomMenuItem } from "./chat-room-menu-item";

interface ChatRoomListProps {
  activeRoomId?: string;
}

export function ChatRoomList({ activeRoomId }: ChatRoomListProps) {
  const { data: chatRooms } = useListChatRoomsQuery({});

  return (
    <>
      {chatRooms?.content.map((chatRoom) => (
        <ChatRoomMenuItem
          title={chatRoom.title}
          roomId={chatRoom.roomId}
          key={chatRoom.roomId}
          isActive={activeRoomId === chatRoom.roomId}
        />
      ))}
    </>
  );
}
