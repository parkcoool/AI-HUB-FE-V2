import type { ServerErrorCode, AppErrorCode } from "~/types/error-code";

export class ServerError extends Error {
  constructor(
    public code: ServerErrorCode,
    public message: string,
    public details?: unknown
  ) {
    super(message);
  }
}

export class AppError extends Error {
  constructor(
    public code: AppErrorCode,
    public message: string,
    public details?: unknown
  ) {
    console.error(`AppError [${code}]: ${message}`, details);
    super(message);
  }
}
