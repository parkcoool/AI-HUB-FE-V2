import { useState } from "react";

import logoSrc from "~/assets/logo.png";
import { Conversation, ConversationContent } from "~/components/ui/shadcn-io/ai/conversation";
import { Message, MessageAvatar, MessageContent } from "~/components/ui/shadcn-io/ai/message";
import { Spinner } from "~/components/ui/spinner";

import { ChatInput } from "./chat-input";

const messages = [
  {
    messageId: "msg-1",
    role: "user" as const,
    content: "Hello, how are you?",
    tokenCount: 5,
    coinCount: 1,
    modelId: "gpt-4",
    createdAt: "2024-06-01T10:00:00Z",
  },
  {
    messageId: "msg-2",
    role: "assistant" as const,
    content: "I'm doing well, thank you! How can I assist you today?",
    tokenCount: 10,
    coinCount: 2,
    modelId: "gpt-4",
    createdAt: "2024-06-01T10:00:05Z",
  },
  {
    messageId: "msg-3",
    role: "user" as const,
    content: "What is the weather like today?",
    tokenCount: 7,
    coinCount: 1,
    modelId: "gpt-4",
    createdAt: "2024-06-01T10:01:00Z",
  },
  {
    messageId: "msg-4",
    role: "assistant" as const,
    content: "",
    tokenCount: 0,
    coinCount: 0,
    modelId: "gpt-4",
    createdAt: "2024-06-01T10:01:00Z",
  },
];

export function Chat() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex flex-1 flex-col">
      {/* 채팅 내용 */}
      <div className="flex flex-1">
        {messages.length > 0 && (
          <Conversation className="flex-1">
            <ConversationContent>
              {messages.map((message) => (
                <div key={message.messageId} className="space-y-4">
                  <Message from={message.role}>
                    <div className="flex flex-col gap-1 items-end">
                      <MessageContent>
                        {message.content === "" ? (
                          <div className="flex items-center gap-2">
                            <Spinner />
                            <span className="text-muted-foreground text-sm">생각 중...</span>
                          </div>
                        ) : (
                          <p>{message.content}</p>
                        )}
                      </MessageContent>
                      <span className="text-xs text-muted-foreground">
                        {`${message.tokenCount} 토큰 ㆍ ${message.coinCount} 코인`}
                      </span>
                    </div>
                    {message.role === "assistant" && (
                      <MessageAvatar src={logoSrc} name={message.modelId} />
                    )}
                  </Message>
                </div>
              ))}
            </ConversationContent>
          </Conversation>
        )}

        {messages.length === 0 && (
          <div className="m-auto text-muted-foreground">채팅 내용이 여기에 표시됩니다.</div>
        )}
      </div>

      {/* 입력 */}
      <div className="sticky bottom-0 p-4">
        <ChatInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          isTyping={false}
          handleSubmit={() => {}}
        />
      </div>
    </div>
  );
}
