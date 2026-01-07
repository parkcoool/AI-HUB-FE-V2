import { useMutation } from "@tanstack/react-query";

import { api } from "~/lib/api";
import { AppError } from "~/lib/error";
import { AppErrorCodeSchema } from "~/types/error-code";

type LogoutResponse = void;

export function useLogoutMutation() {
  return useMutation<LogoutResponse>({
    mutationKey: ["logout"],
    mutationFn: async () => {
      try {
        const response = await api.post<LogoutResponse>("/auth/logout");
        return response.data;
      } catch (error) {
        // /auth/logout 엔드포인트는 204 No Content를 반환
        if (
          error instanceof AppError &&
          error.code === AppErrorCodeSchema.enum.INVALID_RESPONSE_FORMAT
        ) {
          return;
        }
        throw error;
      }
    },
    onSuccess: async (_data, _variables, _onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: ["get-user"] });
      location.href = "/";
    },
  });
}
