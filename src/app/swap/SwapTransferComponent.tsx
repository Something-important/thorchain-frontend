'use client';
import React, { useState } from 'react';
import SwapComponent from '../../components/SwapAndTransfer/SwapComponent';
import TransferComponent from '../../components/SwapAndTransfer/TransferComponent';

const SwapTransferComponent = () => {
    const [activeTab, setActiveTab] = useState('swap');
  
    return (
      <div className="w-full max-w-2xl mx-auto bg-purple-800 bg-opacity-20 backdrop-blur-lg rounded-lg p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Cross-Chain Swap & Transfer</h2>
        <div className="mb-6">
          <div className="flex space-x-4 mb-4">
            <button
              className={`flex-1 py-2 px-4 rounded-lg text-center ${
                activeTab === 'swap'
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-400 text-purple-900'
              }`}
              onClick={() => setActiveTab('swap')}
            >
              Swap
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-lg text-center ${
                activeTab === 'transfer'
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-400 text-purple-900'
              }`}
              onClick={() => setActiveTab('transfer')}
            >
              Transfer
            </button>
          </div>
        </div>
        {activeTab === 'swap' ? <SwapComponent /> : <TransferComponent />}
      </div>
    );
  };
  
  export default SwapTransferComponent;