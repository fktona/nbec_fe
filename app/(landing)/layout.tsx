import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { NavBar } from "@/components/NavBar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

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
    <section className={inter.className}>
      <NavBar />
      <main className="relative ">{children}</main>
      <Footer />
    </section>
  );
}
