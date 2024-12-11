import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { SidebarProvider } from "@/contexts/SidebarContext"
import { ThemeProvider } from "next-themes";


import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
       <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider>
            <NextUIProvider>
              <SidebarProvider>
                {children}
              </SidebarProvider>
            </NextUIProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
