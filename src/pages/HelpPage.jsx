import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  HelpCircle,
  AlertTriangle,
  Send,
  CheckCircle2,
  ShieldCheck,
  Building,
  FileText
} from 'lucide-react';
import { ZRO_DIRECTORIES, FAQS } from '../data/mockData';
import { useApp } from '../context/AppContext';

const HelpPage = () => {
  const { addToast } = useApp();
  const [grievanceData, setGrievanceData] = useState({
    name: '',
    email: '',
    phone: '',
    rollNo: '',
    zone: 'HQ Rtg Zone Ambala',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitGrievance = (e) => {
    e.preventDefault();
    if (!grievanceData.name || !grievanceData.email || !grievanceData.message) {
      addToast('Please complete all mandatory grievance fields.', 'error');
      return;
    }
    setSubmitted(true);
    addToast('Grievance ticket created successfully. Reference ID: GRV-2026-8819', 'success');
  };

  return (
    <div className="help-page" id="main-content">
      {/* Background Liquid Glass Tricolor Canvas */}
      <div className="help-bg-wrapper" aria-hidden="true">
        <img src="/assets/tricolor-glass-light.jpg" alt="" className="help-bg-img light-img" />
        <img src="/assets/tricolor-glass-dark.jpg" alt="" className="help-bg-img dark-img" />
        <div className="help-bg-overlay" />
      </div>

      <div className="help-content-relative">
        {/* Top Banner */}
        <div className="help-hero-banner">
          <div className="container">
            <span className="section-tag" style={{ color: 'var(--gold-light)' }}>
              CANDIDATE SUPPORT & HELPDESK
            </span>
            <h1 className="help-hero-title">Recruitment Helpdesk & Zonal Directory</h1>
            <p className="help-hero-sub">
              Get prompt assistance regarding registration issues, rally queries, biometric verification, or report suspicious tout activities.
            </p>
          </div>
        </div>

        <div className="container help-main-layout">
        {/* Anti-Fraud Highlight Box */}
        <div className="help-anti-fraud-card">
          <AlertTriangle size={24} className="fraud-icon" />
          <div>
            <h3>BEWARE OF FRAUDULENT RECRUITMENT AGENTS</h3>
            <p>
              Selection into the Indian Army is 100% free, impartial, and merit-based. No civilian, agent, or coaching institute has any influence on the recruitment process. Report any tout demand immediately to the nearest Military Police station.
            </p>
          </div>
        </div>

        {/* 2-Column Layout: ZRO Directory & Grievance Form */}
        <div className="help-grid-layout">
          {/* Col 1: ZRO Directory */}
          <div className="help-section-card">
            <h2 className="section-title" style={{ fontSize: '1.375rem', marginBottom: '16px' }}>
              Zonal Recruiting Offices (ZRO) Directory
            </h2>
            <p className="section-subtitle" style={{ fontSize: '0.84375rem', marginBottom: '20px' }}>
              Contact your designated Zonal Recruiting Office for state-specific rally queries.
            </p>

            <div className="zro-cards-list">
              {ZRO_DIRECTORIES.map((zro, idx) => (
                <div key={idx} className="zro-item-card">
                  <div className="zro-header-row">
                    <Building size={16} className="zro-icon" />
                    <strong>{zro.name}</strong>
                  </div>
                  <span className="zro-states"><strong>Jurisdiction:</strong> {zro.states}</span>
                  <div className="zro-contact-meta">
                    <span><Phone size={13} /> {zro.phone}</span>
                    <span><Mail size={13} /> {zro.email}</span>
                  </div>
                  <small className="zro-address"><MapPin size={13} /> {zro.address}</small>
                </div>
              ))}
            </div>
          </div>

          {/* Col 2: Online Grievance & Query Form */}
          <div className="help-section-card">
            <h2 className="section-title" style={{ fontSize: '1.375rem', marginBottom: '16px' }}>
              Candidate Grievance & Query Redressal
            </h2>
            <p className="section-subtitle" style={{ fontSize: '0.84375rem', marginBottom: '20px' }}>
              Submit official queries regarding application errors, center changes, or admit card issues.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmitGrievance} className="grievance-form">
                <div className="form-grid-2">
                  <div className="form-field">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Candidate Name"
                      value={grievanceData.name}
                      onChange={(e) => setGrievanceData({ ...grievanceData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="candidate@example.com"
                      value={grievanceData.email}
                      onChange={(e) => setGrievanceData({ ...grievanceData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label>Mobile Number</label>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      value={grievanceData.phone}
                      onChange={(e) => setGrievanceData({ ...grievanceData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <label>Application / Roll Number (If Any)</label>
                    <input
                      type="text"
                      placeholder="e.g. IA-2026-98421"
                      value={grievanceData.rollNo}
                      onChange={(e) => setGrievanceData({ ...grievanceData, rollNo: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Select Recruiting Zone</label>
                  <select
                    value={grievanceData.zone}
                    onChange={(e) => setGrievanceData({ ...grievanceData, zone: e.target.value })}
                  >
                    {ZRO_DIRECTORIES.map((z, idx) => (
                      <option key={idx} value={z.name}>{z.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label>Query Subject *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Admit card download error / Name correction"
                    value={grievanceData.subject}
                    onChange={(e) => setGrievanceData({ ...grievanceData, subject: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label>Detailed Message & Remarks *</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Describe your issue with relevant details..."
                    value={grievanceData.message}
                    onChange={(e) => setGrievanceData({ ...grievanceData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <Send size={16} />
                  <span>Submit Official Query Ticket</span>
                </button>
              </form>
            ) : (
              <div className="grievance-success-box animate-fade-in">
                <CheckCircle2 size={48} className="grv-success-icon" />
                <h3>Grievance Ticket Registered</h3>
                <p>Your query has been logged under Reference Token <strong>GRV-2026-8819</strong>. Official response will be communicated to your email within 2 working days.</p>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => setSubmitted(false)}
                >
                  Submit Another Ticket
                </button>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>{/* end help-content-relative */}

      <style>{`
        .help-page {
          background-color: var(--bg-app);
          min-height: 100vh;
          padding-bottom: 80px;
          position: relative;
          overflow: hidden;
        }

        .help-bg-wrapper {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .help-bg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transition: opacity 0.3s ease;
        }
        .help-bg-img.light-img { opacity: 0.75; display: block; }
        .help-bg-img.dark-img  { opacity: 0; display: none; }
        [data-theme='dark'] .help-bg-img.light-img { opacity: 0; display: none; }
        [data-theme='dark'] .help-bg-img.dark-img  { opacity: 0.85; display: block; }
        .help-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(244,246,248,0.45) 0%, rgba(255,255,255,0.3) 35%, rgba(244,246,248,0.6) 100%);
        }
        [data-theme='dark'] .help-bg-overlay {
          background: linear-gradient(180deg, rgba(11,23,16,0.6) 0%, rgba(18,36,25,0.45) 35%, rgba(11,23,16,0.75) 100%);
        }
        .help-content-relative {
          position: relative;
          z-index: 1;
        }

        .help-hero-banner {
          background: linear-gradient(135deg, #0e1a11 0%, #172c1c 100%);
          color: #ffffff;
          padding: 44px 0 52px;
          border-bottom: 1px solid var(--border-dark);
        }

        .help-hero-title {
          font-family: var(--font-display);
          font-size: 2.25rem;
          font-weight: 900;
          color: #ffffff;
          margin: 6px 0 8px;
        }

        .help-hero-sub {
          font-size: 1rem;
          color: #cbd5e1;
          max-width: 720px;
        }

        .help-main-layout {
          margin-top: -24px;
          max-width: 1100px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Anti Fraud Liquid Glass Pane */
        .help-anti-fraud-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(16px) saturate(190%);
          -webkit-backdrop-filter: blur(16px) saturate(190%);
          border: 1px solid rgba(217, 119, 6, 0.25);
          border-radius: var(--radius-lg);
          padding: 22px 28px;
          color: var(--text-primary);
          display: flex;
          align-items: flex-start;
          gap: 18px;
          box-shadow: 0 10px 30px -5px rgba(217, 119, 6, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.8);
          position: relative;
          overflow: hidden;
        }

        .help-anti-fraud-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, #f59e0b 0%, #d97706 100%);
        }

        [data-theme='dark'] .help-anti-fraud-card {
          background: rgba(20, 32, 24, 0.65);
          border-color: rgba(245, 158, 11, 0.35);
          color: #f1f5f9;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.08);
        }

        .help-anti-fraud-card .fraud-icon {
          color: #d97706;
          flex-shrink: 0;
          margin-top: 2px;
          filter: drop-shadow(0 2px 6px rgba(217, 119, 6, 0.3));
        }

        [data-theme='dark'] .help-anti-fraud-card .fraud-icon {
          color: #fbbf24;
        }

        .help-anti-fraud-card h3 {
          font-family: var(--font-display);
          font-size: 1.0625rem;
          font-weight: 800;
          color: #b45309;
          margin-bottom: 6px;
          letter-spacing: 0.02em;
        }

        [data-theme='dark'] .help-anti-fraud-card h3 {
          color: #fde047;
        }

        .help-anti-fraud-card p {
          font-size: 0.875rem;
          line-height: 1.55;
          color: var(--text-secondary);
        }

        [data-theme='dark'] .help-anti-fraud-card p {
          color: #cbd5e1;
        }

        /* Split */
        .help-grid-layout {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 24px;
        }

        .help-section-card {
          background: #ffffff;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-subtle);
          padding: 28px;
          box-shadow: var(--shadow-md);
        }

        [data-theme='dark'] .help-section-card {
          background: var(--army-darkest);
          border-color: var(--border-medium);
        }

        .zro-cards-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-height: 540px;
          overflow-y: auto;
          padding-right: 6px;
        }

        .zro-item-card {
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 0.8125rem;
        }

        .zro-header-row {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-primary);
          font-size: 0.875rem;
        }

        .zro-icon {
          color: var(--army-primary);
        }

        [data-theme='dark'] .zro-icon {
          color: var(--gold-light);
        }

        .zro-states {
          color: var(--text-secondary);
        }

        .zro-contact-meta {
          display: flex;
          gap: 14px;
          color: var(--text-primary);
          font-weight: 600;
          font-size: 0.75rem;
          margin: 4px 0;
        }

        .zro-contact-meta span {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .zro-address {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: var(--text-muted);
          font-size: 0.71875rem;
        }

        .grievance-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .grievance-success-box {
          text-align: center;
          padding: 36px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .grv-success-icon {
          color: #16a34a;
        }

        .grievance-success-box h3 {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .grievance-success-box p {
          font-size: 0.875rem;
          color: var(--text-secondary);
          max-width: 360px;
          line-height: 1.5;
        }

        @media (max-width: 960px) {
          .help-grid-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default HelpPage;
