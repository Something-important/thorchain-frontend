'use client';
import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calendar, TrendingUp, DollarSign, Repeat, Droplet, PieChart, ArrowUpDown } from 'lucide-react';
import axios from 'axios';

type EarningsHistoryItem = {
  startTime: string;
  endTime: string;
  totalValueLocked: string;
  totalValuePooled: string;
  totalValueBonded: string;
  runePriceUSD: string;
  liquidityFees: string;
  blockRewards: string;
  earnings: string;
  bondingEarnings: string;
  liquidityEarnings: string;
  avgNodeCount: string;
  pools: EarningsHistoryItemPool[];
  totalVolume: string;
  addLiquidityVolume: string;
  withdrawVolume: string;
};

type EarningsHistoryItemPool = {
  pool: string;
  assetLiquidityFees: string;
  runeLiquidityFees: string;
  totalLiquidityFeesRune: string;
  saverEarning: string;
  rewards: string;
  earnings: string;
};

const HistoricalDataDashboardClient = () => {
  const [activeTab, setActiveTab] = useState('tvl');
  const [chartData, setChartData] = useState([]);
  const [interval, setInterval] = useState('day');
  const [count, setCount] = useState(30);

  const fetchData = async () => {
    try {
      let endpoint = '';
      
      switch (activeTab) {
        case 'tvl':
          endpoint = `https://midgard.ninerealms.com/v2/history/tvl?interval=${interval}&count=${count}`;
          break;
        case 'swaps':
          endpoint = `https://midgard.ninerealms.com/v2/history/swaps?interval=${interval}&count=${count}`;
          break;
        case 'liquidity':
          endpoint = `https://midgard.ninerealms.com/v2/history/liquidity_changes?interval=${interval}&count=${count}`;
          break;
        case 'earnings':
          endpoint = `https://midgard.ninerealms.com/v2/history/earnings?interval=${interval}&count=${count}`;
          break;
        default:
          return;
      }

      const response = await axios.get(endpoint);
      
      const formattedData = response.data.intervals.map((dataInterval: EarningsHistoryItem) => ({
        time: new Date(dataInterval.startTime).toLocaleDateString(),
        ...dataInterval,
        totalValueLocked: parseFloat(dataInterval.totalValueLocked) / 1e8,
        totalValuePooled: parseFloat(dataInterval.totalValuePooled) / 1e8,
        totalValueBonded: parseFloat(dataInterval.totalValueBonded) / 1e8,
        runePriceUSD: parseFloat(dataInterval.runePriceUSD),
        swapVolume: parseFloat(dataInterval.totalVolume) / 1e8,
        addLiquidityVolume: parseFloat(dataInterval.addLiquidityVolume) / 1e8,
        withdrawVolume: parseFloat(dataInterval.withdrawVolume) / 1e8,
        earnings: parseFloat(dataInterval.earnings) / 1e8,
        bondingEarnings: parseFloat(dataInterval.bondingEarnings) / 1e8,
        liquidityEarnings: parseFloat(dataInterval.liquidityEarnings) / 1e8,
      }));

      setChartData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab, interval, count]);

  const renderChart = () => {
    const commonProps = {
      width: "100%",
      height: 400,
      data: chartData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    };

    switch (activeTab) {
      case 'tvl':
        return (
          <ResponsiveContainer {...commonProps}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Area yAxisId="left" type="monotone" dataKey="totalValueLocked" name="Total Value Locked" stroke="#8884d8" fill="#8884d8" />
              <Area yAxisId="left" type="monotone" dataKey="totalValuePooled" name="Total Value Pooled" stroke="#82ca9d" fill="#82ca9d" />
              <Area yAxisId="left" type="monotone" dataKey="totalValueBonded" name="Total Value Bonded" stroke="#ffc658" fill="#ffc658" />
              <Line yAxisId="right" type="monotone" dataKey="runePriceUSD" name="RUNE Price (USD)" stroke="#ff7300" />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'swaps':
        return (
          <ResponsiveContainer {...commonProps}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="swapVolume" name="Swap Volume" stroke="#8884d8" />
              <Line yAxisId="right" type="monotone" dataKey="runePriceUSD" name="RUNE Price (USD)" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'liquidity':
        return (
          <ResponsiveContainer {...commonProps}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Area yAxisId="left" type="monotone" dataKey="addLiquidityVolume" name="Add Liquidity" stroke="#82ca9d" fill="#82ca9d" />
              <Area yAxisId="left" type="monotone" dataKey="withdrawVolume" name="Withdraw" stroke="#ffc658" fill="#ffc658" />
              <Line yAxisId="right" type="monotone" dataKey="runePriceUSD" name="RUNE Price (USD)" stroke="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'earnings':
        return (
          <ResponsiveContainer {...commonProps}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Area yAxisId="left" type="monotone" dataKey="earnings" name="Total Earnings" stroke="#8884d8" fill="#8884d8" stackId="1" />
              <Area yAxisId="left" type="monotone" dataKey="bondingEarnings" name="Bonding Earnings" stroke="#82ca9d" fill="#82ca9d" stackId="1" />
              <Area yAxisId="left" type="monotone" dataKey="liquidityEarnings" name="Liquidity Earnings" stroke="#ffc658" fill="#ffc658" stackId="1" />
              <Line yAxisId="right" type="monotone" dataKey="runePriceUSD" name="RUNE Price (USD)" stroke="#ff7300" />
            </AreaChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  const tabs = [
    { id: 'tvl', label: 'TVL', icon: PieChart },
    { id: 'swaps', label: 'Swaps', icon: Repeat },
    { id: 'liquidity', label: 'Liquidity', icon: ArrowUpDown },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
              activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <tab.icon className="w-5 h-5 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mb-6 space-x-2 flex flex-wrap items-center">
        <select
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          className="p-2 border rounded bg-gray-700 text-white"
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
          className="p-2 border rounded bg-gray-700 text-white"
          min="1"
          max="100"
        />
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
        >
          Refresh
        </button>
      </div>
      <div className="bg-gray-700 rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-white">{tabs.find(tab => tab.id === activeTab)?.label} History</h2>
        {renderChart()}
      </div>
    </div>
  );
};

export default HistoricalDataDashboardClient;