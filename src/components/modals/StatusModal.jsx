import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search, FileCheck, ArrowRight, ShieldAlert, CheckCircle2, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const StatusModal = () => {
  const { statusModalOpen, setStatusModalOpen, applications, addToast } = useApp();
  const [appIdInput, setAppIdInput] = useState('');
  const [searchedResult, setSearchedResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  if (!statusModalOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    const query = appIdInput.trim().toUpperCase();
    if (!query) return;

    const match = applications.find(
      (a) => a.id.toUpperCase() === query || a.rollNumber.toUpperCase() === query
    );

    if (match) {
      setSearchedResult(match);
      setNotFound(false);
      addToast(`Found application record for ${match.candidateName}`, 'success');
    } else {
      setSearchedResult(null);
      setNotFound(true);
      addToast('No application found with entered ID.', 'error');
    }
  };

  const handleDemoFill = (id) => {
    setAppIdInput(id);
    const match = applications.find((a) => a.id === id);
    if (match) {
      setSearchedResult(match);
      setNotFound(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => setStatusModalOpen(false)}>
      <div
        className="status-modal-dialog animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Application Status Check"
      >
        <div className="modal-header">
          <div className="modal-title-box">
            <FileCheck size={20} className="header-icon" />
            <h3 className="modal-heading">Track Application Status</h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={() => setStatusModalOpen(false)}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSearch} className="status-search-form">
            <label htmlFor="status-id-input">Enter Application Number or Roll Number</label>
            <div className="search-bar-row">
              <input
                id="status-id-input"
                type="text"
                required
                placeholder="e.g. IA-2026-98421 or TGC141/2026/88921"
                value={appIdInput}
                onChange={(e) => setAppIdInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                <Search size={16} />
                <span>Track Status</span>
              </button>
            </div>
          </form>

          {/* Quick Demo ID triggers */}
          <div className="demo-ids-strip">
            <span>Try sample applications:</span>
            <div className="demo-chips">
              <button type="button" onClick={() => handleDemoFill('IA-2026-98421')}>
                IA-2026-98421 (Officer)
              </button>
              <button type="button" onClick={() => handleDemoFill('IA-2026-44102')}>
                IA-2026-44102 (Agniveer)
              </button>
              <button type="button" onClick={() => handleDemoFill('IA-2026-11893')}>
                IA-2026-11893 (CDS)
              </button>
            </div>
          </div>

          {/* Result Box */}
          {searchedResult && (
            <div className="status-result-card animate-fade-in">
              <div className="result-top-meta">
                <div>
                  <span className="app-id-tag">{searchedResult.id}</span>
                  <h4 className="candidate-title">{searchedResult.candidateName}</h4>
                  <span className="entry-sub-name">{searchedResult.entryName}</span>
                </div>
                <span className="current-status-chip">
                  <Clock size={13} /> {searchedResult.currentStatus}
                </span>
              </div>

              <div className="timeline-micro-preview">
                {searchedResult.steps.map((step, idx) => (
                  <div key={idx} className={`timeline-micro-step ${step.done ? 'is-done' : ''}`}>
                    <div className="step-dot" />
                    <div className="step-meta">
                      <strong>{step.name}</strong>
                      <small>{step.date}</small>
                    </div>
                  </div>
                ))}
              </div>

              <div className="modal-result-actions">
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    setStatusModalOpen(false);
                    navigate(`/track?id=${searchedResult.id}`);
                  }}
                >
                  <span>Open Full Tracker Page</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {notFound && (
            <div className="not-found-warning">
              <ShieldAlert size={24} />
              <p>No active recruitment application found matching <strong>{appIdInput}</strong>. Please check your credentials.</p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => setStatusModalOpen(false)}
          >
            Close
          </button>
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
        .status-modal-dialog {
          width: 100%;
          max-width: 580px;
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

        [data-theme='dark'] .status-modal-dialog {
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

        .status-search-form {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 14px;
        }

        .status-search-form label {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .search-bar-row {
          display: flex;
          gap: 8px;
        }

        .search-bar-row input {
          flex: 1;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-medium);
          background: rgba(255, 255, 255, 0.5);
          color: var(--text-primary);
          font-size: 0.875rem;
          outline: none;
          transition: all var(--transition-fast);
        }

        [data-theme='dark'] .search-bar-row input {
          background: rgba(0, 0, 0, 0.2);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .search-bar-row input:focus {
          border-color: var(--army-primary);
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 0 0 3px rgba(31, 73, 48, 0.1);
        }

        [data-theme='dark'] .search-bar-row input:focus {
          border-color: var(--gold-light);
          background: rgba(0, 0, 0, 0.4);
          box-shadow: 0 0 0 3px rgba(197, 155, 39, 0.15);
        }

        .demo-ids-strip {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .demo-chips {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .demo-chips button {
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          padding: 2px 8px;
          border-radius: var(--radius-full);
          font-size: 0.71875rem;
          font-weight: 600;
          color: var(--army-primary);
          transition: all var(--transition-fast);
        }

        [data-theme='dark'] .demo-chips button {
          color: var(--gold-light);
        }

        .demo-chips button:hover {
          background: var(--army-primary);
          color: #ffffff;
        }

        .status-result-card {
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .result-top-meta {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }

        .app-id-tag {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--gold-dark);
        }

        .candidate-title {
          font-family: var(--font-display);
          font-size: 1.0625rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .entry-sub-name {
          font-size: 0.8125rem;
          color: var(--text-secondary);
        }

        .current-status-chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #dcfce7;
          color: #15803d;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: var(--radius-full);
        }

        .timeline-micro-preview {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-left: 2px solid var(--border-medium);
          padding-left: 12px;
          margin-left: 6px;
        }

        .timeline-micro-step {
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .timeline-micro-step .step-dot {
          position: absolute;
          left: -17px;
          top: 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #94a3b8;
        }

        .timeline-micro-step.is-done .step-dot {
          background: #16a34a;
          box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.2);
        }

        .step-meta strong {
          font-size: 0.78125rem;
          color: var(--text-primary);
        }

        .step-meta small {
          font-size: 0.6875rem;
          color: var(--text-muted);
          display: block;
        }

        .not-found-warning {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #fef2f2;
          border: 1px solid #fee2e2;
          color: #b91c1c;
          padding: 12px 16px;
          border-radius: var(--radius-md);
          font-size: 0.8125rem;
        }

        .modal-footer {
          padding: 12px 20px;
          background: var(--bg-surface-subtle);
          border-top: 1px solid var(--border-subtle);
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </div>
  );
};

export default StatusModal;
