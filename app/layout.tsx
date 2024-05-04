import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./_context/cart";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "+Rango",
  description: "Seu app de delivery de comidas e bebidas saborosas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
