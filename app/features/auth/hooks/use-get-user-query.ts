import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { api } from "~/lib/api";

interface GetUserResponse {
  userId: number;
  username: string;
  email: string;
  isActivated: boolean;
  createdAt: string;
}

export const getUserQueryOptions = queryOptions({
  queryKey: ["get-user"],
  queryFn: async () => {
    const response = await api.get<GetUserResponse>("/users/me");
    return response.data;
  },
  retry: false,
  refetchOnWindowFocus: (query) => query.state.data !== undefined,
  refetchOnMount: false,
  meta: { persist: true },
});

export function useGetUserQuery() {
  return useSuspenseQuery(getUserQueryOptions);
}
