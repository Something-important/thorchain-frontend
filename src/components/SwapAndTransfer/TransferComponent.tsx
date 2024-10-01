import React, { useState, useEffect } from 'react';
import { useChain } from '@cosmos-kit/react';
import { useAccount, useSwitchChain, useChainId, useBalance} from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { formatEther } from 'viem';
import { RefreshCw } from 'lucide-react';

type CosmosChain = {
  id: string;
  name: string;
  type: 'cosmos';
};

type EVMChain = {
  id: number;
  name: string;
  type: 'evm';
};

type Chain = CosmosChain | EVMChain;

const chains: Chain[] = [
  { id: 'cosmoshub', name: 'Cosmos Hub', type: 'cosmos' },
  { id: 'kujira', name: 'Kujira', type: 'cosmos' },
  { id: 1, name: 'Ethereum', type: 'evm' },
  { id: 42161, name: 'Arbitrum', type: 'evm' },
  { id: 56, name: 'BNB Chain', type: 'evm' },
  { id: 43114, name: 'Avalanche', type: 'evm' }
];

function findChain(selectedChain: string | number): Chain | undefined {
  const chainIdStr = selectedChain.toString();
  return chains.find(c => c.id.toString() === chainIdStr);
}

interface TokenBalance {
  denom: string;
  balance: string;
}

// ERC20 ABI for balanceOf function
const erc20ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];

