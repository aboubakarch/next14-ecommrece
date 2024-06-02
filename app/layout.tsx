import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Demo Store",
  description: "Demo store in NextJs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.salla.network/fonts/pingarlt.css?v=1.0"
        />
        <link
          rel="stylesheet"
          href="https://cdn.salla.network/fonts/sallaicons.css"
        />
      </head>
      <body className={clsx(inter.className, "w-full min-h-screen bg-gray-50")}>{children}
        <Toaster richColors toastOptions={{ className: "px-4 py-5" }} />
      </body>
    </html>
  );
}
