"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ChevronsUpDown,
  Command,
  Frame,
  GalleryVerticalEnd,
  Handbag,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import logo from "@/assets/image.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
const MENU = [
  {
    title: "Dashboard",
    url: "/",
    icon: SquareTerminal,
    isActive: true,
  },
  {
    title: "Sản phẩm",
    url: "/products",
    icon: Handbag,
    isActive: true,
  },
];

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent hover:text-black hover:bg-transparent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-12 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <img src={logo} className="h-full w-full object-cover" />
          </div>

          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="text-xl font-bold tracking-wide">OWL</span>
          </div>
        </SidebarMenuButton>
        <div className="flex items-center gap-2"></div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={MENU} />
      </SidebarContent>
      {/* <SidebarFooter></SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
