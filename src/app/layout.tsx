
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import Providers from "@/components/providers/progress-provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Siiz | Project management tool",
  description: "Manage your projects and teams with Siiz",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{

  

  return (
      <html lang="en" className=" bg-[rgb(25,25,25)]">      
        <body className={inter.className}>
            {children}
        </body>
      </html>
  );
}
