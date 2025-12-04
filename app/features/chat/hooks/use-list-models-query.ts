import { useSuspenseQuery } from "@tanstack/react-query";

import { api } from "~/lib/api";

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
      return response.data;
    },
    staleTime: Infinity,
  });
}
