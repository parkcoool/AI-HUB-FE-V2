import { Suspense } from "react";

import { Spinner } from "~/components/ui/spinner";

import { useDivHeight } from "../hooks/use-div-height";

import { ChatConversation } from "./chat-conversation";
import { ChatInput } from "./chat-input";

interface ChatProps {
  roomId?: string;
}

export function Chat({ roomId }: ChatProps) {
  const { height: chatInputHeight, ref: chatInputRef } = useDivHeight();

  return (
    <div className="flex flex-1 flex-col">
      {/* 채팅 내용 */}
      <div className="flex flex-1">
        {roomId !== undefined && (
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <Spinner className="size-8" />
              </div>
            }
          >
            <ChatConversation roomId={roomId} chatInputHeight={chatInputHeight} />
          </Suspense>
        )}
      </div>

      {/* 입력 */}
      <div className="absolute left-0 right-0 bottom-0 mx-6 my-4" ref={chatInputRef}>
        <ChatInput isTyping={false} roomId={roomId} />
      </div>
    </div>
  );
}
