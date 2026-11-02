import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Printer,
  Download,
  Calendar,
  Search,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  ShieldCheck,
  MapPin,
  Clock,
  User
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const AdmitCardPage = () => {
  const [searchParams] = useSearchParams();
  const { applications, addToast, user } = useApp();

  const rollQuery = searchParams.get('roll') || 'TGC141/2026/88921';
  const [rollInput, setRollInput] = useState(rollQuery);
  const [activeApp, setActiveApp] = useState(null);

  useEffect(() => {
    if (rollQuery) {
      setRollInput(rollQuery);
      const found = applications.find(
        (a) =>
          a.rollNumber.toUpperCase() === rollQuery.toUpperCase() ||
          a.id.toUpperCase() === rollQuery.toUpperCase()
      );
      if (found) {
        setActiveApp(found);
      } else if (applications.length > 0) {
        setActiveApp(applications[0]);
      }
    }
  }, [rollQuery, applications]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = rollInput.trim().toUpperCase();
    if (!query) return;

    const match = applications.find(
      (a) => a.rollNumber.toUpperCase() === query || a.id.toUpperCase() === query
    );

    if (match) {
      setActiveApp(match);
      addToast(`Generated Admit Card for ${match.candidateName}`, 'success');
    } else {
      addToast('No admit card found for entered Roll Number.', 'error');
    }
  };

  return (
    <div className="admit-card-page" id="main-content">
      {/* Background Liquid Glass Tricolor Canvas */}
      <div className="admit-bg-wrapper" aria-hidden="true">
        <img src="/assets/tricolor-glass-light.jpg" alt="" className="admit-bg-img light-img" />
        <img src="/assets/tricolor-glass-dark.jpg" alt="" className="admit-bg-img dark-img" />
        <div className="admit-bg-overlay" />
      </div>

      <div className="admit-content-relative">
        {/* Top Banner */}
        <div className="admit-hero-banner no-print">
          <div className="container">
            <span className="section-tag" style={{ color: 'var(--gold-light)' }}>
              OFFICIAL E-HALL TICKET
            </span>
            <h1 className="admit-hero-title">Download Examination / Rally Admit Card</h1>
            <p className="admit-hero-sub">
              Generate and print your official Computer Based Entrance Examination (CEE) or Physical Fitness Rally Hall Ticket.
            </p>
          </div>
        </div>

        <div className="container admit-main-container">
        {/* Search Bar (Hidden during print) */}
        <div className="admit-search-card no-print">
          <form onSubmit={handleSearch} className="admit-search-form">
            <div className="search-field-wrap">
              <Search size={18} className="search-field-icon" />
              <input
                type="text"
                placeholder="Enter Roll Number (e.g. TGC141/2026/88921) or Application ID..."
                value={rollInput}
                onChange={(e) => setRollInput(e.target.value)}
                className="admit-search-input"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              <span>Retrieve Admit Card</span>
            </button>
          </form>

          <div className="sample-picks-row">
            <span>Quick Sample Records:</span>
            {applications.map((app) => (
              <button
                key={app.id}
                type="button"
                className="sample-pick-btn"
                onClick={() => {
                  setRollInput(app.rollNumber);
                  setActiveApp(app);
                }}
              >
                {app.rollNumber} ({app.candidateName.split(' ')[0]})
              </button>
            ))}
          </div>
        </div>

        {/* PRINTABLE OFFICIAL ADMIT CARD DOCUMENT */}
        {activeApp && (
          <div className="official-admit-card-frame print-area">
            {/* Card Top Branding */}
            <div className="admit-govt-header">
              <img src="/Logo.png" alt="Indian Army Crest" width="60" height="60" className="admit-logo" />
              <div className="admit-govt-title-box">
                <h2 className="govt-name">GOVERNMENT OF INDIA • MINISTRY OF DEFENCE</h2>
                <h3 className="dept-name">DIRECTORATE GENERAL OF RECRUITING, INTEGRATED HQ</h3>
                <span className="exam-card-title">COMMON ENTRANCE EXAMINATION (CEE) / RALLY ADMIT CARD 2026</span>
              </div>
            </div>

            {/* Candidate & Exam Metadata Grid */}
            <div className="admit-meta-grid">
              <div className="admit-details-table">
                <div className="meta-row">
                  <span className="k">Roll Number:</span>
                  <strong className="v highlight-roll">{activeApp.rollNumber}</strong>
                </div>
                <div className="meta-row">
                  <span className="k">Application ID:</span>
                  <strong className="v">{activeApp.id}</strong>
                </div>
                <div className="meta-row">
                  <span className="k">Candidate Full Name:</span>
                  <strong className="v">{activeApp.candidateName}</strong>
                </div>
                <div className="meta-row">
                  <span className="k">Recruitment Stream / Entry:</span>
                  <strong className="v">{activeApp.entryName}</strong>
                </div>
                <div className="meta-row">
                  <span className="k">Date of Birth:</span>
                  <strong className="v">{activeApp.dob}</strong>
                </div>
                <div className="meta-row">
                  <span className="k">Social Category:</span>
                  <strong className="v">General / Unreserved</strong>
                </div>
                <div className="meta-row">
                  <span className="k">Assigned Exam Centre:</span>
                  <strong className="v">{activeApp.centerAllotted}</strong>
                </div>
                <div className="meta-row">
                  <span className="k">Reporting Date & Time:</span>
                  <strong className="v highlight-date">{activeApp.reportingDate}</strong>
                </div>
              </div>

              {/* Photo & Signature Block */}
              <div className="admit-photo-signature-block">
                <div className="photo-box">
                  <img
                    src={user?.photo || '/avatar.png'}
                    alt="Candidate Photograph"
                    className="admit-candidate-photo-img"
                  />
                  <span className="photo-lbl">Candidate Digital Photo</span>
                </div>
                <div className="signature-box">
                  <span className="sign-text">Hardik Yash Raj</span>
                  <span className="sign-lbl">Candidate Signature</span>
                </div>
              </div>
            </div>

            {/* Barcode & Security Watermark */}
            <div className="admit-barcode-strip">
              <div className="barcode-box">
                <div className="simulated-barcode" />
                <span className="barcode-num">*{activeApp.rollNumber.replace(/[^a-zA-Z0-9]/g, '')}*</span>
              </div>
              <div className="admit-qr-box">
                <QrCode size={52} />
                <span className="qr-meta">NIC Encrypted Security Token</span>
              </div>
            </div>

            {/* Important Instructions for Candidates */}
            <div className="admit-rules-box">
              <h4 className="rules-heading">
                <AlertTriangle size={15} /> MANDATORY INSTRUCTIONS FOR CANDIDATES:
              </h4>
              <ol className="rules-ordered-list">
                <li>Candidates must bring a printed <strong>Color Copy</strong> of this Admit Card and an original Government Photo Identity Card (Aadhaar Card / Voter ID / Passport).</li>
                <li>Report strictly at the allotted examination / rally center <strong>45 minutes prior</strong> to the scheduled reporting time. Gates will be locked 15 minutes before the exam commencement.</li>
                <li>Electronic items, mobile phones, smartwatches, calculators, and bluetooth gadgets are strictly prohibited inside the examination perimeter.</li>
                <li>Ensure biometric fingerprint scanning is completed at the registration terminal before entering the test cubicle.</li>
              </ol>
            </div>

            {/* Signatures Footer */}
            <div className="admit-signatures-footer">
              <div className="sign-slot">
                <div className="sign-line" />
                <span>Signature of Candidate (In Presence of Invigilator)</span>
              </div>
              <div className="sign-slot">
                <div className="sign-line" />
                <span>Signature & Stamp of Invigilator / Presiding Officer</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons (Hidden during print) */}
        {activeApp && (
          <div className="admit-actions-bar no-print">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => window.print()}
            >
              <Printer size={18} />
              <span>Print Admit Card (Color Document)</span>
            </button>

            <button
              type="button"
              className="btn btn-outline"
              onClick={() => addToast('Admit Card PDF download initiated.', 'success')}
            >
              <Download size={18} />
              <span>Download PDF File</span>
            </button>

            <Link to="/dashboard" className="btn btn-outline btn-sm">
              <span>Back to Candidate Dashboard</span>
            </Link>
          </div>
        )}
        </div>
      </div>{/* end admit-content-relative */}

      <style>{`
        .admit-card-page {
          background-color: var(--bg-app);
          min-height: 100vh;
          padding-bottom: 80px;
          position: relative;
          overflow: hidden;
        }

        .admit-bg-wrapper {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .admit-bg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transition: opacity 0.3s ease;
        }
        .admit-bg-img.light-img { opacity: 0.75; display: block; }
        .admit-bg-img.dark-img  { opacity: 0; display: none; }
        [data-theme='dark'] .admit-bg-img.light-img { opacity: 0; display: none; }
        [data-theme='dark'] .admit-bg-img.dark-img  { opacity: 0.85; display: block; }
        .admit-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(244,246,248,0.45) 0%, rgba(255,255,255,0.3) 35%, rgba(244,246,248,0.6) 100%);
        }
        [data-theme='dark'] .admit-bg-overlay {
          background: linear-gradient(180deg, rgba(11,23,16,0.6) 0%, rgba(18,36,25,0.45) 35%, rgba(11,23,16,0.75) 100%);
        }
        .admit-content-relative {
          position: relative;
          z-index: 1;
        }

        .admit-hero-banner {
          background: linear-gradient(135deg, #0e1a11 0%, #172c1c 100%);
          color: #ffffff;
          padding: 44px 0 52px;
          border-bottom: 1px solid var(--border-dark);
        }

        .admit-hero-title {
          font-family: var(--font-display);
          font-size: 2.25rem;
          font-weight: 900;
          color: #ffffff;
          margin: 6px 0 8px;
        }

        .admit-hero-sub {
          font-size: 1rem;
          color: #cbd5e1;
          max-width: 720px;
        }

        .admit-main-container {
          margin-top: -24px;
          max-width: 900px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Search */
        .admit-search-card {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255,255,255,0.45);
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }

        [data-theme='dark'] .admit-search-card {
          background: rgba(18,34,23,0.75);
          border-color: rgba(255,255,255,0.08);
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }

        .admit-search-form {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }

        .search-field-wrap {
          position: relative;
          flex: 1;
          display: flex;
          align-items: center;
        }

        .search-field-icon {
          position: absolute;
          left: 14px;
          color: var(--text-muted);
        }

        .admit-search-input {
          width: 100%;
          padding: 12px 16px 12px 42px;
          border-radius: var(--radius-sm);
          border: 1.5px solid var(--border-medium);
          background: var(--bg-surface);
          color: var(--text-primary);
          font-size: 0.9375rem;
          outline: none;
        }

        .sample-picks-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          color: var(--text-muted);
          flex-wrap: wrap;
        }

        .sample-pick-btn {
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          padding: 3px 10px;
          border-radius: var(--radius-full);
          font-size: 0.71875rem;
          font-weight: 600;
          color: var(--army-primary);
          transition: all var(--transition-fast);
        }

        [data-theme='dark'] .sample-pick-btn {
          color: var(--gold-light);
        }

        .sample-pick-btn:hover {
          background: var(--army-primary);
          color: #ffffff;
        }

        /* Printable Document */
        .official-admit-card-frame {
          background: #ffffff;
          border: 2px solid #1a2e1f;
          border-radius: var(--radius-md);
          padding: 32px;
          color: #000000;
          box-shadow: var(--shadow-xl);
          position: relative;
        }

        .admit-govt-header {
          display: flex;
          align-items: center;
          gap: 20px;
          border-bottom: 2px solid #1a2e1f;
          padding-bottom: 16px;
          margin-bottom: 20px;
        }

        .admit-logo {
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }

        .admit-govt-title-box {
          display: flex;
          flex-direction: column;
        }

        .govt-name {
          font-size: 0.8125rem;
          font-weight: 800;
          color: #475569;
          letter-spacing: 0.06em;
        }

        .dept-name {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 900;
          color: #0f172a;
          line-height: 1.2;
        }

        .exam-card-title {
          font-family: var(--font-display);
          font-size: 0.875rem;
          font-weight: 800;
          color: var(--army-primary);
          letter-spacing: 0.04em;
          margin-top: 4px;
        }

        .admit-meta-grid {
          display: grid;
          grid-template-columns: 1fr 180px;
          gap: 24px;
          margin-bottom: 20px;
        }

        .admit-details-table {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .meta-row {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 12px;
          font-size: 0.84375rem;
          border-bottom: 1px dotted #cbd5e1;
          padding-bottom: 4px;
        }

        .meta-row .k {
          color: #475569;
          font-weight: 600;
        }

        .meta-row .v {
          color: #0f172a;
        }

        .highlight-roll {
          font-family: var(--font-mono);
          font-size: 1rem;
          color: var(--army-primary);
        }

        .highlight-date {
          color: #dc2626;
          font-weight: 800;
        }

        /* Photo & Sign */
        .admit-photo-signature-block {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .photo-box {
          border: 1.5px solid #64748b;
          height: 160px;
          background: #f8fafc;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 6px;
          gap: 4px;
          overflow: hidden;
        }

        .admit-candidate-photo-img {
          width: 105px;
          height: 125px;
          object-fit: cover;
          border: 1px solid #94a3b8;
          border-radius: 2px;
        }

        .photo-lbl, .sign-lbl {
          font-size: 0.625rem;
          color: #64748b;
          font-weight: 700;
          text-transform: uppercase;
        }

        .signature-box {
          border: 1.5px solid #64748b;
          height: 60px;
          background: #f8fafc;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .sign-text {
          font-family: 'Brush Script MT', cursive, sans-serif;
          font-size: 1.25rem;
          color: #1e3a8a;
        }

        /* Barcode */
        .admit-barcode-strip {
          border-top: 1px solid #cbd5e1;
          border-bottom: 1px solid #cbd5e1;
          padding: 12px 0;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .barcode-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .simulated-barcode {
          width: 220px;
          height: 36px;
          background: repeating-linear-gradient(
            90deg,
            #000 0px,
            #000 2px,
            transparent 2px,
            transparent 4px,
            #000 4px,
            #000 7px,
            transparent 7px,
            transparent 9px
          );
        }

        .barcode-num {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
        }

        .admit-qr-box {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .qr-meta {
          font-size: 0.6875rem;
          color: #64748b;
          max-width: 140px;
        }

        /* Rules */
        .admit-rules-box {
          background: rgba(248, 250, 252, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: var(--radius-md);
          padding: 18px 20px;
          margin-bottom: 24px;
        }

        [data-theme='dark'] .admit-rules-box {
          background: rgba(15, 23, 42, 0.7);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .rules-heading {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78125rem;
          font-weight: 800;
          color: #991b1b;
          margin-bottom: 8px;
        }

        .rules-ordered-list {
          padding-left: 18px;
          font-size: 0.75rem;
          color: #334155;
          line-height: 1.45;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        /* Signatures Footer */
        .admit-signatures-footer {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px;
          padding-top: 20px;
        }

        .sign-slot {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          font-size: 0.6875rem;
          color: #475569;
        }

        .sign-line {
          width: 100%;
          border-top: 1px solid #000000;
          margin-bottom: 6px;
        }

        .admit-actions-bar {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .admit-meta-grid {
            grid-template-columns: 1fr;
          }
          .meta-row {
            grid-template-columns: 1fr;
            gap: 2px;
          }
          .admit-search-form {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default AdmitCardPage;
