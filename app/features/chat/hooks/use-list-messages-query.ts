import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { api } from "~/lib/api";

export interface ListMessagesResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: {
    messageId: string;
    role: "user" | "assistant";
    content: string;
    tokenCount: number;
    coinCount: number;
    modelId: number;
    createdAt: string;
  }[];
  number: number;
  numberOfElements: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}

interface UseListMessagesQueryParams {
  roomId?: string;
}

export function useListMessagesQuery({ roomId }: UseListMessagesQueryParams) {
  return useSuspenseInfiniteQuery({
    queryKey: ["list-messages", roomId],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await api.get<ListMessagesResponse>(`/messages/page/${roomId}`, {
        params: { page: pageParam, sort: "createdAt,desc" },
      });
      return response.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.number + 1 < lastPage.totalPages) {
        return lastPage.number + 1;
      }
    },
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.content),
      pageParams: data.pageParams,
    }),
  });
}
