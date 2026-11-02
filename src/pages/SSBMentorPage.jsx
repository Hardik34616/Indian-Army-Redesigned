import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Mic, Send, MapPin, Globe, AlertTriangle, Clock, MicOff, Pause, Lightbulb, CheckCircle, User } from 'lucide-react';
import { useGeminiLive } from '../hooks/useGeminiLive';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const SSBMentorPage = () => {
  const [messages, setMessages] = useState([
    {
      role: 'agent',
      text: "Jai Hind! I am Major Shreya Yadav.\n\nI'm here to guide you through your SSB preparation.\n\nPlease click the microphone button to start the live AI session.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const timerRef = useRef(null);
  
  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  
  const systemInstruction = `You are Major Shreya Yadav, an experienced former Services Selection Board (SSB) assessor in the Indian Army. You are conducting a mock SSB personal interview. You are strict but encouraging. Keep your responses very brief and conversational, as this is a live spoken audio interaction. Do not use markdown formatting. Listen to the candidate and evaluate their Officer Like Qualities (OLQs). Always start the conversation by saying exactly: "Namaste I am Major Shreya Yadav from Indian army" when the session starts. Then ask the candidate for their Chest Number.`;

  const handleTranscript = (role, text) => {
    if (!text || !text.trim()) return;
    setMessages(prev => {
      const newMessages = [...prev];
      const lastMessage = newMessages[newMessages.length - 1];
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      if (lastMessage && lastMessage.role === role && lastMessage.streaming) {
        const existing = lastMessage.text;
        const newText = text.trim();
        
        // Skip if new text is already contained in existing
        if (existing.includes(newText)) {
          return prev;
        }
        
        // If new text starts with existing text, it's cumulative — replace
        if (newText.startsWith(existing.trim())) {
          lastMessage.text = newText;
          lastMessage.timestamp = timestamp;
          return newMessages;
        }
        
        // Find overlapping region (suffix of existing = prefix of new)
        let overlapLen = 0;
        const maxOverlap = Math.min(existing.length, newText.length);
        for (let i = 1; i <= maxOverlap; i++) {
          if (existing.endsWith(newText.substring(0, i))) {
            overlapLen = i;
          }
        }
        
        // Append with deduplication
        if (overlapLen > 0) {
          lastMessage.text = existing + newText.substring(overlapLen);
        } else {
          lastMessage.text = existing + ' ' + newText;
        }
        lastMessage.timestamp = timestamp;
      } else {
        // Role switched — finalize previous message and start new bubble
        if (lastMessage && lastMessage.streaming) {
          lastMessage.streaming = false;
        }
        newMessages.push({ role, text: text.trim(), timestamp, streaming: true });
      }
      return newMessages;
    });
  };

  const { connect, disconnect, isConnected, isConnecting, error, isMuted, isPaused, toggleMute, togglePause, sendText } = useGeminiLive(geminiApiKey, systemInstruction, handleTranscript);

  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isConnected) {
      timerRef.current = setInterval(() => {
        setSessionSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      // Optional: reset timer on disconnect?
      // setSessionSeconds(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isConnected]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const text = inputText.trim();
    setMessages(prev => [...prev, { 
      role: 'user', 
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setInputText('');
    
    // Send to Gemini Live session if connected
    if (isConnected) {
      sendText(text);
    }
  };

  const toggleListen = async () => {
    if (isConnected || isConnecting) {
      disconnect();
    } else {
      if (!geminiApiKey) {
        alert("API key is missing in environment variables.");
        return;
      }
      setSessionSeconds(0); // Reset timer
      await connect();
    }
  };

  return (
    <main className="ssb-mentor-page" id="main-content">
      
      {/* Hero Section — follows the editorial language used across the experience pages */}
      <section className="hero-container ssb-hero-section ssb-immersive-slider">
        <div className="ssb-hero-bg-wrapper">
          <img src="/assets/ssb_interview_bg.jpg" alt="SSB Personal Interview" className="ssb-hero-bg-img" />
          <div className="ssb-hero-overlay ssb-light-overlay"></div>
          <div className="ssb-hero-overlay ssb-dark-overlay"></div>
          <div className="ssb-hero-vignette ssb-light-vignette"></div>
          <div className="ssb-hero-vignette ssb-dark-vignette"></div>
        </div>

        <div className="container ssb-hero-content-inner">
          <div className="ssb-hero-text-block">
            <Link to="/" className="ssb-back-link">
              <ArrowLeft size={16} /> Back to Home
            </Link>
            
            <div className="ssb-pre-heading">
              <span className="ssb-section-label">SSB MENTORSHIP PROGRAM</span>
            </div>
            
            <div className="ssb-tricolor-badge">
              <span className="tricolor-bar-accent" />
              <span className="ssb-tagline-text">AI-POWERED PREPARATION - EXCELLENCE</span>
            </div>
            
            <h1 className="ssb-hero-title">
              Prepare with<br/><span className="ssb-title-highlight">precision.</span>
            </h1>
            
            <div className="ssb-meta-pill">
              <MapPin size={16} className="text-gold" />
              <span>Live voice rehearsal · Gemini Live API</span>
            </div>

            <p className="ssb-hero-desc">
              Experience realistic SSB scenarios, receive instant feedback, and refine your approach with our AI-powered mentor. Developed by former assessors, this tool provides you with the environment to test your mettle before the actual selection board.
            </p>

            <div className="ssb-features-list">
              <div className="feature-item">
                <Globe size={18} className="feature-icon" />
                <span>Supports 11 Indian languages (Bengali, Gujarati, Tamil, Telugu, Kannada, etc.)</span>
              </div>
              <div className="feature-item disclaimer">
                <AlertTriangle size={18} className="feature-icon text-warning" />
                <span>This is a simulation and does not guarantee actual selection.</span>
              </div>
            </div>

            <div className="ssb-quick-stats">
              <div className="ssb-stat-card">
                <span className="stat-label">PSYCHOLOGY</span>
                <span className="stat-val">TAT, WAT, SRT</span>
              </div>
              <div className="ssb-stat-card">
                <span className="stat-label">INTERVIEW</span>
                <span className="stat-val">Mock Sessions</span>
              </div>
              <div className="ssb-stat-card">
                <span className="stat-label">GTO PREP</span>
                <span className="stat-val">Scenario Prep</span>
              </div>
            </div>

            <div className="ssb-hero-actions">
              <a href="#ssb-session" className="btn btn-primary btn-lg"><span>Start a mock session</span><ArrowRight size={18} /></a>
              <a href="#ssb-method" className="btn ssb-outline-action">Understand the method</a>
            </div>
            
          </div>
        </div>
        <span className="ssb-hero-source">Image: SSB interview setting - illustrative visual</span>
      </section>

      <div className="container ssb-article-shell">
        <section className="ssb-article-intro" id="ssb-method">
          <span className="ssb-section-tag">SSB PREPARATION</span>
          <h2>A rehearsal space for the five-day board.</h2>
          <p>The Services Selection Board looks for the qualities behind a candidate's answers: clarity, responsibility, initiative and the ability to work with others. Use this mentor to practise the way you think, speak and respond before the real assessment.</p>
        </section>

        <section className="ssb-feature-layout">
          <div className="ssb-feature-visual">
            <span>THE FIVE-DAY BOARD</span>
            <strong>Calm preparation.<br />Clearer responses.</strong>
            <small>VOICE REHEARSAL - SELF-REFLECTION - FEEDBACK</small>
          </div>
          <div className="ssb-feature-copy">
            <span className="ssb-kicker">PRACTICE WITH INTENT</span>
            <h2>Build the habit of answering as yourself.</h2>
            <p>There is no perfect script for an SSB interview. The strongest preparation creates room for honest answers, thoughtful listening and a steady response under pressure. Major Shreya Yadav's voice-led sessions give you a private place to repeat that work.</p>
          </div>
        </section>

        <section className="ssb-dimensions-section">
          <div className="ssb-section-heading">
            <div><span className="ssb-kicker">THE PREPARATION IN THREE DIMENSIONS</span><h2>Every part of the board tests a different kind of readiness.</h2></div>
            <p>Use each session to understand your own approach - not to memorise answers.</p>
          </div>
          <div className="ssb-dimensions-grid">
            <article className="ssb-dimension-card"><span>01 - PSYCHOLOGY</span><h3>TAT, WAT and SRT</h3><p>Practise responding with imagination, awareness and practical judgement when time is limited.</p></article>
            <article className="ssb-dimension-card"><span>02 - GTO</span><h3>Group and situation work</h3><p>Learn to contribute with confidence while keeping the team, the task and the objective in view.</p></article>
            <article className="ssb-dimension-card"><span>03 - INTERVIEW</span><h3>Personal conversation</h3><p>Build a clear account of your choices, experiences and motivation for a life of service.</p></article>
          </div>
        </section>

        <div className="ssb-main-header" id="ssb-session">
           <span className="ssb-kicker">AI VOICE MENTOR</span>
           <h2>Begin your rehearsal.</h2>
           <p>Speak naturally with Major Shreya Yadav and review the conversation as you go.</p>
        </div>

      <section className="ssb-main-section">
        <div className="container" style={{maxWidth: '1200px'}}>
          <div className="ssb-interactive-layout">
            
            {/* Left Column: Transcripts */}
            <div className="ssb-transcript-panel">
              
              <div className="transcript-header">
                 <div className="agent-profile">
                    <img src="/assets/army-crest.png" alt="Agent" className="agent-avatar-small" onError={(e) => { e.target.onerror = null; e.target.src = 'https://i.pravatar.cc/150?img=47' }} />
                    <span className="agent-title">Major Shreya Yadav</span>
                    <span className="agent-badge">AI Voice Mentor</span>
                 </div>
              </div>

              <div className="transcript-messages" ref={messagesContainerRef}>
                {messages.map((msg, index) => (
                  <div key={index} className={`message-bubble ${msg.role}`}>
                    {msg.role === 'agent' && (
                       <img src="/assets/army-crest.png" alt="Agent" className="message-avatar" onError={(e) => { e.target.onerror = null; e.target.src = 'https://i.pravatar.cc/150?img=47' }} />
                    )}
                    <div className="message-content">
                      {msg.role === 'agent' && <span className="agent-name">Major Shreya Yadav</span>}
                      {msg.role === 'user' && <span className="user-name">You</span>}
                      <p>{msg.text.split('\\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}</p>
                      
                      <div className="message-meta">
                        <span className="timestamp">{msg.timestamp || '10:30 AM'}</span>
                        {msg.role === 'user' && (
                          <span className="read-receipt">✓✓</span>
                        )}
                        {msg.role === 'agent' && (
                          <div className="audio-wave-mini">
                            <span className="wave-bar"></span><span className="wave-bar"></span><span className="wave-bar"></span><span className="wave-bar"></span><span className="wave-bar"></span>
                          </div>
                        )}
                      </div>
                    </div>
                    {msg.role === 'user' && (
                       <div className="message-avatar user-avatar"><User size={16} /></div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form className="transcript-input-area" onSubmit={handleSendMessage}>
                <div className="input-wrapper">
                  <div className="mic-icon-wrapper">
                    <Mic size={18} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Type your response or use voice..." 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  <button type="submit" className="btn-send" disabled={!inputText.trim()}>
                    <Send size={16} />
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Voice Controls */}
            <div className="ssb-agent-panel">
                <div className="agent-controls-top">
                   <div className="status-timer-group">
                      <div className="active-pill">
                         <span className="pulse-dot"></span> Session Active
                      </div>
                      <div className="timer-pill">
                         <Clock size={14} /> {formatTime(sessionSeconds)}
                      </div>
                   </div>
                   <button className="end-session-btn" onClick={() => isConnected && disconnect()}>
                      <AlertTriangle size={14} /> End Session
                   </button>
                </div>

                <div className="agent-controls-center">
                    {error && (
                      <div style={{color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '10px 15px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '20px', textAlign: 'center', border: '1px solid #ef4444', maxWidth: '280px', position: 'absolute', top: '60px'}}>
                        {error}
                      </div>
                    )}
                    
                    <div className={`mic-visualization-container ${isConnected ? 'active' : ''}`}>
                       <div className="pulse-ring-outer"></div>
                       <div className="pulse-ring-inner"></div>
                       
                       <button 
                         className={`central-mic-btn ${isConnected ? (isMuted || isPaused ? 'paused' : 'listening') : ''}`}
                         onClick={toggleListen}
                         disabled={isConnecting}
                       >
                         <Mic size={48} className="mic-icon" />
                       </button>
                    </div>

                    <div className="listening-status">
                       <h3 className="listening-title">{isConnecting ? 'Connecting...' : isConnected ? (isMuted ? 'Muted' : isPaused ? 'Paused' : 'Listening...') : 'Ready'}</h3>
                       <p className="listening-desc">{isConnected ? (isMuted ? 'Microphone is off.' : isPaused ? 'Session paused.' : "I'm listening. Speak now.") : 'Click microphone to start.'}</p>
                       {isConnected && !isMuted && !isPaused && (
                         <div className="animated-waveform">
                            <span className="dot"></span><span className="dot"></span><span className="dot"></span><span className="dot"></span><span className="dot"></span>
                            <span className="bar"></span><span className="bar"></span>
                            <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                         </div>
                       )}
                    </div>

                    <div className="action-buttons">
                       <button className={`action-btn ${isMuted ? 'active' : ''}`} onClick={toggleMute} disabled={!isConnected}>
                          <MicOff size={20} />
                          <span>Mute</span>
                       </button>
                       <button className={`action-btn ${isPaused ? 'active' : ''}`} onClick={togglePause} disabled={!isConnected}>
                          <Pause size={20} />
                          <span>Pause</span>
                       </button>
                       <button className="action-btn">
                          <Lightbulb size={20} />
                          <span>Tips</span>
                       </button>
                    </div>
                </div>

                <div className="environment-banner">
                   <AlertTriangle size={14} className="banner-icon" />
                   <span>For best experience, speak in a quiet environment.</span>
                </div>
            </div>

          </div>
          
          <div className="secure-footer">
             <CheckCircle size={16} className="secure-icon" />
             <span>Your conversation is secure and confidential</span>
          </div>
          
        </div>
      </section>

        <section className="ssb-journey-section">
          <div className="ssb-section-heading"><div><span className="ssb-kicker">HOW TO USE THE MENTOR</span><h2>From first prompt to a better answer.</h2></div></div>
          <div className="ssb-journey-grid">
            <article className="ssb-journey-card"><strong>01</strong><h3>Start without a script</h3><p>Begin with your own words. The mentor is most useful when your response reflects your actual experience.</p></article>
            <article className="ssb-journey-card"><strong>02</strong><h3>Listen and respond</h3><p>Take a moment to understand the question, then answer with the same calm pace you want on the board.</p></article>
            <article className="ssb-journey-card"><strong>03</strong><h3>Review your pattern</h3><p>Use the transcript to notice clarity, repetition and the examples you can explain more precisely.</p></article>
          </div>
        </section>

        <section className="ssb-reference-panel">
          <div><span className="ssb-kicker">READ THE OFFICIAL DETAIL</span><h2>Preparation supports the process.</h2><p>This is a practice environment, not an official selection tool. Always rely on the current notification and instructions issued through official Indian Army and UPSC channels.</p></div>
          <div className="ssb-reference-links"><Link to="/opportunities/officers-entry">Explore officer entries <ArrowRight size={14} /></Link><a href="https://joinindianarmy.nic.in/" target="_blank" rel="noreferrer">Visit the official recruitment portal <ArrowRight size={14} /></a></div>
        </section>

        <div className="ssb-bottom-cta"><div><h3>Your next answer can be clearer.</h3><p>Return to the mentor whenever you want to practise deliberately.</p></div><a href="#ssb-session" className="btn btn-primary btn-lg"><span>Start a session</span><ArrowRight size={18} /></a></div>
      </div>

      <style>{`
        .ssb-mentor-page { 
          min-height: 100vh; 
          background: #f8faf9; 
          color: #1a1f1c;
          font-family: 'Inter', sans-serif !important;
          padding-top: 0;
        }

        /* Hero Section (Adventure Sports Style) */
        .ssb-hero-section {
          position: relative;
          min-height: 85vh;
          display: flex;
          align-items: center;
          margin-bottom: 40px;
        }

        .ssb-hero-bg-wrapper {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }

        .ssb-hero-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
        }

        .ssb-hero-gradient-side {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(247,249,248,1) 0%, rgba(247,249,248,0.95) 45%, rgba(247,249,248,0) 80%);
        }

        [data-theme='dark'] .ssb-hero-gradient-side {
          background: linear-gradient(90deg, rgba(14,18,15,1) 0%, rgba(14,18,15,0.95) 45%, rgba(14,18,15,0) 80%);
        }

        .ssb-hero-gradient-bottom {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 300px;
          background: linear-gradient(180deg, transparent 0%, #f8faf9 100%);
        }

        .ssb-hero-content-inner {
          position: relative;
          z-index: 10;
          padding: 100px 0;
          width: 100%;
        }

        .ssb-hero-text-block {
          max-width: 600px;
        }

        .ssb-back-link {
          display: inline-flex; 
          gap: 7px; 
          align-items: center; 
          color: #2e603a; 
          font-size: 0.85rem; 
          font-weight: 700; 
          margin-bottom: 30px;
          transition: transform 0.2s;
          text-decoration: none;
        }

        [data-theme='dark'] .ssb-back-link {
          color: var(--gold-light);
        }

        .ssb-back-link:hover {
          transform: translateX(-4px);
          color: #C59B27;
        }

        .ssb-pre-heading {
          margin-bottom: 16px;
        }

        .ssb-section-label {
          display: inline-block; 
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem; 
          font-weight: 900; 
          letter-spacing: 0.16em; 
          color: #2e603a; 
          background: rgba(31,73,48,0.1); 
          padding: 6px 14px; 
          border-radius: 9999px; 
        }

        [data-theme='dark'] .ssb-section-label {
          color: var(--gold-light);
          background: rgba(197,155,39,0.15); 
          border: 1px solid rgba(197,155,39,0.3);
        }

        .ssb-tricolor-badge {
          display: inline-flex; 
          align-items: center; 
          gap: 12px; 
          margin-bottom: 20px; 
          color: #6b7280; 
          font-size: 0.75rem; 
          font-weight: 800; 
          letter-spacing: 0.1em;
        }

        .tricolor-bar-accent {
          width: 36px; 
          height: 4px; 
          border-radius: 4px; 
          background: linear-gradient(90deg, #ff9933, #fff 50%, #138808);
        }

        .ssb-hero-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(3rem, 5vw, 4.5rem); 
          line-height: 1.05; 
          margin-bottom: 16px;
          color: #111827;
          font-weight: 800;
        }

        .ssb-powered-by {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          color: #6b7280;
          margin-bottom: 24px;
        }

        .text-gold {
          color: #C59B27;
        }

        .ssb-hero-desc {
          font-size: 1.1rem; 
          color: #4b5563; 
          line-height: 1.7; 
          margin-bottom: 30px;
        }

        .ssb-features-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 40px;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.95rem;
          color: #111827;
          font-weight: 500;
        }

        .feature-item.disclaimer {
          color: #6b7280;
          font-size: 0.85rem;
          font-weight: 400;
          font-style: italic;
        }

        .feature-icon {
          color: #2e603a;
          flex-shrink: 0;
          margin-top: 2px;
        }
        
        [data-theme='dark'] .feature-icon {
          color: var(--gold-light);
        }

        .text-warning {
          color: #d97706 !important;
        }

        .ssb-quick-stats {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .ssb-stat-card {
          background: rgba(255, 255, 255, 0.8); 
          backdrop-filter: blur(12px); 
          -webkit-backdrop-filter: blur(12px); 
          border: 1px solid rgba(0, 0, 0, 0.05); 
          border-radius: 8px; 
          padding: 12px 16px; 
          display: flex; 
          flex-direction: column;
          gap: 4px;
          flex: 1;
          min-width: 140px;
        }

        [data-theme='dark'] .ssb-stat-card {
          background: rgba(255, 255, 255, 0.05); 
          border-color: rgba(255, 255, 255, 0.1); 
        }

        .ssb-stat-card .stat-label {
          font-size: 0.65rem; 
          text-transform: uppercase; 
          letter-spacing: 0.1em; 
          color: #6b7280; 
          font-weight: 700; 
        }

        .ssb-stat-card .stat-val {
          font-size: 1rem; 
          font-weight: 800; 
          color: #111827; 
        }

        .ssb-main-header {
           text-align: center;
           margin-bottom: 30px;
        }
        
        .ssb-kicker {
           color: #2e603a;
           font-size: 0.75rem;
           font-weight: 800;
           letter-spacing: 0.1em;
           text-transform: uppercase;
           display: inline-block;
           margin-bottom: 10px;
        }
        
        .ssb-main-header h2 {
           font-size: 2.2rem;
           font-weight: 800;
           color: #1a1f1c;
           margin-bottom: 8px;
        }
        
        .ssb-main-header p {
           color: #6b7280;
           font-size: 1rem;
        }

        .ssb-main-section {
          position: relative;
          z-index: 20;
          padding-bottom: 40px;
        }

        .ssb-interactive-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
          overflow: hidden;
          height: 650px;
        }

        /* Transcript Panel Styles */
        .ssb-transcript-panel {
          display: flex;
          flex-direction: column;
          border-right: 1px solid #f3f4f6;
          padding: 24px;
          background: #fafafa;
          height: 100%;
          overflow: hidden;
        }

        .transcript-header {
           border-bottom: 1px solid #e5e7eb;
           padding-bottom: 16px;
           margin-bottom: 20px;
        }

        .agent-profile {
           display: flex;
           align-items: center;
           gap: 12px;
        }
        
        .agent-avatar-small {
           width: 32px;
           height: 32px;
           border-radius: 50%;
           object-fit: cover;
        }
        
        .agent-title {
           font-weight: 700;
           color: #111827;
           font-size: 1rem;
        }
        
        .agent-badge {
           background: #e6f4ea;
           color: #1e7e34;
           font-size: 0.7rem;
           font-weight: 600;
           padding: 4px 8px;
           border-radius: 12px;
        }

        .transcript-messages {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-right: 10px;
          min-height: 0;
        }

        .transcript-messages::-webkit-scrollbar {
          width: 4px;
        }
        .transcript-messages::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }

        .message-bubble {
          display: flex;
          gap: 12px;
          max-width: 90%;
        }

        .message-bubble.agent {
          align-self: flex-start;
        }

        .message-bubble.user {
          align-self: flex-end;
          flex-direction: row;
        }

        .message-avatar {
           width: 40px;
           height: 40px;
           border-radius: 50%;
           flex-shrink: 0;
           object-fit: cover;
        }
        
        .user-avatar {
           background: #111827;
           color: white;
           display: flex;
           align-items: center;
           justify-content: center;
        }

        .message-content {
          padding: 16px;
          border-radius: 12px;
          position: relative;
        }

        .message-bubble.agent .message-content {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
          border-top-left-radius: 4px;
        }

        .message-bubble.user .message-content {
          background: #fdfaf0;
          border: 1px solid #f3e8c9;
          border-top-right-radius: 4px;
        }

        .agent-name, .user-name {
          display: block;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .agent-name { color: #2e603a; }
        .user-name { color: #b45309; text-align: right; }

        .message-content p {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #374151;
          margin-bottom: 12px;
        }

        .message-meta {
           display: flex;
           align-items: center;
           justify-content: space-between;
           gap: 10px;
        }
        
        .message-bubble.user .message-meta {
           justify-content: flex-end;
        }

        .timestamp {
           font-size: 0.7rem;
           color: #9ca3af;
        }
        
        .read-receipt {
           font-size: 0.7rem;
           color: #2e603a;
           letter-spacing: -2px;
        }
        
        .audio-wave-mini {
           display: flex;
           gap: 2px;
           align-items: center;
           height: 12px;
        }
        
        .audio-wave-mini .wave-bar {
           width: 2px;
           background: #2e603a;
           border-radius: 2px;
           animation: miniwave 1s infinite alternate;
        }
        .audio-wave-mini .wave-bar:nth-child(1) { height: 4px; animation-delay: 0.1s;}
        .audio-wave-mini .wave-bar:nth-child(2) { height: 8px; animation-delay: 0.2s;}
        .audio-wave-mini .wave-bar:nth-child(3) { height: 12px; animation-delay: 0.3s;}
        .audio-wave-mini .wave-bar:nth-child(4) { height: 7px; animation-delay: 0.4s;}
        .audio-wave-mini .wave-bar:nth-child(5) { height: 5px; animation-delay: 0.5s;}

        @keyframes miniwave {
           0% { transform: scaleY(0.5); }
           100% { transform: scaleY(1); }
        }

        .transcript-input-area {
          margin-top: 24px;
        }

        .input-wrapper {
          display: flex;
          align-items: center;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 8px 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.02);
        }
        
        .mic-icon-wrapper {
           color: #9ca3af;
           padding: 0 10px;
        }

        .transcript-input-area input {
          flex: 1;
          border: none;
          background: transparent;
          color: #111827;
          font-size: 0.95rem;
          outline: none;
        }

        .transcript-input-area input::placeholder {
           color: #9ca3af;
        }

        .btn-send {
          background: #111827;
          color: white;
          border: none;
          border-radius: 8px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-send:hover:not(:disabled) {
          background: #374151;
        }

        .btn-send:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Right Panel: Voice Controls */
        .ssb-agent-panel {
          display: flex;
          flex-direction: column;
          background: #ffffff;
          position: relative;
          height: 100%;
          overflow: hidden;
        }

        .agent-controls-top {
           display: flex;
           justify-content: space-between;
           align-items: center;
           padding: 24px;
           border-bottom: 1px solid transparent; /* matches left side top padding */
        }
        
        .status-timer-group {
           display: flex;
           align-items: center;
           gap: 12px;
        }
        
        .active-pill {
           background: #111827;
           color: #fff;
           font-size: 0.75rem;
           font-weight: 600;
           padding: 6px 12px;
           border-radius: 6px;
           display: flex;
           align-items: center;
           gap: 6px;
        }
        
        .pulse-dot {
           width: 6px;
           height: 6px;
           background: #10b981;
           border-radius: 50%;
        }
        
        .timer-pill {
           background: #f3f4f6;
           color: #374151;
           font-size: 0.85rem;
           font-weight: 600;
           padding: 6px 12px;
           border-radius: 6px;
           display: flex;
           align-items: center;
           gap: 6px;
        }
        
        .end-session-btn {
           background: transparent;
           border: 1px solid #fca5a5;
           color: #ef4444;
           padding: 6px 14px;
           border-radius: 6px;
           font-size: 0.8rem;
           font-weight: 600;
           display: flex;
           align-items: center;
           gap: 6px;
           cursor: pointer;
           transition: all 0.2s;
        }
        
        .end-session-btn:hover {
           background: #fef2f2;
        }

        .agent-controls-center {
           flex: 1;
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: center;
           padding: 40px;
        }

        .mic-visualization-container {
           position: relative;
           width: 240px;
           height: 240px;
           display: flex;
           align-items: center;
           justify-content: center;
           margin-bottom: 40px;
        }

        .pulse-ring-outer, .pulse-ring-inner {
           position: absolute;
           border-radius: 50%;
           border: 1px solid #e5e7eb;
           transition: all 0.5s ease;
        }
        
        .pulse-ring-outer {
           width: 240px;
           height: 240px;
        }
        
        .pulse-ring-inner {
           width: 170px;
           height: 170px;
        }
        
        .mic-visualization-container.active .pulse-ring-outer {
           border-color: #d1fae5;
           background: #ecfdf5;
           animation: pulseOuter 2s infinite alternate;
        }
        
        .mic-visualization-container.active .pulse-ring-inner {
           border-color: #6ee7b7;
           background: #d1fae5;
           animation: pulseInner 1.5s infinite alternate;
        }

        @keyframes pulseOuter {
           0% { transform: scale(0.95); opacity: 0.7; }
           100% { transform: scale(1.05); opacity: 1; }
        }
        
        @keyframes pulseInner {
           0% { transform: scale(0.95); }
           100% { transform: scale(1.02); }
        }

        .central-mic-btn {
           position: relative;
           z-index: 10;
           width: 100px;
           height: 100px;
           border-radius: 50%;
           background: #ffffff;
           border: 1px solid #d1d5db;
           display: flex;
           align-items: center;
           justify-content: center;
           cursor: pointer;
           box-shadow: 0 4px 14px rgba(0,0,0,0.05);
           color: #374151;
           transition: all 0.3s;
        }
        
        .central-mic-btn:hover {
           transform: scale(1.05);
        }
        
        .central-mic-btn.listening {
           border-color: #10b981;
           color: #047857;
        }

        .listening-status {
           text-align: center;
           margin-bottom: 40px;
           min-height: 80px;
        }
        
        .listening-title {
           color: #047857;
           font-size: 1.1rem;
           font-weight: 600;
           margin-bottom: 6px;
        }
        
        .listening-desc {
           color: #6b7280;
           font-size: 0.9rem;
           margin-bottom: 16px;
        }
        
        .animated-waveform {
           display: flex;
           align-items: center;
           justify-content: center;
           gap: 4px;
        }
        
        .animated-waveform .dot {
           width: 4px;
           height: 4px;
           background: #047857;
           border-radius: 50%;
        }
        
        .animated-waveform .bar {
           width: 3px;
           height: 12px;
           background: #047857;
           border-radius: 2px;
        }

        .action-buttons {
           display: flex;
           gap: 16px;
        }
        
        .action-btn {
           display: flex;
           flex-direction: column;
           align-items: center;
           gap: 8px;
           background: #ffffff;
           border: 1px solid #e5e7eb;
           border-radius: 12px;
           padding: 12px 20px;
           cursor: pointer;
           color: #374151;
           font-size: 0.85rem;
           font-weight: 500;
           transition: all 0.2s;
           box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }
        
        .action-btn:hover:not(:disabled) {
           background: #f9fafb;
           border-color: #d1d5db;
        }
        
        .action-btn.active {
           background: #f3f4f6;
           color: #ef4444;
           border-color: #fca5a5;
        }

        .environment-banner {
           background: #f9fafb;
           border: 1px solid #f3f4f6;
           border-radius: 8px;
           padding: 10px 16px;
           display: flex;
           align-items: center;
           justify-content: center;
           gap: 8px;
           margin: 0 40px 24px;
           color: #6b7280;
           font-size: 0.8rem;
        }
        
        .banner-icon {
           color: #10b981;
        }
        
        .secure-footer {
           display: flex;
           align-items: center;
           justify-content: center;
           gap: 8px;
           margin-top: 24px;
           color: #6b7280;
           font-size: 0.85rem;
        }
        
        .secure-icon {
           color: #10b981;
        }

        /* Editorial SSB experience — shared visual language with adventure sports and CSD */
        .ssb-mentor-page {
          min-height: 100vh;
          background: var(--bg-app);
          color: var(--text-primary);
          font-family: var(--font-body) !important;
          padding-bottom: 80px;
          overflow: hidden;
        }

        .ssb-hero-section {
          min-height: 710px;
          padding: 72px 0 112px;
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        .ssb-hero-bg-wrapper {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }

        .ssb-hero-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .ssb-hero-overlay,
        .ssb-hero-vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .ssb-light-overlay {
          background: linear-gradient(90deg, rgba(243,246,244,0.98) 0%, rgba(243,246,244,0.9) 33%, rgba(243,246,244,0.42) 71%, rgba(243,246,244,0.12) 100%);
        }

        .ssb-dark-overlay {
          opacity: 0;
          background: linear-gradient(90deg, rgba(9,18,11,0.97) 0%, rgba(9,18,11,0.84) 38%, rgba(9,18,11,0.32) 100%);
        }

        .ssb-light-vignette {
          background: linear-gradient(180deg, rgba(255,255,255,0.1), transparent 36%, rgba(243,246,244,0.72) 100%);
        }

        .ssb-dark-vignette {
          opacity: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.16), transparent 36%, rgba(5,12,7,0.7) 100%);
        }

        [data-theme='dark'] .ssb-light-overlay,
        [data-theme='dark'] .ssb-light-vignette { opacity: 0; }
        [data-theme='dark'] .ssb-dark-overlay,
        [data-theme='dark'] .ssb-dark-vignette { opacity: 1; }

        .ssb-hero-content-inner {
          position: relative;
          z-index: 10;
          width: 100%;
          padding: 0;
        }

        .ssb-hero-text-block {
          max-width: 750px;
        }

        .ssb-back-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: var(--army-primary);
          font-family: var(--font-display);
          font-size: 0.8rem;
          font-weight: 800;
          margin-bottom: 20px;
          text-decoration: none;
        }

        [data-theme='dark'] .ssb-back-link { color: var(--gold-light); }
        .ssb-back-link:hover { transform: translateX(-3px); }

        .ssb-pre-heading { margin-bottom: 12px; }

        .ssb-section-label {
          display: inline-block;
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 900;
          letter-spacing: 0.16em;
          color: var(--army-primary);
          background: rgba(31,73,48,0.08);
          padding: 5px 12px;
          border: 1px solid rgba(31,73,48,0.15);
          border-radius: var(--radius-full);
        }

        [data-theme='dark'] .ssb-section-label {
          color: var(--gold-light);
          background: rgba(197,155,39,0.12);
          border-color: rgba(197,155,39,0.25);
        }

        .ssb-tricolor-badge {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 16px;
          color: var(--text-secondary);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .ssb-tricolor-badge .tricolor-bar-accent { width: 30px; height: 3px; }

        .ssb-hero-title {
          max-width: 720px;
          margin-bottom: 16px;
          color: var(--text-primary);
          font-family: var(--font-display) !important;
          font-size: clamp(2.7rem, 5vw, 4.3rem);
          font-weight: 900;
          line-height: 1.04;
          letter-spacing: -0.045em;
        }

        .ssb-title-highlight { color: var(--gold-dark); }
        [data-theme='dark'] .ssb-title-highlight { color: var(--gold-light); }

        .ssb-meta-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 0.86rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .text-gold { color: var(--gold-dark); }
        [data-theme='dark'] .text-gold { color: var(--gold-light); }

        .ssb-hero-desc {
          max-width: 650px;
          margin-bottom: 20px;
          color: var(--text-secondary);
          font-size: 1.02rem;
          line-height: 1.68;
        }

        .ssb-features-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 26px;
        }

        .ssb-mentor-page .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: var(--text-primary);
          font-size: 0.86rem;
          font-weight: 600;
          line-height: 1.5;
        }

        .ssb-mentor-page .feature-item.disclaimer {
          color: var(--text-muted);
          font-size: 0.78rem;
          font-weight: 500;
          font-style: normal;
        }

        .ssb-mentor-page .feature-icon { color: var(--army-primary); flex: 0 0 auto; margin-top: 2px; }
        [data-theme='dark'] .ssb-mentor-page .feature-icon { color: var(--gold-light); }
        .ssb-mentor-page .text-warning { color: var(--gold-dark) !important; }
        [data-theme='dark'] .ssb-mentor-page .text-warning { color: var(--gold-light) !important; }

        .ssb-quick-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(140px, 1fr));
          gap: 12px;
          max-width: 680px;
          margin-bottom: 26px;
        }

        .ssb-stat-card {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding: 10px 12px;
          background: rgba(255,255,255,0.78);
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: var(--radius-sm);
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        [data-theme='dark'] .ssb-stat-card { background: rgba(11,29,18,0.72); border-color: rgba(255,255,255,0.12); }
        .ssb-stat-card .stat-label { color: var(--text-muted); font-size: 0.66rem; font-weight: 800; letter-spacing: 0.06em; line-height: 1.25; text-transform: uppercase; }
        .ssb-stat-card .stat-val { color: var(--text-primary); font-size: 0.86rem; font-weight: 800; line-height: 1.25; }
        [data-theme='dark'] .ssb-stat-card .stat-label { color: #94a3b8; }
        [data-theme='dark'] .ssb-stat-card .stat-val { color: #f8fafc; }

        .ssb-hero-actions { display: flex; align-items: center; gap: 12px; }
        .ssb-outline-action { color: var(--text-primary); border: 1px solid var(--border-medium); background: rgba(255,255,255,0.54); }
        .ssb-outline-action:hover { border-color: var(--army-primary); background: var(--bg-surface); }
        [data-theme='dark'] .ssb-outline-action { color: #fff; border-color: rgba(255,255,255,0.24); background: rgba(11,29,18,0.48); }

        .ssb-hero-source { position: absolute; z-index: 20; left: max(24px, calc((100% - 1400px) / 2 + 24px)); bottom: 40px; color: var(--text-muted); font-size: 0.68rem; }

        .ssb-article-shell { max-width: 1120px; padding-top: 76px; }
        .ssb-article-intro { max-width: 760px; margin-bottom: 50px; }
        .ssb-section-tag { display: inline-block; margin-bottom: 12px; color: var(--gold-dark); font-size: 0.72rem; font-weight: 900; letter-spacing: 0.13em; text-transform: uppercase; }
        [data-theme='dark'] .ssb-section-tag { color: var(--gold-light); }
        .ssb-article-intro h2,
        .ssb-feature-copy h2,
        .ssb-section-heading h2,
        .ssb-reference-panel h2 {
          color: var(--text-primary);
          font-family: var(--font-display);
          font-weight: 900;
          letter-spacing: -0.04em;
        }
        .ssb-article-intro h2 { font-size: clamp(2rem, 4vw, 3.4rem); line-height: 1.08; margin-bottom: 16px; }
        .ssb-article-intro p { color: var(--text-secondary); font-size: 1rem; line-height: 1.7; }

        .ssb-feature-layout { display: grid; grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr); gap: 42px; align-items: center; margin-bottom: 88px; }
        .ssb-feature-visual { min-height: 410px; display: flex; flex-direction: column; justify-content: flex-end; gap: 14px; padding: 30px; border-radius: var(--radius-lg); color: #fff; background: linear-gradient(180deg, rgba(8,20,12,0.08), rgba(8,20,12,0.88)), url('/assets/ssb_interview_bg.jpg') center / cover; box-shadow: var(--shadow-floating); }
        .ssb-feature-visual > span { color: var(--gold-light); font-size: 0.72rem; font-weight: 900; letter-spacing: 0.13em; }
        .ssb-feature-visual > strong { font-family: var(--font-display); font-size: clamp(1.9rem, 3vw, 2.8rem); line-height: 1.05; letter-spacing: -0.045em; }
        .ssb-feature-visual > small { color: rgba(255,255,255,0.72); font-size: 0.66rem; font-weight: 700; letter-spacing: 0.12em; }
        .ssb-feature-copy { padding-right: 14px; }
        .ssb-feature-copy h2 { font-size: clamp(1.8rem, 3vw, 2.65rem); line-height: 1.1; margin-bottom: 16px; }
        .ssb-feature-copy p { color: var(--text-secondary); font-size: 0.95rem; line-height: 1.75; }

        .ssb-dimensions-section,
        .ssb-journey-section { margin-bottom: 84px; }
        .ssb-section-heading { display: flex; align-items: end; justify-content: space-between; gap: 28px; margin-bottom: 26px; }
        .ssb-kicker { display: inline-block; margin-bottom: 12px; color: var(--gold-dark); font-size: 0.72rem; font-weight: 900; letter-spacing: 0.13em; text-transform: uppercase; }
        [data-theme='dark'] .ssb-kicker { color: var(--gold-light); }
        .ssb-section-heading h2 { max-width: 650px; font-size: clamp(1.65rem, 3vw, 2.35rem); line-height: 1.1; }
        .ssb-section-heading > p { max-width: 315px; color: var(--text-secondary); font-size: 0.86rem; line-height: 1.6; }
        .ssb-dimensions-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .ssb-dimension-card,
        .ssb-journey-card { min-width: 0; padding: 22px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); box-shadow: 0 10px 26px rgba(27,60,36,0.05); }
        .ssb-dimension-card > span { color: var(--gold-dark); font-size: 0.68rem; font-weight: 900; letter-spacing: 0.12em; }
        [data-theme='dark'] .ssb-dimension-card > span { color: var(--gold-light); }
        .ssb-dimension-card h3,
        .ssb-journey-card h3 { color: var(--text-primary); font-family: var(--font-display); font-size: 1.05rem; font-weight: 800; line-height: 1.2; margin: 12px 0 8px; }
        .ssb-dimension-card p,
        .ssb-journey-card p { color: var(--text-secondary); font-size: 0.8rem; line-height: 1.6; }

        .ssb-main-header { max-width: 1120px; margin: 0 auto 26px; padding: 0; text-align: left; }
        .ssb-main-header h2 { color: var(--text-primary); font-family: var(--font-display); font-size: clamp(1.65rem, 3vw, 2.35rem); font-weight: 900; letter-spacing: -0.04em; line-height: 1.1; margin-bottom: 8px; }
        .ssb-main-header p { color: var(--text-secondary); font-size: 0.86rem; line-height: 1.6; }
        .ssb-main-section { position: relative; z-index: 1; padding-bottom: 84px; }
        .ssb-main-section > .container { max-width: 1120px !important; padding: 0 !important; }

        .ssb-interactive-layout { display: grid; grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr); gap: 18px; min-height: 0; background: transparent; border: 0; box-shadow: none; overflow: visible; }
        .ssb-transcript-panel,
        .ssb-agent-panel { min-width: 0; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); background: var(--bg-surface); box-shadow: 0 10px 26px rgba(27,60,36,0.05); }
        .ssb-transcript-panel { min-height: 610px; padding: 24px; background: var(--bg-surface-subtle); border-right: 1px solid var(--border-subtle); }
        .ssb-agent-panel { min-height: 610px; }
        .transcript-header { border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px; margin-bottom: 20px; }
        .agent-profile { min-width: 0; }
        .agent-title { color: var(--text-primary); font-family: var(--font-display); font-size: 0.95rem; font-weight: 800; }
        .agent-badge { color: var(--army-primary); background: var(--army-tint); border: 1px solid var(--border-subtle); }
        [data-theme='dark'] .agent-badge { color: var(--gold-light); background: rgba(197,155,39,0.12); border-color: rgba(197,155,39,0.25); }
        .transcript-messages { scrollbar-width: thin; scrollbar-color: var(--border-medium) transparent; }
        .message-bubble { max-width: 92%; }
        .message-content { padding: 16px; }
        .message-bubble.agent .message-content { background: var(--bg-surface); border-color: var(--border-subtle); box-shadow: var(--shadow-sm); }
        .message-bubble.user .message-content { background: var(--gold-pale); border-color: rgba(197,155,39,0.25); }
        [data-theme='dark'] .message-bubble.user .message-content { background: rgba(197,155,39,0.12); border-color: rgba(229,190,89,0.25); }
        .agent-name { color: var(--army-primary); }
        .user-name { color: var(--gold-dark); }
        [data-theme='dark'] .agent-name { color: #9fc5a6; }
        [data-theme='dark'] .user-name { color: var(--gold-light); }
        .message-content p { color: var(--text-secondary); font-size: 0.86rem; line-height: 1.65; }
        .timestamp { color: var(--text-muted); }
        .read-receipt { color: var(--army-primary); }
        [data-theme='dark'] .read-receipt { color: var(--gold-light); }
        .audio-wave-mini .wave-bar { background: var(--army-primary); }
        [data-theme='dark'] .audio-wave-mini .wave-bar { background: var(--gold-light); }

        .input-wrapper { background: var(--bg-surface); border-color: var(--border-subtle); box-shadow: var(--shadow-sm); }
        .mic-icon-wrapper { color: var(--text-muted); }
        .transcript-input-area input { color: var(--text-primary); font-family: var(--font-body); font-size: 0.86rem; }
        .transcript-input-area input::placeholder { color: var(--text-muted); }
        .btn-send { color: var(--text-inverse); background: var(--army-primary); }
        .btn-send:hover:not(:disabled) { background: var(--army-forest); }
        [data-theme='dark'] .btn-send { color: #0c150e; background: var(--gold-primary); }

        .ssb-agent-panel { background: var(--bg-surface); }
        .agent-controls-top { padding: 24px; border-bottom: 1px solid var(--border-subtle); }
        .active-pill { color: #fff; background: var(--army-primary); }
        [data-theme='dark'] .active-pill { color: #0c150e; background: var(--gold-primary); }
        .timer-pill { color: var(--text-secondary); background: var(--bg-surface-subtle); border: 1px solid var(--border-subtle); }
        .end-session-btn { border-color: rgba(239,68,68,0.4); color: #dc2626; }
        [data-theme='dark'] .end-session-btn { color: #fca5a5; border-color: rgba(252,165,165,0.32); }
        .end-session-btn:hover { background: rgba(239,68,68,0.08); }
        .agent-controls-center { padding: 40px; }
        .pulse-ring-outer, .pulse-ring-inner { border-color: var(--border-medium); }
        .mic-visualization-container.active .pulse-ring-outer { border-color: rgba(31,73,48,0.24); background: rgba(234,243,237,0.72); }
        .mic-visualization-container.active .pulse-ring-inner { border-color: rgba(67,129,87,0.46); background: rgba(234,243,237,0.92); }
        [data-theme='dark'] .mic-visualization-container.active .pulse-ring-outer { border-color: rgba(229,190,89,0.25); background: rgba(31,73,48,0.24); }
        [data-theme='dark'] .mic-visualization-container.active .pulse-ring-inner { border-color: rgba(229,190,89,0.42); background: rgba(31,73,48,0.38); }
        .central-mic-btn { color: var(--text-primary); background: var(--bg-surface); border-color: var(--border-medium); box-shadow: var(--shadow-md); }
        .central-mic-btn.listening { color: var(--army-primary); border-color: var(--army-medium); }
        [data-theme='dark'] .central-mic-btn { color: #fff; background: var(--bg-surface-elevated); border-color: var(--border-dark); }
        [data-theme='dark'] .central-mic-btn.listening { color: var(--gold-light); border-color: var(--gold-primary); }
        .listening-title { color: var(--army-primary); font-family: var(--font-display); }
        [data-theme='dark'] .listening-title { color: var(--gold-light); }
        .listening-desc { color: var(--text-secondary); }
        .animated-waveform .dot, .animated-waveform .bar { background: var(--army-primary); }
        [data-theme='dark'] .animated-waveform .dot, [data-theme='dark'] .animated-waveform .bar { background: var(--gold-light); }
        .action-btn { color: var(--text-secondary); background: var(--bg-surface); border-color: var(--border-subtle); box-shadow: var(--shadow-sm); }
        .action-btn:hover:not(:disabled) { color: var(--text-primary); background: var(--bg-surface-subtle); border-color: var(--border-medium); }
        .action-btn.active { color: #dc2626; background: rgba(239,68,68,0.08); border-color: rgba(239,68,68,0.35); }
        [data-theme='dark'] .action-btn { color: var(--text-secondary); background: var(--bg-surface-elevated); border-color: var(--border-subtle); }
        [data-theme='dark'] .action-btn.active { color: #fca5a5; background: rgba(239,68,68,0.12); border-color: rgba(252,165,165,0.32); }
        .environment-banner { color: var(--text-secondary); background: var(--bg-surface-subtle); border-color: var(--border-subtle); }
        .banner-icon, .secure-icon { color: var(--army-primary); }
        [data-theme='dark'] .banner-icon, [data-theme='dark'] .secure-icon { color: var(--gold-light); }
        .secure-footer { color: var(--text-muted); }

        .ssb-journey-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .ssb-journey-card > strong { color: var(--gold-dark); font-family: var(--font-display); font-size: 1.5rem; }
        [data-theme='dark'] .ssb-journey-card > strong { color: var(--gold-light); }
        .ssb-reference-panel { display: grid; grid-template-columns: 1fr 0.9fr; gap: 36px; padding: 28px; margin-bottom: 30px; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); background: linear-gradient(135deg, rgba(247,249,248,0.86), rgba(255,255,255,0.68)); }
        [data-theme='dark'] .ssb-reference-panel { background: rgba(19,34,23,0.72); }
        .ssb-reference-panel h2 { font-size: 1.65rem; line-height: 1.12; margin-bottom: 10px; }
        .ssb-reference-panel p { color: var(--text-secondary); font-size: 0.82rem; line-height: 1.6; }
        .ssb-reference-links { display: grid; align-content: center; gap: 10px; }
        .ssb-reference-links a { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 14px; color: var(--army-primary); background: rgba(255,255,255,0.62); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); font-size: 0.75rem; font-weight: 800; text-decoration: none; }
        [data-theme='dark'] .ssb-reference-links a { color: var(--gold-light); background: rgba(0,0,0,0.2); }
        .ssb-reference-links a:hover { border-color: var(--gold-primary); }
        .ssb-bottom-cta { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 24px; border: 1.5px solid rgba(226,232,240,0.9); border-radius: var(--radius-md); background: rgba(244,247,245,0.86); }
        [data-theme='dark'] .ssb-bottom-cta { background: rgba(0,0,0,0.3); border-color: rgba(255,255,255,0.08); }
        .ssb-bottom-cta h3 { color: var(--text-primary); font-family: var(--font-display); font-size: 1.18rem; margin-bottom: 4px; }
        .ssb-bottom-cta p { color: var(--text-secondary); font-size: 0.78rem; }

        @media (max-width: 900px) {
          .ssb-feature-layout,
          .ssb-reference-panel { grid-template-columns: 1fr; }
          .ssb-dimensions-grid,
          .ssb-journey-grid { grid-template-columns: 1fr; }
          .ssb-interactive-layout { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
};

export default SSBMentorPage;
