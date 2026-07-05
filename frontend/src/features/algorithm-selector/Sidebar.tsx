"use client";

import { motion } from 'framer-motion';
import { useCryptoStore } from '../../stores/useCryptoStore';
import { ShieldAlert, Activity } from 'lucide-react';
import { cn } from '../crypto-engine/MainWorkspace'; // We'll export cn from MainWorkspace

export const Sidebar = () => {
  const { algorithmId, setAlgorithmId, metadata } = useCryptoStore();

  return (
    <div className="w-full bg-panel/30 backdrop-blur-xl border-b border-white/5 p-4 flex flex-col md:flex-row items-center gap-6 z-20 relative">
      <div className="flex items-center gap-3 pr-6 md:border-r border-white/10 shrink-0">
        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
          <Activity className="text-primary w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold font-heading text-white uppercase tracking-widest">Active Protocol</h3>
          <p className="text-xs text-muted-foreground font-mono">{metadata[algorithmId]?.name || "Select Algorithm"}</p>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-3 pb-2 md:pb-0">
        {Object.entries(metadata).map(([id, meta]) => (
          <motion.button
            key={id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAlgorithmId(id)}
            className={cn(
              "shrink-0 px-5 py-3 rounded-xl border transition-all duration-300 relative overflow-hidden group flex flex-col items-start gap-1",
              algorithmId === id 
                ? "bg-primary/20 border-primary/50 shadow-[0_0_20px_rgba(0,229,255,0.2)]" 
                : "bg-background/50 border-white/5 hover:border-white/20 hover:bg-white/5"
            )}
          >
            {algorithmId === id && (
              <motion.div layoutId="active-algo-glow" className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
            )}
            <div className="relative z-10 flex items-center gap-3">
              <span className={cn("font-bold font-heading text-sm", algorithmId === id ? "text-primary" : "text-white")}>{meta.name}</span>
              {algorithmId === id && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] uppercase font-mono bg-primary text-primary-foreground">
                  ACTIVE
                </span>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
