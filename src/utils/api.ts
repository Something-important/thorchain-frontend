// midgardAPI.ts

import {
  HealthStatus,
  ChurnInfo,
  KnownPoolsInfo,
  PoolDetail,
  PoolStats,
  DepthHistory,
  SaversHistory,
  RUNEPoolHistory,
  EarningsHistory,
  SwapHistory,
  TVLHistory,
  LiquidityHistory,
  MidgardNode,
  MidgardNetwork,
  Action,
  MemberPool,
  SaverPool,
  THORNameDetails,
  StatsData,
  Balance,
  LastBlock
} from '../types';

const API_BASE_URL = 'https://midgard.ninerealms.com/v2';

async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, { 
    next: { revalidate: 60 } 
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function fetchHealth(): Promise<HealthStatus> {
  return fetchFromAPI<HealthStatus>('/health');
}

export async function fetchChurns(): Promise<ChurnInfo[]> {
  return fetchFromAPI<ChurnInfo[]>('/churns');
}

export async function fetchKnownPools(): Promise<KnownPoolsInfo> {
  return fetchFromAPI<KnownPoolsInfo>('/knownpools');
}

export async function fetchPools(): Promise<PoolDetail[]> {
  return fetchFromAPI<PoolDetail[]>('/pools');
}

export async function fetchPool(asset: string): Promise<PoolDetail> {
  return fetchFromAPI<PoolDetail>(`/pool/${asset}`);
}

export async function fetchPoolStats(asset: string): Promise<PoolStats> {
  return fetchFromAPI<PoolStats>(`/pool/${asset}/stats`);
}

export async function fetchDepthHistory(pool: string): Promise<DepthHistory> {
  return fetchFromAPI<DepthHistory>(`/history/depths/${pool}`);
}

export async function fetchSaversHistory(pool: string): Promise<SaversHistory> {
  return fetchFromAPI<SaversHistory>(`/history/savers/${pool}`);
}

export async function fetchRUNEPoolHistory(): Promise<RUNEPoolHistory> {
  return fetchFromAPI<RUNEPoolHistory>('/history/runepool');
}

export async function fetchEarningsHistory(): Promise<EarningsHistory> {
  return fetchFromAPI<EarningsHistory>('/history/earnings');
}

export async function fetchSwapsHistory(): Promise<SwapHistory> {
  return fetchFromAPI<SwapHistory>('/history/swaps');
}

export async function fetchTVLHistory(): Promise<TVLHistory> {
  return fetchFromAPI<TVLHistory>('/history/tvl');
}

export async function fetchLiquidityChangesHistory(): Promise<LiquidityHistory> {
  return fetchFromAPI<LiquidityHistory>('/history/liquidity_changes');
}

export async function fetchNodes(): Promise<MidgardNode[]> {
  return fetchFromAPI<MidgardNode[]>('/nodes');
}

export async function fetchNetwork(): Promise<MidgardNetwork> {
  return fetchFromAPI<MidgardNetwork>('/network');
}

export async function fetchActions(): Promise<{ actions: Action[] }> {
  return fetchFromAPI<{ actions: Action[] }>('/actions');
}

export async function fetchMembers(): Promise<string[]> {
  return fetchFromAPI<string[]>('/members');
}

export async function fetchMemberDetails(address: string): Promise<{ pools: MemberPool[] }> {
  return fetchFromAPI<{ pools: MemberPool[] }>(`/member/${address}`);
}

export async function fetchSaverDetails(address: string): Promise<{ pools: SaverPool[] }> {
  return fetchFromAPI<{ pools: SaverPool[] }>(`/saver/${address}`);
}

export async function fetchTHORNameDetails(name: string): Promise<THORNameDetails> {
  return fetchFromAPI<THORNameDetails>(`/thorname/lookup/${name}`);
}

export async function fetchStats(): Promise<StatsData> {
  return fetchFromAPI<StatsData>('/stats');
}

export async function fetchBalance(address: string): Promise<Balance> {
  return fetchFromAPI<Balance>(`/balance/${address}`);
}
export async function fetchLastBlock(): Promise<LastBlock[]> {
  return fetchFromAPI<LastBlock[]>('/lastblock');
}

export const midgardAPI = {
  fetchHealth,
  fetchChurns,
  fetchKnownPools,
  fetchPools,
  fetchPool,
  fetchPoolStats,
  fetchDepthHistory,
  fetchSaversHistory,
  fetchRUNEPoolHistory,
  fetchEarningsHistory,
  fetchSwapsHistory,
  fetchTVLHistory,
  fetchLiquidityChangesHistory,
  fetchNodes,
  fetchNetwork,
  fetchActions,
  fetchMembers,
  fetchMemberDetails,
  fetchSaverDetails,
  fetchTHORNameDetails,
  fetchStats,
  fetchBalance,
  fetchLastBlock
};

export default midgardAPI;