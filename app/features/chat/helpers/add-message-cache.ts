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
    const ensuredOldData: ListMessagesQueryData = oldData ?? { pageParams: [], pages: [] };
    const firstPage: ListMessagesResponse = ensuredOldData.pages.at(0) ?? {
      totalPages: 0,
      content: [],
      number: 0,
    };

    return {
      ...ensuredOldData,
      pages: [
        { ...firstPage, content: [message, ...firstPage.content] },
        ...ensuredOldData.pages.slice(1),
      ],
    };
  });
}
