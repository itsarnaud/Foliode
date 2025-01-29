import { SessionProvider } from "next-auth/react";
import { HeroUIProvider } from "@heroui/react";
import { SidebarProvider } from "@/contexts/SidebarContext"
import { ThemeProvider } from "next-themes";


import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
       <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SessionProvider>
            <HeroUIProvider>
              <SidebarProvider>
                {children}
              </SidebarProvider>
            </HeroUIProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
