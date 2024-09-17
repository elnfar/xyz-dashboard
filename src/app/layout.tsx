
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "@/components/global/theme-toggle";


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
      <html lang="en" className="">      
        <body className={inter.className}>
            {children}
        </body>
      </html>
  );
}