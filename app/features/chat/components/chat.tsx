import { Suspense } from "react";

import { Spinner } from "~/components/ui/spinner";

import { ChatConversation } from "./chat-conversation";
import { ChatInput } from "./chat-input";

interface ChatProps {
  roomId?: string;
}

export function Chat({ roomId }: ChatProps) {
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
            <ChatConversation roomId={roomId} />
          </Suspense>
        )}
      </div>

      {/* 입력 */}
      <div className="sticky bottom-0 p-4">
        <ChatInput isTyping={false} roomId={roomId} />
      </div>
    </div>
  );
}
