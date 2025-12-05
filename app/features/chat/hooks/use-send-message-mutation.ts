import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { api } from "~/lib/api";

import { createChatRoom } from "../helpers/create-chat-room";

interface SendMessageParams {
  message: string;
  modelId: number;
  fileId?: string;
  previousResponseId?: string;
}

type SendMessageResponse = void;

interface UseSendMessageMutationParams {
  roomId?: string;
}

export function useSendMessageMutation({ roomId }: UseSendMessageMutationParams) {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["send-message"],
    mutationFn: async (params: SendMessageParams) => {
      let ensuredRoomId = roomId;

      // 새 채팅방인 경우
      if (ensuredRoomId === undefined) {
        const { roomId } = await createChatRoom({
          title: "New Chat",
          modelId: params.modelId,
        });
        ensuredRoomId = roomId;
        navigate(`/chat/${ensuredRoomId}`);
      }

      await api.post<SendMessageResponse>(`/messages/send/${ensuredRoomId}`, params, {
        headers: { Accept: "*" },
        onDownloadProgress: (event) => {
          console.log(event.event);
        },
      });
    },
  });
}
