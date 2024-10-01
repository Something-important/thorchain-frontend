import React, { useState } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import { useChain } from "@cosmos-kit/react";
import { Info, X, Copy, ExternalLink } from 'lucide-react';

type ChainName = "Ethereum" | "Arbitrum" | "BNB Chain" | "Avalanche" | "Cosmos Hub" | "Kujira";

export default function WalletConnect(): JSX.Element {
  const [showWalletInfo, setShowWalletInfo] = useState<boolean>(false);

  const { openConnectModal } = useConnectModal();
  const { address: evmAddress, isConnected: isEvmConnected } = useAccount();
  const { disconnect: disconnectEvm } = useDisconnect();

  const cosmosHubChain = useChain("cosmoshub");
  const kujiraChain = useChain("kujira");

  const handleChainConnection = (chain: ChainName): void => {
    if (["Ethereum", "Arbitrum", "BNB Chain", "Avalanche"].includes(chain)) {
      if (openConnectModal) {
        openConnectModal();
      }
    } else if (chain === "Cosmos Hub") {
      cosmosHubChain.connect();
    } else if (chain === "Kujira") {
      kujiraChain.connect();
    }
    setShowWalletInfo(true);
  };

  const handleDisconnect = (chain: ChainName): void => {
    if (["Ethereum", "Arbitrum", "BNB Chain", "Avalanche"].includes(chain)) {
      disconnectEvm();
    } else if (chain === "Cosmos Hub") {
      cosmosHubChain.disconnect();
    } else if (chain === "Kujira") {
      kujiraChain.disconnect();
    }
  };

  const copyToClipboard = (text: string): void => {
    navigator.clipboard.writeText(text);
    // You might want to add some visual feedback here
  };

  const getBlockExplorerLink = (chain: ChainName, address: string): string => {
    const explorers: Record<ChainName, string> = {
      "Ethereum": `https://etherscan.io/address/${address}`,
      "Arbitrum": `https://arbiscan.io/address/${address}`,
      "BNB Chain": `https://bscscan.com/address/${address}`,
      "Avalanche": `https://snowtrace.io/address/${address}`,
      "Cosmos Hub": `https://www.mintscan.io/cosmos/address/${address}`,
      "Kujira": `https://finder.kujira.app/kaiyo-1/address/${address}`
    };
    return explorers[chain] || "#";
  };

  const renderWalletInfo = (chainName: ChainName, address: string | undefined): JSX.Element | null => {
    if (!address) return null;
    return (
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <span className="truncate w-40">{address}</span>
          <button onClick={() => copyToClipboard(address)} className="p-1 hover:bg-gray-700 rounded">
            <Copy size={16} />
          </button>
          <a href={getBlockExplorerLink(chainName, address)} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-gray-700 rounded">
            <ExternalLink size={16} />
          </a>
        </div>
        <button onClick={() => handleDisconnect(chainName)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
          Disconnect
        </button>
      </div>
    );
  };

  const renderEvmChainInfo = (chainName: ChainName): JSX.Element => {
    return (
      <div className="mb-4">
        <h3 className="font-bold text-lg mb-2">{chainName}</h3>
        {isEvmConnected ? (
          renderWalletInfo(chainName, evmAddress)
        ) : (
          <button 
            onClick={() => handleChainConnection(chainName)} 
            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
          >
            Connect {chainName}
          </button>
        )}
      </div>
    );
  };

  const renderCosmosChainInfo = (chainName: ChainName, chainContext: ReturnType<typeof useChain>): JSX.Element => {
    return (
      <div className="mb-4">
        <h3 className="font-bold text-lg mb-2">{chainName}</h3>
        {chainContext.isWalletConnected ? (
          renderWalletInfo(chainName, chainContext.address)
        ) : (
          <button 
            onClick={() => handleChainConnection(chainName)} 
            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
          >
            Connect {chainName}
          </button>
        )}
      </div>
    );
  };

  const renderChainInfo = (): JSX.Element => {
    return (
      <>
        {renderEvmChainInfo("Ethereum")}
        {renderEvmChainInfo("Arbitrum")}
        {renderEvmChainInfo("BNB Chain")}
        {renderEvmChainInfo("Avalanche")}
        {renderCosmosChainInfo("Cosmos Hub", cosmosHubChain)}
        {renderCosmosChainInfo("Kujira", kujiraChain)}
      </>
    );
  };

  return (
    <div className="relative">
      <div className="flex space-x-4 items-center flex-wrap">
        {["Ethereum", "Arbitrum", "BNB Chain", "Avalanche", "Cosmos Hub", "Kujira"].map((chain) => (
          <button 
            key={chain} 
            onClick={() => handleChainConnection(chain as ChainName)}
            className="px-4 py-2 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 mb-2"
          >
            {chain}
          </button>
        ))}
        <button
          onClick={() => setShowWalletInfo(!showWalletInfo)}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full ml-auto"
        >
          <Info size={16} />
        </button>
      </div>

      {showWalletInfo && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" onClick={() => setShowWalletInfo(false)}></div>
          <div className="fixed inset-y-0 right-0 w-1/2 bg-gray-800 p-4 shadow-lg overflow-y-auto z-50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Wallet Info</h2>
              <button
                onClick={() => setShowWalletInfo(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <div className="text-white">
              {renderChainInfo()}
            </div>
          </div>
        </>
      )}
    </div>
  );
}