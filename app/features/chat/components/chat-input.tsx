import { ArrowDown, ArrowUp, PaperclipIcon } from "lucide-react";

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

import type { Model } from "../types";

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  isTyping: boolean;
  selectedModel: Model;
  setSelectedModel: (model: Model) => void;
  models: Model[];
  handleSubmit: (e: React.FormEvent) => void;
}

export function ChatInput({
  inputValue,
  setInputValue,
  isTyping,
  selectedModel,
  setSelectedModel,
  models,
  handleSubmit,
}: ChatInputProps) {
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
        <PromptInputSubmit
          disabled={!inputValue.trim() || isTyping}
          status={isTyping ? "streaming" : "ready"}
        />
      </PromptInputToolbar>
    </PromptInput>
  );
}
