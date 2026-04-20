import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Medicart — Nigeria's #1 Medical Marketplace",
  description: "Buy verified medications, book appointments and manage your healthcare online. Fast delivery nationwide.",
  keywords: "buy medications online Nigeria, online pharmacy Nigeria, NAFDAC approved drugs, Medicart",
  openGraph: {
    title: "Medicart — Nigeria's #1 Medical Marketplace",
    description: "Buy verified medications online with fast nationwide delivery.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
