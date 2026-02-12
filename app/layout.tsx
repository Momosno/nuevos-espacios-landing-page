import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";

const baloo_2 = Baloo_2({
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo-2",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${baloo_2.className} ${baloo_2.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
