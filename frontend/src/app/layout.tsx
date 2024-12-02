import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { SidebarProvider } from "@/contexts/SidebarContext"


import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <SessionProvider>
          <NextUIProvider>
            <SidebarProvider>
              {children}
            </SidebarProvider>
          </NextUIProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
