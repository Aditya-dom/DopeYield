"use client";

import React from 'react';
import { useAccount, useDisconnect } from 'wagmi';

function ConnectWalletButton() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center bg-gray-800/50 rounded-xl px-4 py-2 border border-gray-700/50">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
          <span className="text-sm text-gray-300">{formatAddress(address)}</span>
        </div>
        <button
          onClick={() => disconnect()}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all"
        >
          Disconnect
        </button>
        <w3m-button />
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <w3m-button />
      <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-xl font-semibold transition-all transform hover:scale-[1.02]">
        Connect Wallet
      </button>
    </div>
  );
}

export default ConnectWalletButton;