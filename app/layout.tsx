import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from 'next/headers';
import ContextProvider from '@/context';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DopeYield - Smart DeFi Yield Optimization",
  description: "Maximize your DeFi yields with intelligent strategies across top protocols. Earn more with DopeYield's automated optimization.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersObj = await headers();
  const cookies = headersObj.get('cookie');

  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider cookies={cookies}>{children}</ContextProvider>
      </body>
    </html>
  );
}