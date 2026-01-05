import { useSuspenseQuery } from "@tanstack/react-query";

import { api } from "~/lib/api";
import { BALANCE_MULTIPLIER } from "~/shared/constants";

interface GetBalanceResponse {
  balance: number;
}

export function useBalanceQuery() {
  return useSuspenseQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      const response = await api.get<GetBalanceResponse>("/wallet/balance");
      response.data.balance *= BALANCE_MULTIPLIER;
      return response.data;
    },
    select: (data) => data.balance,
  });
}
