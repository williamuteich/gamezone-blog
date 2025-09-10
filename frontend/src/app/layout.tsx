import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "./components/sessionProvider";

export const metadata: Metadata = {
  title: "GameZone - Seu portal definitivo para o universo dos games",
  description: "As últimas notícias, reviews e guias do universo gamer em um só lugar. Descubra o mundo dos games conosco!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}