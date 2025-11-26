import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("room/:roomId?", "routes/chat-room.tsx"),
  route("login", "routes/login.tsx"),
] satisfies RouteConfig;
