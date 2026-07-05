"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export const AlgorithmVisualizer = () => {
  const [char, setChar] = useState('A');
  const [shift, setShift] = useState(3);
  
  const [step, setStep] = useState(0);

  const steps = [
    { label: 'Input Character', value: char },
    { label: 'ASCII Conversion', value: char.charCodeAt(0).toString() },
    { label: 'Subtract Base (65)', value: (char.charCodeAt(0) - 65).toString() },
    { label: `Add Shift (+${shift})`, value: ((char.charCodeAt(0) - 65) + shift).toString() },
    { label: 'Modulo 26', value: (((char.charCodeAt(0) - 65) + shift) % 26).toString() },
    { label: 'Add Base (65)', value: ((((char.charCodeAt(0) - 65) + shift) % 26) + 65).toString() },
    { label: 'Result', value: String.fromCharCode(((((char.charCodeAt(0) - 65) + shift) % 26) + 65)) },
  ];

  // Auto advance steps
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 1500);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="w-full max-w-4xl mx-auto p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(0,240,255,0.1)]">
      <h3 className="text-2xl font-bold text-center text-white mb-8">Algorithm Visualizer</h3>
      
      <div className="flex justify-center gap-4 mb-12">
        <div className="flex flex-col items-center">
          <label className="text-xs text-muted-foreground uppercase mb-1">Input (A-Z)</label>
          <input 
            type="text" 
            maxLength={1} 
            value={char} 
            onChange={(e) => setChar(e.target.value.toUpperCase() || 'A')}
            className="w-16 h-16 text-center text-2xl font-bold bg-black/50 border border-primary text-white rounded-lg focus:outline-none"
          />
        </div>
        <div className="flex flex-col items-center">
          <label className="text-xs text-muted-foreground uppercase mb-1">Shift</label>
          <input 
            type="number" 
            value={shift} 
            onChange={(e) => setShift(Number(e.target.value))}
            className="w-24 h-16 text-center text-2xl font-bold bg-black/50 border border-primary text-white rounded-lg focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -z-10 -translate-y-1/2" />
        
        {steps.map((s, idx) => {
          const isActive = idx === step;
          const isPast = idx < step;
          
          return (
            <motion.div 
              key={idx}
              animate={{ 
                scale: isActive ? 1.1 : 1,
                opacity: isPast || isActive ? 1 : 0.4,
                y: isActive ? -10 : 0
              }}
              className={`flex flex-col items-center p-4 rounded-lg bg-black/80 border transition-colors ${
                isActive ? 'border-primary shadow-[0_0_15px_rgba(0,240,255,0.4)]' : 'border-white/10'
              }`}
            >
              <span className="text-[10px] text-muted-foreground uppercase text-center w-20 leading-tight mb-2">
                {s.label}
              </span>
              <span className={`text-xl font-mono font-bold ${isActive ? 'text-primary' : 'text-white'}`}>
                {s.value}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
