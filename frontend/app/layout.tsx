import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { headers } from "next/headers";

import Providers from "../components/Providers";
import { WalletProvider } from '../components/WalletContext'

import { ProfileProvider } from '@/components/UserProfileContext'

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
            <ProfileProvider>{children}</ProfileProvider>
          </WalletProvider>
        </Providers>
      </body>
    </html>
  )
}
