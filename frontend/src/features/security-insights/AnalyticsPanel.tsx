"use client";

import { useCryptoStore } from '../../stores/useCryptoStore';
import { Info, ShieldAlert, Zap, History } from 'lucide-react';

export const AnalyticsPanel = () => {
  const { algorithmId, metadata, analysis } = useCryptoStore();
  const currentMeta = metadata[algorithmId];

  if (!currentMeta) return null;

  return (
    <div className="w-full h-full p-6 space-y-6 overflow-y-auto bg-black/60 border-l border-white/10">
      
      {/* SECURITY INSIGHTS */}
      <div className="bg-black/40 border border-white/10 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
        <h4 className="font-bold font-heading text-white flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-primary" /> Intelligence Brief
        </h4>
        
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          {currentMeta.description}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="block text-[10px] uppercase text-muted-foreground mb-1">Year Invented</span>
            <span className="font-mono text-white">{currentMeta.yearInvented || 'Unknown'}</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase text-muted-foreground mb-1">Category</span>
            <span className="text-white text-xs">{currentMeta.category}</span>
          </div>
        </div>
      </div>

      {/* REAL TIME ANALYSIS */}
      {analysis ? (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 relative overflow-hidden">
          <h4 className="font-bold font-heading text-primary flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5" /> Live Security Analysis
          </h4>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-xs text-muted-foreground uppercase">Security Level</span>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${analysis.securityLevel === 'VERY HIGH' || analysis.securityLevel === 'HIGH' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {analysis.securityLevel}
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-xs text-muted-foreground uppercase">Attack Resistance</span>
              <span className="text-xs font-mono text-white">{analysis.attackResistance}</span>
            </div>

            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-xs text-muted-foreground uppercase">Est. Key Space</span>
              <span className="text-xs font-mono text-white">{analysis.estimatedKeySpace}</span>
            </div>

            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-xs text-muted-foreground uppercase">Modern Relevance</span>
              <span className="text-xs text-primary">{analysis.modernRelevance}</span>
            </div>

            <div>
              <span className="block text-xs text-muted-foreground uppercase mb-1">Recommended Use Case</span>
              <span className="text-sm text-white leading-tight block">{analysis.recommendedUseCase}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-black/40 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center opacity-50 min-h-[250px]">
          <History className="w-8 h-8 text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">Awaiting input stream to generate real-time security analysis.</p>
        </div>
      )}

    </div>
  );
};
