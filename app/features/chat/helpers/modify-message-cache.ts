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

export function modifyMessageCache(
  roomId: string,
  {
    pageIndex,
    messageIndex,
  }: {
    pageIndex: number;
    messageIndex: number;
  },
  messagePatch: Partial<Message>,
  queryClient: QueryClient
) {
  queryClient.setQueryData(["list-messages", roomId], (oldData: ListMessagesQueryData) => {
    const updatedPages = oldData.pages.map((page, currentPageIndex) => {
      if (currentPageIndex !== pageIndex) return page;
      const updatedContent = page.content.map((message, currentMessageIndex) => {
        if (currentMessageIndex !== messageIndex) return message;
        return { ...message, ...messagePatch };
      });
      return { ...page, content: updatedContent };
    });

    return {
      ...oldData,
      pages: updatedPages,
    };
  });
}