const TransferComponent: React.FC = () => {
  const cosmoshub = useChain('cosmoshub');
  const kujira = useChain('kujira');
  const chainId = useChainId();
  const { address: evmAddress, isConnected: isEvmConnected } = useAccount();
  const { switchChain } = useSwitchChain();
  const { openConnectModal } = useConnectModal();

  const [selectedChain, setSelectedChain] = useState<string | number>(chains[0].id);
  const [selectedToken, setSelectedToken] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [tokenBalances, setTokenBalances] = useState<Record<string | number, TokenBalance[]>>({});

  console.log('Render: Current selectedChain:', selectedChain);
  console.log('Render: Current evmAddress:', evmAddress);

  // @ts-ignore
const { data: balanceData, isLoading: isLoadingBalance, error: balanceError } = useBalance({
  address: evmAddress,
  chainId: typeof selectedChain === 'number' ? selectedChain : undefined,
  watch: true,
});


  useEffect(() => {
    console.log('useEffect for balanceData triggered');
    console.log('Balance Data:', balanceData);
    if (balanceData) {
      console.log("Balance Value:", balanceData.toString());
      console.log("Balance Formatted:", formatEther(balanceData.value));
    } else {
      console.log('balanceData is undefined');
    }
    if (balanceError) {
      console.error('Balance Error:', balanceError);
    }
  }, [balanceData, balanceError]);

  const isConnected = 
    (selectedChain === 'cosmoshub' && cosmoshub.isWalletConnected) ||
    (selectedChain === 'kujira' && kujira.isWalletConnected) ||
    (typeof selectedChain === 'number' && isEvmConnected);

  useEffect(() => {
    console.log("useEffect for fetchBalances triggered");
    console.log("Current chainId:", chainId);
    console.log("Current evmAddress:", evmAddress);
    console.log("Current selectedChain:", selectedChain);
    fetchBalances();
  }, [chainId, evmAddress, cosmoshub.address, kujira.address, selectedChain, balanceData]);

  const fetchBalances = async () => {
    console.log('Fetching balances for chain:', selectedChain);
    const chain = findChain(selectedChain);
    if (!chain) {
      console.error('Chain not found:', selectedChain);
      return;
    }

    let balances: TokenBalance[];
    if (chain.type === 'cosmos') {
      balances = await fetchCosmosBalances(chain.id as string);
    } else {
      console.log('Fetching EVM balances for chain', selectedChain, 'and address:', evmAddress);
      balances = fetchEvmBalances();
    }
    console.log('Fetched balances:', balances);
    setTokenBalances(prevBalances => ({ ...prevBalances, [selectedChain]: balances }));
  };

  const fetchCosmosBalances = async (chainId: string): Promise<TokenBalance[]> => {
    console.log('Fetching Cosmos balances for chain:', chainId);
    const chain = chainId === 'cosmoshub' ? cosmoshub : kujira;
    // This is a placeholder. Replace with actual API calls to fetch balances.
    if (chain.chain?.assets?.[0]?.base) {
      return [
        { denom: chain.chain.assets[0].base, balance: (Math.random() * 100).toFixed(6) },
        { denom: 'otherToken', balance: (Math.random() * 100).toFixed(6) }
      ];
    }
    console.warn('No assets found for chain:', chainId);
    return [];
  };

  const fetchEvmBalances = (): TokenBalance[] => {
    console.log('Fetching EVM balances');
    console.log('Current balanceData:', balanceData);
    if (balanceData) {
      const formattedBalance = formatEther(balanceData);
      console.log('EVM balance:', formattedBalance);
      return [
        { 
          denom: 'ETH', // or the appropriate symbol for the native token
          balance: formattedBalance
        },
      ];
    }
    console.warn('No EVM balance available');
    return [];
  };

  const handleChainSelect = async (chainId: string | number) => {
    console.log('handleChainSelect called with chainId:', chainId);
    setSelectedChain(chainId);
    setSelectedToken('');
    const chain = chains.find(c => c.id.toString() === chainId.toString());
    if (chain?.type === 'cosmos') {
      const cosmosChain = chainId === 'cosmoshub' ? cosmoshub : kujira;
      if (!cosmosChain.isWalletConnected) {
        await cosmosChain.connect();
      }
    } else if (chain?.type === 'evm') {
      if (!isEvmConnected && openConnectModal) {
        openConnectModal();
      }
      try {
        await switchChain({ chainId: Number(chain.id) });
      } catch (error) {
        console.error('Error switching chain:', error);
      }
    }
  };

  const getCurrentAddress = (): string => {
    console.log('getCurrentAddress called, selectedChain:', selectedChain);
    switch (String(selectedChain)) {
      case '1':
      case '42161':
      case '56':
      case '43114':
        return evmAddress || 'Not connected';
      case 'cosmoshub':
        return cosmoshub.address || 'Not connected';
      case 'kujira':
        return kujira.address || 'Not connected';
      case 'undefined':
        return 'No chain selected';
      default:
        return 'Unknown chain';
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); }} className="space-y-4">
      <div className="mb-4">
        <label htmlFor="chain" className="block text-sm font-medium text-purple-200 mb-2">Select Chain</label>
        <select
          id="chain"
          value={selectedChain.toString()}
          onChange={(e) => handleChainSelect(e.target.value)}
          className="w-full bg-purple-700 bg-opacity-50 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {chains.map((chain) => (
            <option key={chain.id} value={chain.id.toString()}>{chain.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-purple-200 mb-2">Current Address</label>
        <p className="text-white break-all">{getCurrentAddress()}</p>
      </div>

      <div className="mb-4">
        <label htmlFor="token" className="block text-sm font-medium text-purple-200 mb-2">Select Token</label>
        <select
          id="token"
          value={selectedToken}
          onChange={(e) => setSelectedToken(e.target.value)}
          className="w-full bg-purple-700 bg-opacity-50 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Select token</option>
          {tokenBalances[selectedChain]?.map((token: TokenBalance) => (
            <option key={token.denom} value={token.denom}>
              {token.denom} - Balance: {token.balance}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-purple-200 mb-2">Amount</label>
        <input
          type="text"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-purple-700 bg-opacity-50 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="0.0"
        />
      </div>

      <div>
        <label htmlFor="recipient" className="block text-sm font-medium text-purple-200 mb-2">Recipient Address</label>
        <input
          type="text"
          id="recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full bg-purple-700 bg-opacity-50 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter recipient address"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-purple-200 mb-2">Current Balance</label>
        <p className="text-white">
          {isLoadingBalance 
            ? 'Fetching balance...' 
            : balanceData 
              ? `${formatEther(balanceData)} ETH` // or the appropriate symbol
              : balanceError
                ? `Error: ${balanceError.message}`
                : 'No balance available'}
        </p>
      </div>

      <button
        type="submit"
        disabled={!isConnected || !selectedToken || !amount || !recipient}
        className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoadingBalance ? <RefreshCw className="animate-spin mx-auto" /> : 'Send Tokens'}
      </button>
    </form>
  );
};

export default TransferComponent;









// import React, { useState, useEffect } from 'react';
// import { useChain } from '@cosmos-kit/react';
// import { useAccount, useBalance, useSwitchChain,useChainId, } from 'wagmi';
// import { useConnectModal } from '@rainbow-me/rainbowkit';
// import { formatEther } from 'viem';
// import { RefreshCw } from 'lucide-react';

// type CosmosChain = {
//   id: string;
//   name: string;
//   type: 'cosmos';
// };

// type EVMChain = {
//   id: number;
//   name: string;
//   type: 'evm';
// };

// type Chain = CosmosChain | EVMChain;

// const chains: Chain[] = [
//   { id: 'cosmoshub', name: 'Cosmos Hub', type: 'cosmos' },
//   { id: 'kujira', name: 'Kujira', type: 'cosmos' },
//   { id: 1, name: 'Ethereum', type: 'evm' },
//   { id: 42161, name: 'Arbitrum', type: 'evm' },
//   { id: 56, name: 'BNB Chain', type: 'evm' },
//   { id: 43114, name: 'Avalanche', type: 'evm' }
// ];
// function findChain(selectedChain: string | number): Chain | undefined {
//   const chainIdStr = selectedChain.toString();
//   return chains.find(c => c.id.toString() === chainIdStr);
// }

// interface TokenBalance {
//   denom: string;
//   balance: string;
// }

// const TransferComponent: React.FC = () => {
//   const cosmoshub = useChain('cosmoshub');
//   const kujira = useChain('kujira');
//   const chainId = useChainId();
//   const { address: evmAddress, isConnected: isEvmConnected } = useAccount();
//   const { switchChain } = useSwitchChain();
//   const { openConnectModal } = useConnectModal();

//   const [selectedChain, setSelectedChain] = useState<string | number>(chains[0].id);
//   const [selectedToken, setSelectedToken] = useState<string>('');
//   const [amount, setAmount] = useState<string>('');
//   const [recipient, setRecipient] = useState<string>('');
//   const [tokenBalances, setTokenBalances] = useState<Record<string | number, TokenBalance[]>>({});

//   const { data: evmBalanceData, isLoading: isLoadingEvmBalance } = useBalance({
//     address: evmAddress,
//   });
  
//   const evmBalance = evmBalanceData && {
//     ...evmBalanceData,
//     value: evmBalanceData.value.toString(), // Convert BigInt to string
//   };
//   const isConnected = 
//     (selectedChain === 'cosmoshub' && cosmoshub.isWalletConnected) ||
//     (selectedChain === 'kujira' && kujira.isWalletConnected) ||
//     (typeof selectedChain === 'number' && isEvmConnected);

//     useEffect(() => {
//       console.log("inside fetchBalances");
//         // if (isConnected) {
//           fetchBalances();
//         // }
//     }, [chainId, evmAddress, cosmoshub.address, kujira.address, selectedChain]);

//   const fetchBalances = async () => {
//     console.log('Fetching balances for chain:', selectedChain);
//     const chain = findChain(selectedChain);
//     if (!chain) {
//       console.error('Chain not found:', selectedChain);
//       return;
//     }

//     let balances: TokenBalance[];
//     if (chain.type === 'cosmos') {
//       balances = await fetchCosmosBalances(chain.id as string);
//     } else {
//       console.log('Fetching EVM balances for chain', selectedChain,'and address:', evmAddress);
//       balances = fetchEvmBalances();
//     }
//     console.log('Fetched balances:', balances);
//     setTokenBalances({ ...tokenBalances, [selectedChain]: balances });
//   };

//   const fetchCosmosBalances = async (chainId: string): Promise<TokenBalance[]> => {
//     console.log('Fetching Cosmos balances for chain:', chainId);
//     const chain = chainId === 'cosmoshub' ? cosmoshub : kujira;
//     // This is a placeholder. Replace with actual API calls to fetch balances.
//     if (chain.chain?.assets?.[0]?.base) {
//       return [
//         { denom: chain.chain.assets[0].base, balance: (Math.random() * 100).toFixed(6) },
//         { denom: 'otherToken', balance: (Math.random() * 100).toFixed(6) }
//       ];
//     }
//     console.warn('No assets found for chain:', chainId);
//     return [];
//   };

//   const fetchEvmBalances = (): TokenBalance[] => {
//     console.log('Fetching EVM balances');
//     if (evmBalance) {
//       console.log('EVM balance:', evmBalance);
//       return [
//         { 
//           denom: evmBalance.symbol, 
//           balance: formatEther(BigInt(evmBalance.value))
//         },
//       ];
//     }
//     console.warn('No EVM balance available');
//     return [];
//   };

//   const handleChainSelect = async (chainId: string | number) => {
//     setSelectedChain(chainId);
//     setSelectedToken('');
//     const chain = chains.find(c => c.id.toString() === chainId.toString());
//     if (chain?.type === 'cosmos') {
//       const cosmosChain = chainId === 'cosmoshub' ? cosmoshub : kujira;
//       if (!cosmosChain.isWalletConnected) {
//         await cosmosChain.connect();
//       }
//     } else if (chain?.type === 'evm') {
//       if (!isEvmConnected && openConnectModal) {
//         openConnectModal();
//       }
//       try {
//         await switchChain({ chainId: Number(chain.id) });
//       } catch (error) {
//         console.error('Error switching chain:', error);
//       }
//     }
//   };

//   const getCurrentAddress = (): string => {
  
//     switch (String(selectedChain)) {
//       case '1':
//       case '42161':
//       case '56':
//       case '43114':
//         return evmAddress || 'Not connected';
//       case 'cosmoshub':
//         return cosmoshub.address || 'Not connected';
//       case 'kujira':
//         return kujira.address || 'Not connected';
//       case 'undefined':
//         return 'No chain selected';
//       default:
//         return 'Unknown chain';
//     }
//   };

//   return (
//     <form onSubmit={(e) => { e.preventDefault(); }} className="space-y-4">
//       <div className="mb-4">
//         <label htmlFor="chain" className="block text-sm font-medium text-purple-200 mb-2">Select Chain</label>
//         <select
//           id="chain"
//           value={selectedChain.toString()}
//           onChange={(e) => handleChainSelect(e.target.value)}
//           className="w-full bg-purple-700 bg-opacity-50 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
//         >
//           {chains.map((chain) => (
//             <option key={chain.id} value={chain.id.toString()}>{chain.name}</option>
//           ))}
//         </select>
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-medium text-purple-200 mb-2">Current Address</label>
//         <p className="text-white break-all">{getCurrentAddress()}</p>
//       </div>

//       <div className="mb-4">
//         <label htmlFor="token" className="block text-sm font-medium text-purple-200 mb-2">Select Token</label>
//         <select
//           id="token"
//           value={selectedToken}
//           onChange={(e) => setSelectedToken(e.target.value)}
//           className="w-full bg-purple-700 bg-opacity-50 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
//         >
//           <option value="">Select token</option>
//           {tokenBalances[selectedChain]?.map((token: TokenBalance) => (
//             <option key={token.denom} value={token.denom}>
//               {token.denom} - Balance: {token.balance}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <label htmlFor="amount" className="block text-sm font-medium text-purple-200 mb-2">Amount</label>
//         <input
//           type="text"
//           id="amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="w-full bg-purple-700 bg-opacity-50 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
//           placeholder="0.0"
//         />
//       </div>

//       <div>
//         <label htmlFor="recipient" className="block text-sm font-medium text-purple-200 mb-2">Recipient Address</label>
//         <input
//           type="text"
//           id="recipient"
//           value={recipient}
//           onChange={(e) => setRecipient(e.target.value)}
//           className="w-full bg-purple-700 bg-opacity-50 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
//           placeholder="Enter recipient address"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-purple-200 mb-2">Current Balance</label>
//         <p className="text-white">
//           {isLoadingEvmBalance 
//             ? 'Fetching balance...' 
//             : tokenBalances[selectedChain]?.length > 0 
//               ? `${tokenBalances[selectedChain][0].balance} ${tokenBalances[selectedChain][0].denom}`
//               : 'No balance available'}
//         </p>
//       </div>

//       <button
//         type="submit"
//         disabled={!isConnected || !selectedToken || !amount || !recipient}
//         className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoadingEvmBalance ? <RefreshCw className="animate-spin mx-auto" /> : 'Send Tokens'}
//       </button>
//     </form>
//   );
// };

// export default TransferComponent;



