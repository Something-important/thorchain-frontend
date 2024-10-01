import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Database, Clock, ArrowUpCircle, Coins, Users, Server, Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num);
};

interface NetworkDashboardProps {
  health: any;
  churns: any[];
  nodes: any[];
  network: any;
}

const NetworkDashboard: React.FC<NetworkDashboardProps> = ({ health, churns, nodes, network }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedNode, setExpandedNode] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [nodeFilter, setNodeFilter] = useState('all');
  const [sortColumn, setSortColumn] = useState('nodeAddress');
  const [sortDirection, setSortDirection] = useState('asc');
  const [hoveredNode, setHoveredNode] = useState<{ nodeAddress: string; ed25519: string; secp256k1: string } | null>(null);
  const nodesPerPage = 10;

  if (!health || !network || churns.length === 0 || nodes.length === 0) {
    return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
  }

  const churnData = churns.slice(0, 10).map(churn => ({
    height: parseInt(churn.height),
    date: new Date(parseInt(churn.date) / 1000000).toLocaleDateString()
  }));

  const activeNodeAddresses = nodes.slice(0, parseInt(network.activeNodeCount)).map(node => node.nodeAddress);

  const nodeStatusData = [
    { name: 'Active', value: parseInt(network.activeNodeCount) },
    { name: 'Standby', value: nodes.length - parseInt(network.activeNodeCount) }
  ];
  const COLORS = ['#4CAF50', '#FFC107'];

  const filteredNodes = nodes
    .filter(node => node.nodeAddress.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(node => {
      if (nodeFilter === 'active') return activeNodeAddresses.includes(node.nodeAddress);
      if (nodeFilter === 'standby') return !activeNodeAddresses.includes(node.nodeAddress);
      return true;
    })
    .sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  const pageCount = Math.ceil(filteredNodes.length / nodesPerPage);
  const paginatedNodes = filteredNodes.slice(
    (currentPage - 1) * nodesPerPage,
    currentPage * nodesPerPage
  );

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">THORChain Network Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800 p-4 rounded shadow">
          <div className="flex items-center mb-2">
            <Database className="mr-2 text-blue-400" />
            <h2 className="text-xl font-semibold">Health Status</h2>
          </div>
          <p>Database: <span className={health.database ? "text-green-400" : "text-red-400"}>{health.database ? 'Online' : 'Offline'}</span></p>
          <p>In Sync: <span className={health.inSync ? "text-green-400" : "text-red-400"}>{health.inSync ? 'Yes' : 'No'}</span></p>
          <p>Scanner Height: {health.scannerHeight}</p>
          <p>Genesis: {health.genesisInfo?.height}</p>
        </div>

        <div className="bg-gray-800 p-4 rounded shadow">
          <div className="flex items-center mb-2">
            <Clock className="mr-2 text-green-400" />
            <h2 className="text-xl font-semibold">Last Committed Block</h2>
          </div>
          <p>Height: {health.lastCommitted.height}</p>
          <p>Timestamp: {new Date(health.lastCommitted.timestamp * 1000).toLocaleString()}</p>
        </div>

        <div className="bg-gray-800 p-4 rounded shadow">
          <div className="flex items-center mb-2">
            <Activity className="mr-2 text-purple-400" />
            <h2 className="text-xl font-semibold">Network Stats</h2>
          </div>
          <p>Active Nodes: {network.activeNodeCount}</p>
          <p>Standby Nodes: {nodes.length - parseInt(network.activeNodeCount)}</p>
          <p>Next Churn Height: {network.nextChurnHeight}</p>
          <p>Pool Activation Countdown: {network.poolActivationCountdown}</p>
        </div>

        <div className="bg-gray-800 p-4 rounded shadow">
          <div className="flex items-center mb-2">
            <ArrowUpCircle className="mr-2 text-red-400" />
            <h2 className="text-xl font-semibold">APY</h2>
          </div>
          <p>Bonding APY: <span className="text-green-400">{(parseFloat(network.bondingAPY) * 100).toFixed(2)}%</span></p>
          <p>Liquidity APY: <span className="text-blue-400">{(parseFloat(network.liquidityAPY) * 100).toFixed(2)}%</span></p>
        </div>

        <div className="bg-gray-800 p-4 rounded shadow">
          <div className="flex items-center mb-2">
            <Coins className="mr-2 text-yellow-400" />
            <h2 className="text-xl font-semibold">RUNE Stats</h2>
          </div>
          <p>Total Pooled RUNE: <span className="text-green-400">{formatNumber(parseInt(network.totalPooledRune))}</span></p>
          <p>Total Reserve: <span className="text-blue-400">{formatNumber(parseInt(network.totalReserve))}</span></p>
          <p>Pool Share Factor: <span className="text-purple-400">{parseFloat(network.poolShareFactor).toFixed(4)}</span></p>
        </div>

        <div className="bg-gray-800 p-4 rounded shadow">
          <div className="flex items-center mb-2">
            <Users className="mr-2 text-indigo-400" />
            <h2 className="text-xl font-semibold">Bond Metrics</h2>
          </div>
          <p>Avg Active Bond: <span className="text-green-400">{formatNumber(parseInt(network.bondMetrics.averageActiveBond))}</span></p>
          <p>Total Active Bond: <span className="text-blue-400">{formatNumber(parseInt(network.bondMetrics.totalActiveBond))}</span></p>
          <p>Min Active Bond: <span className="text-yellow-400">{formatNumber(parseInt(network.bondMetrics.minimumActiveBond))}</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-800 p-4 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">Recent Churns</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={churnData}>
              <XAxis dataKey="date" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
              <Bar dataKey="height" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 p-4 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">Node Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={nodeStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {nodeStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded shadow mb-8">
        <h2 className="text-2xl font-semibold mb-4">Block Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold">Block Reward</h3>
            <p className="text-green-400">{formatNumber(parseInt(network.blockRewards.blockReward))}</p>
          </div>
          <div>
            <h3 className="font-semibold">Bond Reward</h3>
            <p className="text-blue-400">{formatNumber(parseInt(network.blockRewards.bondReward))}</p>
          </div>
          <div>
            <h3 className="font-semibold">Pool Reward</h3>
            <p className="text-purple-400">{formatNumber(parseInt(network.blockRewards.poolReward))}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded shadow">
        <div className="flex items-center mb-4">
          <Server className="mr-2 text-green-400" />
          <h2 className="text-2xl font-semibold">Node Information</h2>
        </div>
        <div className="flex items-center mb-4 space-x-4">
          <div className="flex-1">
            <Search className="absolute ml-2 mt-2 text-gray-400" />
            <input
              type="text"
              placeholder="Search nodes..."
              className="bg-gray-700 text-white px-3 py-2 pl-8 rounded w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="bg-gray-700 text-white px-3 py-2 rounded"
            value={nodeFilter}
            onChange={(e) => setNodeFilter(e.target.value)}
          >
            <option value="all">All Nodes</option>
            <option value="active">Active Nodes</option>
            <option value="standby">Standby Nodes</option>
          </select>
        </div>
        <p>Total Nodes: {nodes.length}</p>
        <p>Active Nodes: {activeNodeAddresses.length}</p>
        <p>Standby Nodes: {nodes.length - activeNodeAddresses.length}</p>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('nodeAddress')}>
                  Node Address {sortColumn === 'nodeAddress' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedNodes.map((node, index) => (
                <React.Fragment key={index}>
                  <tr 
                    className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <td className="border border-gray-700 px-4 py-2">{node.nodeAddress}</td>
                    <td className="border border-gray-700 px-4 py-2">
                      <span className={activeNodeAddresses.includes(node.nodeAddress) ? "text-green-400" : "text-yellow-400"}>
                        {activeNodeAddresses.includes(node.nodeAddress) ? 'Active' : 'Standby'}
                      </span>
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      <button
                        className="text-blue-400 hover:text-blue-300"
                        onClick={() => setExpandedNode(expandedNode === index ? null : index)}
                      >
                        {expandedNode === index ? <ChevronUp /> : <ChevronDown />}
                      </button>
                    </td>
                  </tr>
                  {expandedNode === index && (
                    <tr className="bg-gray-700">
                      <td colSpan={3} className="border border-gray-600 px-4 py-2">
                        <p>Public Keys:</p>
                        <p>ed25519: {node.ed25519}</p>
                        <p>secp256k1: {node.secp256k1}</p>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-400">
            Showing {(currentPage - 1) * nodesPerPage + 1} to {Math.min(currentPage * nodesPerPage, filteredNodes.length)} of {filteredNodes.length} nodes
          </p>
          <div className="flex space-x-2">
            <button
              className="bg-gray-700 px-3 py-1 rounded disabled:opacity-50"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="bg-gray-700 px-3 py-1 rounded disabled:opacity-50"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
              disabled={currentPage === pageCount}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {hoveredNode && (
  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-4 rounded shadow-lg z-50">
    <h3 className="text-lg font-semibold mb-2">{hoveredNode.nodeAddress}</h3>
    <p>Status: {activeNodeAddresses.includes(hoveredNode.nodeAddress) ? 'Active' : 'Standby'}</p>
    <p>ed25519: {hoveredNode.ed25519}</p>
    <p>secp256k1: {hoveredNode.secp256k1}</p>
  </div>
)}
    </div>
  );
};

export default NetworkDashboard;