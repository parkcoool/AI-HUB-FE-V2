import { useMutation } from "@tanstack/react-query";

import { api } from "~/lib/api";

type ChangeChatRoomTitleResponse = void;

interface UseChangeChatRoomTitleMutationParams {
  roomId: string;
}

export function useDeleteChatRoomMutation({ roomId }: UseChangeChatRoomTitleMutationParams) {
  return useMutation({
    mutationKey: ["delete-chat-room", roomId],
    mutationFn: async () => {
      const response = await api.delete<ChangeChatRoomTitleResponse>(`/chat-rooms/${roomId}`);
      return response.data;
    },
    // TODO: useListChatRoomsQuery 페이지네이션 적용 후 optimistic update 적용
    onSuccess: async (_data, _variables, _onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: ["chat-rooms"] });
    },
  });
}
