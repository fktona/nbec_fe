import type { Metadata } from "next";
import { Inter, Open_Sans, Roboto } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-roboto",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "New Breed Educational Centre",
  description: "Empowering students for academic excellence",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${roboto.variable} ${openSans.className} bg-gray-100`}
      >
        <Toaster richColors />
        <main className="relative">{children}</main>
      </body>
    </html>
  );
}
