import { useMutation } from "@tanstack/react-query";

import { api } from "~/lib/api";

type LogoutResponse = void;

export function useLogoutMutation() {
  return useMutation<LogoutResponse>({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const response = await api.post<LogoutResponse>("/auth/logout");
      return response.data;
    },
    onMutate: async (_variables, context) => {
      context.client.invalidateQueries({ queryKey: ["getUser"] });
    },
  });
}
