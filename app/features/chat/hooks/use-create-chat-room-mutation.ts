import { useMutation } from "@tanstack/react-query";

import { api } from "~/lib/api";

interface CreateChatRoomRequest {
  title: string;
  modelId: string;
}

interface CreateChatRoomResponse {
  roomId: string;
  title: string;
  userId: number;
  coinUsage: number;
  createdAt: string;
  updatedAt: string;
}

interface UseCreateChatRoomMutationParams {
  message: string;
  modelId: string;
  fileId?: string;
}

export function useCreateChatRoomMutation({
  message,
  modelId,
  fileId,
}: UseCreateChatRoomMutationParams) {
  return useMutation<CreateChatRoomResponse, unknown, CreateChatRoomRequest>({
    mutationKey: ["createChatRoom"],
    mutationFn: async (data) => {
      const response = await api.post<CreateChatRoomResponse>("/chat-rooms", data);
      return response.data;
    },
    onSuccess: (_data, _variables, _onMutateResult, context) => {
      // TODO: 새 채팅방에 메시지 전송
      context.client.invalidateQueries({ queryKey: ["chatRooms"] });
    },
  });
}
