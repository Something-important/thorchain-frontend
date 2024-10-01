// src/components/Home.tsx
import React from 'react';
import { Activity, Users, Clock, Percent, DollarSign, BarChart2, Shield, RefreshCw } from 'lucide-react';

interface NetworkData {
  activeNodeCount: string;
  standbyNodeCount: string;
  blockRewards: {
    blockReward: string;
    bondReward: string;
    poolReward: string;
  };
  bondMetrics: {
    averageActiveBond: string;
    totalActiveBond: string;
    totalStandbyBond: string;
    bondHardCap: string;
    medianActiveBond: string;
  };
  bondingAPY: string;
  liquidityAPY: string;
  nextChurnHeight: string;
  poolShareFactor: string;
  totalPooledRune: string;
  totalReserve: string;
}

interface HomeProps {
  networkData: NetworkData | null;
  error: string | null;
  onRefresh: () => void;
}

const Home: React.FC<HomeProps> = ({ networkData, error, onRefresh }) => {
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-purple-900 text-white">
        <h1 className="text-2xl font-bold mb-4">Error Loading Data</h1>
        <p className="mb-4">{error}</p>
        <button 
          onClick={onRefresh}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          aria-label="Retry loading data"
        >
          <RefreshCw className="inline-block mr-2" /> Retry
        </button>
      </div>
    );
  }

  if (!networkData) {
    return (
      <div className="flex justify-center items-center h-screen bg-purple-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  const formatRune = (amount: string) => {
    return (parseInt(amount) / 1e8).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatPercentage = (value: string) => {
    return (parseFloat(value) * 100).toFixed(2) + '%';
  };

  const stats = [
    { label: "Total Reserve", value: `${formatRune(networkData.totalReserve)} RUNE`, icon: DollarSign },
    { label: "Total Pooled RUNE", value: `${formatRune(networkData.totalPooledRune)} RUNE`, icon: BarChart2 },
    { label: "Active Node Count", value: networkData.activeNodeCount, icon: Activity },
    { label: "Standby Node Count", value: networkData.standbyNodeCount, icon: Users },
    { label: "Bonding APY", value: formatPercentage(networkData.bondingAPY), icon: Percent },
    { label: "Liquidity APY", value: formatPercentage(networkData.liquidityAPY), icon: Percent },
    { label: "Next Churn Height", value: networkData.nextChurnHeight, icon: Clock },
    { label: "Pool Share Factor", value: formatPercentage(networkData.poolShareFactor), icon: Shield },
  ];

  return (
    <div className="space-y-8 p-4 sm:p-6 md:p-8 bg-gradient-to-b from-purple-900 to-black min-h-screen text-white">
      <header className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Welcome to THORChain</h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto">
          THORChain is a decentralized liquidity network, enabling secure and efficient cross-chain asset swaps.
        </p>
        <button 
          onClick={onRefresh} 
          className="mt-4 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1"
          aria-label="Refresh data"
        >
          <RefreshCw className="inline-block mr-2" /> Refresh Data
        </button>
      </header>

      <section className="bg-purple-800 bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-4 sm:p-6 md:p-8 shadow-xl" aria-labelledby="network-stats">
        <h2 id="network-stats" className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-center">Network Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((item, index) => (
            <div key={index} className="bg-purple-700 bg-opacity-50 rounded-lg p-4 sm:p-6 text-center transition-all duration-300 hover:bg-opacity-70 hover:shadow-lg">
              <item.icon className="mx-auto mb-3 sm:mb-4 h-6 w-6 sm:h-8 sm:w-8 text-purple-300" aria-hidden="true" />
              <p className="font-medium text-purple-200">{item.label}</p>
              <p className="text-xl sm:text-2xl mt-2 font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-purple-800 bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-4 sm:p-6 md:p-8 shadow-xl" aria-labelledby="block-rewards">
        <h2 id="block-rewards" className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-center">Block Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {[
            { label: "Block Reward", value: formatRune(networkData.blockRewards.blockReward) },
            { label: "Bond Reward", value: formatRune(networkData.blockRewards.bondReward) },
            { label: "Pool Reward", value: formatRune(networkData.blockRewards.poolReward) },
          ].map((reward, index) => (
            <div key={index} className="bg-purple-700 bg-opacity-50 rounded-lg p-4 sm:p-6 text-center transition-all duration-300 hover:bg-opacity-70 hover:shadow-lg">
              <DollarSign className="mx-auto mb-3 sm:mb-4 h-6 w-6 sm:h-8 sm:w-8 text-purple-300" aria-hidden="true" />
              <p className="font-medium text-purple-200">{reward.label}</p>
              <p className="text-xl sm:text-2xl mt-2 font-bold">{reward.value} RUNE</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-purple-800 bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-4 sm:p-6 md:p-8 shadow-xl" aria-labelledby="bond-metrics">
        <h2 id="bond-metrics" className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-center">Bond Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            { label: "Total Active Bond", value: formatRune(networkData.bondMetrics.totalActiveBond) },
            { label: "Average Active Bond", value: formatRune(networkData.bondMetrics.averageActiveBond) },
            { label: "Median Active Bond", value: formatRune(networkData.bondMetrics.medianActiveBond) },
            { label: "Total Standby Bond", value: formatRune(networkData.bondMetrics.totalStandbyBond) },
            { label: "Bond Hard Cap", value: formatRune(networkData.bondMetrics.bondHardCap) },
          ].map((metric, index) => (
            <div key={index} className="bg-purple-700 bg-opacity-50 rounded-lg p-4 sm:p-6 text-center transition-all duration-300 hover:bg-opacity-70 hover:shadow-lg">
              <Shield className="mx-auto mb-3 sm:mb-4 h-6 w-6 sm:h-8 sm:w-8 text-purple-300" aria-hidden="true" />
              <p className="font-medium text-purple-200">{metric.label}</p>
              <p className="text-xl sm:text-2xl mt-2 font-bold">{metric.value} RUNE</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;