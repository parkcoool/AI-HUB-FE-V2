import { useSuspenseQuery } from "@tanstack/react-query";

import { api } from "~/lib/api";

interface GetBalanceResponse {
  balance: number;
}

export function useBalanceQuery() {
  return useSuspenseQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      const response = await api.get<GetBalanceResponse>("/wallet/balance");
      return response.data;
    },
    select: (data) => data.balance,
  });
}
