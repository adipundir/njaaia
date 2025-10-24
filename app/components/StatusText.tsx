'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface StatusTextProps {
  status: 'idle' | 'listening' | 'thinking' | 'speaking';
  message?: string;
}

const statusMessages = {
  idle: 'Tap to Talk',
  listening: 'Listening...',
  thinking: 'Thinking...',
  speaking: 'Speaking...'
};

export default function StatusText({ status, message }: StatusTextProps) {
  const displayMessage = message || statusMessages[status];

  return (
    <div className="h-16 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={status}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-center"
        >
          <motion.h2
            className={`
              text-2xl font-light tracking-wide
              ${status === 'idle' ? 'text-white/80' : ''}
              ${status === 'listening' ? 'text-white' : ''}
              ${status === 'thinking' ? 'text-gray-300' : ''}
              ${status === 'speaking' ? 'text-white' : ''}
            `}
            animate={{
              opacity: status === 'listening' ? [0.8, 1, 0.8] : 1,
            }}
            transition={{
              duration: 1.5,
              repeat: status === 'listening' ? Infinity : 0,
              ease: "easeInOut"
            }}
          >
            {displayMessage}
          </motion.h2>
          
          {/* Subtitle for idle state */}
          {status === 'idle' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-sm text-white/50 mt-2"
            >
              Not Just Another AI Assistant
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
