import InfiniteScroll from "react-infinite-scroll-component";

import logoSrc from "~/assets/logo.png";
import { Conversation, ConversationContent } from "~/components/ui/shadcn-io/ai/conversation";
import {
  Message,
  MessageAvatar,
  MessageCoinUsage,
  MessageContent,
  MessageDetails,
} from "~/components/ui/shadcn-io/ai/message";
import { Spinner } from "~/components/ui/spinner";

import { useListMessagesQuery } from "../hooks/use-list-messages-query";

import { Typing } from "./typing";

interface ChatConversationProps {
  roomId?: string;
  chatInputHeight?: number;
}

export function ChatConversation({ roomId, chatInputHeight }: ChatConversationProps) {
  const {
    data: { pages: messages },
    hasNextPage,
    fetchNextPage,
  } = useListMessagesQuery({ roomId });

  if (messages.length === 0) {
    return <div className="m-auto text-muted-foreground">채팅 내용이 여기에 표시됩니다.</div>;
  }

  return (
    <div className="flex flex-1">
      {messages.length > 0 && (
        <Conversation className="flex flex-1">
          <ConversationContent
            id="scrollableDiv"
            className="flex flex-col-reverse h-[calc(100vh-64px)] overflow-auto"
          >
            <InfiniteScroll
              dataLength={messages.length}
              className="flex flex-col-reverse"
              next={fetchNextPage}
              hasMore={hasNextPage}
              inverse
              loader={
                <div className="flex flex-1 justify-center">
                  <Spinner className="m-4 size-10" />
                </div>
              }
              scrollableTarget="scrollableDiv"
              style={{ paddingBottom: chatInputHeight }}
            >
              {messages.map((message) => (
                <div key={message.messageId} className="space-y-4">
                  <Message from={message.role}>
                    <div className="flex flex-col gap-1">
                      {/* 메시지 내용 */}
                      <MessageContent>
                        {message.content.length === 0 ? (
                          // 답변 생성 중일 때
                          <div className="flex items-center gap-2">
                            <Spinner />
                            <span className="text-muted-foreground text-sm">생각 중...</span>
                          </div>
                        ) : // 일반 메시지일 때
                        message.role === "user" ? (
                          <p>{message.content}</p>
                        ) : (
                          <Typing initial={message.isLoading} speed={message.isLoading ? 40 : 100}>
                            {message.content}
                          </Typing>
                        )}
                      </MessageContent>

                      <MessageDetails>
                        {/* 코인 사용량 */}
                        {message.coinCount > 0 && (
                          <MessageCoinUsage coinUsage={message.coinCount} />
                        )}
                      </MessageDetails>
                    </div>

                    {/* 보낸 사람 아바타 */}
                    {message.role === "assistant" && (
                      <MessageAvatar
                        src={logoSrc}
                        name={message.modelId.toString()}
                        className="my-2"
                      />
                    )}
                  </Message>
                </div>
              ))}
            </InfiniteScroll>
          </ConversationContent>
        </Conversation>
      )}
    </div>
  );
}
