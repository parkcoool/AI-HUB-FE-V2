"use client";

import { ChartSpline, ChevronsUpDown, CircleUser, LogOut } from "lucide-react";
import { Link } from "react-router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar";
import { useLogoutMutation } from "~/features/auth/hooks/use-logout-mutation";

interface NavUserProps {
  username: string;
  email: string;
}

export function NavUser({ username, email }: NavUserProps) {
  const { isMobile, setOpenMobile } = useSidebar();
  const { mutate: logout } = useLogoutMutation();

  const handleSelect = () => {
    setOpenMobile(false);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <CircleUser />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{username}</span>
                <span className="truncate text-xs">{email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <Link to="/profile">
                <DropdownMenuItem onSelect={handleSelect}>
                  <CircleUser />
                  <DropdownMenuLabel>계정</DropdownMenuLabel>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <ChartSpline />
                <DropdownMenuLabel>사용량</DropdownMenuLabel>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => logout()}>
              <LogOut />
              <DropdownMenuLabel>로그아웃</DropdownMenuLabel>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
