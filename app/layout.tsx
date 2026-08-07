import type { Metadata } from "next";
import { Comfortaa, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import ImagePreloader from "./ImagePreloader";

// Plus Jakarta Sans (для латиницы и цифр)
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

// Comfortaa для акцентов и заголовков
const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Внештат",
  description: "Внештат — часть за пределами целого",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${plusJakartaSans.variable} ${comfortaa.variable} h-full antialiased`}
    >
      <body className={`${plusJakartaSans.className} min-h-full flex flex-col`}>
        <ImagePreloader />
        {children}
      </body>
    </html>
  );
}