import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Calendar,
  Bot,
  Search,
  Send,
  Sparkles,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const AI_PROMPTS = [
  'Can I join the Army after Class 10?',
  'Which officer entry suits a B.Tech graduate?',
  'What are the Agniveer age requirements?',
  'How do I prepare for the physical fitness test?',
  'When can I download my admit card?'
];

const HeroSection = () => {
  const { setIsVeerAIOpen } = useApp();
  const [promptIndex, setPromptIndex] = useState(0);

  useEffect(() => {
    const promptTimer = window.setInterval(() => {
      setPromptIndex((current) => (current + 1) % AI_PROMPTS.length);
    }, 3600);

    return () => window.clearInterval(promptTimer);
  }, []);

  return (
    <section className="hero-container" aria-label="Hero Introduction">
      {/* Background Image with Dual Light/Dark Modes */}
      <div className="hero-background-wrapper">
        <img
          src="/assets/Hero2.png"
          alt="Indian Army Passing Out Parade with Sword of Honour cadet"
          className="hero-bg-img light-img"
          fetchPriority="high"
        />
        <img
          src="/assets/hero-army-visible.png"
          alt="Indian Army soldiers patrolling in Himalayan snow mountains at sunrise"
          className="hero-bg-img dark-img"
          fetchPriority="high"
        />
        <div className="hero-overlay-gradient light-overlay" />
        <div className="hero-overlay-gradient dark-overlay" />
        <div className="hero-vignette light-vignette" />
        <div className="hero-vignette dark-vignette" />
      </div>

      <div className="container hero-content-relative">
        <div className="hero-main-layout">
          {/* Left Editorial Text Column */}
          <div className="hero-text-column">
            {/* Tricolor Indicator Line */}
            <div className="hero-tricolor-badge">
              <span className="tricolor-bar-accent" />
              <span className="hero-tagline-text">SERVICE BEFORE SELF</span>
            </div>

            {/* Huge Display Heading */}
            <h1 className="hero-main-title">
              BE A PART OF <br />
              <span className="title-highlight">SOMETHING</span> GREATER
            </h1>

            {/* Subtitle */}
            <p className="hero-subtext">
              Join the Indian Army and become a part of a proud legacy of courage, sacrifice, and leadership.
            </p>

            {/* Dual CTAs */}
            <div className="hero-actions-group">
              <Link to="/find-entry" className="btn btn-primary btn-lg hero-cta-apply">
                <span>Apply Now</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/calendar" className="btn hero-cta-rally">
                <span>Upcoming Rallies</span>
                <Calendar size={18} />
              </Link>
            </div>

            <div className="hero-ai-assistant">
              <div
                className="ai-search-form"
                onClick={() => setIsVeerAIOpen(true)}
                style={{ cursor: 'pointer' }}
              >
                <div className="ai-search-frame">
                  <div className="ai-search-surface">
                    <div className="ai-search-mark" aria-hidden="true">
                      <Sparkles size={17} />
                    </div>
                    <div className="ai-search-input-wrap">
                      <span key={promptIndex} className="ai-search-prompt" aria-hidden="true">
                        {AI_PROMPTS[promptIndex]}
                      </span>
                      <input
                        type="text"
                        readOnly
                        aria-label="Ask Veer AI a recruitment question"
                        placeholder=""
                      />
                    </div>
                    <button type="button" className="ai-search-submit" aria-label="Ask Veer AI">
                      <Search size={17} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="ai-search-caption">
                <span>Powered by Veer AI. May make mistakes.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Intact Side Quick Entry Dock - Pinned to Section Edge */}
      <aside className="hero-side-dock-container" aria-label="Quick Access Recruitment Categories">
        <div className="side-dock-panel">
          <Link to="/opportunities/officers-entry" className="side-dock-tab" id="dock-officer">
            <div className="side-dock-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="7" r="4" />
                <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                <path d="M12 11v7" />
                <path d="M9.5 14.5h5" />
              </svg>
            </div>
            <span className="side-dock-text">Officer Entry</span>
          </Link>

          <Link to="/opportunities/jco-or-enrolment" className="side-dock-tab" id="dock-jco">
            <div className="side-dock-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 7 12 2 20 7" />
                <polyline points="4 13 12 8 20 13" />
                <polyline points="4 19 12 14 20 19" />
              </svg>
            </div>
            <span className="side-dock-text">JCO / OR<br />Enrolment</span>
          </Link>

          <Link to="/opportunities/agnipath-scheme" className="side-dock-tab" id="dock-agnipath">
            <div className="side-dock-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z" />
                <path d="M12 14c0 1.66-1.34 3-3 3" />
              </svg>
            </div>
            <span className="side-dock-text">Agnipath</span>
          </Link>

          <Link to="/opportunities/territorial-army" className="side-dock-tab" id="dock-ta">
            <div className="side-dock-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M12 2v20" />
              </svg>
            </div>
            <span className="side-dock-text">Territorial Army</span>
          </Link>
        </div>
      </aside>

      <style>{`
        .hero-container {
          position: relative;
          min-height: 640px;
          display: flex;
          align-items: center;
          background-color: #f8fafc;
          overflow: hidden;
          padding: 50px 0 70px;
        }

        [data-theme='dark'] .hero-container {
          background-color: #0b140e;
        }

        .hero-background-wrapper {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .hero-bg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.02);
          opacity: 0;
          filter: saturate(0.92) brightness(0.98);
          transition:
            opacity 720ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 720ms ease;
          will-change: opacity, transform, filter;
        }

        .hero-bg-img.light-img {
          opacity: 1;
          object-position: center 25%;
        }

        .hero-bg-img.dark-img {
          object-position: center 25%;
          transform: scale(1.06);
        }

        [data-theme='dark'] .hero-bg-img.light-img {
          opacity: 0;
          transform: scale(1.06);
          filter: saturate(0.82) brightness(0.76);
        }

        [data-theme='dark'] .hero-bg-img.dark-img {
          opacity: 1;
          transform: scale(1.02);
          filter: saturate(1.02) brightness(1);
        }

        /* Light Mode Gradient Overlay for Hero2.png */
        .hero-overlay-gradient {
          position: absolute;
          inset: 0;
          transition: opacity 720ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity;
        }

        .hero-overlay-gradient.light-overlay {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.97) 0%,
            rgba(255, 255, 255, 0.92) 36%,
            rgba(255, 255, 255, 0.72) 58%,
            rgba(255, 255, 255, 0.25) 80%,
            rgba(255, 255, 255, 0.05) 100%
          );
        }

        .hero-overlay-gradient.dark-overlay {
          background: linear-gradient(
            90deg,
            rgba(8, 14, 9, 0.90) 0%,
            rgba(8, 14, 9, 0.75) 45%,
            rgba(8, 14, 9, 0.25) 75%,
            rgba(8, 14, 9, 0.45) 100%
          );
          opacity: 0;
        }

        [data-theme='dark'] .hero-overlay-gradient.light-overlay {
          opacity: 0;
        }

        [data-theme='dark'] .hero-overlay-gradient.dark-overlay {
          opacity: 1;
        }

        .hero-vignette {
          position: absolute;
          inset: 0;
          transition: opacity 720ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity;
        }

        .hero-vignette.light-vignette {
          background: radial-gradient(
            circle at 30% 50%,
            transparent 0%,
            rgba(0, 0, 0, 0.04) 100%
          );
        }

        .hero-vignette.dark-vignette {
          background: radial-gradient(
            circle at 30% 50%,
            transparent 0%,
            rgba(0, 0, 0, 0.4) 100%
          );
          opacity: 0;
        }

        [data-theme='dark'] .hero-vignette.light-vignette {
          opacity: 0;
        }

        [data-theme='dark'] .hero-vignette.dark-vignette {
          opacity: 1;
        }

        .hero-content-relative {
          position: relative;
          z-index: 10;
          width: 100%;
          padding-right: 125px;
        }

        .hero-main-layout {
          display: flex;
          align-items: center;
        }

        /* Left Column */
        .hero-text-column {
          max-width: 720px;
          display: flex;
          flex-direction: column;
        }

        .hero-tricolor-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .tricolor-bar-accent {
          width: 28px;
          height: 4px;
          background: linear-gradient(90deg, #ff671f 0%, #ff9933 45%, #138808 100%);
          border-radius: 2px;
          box-shadow: 0 1px 3px rgba(255, 103, 31, 0.3);
        }

        [data-theme='dark'] .tricolor-bar-accent {
          background: linear-gradient(90deg, #ff7a1a 0%, #ffa500 45%, #4ade80 100%);
        }

        .hero-tagline-text {
          font-family: var(--font-display);
          font-size: 0.875rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: var(--army-primary);
          text-transform: uppercase;
        }

        [data-theme='dark'] .hero-tagline-text {
          color: var(--gold-light);
        }

        .hero-main-title {
          font-family: var(--font-display);
          font-size: 3.6rem;
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #122016;
          margin-bottom: 16px;
        }

        [data-theme='dark'] .hero-main-title {
          color: #ffffff;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }

        .title-highlight {
          display: inline-block;
          background: linear-gradient(125deg, #5c2b12 0%, #4a381e 35%, #243f2c 70%, #122016 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        [data-theme='dark'] .title-highlight {
          display: inline-block;
          background: linear-gradient(125deg, #d97706 0%, #cbd5e1 45%, #86efac 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtext {
          font-size: 1.125rem;
          color: #334155;
          line-height: 1.5;
          max-width: 580px;
          margin-bottom: 28px;
          font-weight: 500;
        }

        [data-theme='dark'] .hero-subtext {
          color: #e2e8f0;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .hero-actions-group {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 36px;
          flex-wrap: wrap;
        }

        .hero-cta-apply {
          background-color: var(--army-primary);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 24px rgba(27, 48, 34, 0.25);
        }

        .hero-cta-apply:hover {
          background-color: var(--army-forest);
          box-shadow: 0 12px 28px rgba(27, 48, 34, 0.35);
        }

        .hero-cta-rally {
          background: rgba(255, 255, 255, 0.92);
          color: #1e293b;
          border: 1.5px solid rgba(27, 48, 34, 0.25);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 12px 24px;
          border-radius: var(--radius-sm);
          font-weight: 700;
          font-size: 0.9375rem;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
          transition: all var(--transition-fast);
        }

        .hero-cta-rally:hover {
          background: #ffffff;
          color: var(--army-primary);
          border-color: var(--army-primary);
          box-shadow: 0 8px 24px rgba(27, 48, 34, 0.15);
        }

        [data-theme='dark'] .hero-cta-rally {
          background: transparent;
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.6);
        }

        [data-theme='dark'] .hero-cta-rally:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
          border-color: #ffffff;
        }

        /* Ask Army AI */
        .hero-ai-assistant {
          width: min(680px, 100%);
          position: relative;
        }

        .ai-search-frame {
          padding: 1px;
          border-radius: 14px;
          background: linear-gradient(100deg, rgba(255, 103, 31, 0.9), rgba(255, 255, 255, 0.5), rgba(19, 136, 8, 0.85), rgba(0, 0, 128, 0.65), rgba(255, 103, 31, 0.9));
          background-size: 260% 100%;
          box-shadow: 0 10px 28px rgba(18, 48, 29, 0.14), 0 0 18px rgba(255, 153, 51, 0.09);
          animation: tricolorFlow 9s linear infinite;
        }

        .ai-search-surface {
          min-height: 58px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 7px 8px 7px 12px;
          border-radius: 13px;
          background: rgba(255, 255, 255, 0.78);
          backdrop-filter: blur(20px) saturate(170%);
          -webkit-backdrop-filter: blur(20px) saturate(170%);
        }

        [data-theme='dark'] .ai-search-surface {
          background: rgba(11, 29, 18, 0.78);
        }

        @keyframes tricolorFlow {
          from { background-position: 0% 50%; }
          to { background-position: 260% 50%; }
        }

        .ai-search-mark {
          display: grid;
          place-items: center;
          width: 32px;
          height: 32px;
          flex-shrink: 0;
          color: var(--gold-dark);
          background: rgba(197, 155, 39, 0.12);
          border-radius: 10px;
        }

        [data-theme='dark'] .ai-search-mark {
          color: var(--gold-light);
          background: rgba(229, 190, 89, 0.12);
        }

        .ai-search-input-wrap {
          position: relative;
          flex: 1;
          min-width: 0;
        }

        .ai-search-input-wrap input {
          width: 100%;
          height: 38px;
          padding: 0;
          border: 0;
          outline: 0;
          background: transparent;
          color: var(--text-primary);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .ai-search-prompt {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          overflow: hidden;
          color: var(--text-muted);
          font-size: 0.875rem;
          font-weight: 500;
          pointer-events: none;
          animation: aiPromptIn 500ms cubic-bezier(0.22, 1, 0.36, 1);
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        @keyframes aiPromptIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .ai-search-submit {
          display: grid;
          place-items: center;
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          border-radius: 10px;
          background: var(--army-primary);
          color: #ffffff;
          box-shadow: 0 5px 12px rgba(31, 73, 48, 0.2);
        }

        .ai-search-submit:hover {
          background: var(--army-forest);
        }

        [data-theme='dark'] .ai-search-submit {
          color: #132019;
          background: var(--gold-primary);
          box-shadow: 0 5px 14px rgba(197, 155, 39, 0.2);
        }

        .ai-search-caption {
          display: flex;
          align-items: center;
          gap: 7px;
          margin: 9px 0 0 12px;
          color: var(--text-secondary);
          font-size: 0.72rem;
          font-weight: 600;
        }

        [data-theme='dark'] .ai-search-caption {
          color: #d7e4da;
        }

        .army-ai-message-icon {
          color: var(--gold-dark);
          flex-shrink: 0;
          margin-top: 1px;
        }

        [data-theme='dark'] .army-ai-message-icon {
          color: var(--gold-light);
        }

        .army-ai-suggestions {
          display: flex;
          gap: 6px;
          padding: 0 14px 12px;
          overflow-x: auto;
        }

        .army-ai-suggestions button {
          flex: 0 0 auto;
          padding: 5px 8px;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.38);
          font-size: 0.66rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .army-ai-suggestions button:hover {
          color: var(--army-primary);
          border-color: rgba(31, 73, 48, 0.3);
          background: rgba(31, 73, 48, 0.06);
        }

        [data-theme='dark'] .army-ai-suggestions button {
          color: #d8e3da;
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.12);
        }

        [data-theme='dark'] .army-ai-suggestions button:hover {
          color: #ffffff;
          background: rgba(229, 190, 89, 0.12);
          border-color: rgba(229, 190, 89, 0.36);
        }

        .army-ai-composer {
          display: flex;
          align-items: center;
          gap: 7px;
          margin: 0 14px;
          padding: 5px 5px 5px 11px;
          border: 1px solid var(--border-medium);
          border-radius: 11px;
          background: rgba(255, 255, 255, 0.52);
        }

        [data-theme='dark'] .army-ai-composer {
          background: rgba(0, 0, 0, 0.16);
          border-color: rgba(255, 255, 255, 0.16);
        }

        .army-ai-composer input {
          flex: 1;
          min-width: 0;
          border: 0;
          outline: 0;
          background: transparent;
          color: var(--text-primary);
          font-size: 0.76rem;
        }

        /* Right Intact Side Dock pinned to right edge of hero section */
        .hero-side-dock-container {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          z-index: 25;
        }

        .side-dock-panel {
          display: flex;
          flex-direction: column;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(20px) saturate(190%);
          -webkit-backdrop-filter: blur(20px) saturate(190%);
          border-top-left-radius: 12px;
          border-bottom-left-radius: 12px;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          border: 1px solid rgba(255, 255, 255, 0.95);
          border-right: none;
          box-shadow: -8px 16px 36px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.9);
          overflow: hidden;
          width: 108px;
        }

        [data-theme='dark'] .side-dock-panel {
          background: rgba(26, 48, 33, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-right: none;
          box-shadow: -8px 16px 32px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.25), inset 1px 0 1px rgba(255, 255, 255, 0.15);
        }

        .side-dock-tab {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 13px 6px;
          color: #334155;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          background: transparent;
          gap: 5px;
        }

        [data-theme='dark'] .side-dock-tab {
          color: #ffffff;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        }

        .side-dock-tab:last-child {
          border-bottom: none;
        }

        .side-dock-tab:hover {
          background-color: rgba(37, 68, 48, 0.08);
          color: var(--army-primary);
        }

        [data-theme='dark'] .side-dock-tab:hover {
          background-color: rgba(255, 255, 255, 0.14);
          color: #ffffff;
        }

        .side-dock-tab:hover .side-dock-icon {
          transform: translateY(-1.5px) scale(1.05);
        }

        .side-dock-icon {
          color: var(--army-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
          filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.12));
        }

        [data-theme='dark'] .side-dock-icon {
          color: #ffffff;
          filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.35));
        }

        .side-dock-text {
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 700;
          line-height: 1.2;
          color: #1e293b;
          letter-spacing: 0.01em;
        }

        [data-theme='dark'] .side-dock-text {
          color: #ffffff;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-bg-img,
          .hero-overlay-gradient,
          .hero-vignette,
          .ai-search-frame,
          .ai-search-prompt {
            transition-duration: 1ms;
            animation-duration: 1ms;
            animation-iteration-count: 1;
          }
        }

        @media (max-width: 1200px) {
          .hero-main-title {
            font-size: 3.1rem;
          }
          .hero-text-column {
            max-width: 540px;
          }
        }

        @media (max-width: 992px) {
          .hero-container {
            padding: 40px 0 40px;
            min-height: auto;
            flex-direction: column;
            align-items: stretch;
          }
          .hero-content-relative {
            padding-right: 0;
          }
          .hero-side-dock-container {
            position: static;
            transform: none;
            margin-top: 24px;
            width: 100%;
          }
          .side-dock-panel {
            width: 100%;
            flex-direction: row;
            border-radius: var(--radius-md);
            border-right: 1px solid rgba(255, 255, 255, 0.18);
          }
          .side-dock-tab {
            flex: 1;
            border-bottom: none;
            border-right: 1px solid rgba(0, 0, 0, 0.06);
            padding: 10px 4px;
          }
          [data-theme='dark'] .side-dock-tab {
            border-right: 1px solid rgba(255, 255, 255, 0.12);
          }
          .side-dock-tab:last-child {
            border-right: none;
          }
          .hero-main-title {
            font-size: 2.5rem;
          }
          .hero-ai-assistant {
            width: min(680px, 100%);
          }
        }

        @media (max-width: 640px) {
          .hero-main-title {
            font-size: 2.2rem;
          }
          .hero-subtext {
            font-size: 0.95rem;
          }
          .ai-search-surface {
            min-height: 54px;
          }
          .side-dock-panel {
            flex-wrap: wrap;
          }
          .side-dock-tab {
            flex: 1 1 50%;
            border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          }
          [data-theme='dark'] .side-dock-tab {
            border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
