"use client";

import { useEffect } from 'react';
import { useCryptoStore } from '../stores/useCryptoStore';
import { Sidebar } from '../features/algorithm-selector/Sidebar';
import { MainWorkspace } from '../features/crypto-engine/MainWorkspace';
import { AnalyticsPanel } from '../features/security-insights/AnalyticsPanel';

export const EncryptionEngine = () => {
  const { setMetadata } = useCryptoStore();

  useEffect(() => {
    fetch('/api/algorithms')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMetadata(data.algorithms);
        }
      })
      .catch(console.error);
  }, [setMetadata]);

  return (
    <div className="w-full flex flex-col h-full bg-background relative z-10">
      
      {/* Top Algorithm Selector */}
      <Sidebar />

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        <MainWorkspace />
        
        {/* Hidden Analytics Panel for later, or keep it as an overlay */}
        <div className="hidden">
          <AnalyticsPanel />
        </div>
      </div>
      
    </div>
  );
};
