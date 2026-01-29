"use client";

import { useLayoutEffect } from "react";
import Navbar from "@/src/app/components/Navbar";
import Sidebar from "@/src/app/components/Sidebar";
import { useAppSelector } from "./redux";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector(
    (state) => state.global.isDarkMode
  );

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 dark:bg-dark-bg">
      <Sidebar />

      <main
        className={`flex w-full flex-col ${
          isSidebarCollapsed ? "" : "md:pl-64"
        }`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
}
