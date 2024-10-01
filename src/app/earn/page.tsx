// app/savers/page.tsx
import React from 'react';
import SaverComponent from './SaverComponent';

export default function SaversPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">THORChain Savers</h1>
      <SaverComponent />
    </div>
  );
}