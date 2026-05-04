import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "Asana Anatomy Lab｜ヨガ講師のための解剖学学習プラットフォーム",
    template: "%s｜Asana Anatomy Lab",
  },
  description:
    "ポーズ・筋肉・関節・安全配慮を、信頼できる参照元をもとに学ぶヨガ講師向け解剖学プラットフォーム。",
  openGraph: {
    title: "Asana Anatomy Lab",
    description:
      "ヨガ講師のための解剖学学習プラットフォーム。ポーズの形ではなく、身体の仕組みから学ぶ。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
