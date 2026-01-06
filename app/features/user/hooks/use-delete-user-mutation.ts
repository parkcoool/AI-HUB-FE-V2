import { useMutation } from "@tanstack/react-query";

import { api } from "~/lib/api";

type DeleteUserResponse = void;

export function useDeleteUserMutation() {
  return useMutation({
    mutationKey: ["delete-user"],
    mutationFn: async () => {
      const response = await api.delete<DeleteUserResponse>(`/users/me`);
      return response.data;
    },
    onSuccess: async (_data, _variables, _onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: ["profile"] });
      context.client.invalidateQueries({ queryKey: ["get-user"] });
    },
  });
}
