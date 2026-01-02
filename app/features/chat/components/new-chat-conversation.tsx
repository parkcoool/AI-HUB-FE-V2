import { useGetUserQuery } from "~/features/auth/hooks/use-get-user-query";

export function NewChatConversation() {
  const { data: user } = useGetUserQuery();

  return (
    <div className="flex h-full w-full items-center justify-center gap-4 flex-col">
      <p className="text-2xl font-medium">{user.username}님, 무엇을 도와드릴까요?</p>
    </div>
  );
}
