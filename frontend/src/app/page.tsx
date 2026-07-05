"use client";

import { useEffect, useRef } from 'react';
import { CyberHero3D } from "@/components/CyberHero3D";
import { EcosystemNetwork3D } from "@/components/EcosystemNetwork3D";
import { EncryptionEngine } from "@/components/EncryptionEngine";
import { ArrowDown, Layers, Code, Shield, Network, BrainCircuit, Activity, Lock } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const sections = gsap.utils.toArray('.gsap-section');
    sections.forEach((section: any) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 100, rotationX: 10 },
        { 
          opacity: 1, y: 0, rotationX: 0, 
          duration: 1.5, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-background relative overflow-x-hidden selection:bg-primary/30 perspective-1000">
      
      {/* SECTION 1: HERO */}
      <motion.section style={{ opacity: heroOpacity, scale: heroScale }} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <CyberHero3D />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-primary/30 bg-panel/40 backdrop-blur-xl shadow-[0_0_15px_rgba(0,229,255,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-xs font-mono tracking-widest uppercase">CryptoForge X Engine V2 Online</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-foreground mb-6 font-heading tracking-tight leading-tight"
          >
            Enterprise Cryptography <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-white drop-shadow-[0_0_25px_rgba(0,229,255,0.4)]">
              Security Intelligence
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl text-muted-foreground mb-12 max-w-2xl font-subheading font-light"
          >
            Encrypt, analyze, and secure information through military-grade mathematical algorithms. Built for the modern enterprise.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <a href="#engine" className="group relative px-8 py-4 bg-primary text-primary-foreground font-heading font-bold rounded-xl text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,229,255,0.3)]">
              <span className="relative z-10 flex items-center gap-2">Launch Platform <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" /></span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <a href="#ecosystem" className="group px-8 py-4 bg-panel/50 backdrop-blur-md border border-white/10 text-white font-heading font-bold rounded-xl text-lg transition-all hover:bg-white/5 hover:border-white/20">
              Explore Security Lab
            </a>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
        >
          <ArrowDown className="w-6 h-6 opacity-50" />
        </motion.div>
      </motion.section>

      {/* SECTION 2: CRYPTOGRAPHY ECOSYSTEM */}
      <section id="ecosystem" className="gsap-section relative h-screen flex flex-col justify-center px-4 z-10 transform-style-3d">
        <EcosystemNetwork3D />
        <div className="max-w-7xl mx-auto w-full relative z-10 pointer-events-none">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-foreground leading-tight">
              A Unified <span className="text-primary">Ecosystem</span>
            </h2>
            <p className="text-muted-foreground text-lg font-subheading mb-8">
              From classical transposition ciphers to modern asymmetric RSA-2048 and AES-256 standards, our engine seamlessly integrates multiple security protocols into a single, cohesive intelligence graph.
            </p>
            <div className="flex items-center gap-4 text-sm font-mono text-secondary uppercase tracking-widest">
              <Network className="w-4 h-4" /> 8 Algorithms Active
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FLOW VISUALIZER */}
      <section className="gsap-section relative py-32 px-4 z-10 bg-panel/30 border-y border-white/5 transform-style-3d backdrop-blur-xl">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold mb-16 text-white">Mathematical Transformation Flow</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="bg-background p-6 rounded-2xl border border-white/10 shadow-2xl flex-1 w-full">
              <span className="text-xs font-mono text-muted-foreground block mb-4 uppercase">Input Vector</span>
              <div className="text-3xl font-mono text-white tracking-widest">HELLO</div>
            </div>
            
            <ArrowDown className="w-6 h-6 text-primary md:-rotate-90 opacity-50" />
            
            <div className="bg-background p-6 rounded-2xl border border-primary/20 shadow-[0_0_30px_rgba(0,229,255,0.1)] flex-1 w-full relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 animate-pulse" />
              <span className="text-xs font-mono text-primary block mb-4 uppercase flex justify-center items-center gap-2">
                <Lock className="w-3 h-3" /> Cryptographic Shift
              </span>
              <div className="text-xl font-mono text-primary/80">01001000 01000101...</div>
            </div>

            <ArrowDown className="w-6 h-6 text-primary md:-rotate-90 opacity-50" />

            <div className="bg-background p-6 rounded-2xl border border-destructive/20 shadow-[0_0_30px_rgba(255,0,0,0.1)] flex-1 w-full">
              <span className="text-xs font-mono text-destructive block mb-4 uppercase">Ciphertext Output</span>
              <div className="text-3xl font-mono text-destructive tracking-widest blur-[1px]">KHOOR</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: METRICS BENTO BOX */}
      <section className="gsap-section relative py-32 px-4 z-10 transform-style-3d">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-gradient-to-br from-panel to-background p-10 rounded-3xl border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] group-hover:bg-primary/20 transition-all" />
              <Shield className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-5xl font-heading font-bold text-white mb-4">RSA-2048 & AES-256</h3>
              <p className="text-muted-foreground font-subheading">Enterprise-grade asymmetric and symmetric encryption pipelines integrated natively.</p>
            </div>
            <div className="bg-gradient-to-br from-panel to-background p-10 rounded-3xl border border-white/10 flex flex-col justify-center items-center text-center">
              <div className="text-6xl font-mono font-bold text-secondary mb-2">8</div>
              <div className="text-sm font-heading text-muted-foreground uppercase tracking-widest">Supported Algorithms</div>
            </div>
            <div className="bg-gradient-to-br from-panel to-background p-10 rounded-3xl border border-white/10 flex flex-col justify-center items-center text-center">
              <Activity className="w-8 h-8 text-white mb-4 opacity-50" />
              <div className="text-2xl font-heading font-bold text-white mb-1">Real-Time</div>
              <div className="text-sm font-subheading text-muted-foreground">Cryptographic Analysis</div>
            </div>
            <div className="md:col-span-2 bg-gradient-to-br from-panel to-background p-10 rounded-3xl border border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-heading font-bold text-white mb-2">Zero-Knowledge Architecture</h3>
                <p className="text-muted-foreground font-subheading text-sm">Operations are performed in-memory securely.</p>
              </div>
              <Layers className="w-16 h-16 text-primary/20" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5/6: PREVIEWS */}
      <section className="gsap-section relative py-32 px-4 z-10 border-t border-white/5 bg-[radial-gradient(ellipse_at_top,rgba(0,229,255,0.05),transparent_70%)] transform-style-3d">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold font-heading mb-4 text-white">Next-Generation Capabilities</h2>
          <p className="text-muted-foreground font-subheading max-w-2xl mx-auto">
            Glimpse into the future of our security intelligence roadmap.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Lab Preview */}
          <div className="relative h-80 rounded-3xl border border-white/10 overflow-hidden bg-panel group">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            <div className="absolute inset-0 backdrop-blur-md bg-background/80 flex flex-col items-center justify-center z-10 transition-all group-hover:bg-background/60">
              <Lock className="w-8 h-8 text-muted-foreground mb-4" />
              <h3 className="text-xl font-heading text-white font-bold mb-2">Cryptanalysis Lab</h3>
              <p className="text-sm text-primary font-mono border border-primary/30 px-3 py-1 rounded-full">IN DEVELOPMENT</p>
            </div>
          </div>

          {/* AI Preview */}
          <div className="relative h-80 rounded-3xl border border-white/10 overflow-hidden bg-panel group">
            <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-transparent opacity-50" />
            <div className="absolute inset-0 backdrop-blur-md bg-background/80 flex flex-col items-center justify-center z-10 transition-all group-hover:bg-background/60">
              <BrainCircuit className="w-8 h-8 text-muted-foreground mb-4" />
              <h3 className="text-xl font-heading text-white font-bold mb-2">AI Security Copilot</h3>
              <p className="text-sm text-primary font-mono border border-primary/30 px-3 py-1 rounded-full">EARLY ACCESS</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: CRYPTOGRAPHY ENGINE */}
      <section id="engine" className="relative min-h-screen pt-20 pb-32 px-4 z-20 border-t border-white/10 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.03)_0%,transparent_100%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-white">CryptoForge Engine</h2>
            <p className="text-muted-foreground font-subheading text-lg max-w-2xl mx-auto">
              Secure your data using military-grade encryption standards inside our sandboxed environment.
            </p>
          </div>
          
          <div className="bg-panel border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden min-h-[800px] flex">
             <EncryptionEngine />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-white/10 text-center text-muted-foreground relative z-10 bg-black font-mono text-sm">
        <p>© {new Date().getFullYear()} CRYPTOFORGE X. ALL SYSTEMS SECURE.</p>
      </footer>
    </main>
  );
}
