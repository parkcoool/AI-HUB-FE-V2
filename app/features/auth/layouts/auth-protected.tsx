import { Navigate, Outlet } from "react-router";

import { Spinner } from "~/components/ui/spinner";

import { useGetUserQuery } from "../hooks/use-get-user-query";

export default function AuthProtectedLayout() {
  const { isLoading, error } = useGetUserQuery();

  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  if (error) return <Navigate to="/" replace />;

  return <Outlet />;
}
