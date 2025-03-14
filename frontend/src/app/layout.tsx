import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/provider/themeProvider";
import JotaiProvider from "@/provider/jotaiProvider";
import SessionProvider from "@/provider/sessionProvider";
import { ToastContainer } from "react-toastify";
import HeaderProvider from "./_components/layout/common/headerProvider";
import WatchTimeProvider from "@/provider/watchTimeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vidlink",
  description: "Vidlink is the best app!",
  icons: {
    icon: "/logo.png", // Default favicon
    shortcut: "/logo.png", // Shortcut icon
    apple: "/logo.png", // Apple touch icon (optional)
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JotaiProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <HeaderProvider>
              <SessionProvider>
                <WatchTimeProvider>{children}</WatchTimeProvider>
              </SessionProvider>
            </HeaderProvider>
          </ThemeProvider>
        </JotaiProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
