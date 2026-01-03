import { Suspense, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { useAttachments } from "../hooks/use-attachments";
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
  const { attachments, addFile, removeAttachment, clearAttachments } = useAttachments();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      addFile(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept: { "image/*": [] },
    validator: (file) => {
      if (file.size > 10 * 1024 * 1024)
        return {
          code: "file-too-large",
          message: "파일 크기는 10MB 이하이어야 합니다.",
        };

      return null;
    },
  });

  return (
    <div
      {...getRootProps({
        className: "flex flex-1 flex-col relative outline-none",
      })}
    >
      <input {...getInputProps()} />
      {isDragActive && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="text-xl">파일을 여기에 드롭하세요</div>
        </div>
      )}
      <div className="flex flex-1">
        {roomId ? (
          // 채팅 내용
          <Suspense
            fallback={
              <div className="flex flex-1 relative">
                <IndeterminantProgress className="absolute top-0 left-0 right-0 z-10" />
              </div>
            }
            key={roomId}
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
        <ChatInput
          isTyping={false}
          roomId={roomId}
          onFileUpload={open}
          attachments={attachments}
          clearAttachments={clearAttachments}
          removeAttachment={removeAttachment}
        />
      </div>
    </div>
  );
}
