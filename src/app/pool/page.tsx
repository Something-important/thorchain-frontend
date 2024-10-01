// app/pools/page.tsx
import React from 'react';
import PoolComponent from './PoolComponent';
import { fetchPools } from '../../utils/api';
import { PoolDetail } from '../../types';

export default async function PoolPage() {
  try {
    const pools: PoolDetail[] = await fetchPools();
    
    return <PoolComponent pools={pools} />;
  } catch (error) {
    console.error("Failed to fetch pools data:", error);
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Error Loading Pools</h2>
        <p>We're having trouble fetching the latest pool information. Please try again later.</p>
      </div>
    );
  }
}