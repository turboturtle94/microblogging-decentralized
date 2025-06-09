import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { headers } from "next/headers";

import Providers from "../components/Providers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appHeader = await headers();
  const cookie = appHeader.get("cookie") || "";
  return (
    <html lang="en">
      <body>
        <Providers cookie={cookie}>{children}</Providers>
      </body>
    </html>
  );
}
