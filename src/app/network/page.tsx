'use client';
import React, { useState, useEffect } from 'react';
import NetworkDashboard from './NetworkComponent';

function App() {
  const [health, setHealth] = useState(null);
  const [churns, setChurns] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [network, setNetwork] = useState(null);

  useEffect(() => {
    // Fetch health data
    fetch('https://midgard.ninerealms.com/v2/health')
      .then(response => response.json())
      .then(data => setHealth(data));

    // Fetch churns data
    fetch('https://midgard.ninerealms.com/v2/churns')
      .then(response => response.json())
      .then(data => setChurns(data));

    // Fetch nodes data
    fetch('https://midgard.ninerealms.com/v2/nodes')
      .then(response => response.json())
      .then(data => setNodes(data));

    // Fetch network data
    fetch('https://midgard.ninerealms.com/v2/network')
      .then(response => response.json())
      .then(data => setNetwork(data));
  }, []);

  if (!health || !network || churns.length === 0 || nodes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <NetworkDashboard health={health} churns={churns} nodes={nodes} network={network} />
    </div>
  );
}

export default App;