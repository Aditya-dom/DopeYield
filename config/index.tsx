import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum, polygon, base } from '@reown/appkit/networks'

// Get projectId from environment variables
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || 'demo-project-id';

// Warning for missing project ID in production
if (!process.env.NEXT_PUBLIC_PROJECT_ID && process.env.NODE_ENV === 'production') {
  console.error('Project ID is not defined. Please add NEXT_PUBLIC_PROJECT_ID to your environment variables')
}

export const networks = [mainnet, arbitrum, polygon, base]

// Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig