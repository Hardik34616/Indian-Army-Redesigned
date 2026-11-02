import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Eye, Sun, Moon, Volume2, Globe } from 'lucide-react';

const AccessibilityBar = () => {
  const {
    fontSize,
    setFontSize,
    theme,
    setTheme,
    contrast,
    setContrast,
    language,
    setLanguage,
    screenReaderActive,
    setScreenReaderActive,
    addToast
  } = useApp();

  const [fontIndicator, setFontIndicator] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
  const fontTrackRef = useRef(null);
  const fontBtnsRef = useRef({});

  const updateFontIndicator = () => {
    const currentBtn = fontBtnsRef.current[fontSize];
    const track = fontTrackRef.current;
    if (currentBtn && track) {
      setFontIndicator({
        left: currentBtn.offsetLeft,
        top: currentBtn.offsetTop,
        width: currentBtn.offsetWidth,
        height: currentBtn.offsetHeight,
        opacity: 1
      });
    }
  };

  useEffect(() => {
    updateFontIndicator();
    const timer = setTimeout(updateFontIndicator, 50);
    window.addEventListener('resize', updateFontIndicator);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateFontIndicator);
    };
  }, [fontSize]);

  const toggleScreenReader = () => {
    const nextState = !screenReaderActive;
    setScreenReaderActive(nextState);
    if (nextState) {
      addToast('Screen Reader Assist mode enabled. ARIA live region activated.', 'info');
      // Speak test announcement if supported
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('Screen reader assistance active on Join Indian Army recruitment portal.');
        window.speechSynthesis.speak(utterance);
      }
    } else {
      addToast('Screen Reader Assist mode disabled.', 'info');
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  const toggleContrast = () => {
    const nextContrast = contrast === 'normal' ? 'high' : 'normal';
    setContrast(nextContrast);
    addToast(`High contrast mode ${nextContrast === 'high' ? 'enabled' : 'disabled'}`, 'info');
  };

  return (
    <aside className="accessibility-bar" aria-label="Accessibility and Utility Tools">
      <a href="#main-content" className="skip-link">
        Skip to Main Content
      </a>
      <div className="container">
        <div className="a11y-inner">
          <div className="a11y-left">
            <a href="#main-content" className="a11y-text-link">
              Skip to Main Content
            </a>
            <span className="a11y-divider" aria-hidden="true">|</span>
            <button
              type="button"
              className={`a11y-action-btn ${screenReaderActive ? 'active' : ''}`}
              onClick={toggleScreenReader}
              aria-pressed={screenReaderActive}
              title="Toggle Screen Reader Optimized Mode"
            >
              <Volume2 size={13} aria-hidden="true" />
              <span>Screen Reader Access</span>
            </button>
          </div>

          <div className="a11y-right">
            {/* Font Scaling Controls */}
            <div className="a11y-font-group" role="group" aria-label="Text Size Controls" ref={fontTrackRef}>
              {/* Sliding Liquid Glass Indicator */}
              <div
                className="sliding-glass-font-pill"
                style={{
                  transform: `translate3d(${fontIndicator.left}px, ${fontIndicator.top}px, 0)`,
                  width: `${fontIndicator.width}px`,
                  height: `${fontIndicator.height}px`,
                  opacity: fontIndicator.opacity
                }}
                aria-hidden="true"
              />

              <button
                ref={(el) => (fontBtnsRef.current['small'] = el)}
                type="button"
                className={`font-btn ${fontSize === 'small' ? 'active' : ''}`}
                onClick={() => setFontSize('small')}
                aria-label="Decrease text size"
                title="Small Font (A-)"
              >
                A-
              </button>
              <button
                ref={(el) => (fontBtnsRef.current['normal'] = el)}
                type="button"
                className={`font-btn ${fontSize === 'normal' ? 'active' : ''}`}
                onClick={() => setFontSize('normal')}
                aria-label="Default text size"
                title="Normal Font (A)"
              >
                A
              </button>
              <button
                ref={(el) => (fontBtnsRef.current['large'] = el)}
                type="button"
                className={`font-btn ${fontSize === 'large' ? 'active' : ''}`}
                onClick={() => setFontSize('large')}
                aria-label="Increase text size"
                title="Large Font (A+)"
              >
                A+
              </button>
            </div>

            <span className="a11y-divider" aria-hidden="true">|</span>

            {/* Contrast / Theme Toggle */}
            <div className="a11y-theme-group">
              <button
                type="button"
                className="a11y-icon-btn"
                onClick={toggleTheme}
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                aria-label="Toggle Dark Mode"
              >
                {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
              </button>
              <button
                type="button"
                className={`a11y-icon-btn ${contrast === 'high' ? 'active' : ''}`}
                onClick={toggleContrast}
                title="Toggle High Contrast Mode"
                aria-label="Toggle High Contrast Mode"
              >
                <Eye size={14} />
              </button>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .accessibility-bar {
          background-color: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          color: var(--text-primary);
          font-size: 0.75rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          position: relative;
          z-index: 1000;
        }

        [data-theme='dark'] .accessibility-bar {
          background-color: rgba(11, 29, 18, 0.85);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          color: #e2e8f0;
        }

        .a11y-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 0;
          min-height: 32px;
        }

        .a11y-left, .a11y-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .a11y-text-link {
          color: #475569;
          font-size: 0.75rem;
          transition: color var(--transition-fast);
        }

        [data-theme='dark'] .a11y-text-link {
          color: #94a3b8;
        }

        .a11y-text-link:hover {
          color: var(--army-primary);
        }

        [data-theme='dark'] .a11y-text-link:hover {
          color: #ffffff;
        }

        .a11y-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #475569;
          font-size: 0.75rem;
          padding: 2px 6px;
          border-radius: var(--radius-xs);
          transition: all var(--transition-fast);
        }

        [data-theme='dark'] .a11y-action-btn {
          color: #cbd5e1;
        }

        .a11y-action-btn:hover {
          color: var(--army-primary);
          background: rgba(31, 73, 48, 0.08);
        }

        [data-theme='dark'] .a11y-action-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
        }

        .a11y-action-btn.active {
          color: var(--army-primary);
          background: rgba(31, 73, 48, 0.12);
        }

        [data-theme='dark'] .a11y-action-btn.active {
          color: var(--gold-light);
          background: rgba(197, 155, 39, 0.2);
        }

        .a11y-divider {
          color: #cbd5e1;
          font-size: 0.75rem;
        }

        [data-theme='dark'] .a11y-divider {
          color: #475569;
        }

        .a11y-font-group {
          position: relative;
          display: flex;
          align-items: center;
          gap: 2px;
          background: rgba(0, 0, 0, 0.04);
          border-radius: var(--radius-full);
          padding: 2px;
          border: 1px solid rgba(0, 0, 0, 0.06);
        }

        [data-theme='dark'] .a11y-font-group {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        /* Animated Sliding Liquid Glass Font Pill */
        .sliding-glass-font-pill {
          position: absolute;
          left: 0;
          top: 0;
          border-radius: var(--radius-full);
          background: linear-gradient(
            145deg,
            rgba(31, 73, 48, 0.95) 0%,
            rgba(20, 52, 33, 0.95) 100%
          );
          box-shadow:
            0 2px 8px rgba(0, 0, 0, 0.15),
            0 0 10px rgba(31, 73, 48, 0.2),
            inset 0 1px 1.5px rgba(255, 255, 255, 0.3);
          pointer-events: none;
          z-index: 1;
          transition: transform 0.24s cubic-bezier(0.19, 1, 0.22, 1),
                      width 0.24s cubic-bezier(0.19, 1, 0.22, 1),
                      height 0.24s cubic-bezier(0.19, 1, 0.22, 1),
                      opacity 0.2s ease;
          will-change: transform, width;
        }

        [data-theme='dark'] .sliding-glass-font-pill {
          background: linear-gradient(
            145deg,
            rgba(224, 182, 60, 0.95) 0%,
            rgba(197, 155, 39, 0.95) 100%
          );
          box-shadow:
            0 2px 8px rgba(0, 0, 0, 0.35),
            0 0 10px rgba(224, 182, 60, 0.4),
            inset 0 1px 1.5px rgba(255, 255, 255, 0.6);
        }

        .font-btn {
          position: relative;
          z-index: 2;
          color: #475569;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: var(--radius-full);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: color 0.18s ease, transform 0.16s cubic-bezier(0.34, 1.56, 0.64, 1);
          user-select: none;
        }

        [data-theme='dark'] .font-btn {
          color: #cbd5e1;
        }

        .font-btn:hover {
          color: var(--army-primary);
          transform: scale(1.08);
        }

        [data-theme='dark'] .font-btn:hover {
          color: #ffffff;
        }

        .font-btn:active {
          transform: scale(0.92);
        }

        .font-btn.active {
          color: #ffffff;
          font-weight: 800;
          background: transparent;
          box-shadow: none;
        }

        [data-theme='dark'] .font-btn.active {
          color: #0d1a0f;
        }

        .a11y-theme-group {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .a11y-icon-btn {
          color: #475569;
          padding: 3px;
          border-radius: var(--radius-xs);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        [data-theme='dark'] .a11y-icon-btn {
          color: #cbd5e1;
        }

        .a11y-icon-btn:hover {
          color: var(--army-primary);
          background: rgba(31, 73, 48, 0.08);
        }

        [data-theme='dark'] .a11y-icon-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.12);
        }

        .a11y-icon-btn.active {
          color: var(--army-primary);
        }

        [data-theme='dark'] .a11y-icon-btn.active {
          color: var(--gold-light);
        }

        .a11y-lang-selector {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #475569;
        }

        [data-theme='dark'] .a11y-lang-selector {
          color: #cbd5e1;
        }

        .a11y-lang-selector select {
          background: transparent;
          color: #1e293b;
          border: none;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          padding: 1px 4px;
          border-radius: var(--radius-xs);
          outline: none;
        }

        [data-theme='dark'] .a11y-lang-selector select {
          color: #cbd5e1;
        }

        .a11y-lang-selector select option {
          background: #ffffff;
          color: #1e293b;
        }

        [data-theme='dark'] .a11y-lang-selector select option {
          background: var(--army-dark);
          color: #ffffff;
        }

        @media (max-width: 768px) {
          .a11y-left {
            display: none;
          }
          .a11y-inner {
            justify-content: flex-end;
          }
        }
      `}</style>
    </aside>
  );
};

export default AccessibilityBar;
