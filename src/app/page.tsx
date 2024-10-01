// src/app/page.tsx
import React from 'react';
import Home from '../components/Home';
import { fetchNetwork } from '../utils/api';
import { NetworkData } from '../types';

// 5 minutes in seconds
const CACHE_MAX_AGE = 300;

export const revalidate = CACHE_MAX_AGE;

export default async function HomePage() {
  let networkData: NetworkData | null = null;
  let error: string | null = null;
  
  try {
    networkData = await fetchNetwork();
  } catch (err) {
    console.error("Failed to fetch network data:", err);
    error = "Failed to load network data. Please try again later.";
  }
  
  const refreshData = async () => {
    'use server';
    // This function will be called when the refresh button is clicked
    // It will trigger a re-render of the page with fresh data
  };

  return <Home networkData={networkData} error={error} onRefresh={refreshData} />;
}