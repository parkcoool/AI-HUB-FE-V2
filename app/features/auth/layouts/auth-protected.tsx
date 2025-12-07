import { Suspense } from "react";
import { Navigate, Outlet } from "react-router";

import { AppError } from "~/lib/error";

import { AuthLoading } from "../components/auth-loading";
import { useGetUserQuery } from "../hooks/use-get-user-query";

import type { Route } from "./+types/auth-protected";

function Content() {
  const { error } = useGetUserQuery();
  if (error) throw error;
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (error instanceof AppError && error.code === "TOKEN_REFRESH_FAILED") {
    return <Navigate to="/" replace />;
  }
  throw error;
}

export default function AuthProtectedLayout() {
  return (
    <Suspense fallback={<AuthLoading />}>
      <Content />
    </Suspense>
  );
}
