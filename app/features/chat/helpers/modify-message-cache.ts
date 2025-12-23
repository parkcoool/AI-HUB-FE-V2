import type { InfiniteData, QueryClient } from "@tanstack/react-query";

import type { ListMessagesResponse } from "../hooks/use-list-messages-query";

type ListMessagesQueryData = InfiniteData<ListMessagesResponse, number>;

type Message = ListMessagesResponse["content"][number] & { isLoading?: boolean };

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
  queryClient.cancelQueries({ queryKey: ["list-messages", roomId], exact: true });

  queryClient.setQueryData<ListMessagesQueryData>(["list-messages", roomId], (oldData) => {
    const ensuredOldData: ListMessagesQueryData = oldData ?? { pageParams: [0], pages: [] };

    const updatedPages = ensuredOldData.pages.map((page, currentPageIndex) => {
      if (currentPageIndex !== pageIndex) return page;
      const updatedContent = page.content.map((message, currentMessageIndex) => {
        if (currentMessageIndex !== messageIndex) return message;
        return { ...message, ...messagePatch };
      });
      return { ...page, content: updatedContent };
    });

    return {
      ...ensuredOldData,
      pages: updatedPages,
    };
  });
}
