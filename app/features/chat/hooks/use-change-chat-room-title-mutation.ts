import { useMutation } from "@tanstack/react-query";

import { api } from "~/lib/api";

interface ChangeChatRoomTitleParams {
  title: string;
}

interface ChangeChatRoomTitleResponse {
  roomId: string;
  title: string;
  userId: number;
  coinUsage: number;
  createdAt: string;
  updatedAt: string;
}

interface UseChangeChatRoomTitleMutationParams {
  roomId: string;
}

export function useChangeChatRoomTitleMutation({ roomId }: UseChangeChatRoomTitleMutationParams) {
  return useMutation({
    mutationKey: ["change-chat-room-title", roomId],
    mutationFn: async (params: ChangeChatRoomTitleParams) => {
      const response = await api.put<ChangeChatRoomTitleResponse>(`/chat-rooms/${roomId}`, params);
      return response.data;
    },
    // TODO: useListChatRoomsQuery 페이지네이션 적용 후 optimistic update 적용
    onSuccess: async (_data, _variables, _onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: ["getUser"] });
    },
  });
}
