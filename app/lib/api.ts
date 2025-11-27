import axios from "axios";
import { unknown, z } from "zod";

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
      details: unknown().optional(),
    }),
    timestamp: z.string(),
  }),
]);

export const api = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,

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
