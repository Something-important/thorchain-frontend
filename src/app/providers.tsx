import React from 'react';
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, arbitrum, sepolia, bsc, avalanche } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChainProvider } from '@cosmos-kit/react';
import { chains as cosmosChains, assets } from 'chain-registry';
import { wallets as cosmosWallets } from '@cosmos-kit/keplr';
// Import this in your top-level route/layout
import "@interchain-ui/react/styles";

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: "YOUR_PROJECT_ID", // Replace this with your actual project ID
  chains: [mainnet, arbitrum, sepolia, bsc, avalanche],
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#7b3fe4",
            accentColorForeground: "black",
            borderRadius: "small",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <ChainProvider
            chains={cosmosChains}
            assetLists={assets}
            wallets={cosmosWallets}
          >
            {children}
          </ChainProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}