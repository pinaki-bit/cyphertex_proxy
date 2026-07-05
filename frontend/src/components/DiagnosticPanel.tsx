"use client";

import { useEffect, useState } from 'react';
import { useCryptoStore } from '../stores/useCryptoStore';
import { Terminal, CheckCircle, XCircle } from 'lucide-react';

export const DiagnosticPanel = () => {
  const { metadata } = useCryptoStore();
  const [backendStatus, setBackendStatus] = useState<'Checking' | 'Online' | 'Offline'>('Checking');
  const [apiReachability, setApiReachability] = useState<'Checking' | 'Reachable' | 'Unreachable'>('Checking');

  useEffect(() => {
    // Check backend health through the Next.js proxy
    fetch('/api/health')
      .then(async (res) => {
        if (res.ok) {
          setBackendStatus('Online');
          setApiReachability('Reachable');
        } else {
          setBackendStatus('Offline');
          setApiReachability('Unreachable');
        }
      })
      .catch(() => {
        setBackendStatus('Offline');
        setApiReachability('Unreachable');
      });
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 border border-white/20 p-4 rounded-xl z-50 text-xs font-mono shadow-[0_0_15px_rgba(0,0,0,0.5)] w-80">
      <h4 className="text-primary font-bold mb-3 flex items-center gap-2 border-b border-white/10 pb-2">
        <Terminal className="w-4 h-4" /> System Diagnostics
      </h4>
      <div className="space-y-2 text-muted-foreground">
        <div className="flex justify-between">
          <span>Backend Status:</span>
          <span className={backendStatus === 'Online' ? 'text-green-400 flex items-center gap-1' : 'text-red-400 flex items-center gap-1'}>
            {backendStatus === 'Online' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />} {backendStatus}
          </span>
        </div>
        <div className="flex justify-between">
          <span>API Reachability:</span>
          <span className={apiReachability === 'Reachable' ? 'text-green-400 flex items-center gap-1' : 'text-red-400 flex items-center gap-1'}>
            {apiReachability === 'Reachable' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />} {apiReachability}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Loaded Algorithms:</span>
          <span className="text-white">{Object.keys(metadata).length}</span>
        </div>
        <div className="flex justify-between">
          <span>Environment:</span>
          <span className="text-primary">{process.env.NODE_ENV}</span>
        </div>
      </div>
    </div>
  );
};
