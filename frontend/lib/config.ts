"use client";

import { http, createStorage, cookieStorage } from "wagmi";
import { sepolia, bscTestnet, blastSepolia, localhost } from "wagmi/chains";
import { Chain, getDefaultConfig } from "@rainbow-me/rainbowkit";

const projectId = "d3eebde7d134899cbc202cb7bf37071c";

const supportedChains: Chain[] = [localhost];

export const config = getDefaultConfig({
  appName: "Microblogger",
  projectId,
  chains: supportedChains as any,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: supportedChains.reduce(
    (obj, chain) => ({ ...obj, [chain.id]: http("http://127.0.0.1:8545") }),
    {}
  ),
});
