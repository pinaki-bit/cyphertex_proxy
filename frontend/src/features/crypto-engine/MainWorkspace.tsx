"use client";

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCryptoStore } from '../../stores/useCryptoStore';
import { Lock, Unlock, Key, Fingerprint, Clock, Download, Copy, ShieldCheck, ArrowRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const MainWorkspace = () => {
  const { 
    algorithmId, mode, setMode, inputText, setInputText, 
    outputText, setOutputText, keys, setKey, rsaMetadata, setRsaMetadata,
    loading, setLoading, setError, error, setAnalysis 
  } = useCryptoStore();

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (!inputText) {
        setOutputText('');
        setError('');
        setAnalysis(null);
        return;
      }
      
      // Guardrail: Intercept missing RSA keys
      if (algorithmId === 'rsa') {
        const hasKeys = keys.rsa && keys.rsa.publicKey && keys.rsa.privateKey;
        if (!hasKeys) {
          setError('RSA configuration incomplete. Please generate or provide a Key Pair.');
          setOutputText('');
          return;
        }
      }

      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/${mode}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            algorithm: algorithmId, 
            text: inputText, 
            key: keys[algorithmId] 
          }),
        });

        let data;
        try {
          data = await res.json();
        } catch (e) {
          setError(`HTTP Error ${res.status}: Backend is unreachable.`);
          setOutputText('');
          setLoading(false);
          return;
        }

        if (!res.ok) {
          setError(data.error || `HTTP Error ${res.status}: Backend returned an error.`);
          setOutputText('');
          setLoading(false);
          return;
        }

        if (data.success) {
          setOutputText(data.output);

          // Fetch analysis as well
          const resA = await fetch(`/api/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ algorithm: algorithmId, text: inputText })
          });
          if (resA.ok) {
            const dataA = await resA.json();
            if (dataA.success) {
              setAnalysis(dataA.analysis);
            }
          }
        } else {
          setError(data.error);
          setOutputText('');
        }
      } catch (err) {
        console.error(err);
        setError('Backend Offline: Failed to connect to CryptoForge engine.');
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [inputText, algorithmId, keys, mode]);

  const handleKeyChange = (val: string | number | any) => {
    setKey(algorithmId, val);
  };

  const handleGenerateKeys = async () => {
    try {
      const res = await fetch('/api/generate-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ algorithm: algorithmId })
      });
      const data = await res.json();
      if (data.success && data.keys) {
        handleKeyChange(data.keys);
        if (data.metadata) {
          setRsaMetadata(data.metadata);
        }
      }
    } catch (err) {
      console.error('Failed to generate keys:', err);
    }
  };

  const hasRsaKeys = keys.rsa && keys.rsa.publicKey && keys.rsa.privateKey;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full h-full p-6 space-y-6 overflow-y-auto"
    >
      <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/10 w-fit shadow-2xl">
        <button 
          onClick={() => setMode('encrypt')}
          className={cn("px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2", mode === 'encrypt' ? "bg-primary text-primary-foreground shadow-[0_0_10px_rgba(0,240,255,0.4)]" : "text-muted-foreground hover:text-white")}
        >
          <Lock className="w-4 h-4" /> Encrypt
        </button>
        <button 
          onClick={() => setMode('decrypt')}
          className={cn("px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2", mode === 'decrypt' ? "bg-primary text-primary-foreground shadow-[0_0_10px_rgba(0,240,255,0.4)]" : "text-muted-foreground hover:text-white")}
        >
          <Unlock className="w-4 h-4" /> Decrypt
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 perspective-1000">
        {/* INPUT */}
        <motion.div 
          whileHover={{ z: 10, rotateX: 2, rotateY: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="space-y-4 relative transform-style-3d bg-black/20 p-4 rounded-2xl border border-white/5 backdrop-blur-sm"
        >
          <label className="text-sm font-mono text-muted-foreground flex justify-between items-end">
            <span>INPUT STREAM</span>
            <span className="text-xs">{inputText.length} chars</span>
          </label>
          <textarea 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full h-48 bg-black/60 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none font-mono text-lg shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]"
            placeholder={mode === 'encrypt' ? "Enter plaintext here..." : "Enter ciphertext here..."}
          />
        </motion.div>

        {/* OUTPUT */}
        <motion.div 
          whileHover={{ z: 10, rotateX: 2, rotateY: 2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="space-y-4 transform-style-3d bg-black/20 p-4 rounded-2xl border border-white/5 backdrop-blur-sm"
        >
          <label className="text-sm font-mono text-primary flex items-center justify-between">
            <span>OUTPUT STREAM {loading && <span className="ml-2 inline-block w-2 h-2 bg-primary rounded-full animate-ping" />}</span>
          </label>
          <div className="w-full h-48 bg-black/80 border border-primary/40 shadow-[0_0_30px_rgba(0,240,255,0.15)_inset] rounded-xl p-4 relative flex flex-col group">
            {error ? (
              <p className="text-destructive font-mono text-sm">{error}</p>
            ) : (
              <p className="text-white font-mono break-all flex-1 overflow-y-auto whitespace-pre-wrap text-lg">
                {outputText || "Awaiting processing..."}
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* DYNAMIC KEYS */}
      <div className="space-y-4 p-6 rounded-xl bg-gradient-to-br from-black/60 to-primary/5 border border-primary/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Key className="w-24 h-24" />
        </div>
        <h4 className="text-sm font-mono text-primary font-bold flex items-center gap-2">
          <Key className="w-4 h-4" /> DYNAMIC KEY CONFIGURATION
        </h4>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={algorithmId}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="relative z-10"
          >
            {algorithmId === 'caesar' && (
              <div>
                <label className="text-xs text-muted-foreground uppercase mb-2 block">Numeric Shift (N)</label>
                <input type="number" value={keys.caesar} onChange={(e) => handleKeyChange(Number(e.target.value))} className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:border-primary focus:outline-none font-mono" />
              </div>
            )}

            {algorithmId === 'vigenere' && (
              <div>
                <label className="text-xs text-muted-foreground uppercase mb-2 block">Alphabetic Keyword</label>
                <input type="text" value={keys.vigenere} onChange={(e) => handleKeyChange(e.target.value)} className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:border-primary focus:outline-none font-mono uppercase" placeholder="e.g. SECRET" />
              </div>
            )}

            {algorithmId === 'railfence' && (
              <div>
                <label className="text-xs text-muted-foreground uppercase mb-2 block">Rail Count (Depth)</label>
                <input type="number" min="2" value={keys.railfence} onChange={(e) => handleKeyChange(Number(e.target.value))} className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:border-primary focus:outline-none font-mono" />
              </div>
            )}

            {algorithmId === 'playfair' && (
              <div>
                <label className="text-xs text-muted-foreground uppercase mb-2 block">Matrix Keyword</label>
                <input type="text" value={keys.playfair} onChange={(e) => handleKeyChange(e.target.value)} className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:border-primary focus:outline-none font-mono uppercase" placeholder="e.g. MONARCHY" />
              </div>
            )}

            {algorithmId === 'affine' && (
              <div>
                <label className="text-xs text-muted-foreground uppercase mb-2 block">Key Parameters (A, B)</label>
                <input type="text" value={keys.affine} onChange={(e) => handleKeyChange(e.target.value)} className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:border-primary focus:outline-none font-mono" placeholder="e.g. 5,8" />
              </div>
            )}

            {algorithmId === 'hill' && (
              <div>
                <label className="text-xs text-muted-foreground uppercase mb-2 block">2x2 Invertible Matrix</label>
                <input type="text" value={keys.hill} onChange={(e) => handleKeyChange(e.target.value)} className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:border-primary focus:outline-none font-mono" placeholder="e.g. 3,3,2,5" />
              </div>
            )}

            {algorithmId === 'aes' && (
              <div>
                <label className="text-xs text-muted-foreground uppercase mb-2 block">AES-256 Secret Password</label>
                <input type="password" value={keys.aes} onChange={(e) => handleKeyChange(e.target.value)} className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:border-primary focus:outline-none font-mono" placeholder="Enter secure password" />
              </div>
            )}

            {algorithmId === 'rsa' && !hasRsaKeys && (
              <div className="flex flex-col items-center justify-center py-10 space-y-4 bg-black/40 border border-dashed border-white/20 rounded-xl">
                <ShieldCheck className="w-12 h-12 text-muted-foreground opacity-50" />
                <div className="text-center">
                  <h3 className="text-lg font-bold font-heading text-white">No RSA Key Pair Detected</h3>
                  <p className="text-sm text-muted-foreground mt-1">Generate an enterprise 2048-bit key pair to continue.</p>
                </div>
                <button onClick={handleGenerateKeys} className="mt-4 px-6 py-2 bg-primary text-primary-foreground font-bold rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:bg-primary/90 transition-all flex items-center gap-2">
                  <Key className="w-4 h-4" /> Generate RSA Key Pair
                </button>
              </div>
            )}

            {algorithmId === 'rsa' && hasRsaKeys && (
              <div className="space-y-6">
                
                {/* RSA Visualization Flow */}
                <div className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/10 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50" />
                  
                  <div className="flex flex-col items-center flex-1 relative z-10">
                    <span className="text-[10px] uppercase text-muted-foreground mb-2">Input</span>
                    <div className="px-4 py-2 bg-white/5 rounded border border-white/10 text-xs font-mono">{mode === 'encrypt' ? 'Plaintext' : 'Ciphertext'}</div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-primary opacity-50 mx-2" />

                  <div className="flex flex-col items-center flex-1 relative z-10">
                    <span className="text-[10px] uppercase text-primary mb-2 font-bold">{mode === 'encrypt' ? 'Public Key' : 'Private Key'}</span>
                    <div className="px-4 py-2 bg-primary/20 rounded border border-primary/40 text-xs font-mono text-primary flex items-center gap-2">
                      <Key className="w-3 h-3" /> {mode === 'encrypt' ? 'Encrypting...' : 'Decrypting...'}
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-primary opacity-50 mx-2" />

                  <div className="flex flex-col items-center flex-1 relative z-10">
                    <span className="text-[10px] uppercase text-muted-foreground mb-2">Output</span>
                    <div className="px-4 py-2 bg-white/5 rounded border border-white/10 text-xs font-mono">{mode === 'encrypt' ? 'Ciphertext' : 'Plaintext'}</div>
                  </div>
                </div>

                {/* Key Manifest */}
                {rsaMetadata && (
                  <div className="grid grid-cols-3 gap-4 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                    <div>
                      <span className="text-[10px] uppercase text-muted-foreground block mb-1 flex items-center gap-1"><ShieldCheck className="w-3 h-3"/> Key Size</span>
                      <span className="text-xs font-mono font-bold text-primary">{rsaMetadata.keySize}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[10px] uppercase text-muted-foreground block mb-1 flex items-center gap-1"><Fingerprint className="w-3 h-3"/> Fingerprint (SHA-256)</span>
                      <span className="text-[10px] font-mono text-white/80">{rsaMetadata.fingerprint}</span>
                    </div>
                    <div className="col-span-3 pt-2 border-t border-white/10 mt-2">
                      <span className="text-[10px] uppercase text-muted-foreground block mb-1 flex items-center gap-1"><Clock className="w-3 h-3"/> Generation Time</span>
                      <span className="text-xs font-mono text-white/60">{new Date(rsaMetadata.generationTime).toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs text-muted-foreground uppercase block">Public Key</label>
                      <div className="flex gap-2">
                        <button onClick={() => copyToClipboard(keys.rsa?.publicKey)} className="text-xs text-muted-foreground hover:text-white" title="Copy to Clipboard"><Copy className="w-3 h-3" /></button>
                        <button onClick={() => downloadKey('public_key.pem', keys.rsa?.publicKey)} className="text-xs text-muted-foreground hover:text-white" title="Download .pem"><Download className="w-3 h-3" /></button>
                      </div>
                    </div>
                    <textarea readOnly value={keys.rsa?.publicKey || ''} className="w-full h-32 bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:border-primary focus:outline-none font-mono text-[10px] leading-relaxed opacity-80" />
                  </div>
                  <div className="relative group">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs text-muted-foreground uppercase block text-destructive">Private Key</label>
                      <div className="flex gap-2">
                        <button onClick={() => copyToClipboard(keys.rsa?.privateKey)} className="text-xs text-muted-foreground hover:text-white" title="Copy to Clipboard"><Copy className="w-3 h-3" /></button>
                        <button onClick={() => downloadKey('private_key.pem', keys.rsa?.privateKey)} className="text-xs text-muted-foreground hover:text-white" title="Download .pem"><Download className="w-3 h-3" /></button>
                      </div>
                    </div>
                    <textarea readOnly value={keys.rsa?.privateKey || ''} className="w-full h-32 bg-black/50 border border-destructive/30 rounded-lg p-3 text-destructive/80 focus:border-destructive focus:outline-none font-mono text-[10px] leading-relaxed" />
                  </div>
                </div>

                <div className="flex justify-end">
                   <button onClick={handleGenerateKeys} className="text-xs bg-white/5 text-white/50 px-3 py-1 rounded hover:bg-white/10 hover:text-white transition-colors">
                     Regenerate Keys
                   </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

    </motion.div>
  );
};
