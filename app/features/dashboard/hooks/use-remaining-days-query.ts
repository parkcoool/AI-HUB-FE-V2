import { useSuspenseQuery } from "@tanstack/react-query";

import { api } from "~/lib/api";

export interface GetRemainingDaysResponse {
  remainingDays: number | null;
}

export function useRemainingDaysQuery() {
  return useSuspenseQuery({
    queryKey: ["remaining-days"],
    queryFn: async () => {
      const response = await api.get<GetRemainingDaysResponse>(
        "/dashboard/usage/predict-remaining-days",
      );
      return response.data;
    },
    select: (data) => data.remainingDays,
    meta: { persist: true },
  });
}
