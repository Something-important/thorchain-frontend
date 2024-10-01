import midgardAPI from "./src/utils/api";
import fs from 'fs';

async function testMidgardAPI() {
  const output = [];
  const failedFunctions = [];

  const functions = [
    { name: "Health", fn: midgardAPI.fetchHealth },
    { name: "Churns", fn: midgardAPI.fetchChurns },
    { name: "Known Pools", fn: midgardAPI.fetchKnownPools },
    { name: "Pools", fn: midgardAPI.fetchPools },
    { name: "Specific Pool (BTC.BTC)", fn: () => midgardAPI.fetchPool('BTC.BTC') },
    { name: "Pool Stats (BTC.BTC)", fn: () => midgardAPI.fetchPoolStats('BTC.BTC') },
    { name: "Depth History (BTC.BTC)", fn: () => midgardAPI.fetchDepthHistory('BTC.BTC') },
    { name: "Savers History (BTC.BTC)", fn: () => midgardAPI.fetchSaversHistory('BTC.BTC') },
    { name: "RUNE Pool History", fn: midgardAPI.fetchRUNEPoolHistory },
    { name: "Earnings History", fn: midgardAPI.fetchEarningsHistory },
    { name: "Swaps History", fn: midgardAPI.fetchSwapsHistory },
    { name: "TVL History", fn: midgardAPI.fetchTVLHistory },
    { name: "Liquidity Changes History", fn: midgardAPI.fetchLiquidityChangesHistory },
    { name: "Nodes", fn: midgardAPI.fetchNodes },
    { name: "Network", fn: midgardAPI.fetchNetwork },
    { name: "Members", fn: midgardAPI.fetchMembers },
    { name: "Stats", fn: midgardAPI.fetchStats },
    { name: "Balance", fn: () => midgardAPI.fetchBalance('thor1txxlq3fkv5xnwkgc6kvl7t0g2cg4m6d76y6u9m') },
  ];

  for (const { name, fn } of functions) {
    try {
      console.log(`Testing: ${name}`);
      const result = await fn();
      output.push(`\n${name}:`);
      output.push(JSON.stringify(result, null, 2));
      console.log(`${name}: Success`);
    } catch (error) {
      console.error(`${name}: Failed - ${error.message}`);
      failedFunctions.push(name);
    }
  }

  output.push("\n\nFailed functions:");
  output.push(failedFunctions.join(", "));

  const finalOutput = output.join('\n');
  
  fs.writeFile('midgard_api_test_results.txt', finalOutput, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("\nTest results saved to midgard_api_test_results.txt");
    }
    console.log("Failed functions:", failedFunctions.join(", "));
  });
}

testMidgardAPI();