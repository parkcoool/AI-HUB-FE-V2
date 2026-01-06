import { Suspense } from "react";
import { Outlet } from "react-router";

import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";

import { AppSidebar } from "../components/app-sidebar";
import { Balance } from "../components/balance";

import type { Route } from "./+types/sidebar-layout";

export default function SidebarLayout({ params }: Route.LoaderArgs) {
  const { roomId } = params;

  return (
    <SidebarProvider>
      <AppSidebar roomId={roomId} />

      <SidebarInset>
        <header className="h-16 shrink-0 items-center gap-2 border-b px-4 flex sticky top-0 bg-background z-10 justify-between">
          <div>
            <SidebarTrigger className="-ml-1" />
          </div>

          <div>
            {/* 코인 */}
            <Suspense>
              <Balance />
            </Suspense>
          </div>
        </header>

        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
