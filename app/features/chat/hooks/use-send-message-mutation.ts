import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { SSE } from "sse.js";

import { addMessageCache } from "../helpers/add-message-cache";
import { createChatRoom } from "../helpers/create-chat-room";
import { modifyMessageCache } from "../helpers/modify-message-cache";

import type { ListMessagesResponse } from "./use-list-messages-query";

type Message = ListMessagesResponse["content"][number];

interface SendMessageParams {
  message: string;
  modelId: number;
  fileId?: string;
  previousResponseId?: string;
}

interface ResponseEventData {
  type: "response";
  data: string;
}

interface UsageEventData {
  type: "usage";
  aiResponseId: string;
  fullContent: string;
  usage: {
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
  };
}

interface UseSendMessageMutationParams {
  roomId?: string;
}

export function useSendMessageMutation({ roomId }: UseSendMessageMutationParams) {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["send-message"],
    mutationFn: async (params: SendMessageParams, context) => {
      let ensuredRoomId = roomId;

      // 새 채팅방인 경우
      if (ensuredRoomId === undefined) {
        const { roomId } = await createChatRoom({
          title: "New Chat",
          modelId: params.modelId,
        });
        ensuredRoomId = roomId;

        context.client.invalidateQueries({ queryKey: ["chat-rooms"] });
        navigate(`/chat/${ensuredRoomId}`);
      }

      // 사용자 메시지를 캐시에 추가
      const userMessage: Message = {
        messageId: crypto.randomUUID(),
        role: "user",
        content: params.message,
        tokenCount: 0,
        coinCount: 0,
        modelId: params.modelId,
        createdAt: new Date().toISOString(),
      };
      addMessageCache(ensuredRoomId, userMessage, context.client);

      // AI 메시지를 캐시에 추가
      const responseMessage: Message = {
        messageId: crypto.randomUUID(),
        role: "assistant",
        content: "",
        tokenCount: 0,
        coinCount: 0,
        modelId: params.modelId,
        createdAt: new Date().toISOString(),
      };
      addMessageCache(ensuredRoomId, responseMessage, context.client);

      return new Promise<void>((resolve, reject) => {
        const baseURL = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL}/api/v1/messages/send/${ensuredRoomId}`;

        // SSE 연결 설정
        const source = new SSE(url, {
          headers: { "Content-Type": "application/json" },
          payload: JSON.stringify(params),
          method: "POST",
          withCredentials: true,
        });

        // 1) started 이벤트
        source.addEventListener("started", () => {});

        // 2) response 이벤트
        source.addEventListener("response", (event: { data: string }) => {
          try {
            const responseData: ResponseEventData = JSON.parse(event.data);

            responseMessage.content += responseData.data;

            modifyMessageCache(
              ensuredRoomId,
              {
                pageIndex: 0,
                messageIndex: 0,
              },
              { content: responseMessage.content },
              context.client
            );
          } catch (error) {
            source.close();
            reject(error);
          }
        });

        // 3) usage 이벤트
        source.addEventListener("usage", (event: { data: string }) => {
          try {
            const completedData: UsageEventData = JSON.parse(event.data);

            responseMessage.messageId = completedData.aiResponseId;
            responseMessage.tokenCount = completedData.usage.output_tokens;
            responseMessage.content = completedData.fullContent;

            modifyMessageCache(
              ensuredRoomId,
              { pageIndex: 0, messageIndex: 0 },
              responseMessage,
              context.client
            );
            modifyMessageCache(
              ensuredRoomId,
              { pageIndex: 0, messageIndex: 1 },
              { tokenCount: completedData.usage.input_tokens },
              context.client
            );

            resolve();
          } catch (error) {
            reject(error);
          } finally {
            source.close();
          }
        });

        source.addEventListener("error", (event: { data: string }) => {
          // TODO: 응답 메시지 삭제
          source.close();
          reject(new Error(`SSE connection error: ${event.data || "Unknown error"}`));
        });
      });
    },
  });
}
