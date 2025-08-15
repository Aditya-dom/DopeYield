'use client';

import React, { useState } from 'react';
import ConnectWalletButton from '../components/ConnectWalletButton';
import { useAccount, useContractRead } from 'wagmi';

// ERC-4626 Vault ABI (standard interface)
const ERC4626_ABI = [
  {
    "inputs": [],
    "name": "totalAssets",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "assets", "type": "uint256"}],
    "name": "convertToShares",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

// Hook to get real-time vault data
function useEulerVaultData(vaultAddress: string) {
  const { data: totalAssets } = useContractRead({
    address: vaultAddress as `0x${string}`,
    abi: ERC4626_ABI,
    functionName: 'totalAssets',
  });

  const { data: totalSupply } = useContractRead({
    address: vaultAddress as `0x${string}`,
    abi: ERC4626_ABI,
    functionName: 'totalSupply',
  });

  return {
    totalAssets,
    totalSupply,
    // Calculate exchange rate or other metrics
    exchangeRate: totalAssets && totalSupply ? Number(totalAssets) / Number(totalSupply) : 0
  };
}

const StrategyPage = () => {
  const [selectedStrategy, setSelectedStrategy] = useState('BetterYield');
  const { address, isConnected } = useAccount();

  // Get real-time Euler vault data using contract calls
  const eulerVaultAddress = '0xce45EF0414dE3516cAF1BCf937bF7F2Cf67873De';
  const eulerVaultData = useEulerVaultData(eulerVaultAddress);

  // Utility function for formatting currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const strategies = [
    {
      name: 'BetterYield',
      title: 'Tier 1 Stablecoin Strategy',
      apy: '9%',
      description: 'Tier 1 stablecoin lending markets',
      risk: 'Low',
      tvl: '$126.7M',
      selected: true
    }
  ];

  // Enhanced DopeYield Vaults data with Euler Finance integration
  const vaults = [
    // Add Euler Finance USDC vault at the top for prominence with real-time data
    {
      id: 'euler-usdc-stablecoin-maxi',
      name: 'Euler Stablecoin Maxi',
      token: 'USDC',
      userDeposits: 0.00,
      totalDeposits: eulerVaultData.totalAssets ? formatCurrency(Number(eulerVaultData.totalAssets) / 1e6) : '83,866.50', // Real-time from contract
      supplyApy: '18.07%', // From your image
      protocols: ['Euler Finance', 'Ethereum'],
      rewardCount: '+2',
      contractAddress: '0xce45EF0414dE3516cAF1BCf937bF7F2Cf67873De',
      network: 'ethereum',
      vaultType: 'Stablecoin Maxi',
      riskLevel: 'Low-Medium',
      description: 'High-yield USDC vault on Euler Finance v2 with modular lending capabilities',
      features: ['ERC-4626 Compatible', 'Cross-collateral', 'Modular Design'],
      auditStatus: '12+ Security Audits',
      tvlInUsd: eulerVaultData.totalAssets ? Number(eulerVaultData.totalAssets) / 1e6 : 83866.50,
      isLive: true,
      launchDate: '2024-09-04',
      // Real-time contract data
      totalAssets: eulerVaultData.totalAssets,
      totalSupply: eulerVaultData.totalSupply,
      exchangeRate: eulerVaultData.exchangeRate
    },
    // Your existing vaults...
    {
      id: 'dopeyield-usdt',
      name: 'DopeYield USDT',
      token: 'USDT',
      userDeposits: 0.00,
      totalDeposits: '101.76M',
      supplyApy: '13.89%',
      protocols: ['Aave', 'Compound', 'Morpho', 'Euler', 'Seamless'],
      rewardCount: '+3'
    },
    {
      id: 'dopeyield-ultra-hype',
      name: 'DopeYield Ultra HYPE',
      token: 'HYPE',
      userDeposits: 0.00,
      totalDeposits: '44.15M',
      supplyApy: '6.00%',
      protocols: ['Aave', 'Compound', 'Morpho', 'Euler'],
      rewardCount: '+4'
    },
    {
      id: 'dopeyield-xaut',
      name: 'DopeYield XAUt',
      token: 'XAUt',
      userDeposits: 0.00,
      totalDeposits: '1.48M',
      supplyApy: '3.33%',
      protocols: ['Aave'],
      rewardCount: '+1'
    },
    {
      id: 'dopeyield-ultra-ubtc',
      name: 'DopeYield Ultra UBTC',
      token: 'UBTC',
      userDeposits: 0.00,
      totalDeposits: '22.34M',
      supplyApy: '2.50%',
      protocols: ['Aave', 'Compound'],
      rewardCount: '+2'
    },
    {
      id: 'dopeyield-1sthype',
      name: 'DopeYield 1stHYPE',
      token: '1stHYPE',
      userDeposits: 0.00,
      totalDeposits: '7.79M',
      supplyApy: '1.98%',
      protocols: ['Aave', 'Compound', 'Morpho', 'Euler'],
      rewardCount: '+1'
    }
  ];

  const protocolData = [
    {
      name: 'Morpho Seamless USDC',
      token: 'USDC',
      type: 'Vault',
      percent: '35%',
      apy: '10.62%',
      allocation: 35
    },
    {
      name: 'Morpho Moonwell USDC',
      token: 'USDC', 
      type: 'Vault',
      percent: '35%',
      apy: '10.57%',
      allocation: 35
    },
    {
      name: 'Euler USDC',
      token: 'USDC',
      type: 'Vault', 
      percent: '30%',
      apy: '7.90%',
      allocation: 30
    }
  ];

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case 'None': return 'text-emerald-500 bg-emerald-500/10';
      case 'Very Low': return 'text-green-500 bg-green-500/10';
      case 'Low': return 'text-yellow-500 bg-yellow-500/10';
      case 'Medium': return 'text-orange-500 bg-orange-500/10';
      case 'High': return 'text-red-500 bg-red-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-600/15 via-transparent to-transparent"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-600/15 via-transparent to-transparent"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-gray-900/10"></div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Enhanced Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 sm:mb-8 space-y-6 lg:space-y-0">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl mr-4 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">DY</span>
              </div>

         
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  DopeYield Protocol
                </h1>
                <p className="text-gray-400 text-sm mt-1 hidden sm:block">Smart yield optimization for maximum gains</p>
              </div>
            </div>
            
            {/* Enhanced Stats Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8">
              <div className="flex space-x-6 sm:space-x-8">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">$593.5M</div>
                  <div className="text-xs sm:text-sm text-gray-400 font-medium">Total TVL</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-400">12.18%</div>
                  <div className="text-xs sm:text-sm text-gray-400 font-medium">Avg APY</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-400">5</div>
                  <div className="text-xs sm:text-sm text-gray-400 font-medium">Active Vaults</div>
                </div>
              </div>
              <div className="w-full sm:w-auto">
                <ConnectWalletButton />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Single Column Layout */}
        <div className="space-y-6 sm:space-y-8">
          {/* BetterYield Header - Enhanced */}
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-gray-700/50 shadow-2xl">
            <div className="text-center sm:text-left mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                BetterYield
              </h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-4xl">
                Earn up to <span className="text-green-400 font-bold text-lg">9.78%</span> APY through Tier 1 stablecoin lending markets for USDC.
              </p>
            </div>

            {/* Enhanced Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-gray-900/60 rounded-2xl p-6 border border-gray-700/40 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Total Liquidity</span>
                  <div className="w-4 h-4 rounded-full bg-gray-600 flex items-center justify-center cursor-help">
                    <span className="text-xs text-gray-300">?</span>
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white mb-2">$126.7M</div>
                <div className="text-sm text-gray-400 font-medium">USDC</div>
              </div>

              <div className="bg-gray-900/60 rounded-2xl p-6 border border-gray-700/40 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Token</span>
                  <div className="w-4 h-4 rounded-full bg-gray-600 flex items-center justify-center cursor-help">
                    <span className="text-xs text-gray-300">?</span>
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white mb-2">USDC</div>
                <div className="text-sm text-gray-400 font-medium">on Base</div>
              </div>

              <div className="bg-gray-900/60 rounded-2xl p-6 border border-gray-700/40 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Total APY</span>
                  <div className="w-4 h-4 rounded-full bg-gray-600 flex items-center justify-center cursor-help">
                    <span className="text-xs text-gray-300">?</span>
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-green-400 mb-2">9.97%</div>
                <div className="text-sm text-gray-400 font-medium">Last 7D: 9.79%</div>
              </div>
            </div>
          </div>

          {/* Enhanced DopeYield Vaults Table */}
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-gray-700/50 shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">DopeYield Vaults</h3>
            
            {/* Special Euler Vault Display - Enhanced with Real-time Data */}
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl border border-blue-500/30">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-white">Featured: Euler Stablecoin Maxi</h4>
                <div className="flex space-x-2">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    HIGH YIELD
                  </span>
                  <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full">
                    LIVE DATA
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-900/60 rounded-xl p-4 border border-gray-700/40">
                  <div className="text-sm text-gray-400 mb-1">Real-time TVL</div>
                  <div className="text-xl font-bold text-white">
                    {eulerVaultData.totalAssets ? formatCurrency(Number(eulerVaultData.totalAssets) / 1e6) : (
                      <span className="text-blue-400">Loading...</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">USDC</div>
                </div>
                
                <div className="bg-gray-900/60 rounded-xl p-4 border border-gray-700/40">
                  <div className="text-sm text-gray-400 mb-1">Total Supply</div>
                  <div className="text-xl font-bold text-white">
                    {eulerVaultData.totalSupply ? (Number(eulerVaultData.totalSupply) / 1e18).toFixed(2) : (
                      <span className="text-blue-400">Loading...</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">Shares</div>
                </div>
                
                <div className="bg-gray-900/60 rounded-xl p-4 border border-gray-700/40">
                  <div className="text-sm text-gray-400 mb-1">Exchange Rate</div>
                  <div className="text-xl font-bold text-white">
                    {eulerVaultData.exchangeRate ? eulerVaultData.exchangeRate.toFixed(6) : (
                      <span className="text-blue-400">Loading...</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">Assets/Share</div>
                </div>
              </div>
              
              {/* Additional Real-time Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-900/60 rounded-xl p-4 border border-gray-700/40">
                  <div className="text-sm text-gray-400 mb-1">APY (Current)</div>
                  <div className="text-2xl font-bold text-green-400">18.07%</div>
                  <div className="text-xs text-gray-500">Euler Finance v2</div>
                </div>
                
                <div className="bg-gray-900/60 rounded-xl p-4 border border-gray-700/40">
                  <div className="text-sm text-gray-400 mb-1">Last Updated</div>
                  <div className="text-lg font-bold text-white">
                    {eulerVaultData.totalAssets ? new Date().toLocaleTimeString() : 'Waiting for data...'}
                  </div>
                  <div className="text-xs text-gray-500">Real-time blockchain data</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full font-medium">
                  ERC-4626 Compatible
                </span>
                <span className="text-xs px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full font-medium">
                  Modular Design
                </span>
                <span className="text-xs px-3 py-1 bg-green-500/20 text-green-400 rounded-full font-medium">
                  12+ Security Audits
                </span>
                <span className="text-xs px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full font-medium">
                  Cross-collateral
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  Contract: {eulerVaultAddress.slice(0, 6)}...{eulerVaultAddress.slice(-4)}
                </div>
                <div className="flex space-x-3">
                  <button 
                    className="bg-gray-700/50 hover:bg-gray-600/50 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 border border-gray-600/50"
                    onClick={() => window.open(`https://etherscan.io/address/${eulerVaultAddress}`, '_blank')}
                  >
                    VIEW ON ETHERSCAN
                  </button>
                  <button 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-6 py-2 rounded-xl transition-all duration-200 transform hover:scale-105"
                    onClick={() => window.open(`https://app.euler.finance/vault/${eulerVaultAddress}?network=ethereum`, '_blank')}
                  >
                    DEPOSIT ON EULER
                  </button>
                </div>
              </div>
            </div>
            
            {/* Mobile Card Layout */}
            <div className="block lg:hidden space-y-4">
              {vaults.map((vault, index) => (
                <div
                  key={vault.id}
                  className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-white text-base mb-1">{vault.name}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">Total: ${vault.totalDeposits}</span>
                        <span className="text-sm px-2 py-1 bg-green-500/20 text-green-400 rounded-lg font-bold">
                          {vault.supplyApy}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white mb-1">
                        {formatCurrency(vault.userDeposits)}
                      </div>
                      <div className="text-sm text-gray-400">Your Deposits</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-1">
                      {vault.protocols.slice(0, 3).map((protocol, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-gray-700/50 rounded text-gray-300">
                          {protocol}
                        </span>
                      ))}
                      {vault.protocols.length > 3 && (
                        <span className="text-xs text-gray-400">{vault.rewardCount}</span>
                      )}
                    </div>
                    <button 
                      className={`px-6 py-2 rounded-xl font-bold text-sm transition-all duration-200 ${
                        isConnected 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={!isConnected}
                    >
                      {isConnected ? 'DEPOSIT' : 'CONNECT'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table Layout */}
            <div className="hidden lg:block">
              {/* Enhanced Table Header */}
              <div className="grid grid-cols-5 gap-6 mb-6 pb-4 border-b border-gray-700/50">
                <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                  Vault
                </div>
                <div className="text-sm font-bold text-gray-400 uppercase tracking-wider text-center">
                  Your Deposits
                </div>
                <div className="text-sm font-bold text-gray-400 uppercase tracking-wider text-center">
                  Total Deposits
                </div>
                <div className="text-sm font-bold text-gray-400 uppercase tracking-wider text-center">
                  Supply APY
                </div>
                <div className="text-sm font-bold text-gray-400 uppercase tracking-wider text-center">
                  Action
                </div>
              </div>

              {/* Enhanced Vault Rows */}
              <div className="space-y-3">
                {vaults.map((vault, index) => (
                  <div
                    key={vault.id}
                    className={`grid grid-cols-5 gap-6 items-center p-6 rounded-2xl border transition-all duration-300 group ${
                      vault.id === 'euler-usdc-stablecoin-maxi' 
                        ? 'border-blue-500/50 bg-blue-900/20 hover:border-blue-400/70' 
                        : 'border-gray-700/30 hover:border-gray-600/50 bg-gray-900/30 hover:bg-gray-800/40'
                    }`}
                  >
                    {/* Vault Name */}
                    <div>
                      <div className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors mb-2">
                        {vault.name}
                        {vault.id === 'euler-usdc-stablecoin-maxi' && (
                          <span className="ml-2 text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                            LIVE
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {vault.protocols.slice(0, 3).map((protocol, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-gray-700/50 rounded text-gray-300">
                            {protocol}
                          </span>
                        ))}
                        {vault.protocols.length > 3 && (
                          <span className="text-xs text-gray-400 px-2 py-1">{vault.rewardCount}</span>
                        )}
                      </div>
                    </div>

                    {/* Your Deposits */}
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">
                        {formatCurrency(vault.userDeposits)}
                      </div>
                    </div>

                    {/* Total Deposits */}
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">
                        ${vault.totalDeposits}
                      </div>
                    </div>

                    {/* Supply APY */}
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-lg font-bold text-green-400">
                          {vault.supplyApy}
                        </span>
                        <div className="w-5 h-5 bg-green-500/20 rounded flex items-center justify-center">
                          <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-center">
                      <button 
                        className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 transform hover:scale-105 ${
                          isConnected 
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25'
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!isConnected}
                      >
                        {isConnected ? 'DEPOSIT' : 'CONNECT'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Yield Sources and Protocols Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Enhanced Yield Sources */}
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-gray-700/50 shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">
                Yield Sources
              </h3>
              <div className="relative">
                <div className="w-44 h-44 sm:w-52 sm:h-52 mx-auto mb-6 sm:mb-8">
                  <div className="relative w-full h-full">
                    {/* Enhanced Multi-layered donut chart */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 208 208">
                      {/* Background circle */}
                      <circle
                        cx="104"
                        cy="104"
                        r="85"
                        stroke="currentColor"
                        strokeWidth="18"
                        fill="none"
                        className="text-gray-700/50"
                      />
                      {/* Progress circles for each protocol */}
                      {protocolData.map((protocol, index) => {
                        const radius = 85;
                        const circumference = 2 * Math.PI * radius;
                        const strokeDasharray = circumference;
                        const strokeDashoffset = circumference - (protocol.allocation / 100) * circumference;
                        const rotation = protocolData.slice(0, index).reduce((acc, p) => acc + (p.allocation / 100) * 360, 0);
                        
                        return (
                          <circle
                            key={index}
                            cx="104"
                            cy="104"
                            r={radius}
                            stroke={index === 0 ? '#3B82F6' : index === 1 ? '#8B5CF6' : '#10B981'}
                            strokeWidth="18"
                            fill="none"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            className="transition-all duration-500 drop-shadow-lg"
                            strokeLinecap="round"
                            style={{
                              transformOrigin: '104px 104px',
                              transform: `rotate(${rotation}deg)`
                            }}
                          />
                        );
                      })}
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center bg-gray-900/90 rounded-full w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center backdrop-blur-sm border border-gray-700/50">
                        <div>
                          <div className="text-sm text-gray-400 mb-1 font-medium">Weight Breakdown</div>
                          <div className="text-2xl sm:text-3xl font-bold text-white">100%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Legend */}
                <div className="space-y-4">
                  {protocolData.map((protocol, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gray-900/40 border border-gray-700/30 hover:border-gray-600/40 transition-all duration-300">
                      <div className="flex items-center">
                        <div 
                          className={`w-5 h-5 rounded-full mr-4 shadow-lg ${
                            index === 0 ? 'bg-blue-500' : 
                            index === 1 ? 'bg-purple-500' : 'bg-green-500'
                          }`}
                        ></div>
                        <span className="text-gray-300 text-sm font-medium">{protocol.name.split(' ')[0]}</span>
                      </div>
                      <span className="text-white font-bold text-lg">{protocol.percent}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Participating Protocols */}
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-gray-700/50 shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">
                Participating Protocols
              </h3>
              
              {/* Mobile Layout */}
              <div className="block sm:hidden space-y-4">
                {protocolData.map((protocol, index) => (
                  <div key={index} className="p-4 rounded-xl bg-gray-900/40 border border-gray-700/30">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-white text-base">{protocol.name.replace(' USDC', '')}</span>
                      <span className="text-xl font-bold text-green-400">{protocol.apy}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm px-2 py-1 bg-gray-700/50 rounded-lg text-gray-300">{protocol.type}</span>
                      <span className="text-lg font-bold text-white">{protocol.percent}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Layout */}
              <div className="hidden sm:block space-y-6">
                <div className="grid grid-cols-4 gap-4 text-xs font-bold text-gray-400 uppercase tracking-wider pb-4 border-b border-gray-700/50">
                  <div>NAME</div>
                  <div className="text-center">TYPE</div>
                  <div className="text-center">PERCENT</div>
                  <div className="text-center">7D APY</div>
                </div>
                
                {protocolData.map((protocol, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 items-center p-4 rounded-xl hover:bg-gray-700/20 transition-all duration-300 group border border-transparent hover:border-gray-600/30">
                    <div className="font-bold text-white text-base group-hover:text-blue-400 transition-colors">
                      {protocol.name.replace(' USDC', '')}
                    </div>
                    <div className="text-center">
                      <span className="text-sm px-3 py-1.5 bg-gray-700/50 rounded-lg text-gray-300 font-medium border border-gray-600/30">
                        {protocol.type}
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="text-xl font-bold text-white">
                        {protocol.percent}
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="text-xl font-bold text-green-400">
                        {protocol.apy}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

                      {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md hover:shadow-blue-500/25 group">
                <span className="flex items-center justify-center text-base">
                  Continue
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
              
              <button className="bg-gray-800/50 hover:bg-gray-700/50 text-white font-medium py-3 px-8 rounded-lg border border-gray-600/50 hover:border-gray-500/50 transition-all duration-300 backdrop-blur-sm">
                Learn More
              </button>
            </div>

          {/* Enhanced Risk Information */}
          <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-yellow-500/30 shadow-xl">
            <div className="flex items-start">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-yellow-500/20 rounded-2xl flex items-center justify-center mr-4 sm:mr-6 flex-shrink-0 border border-yellow-500/30">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.348 18.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-yellow-400 mb-2 sm:mb-3">Risk Disclosure</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  DeFi protocols involve smart contract risks, potential impermanent loss, and market volatility. 
                  Past performance does not guarantee future results. Please assess your risk tolerance before investing.
                </p>
              </div>
            </div>
          </div>
           {/* Enhanced Disclaimer */}
           <div className="p-6 sm:p-8 bg-gray-900/60 rounded-2xl border border-gray-700/40 backdrop-blur-sm shadow-lg">
            <p className="text-xs text-gray-400 leading-relaxed">
              <span className="font-semibold text-gray-300">Disclaimer:</span> The content provided by DopeYield Protocol is intended for informational and educational purposes only. 
              This is not financial advice. Cryptocurrency investments are subject to market risk and price volatility. 
              Users should conduct their own research and consult with financial advisors before making investment decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyPage;