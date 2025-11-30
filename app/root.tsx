import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import type { Route } from "./+types/root";

import "./app.css";

export const meta: Route.MetaFunction = () => [{ title: "AI Hub" }];
export const links: Route.LinksFunction = () => [{ rel: "icon", href: "/logo.png" }];

const queryClient = new QueryClient();

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
