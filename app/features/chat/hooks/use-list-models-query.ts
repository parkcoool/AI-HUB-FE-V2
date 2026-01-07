import { useSuspenseQuery } from "@tanstack/react-query";

import { api } from "~/lib/api";
import { BALANCE_MULTIPLIER } from "~/shared/constants";

type ListModelsResponse = {
  modelId: number;
  modelName: string;
  displayName: string;
  displayExplain: string;
  inputPricePer1m: number;
  outputPricePer1m: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}[];

export function useListModelsQuery() {
  return useSuspenseQuery({
    queryKey: ["models"],
    queryFn: async () => {
      const response = await api.get<ListModelsResponse>("/models");
      const data = response.data.map((model) => ({
        ...model,
        inputPricePer1m: model.inputPricePer1m * BALANCE_MULTIPLIER,
        outputPricePer1m: model.outputPricePer1m * BALANCE_MULTIPLIER,
      }));
      return data;
    },
    staleTime: Infinity,
    meta: { persist: true },
  });
}
