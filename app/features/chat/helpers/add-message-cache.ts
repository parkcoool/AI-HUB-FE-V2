import type { InfiniteData, QueryClient } from "@tanstack/react-query";

import type { ListMessagesResponse } from "../hooks/use-list-messages-query";

type ListMessagesQueryData = InfiniteData<ListMessagesResponse, number>;

interface Message {
  messageId: string;
  role: "user" | "assistant";
  content: string;
  tokenCount: number;
  coinCount: number;
  modelId: number;
  createdAt: string;
}

export function addMessageCache(roomId: string, message: Message, queryClient: QueryClient) {
  queryClient.cancelQueries({ queryKey: ["list-messages", roomId], exact: true });

  queryClient.setQueryData<ListMessagesQueryData>(["list-messages", roomId], (oldData) => {
    if (!oldData) return oldData;

    return {
      ...oldData,
      pages: [
        { ...oldData.pages[0], content: [message, ...oldData.pages[0].content] },
        ...oldData.pages.slice(1),
      ],
    };
  });
}
