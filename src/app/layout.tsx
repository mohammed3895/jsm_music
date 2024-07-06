"use client";

import { GeistSans } from "geist/font/sans";
import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "react-redux";
import store from "@/redux/store";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <Provider store={store}>
            <main className="flex min-h-screen flex-col items-center justify-center">
              {children}
            </main>
            <Toaster />
          </Provider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
