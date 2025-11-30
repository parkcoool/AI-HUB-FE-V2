import axios, { AxiosError } from "axios";
import createAuthRefreshInterceptor, {
  type AxiosAuthRefreshRequestConfig,
} from "axios-auth-refresh";
import { z } from "zod";

import { AppError, ServerError } from "~/lib/error";
import { ServerErrorCodeSchema } from "~/types/error-code";

const CommonResponse = z.union([
  z.object({
    success: z.literal(true),
    detail: z.unknown(),
    timestamp: z.string(),
  }),

  z.object({
    success: z.literal(false),
    detail: z.object({
      code: ServerErrorCodeSchema,
      message: z.string(),
      details: z.unknown().optional(),
    }),
    timestamp: z.string(),
  }),
]);

// axios 인스턴스 생성
export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,

  // 공통 응답 변환기
  transformResponse: (data) => {
    try {
      const parsedData = CommonResponse.parse(data);
      if (!parsedData.success)
        throw new ServerError(
          parsedData.detail.code,
          parsedData.detail.message,
          parsedData.detail.details
        );
      return parsedData.detail;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new AppError(
          "INVALID_RESPONSE_FORMAT",
          "서버에서 올바르지 않은 형식의 응답이 반환되었습니다.",
          error
        );
      }
      throw error;
    }
  },
});

// 인증 토큰 갱신 함수
const refreshAuth = async () => {
  const config: AxiosAuthRefreshRequestConfig = { withCredentials: true, skipAuthRefresh: true };
  await api.post(`${process.env.VITE_API_BASE_URL}/api/v1/token/refresh`, undefined, config);
};

createAuthRefreshInterceptor(
  api,
  async (error) => {
    if (error instanceof AxiosError && error.response?.status === 401) await refreshAuth();
  },
  { pauseInstanceWhileRefreshing: true }
);
