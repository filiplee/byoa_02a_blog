import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Blog",
  description: "Daily posts and weekly round-ups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} min-h-screen antialiased font-sans`}
      >
        <Header />
        <main className="mx-auto max-w-2xl px-5 py-10">{children}</main>
      </body>
    </html>
  );
}
