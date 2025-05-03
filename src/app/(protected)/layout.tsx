import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { AppSidebar } from "./dashboard/app-sidebar";

type Props = {
  children: React.ReactNode;
};

const SidebarLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="m-2 w-full">
        {/* Topbar */}
        <div className="flex items-center justify-between rounded-lg border border-blue-300 bg-white px-4 py-3 shadow-md">
          {/* <SearchBar /> */}
          <div className="ml-auto">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>

        {/* Spacer */}
        <div className="h-4" />

        {/* Main Content Box */}
        <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-md">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default SidebarLayout;
