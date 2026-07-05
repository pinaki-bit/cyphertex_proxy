"use client";

import { motion } from 'framer-motion';
import { Shield, Key, FileDigit, Hash } from 'lucide-react';

export const KnowledgeCenter = () => {
  const cards = [
    {
      title: "Symmetric Cryptography",
      description: "A cryptographic method where the same key is used for both encryption and decryption. The Caesar cipher is a classic, simple example of this.",
      icon: <Key className="w-8 h-8 text-primary" />
    },
    {
      title: "The Caesar Cipher",
      description: "Named after Julius Caesar, this substitution cipher shifts each letter in the plaintext by a fixed number of positions down the alphabet.",
      icon: <Shield className="w-8 h-8 text-primary" />
    },
    {
      title: "ASCII Encoding",
      description: "Computers store text as numbers. ASCII standardizes these numbers. For example, 'A' is 65, and 'B' is 66, which is crucial for mathematical encryption.",
      icon: <FileDigit className="w-8 h-8 text-primary" />
    },
    {
      title: "Modulo Arithmetic",
      description: "Clock math. In the Caesar cipher, modulo 26 ensures that when we shift past 'Z', we wrap around back to 'A'.",
      icon: <Hash className="w-8 h-8 text-primary" />
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-20 px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold font-heading mb-4 text-white">Cybersecurity Knowledge Center</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Understand the mathematical foundation of data protection and how classical encryption evolved into modern cryptographic standards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group p-8 rounded-2xl bg-black/30 border border-white/5 hover:border-primary/50 transition-colors relative overflow-hidden"
          >
            {/* Hover gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="mb-6 inline-block p-4 bg-primary/10 rounded-xl border border-primary/20 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              {card.icon}
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4 font-heading">{card.title}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
