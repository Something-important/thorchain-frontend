// components/PoolComponent.tsx
'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { ArrowUpDown, DollarSign, Percent, ChevronDown, ChevronUp, Activity, Droplet } from 'lucide-react';

interface PoolDetail {
  asset: string;
  status: string;
  assetPrice: string;
  assetPriceUSD: string;
  assetDepth: string;
  runeDepth: string;
  synthSupply: string;
  volume24h: string;
  poolAPY: string;
  annualPercentageRate: string;
}

interface PoolComponentProps {
  pools: PoolDetail[];
}

const PoolComponent: React.FC<PoolComponentProps> = ({ pools }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChain, setSelectedChain] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof PoolDetail; direction: 'asc' | 'desc' } | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  useEffect(() => {
    console.log('Pools data:', pools);
  }, [pools]);

  const formatNumber = (value: string | number, decimals: number = 2): string => {
    if (typeof value === 'undefined' || value === null) return 'N/A';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(num) ? 'N/A' : num.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  const formatPercentage = (value: string): string => {
    if (!value) return 'N/A';
    const percentage = parseFloat(value) * 100;
    return isNaN(percentage) ? 'N/A' : `${percentage.toFixed(2)}%`;
  };

  const shortenAssetName = (asset: string): string => {
    const parts = asset.split('.');
    return parts[parts.length - 1].split('-')[0];
  };

  const chains = useMemo(() => Array.from(new Set(pools.map(pool => pool.asset.split('.')[0]))), [pools]);

  const filteredPools = useMemo(() => pools.filter(pool => 
    pool.asset.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedChain === '' || pool.asset.split('.')[0] === selectedChain)
  ), [pools, searchTerm, selectedChain]);

  const sortedPools = useMemo(() => {
    let sortablePools = [...filteredPools];
    if (sortConfig !== null) {
      sortablePools.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortablePools;
  }, [filteredPools, sortConfig]);

  const requestSort = (key: keyof PoolDetail) => {
    let direction: 'asc' | 'desc' = 'desc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const toggleRowExpansion = (asset: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(asset)) {
        newSet.delete(asset);
      } else {
        newSet.add(asset);
      }
      return newSet;
    });
  };

  return (
    <div className="bg-gray-900 text-gray-100 p-6 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-blue-400">Liquidity Pools</h2>
      
      <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Search assets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white flex-grow border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedChain}
          onChange={(e) => setSelectedChain(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Chains</option>
          {chains.map(chain => (
            <option key={chain} value={chain}>{chain}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs uppercase bg-gray-800">
            <tr>
              <th className="px-6 py-3">Expand</th>
              <th className="px-6 py-3 cursor-pointer" onClick={() => requestSort('asset')}>Asset <ArrowUpDown size={14} className="inline" /></th>
              <th className="px-6 py-3 cursor-pointer" onClick={() => requestSort('assetPriceUSD')}>Price (USD) <ArrowUpDown size={14} className="inline" /></th>
              <th className="px-6 py-3 cursor-pointer" onClick={() => requestSort('assetDepth')}>Asset Depth <ArrowUpDown size={14} className="inline" /></th>
              <th className="px-6 py-3 cursor-pointer" onClick={() => requestSort('runeDepth')}>RUNE Depth <ArrowUpDown size={14} className="inline" /></th>
              <th className="px-6 py-3 cursor-pointer" onClick={() => requestSort('volume24h')}>24h Volume <ArrowUpDown size={14} className="inline" /></th>
              <th className="px-6 py-3 cursor-pointer" onClick={() => requestSort('poolAPY')}>APY <ArrowUpDown size={14} className="inline" /></th>
              <th className="px-6 py-3 cursor-pointer" onClick={() => requestSort('status')}>Status <ArrowUpDown size={14} className="inline" /></th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedPools.map((pool) => (
              <React.Fragment key={pool.asset}>
                <tr className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4">
                    <button onClick={() => toggleRowExpansion(pool.asset)} className="text-blue-400 hover:text-blue-300">
                      {expandedRows.has(pool.asset) ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap">{shortenAssetName(pool.asset)}</td>
                  <td className="px-6 py-4"><DollarSign size={14} className="inline text-green-400" /> {formatNumber(pool.assetPriceUSD)}</td>
                  <td className="px-6 py-4">{formatNumber(pool.assetDepth)}</td>
                  <td className="px-6 py-4">{formatNumber(pool.runeDepth)}</td>
                  <td className="px-6 py-4">{formatNumber(pool.volume24h)}</td>
                  <td className="px-6 py-4"><Percent size={14} className="inline text-yellow-400" /> {formatPercentage(pool.poolAPY)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded ${pool.status.toLowerCase() === 'available' ? 'bg-green-700 text-green-100' : 'bg-red-700 text-red-100'}`}>
                      {pool.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {pool.status.toLowerCase() === "available" && (
                      <div className="flex space-x-2">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs flex items-center">
                          <Droplet size={12} className="mr-1" /> Add
                        </button>
                        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs flex items-center">
                          <Activity size={12} className="mr-1" /> Swap
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
                {expandedRows.has(pool.asset) && (
                  <tr className="bg-gray-900">
                    <td colSpan={9}>
                      <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-gray-300">
                        <div>
                          <strong className="text-blue-400">Full Asset Name:</strong> {pool.asset}
                        </div>
                        <div>
                          <strong className="text-blue-400">Asset Price:</strong> {formatNumber(pool.assetPrice)}
                        </div>
                        <div>
                          <strong className="text-blue-400">Synth Supply:</strong> {formatNumber(pool.synthSupply)}
                        </div>
                        <div>
                          <strong className="text-blue-400">Annual Percentage Rate:</strong> {formatPercentage(pool.annualPercentageRate)}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PoolComponent;