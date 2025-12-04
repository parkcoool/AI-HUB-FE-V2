import { Spinner } from "~/components/ui/spinner";

export function AuthLoading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Spinner className="size-10" />
    </div>
  );
}
