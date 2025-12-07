import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router";

import { AppError } from "~/lib/error";

import { AuthLoading } from "../components/auth-loading";
import { getUserQueryOptions } from "../hooks/use-get-user-query";

import type { Route } from "./+types/public";

function Content() {
  const { data: user, isLoading, error } = useQuery(getUserQueryOptions);

  if (isLoading) return <AuthLoading />;

  if (error) {
    if (error instanceof AppError && error.code === "TOKEN_REFRESH_FAILED") {
      return <Outlet />;
    }
    throw error;
  }

  if (user) return <Navigate to="/chat" replace />;

  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (error instanceof AppError && error.code === "TOKEN_REFRESH_FAILED") {
    return <Outlet />;
  }
  throw error;
}

export default function PublicLayout() {
  return <Content />;
}
