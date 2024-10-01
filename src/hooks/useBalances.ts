// src/hooks/useBalances.ts

import { useState, useCallback } from 'react';
import { useBalance, useToken } from 'wagmi';
import { chains } from '../utils/chains';
import { getWalletBalanceOnChain } from '../utils/cosmosBalance'; // Implement this function for Cosmos chains

interface Asset {
  symbol: string;
  name: string;
  balance: string;
  price: number;
  address?: string;
  decimals?: number;
}

export function useBalances(address: string | undefined, chainId: string) {
  const [assets, setAssets] = useState<Asset[]>([]);

  const fetchBalances = useCallback(async () => {
    if (!address) return;

    const selectedChain = chains.find(c => c.id === chainId);
    if (!selectedChain) return;

    let chainAssets: Asset[] = [];

    if (selectedChain.isEVM) {
      // Fetch EVM chain assets
      const { data: nativeBalance } = useBalance({
        address: address,
        chainId: selectedChain.chainId,
      });

      chainAssets.push({
        symbol: selectedChain.nativeCurrency,
        name: selectedChain.nativeCurrency,
        balance: nativeBalance?.formatted || '0',
        price: 0, // You'll need to fetch prices separately
        decimals: nativeBalance?.decimals,
      });

      // Fetch some popular tokens for the selected EVM chain
      const popularTokens = ['USDT', 'USDC', 'DAI'];
      for (const tokenSymbol of popularTokens) {
        const { data: tokenData } = useToken({
          address: '0x...', // Replace with actual token address
          chainId: selectedChain.chainId,
        });
        const { data: tokenBalance } = useBalance({
          address: address,
          token: '0x...', // Replace with actual token address
          chainId: selectedChain.chainId,
        });
        
        if (tokenData && tokenBalance) {
          chainAssets.push({
            symbol: tokenData.symbol,
            name: tokenData.name,
            balance: tokenBalance.formatted,
            price: 0, // You'll need to fetch prices separately
            decimals: tokenData.decimals,
            address: '0x...', // Replace with actual token address
          });
        }
      }
    } else {
      // Fetch Cosmos chain assets
      try {
        const cosmosBalances = await getWalletBalanceOnChain(address);
        chainAssets = cosmosBalances.map(balance => ({
          symbol: balance.denom,
          name: balance.denom,
          balance: balance.amount,
          price: 0, // You'll need to fetch prices separately
          decimals: 6, // Most Cosmos chains use 6 decimals, but this might vary
        }));
      } catch (error) {
        console.error('Error fetching Cosmos balances:', error);
      }
    }

    setAssets(chainAssets);
  }, [address, chainId]);

  return { assets, fetchBalances };
}