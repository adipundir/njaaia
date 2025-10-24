'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from './components/AnimatedBackground';
import WaveformAnimation from './components/WaveformAnimation';
import MicrophoneButton from './components/MicrophoneButton';
import StatusText from './components/StatusText';
import { ShaderAnimation } from './components/shader-animation';

type VoiceState = 'idle' | 'listening' | 'thinking' | 'speaking';

export default function Home() {
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [isActive, setIsActive] = useState(false);

  const handleMicrophoneClick = () => {
    if (voiceState === 'idle') {
      setVoiceState('listening');
      setIsActive(true);
      
      // Simulate listening for 2 seconds
      setTimeout(() => {
        setVoiceState('thinking');
        setIsActive(false);
        
        // Simulate thinking for 1.5 seconds
        setTimeout(() => {
          setVoiceState('speaking');
          setIsActive(true);
          
          // Simulate speaking for 2.5 seconds
          setTimeout(() => {
            setVoiceState('idle');
            setIsActive(false);
          }, 2500);
        }, 1500);
      }, 2000);
    } else if (voiceState === 'listening') {
      // Stop listening
      setVoiceState('idle');
      setIsActive(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      
      {/* Shader Animation - only show when thinking or speaking */}
      {(voiceState === 'thinking' || voiceState === 'speaking') && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 z-5"
        >
          <ShaderAnimation />
        </motion.div>
      )}
      
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        {/* Status Text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <StatusText 
            status={voiceState} 
            message={voiceState === 'speaking' ? 'Hello! How can I help you today?' : undefined}
          />
        </motion.div>

        {/* Waveform Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-12"
        >
          <WaveformAnimation isActive={isActive} />
        </motion.div>

        {/* Microphone Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <MicrophoneButton
            isListening={voiceState === 'listening'}
            onClick={handleMicrophoneClick}
            disabled={voiceState === 'thinking' || voiceState === 'speaking'}
          />
        </motion.div>

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 text-center"
        >
          <h1 className="text-4xl font-light tracking-wider text-white/60">
            njaaia
          </h1>
        </motion.div>
      </main>
    </div>
  );
}
