import InfiniteScroll from "react-infinite-scroll-component";

import { Spinner } from "~/components/ui/spinner";

import { useListChatRoomsQuery } from "../hooks/use-list-chat-rooms-query";

import { ChatRoomMenuItem } from "./chat-room-menu-item";

interface ChatRoomListProps {
  roomId?: string;
}

export function ChatRoomList({ roomId }: ChatRoomListProps) {
  const {
    data: { pages: chatRooms },
    hasNextPage,
    fetchNextPage,
  } = useListChatRoomsQuery();

  return (
    <InfiniteScroll
      dataLength={chatRooms.length}
      className="flex flex-col"
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={
        <div className="flex flex-1 justify-center">
          <Spinner className="m-4 size-6" />
        </div>
      }
      scrollableTarget="app-sidebar-content"
    >
      {chatRooms.map((chatRoom) => (
        <ChatRoomMenuItem
          title={chatRoom.title}
          roomId={chatRoom.roomId}
          key={chatRoom.roomId}
          isActive={roomId === chatRoom.roomId}
        />
      ))}
    </InfiniteScroll>
  );
}
