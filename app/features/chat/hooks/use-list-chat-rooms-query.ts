import { useQuery } from "@tanstack/react-query";

import { api } from "~/lib/api";

interface ListChatRoomsParams {
  page?: number;
  size?: number;
}

interface ListChatRoomsResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: {
    roomId: string;
    title: string;
    coinUsage: number;
    lastMessageAt: string;
    createdAt: string;
  }[];
  number: number;
  first: boolean;
  last: boolean;
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
  empty: boolean;
}

export function useListChatRoomsQuery(params: ListChatRoomsParams) {
  return useQuery({
    queryKey: ["chatRooms"],
    queryFn: async () => {
      const response = await api.get<ListChatRoomsResponse>("/chat-rooms", { params });
      return response.data;
    },
  });
}
