import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { headers } from "next/headers";

import Providers from "../components/Providers";
import { WalletProvider } from '../components/WalletContext'

import { ProfileViewProvider } from '@/components/UserProfileContext'

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const appHeader = await headers()
  const cookie = appHeader.get('cookie') || ''
  return (
    <html lang='en'>
      <body>
        <Providers cookie={cookie}>
          <WalletProvider>
            {' '}
            <ProfileViewProvider>{children}</ProfileViewProvider>
          </WalletProvider>
        </Providers>
      </body>
    </html>
  )
}
