import { useState } from "react";

import type { Model } from "~/features/model/types";

import { ChatInput } from "./chat-input";

const models: Model[] = [
  {
    modelId: 1,
    modelName: "gpt-4",
    displayName: "GPT-4",
    displayExplain: "The latest and most powerful model.",
    inputPricePer1m: 0.03,
    outputPricePer1m: 0.06,
    isActive: true,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  {
    modelId: 2,
    modelName: "gpt-3.5-turbo",
    displayName: "GPT-3.5 Turbo",
    displayExplain: "A cost-effective model for general use.",
    inputPricePer1m: 0.002,
    outputPricePer1m: 0.004,
    isActive: true,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  {
    modelId: 3,
    modelName: "davinci",
    displayName: "Davinci",
    displayExplain: "A powerful model for complex tasks.",
    inputPricePer1m: 0.02,
    outputPricePer1m: 0.04,
    isActive: false,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
];

export function Chat() {
  const [inputValue, setInputValue] = useState("");
  const [selectedModel, setSelectedModel] = useState<Model>(models[0]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1">
        <div className="m-auto text-muted-foreground">채팅 내용이 여기에 표시됩니다.</div>
      </div>

      <div className="sticky bottom-0 p-4">
        <ChatInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          models={models}
          isTyping={false}
          handleSubmit={() => {}}
        />
      </div>
    </div>
  );
}
