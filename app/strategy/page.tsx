'use client';

import React, { useState } from 'react';

const StrategyPage = () => {
  const [selectedStrategy, setSelectedStrategy] = useState('AXAL');

  const strategies = [
    {
      name: 'Timelock',
      title: 'BetterYield',
      apy: '9%',
      description: 'Tier 1 stablecoin lending markets',
      risk: 'Low',
      tvl: '$126.7M',
      selected: true
    },
    {
      name: 'U.S. Treasury Bills',
      apy: '5%',
      description: 'Government-backed securities',
      risk: 'Very Low',
      tvl: '$2.4B',
      selected: false
    },
    {
      name: 'Robinhood Gold',
      apy: '4%',
      description: 'High-yield savings account',
      risk: 'Very Low',
      tvl: '$850M',
      selected: false
    },
    {
      name: 'U.S. Savings Account',
      apy: '0.5%',
      description: 'Traditional banking',
      risk: 'None',
      tvl: 'N/A',
      selected: false
    }
  ];

  const protocolData = [
    {
      name: 'Morpho Seamless USDC',
      token: 'USDC',
      type: 'Vault',
      percent: '35%',
      apy: '10.62%',
      logo: '🔷',
      allocation: 35
    },
    {
      name: 'Morpho Moonwell USDC',
      token: 'USDC', 
      type: 'Vault',
      percent: '35%',
      apy: '10.57%',
      logo: '🔷',
      allocation: 35
    },
    {
      name: 'Euler USDC',
      token: 'USDC',
      type: 'Vault', 
      percent: '30%',
      apy: '7.90%',
      logo: '⚡',
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
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent"></div>
      
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mr-4 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">◊</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Yield Protocol
              </h1>
            </div>
            
            {/* Stats Bar */}
            <div className="hidden lg:flex items-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">$2.4B</div>
                <div className="text-sm text-gray-400">Total TVL</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">9.97%</div>
                <div className="text-sm text-gray-400">Avg APY</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">4</div>
                <div className="text-sm text-gray-400">Strategies</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Column - Strategy Selection */}
          <div className="xl:col-span-5">
            <div className="mb-8">
              <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider bg-blue-400/10 px-3 py-1 rounded-full">
                01 STRATEGY
              </span>
              <h2 className="text-4xl font-bold text-white mt-4 mb-2">
                Take a look at
              </h2>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                your strategy
              </h2>
            </div>

            {/* Strategy Options */}
            <div className="space-y-4">
              {strategies.map((strategy, index) => (
                <div
                  key={strategy.name}
                  className={`relative group p-6 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                    strategy.name === selectedStrategy
                      ? 'border-blue-500/50 bg-gradient-to-r from-blue-600/20 to-purple-600/20 shadow-lg shadow-blue-500/25'
                      : 'border-gray-700/50 bg-gray-800/50 hover:border-gray-600/50 hover:bg-gray-800/70 backdrop-blur-sm'
                  }`}
                  onClick={() => setSelectedStrategy(strategy.name)}
                >
                  {/* Background Glow */}
                  {strategy.name === selectedStrategy && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-xl"></div>
                  )}
                  
                  <div className="relative flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-white mb-1">
                        {strategy.name}
                      </h3>
                      {strategy.title && (
                        <p className="text-gray-300 text-sm mb-3">
                          {strategy.title}
                        </p>
                      )}
                      <p className="text-gray-400 text-sm mb-3">
                        {strategy.description}
                      </p>
                      
                      {/* Strategy Metrics */}
                      <div className="flex items-center space-x-4">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRiskColor(strategy.risk)}`}>
                          {strategy.risk} Risk
                        </span>
                        <span className="text-xs text-gray-400">
                          TVL: {strategy.tvl}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right ml-4">
                      <span className={`text-3xl font-bold ${
                        strategy.name === selectedStrategy 
                          ? 'bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent' 
                          : 'text-gray-300'
                      }`}>
                        {strategy.apy}
                      </span>
                      <span className="text-sm text-gray-400 block">APY</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Strategy Details */}
          <div className="xl:col-span-7">
            {/* Axal Prime Header */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-3">
                    BetterYield
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Earn up to <span className="text-green-400 font-bold">9.78%</span> APY through Tier 1 stablecoin lending markets for USDC.
                  </p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">💎</span>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-400 text-sm font-medium">Total Liquidity</span>
                    <div className="w-4 h-4 rounded-full bg-gray-600 flex items-center justify-center">
                      <span className="text-xs text-gray-300">?</span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">$126.7M</div>
                  <div className="text-sm text-gray-400">USDC</div>
                </div>

                <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-400 text-sm font-medium">Token</span>
                    <div className="w-4 h-4 rounded-full bg-gray-600 flex items-center justify-center">
                      <span className="text-xs text-gray-300">?</span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">USDC</div>
                  <div className="text-sm text-gray-400">on Base</div>
                </div>

                <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-400 text-sm font-medium">Total APY</span>
                    <div className="w-4 h-4 rounded-full bg-gray-600 flex items-center justify-center">
                      <span className="text-xs text-gray-300">?</span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-green-400 mb-1">9.97%</div>
                  <div className="text-sm text-gray-400">Last 7D: 9.79%</div>
                </div>
              </div>
            </div>

            {/* Yield Sources and Protocols */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Yield Sources */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Yield Sources
                </h3>
                <div className="relative">
                  <div className="w-40 h-40 mx-auto mb-6">
                    <div className="relative w-full h-full">
                      {/* Multi-layered donut chart */}
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                        {/* Background circle */}
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          stroke="currentColor"
                          strokeWidth="12"
                          fill="none"
                          className="text-gray-700"
                        />
                        {/* Progress circles for each protocol */}
                        {protocolData.map((protocol, index) => {
                          const radius = 70;
                          const circumference = 2 * Math.PI * radius;
                          const strokeDasharray = circumference;
                          const strokeDashoffset = circumference - (protocol.allocation / 100) * circumference;
                          const rotation = protocolData.slice(0, index).reduce((acc, p) => acc + (p.allocation / 100) * 360, 0);
                          
                          return (
                            <circle
                              key={index}
                              cx="80"
                              cy="80"
                              r={radius}
                              stroke={index === 0 ? '#3B82F6' : index === 1 ? '#8B5CF6' : '#10B981'}
                              strokeWidth="12"
                              fill="none"
                              strokeDasharray={strokeDasharray}
                              strokeDashoffset={strokeDashoffset}
                              className="transition-all duration-300"
                              style={{
                                transformOrigin: '80px 80px',
                                transform: `rotate(${rotation}deg)`
                              }}
                            />
                          );
                        })}
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-sm text-gray-400 mb-1">Weight Breakdown</div>
                          <div className="text-3xl font-bold text-white">100%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Legend */}
                  <div className="space-y-3">
                    {protocolData.map((protocol, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div 
                            className={`w-3 h-3 rounded-full mr-3 ${
                              index === 0 ? 'bg-blue-500' : 
                              index === 1 ? 'bg-purple-500' : 'bg-green-500'
                            }`}
                          ></div>
                          <span className="text-gray-300 text-sm">{protocol.name.split(' ')[0]}</span>
                        </div>
                        <span className="text-white font-medium">{protocol.percent}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Participating Protocols */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Participating Protocols
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4 text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3 border-b border-gray-700">
                    <div>NAME</div>
                    <div className="text-center">TYPE</div>
                    <div className="text-center">PERCENT</div>
                    <div className="text-center">7D APY</div>
                  </div>
                  
                  {protocolData.map((protocol, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 items-center py-4 rounded-xl hover:bg-gray-700/30 transition-colors duration-200 group">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-3 ${
                          index === 0 ? 'bg-blue-500/20 text-blue-400' :
                          index === 1 ? 'bg-purple-500/20 text-purple-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {protocol.logo}
                        </div>
                        <div>
                          <div className="font-semibold text-white text-sm group-hover:text-blue-400 transition-colors">
                            {protocol.name.replace(' USDC', '')}
                          </div>
                          <div className="text-xs text-gray-400">
                            {protocol.token}
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="text-sm px-2 py-1 bg-gray-700/50 rounded-lg text-gray-300">
                          {protocol.type}
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="text-lg font-bold text-white">
                          {protocol.percent}
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="text-lg font-bold text-green-400">
                          {protocol.apy}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 group">
                <span className="flex items-center justify-center">
                  Continue
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
              
              <button className="flex-1 sm:flex-none bg-gray-800 hover:bg-gray-700 text-white font-semibold py-4 px-8 rounded-2xl border border-gray-600 hover:border-gray-500 transition-all duration-300">
                Learn More
              </button>
            </div>

            {/* Performance Chart Preview */}
            <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Performance History</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm rounded-lg bg-blue-600 text-white">7D</button>
                  <button className="px-3 py-1 text-sm rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600">30D</button>
                  <button className="px-3 py-1 text-sm rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600">90D</button>
                </div>
              </div>
              
              {/* Simple Chart Visualization */}
              <div className="h-32 flex items-end space-x-2 mb-4">
                {[65, 72, 68, 78, 85, 82, 90, 88, 95, 97, 94, 99, 97].map((height, index) => (
                  <div 
                    key={index}
                    className="flex-1 bg-gradient-to-t from-blue-600 to-purple-500 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
              
              <div className="flex justify-between text-sm text-gray-400">
                <span>7 days ago</span>
                <span>Today</span>
              </div>
            </div>

            {/* Risk Information */}
            <div className="mt-8 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-sm rounded-3xl p-8 border border-yellow-500/30">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.348 18.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-yellow-400 mb-2">Risk Disclosure</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    DeFi protocols involve smart contract risks, potential impermanent loss, and market volatility. 
                    Past performance does not guarantee future results. Please assess your risk tolerance before investing.
                  </p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-6 bg-gray-900/50 rounded-2xl border border-gray-700/30">
              <p className="text-xs text-gray-400 leading-relaxed">
                <span className="font-semibold text-gray-300">Disclaimer:</span> The content provided by Yield Protocol is intended for informational and educational purposes only. 
                This is not financial advice. Cryptocurrency investments are subject to market risk and price volatility. 
                Users should conduct their own research and consult with financial advisors before making investment decisions.
              </p>
            </div>
          </div>
        </div>
        
        {/* Mobile Stats Bar */}
        <div className="lg:hidden mt-12 grid grid-cols-3 gap-4">
          <div className="bg-gray-800/50 rounded-2xl p-4 text-center border border-gray-700/50">
            <div className="text-xl font-bold text-white">$2.4B</div>
            <div className="text-sm text-gray-400">Total TVL</div>
          </div>
          <div className="bg-gray-800/50 rounded-2xl p-4 text-center border border-gray-700/50">
            <div className="text-xl font-bold text-green-400">9.97%</div>
            <div className="text-sm text-gray-400">Avg APY</div>
          </div>
          <div className="bg-gray-800/50 rounded-2xl p-4 text-center border border-gray-700/50">
            <div className="text-xl font-bold text-blue-400">4</div>
            <div className="text-sm text-gray-400">Strategies</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyPage;