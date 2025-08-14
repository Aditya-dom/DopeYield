'use client'

import React from 'react';
import { useAppKit } from '@reown/appkit/react';
import { useAccount, useDisconnect } from 'wagmi';

function ConnectWalletButton() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const handleConnect = () => {
    open();
  };

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {!isConnected ? (
        <button 
          onClick={handleConnect}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <p className="text-green-400 font-semibold">
            Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
          <button 
            onClick={handleDisconnect}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}

export default ConnectWalletButton;