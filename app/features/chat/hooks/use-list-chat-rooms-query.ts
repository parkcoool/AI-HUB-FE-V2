import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { api } from "~/lib/api";

interface ListChatRoomsResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: {
    roomId: string;
    title: string;
    coinUsage: number;
    lastMessageAt: string;
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

export function useListChatRoomsQuery() {
  return useSuspenseInfiniteQuery({
    queryKey: ["chat-rooms"],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await api.get<ListChatRoomsResponse>("/chat-rooms", {
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
    refetchOnWindowFocus: false,
    meta: { persist: true },
  });
}
