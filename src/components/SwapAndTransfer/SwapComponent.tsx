'use client';
import React, { useState, useEffect } from 'react';
import { ArrowDown, RefreshCw } from 'lucide-react';
import { ethers } from 'ethers';
import axios from 'axios';

const MIDGARD_API = 'https://midgard.thorchain.info/v2';

interface Asset {
  symbol: string;
  name: string;
  balance: string;
  price: number;
}

// Mock data for chains, replace with actual data source
const chains = [
  { chain_id: 'chain1', chain_name: 'Chain 1' },
  { chain_id: 'chain2', chain_name: 'Chain 2' },
  // Add more chains as needed
];

const SwapComponent: React.FC = () => {
  const [fromChainId, setFromChainId] = useState<string>(chains[0].chain_id);
  const [toChainId, setToChainId] = useState<string>(chains[1].chain_id);
  const [fromAsset, setFromAsset] = useState<string>('');
  const [toAsset, setToAsset] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [estimatedReturn, setEstimatedReturn] = useState<string | null>(null);
  const [fromBalances, setFromBalances] = useState<Asset[]>([]);
  const [toBalances, setToBalances] = useState<Asset[]>([]);

  useEffect(() => {
    fetchBalances(fromChainId, setFromBalances);
    fetchBalances(toChainId, setToBalances);
  }, [fromChainId, toChainId]);

  const fetchBalances = async (chainId: string, setBalances: React.Dispatch<React.SetStateAction<Asset[]>>) => {
    // Mock function to fetch balances
    // In a real scenario, you would implement actual balance fetching logic here
    const mockBalances: Asset[] = [
      { symbol: 'ATOM', name: 'Cosmos', balance: '100', price: 10 },
      { symbol: 'OSMO', name: 'Osmosis', balance: '200', price: 5 },
    ];
    setBalances(mockBalances);
  };

  useEffect(() => {
    if (fromAsset && toAsset && amount) {
      estimateSwap();
    }
  }, [fromAsset, toAsset, amount]);

  const estimateSwap = async () => {
    try {
      const response = await axios.get(`${MIDGARD_API}/quote/swap`, {
        params: {
          amount: ethers.utils.parseUnits(amount, 8).toString(),
          from_asset: fromAsset,
          to_asset: toAsset,
        },
      });
      setEstimatedReturn(ethers.utils.formatUnits(response.data.expected_amount_out, 8));
    } catch (err) {
      console.error('Error estimating swap:', err);
      setEstimatedReturn(null);
    }
  };

  const handleSwap = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      // Implement swap logic here
      console.log(`Swap: ${amount} ${fromAsset} on ${fromChainId} to ${toAsset} on ${toChainId}`);
      setAmount('');
    } catch (err) {
      console.error('Swap failed:', err);
      setError('Swap failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderChainSelect = (id: string, value: string, onChange: (value: string) => void, label: string) => (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-purple-200 mb-2">{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-purple-700 bg-opacity-50 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        {chains.map((chain) => (
          <option key={chain.chain_id} value={chain.chain_id}>
            {chain.chain_name}
          </option>
        ))}
      </select>
    </div>
  );

  const renderAssetSelect = (id: string, value: string, onChange: (value: string) => void, label: string, assets: Asset[]) => (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-purple-200 mb-2">{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-purple-700 bg-opacity-50 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="">Select asset</option>
        {assets.map((asset) => (
          <option key={asset.symbol} value={asset.symbol}>
            {asset.name} ({asset.symbol}) - Balance: {asset.balance}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <form onSubmit={handleSwap} className="space-y-4">
      {renderChainSelect("fromChain", fromChainId, setFromChainId, "From Chain")}
      {renderAssetSelect("fromAsset", fromAsset, setFromAsset, "From Asset", fromBalances)}
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-purple-200 mb-2">Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-purple-700 bg-opacity-50 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="0.0"
        />
      </div>
      <button
        type="button"
        onClick={() => {
          const tempChain = fromChainId;
          setFromChainId(toChainId);
          setToChainId(tempChain);
        }}
        className="w-full flex justify-center items-center py-2 text-purple-200 hover:text-white transition-colors duration-200"
      >
        <ArrowDown className="transform rotate-180" />
      </button>
      {renderChainSelect("toChain", toChainId, setToChainId, "To Chain")}
      {renderAssetSelect("toAsset", toAsset, setToAsset, "To Asset", toBalances)}
      {estimatedReturn && (
        <p className="text-purple-200">
          Estimated return: {estimatedReturn} {toAsset}
        </p>
      )}
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={isLoading || !fromAsset || !toAsset || !amount}
        className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? <RefreshCw className="animate-spin mx-auto" /> : 'Swap'}
      </button>
    </form>
  );
};

export default SwapComponent;