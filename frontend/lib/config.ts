"use client";

import { http, createStorage, cookieStorage } from "wagmi";
import { localhost } from 'wagmi/chains'
import { Chain, getDefaultConfig } from "@rainbow-me/rainbowkit";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!
const url = process.env.NEXT_PUBLIC_RPC_URL!

const supportedChains: Chain[] = [localhost];

export const config = getDefaultConfig({
  appName: 'Microblogger',
  projectId,
  chains: supportedChains as any,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
  transports: supportedChains.reduce(
    (obj, chain) => ({ ...obj, [chain.id]: http(url) }),
    {}
  )
})
