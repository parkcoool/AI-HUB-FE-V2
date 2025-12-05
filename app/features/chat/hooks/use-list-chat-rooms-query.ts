import { useSuspenseQuery } from "@tanstack/react-query";

import { api } from "~/lib/api";

interface ListChatRoomsParams {
  page?: number;
  size?: number;
}

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

export function useListChatRoomsQuery(params: ListChatRoomsParams) {
  return useSuspenseQuery({
    queryKey: ["chat-rooms"],
    queryFn: async () => {
      const response = await api.get<ListChatRoomsResponse>("/chat-rooms", { params });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
