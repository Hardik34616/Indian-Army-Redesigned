import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Calendar, Download, AlertCircle, ArrowRight, ShieldCheck, Printer } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const AdmitCardModal = () => {
  const { admitCardModalOpen, setAdmitCardModalOpen, applications, addToast } = useApp();
  const [rollInput, setRollInput] = useState('TGC141/2026/88921');
  const [dobInput, setDobInput] = useState('2001-08-14');
  const navigate = useNavigate();

  if (!admitCardModalOpen) return null;

  const handleDownload = (e) => {
    e.preventDefault();
    const match = applications.find(
      (a) =>
        a.rollNumber.toUpperCase() === rollInput.trim().toUpperCase() ||
        a.id.toUpperCase() === rollInput.trim().toUpperCase()
    );

    if (match) {
      addToast(`Generating Admit Card for ${match.candidateName}...`, 'success');
      setAdmitCardModalOpen(false);
      navigate(`/admit-card?roll=${match.rollNumber}`);
    } else {
      addToast('No admit card record found. Please verify entered Roll Number and DOB.', 'error');
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => setAdmitCardModalOpen(false)}>
      <div
        className="admit-modal-dialog animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Download Admit Card"
      >
        <div className="modal-header">
          <div className="modal-title-box">
            <Calendar size={20} className="header-icon" />
            <h3 className="modal-heading">Download Online Admit Card</h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={() => setAdmitCardModalOpen(false)}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p className="admit-instruction">
            Enter your Roll Number / Application ID and Date of Birth as registered to download your official examination / rally admit card.
          </p>

          <form onSubmit={handleDownload} className="admit-form">
            <div className="form-field">
              <label htmlFor="admit-roll">Roll Number or Application ID</label>
              <input
                id="admit-roll"
                type="text"
                required
                value={rollInput}
                onChange={(e) => setRollInput(e.target.value)}
                placeholder="e.g. TGC141/2026/88921 or IA-2026-98421"
              />
            </div>

            <div className="form-field">
              <label htmlFor="admit-dob">Date of Birth</label>
              <input
                id="admit-dob"
                type="date"
                required
                value={dobInput}
                onChange={(e) => setDobInput(e.target.value)}
              />
            </div>

            <div className="quick-demo-picks">
              <span>Quick Demo Pick:</span>
              <button
                type="button"
                className="chip-btn"
                onClick={() => {
                  setRollInput('TGC141/2026/88921');
                  setDobInput('2001-08-14');
                }}
              >
                Officer TGC-141
              </button>
              <button
                type="button"
                className="chip-btn"
                onClick={() => {
                  setRollInput('AMB/HAR/GD/2026/44102');
                  setDobInput('2005-04-20');
                }}
              >
                Agniveer GD
              </button>
            </div>

            <button type="submit" className="btn btn-gold admit-submit-btn">
              <Download size={16} />
              <span>Generate & View Admit Card</span>
            </button>
          </form>
        </div>

        <div className="modal-footer">
          <div className="security-tag">
            <ShieldCheck size={14} />
            <span>Bring a color printout of the Admit Card to the examination venue.</span>
          </div>
        </div>
      </div>

      <style>{`
        /* Full Screen Blurred Backdrop */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        /* Massive Glassmorphic Modal Pane */
        .admit-modal-dialog {
          width: 100%;
          max-width: 520px;
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(40px) saturate(200%);
          -webkit-backdrop-filter: blur(40px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 28px;
          box-shadow: 
            0 40px 100px rgba(0, 0, 0, 0.15),
            inset 0 0 0 1px rgba(255, 255, 255, 0.6),
            inset 0 2px 20px rgba(255, 255, 255, 0.5);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        [data-theme='dark'] .admit-modal-dialog {
          background: rgba(18, 28, 22, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 
            0 40px 100px rgba(0, 0, 0, 0.6),
            inset 0 0 0 1px rgba(255, 255, 255, 0.05),
            inset 0 2px 20px rgba(255, 255, 255, 0.03);
        }

        /* Header */
        .modal-header {
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          background: rgba(255, 255, 255, 0.3);
        }

        [data-theme='dark'] .modal-header {
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(0, 0, 0, 0.2);
        }

        .modal-title-box {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .header-icon {
          color: var(--army-primary);
        }

        [data-theme='dark'] .header-icon {
          color: var(--gold-light);
        }

        .modal-heading {
          font-family: var(--font-display);
          font-size: 1.0625rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .modal-body {
          padding: 24px;
        }

        .admit-instruction {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 18px;
        }

        .admit-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-field label {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .form-field input {
          width: 100%;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-medium);
          background: rgba(255, 255, 255, 0.5);
          color: var(--text-primary);
          font-size: 0.875rem;
          outline: none;
          transition: all var(--transition-fast);
        }
        
        [data-theme='dark'] .form-field input {
          background: rgba(0, 0, 0, 0.2);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .form-field input:focus {
          border-color: var(--army-primary);
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 0 0 3px rgba(31, 73, 48, 0.1);
        }
        
        [data-theme='dark'] .form-field input:focus {
          border-color: var(--gold-light);
          background: rgba(0, 0, 0, 0.4);
          box-shadow: 0 0 0 3px rgba(197, 155, 39, 0.15);
        }

        .quick-demo-picks {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .chip-btn {
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          padding: 2px 8px;
          border-radius: var(--radius-full);
          font-size: 0.71875rem;
          font-weight: 600;
          color: var(--army-primary);
        }

        [data-theme='dark'] .chip-btn {
          color: var(--gold-light);
        }

        .admit-submit-btn {
          width: 100%;
          padding: 12px;
          margin-top: 4px;
        }

        .modal-footer {
          padding: 12px 20px;
          background: var(--bg-surface-subtle);
          border-top: 1px solid var(--border-subtle);
        }

        .security-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.71875rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
};

export default AdmitCardModal;
