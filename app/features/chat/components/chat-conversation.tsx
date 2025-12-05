import logoSrc from "~/assets/logo.png";
import { Conversation, ConversationContent } from "~/components/ui/shadcn-io/ai/conversation";
import { Message, MessageAvatar, MessageContent } from "~/components/ui/shadcn-io/ai/message";
import { Spinner } from "~/components/ui/spinner";

import type { Message as MessageType } from "../types";

interface ChatConversationProps {
  messages: MessageType[];
}

export function ChatConversation({ messages }: ChatConversationProps) {
  if (messages.length === 0) {
    return <div className="m-auto text-muted-foreground">채팅 내용이 여기에 표시됩니다.</div>;
  }

  return (
    <div className="flex flex-1">
      {messages.length > 0 && (
        <Conversation className="flex-1">
          <ConversationContent>
            {messages.map((message) => (
              <div key={message.messageId} className="space-y-4">
                <Message from={message.role}>
                  <div className="flex flex-col gap-1 items-end">
                    {/* 메시지 내용 */}
                    <MessageContent>
                      {message.content.length === 0 ? (
                        // 답변 생성 중일 때
                        <div className="flex items-center gap-2">
                          <Spinner />
                          <span className="text-muted-foreground text-sm">생각 중...</span>
                        </div>
                      ) : (
                        // 일반 메시지일 때
                        <p>{message.content}</p>
                      )}
                    </MessageContent>

                    {/* 토큰 및 코인 정보 */}
                    <span className="text-xs text-muted-foreground">
                      {`${message.tokenCount} 토큰 ㆍ ${message.coinCount} 코인`}
                    </span>
                  </div>

                  {/* 보낸 사람 아바타 */}
                  {message.role === "assistant" && (
                    <MessageAvatar src={logoSrc} name={message.modelId.toString()} />
                  )}
                </Message>
              </div>
            ))}
          </ConversationContent>
        </Conversation>
      )}
    </div>
  );
}
