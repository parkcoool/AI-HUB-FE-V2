import { Outlet, redirect } from "react-router";

import { AppError } from "~/lib/error";
import { queryClient } from "~/root";

import { getUserQueryOptions } from "../hooks/use-get-user-query";

export async function clientLoader() {
  try {
    const user = await queryClient.ensureQueryData(getUserQueryOptions);
    return user;
  } catch (error) {
    if (error instanceof AppError && error.code === "TOKEN_REFRESH_FAILED") {
      return redirect("/");
    }
    throw error;
  }
}

export default function AuthProtectedLayout() {
  return <Outlet />;
}
