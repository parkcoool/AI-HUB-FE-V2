import { useSuspenseQuery } from "@tanstack/react-query";

import { api } from "~/lib/api";
import { BALANCE_MULTIPLIER } from "~/shared/constants";

interface ModelPricing {
  modelId: number;
  modelName: string;
  displayName: string;
  inputPricePer1m: number;
  outputPricePer1m: number;
  isActive: boolean;
}

type GetModelsPricingResponse = ModelPricing[];

export function useListModelsPricingQuery() {
  return useSuspenseQuery({
    queryKey: ["model-pricing-list"],
    queryFn: async () => {
      const response = await api.get<GetModelsPricingResponse>("/dashboard/models/pricing");
      response.data.forEach((model) => {
        model.inputPricePer1m *= BALANCE_MULTIPLIER;
        model.outputPricePer1m *= BALANCE_MULTIPLIER;
      });
      return response.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    meta: { persist: true },
  });
}
