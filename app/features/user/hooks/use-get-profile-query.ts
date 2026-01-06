import { useSuspenseQuery } from "@tanstack/react-query";

import { api } from "~/lib/api";

type GetProfileResponse = {
  userId: number;
  username: string;
  email: string;
  isActivated: boolean;
  createdAt: string;
};

export function useGetProfileQuery() {
  return useSuspenseQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await api.get<GetProfileResponse>("/users/me");
      return response.data;
    },
    staleTime: Infinity,
  });
}
