'use client';

import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
      
      {/* Animated radial gradients */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.08) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => {
        // Use deterministic positioning based on index to avoid hydration mismatch
        const positions = [
          { left: 10, top: 20 }, { left: 85, top: 15 }, { left: 60, top: 80 },
          { left: 25, top: 45 }, { left: 90, top: 60 }, { left: 15, top: 75 },
          { left: 70, top: 25 }, { left: 40, top: 90 }, { left: 95, top: 35 },
          { left: 50, top: 10 }, { left: 30, top: 65 }, { left: 75, top: 50 },
          { left: 5, top: 30 }, { left: 80, top: 85 }, { left: 45, top: 5 },
          { left: 65, top: 40 }, { left: 20, top: 95 }, { left: 55, top: 70 },
          { left: 35, top: 25 }, { left: 88, top: 45 }
        ];
        const pos = positions[i] || { left: 50, top: 50 };
        
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + (i % 3) * 0.5, // Use index-based duration instead of random
              repeat: Infinity,
              delay: (i % 4) * 0.5, // Use index-based delay instead of random
              ease: "easeInOut"
            }}
          />
        );
      })}

      {/* Large floating orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-white/5 to-white/2 blur-3xl"
        style={{
          left: '10%',
          top: '20%',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-white/3 to-white/1 blur-3xl"
        style={{
          right: '10%',
          bottom: '20%',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
}
