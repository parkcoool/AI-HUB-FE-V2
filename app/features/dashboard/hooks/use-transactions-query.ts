import { useSuspenseQuery } from "@tanstack/react-query";

import { api } from "~/lib/api";
import { BALANCE_MULTIPLIER } from "~/shared/constants";

interface GetTransactionsResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: {
    transactionId: number;
    transactionType: string;
    coinUsage: number;
    balanceAfter: number;
    description: string;
    modelId: number;
    modelName: string;
    roomId: string;
    messageId: string;
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

interface UseTransactionsQueryParams {
  page: number;
  size: number;
}

export function useTransactionsQuery({ page, size }: UseTransactionsQueryParams) {
  return useSuspenseQuery({
    queryKey: ["transactions", page, size],
    queryFn: async () => {
      const response = await api.get<GetTransactionsResponse>("/transactions", {
        params: { page, size },
      });
      response.data.content.forEach((transaction) => {
        transaction.coinUsage *= BALANCE_MULTIPLIER;
        transaction.balanceAfter *= BALANCE_MULTIPLIER;
      });
      return response.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    meta: { persist: true },
  });
}
