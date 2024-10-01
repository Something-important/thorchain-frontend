// components/SaverComponent.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { midgardAPI } from '../../utils/api';
import { PoolDetail } from '../../types';
import { Search, Plus, Minus, ArrowUpDown } from 'lucide-react';

interface SaverInfo extends PoolDetail {
  filledPercent: number;
}

const SaverComponent: React.FC = () => {
  const [savers, setSavers] = useState<SaverInfo[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof SaverInfo; direction: 'asc' | 'desc' }>({ key: 'asset', direction: 'asc' });

  useEffect(() => {
    const fetchSavers = async () => {
      try {
        const data = await midgardAPI.fetchPools();
        const saversData = data.map(pool => ({
          ...pool,
          filledPercent: calculateFilledPercent(pool)
        }));
        setSavers(saversData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch saver data');
        setIsLoading(false);
      }
    };

    fetchSavers();
  }, []);

  const calculateFilledPercent = (pool: PoolDetail): number => {
    const saversDepth = parseFloat(pool.saversDepth);
    const assetDepth = parseFloat(pool.assetDepth);
    if (assetDepth === 0) return 0;
    return (saversDepth / assetDepth) * 100;
  };

  const handleSort = (key: keyof SaverInfo) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const filteredAndSortedSavers = savers
    .filter(saver => saver.asset.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

  const selectedSaver = savers.find(saver => saver.asset === selectedAsset);

  const handleAddToSaver = () => {
    console.log(`Adding ${amount} ${selectedAsset} to saver`);
    // Implement the logic to add to saver here
  };

  const handleRemoveFromSaver = () => {
    console.log(`Removing ${amount} ${selectedAsset} from saver`);
    // Implement the logic to remove from saver here
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">THORChain Savers</h1>
      
      <div className="flex space-x-6">
        {/* Left side - Saver Table */}
        <div className="w-2/3 bg-white rounded-lg shadow-md p-6">
          <div className="mb-4 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search assets"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {isLoading && <p className="text-center text-gray-600">Loading savers...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Asset', 'APR', 'TVL', 'Filled %', 'Growth'].map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort(header.toLowerCase().replace(' %', 'Percent') as keyof SaverInfo)}
                  >
                    {header}
                    <ArrowUpDown className="inline-block ml-1 h-4 w-4" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedSavers.map((saver) => (
                <tr
                  key={saver.asset}
                  className={`cursor-pointer hover:bg-gray-50 ${selectedAsset === saver.asset ? 'bg-indigo-100' : ''}`}
                  onClick={() => setSelectedAsset(saver.asset)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{saver.asset}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{parseFloat(saver.saversAPR).toFixed(2)}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${parseFloat(saver.assetDepth).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{saver.filledPercent.toFixed(2)}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{/* Add growth data if available */}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right side - Action Card */}
        <div className="w-1/3">
          {selectedAsset && selectedSaver ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Saver Actions for {selectedSaver.asset}</h2>
              <p className="mb-2 text-gray-600">Current APR: <span className="font-semibold text-indigo-600">{parseFloat(selectedSaver.saversAPR).toFixed(2)}%</span></p>
              <p className="mb-2 text-gray-600">TVL: <span className="font-semibold text-indigo-600">${parseFloat(selectedSaver.assetDepth).toLocaleString()}</span></p>
              <p className="mb-2 text-gray-600">Filled: <span className="font-semibold text-indigo-600">{selectedSaver.filledPercent.toFixed(2)}%</span></p>
              
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${selectedSaver.filledPercent}%` }}></div>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-700">Amount:</label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter amount"
                />
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={handleAddToSaver}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200"
                >
                  <Plus className="inline-block mr-2 h-5 w-5" />
                  Add to Saver
                </button>
                <button
                  onClick={handleRemoveFromSaver}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200"
                >
                  <Minus className="inline-block mr-2 h-5 w-5" />
                  Remove from Saver
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
              Select an asset to view saver actions
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SaverComponent;