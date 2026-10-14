import type { Metadata } from "next";
import { Literata, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const display = Literata({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
});

const sans = Source_Sans_3({
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "О-Ля-Ля или Скок в постель - билеты",
  description:
    'Билеты на спектакль "О-Ля-Ля или Скок в постель", Teatro Be artist, Centro Cultural de Carnide, Lisboa. 29 ноября 2026, 19:00.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={display.variable}>
      <body className={`${sans.className} antialiased`}>{children}</body>
    </html>
  );
}
