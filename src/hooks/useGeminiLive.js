import { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

export const useGeminiLive = (apiKey, systemInstruction, onTranscript) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  
  // Gemini Session
  const aiRef = useRef(null);
  const sessionRef = useRef(null);
  
  // Audio Contexts
  const micContextRef = useRef(null);
  const playContextRef = useRef(null);
  const micStreamRef = useRef(null);
  const processorRef = useRef(null);
  const nextPlayTimeRef = useRef(0);
  
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isMutedRef = useRef(false);
  const isPausedRef = useRef(false);
  
  // Sync state to ref for audio processor
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);
  
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);
  
  const toggleMute = useCallback(() => setIsMuted(prev => !prev), []);
  const togglePause = useCallback(() => setIsPaused(prev => !prev), []);

  const connect = useCallback(async () => {
    if (!apiKey) {
      setError("Gemini API Key is required.");
      return;
    }
    
    setIsConnecting(true);
    setError(null);
    setIsPaused(false);
    
    try {
      // 1. Setup Playback Context (24kHz)
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      playContextRef.current = new AudioContext({ sampleRate: 24000 });
      nextPlayTimeRef.current = playContextRef.current.currentTime;
      
      // 2. Setup Mic Capture Context (16kHz)
      micContextRef.current = new AudioContext({ sampleRate: 16000 });

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(
          'Microphone access is not available. Please open this app over HTTPS ' +
          '(https://localhost:5173) — browsers block microphone access on insecure (HTTP) connections.'
        );
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { sampleRate: 16000, channelCount: 1, echoCancellation: true, noiseSuppression: true } 
      });
      micStreamRef.current = stream;
      
      const source = micContextRef.current.createMediaStreamSource(stream);
      const processor = micContextRef.current.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;
      
      // 3. Connect to Gemini Live
      aiRef.current = new GoogleGenAI({ apiKey, dangerouslyAllowBrowser: true });
      
      const session = await aiRef.current.live.connect({
        model: 'gemini-3.1-flash-live-preview',
        config: {
          responseModalities: ['audio'],
          systemInstruction: { parts: [{ text: systemInstruction }] }
        },
        callbacks: {
          onopen: () => {
            console.log("Connected to Gemini Live");
            setIsConnected(true);
            setIsConnecting(false);
            
            setTimeout(() => {
              try {
                if (sessionRef.current) {
                  sessionRef.current.sendRealtimeInput({ text: 'Hello' });
                }
              } catch(e) {
                console.error("Failed to send initial greeting trigger", e);
              }
            }, 500);
          },
          onmessage: async (response) => {
            try {
              const content = response.serverContent;
              
              // Handle transcriptions
              if (content?.inputTranscription?.text && onTranscript) {
                onTranscript('user', content.inputTranscription.text);
              }
              if (content?.outputTranscription?.text && onTranscript) {
                onTranscript('agent', content.outputTranscription.text);
              }
              
              // Check for interruption
              if (content?.interrupted) {
                if (playContextRef.current) {
                   await playContextRef.current.close();
                   const AudioContext = window.AudioContext || window.webkitAudioContext;
                   playContextRef.current = new AudioContext({ sampleRate: 24000 });
                   nextPlayTimeRef.current = playContextRef.current.currentTime;
                }
              }
              
              // Process audio parts
              if (content?.modelTurn?.parts) {
                for (const part of content.modelTurn.parts) {
                  if (part.inlineData && part.inlineData.mimeType.startsWith('audio/pcm')) {
                    const base64 = part.inlineData.data;
                    playAudioChunk(base64);
                  }
                }
              }
            } catch (err) {
              console.error("Error processing message:", err);
            }
          },
          onerror: (err) => {
            console.error("Gemini Live Error:", err);
            setError(err.message || "Live API Error");
            disconnect();
          },
          onclose: () => {
            console.log("Disconnected from Gemini Live");
            disconnect();
          }
        }
      });
      sessionRef.current = session;
      
      // 5. Start sending mic audio
      processor.onaudioprocess = (e) => {
        if (!sessionRef.current || isMutedRef.current) return;
        
        const inputData = e.inputBuffer.getChannelData(0);
        const pcm16 = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          pcm16[i] = Math.max(-1, Math.min(1, inputData[i])) * 32767;
        }
        
        const bytes = new Uint8Array(pcm16.buffer);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        const base64 = btoa(binary);
        
        try {
          sessionRef.current.sendRealtimeInput({
            audio: { data: base64, mimeType: 'audio/pcm;rate=16000' }
          });
        } catch (err) {
          console.error("Error sending audio:", err);
        }
      };
      
      source.connect(processor);
      processor.connect(micContextRef.current.destination);
      
    } catch (err) {
      console.error("Connection failed:", err);
      setError(err.message || "Failed to connect to Gemini");
      disconnect();
    }
  }, [apiKey, systemInstruction, onTranscript]);
  
  const playAudioChunk = (base64Str) => {
    if (!playContextRef.current || isPausedRef.current) return;
    
    const binary = atob(base64Str);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    
    const int16Array = new Int16Array(bytes.buffer);
    const float32Array = new Float32Array(int16Array.length);
    for (let i = 0; i < int16Array.length; i++) {
      float32Array[i] = int16Array[i] / 32768;
    }
    
    const audioBuffer = playContextRef.current.createBuffer(1, float32Array.length, 24000);
    audioBuffer.getChannelData(0).set(float32Array);
    
    const source = playContextRef.current.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(playContextRef.current.destination);
    
    let delay = nextPlayTimeRef.current - playContextRef.current.currentTime;
    if (delay < 0) {
      nextPlayTimeRef.current = playContextRef.current.currentTime;
      delay = 0;
    }
    
    source.start(nextPlayTimeRef.current);
    nextPlayTimeRef.current += audioBuffer.duration;
  };
  
  const disconnect = useCallback(() => {
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }
    if (micContextRef.current) {
      micContextRef.current.close();
      micContextRef.current = null;
    }
    if (playContextRef.current) {
      playContextRef.current.close();
      playContextRef.current = null;
    }
    if (sessionRef.current) {
      try { 
        // Need to cancel the generator loop by closing session?
        // @google/genai doesn't explicitly document session.close(), maybe just let it garbage collect or close websocket if it exists.
        if (typeof sessionRef.current.close === 'function') {
          sessionRef.current.close();
        }
      } catch(e){}
      sessionRef.current = null;
    }
    
    setIsConnected(false);
    setIsConnecting(false);
  }, []);

  const sendText = useCallback((text) => {
    if (!sessionRef.current || !text?.trim()) return;
    try {
      sessionRef.current.sendClientContent({
        turns: [{ role: 'user', parts: [{ text: text.trim() }] }],
        turnComplete: true
      });
    } catch (err) {
      console.error('Error sending text:', err);
    }
  }, []);

  return {
    connect,
    disconnect,
    isConnected,
    isConnecting,
    error,
    isMuted,
    isPaused,
    toggleMute,
    togglePause,
    sendText
  };
};
