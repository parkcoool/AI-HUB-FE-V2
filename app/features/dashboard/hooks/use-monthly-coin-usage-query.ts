import { useSuspenseQuery } from "@tanstack/react-query";

import { api } from "~/lib/api";
import { BALANCE_MULTIPLIER } from "~/shared/constants";

export interface GetMonthlyCoinUsageQuery {
  modelUsage: {
    modelId: number;
    modelName: string;
    displayName: string;
    coinUsed: number;
    messageCount: number;
    tokenCount: number;
    percentage: number;
  }[];
  dailyUsage: {
    date: string;
    coinUsed: number;
    messageCount: number;
  }[];
}

interface UseMonthlyCoinUsageQueryParams {
  year?: number;
  month?: number;
}

export function useMonthlyCoinUsageQuery(params?: UseMonthlyCoinUsageQueryParams) {
  const year = params?.year ?? new Date().getFullYear();
  const month = params?.month ?? new Date().getMonth() + 1;

  return useSuspenseQuery({
    queryKey: ["monthly-coin-usage", { year, month }],
    queryFn: async () => {
      const response = await api.get<GetMonthlyCoinUsageQuery>("/dashboard/usage/monthly", {
        params: { year, month },
      });
      response.data.dailyUsage.forEach((usage) => {
        usage.coinUsed *= BALANCE_MULTIPLIER;
      });
      response.data.modelUsage.forEach((usage) => {
        usage.coinUsed *= BALANCE_MULTIPLIER;
      });
      return response.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    meta: { persist: true },
  });
}
