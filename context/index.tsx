'use client'

import { wagmiAdapter, projectId } from '@/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import { mainnet, arbitrum, polygon, base } from '@reown/appkit/networks'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

// Set up queryClient
const queryClient = new QueryClient()

// Show warning if using demo project ID
if (projectId === 'demo-project-id') {
  console.warn('Using demo project ID. Please set NEXT_PUBLIC_PROJECT_ID in your .env.local file for production use.')
}

// Set up metadata
const metadata = {
  name: 'DopeYield',
  description: 'Smart DeFi Yield Optimization',
  url: 'https://dopeyield.com',
  icons: ['https://dopeyield.com/icon.png']
}

// Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, arbitrum, polygon, base],
  defaultNetwork: mainnet,
  metadata: metadata,
  features: {
    analytics: true,
    email: true,
    socials: ['google', 'x', 'github', 'discord', 'apple'],
    emailShowWallets: true
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-color-mix': '#6366f1',
    '--w3m-color-mix-strength': 20,
    '--w3m-accent': '#8b5cf6',
    '--w3m-border-radius-master': '12px'
  }
})

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider