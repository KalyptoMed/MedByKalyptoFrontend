import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import ToastContainer from "@/components/ui/Toast";

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

const themeScript = `
try {
  var t = localStorage.getItem('medicart-theme');
  if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
} catch(e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
