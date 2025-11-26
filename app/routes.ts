import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("chat/:roomId?", "features/chat/routes/chat-room.tsx"),
  route("login", "features/auth/routes/login.tsx"),
] satisfies RouteConfig;
