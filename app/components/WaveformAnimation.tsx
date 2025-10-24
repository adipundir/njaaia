'use client';

import { motion } from 'framer-motion';

interface WaveformAnimationProps {
  isActive: boolean;
  intensity?: number;
}

export default function WaveformAnimation({ isActive, intensity = 1 }: WaveformAnimationProps) {
  const bars = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="relative flex items-center justify-center h-32 w-32">
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-white/20"
        animate={{
          scale: isActive ? [1, 1.2, 1] : 1,
          opacity: isActive ? [0.2, 0.6, 0.2] : 0.2,
        }}
        transition={{
          duration: 2,
          repeat: isActive ? Infinity : 0,
          ease: "easeInOut"
        }}
      />
      
      {/* Inner glow ring */}
      <motion.div
        className="absolute inset-2 rounded-full border border-white/30"
        animate={{
          scale: isActive ? [1, 1.1, 1] : 1,
          opacity: isActive ? [0.3, 0.7, 0.3] : 0.3,
        }}
        transition={{
          duration: 1.5,
          repeat: isActive ? Infinity : 0,
          ease: "easeInOut",
          delay: 0.2
        }}
      />

      {/* Waveform bars */}
      <div className="flex items-center justify-center space-x-1">
        {bars.map((bar) => (
          <motion.div
            key={bar}
            className="w-1 bg-gradient-to-t from-white to-gray-300 rounded-full"
            animate={{
              height: isActive 
                ? [8, 20 + (bar % 3) * 15, 8] 
                : 8,
              opacity: isActive ? [0.6, 1, 0.6] : 0.6,
            }}
            transition={{
              duration: 0.5 + (bar % 2) * 0.3,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut",
              delay: bar * 0.05
            }}
            style={{
              height: isActive ? 20 + (bar % 3) * 15 : 8
            }}
          />
        ))}
      </div>

      {/* Center dot */}
      <motion.div
        className="absolute w-3 h-3 bg-gradient-to-r from-white to-gray-200 rounded-full"
        animate={{
          scale: isActive ? [1, 1.5, 1] : 1,
          opacity: isActive ? [0.8, 1, 0.8] : 0.8,
        }}
        transition={{
          duration: 1,
          repeat: isActive ? Infinity : 0,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
