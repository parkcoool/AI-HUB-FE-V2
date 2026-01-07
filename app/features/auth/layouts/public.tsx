import { Outlet, redirect } from "react-router";

import { AppError } from "~/lib/error";
import { queryClient } from "~/root";

import { getUserQueryOptions } from "../hooks/use-get-user-query";

export async function clientLoader() {
  try {
    await queryClient.ensureQueryData(getUserQueryOptions);
    return redirect("/chat");
  } catch (error) {
    if (error instanceof AppError && error.code === "TOKEN_REFRESH_FAILED") {
      return null;
    }
    throw error;
  }
}

export default function PublicLayout() {
  return <Outlet />;
}
