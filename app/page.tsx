'use client';

import { useState, useEffect, useRef } from 'react';
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
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        console.log('Speech recognition started');
      };
      
      recognition.onresult = async (event: any) => {
        const transcript = event.results[0][0].transcript;
        console.log('Transcript:', transcript);
        
        setVoiceState('thinking');
        setIsActive(false);
        setIsProcessing(true);
        setError('');
        
        try {
          // Send transcript to AI API
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: transcript,
              useTools: true
            }),
          });
          
          if (!response.ok) {
            throw new Error('Failed to get AI response');
          }
          
          const data = await response.json();
          
          if (data.success) {
            setAiResponse(data.data.response);
            setVoiceState('speaking');
            setIsActive(true);
            
            // Simulate speaking duration based on response length
            const speakingDuration = Math.max(2000, data.data.response.length * 50);
            setTimeout(() => {
              setVoiceState('idle');
              setIsActive(false);
              setAiResponse('');
            }, speakingDuration);
          } else {
            throw new Error(data.error || 'Unknown error');
          }
        } catch (err) {
          console.error('AI processing error:', err);
          setError(err instanceof Error ? err.message : 'Unknown error');
          setVoiceState('idle');
          setIsActive(false);
        } finally {
          setIsProcessing(false);
        }
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setError(`Speech recognition error: ${event.error}`);
        setVoiceState('idle');
        setIsActive(false);
        setIsProcessing(false);
      };
      
      recognition.onend = () => {
        console.log('Speech recognition ended');
      };
      
      recognitionRef.current = recognition;
    }
  }, []);

  const handleMicrophoneClick = () => {
    if (voiceState === 'idle') {
      if (recognitionRef.current) {
        setVoiceState('listening');
        setIsActive(true);
        setError('');
        recognitionRef.current.start();
      } else {
        setError('Speech recognition not supported in this browser');
      }
    } else if (voiceState === 'listening') {
      // Stop listening
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
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
            message={
              error ? error :
              aiResponse ? aiResponse :
              voiceState === 'speaking' ? 'Processing your request...' : undefined
            }
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
