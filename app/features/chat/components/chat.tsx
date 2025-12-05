import type { Message } from "../types";

import { ChatConversation } from "./chat-conversation";
import { ChatInput } from "./chat-input";

const messages: Message[] = [
  {
    messageId: "msg-1",
    role: "user" as const,
    content: "Hello, how are you?",
    tokenCount: 5,
    coinCount: 1,
    modelId: 1,
    createdAt: "2024-06-01T10:00:00Z",
    roomId: "room-1",
  },
  {
    messageId: "msg-2",
    role: "assistant" as const,
    content: "I'm doing well, thank you! How can I assist you today?",
    tokenCount: 10,
    coinCount: 2,
    modelId: 3,
    createdAt: "2024-06-01T10:00:05Z",
    roomId: "room-1",
  },
  {
    messageId: "msg-3",
    role: "user" as const,
    content: "What is the weather like today?",
    tokenCount: 7,
    coinCount: 1,
    modelId: 2,
    createdAt: "2024-06-01T10:01:00Z",
    roomId: "room-1",
  },
  {
    messageId: "msg-4",
    role: "assistant" as const,
    content: "",
    tokenCount: 0,
    coinCount: 0,
    modelId: 2,
    createdAt: "2024-06-01T10:01:00Z",
    roomId: "room-1",
  },
];

interface ChatProps {
  activeRoomId?: string;
}

export function Chat({ activeRoomId }: ChatProps) {
  return (
    <div className="flex flex-1 flex-col">
      {/* 채팅 내용 */}
      <div className="flex flex-1">
        <ChatConversation messages={messages} />
      </div>

      {/* 입력 */}
      <div className="sticky bottom-0 p-4">
        <ChatInput isTyping={false} activeRoomId={activeRoomId} />
      </div>
    </div>
  );
}
