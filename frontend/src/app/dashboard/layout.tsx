"use client";

import Sidebar        from "@/components/Sidebar"
import { useSidebar } from "@/contexts/SidebarContext"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isOpen } = useSidebar();

  return (
    <>
      <Sidebar />
      <div className={`p-2 duration-300 ${isOpen ? 'ml-[315px]' : 'ml-[90px]'}`}>
        {children}
      </div>
    </>
  )
}