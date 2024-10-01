// src/config/chains.ts

export interface ChainInfo {
    name: string;
    id: string;
    isEVM: boolean;
    nativeCurrency: string;
    chainId?: number;
    bech32_prefix: string;
    apis?: {
      rpc: { address: string }[];
    };
  }
  
  export const chains: ChainInfo[] = [
    {
      name: 'Ethereum',
      id: 'ethereum',
      isEVM: true,
      nativeCurrency: 'ETH',
      chainId: 1,
      bech32_prefix: 'eth', // Not typically used for Ethereum, but included for consistency
      apis: {
        rpc: [{ address: 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY' }]
      }
    },
    {
      name: 'Binance Smart Chain',
      id: 'bsc',
      isEVM: true,
      nativeCurrency: 'BNB',
      chainId: 56,
      bech32_prefix: 'bnb', // Not typically used for BSC, but included for consistency
      apis: {
        rpc: [{ address: 'https://bsc-dataseed.binance.org' }]
      }
    },
    {
      name: 'Cosmos Hub',
      id: 'cosmos',
      isEVM: false,
      nativeCurrency: 'ATOM',
      bech32_prefix: 'cosmos',
      apis: {
        rpc: [
          { address: 'https://rpc.cosmos.network' },
          { address: 'https://rpc-cosmoshub.keplr.app' }
        ]
      }
    },
    {
      name: 'THORChain',
      id: 'thorchain',
      isEVM: false,
      nativeCurrency: 'RUNE',
      bech32_prefix: 'thor',
      apis: {
        rpc: [
          { address: 'https://rpc.thorchain.info' },
          { address: 'https://rpc.ninerealms.com' }
        ]
      }
    },
    {
      name: 'Kujira',
      id: 'kujira',
      isEVM: false,
      nativeCurrency: 'KUJI',
      bech32_prefix: 'kujira',
      apis: {
        rpc: [
          { address: 'https://rpc-kujira.whispernode.com' },
          { address: 'https://kujira-rpc.polkachu.com' }
        ]
      }
    }
  ];