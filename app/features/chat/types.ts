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
  role: string;
  content: string;
  fileUrl: string;
  tokenCount: number;
  coinCount: number;
  modelId: number;
  createdAt: string;
}
