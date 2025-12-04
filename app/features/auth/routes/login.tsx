import { LoginForm } from "../components/login-form";

export default function LoginPage() {
  // TODO: 로그인된 상태인 경우 `/chat`으로 리다이렉트 처리

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
