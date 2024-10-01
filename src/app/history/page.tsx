import React from 'react';
import HistoricalDataDashboardClient from './HistoricalDataDashboardClient';

export default function HistoricalDataPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">THORChain Historical Data</h1>
      <HistoricalDataDashboardClient />
    </div>
  );
}