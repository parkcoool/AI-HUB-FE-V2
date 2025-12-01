import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("features/auth/routes/login.tsx"),

  // Auth Protected Layout
  layout("features/auth/layouts/auth-protected.tsx", [
    route("chat/:roomId?", "features/chat/routes/chat-room.tsx"),
  ]),
] satisfies RouteConfig;
