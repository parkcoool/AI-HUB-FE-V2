import { useListChatRoomsQuery } from "../hooks/use-list-chat-rooms-query";

import { ChatRoomMenuItem } from "./chat-room-menu-item";

interface ChatRoomListProps {
  roomId?: string;
}

export function ChatRoomList({ roomId }: ChatRoomListProps) {
  // TODO: 페이징 처리
  const { data: chatRooms } = useListChatRoomsQuery({});

  return (
    <>
      {chatRooms?.content.map((chatRoom) => (
        <ChatRoomMenuItem
          title={chatRoom.title}
          roomId={chatRoom.roomId}
          key={chatRoom.roomId}
          isActive={roomId === chatRoom.roomId}
        />
      ))}
    </>
  );
}
