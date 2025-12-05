import { api } from "~/lib/api";
import { queryClient } from "~/root";

interface CreateChatRoomParams {
  title: string;
  modelId: number;
}

interface CreateChatRoomResponse {
  roomId: string;
  title: string;
  userId: number;
  coinUsage: number;
  createdAt: string;
  updatedAt: string;
}

export async function createChatRoom(params: CreateChatRoomParams) {
  const response = await api.post<CreateChatRoomResponse>("/chat-rooms", params);
  queryClient.invalidateQueries({ queryKey: ["chatRooms"] });
  return response.data;
}
