"use client";

import React, { useLayoutEffect, useState } from "react";
import Navbar from "@/src/app/components/Navbar";
import Sidebar from "@/src/app/components/Sidebar";
import StoreProvider, { useAppSelector } from "./redux";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector(
    (state) => state.global.isDarkMode
  );

  // ✅ Apply dark mode BEFORE paint (fixes gray flash)
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    setMounted(true);
  }, [isDarkMode]);

  // ✅ Prevent rendering before Redux is ready
  if (!mounted) {
    return (
      <div className="min-h-screen w-full bg-gray-50 dark:bg-dark-bg" />
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900 dark:bg-dark-bg">
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
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
