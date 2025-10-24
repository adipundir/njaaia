'use client';

import { motion } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';

interface MicrophoneButtonProps {
  isListening: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export default function MicrophoneButton({ isListening, onClick, disabled = false }: MicrophoneButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative flex items-center justify-center w-24 h-24 rounded-full
        bg-gradient-to-br from-white/10 to-white/5
        backdrop-blur-md border border-white/20
        shadow-2xl transition-all duration-300
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
        ${isListening ? 'shadow-white/30 shadow-2xl' : 'shadow-white/20 shadow-xl'}
      `}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      animate={{
        boxShadow: isListening 
          ? [
              '0 0 20px rgba(255, 255, 255, 0.3)',
              '0 0 40px rgba(255, 255, 255, 0.5)',
              '0 0 20px rgba(255, 255, 255, 0.3)'
            ]
          : '0 0 20px rgba(255, 255, 255, 0.2)'
      }}
      transition={{
        duration: 2,
        repeat: isListening ? Infinity : 0,
        ease: "easeInOut"
      }}
    >
      {/* Inner glow effect */}
      <motion.div
        className="absolute inset-2 rounded-full bg-gradient-to-br from-white/10 to-white/5"
        animate={{
          opacity: isListening ? [0.3, 0.6, 0.3] : 0.3,
        }}
        transition={{
          duration: 1.5,
          repeat: isListening ? Infinity : 0,
          ease: "easeInOut"
        }}
      />

      {/* Icon */}
      <motion.div
        animate={{
          scale: isListening ? [1, 1.1, 1] : 1,
        }}
        transition={{
          duration: 0.8,
          repeat: isListening ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        {isListening ? (
          <MicOff className="w-8 h-8 text-gray-300" />
        ) : (
          <Mic className="w-8 h-8 text-white" />
        )}
      </motion.div>

      {/* Ripple effect when listening */}
      {isListening && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/40"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 0, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      )}
    </motion.button>
  );
}
