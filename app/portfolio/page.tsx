'use client';

import React, { useState } from 'react';
import ConnectWalletButton from '../components/ConnectWalletButton';
import { useAccount } from 'wagmi';
import Head from 'next/head';

const PortfolioPage = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [claimableAmount, setClaimableAmount] = useState(245.67);
  const { address, isConnected } = useAccount();

  // Mock data for user positions
  const positions = [
    {
      id: 1,
      protocol: 'Morpho Seamless',
      asset: 'USDC',
      amount: 25000,
      apy: 10.62,
      earned: 142.33,
      strategy: 'BetterYield',

      color: 'blue',
      change24h: +2.3
    },
    {
      id: 2,
      protocol: 'Euler Finance',
      asset: 'USDC',
      amount: 15000,
      apy: 7.90,
      earned: 89.12,
      strategy: 'Stable Yield',

      color: 'green',
      change24h: +1.8
    },
    {
      id: 3,
      protocol: 'Pendle Protocol',
      asset: 'ETH',
      amount: 8.5,
      apy: 12.45,
      earned: 0.34,
      strategy: 'ETH Yield',

      color: 'purple',
      change24h: -0.5
    }
  ];

  const portfolioStats = {
    totalValue: 48500.00,
    totalEarned: 231.79,
    netPnL: +1847.23,
    apr: 9.67,
    change24h: +2.1
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatPercentage = (percentage: number, showSign = true) => {
    const sign = showSign && percentage > 0 ? '+' : '';
    return `${sign}${percentage.toFixed(2)}%`;
  };

  return (
    <>
      <Head>
        <title>DopeYield Portfolio - DeFi Yield Optimization Dashboard</title>
        <meta name="description" content="Track your DeFi portfolio performance, monitor yields, and optimize your investments with DopeYield's smart yield strategies." />
        <meta name="keywords" content="DeFi, yield farming, portfolio tracking, cryptocurrency, DopeYield, yield optimization" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="DopeYield Portfolio - DeFi Yield Optimization Dashboard" />
        <meta property="og:description" content="Track your DeFi portfolio performance and optimize yields with DopeYield." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DopeYield Portfolio" />
        <meta name="twitter:description" content="DeFi yield optimization portfolio dashboard" />
      </Head>
      <div className="min-h-screen bg-gray-900 text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-600/15 via-transparent to-transparent"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-600/15 via-transparent to-transparent"></div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mr-4 flex items-center justify-center shadow-lg">

              </div>
                                            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                DopeYield Portfolio
              </h1>
            </div>
            
            {/* Enhanced Wallet Connection */}
            <ConnectWalletButton />
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Total Portfolio Value */}
          <div className="sm:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-300">Total Portfolio Value</h3>
              <div className="flex space-x-2">
                {['1d', '7d', '30d', '90d'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedTimeframe(period)}
                    className={`px-3 py-1 text-sm rounded-lg transition-all ${
                      selectedTimeframe === period
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <div className="text-4xl font-bold text-white mb-2">
                {formatCurrency(portfolioStats.totalValue)}
              </div>
              <div className="flex items-center space-x-4">
                <div className={`flex items-center ${
                  portfolioStats.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d={portfolioStats.change24h >= 0 ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"} />
                  </svg>
                  {formatPercentage(portfolioStats.change24h)} (24h)
                </div>
                <div className="text-gray-400 text-sm">
                  APR: <span className="text-green-400 font-semibold">{formatPercentage(portfolioStats.apr, false)}</span>
                </div>
              </div>
            </div>
            
            {/* Mini Chart */}
            <div className="h-20 flex items-end space-x-1">
              {[45, 52, 48, 58, 65, 62, 70, 68, 75, 77, 74, 79, 77, 82, 80, 85, 88, 86, 90, 92].map((height, index) => (
                <div 
                  key={index}
                  className="flex-1 bg-gradient-to-t from-blue-600/60 to-purple-500/60 rounded-t-sm opacity-80 transition-all hover:opacity-100"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
          </div>

          {/* Net P&L */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-700/50">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Net P&L</h3>
            <div className="text-2xl font-bold text-white mb-1">
              {formatCurrency(portfolioStats.netPnL)}
            </div>
            <div className="text-green-400 text-sm">
              +{formatPercentage((portfolioStats.netPnL / portfolioStats.totalValue) * 100)}
            </div>
          </div>

          {/* Claimable Rewards */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-400">Claimable Yields & Rewards</h3>
            </div>
            <div className="text-2xl font-bold text-white mb-3">
              {formatCurrency(claimableAmount)}
            </div>
            <button 
              onClick={() => setClaimableAmount(0)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
            >
              Claim
            </button>
          </div>
        </div>

        {/* Positions Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-gray-700/50 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Positions</h2>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="relative flex-1 sm:flex-none">
                  <input
                    type="text"
                    placeholder="Search by address, name or symbol"
                    className="bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors w-full sm:w-80"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button className="bg-gray-700/50 border border-gray-600/50 rounded-xl p-2 hover:bg-gray-600/50 transition-colors">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                  </svg>
                </button>
                <button className="bg-gray-700/50 border border-gray-600/50 rounded-xl p-2 hover:bg-gray-600/50 transition-colors">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700/50">
                    <th className="text-left py-3 sm:py-4 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Protocol</th>
                    <th className="hidden sm:table-cell text-left py-3 sm:py-4 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Strategy</th>
                    <th className="text-right py-3 sm:py-4 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="hidden sm:table-cell text-right py-3 sm:py-4 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">APY</th>
                    <th className="text-right py-3 sm:py-4 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Earned</th>
                    <th className="hidden lg:table-cell text-right py-3 sm:py-4 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">24h Change</th>
                    <th className="text-right py-3 sm:py-4 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {positions.map((position, index) => (
                    <tr key={position.id} className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors">
                      <td className="py-3 sm:py-6 px-2">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mr-2 sm:mr-3 ${
                            position.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                            position.color === 'green' ? 'bg-green-500/20 text-green-400' :
                            'bg-purple-500/20 text-purple-400'
                          }`}>
                            <span className="text-xs sm:text-sm font-bold">{position.protocol.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="font-semibold text-white text-sm sm:text-base">{position.protocol}</div>
                            <div className="text-xs sm:text-sm text-gray-400">{position.asset}</div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell py-3 sm:py-6 px-2">
                        <span className="text-sm px-2 py-1 bg-gray-700/50 rounded-lg text-gray-300">
                          {position.strategy}
                        </span>
                      </td>
                      <td className="py-3 sm:py-6 px-2 text-right">
                        <div className="font-semibold text-white">
                          {position.asset === 'USDC' ? formatCurrency(position.amount) : `${position.amount} ${position.asset}`}
                        </div>
                      </td>
                      <td className="hidden sm:table-cell py-3 sm:py-6 px-2 text-right">
                        <span className="font-semibold text-green-400">
                          {formatPercentage(position.apy, false)}
                        </span>
                      </td>
                      <td className="py-3 sm:py-6 px-2 text-right">
                        <span className="font-semibold text-white">
                          {position.asset === 'USDC' ? formatCurrency(position.earned) : `${position.earned} ${position.asset}`}
                        </span>
                      </td>
                      <td className="hidden lg:table-cell py-3 sm:py-6 px-2 text-right">
                        <span className={`font-semibold ${
                          position.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {formatPercentage(position.change24h)}
                        </span>
                      </td>
                      <td className="py-3 sm:py-6 px-2 text-right">
                        <div className="flex items-center justify-end space-x-1 sm:space-x-2">
                          <button className="bg-gray-700/50 hover:bg-gray-600/50 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm transition-colors">
                            Manage
                          </button>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm transition-colors">
                            Claim
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-700/50 hover:border-gray-600/50 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Explore Strategies</h3>
            <p className="text-gray-400 text-xs sm:text-sm">Discover new yield opportunities across DeFi protocols</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-700/50 hover:border-gray-600/50 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Portfolio Analytics</h3>
            <p className="text-gray-400 text-xs sm:text-sm">Deep dive into your performance metrics and insights</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-700/50 hover:border-gray-600/50 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Compound Rewards</h3>
            <p className="text-gray-400 text-xs sm:text-sm">Automatically reinvest your yields for maximum returns</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PortfolioPage;