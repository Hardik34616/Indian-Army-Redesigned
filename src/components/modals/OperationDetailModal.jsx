import React from 'react';
import { X, Award, MapPin, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const OperationDetailModal = () => {
  const { selectedOperation, setSelectedOperation } = useApp();

  if (!selectedOperation) return null;

  return (
    <div className="modal-backdrop" onClick={() => setSelectedOperation(null)}>
      <div
        className="paper-modal-dialog animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={selectedOperation.name}
      >
        <button
          type="button"
          className="paper-close-btn"
          onClick={() => setSelectedOperation(null)}
          aria-label="Close dialog"
        >
          <X size={28} />
        </button>

        <div className="paper-content">
          <div className="paper-header-stamps">
            <span className="ink-stamp">TOP SECRET</span>
            <span className="ink-stamp year-stamp">YEAR: {selectedOperation.year}</span>
          </div>

          <div className="photo-container">
            <div className="tape"></div>
            <img
              src={selectedOperation.image}
              alt={selectedOperation.name}
              className="vintage-photo"
            />
            <div className="photo-caption">{selectedOperation.name} - {selectedOperation.theatre}</div>
          </div>

          <div className="theatre-ink-row">
            <MapPin size={18} />
            <span>Theatre of Operations: {selectedOperation.theatre}</span>
          </div>

          <h2 className="paper-title">{selectedOperation.name}</h2>
          
          <div className="paper-badge-row">
            <Award size={20} className="award-icon" />
            <span className="honour-text">Gallantry Honour: {selectedOperation.badge}</span>
          </div>

          <p className="paper-summary">{selectedOperation.summary}</p>

          <div className="paper-highlights">
            <h4 className="highlights-heading">
              Key Strategic Milestones & Gallantry Highlights:
            </h4>
            <ul className="ink-list">
              {selectedOperation.keyHighlights.map((highlight, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={18} className="ink-check" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .paper-modal-dialog {
          background-image: url('/paper-texture.jpg');
          background-size: cover;
          background-position: center;
          background-color: #f4ecd8; /* Fallback color */
          border-radius: 4px;
          box-shadow: 
            0 25px 60px rgba(0, 0, 0, 0.6), 
            inset 0 0 60px rgba(139, 69, 19, 0.2), /* Sepia inner burn */
            inset 0 0 10px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 720px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          padding: 40px;
          font-family: 'Kalam', 'Caveat', cursive;
          color: #2a2a2a;
        }

        /* Custom Scrollbar for Paper Modal */
        .paper-modal-dialog::-webkit-scrollbar {
          width: 8px;
        }
        .paper-modal-dialog::-webkit-scrollbar-track {
          background: transparent;
        }
        .paper-modal-dialog::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.2);
          border-radius: 4px;
        }

        .paper-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: transparent;
          color: #2a2a2a;
          border: none;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.2s, transform 0.2s;
          z-index: 10;
        }

        .paper-close-btn:hover {
          opacity: 1;
          transform: scale(1.1) rotate(90deg);
        }

        .paper-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .paper-header-stamps {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .ink-stamp {
          font-family: 'Courier New', Courier, monospace;
          color: #a82e2e;
          border: 3px solid #a82e2e;
          padding: 4px 12px;
          font-size: 1.2rem;
          font-weight: bold;
          letter-spacing: 2px;
          border-radius: 4px;
          transform: rotate(-4deg);
          opacity: 0.75;
          text-transform: uppercase;
          mix-blend-mode: multiply;
        }

        .year-stamp {
          transform: rotate(3deg);
          color: #1f3a52;
          border-color: #1f3a52;
        }

        .photo-container {
          background: #fdfbf7;
          padding: 12px 12px 40px 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          transform: rotate(-1.5deg);
          margin: 10px auto 30px;
          max-width: 85%;
          position: relative;
          border: 1px solid rgba(0,0,0,0.05);
        }

        .tape {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%) rotate(2deg);
          width: 120px;
          height: 35px;
          background: rgba(255, 255, 255, 0.4);
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          backdrop-filter: blur(2px);
          border-radius: 2px;
          z-index: 2;
          mix-blend-mode: overlay;
        }

        .vintage-photo {
          width: 100%;
          height: 260px;
          object-fit: cover;
          filter: sepia(40%) contrast(110%) brightness(95%);
        }

        .photo-caption {
          position: absolute;
          bottom: 10px;
          left: 0;
          width: 100%;
          text-align: center;
          font-size: 1.2rem;
          color: #4a4a4a;
          opacity: 0.8;
        }

        .theatre-ink-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1.4rem;
          color: #1a1a1a;
          border-bottom: 2px dashed rgba(0,0,0,0.15);
          padding-bottom: 10px;
          margin-top: 10px;
        }

        .paper-title {
          font-size: 2.8rem;
          font-weight: 700;
          line-height: 1.1;
          color: #0d1a0f;
          margin: 10px 0;
          text-shadow: 1px 1px 0px rgba(255,255,255,0.3);
        }

        .paper-badge-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.5rem;
          color: #a82e2e;
          font-weight: bold;
          margin-bottom: 15px;
        }

        .paper-summary {
          font-size: 1.4rem;
          line-height: 1.7;
          color: #2c2c2c;
          margin-bottom: 25px;
          text-align: justify;
        }

        .paper-highlights {
          margin-top: 10px;
        }

        .highlights-heading {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 15px;
          border-bottom: 2px solid rgba(0,0,0,0.1);
          padding-bottom: 5px;
          display: inline-block;
        }

        .ink-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-left: 5px;
        }

        .ink-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 1.35rem;
          line-height: 1.5;
          color: #2c2c2c;
        }

        .ink-check {
          color: #1f3a52;
          flex-shrink: 0;
          margin-top: 4px;
        }
        
        @media (max-width: 640px) {
          .paper-modal-dialog {
            padding: 25px;
          }
          .paper-title {
            font-size: 2.2rem;
          }
          .paper-summary, .ink-list li {
            font-size: 1.2rem;
          }
          .ink-stamp {
            font-size: 0.9rem;
          }
          .photo-container {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default OperationDetailModal;

