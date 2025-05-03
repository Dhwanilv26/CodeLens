"use client";

import { Button } from "@/components/ui/button";

import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  Bot,
  CreditCard,
  LayoutDashboard,
  Plus,
  Presentation,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Q&A", url: "/qa", icon: Bot },
  { title: "Meetings", url: "/meetings", icon: Presentation },
  { title: "Billing", url: "/billing", icon: CreditCard },
];

const projects = [
  { name: "Project 1" },
  { name: "Project 2" },
  { name: "Project 3" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <div className="flex items-center gap-2 pl-2">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          {open && (
            <h1 className="text-xl font-bold tracking-wide text-blue-600">
              CodeLens
            </h1>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Application Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-500">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                        pathname === item.url
                          ? "bg-blue-500 text-white"
                          : "text-blue-800 hover:bg-blue-100",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Projects Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-500">
            Your Projects
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map((project) => (
                <SidebarMenuItem key={project.name}>
                  <SidebarMenuButton asChild>
                    <div className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-blue-900 hover:bg-blue-100">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                        {project.name[0]?.toUpperCase()}
                      </div>
                      {open && <span>{project.name}</span>}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Create Project */}
              {open && (
                <div className="mt-3 px-3">
                  <Link href="/create" className="block w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex w-full items-center justify-center gap-1 border-blue-500 text-blue-600 hover:bg-blue-100"
                    >
                      <Plus className="h-4 w-4" />
                      Create Project
                    </Button>
                  </Link>
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
