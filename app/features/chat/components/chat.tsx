import { Suspense } from "react";

import { useDivHeight } from "../hooks/use-div-height";

import { ChatConversation } from "./chat-conversation";
import { ChatInput } from "./chat-input";
import { IndeterminantProgress } from "./indeterminant-progress";
import { NewChatConversation } from "./new-chat-conversation";

interface ChatProps {
  roomId?: string;
}

export function Chat({ roomId }: ChatProps) {
  const { height: chatInputHeight, ref: chatInputRef } = useDivHeight();

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1">
        {roomId ? (
          // 채팅 내용
          <Suspense
            fallback={
              <div className="flex h-full w-full">
                <IndeterminantProgress className="absolute top-0 left-0 right-0 z-10" />
              </div>
            }
          >
            <ChatConversation roomId={roomId} chatInputHeight={chatInputHeight} />
          </Suspense>
        ) : (
          // 새 대화 시작
          <NewChatConversation />
        )}
      </div>

      {/* 입력 */}
      <div className="absolute left-0 right-0 bottom-0 mx-6 my-4" ref={chatInputRef}>
        <ChatInput isTyping={false} roomId={roomId} />
      </div>
    </div>
  );
}
