import { AxiosError } from "axios";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router";

import { AuthLoading } from "../components/auth-loading";
import { useGetUserQuery } from "../hooks/use-get-user-query";

import type { Route } from "./+types/auth-protected";

function Content() {
  useGetUserQuery();
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (error instanceof AxiosError && error.response?.status === 401) {
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
