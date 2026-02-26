import type { Metadata } from "next";
import { Manrope } from 'next/font/google';
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"

const manrope = Manrope({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '800'], // Los pesos que tienes en tu imagen
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: "HaviTech | Tienda especializada en Apple",
  description: "Compra y venta de iPhone en Coro Falcón, Venezuela",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
      </head>
      <body className="{`${manrope.className} antialiased`}">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
