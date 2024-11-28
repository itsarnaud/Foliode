import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";

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
            {children}
          </NextUIProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
