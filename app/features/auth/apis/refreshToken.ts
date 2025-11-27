import type { AxiosAuthRefreshRequestConfig } from "axios-auth-refresh";

import { api } from "~/lib/api";

interface RefreshTokenResponse {
  accessToken: string;
  expiresIn: number;
}

export async function refreshToken() {
  const config: AxiosAuthRefreshRequestConfig = { withCredentials: true, skipAuthRefresh: true };
  const response = await api.post<RefreshTokenResponse>(
    `${process.env.VITE_API_BASE_URL}/api/v1/token/refresh`,
    undefined,
    config
  );

  return response.data;
}
