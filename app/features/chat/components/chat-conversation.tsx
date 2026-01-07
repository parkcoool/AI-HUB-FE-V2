import InfiniteScroll from "react-infinite-scroll-component";
import Markdown from "react-markdown";

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
import { IndeterminantProgress } from "~/shared/components/indeterminant-progress";

import { useListMessagesQuery } from "../hooks/use-list-messages-query";

import { NewChatConversation } from "./new-chat-conversation";

interface ChatConversationProps {
  roomId?: string;
  chatInputHeight?: number;
}

export function ChatConversation({ roomId, chatInputHeight }: ChatConversationProps) {
  const {
    data: { pages: messages },
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useListMessagesQuery({ roomId });

  return (
    <div className="flex flex-1 relative">
      {isFetching && <IndeterminantProgress className="absolute top-0 left-0 right-0 z-10" />}

      <div className="flex flex-1">
        {messages.length > 0 ? (
          <Conversation className="flex flex-1">
            <ConversationContent
              id="conversation-content"
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
                scrollableTarget="conversation-content"
                style={{ paddingBottom: chatInputHeight }}
              >
                {messages.map((message) => (
                  <div key={message.messageId} className="space-y-4">
                    <Message from={message.role}>
                      <div className="flex flex-col gap-1 group-[.is-assistant]:w-full">
                        {/* 메시지 내용 */}
                        {message.content.length === 0 ? (
                          // 답변 생성 중일 때
                          <div className="flex items-center gap-2 h-8 my-2 px-4">
                            <Spinner />
                            <span className="text-muted-foreground text-sm">생각 중...</span>
                          </div>
                        ) : (
                          // 일반 메시지일 때
                          <MessageContent>
                            <div className="prose prose-neutral max-w-full prose-p:my-2 prose-code:whitespace-break-spaces group-[.is-user]:prose-invert flex flex-col">
                              <Markdown>{message.content}</Markdown>
                            </div>
                          </MessageContent>
                        )}

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
        ) : (
          <NewChatConversation />
        )}
      </div>
    </div>
  );
}
