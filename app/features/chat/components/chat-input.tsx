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
} from "~/components/ui/shadcn-io/ai/prompt-input";

import { useListModelsQuery } from "../hooks/use-list-models-query";
import { useSendMessageMutation } from "../hooks/use-send-message-mutation";
import type { Model } from "../types";

interface ChatInputProps {
  isTyping: boolean;
  defaultModel?: Model;
  roomId?: string;
}

export function ChatInput({ isTyping, defaultModel, roomId }: ChatInputProps) {
  const { data: models } = useListModelsQuery();
  const { mutate: sendMessage, isPending: isSendingMessage } = useSendMessageMutation({ roomId });

  const [inputValue, setInputValue] = useState("");
  const [selectedModel, setSelectedModel] = useState<Model>(defaultModel ?? models[0]);

  // 전송 비활성화 여부
  const isSubmitDisabled = !inputValue.trim() || isTyping || isSendingMessage;

  // 메시지 전송 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    sendMessage({ message: inputValue, modelId: selectedModel.modelId });
    setInputValue("");
  };

  return (
    <PromptInput onSubmit={handleSubmit}>
      <PromptInputTextarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="무엇이든 물어보세요..."
        disabled={isTyping}
      />
      <PromptInputToolbar>
        <PromptInputTools>
          {/* 첨부 파일 */}
          <PromptInputButton disabled={isTyping}>
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
                        {model.inputPricePer1m}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <ArrowDown />
                        {model.outputPricePer1m}
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
