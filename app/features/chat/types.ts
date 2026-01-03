export interface ChatRoom {
  roomId: string;
  title: string;
  userId: string;
  coinUsage: number;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  messageId: string;
  roomId: string;
  role: "user" | "assistant";
  content: string;
  fileUrl?: string;
  tokenCount: number;
  coinCount: number;
  modelId: number;
  createdAt: string;
}

export interface Model {
  modelId: number;
  modelName: string;
  displayName: string;
  displayExplain: string;
  inputPricePer1m: number;
  outputPricePer1m: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Attachment {
  file: File;
  fileId: string;
  isUploaded: boolean;
}
