import React, { useState } from 'react';
import { Info, X } from 'lucide-react';

const DisclaimerBanner = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="disclaimer-banner" role="status" aria-live="polite">
      <div className="container">
        <div className="disclaimer-inner">
          <div className="disclaimer-content">
            <Info size={16} className="disclaimer-icon" aria-hidden="true" />
            <span>
              <strong>Concept Prototype</strong> — This is a modernized design prototype and not an official Government of India portal.
              For official recruitment, visit <a href="https://joinindianarmy.nic.in" target="_blank" rel="noopener noreferrer" className="official-link">joinindianarmy.nic.in</a>.
            </span>
          </div>
          <button
            type="button"
            className="disclaimer-close-btn"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss Disclaimer Notice"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      <style>{`
        .disclaimer-banner {
          background: rgba(255, 251, 235, 0.75);
          backdrop-filter: blur(12px) saturate(180%);
          -webkit-backdrop-filter: blur(12px) saturate(180%);
          border-bottom: 1px solid rgba(245, 158, 11, 0.2);
          color: #92400e;
          font-size: 0.78125rem;
          padding: 7px 0;
          position: relative;
          z-index: 850;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
        }

        [data-theme='dark'] .disclaimer-banner {
          background: rgba(30, 20, 10, 0.7);
          border-bottom: 1px solid rgba(245, 158, 11, 0.25);
          color: #fde68a;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        }

        .disclaimer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .disclaimer-content {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .disclaimer-icon {
          flex-shrink: 0;
        }

        .official-link {
          text-decoration: underline;
          font-weight: 700;
          color: inherit;
        }

        .official-link:hover {
          opacity: 0.8;
        }

        .disclaimer-close-btn {
          color: inherit;
          padding: 2px;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .disclaimer-close-btn:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default DisclaimerBanner;
