import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ThemeLoader from "@/components/ThemeLoader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Houston Barbers - Premium Barbershop in Houston, TX",
  description: "Premier barbershop in Houston, TX offering expert haircuts, beard trims, and grooming services.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeLoader />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
