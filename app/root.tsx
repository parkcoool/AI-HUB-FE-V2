import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { Query, QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { Spinner } from "./components/ui/spinner";

export const meta: Route.MetaFunction = () => [{ title: "AI Hub" }];
export const links: Route.LinksFunction = () => [{ rel: "icon", href: "/logo.png" }];

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
      staleTime: 0,
    },
  },
});

const persister = createAsyncStoragePersister({
  storage: typeof window !== "undefined" ? window.localStorage : undefined,
});
const shouldDehydrateQuery = (query: Query) => query.meta?.persist === true;

export function HydrateFallback() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Spinner className="size-10" />
    </div>
  );
}

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
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister, dehydrateOptions: { shouldDehydrateQuery } }}
        >
          {children}
        </PersistQueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
