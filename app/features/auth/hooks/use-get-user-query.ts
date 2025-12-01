import { useQuery } from "@tanstack/react-query";

import { api } from "~/lib/api";

interface GetUserResponse {
  userId: number;
  username: string;
  email: string;
  isActivated: boolean;
  createdAt: string;
}

export function useGetUserQuery() {
  return useQuery({
    queryKey: ["getUser"],
    queryFn: async () => {
      const response = await api.get<GetUserResponse>("/users/me");
      return response.data;
    },
    retry: false,
  });
}
