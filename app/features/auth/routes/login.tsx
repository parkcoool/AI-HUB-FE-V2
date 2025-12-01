import { Navigate } from "react-router";

import { LoginForm } from "../components/login-form";
import { useGetUserQuery } from "../hooks/use-get-user-query";

export default function LoginPage() {
  const { data: user } = useGetUserQuery();

  if (user) return <Navigate to="/chat" replace />;

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
