import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  FileCheck,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  AlertCircle,
  Download,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const TrackApplicationPage = () => {
  const [searchParams] = useSearchParams();
  const { applications, addToast } = useApp();

  const idQuery = searchParams.get('id') || 'IA-2026-98421';
  const [appIdInput, setAppIdInput] = useState(idQuery);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    if (idQuery) {
      setAppIdInput(idQuery);
      const found = applications.find(
        (a) => a.id.toUpperCase() === idQuery.toUpperCase() || a.rollNumber.toUpperCase() === idQuery.toUpperCase()
      );
      if (found) {
        setSelectedApp(found);
      } else if (applications.length > 0) {
        setSelectedApp(applications[0]);
      }
    }
  }, [idQuery, applications]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = appIdInput.trim().toUpperCase();
    if (!query) return;

    const match = applications.find(
      (a) => a.id.toUpperCase() === query || a.rollNumber.toUpperCase() === query
    );

    if (match) {
      setSelectedApp(match);
      addToast(`Found application for ${match.candidateName}`, 'success');
    } else {
      addToast('No application found with entered ID or Roll Number.', 'error');
    }
  };

  return (
    <div className="track-page" id="main-content">
      {/* Background Liquid Glass Tricolor Canvas */}
      <div className="track-bg-wrapper" aria-hidden="true">
        <img src="/assets/tricolor-glass-light.jpg" alt="" className="track-bg-img light-img" />
        <img src="/assets/tricolor-glass-dark.jpg" alt="" className="track-bg-img dark-img" />
        <div className="track-bg-overlay" />
      </div>

      <div className="track-content-relative">
        {/* Top Banner */}
        <div className="track-hero-banner">
          <div className="container">
            <span className="section-tag" style={{ color: 'var(--gold-light)' }}>
              REAL-TIME PIPELINE MONITOR
            </span>
            <h1 className="track-hero-title">Application Status Tracker</h1>
            <p className="track-hero-sub">
              Track your candidate application through document scrutiny, written CEE, physical fitness rally, SSB interview, and medical board milestones.
            </p>
          </div>
        </div>

        <div className="container track-main-container">
        {/* Search Bar Card */}
        <div className="track-search-card">
          <form onSubmit={handleSearch} className="track-search-form">
            <div className="search-input-wrap">
              <Search size={18} className="search-icon-pos" />
              <input
                type="text"
                placeholder="Enter Application ID (e.g. IA-2026-98421) or Assigned Roll Number..."
                value={appIdInput}
                onChange={(e) => setAppIdInput(e.target.value)}
                className="tracker-input"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              <span>Track Application</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="sample-id-chips">
            <span>Quick Sample Triggers:</span>
            {applications.slice(0, 3).map((app) => (
              <button
                key={app.id}
                type="button"
                className="sample-chip"
                onClick={() => {
                  setAppIdInput(app.id);
                  setSelectedApp(app);
                }}
              >
                {app.id} ({app.entryName.split('(')[0]})
              </button>
            ))}
          </div>
        </div>

        {/* Selected Application Timeline Card */}
        {selectedApp && (
          <div className="timeline-detail-card animate-fade-in">
            {/* Header Meta */}
            <div className="tracker-card-header">
              <div className="tracker-header-left">
                <img
                  src="/PHOTO.jpg"
                  alt={selectedApp.candidateName}
                  className="tracker-candidate-photo"
                />
                <div>
                  <span className="tracker-app-badge">{selectedApp.category}</span>
                  <h2 className="tracker-entry-title">{selectedApp.entryName}</h2>
                  <div className="tracker-header-sub">
                    <span>Application No: <strong>{selectedApp.id}</strong></span>
                    <span>•</span>
                    <span>Roll No: <strong>{selectedApp.rollNumber}</strong></span>
                    <span>•</span>
                    <span>Candidate: <strong>{selectedApp.candidateName}</strong></span>
                  </div>
                </div>
              </div>

              <div className="current-stage-badge">
                <span className="badge-lbl">Current Stage</span>
                <span className="badge-stage-text">
                  <Clock size={14} /> {selectedApp.currentStatus}
                </span>
              </div>
            </div>

            {/* Test Center Allotment Card */}
            <div className="venue-allotment-banner">
              <div className="venue-item">
                <MapPin size={18} className="venue-icon" />
                <div>
                  <span className="venue-lbl">Assigned Center / Rally Ground:</span>
                  <strong className="venue-val">{selectedApp.centerAllotted}</strong>
                </div>
              </div>

              <div className="venue-item">
                <Calendar size={18} className="venue-icon" />
                <div>
                  <span className="venue-lbl">Scheduled Date & Reporting:</span>
                  <strong className="venue-val">{selectedApp.reportingDate}</strong>
                </div>
              </div>

              {selectedApp.admitCardReady && (
                <Link to={`/admit-card?roll=${selectedApp.rollNumber}`} className="btn btn-gold btn-sm">
                  <Download size={14} /> Download Admit Card
                </Link>
              )}
            </div>

            {/* Complete Vertical Timeline */}
            <div className="stages-timeline-container">
              <h3 className="timeline-subheading">Recruitment Progression Log:</h3>
              <div className="timeline-tree">
                {selectedApp.steps.map((st, idx) => (
                  <div key={idx} className={`timeline-tree-node ${st.done ? 'is-completed' : ''}`}>
                    <div className="node-marker">
                      {st.done ? <CheckCircle2 size={16} /> : <div className="pending-dot" />}
                    </div>

                    <div className="node-content">
                      <div className="node-title-row">
                        <strong className="node-title">{st.name}</strong>
                        <span className="node-date">{st.date}</span>
                      </div>
                      <p className="node-desc">
                        {idx === 0 && 'Candidate registration verified via Aadhaar-DigiLocker integration.'}
                        {idx === 1 && 'Matriculation marksheet and category certificate successfully scrutinized.'}
                        {idx === 2 && 'Scored above qualifying cut-off criteria for recruitment batch 01/2026.'}
                        {idx === 3 && 'Official call letter generated. Report with required affidavit on designated date.'}
                        {idx === 4 && 'Pending SSB recommendation / Physical Fitness Rally completion.'}
                        {idx === 5 && 'Consolidated merit list ranking to be published upon completion of all batches.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Guarantee */}
            <div className="tracker-security-footer">
              <ShieldCheck size={16} />
              <span>All updates reflect real-time synchronization with the Directorate General of Recruiting database.</span>
            </div>
          </div>
        )}
        </div>
      </div>{/* end track-content-relative */}

      <style>{`
        .track-page {
          background-color: var(--bg-app);
          min-height: 100vh;
          padding-bottom: 80px;
          position: relative;
          overflow: hidden;
        }

        .track-bg-wrapper {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .track-bg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transition: opacity 0.3s ease;
        }
        .track-bg-img.light-img { opacity: 0.75; display: block; }
        .track-bg-img.dark-img  { opacity: 0; display: none; }
        [data-theme='dark'] .track-bg-img.light-img { opacity: 0; display: none; }
        [data-theme='dark'] .track-bg-img.dark-img  { opacity: 0.85; display: block; }
        .track-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(244,246,248,0.45) 0%, rgba(255,255,255,0.3) 35%, rgba(244,246,248,0.6) 100%);
        }
        [data-theme='dark'] .track-bg-overlay {
          background: linear-gradient(180deg, rgba(11,23,16,0.6) 0%, rgba(18,36,25,0.45) 35%, rgba(11,23,16,0.75) 100%);
        }
        .track-content-relative {
          position: relative;
          z-index: 1;
        }

        .track-hero-banner {
          background: linear-gradient(135deg, #0e1a11 0%, #172c1c 100%);
          color: #ffffff;
          padding: 44px 0 52px;
          border-bottom: 1px solid var(--border-dark);
        }

        .track-hero-title {
          font-family: var(--font-display);
          font-size: 2.25rem;
          font-weight: 900;
          color: #ffffff;
          margin: 6px 0 8px;
        }

        .track-hero-sub {
          font-size: 1rem;
          color: #cbd5e1;
          max-width: 720px;
        }

        .track-main-container {
          margin-top: -24px;
          max-width: 900px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Search Card */
        .track-search-card {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255,255,255,0.45);
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }

        [data-theme='dark'] .track-search-card {
          background: rgba(18,34,23,0.75);
          border-color: rgba(255,255,255,0.08);
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }

        .track-search-form {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }

        .search-input-wrap {
          position: relative;
          flex: 1;
          display: flex;
          align-items: center;
        }

        .search-icon-pos {
          position: absolute;
          left: 14px;
          color: var(--text-muted);
        }

        .tracker-input {
          width: 100%;
          padding: 12px 16px 12px 42px;
          border-radius: var(--radius-sm);
          border: 1.5px solid var(--border-medium);
          background: var(--bg-surface);
          color: var(--text-primary);
          font-size: 0.9375rem;
          outline: none;
        }

        .tracker-input:focus {
          border-color: var(--army-primary);
          box-shadow: 0 0 0 3px rgba(27, 48, 34, 0.1);
        }

        .sample-id-chips {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          color: var(--text-muted);
          flex-wrap: wrap;
        }

        .sample-chip {
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          padding: 3px 10px;
          border-radius: var(--radius-full);
          font-size: 0.71875rem;
          font-weight: 600;
          color: var(--army-primary);
          transition: all var(--transition-fast);
        }

        [data-theme='dark'] .sample-chip {
          color: var(--gold-light);
        }

        .sample-chip:hover {
          background: var(--army-primary);
          color: #ffffff;
        }

        /* Detail Card */
        .timeline-detail-card {
          background: rgba(255,255,255,0.78);
          backdrop-filter: blur(18px) saturate(180%);
          -webkit-backdrop-filter: blur(18px) saturate(180%);
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255,255,255,0.5);
          padding: 32px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.06);
        }

        [data-theme='dark'] .timeline-detail-card {
          background: rgba(14,28,18,0.8);
          border-color: rgba(255,255,255,0.08);
          box-shadow: 0 8px 32px rgba(0,0,0,0.35);
        }

        .tracker-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 20px;
          margin-bottom: 20px;
          gap: 20px;
        }

        .tracker-header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .tracker-candidate-photo {
          width: 58px;
          height: 64px;
          object-fit: cover;
          border-radius: var(--radius-xs);
          border: 2px solid var(--gold-primary);
          box-shadow: var(--shadow-sm);
          flex-shrink: 0;
        }

        .tracker-app-badge {
          display: inline-flex;
          align-items: center;
          font-size: 0.6875rem;
          font-weight: 800;
          color: var(--army-primary);
          background: rgba(31, 73, 48, 0.08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 3px 10px;
          border-radius: 100px;
          border: 1px solid rgba(31, 73, 48, 0.15);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        [data-theme='dark'] .tracker-app-badge {
          color: var(--gold-light);
          background: rgba(197, 155, 39, 0.12);
          border-color: rgba(197, 155, 39, 0.25);
        }

        .tracker-entry-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--text-primary);
          margin: 4px 0 6px;
        }

        .tracker-header-sub {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.8125rem;
          color: var(--text-secondary);
          flex-wrap: wrap;
        }

        .current-stage-badge {
          background: rgba(34, 197, 94, 0.1);
          backdrop-filter: blur(12px) saturate(180%);
          -webkit-backdrop-filter: blur(12px) saturate(180%);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: var(--radius-md);
          padding: 10px 16px;
          text-align: right;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 16px rgba(34, 197, 94, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.6);
        }

        [data-theme='dark'] .current-stage-badge {
          background: rgba(34, 197, 94, 0.12);
          border-color: rgba(34, 197, 94, 0.35);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.05);
        }

        .badge-lbl {
          font-size: 0.625rem;
          font-weight: 700;
          color: #166534;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        [data-theme='dark'] .badge-lbl {
          color: #86efac;
        }

        .badge-stage-text {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-display);
          font-size: 0.875rem;
          font-weight: 800;
          color: #15803d;
        }

        [data-theme='dark'] .badge-stage-text {
          color: #4ade80;
        }

        /* Venue Allotment Banner */
        .venue-allotment-banner {
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .venue-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .venue-icon {
          color: var(--army-primary);
          flex-shrink: 0;
        }

        [data-theme='dark'] .venue-icon {
          color: var(--gold-light);
        }

        .venue-lbl {
          font-size: 0.6875rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
          display: block;
        }

        .venue-val {
          font-size: 0.875rem;
          color: var(--text-primary);
        }

        /* Timeline Tree */
        .timeline-subheading {
          font-family: var(--font-display);
          font-size: 1.0625rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .timeline-tree {
          display: flex;
          flex-direction: column;
          position: relative;
          padding-left: 20px;
          border-left: 2px solid var(--border-medium);
          margin-left: 10px;
          gap: 24px;
        }

        .timeline-tree-node {
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .node-marker {
          position: absolute;
          left: -29px;
          top: 0;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          background: #ffffff;
        }

        [data-theme='dark'] .node-marker {
          background: var(--army-darkest);
        }

        .timeline-tree-node.is-completed .node-marker {
          color: #16a34a;
        }

        .pending-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #94a3b8;
        }

        .node-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        .node-title {
          font-family: var(--font-display);
          font-size: 0.9375rem;
          color: var(--text-primary);
        }

        .node-date {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .node-desc {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .tracker-security-footer {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          color: var(--text-muted);
          border-top: 1px solid var(--border-subtle);
          padding-top: 16px;
          margin-top: 28px;
        }

        @media (max-width: 768px) {
          .track-search-form {
            flex-direction: column;
          }
          .tracker-card-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .venue-allotment-banner {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default TrackApplicationPage;
