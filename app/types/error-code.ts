import { z } from "zod";

export const ServerErrorCodeSchema = z.enum([
  "INTERNAL_SERVER_ERROR",
  "AUTHENTICATION_FAILED",
  "VALIDATION_ERROR",
  "INSUFFICIENT_BALANCE",
  "ROOM_NOT_FOUND",
  "MESSAGE_NOT_FOUND",
  "MODEL_NOT_FOUND",
  "PAYMENT_FAILED",
  "PAYMENT_NOT_FOUND",
  "WALLET_NOT_FOUND",
  "INVALID_TOKEN",
  "FORBIDDEN",
  "TRANSACTION_NOT_FOUND",
  "CONFLICT",
  "TOKEN_REUSED",
  "SYSTEM_ILLEGAL_STATE",
  "ROTATED",
  "EXPIRED",
  "USER_LOGOUT",
]);
export type ServerErrorCode = z.infer<typeof ServerErrorCodeSchema>;

export const AppErrorCodeSchema = z.enum([
  "NETWORK_ERROR",
  "TIMEOUT",
  "INVALID_RESPONSE_FORMAT",
  "TOKEN_REFRESH_FAILED",
]);
export type AppErrorCode = z.infer<typeof AppErrorCodeSchema>;
