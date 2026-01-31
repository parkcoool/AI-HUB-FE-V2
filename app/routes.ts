import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  // Public Layout
  layout("features/auth/layouts/public.tsx", [index("features/auth/routes/login.tsx")]),

  // Auth Protected Layout
  layout("features/auth/layouts/auth-protected.tsx", [
    // Sidebar Layout
    layout("shared/layouts/sidebar-layout.tsx", [
      route("chat/:roomId?", "features/chat/routes/chat-room.tsx"),
      route("profile", "features/user/routes/profile.tsx"),
      route("dashboard", "features/dashboard/routes/dashboard.tsx"),
      route("pricing", "features/pricing/routes/pricing.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
