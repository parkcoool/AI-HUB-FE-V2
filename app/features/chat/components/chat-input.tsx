import { ArrowDown, ArrowUp, PaperclipIcon } from "lucide-react";
import { useState } from "react";

import {
  PromptInput,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
  PromptInputButton,
  PromptInputModelSelect,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputSubmit,
  PromptInputAttachment,
  PromptInputAttachments,
} from "~/components/ui/shadcn-io/ai/prompt-input";

import { useListModelsQuery } from "../hooks/use-list-models-query";
import { useSendMessageMutation } from "../hooks/use-send-message-mutation";
import type { Attachment, Model } from "../types";

interface ChatInputProps {
  isTyping: boolean;
  roomId?: string;
  onFileUpload: () => void;
  attachments: Attachment[];
  clearAttachments: () => void;
  removeAttachment: (fileId: string) => void;
  selectedModel: Model;
  setSelectedModel: (model: Model) => void;
}

export function ChatInput({
  isTyping,
  roomId,
  onFileUpload,
  attachments = [],
  clearAttachments,
  removeAttachment,
  selectedModel,
  setSelectedModel,
}: ChatInputProps) {
  const { data: models } = useListModelsQuery();
  const { mutate: sendMessage, isPending: isSendingMessage } = useSendMessageMutation({ roomId });

  const [inputValue, setInputValue] = useState("");

  // 전송 비활성화 여부
  const isSubmitDisabled =
    !inputValue.trim() ||
    isTyping ||
    isSendingMessage ||
    attachments.some((attachment) => !attachment.isUploaded);

  // 메시지 전송 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    sendMessage({
      message: inputValue,
      modelId: selectedModel.modelId,
      files: attachments.map((att) => ({ id: att.fileId, type: "image" })),
    });
    setInputValue("");
    clearAttachments?.();
  };

  return (
    <PromptInput onSubmit={handleSubmit}>
      {/* 첨부 파일 */}
      {attachments.length > 0 && (
        <PromptInputAttachments>
          {attachments.map((attachment) => (
            <PromptInputAttachment
              key={attachment.fileId}
              attachment={attachment}
              onRemove={(attachment) => removeAttachment(attachment.fileId)}
            />
          ))}
        </PromptInputAttachments>
      )}

      {/* 입력창 */}
      <PromptInputTextarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="무엇이든 물어보세요..."
        disabled={isTyping}
      />

      {/* 툴바 */}
      <PromptInputToolbar>
        <PromptInputTools>
          {/* 첨부 파일 */}
          <PromptInputButton disabled={isTyping} onClick={onFileUpload} type="button">
            <PaperclipIcon size={16} />
          </PromptInputButton>

          {/* 모델 선택 */}
          <PromptInputModelSelect
            value={selectedModel.modelId.toString()}
            onValueChange={(modelId) =>
              setSelectedModel(
                models.find((m) => m.modelId.toString() === modelId) ?? selectedModel
              )
            }
            disabled={isTyping}
          >
            <PromptInputModelSelectTrigger>
              <PromptInputModelSelectValue />
            </PromptInputModelSelectTrigger>
            <PromptInputModelSelectContent>
              {models.map((model) => (
                <PromptInputModelSelectItem
                  key={model.modelId}
                  value={model.modelId.toString()}
                  disabled={!model.isActive}
                >
                  <div className="flex flex-1 items-center justify-between gap-4">
                    {model.modelName}
                    <div className="ml-auto flex items-center space-x-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-0.5">
                        <ArrowUp />
                        {model.inputPricePer1m.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <ArrowDown />
                        {model.outputPricePer1m.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                </PromptInputModelSelectItem>
              ))}
            </PromptInputModelSelectContent>
          </PromptInputModelSelect>
        </PromptInputTools>
        <PromptInputSubmit disabled={isSubmitDisabled} status={isTyping ? "streaming" : "ready"} />
      </PromptInputToolbar>
    </PromptInput>
  );
}
