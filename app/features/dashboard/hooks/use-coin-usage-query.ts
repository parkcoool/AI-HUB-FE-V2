import { useSuspenseQuery } from "@tanstack/react-query";

import { api } from "~/lib/api";
import { BALANCE_MULTIPLIER } from "~/shared/constants";

export interface GetCoinUsageResponse {
  currentYear: number;
  currentMonth: number;
  previousYear: number;
  previousMonth: number;
  currentMonthUsage: number;
  previousMonthUsage: number;
  changeAmount: number;
  changeRate: number | null;
}

interface UseCoinUsageQueryParams {
  year?: number;
  month?: number;
}

export function useCoinUsageQuery(params?: UseCoinUsageQueryParams) {
  const year = params?.year ?? new Date().getFullYear();
  const month = params?.month ?? new Date().getMonth() + 1;

  return useSuspenseQuery({
    queryKey: ["coin-usage", { year, month }],
    queryFn: async () => {
      const response = await api.get<GetCoinUsageResponse>("/dashboard/usage/monthly-change", {
        params: { year, month },
      });
      response.data.currentMonthUsage *= BALANCE_MULTIPLIER;
      response.data.previousMonthUsage *= BALANCE_MULTIPLIER;
      response.data.changeAmount *= BALANCE_MULTIPLIER;
      return response.data;
    },
    meta: { persist: true },
  });
}
