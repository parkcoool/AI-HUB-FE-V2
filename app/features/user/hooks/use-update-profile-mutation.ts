import { useMutation } from "@tanstack/react-query";

import { api } from "~/lib/api";

interface UpdateProfileParams {
  email: string;
  username: string;
}

interface UpdateProfileResponse {
  userId: number;
  username: string;
  email: string;
  isActivated: boolean;
  createdAt: string;
}

export function useUpdateProfileMutation() {
  return useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async (params: UpdateProfileParams) => {
      const response = await api.put<UpdateProfileResponse>(`/users/me`, params);
      return response.data;
    },
    onSuccess: async (_data, _variables, _onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: ["get-user"] });
    },
  });
}
