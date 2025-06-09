'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';


const WalletContext = createContext<{ address: string | undefined }>({
  address: undefined,
});

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const { address } = useAccount();
  const [walletAddress, setWalletAddress] = useState<string | undefined>();

  useEffect(() => {
    if (address) {
      setWalletAddress(address);
    }
  }, [address]);

  return (
    <WalletContext.Provider value={{ address: walletAddress }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
