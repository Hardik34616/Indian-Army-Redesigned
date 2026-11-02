import React, { useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import {
  Shield,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Award,
  GraduationCap,
  HeartPulse,
  DollarSign,
  Building,
  Activity,
  FileText
} from 'lucide-react';
import { OPPORTUNITIES } from '../data/mockData';

const OpportunityDetailPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const requestedTab = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(
    ['overview', 'eligibility', 'training', 'pay', 'physical'].includes(requestedTab)
      ? requestedTab
      : 'overview'
  );

  const opp = OPPORTUNITIES.find((o) => o.id === id) || OPPORTUNITIES[0];

  return (
    <div className="opp-detail-page" id="main-content">
      {/* Background Liquid Glass Tricolor Canvas */}
      <div className="opp-detail-bg-wrapper" aria-hidden="true">
        <img
          src="/assets/tricolor-glass-light.jpg"
          alt=""
          className="opp-detail-bg-img light-img"
        />
        <img
          src="/assets/tricolor-glass-dark.jpg"
          alt=""
          className="opp-detail-bg-img dark-img"
        />
        <div className="opp-detail-bg-overlay" />
      </div>

      <div className="opp-detail-content-relative">
        {/* Top Banner */}
        <div className="detail-hero-banner">
          <div className="detail-hero-bg">
            <img src={opp.image} alt={opp.title} className="detail-hero-img" />
            <div className="detail-hero-overlay" />
          </div>

          <div className="container detail-hero-content">
            <Link to="/opportunities" className="back-link">
              <ArrowLeft size={16} />
              <span>Back to All Opportunities</span>
            </Link>

            <span className="opp-detail-badge">{opp.badge}</span>
            <h1 className="opp-detail-title">{opp.title}</h1>
            <p className="opp-detail-tagline">{opp.tagline}</p>

            <div className="opp-detail-quick-meta">
              <div className="quick-meta-item">
                <span className="meta-lbl">Eligibility Age:</span>
                <strong className="meta-val">{opp.ageLimit}</strong>
              </div>
              <div className="quick-meta-item">
                <span className="meta-lbl">Gender:</span>
                <strong className="meta-val">{opp.gender}</strong>
              </div>
              <div className="quick-meta-item">
                <span className="meta-lbl">Commission Type:</span>
                <strong className="meta-val">{opp.serviceType}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="container detail-main-container">
          {/* Navigation Tabs */}
          <div className="detail-tabs-bar" role="tablist">
            {[
              { id: 'overview', label: 'Overview & Streams' },
              { id: 'eligibility', label: 'Eligibility & Selection' },
              { id: 'training', label: 'Training Academies' },
              { id: 'pay', label: 'Pay & Allowances' },
              { id: 'physical', label: 'Physical Standards' }
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                className={`detail-tab-btn ${activeTab === t.id ? 'active' : ''}`}
                onClick={() => setActiveTab(t.id)}
                role="tab"
                aria-selected={activeTab === t.id}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="detail-tab-content-card">
            {/* TAB 1: OVERVIEW & STREAMS */}
            {activeTab === 'overview' && (
              <div className="tab-pane animate-fade-in">
                <h2 className="pane-title">About {opp.title}</h2>
                <p className="pane-text">{opp.description}</p>

                <div className="eligibility-summary-panel">
                  <div className="eligibility-summary-heading">
                    <CheckCircle2 size={18} />
                    <div>
                      <span>Eligibility snapshot</span>
                      <small>Check these baseline requirements before choosing an entry stream.</small>
                    </div>
                  </div>
                  <ul>
                    {opp.eligibilityCriteria.map((criterion, idx) => (
                      <li key={idx}>{criterion}</li>
                    ))}
                  </ul>
                  <button type="button" className="eligibility-inline-link" onClick={() => setActiveTab('eligibility')}>
                    View full eligibility & selection procedure <ArrowRight size={14} />
                  </button>
                </div>

                <h3 className="sub-pane-title">Available Entry Streams & Examination Modes:</h3>
                <div className="entries-table-card">
                  <table className="entries-table">
                    <thead>
                      <tr>
                        <th>Entry Stream Name</th>
                        <th>Selection Mode</th>
                        <th>Age Criteria</th>
                        <th>Educational Qualification</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {opp.entries.map((entry, idx) => (
                        <tr key={idx}>
                          <td><strong>{entry.name}</strong></td>
                          <td><span className="exam-badge">{entry.exam}</span></td>
                          <td>{entry.age}</td>
                          <td>{entry.edu}</td>
                          <td>
                            <Link
                              to={`/apply?entry=${opp.id}&stream=${encodeURIComponent(entry.name)}`}
                              className="btn btn-primary btn-sm"
                            >
                              Apply
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: ELIGIBILITY & SELECTION */}
            {activeTab === 'eligibility' && (
              <div className="tab-pane animate-fade-in">
                <h2 className="pane-title">Eligibility Criteria & Selection Procedure</h2>
                <div className="eligibility-specs-grid">
                  <div className="spec-card">
                    <div className="spec-card-icon"><GraduationCap size={22} /></div>
                    <h4>Educational Requirement</h4>
                    <p>{opp.qualification}</p>
                  </div>
                  <div className="spec-card">
                    <div className="spec-card-icon"><Calendar size={22} /></div>
                    <h4>Prescribed Age Bracket</h4>
                    <p>{opp.ageLimit}</p>
                  </div>
                  <div className="spec-card">
                    <div className="spec-card-icon"><Building size={22} /></div>
                    <h4>Training Institution</h4>
                    <p>{opp.trainingAcademy}</p>
                  </div>
                  <div className="spec-card">
                    <div className="spec-card-icon"><Award size={22} /></div>
                    <h4>Terms of Commission</h4>
                    <p>{opp.serviceType}</p>
                  </div>
                </div>

                <div className="eligibility-rules-panel">
                  <h3 className="sub-pane-title">Baseline eligibility checklist</h3>
                  <ul>
                    {opp.eligibilityCriteria.map((criterion, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={15} className="step-chk" />
                        <span>{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <h3 className="sub-pane-title" style={{ marginTop: '24px' }}>Stage-by-Stage Selection Procedure:</h3>
                <ul className="selection-steps-list">
                  <li>
                    <CheckCircle2 size={16} className="step-chk" />
                    <div>
                      <strong>1. Online Registration & Scrutiny of Documents:</strong> Submission of candidate profile, biometric Aadhaar authentication, and matriculation verification.
                    </div>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className="step-chk" />
                    <div>
                      <strong>2. Written Entrance / Common Entrance Exam:</strong> Computer Based Test (CEE) or UPSC written examination assessing aptitude, general knowledge, and stream proficiency.
                    </div>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className="step-chk" />
                    <div>
                      <strong>3. Physical Fitness Test (PFT) / Services Selection Board (SSB):</strong> Rigorous evaluation of psychological, leadership, and physical stamina parameters.
                    </div>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className="step-chk" />
                    <div>
                      <strong>4. Specialist Medical Examination (SMB):</strong> Comprehensive assessment by Armed Forces medical specialists.
                    </div>
                  </li>
                </ul>
              </div>
            )}

            {/* TAB 3: TRAINING ACADEMIES */}
            {activeTab === 'training' && (
              <div className="tab-pane animate-fade-in">
                <h2 className="pane-title">Premier Military Training Institutions</h2>
                <p className="pane-text">
                  Cadets undergo world-class physical, tactical, strategic, and leadership indoctrination at India’s globally renowned military academies:
                </p>

                <div className="academies-grid">
                  <div className="academy-box">
                    <span className="academy-tag">DEHRADUN (UTTARAKHAND)</span>
                    <h3>Indian Military Academy (IMA)</h3>
                    <p>Cradle of leadership for Permanent Commission Army Officers. Established in 1932, producing legends of courage and military strategy.</p>
                  </div>

                  <div className="academy-box">
                    <span className="academy-tag">CHENNAI (TAMIL NADU)</span>
                    <h3>Officers Training Academy (OTA)</h3>
                    <p>Premier institution training both Men and Women Short Service Commission officers with focus on modern warfare and multi-domain operations.</p>
                  </div>

                  <div className="academy-box">
                    <span className="academy-tag">KHADAKWASLA, PUNE</span>
                    <h3>National Defence Academy (NDA)</h3>
                    <p>The world’s first tri-service academy where young cadets of Army, Navy, and Air Force train together before specialized academy commissioning.</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: PAY & ALLOWANCES */}
            {activeTab === 'pay' && (
              <div className="tab-pane animate-fade-in">
                <h2 className="pane-title">Pay Scale, Remuneration & Perks</h2>
                <div className="pay-highlight-card">
                  <DollarSign size={32} className="pay-icon" />
                  <div>
                    <span className="pay-label">Remuneration & Scale:</span>
                    <div className="pay-amount">{opp.salary}</div>
                  </div>
                </div>

                <div className="allowances-grid">
                  <div className="allowance-item">
                    <strong>Military Service Pay (MSP):</strong>
                    <span>₹15,500 per month for all Commissioned Officers up to Brigadier rank.</span>
                  </div>
                  <div className="allowance-item">
                    <strong>High Altitude & Field Allowance:</strong>
                    <span>Special risk & hardship allowance up to ₹42,500/month in Siachen & operational zones.</span>
                  </div>
                  <div className="allowance-item">
                    <strong>Free Medical Healthcare (ECHS):</strong>
                    <span>100% comprehensive medical cover for the officer and dependent family members for life.</span>
                  </div>
                  <div className="allowance-item">
                    <strong>Canteen & Accommodation Perks:</strong>
                    <span>Subsidized CSD Canteen facilities, government residential quarters, and leave travel concessions.</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: PHYSICAL STANDARDS */}
            {activeTab === 'physical' && (
              <div className="tab-pane animate-fade-in">
                <h2 className="pane-title">Physical Fitness & Medical Standards</h2>
                <div className="physical-standards-grid">
                  <div className="pft-standard-box">
                    <Activity size={20} className="pft-icon" />
                    <h4>1.6 KM Endurance Run</h4>
                    <p>Group I: Up to 5 min 30 sec (60 Marks)<br />Group II: 5 min 31 sec to 5 min 45 sec (48 Marks)</p>
                  </div>
                  <div className="pft-standard-box">
                    <Activity size={20} className="pft-icon" />
                    <h4>Beam (Pull Ups)</h4>
                    <p>10 Pull-ups: 40 Marks<br />9 Pull-ups: 33 Marks<br />Minimum 6 Pull-ups to qualify (16 Marks)</p>
                  </div>
                  <div className="pft-standard-box">
                    <Activity size={20} className="pft-icon" />
                    <h4>9 Feet Ditch Jump</h4>
                    <p>Candidate must clear 9 feet ditch cleanly on first or second attempt (Qualifying standard).</p>
                  </div>
                  <div className="pft-standard-box">
                    <Activity size={20} className="pft-icon" />
                    <h4>Zig-Zag Balance Beam</h4>
                    <p>Balance walk on narrow obstacle structure without falling (Qualifying standard).</p>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Call to Action */}
            <div className="detail-bottom-cta">
              <div>
                <h3>Ready to embark on this journey?</h3>
                <p>Applications for 2026 batches are currently processing online.</p>
              </div>
              <Link to={`/apply?entry=${opp.id}`} className="btn btn-gold btn-lg">
                <span>Start Online Application</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .opp-detail-page {
          background-color: var(--bg-app);
          min-height: 100vh;
          position: relative;
          padding-bottom: 80px;
          overflow: hidden;
          font-family: var(--font-sans);
        }

        /* -------------------------------------------------------------
           BACKGROUND TRICOLOR LIQUID GLASS VEIL
           ------------------------------------------------------------- */
        .opp-detail-bg-wrapper {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .opp-detail-bg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transition: opacity 0.3s ease;
        }

        .opp-detail-bg-img.light-img {
          opacity: 0.75;
          display: block;
        }

        .opp-detail-bg-img.dark-img {
          opacity: 0;
          display: none;
        }

        [data-theme='dark'] .opp-detail-bg-img.light-img {
          opacity: 0;
          display: none;
        }

        [data-theme='dark'] .opp-detail-bg-img.dark-img {
          opacity: 0.85;
          display: block;
        }

        .opp-detail-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(244, 246, 248, 0.45) 0%,
            rgba(255, 255, 255, 0.3) 35%,
            rgba(244, 246, 248, 0.6) 100%
          );
        }

        [data-theme='dark'] .opp-detail-bg-overlay {
          background: linear-gradient(
            180deg,
            rgba(11, 23, 16, 0.6) 0%,
            rgba(18, 36, 25, 0.45) 35%,
            rgba(11, 23, 16, 0.75) 100%
          );
        }

        .opp-detail-content-relative {
          position: relative;
          z-index: 1;
        }

        .detail-hero-banner {
          position: relative;
          min-height: 520px;
          display: flex;
          align-items: center;
          background: #09120b;
          overflow: hidden;
          padding: 64px 0 120px;
          color: #ffffff;
        }

        .detail-hero-bg {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .detail-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
        }

        .detail-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(9, 18, 11, 0.94) 0%,
            rgba(9, 18, 11, 0.7) 48%,
            rgba(9, 18, 11, 0.25) 100%
          );
        }

        .detail-hero-content {
          position: relative;
          z-index: 10;
          max-width: 860px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
          color: var(--gold-light);
          font-weight: 600;
          margin-bottom: 20px;
          transition: color var(--transition-fast), transform var(--transition-fast);
          width: fit-content;
        }

        .back-link:hover {
          color: #ffffff;
          transform: translateX(-3px);
        }

        .opp-detail-badge {
          display: inline-flex;
          align-items: center;
          width: fit-content;
          background: linear-gradient(135deg, rgba(218, 165, 32, 0.35) 0%, rgba(180, 130, 20, 0.22) 100%);
          backdrop-filter: blur(14px) saturate(190%);
          -webkit-backdrop-filter: blur(14px) saturate(190%);
          color: #fff9e6;
          font-size: 0.75rem;
          font-weight: 800;
          padding: 6px 16px;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border: 1px solid rgba(255, 223, 128, 0.55);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25), 0 0 12px rgba(218, 165, 32, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.5);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
          margin-bottom: 14px;
        }

        .opp-detail-title {
          font-family: var(--font-display);
          font-size: 3rem;
          font-weight: 900;
          line-height: 1.1;
          color: #ffffff;
          margin-bottom: 10px;
        }

        .opp-detail-tagline {
          font-size: 1.125rem;
          color: #cbd5e1;
          margin-bottom: 24px;
        }

        .opp-detail-quick-meta {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(14px) saturate(180%);
          -webkit-backdrop-filter: blur(14px) saturate(180%);
          padding: 14px 24px;
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.15);
          width: fit-content;
          margin-bottom: 24px;
        }

        .quick-meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
        }

        .meta-lbl {
          color: #cbd5e1;
        }

        .meta-val {
          color: #ffffff;
        }

        /* Detail Container */
        .detail-main-container {
          margin-top: -28px;
          position: relative;
          z-index: 20;
          max-width: 1060px;
        }

        .detail-tabs-bar {
          display: flex;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 255, 255, 0.95);
          padding: 6px;
          box-shadow: 0 10px 25px -5px rgba(27, 60, 36, 0.06), 0 2px 6px rgba(0, 0, 0, 0.02);
          margin-bottom: 24px;
          overflow-x: auto;
        }

        [data-theme='dark'] .detail-tabs-bar {
          background: rgba(19, 34, 23, 0.85);
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
        }

        .detail-tab-btn {
          flex: 1;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          font-family: var(--font-display);
          font-size: 0.84375rem;
          font-weight: 700;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
          white-space: nowrap;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .detail-tab-btn:hover {
          color: var(--army-primary);
          background: rgba(255, 255, 255, 0.85);
        }

        [data-theme='dark'] .detail-tab-btn:hover {
          color: var(--gold-light);
          background: rgba(255, 255, 255, 0.12);
        }

        .detail-tab-btn.active {
          background: var(--army-primary);
          color: #ffffff;
        }

        [data-theme='dark'] .detail-tab-btn.active {
          background: var(--gold-primary);
          color: #0d1a0f;
        }

        /* Card */
        .detail-tab-content-card {
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow: 0 16px 36px -6px rgba(27, 60, 36, 0.08);
          padding: 36px;
        }

        [data-theme='dark'] .detail-tab-content-card {
          background: rgba(19, 34, 23, 0.86);
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 16px 36px -6px rgba(0, 0, 0, 0.45);
        }

        .pane-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .pane-text {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .sub-pane-title {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .eligibility-summary-panel {
          margin: 22px 0 28px;
          padding: 18px;
          border: 1px solid rgba(197, 155, 39, 0.3);
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, #fffdf7, #f5faf6);
        }

        [data-theme='dark'] .eligibility-summary-panel {
          background: rgba(197, 155, 39, 0.08);
          border-color: rgba(229, 190, 89, 0.3);
        }

        .eligibility-summary-heading {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: var(--army-primary);
          margin-bottom: 12px;
        }

        [data-theme='dark'] .eligibility-summary-heading {
          color: var(--gold-light);
        }

        .eligibility-summary-heading span,
        .eligibility-summary-heading small {
          display: block;
        }

        .eligibility-summary-heading span {
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-weight: 800;
        }

        .eligibility-summary-heading small {
          color: var(--text-secondary);
          font-size: 0.76rem;
          margin-top: 2px;
        }

        .eligibility-summary-panel ul,
        .eligibility-rules-panel ul {
          display: grid;
          gap: 7px;
          list-style: none;
        }

        .eligibility-summary-panel li,
        .eligibility-rules-panel li {
          position: relative;
          padding-left: 18px;
          color: var(--text-secondary);
          font-size: 0.82rem;
          line-height: 1.45;
        }

        .eligibility-summary-panel li::before {
          content: '•';
          position: absolute;
          left: 3px;
          color: var(--gold-dark);
          font-weight: 900;
        }

        .eligibility-inline-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 14px;
          color: var(--army-primary);
          font-size: 0.78rem;
          font-weight: 800;
        }

        [data-theme='dark'] .eligibility-inline-link {
          color: var(--gold-light);
        }

        .eligibility-inline-link:hover {
          text-decoration: underline;
        }

        .eligibility-rules-panel {
          margin-top: 24px;
          padding: 18px;
          border-radius: var(--radius-md);
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
        }

        .eligibility-rules-panel .sub-pane-title {
          margin-bottom: 12px;
        }

        .eligibility-rules-panel li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding-left: 0;
        }

        .eligibility-rules-panel li::before {
          display: none;
        }

        /* Table */
        .entries-table-card {
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow-x: auto;
          margin-bottom: 24px;
        }

        .entries-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.8125rem;
        }

        .entries-table th {
          background: var(--bg-surface-subtle);
          padding: 12px 16px;
          font-weight: 800;
          color: var(--text-muted);
          text-transform: uppercase;
          font-size: 0.6875rem;
          letter-spacing: 0.04em;
          border-bottom: 1px solid var(--border-subtle);
        }

        .entries-table td {
          padding: 14px 16px;
          border-bottom: 1px solid var(--border-subtle);
          color: var(--text-secondary);
        }

        .entries-table tr:last-child td {
          border-bottom: none;
        }

        .exam-badge {
          display: inline-flex;
          align-items: center;
          background: rgba(31, 73, 48, 0.08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: var(--army-primary);
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 100px;
          border: 1px solid rgba(31, 73, 48, 0.15);
          font-size: 0.71875rem;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03), inset 0 1px 1px rgba(255, 255, 255, 0.6);
        }

        [data-theme='dark'] .exam-badge {
          color: var(--gold-light);
          background: rgba(197, 155, 39, 0.12);
          border-color: rgba(197, 155, 39, 0.25);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.05);
        }

        /* Specs Grid */
        .eligibility-specs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .spec-card {
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .spec-card-icon {
          color: var(--army-primary);
        }

        [data-theme='dark'] .spec-card-icon {
          color: var(--gold-light);
        }

        .spec-card h4 {
          font-family: var(--font-display);
          font-size: 0.9375rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .spec-card p {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .selection-steps-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .selection-steps-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.84375rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .step-chk {
          color: #16a34a;
          flex-shrink: 0;
          margin-top: 3px;
        }

        /* Academies */
        .academies-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .academy-box {
          background: rgba(244, 247, 245, 0.85);
          border: 1px solid rgba(226, 232, 240, 0.85);
          border-radius: var(--radius-md);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        [data-theme='dark'] .academy-box {
          background: rgba(0, 0, 0, 0.25);
          border-color: rgba(255, 255, 255, 0.08);
        }

        .academy-tag {
          font-size: 0.6875rem;
          font-weight: 800;
          color: var(--army-primary);
          letter-spacing: 0.06em;
        }

        [data-theme='dark'] .academy-tag {
          color: var(--gold-light);
        }

        .academy-box h3 {
          font-family: var(--font-display);
          font-size: 1.0625rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .academy-box p {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        /* Pay */
        .pay-highlight-card {
          background: var(--army-primary);
          color: #ffffff;
          border-radius: var(--radius-md);
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 24px;
        }

        [data-theme='dark'] .pay-highlight-card {
          background: var(--army-forest);
        }

        .pay-icon {
          color: var(--gold-light);
        }

        .pay-label {
          font-size: 0.8125rem;
          color: #cbd5e1;
        }

        .pay-amount {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 900;
          color: #ffffff;
        }

        .allowances-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .allowance-item {
          background: rgba(244, 247, 245, 0.85);
          border: 1px solid rgba(226, 232, 240, 0.85);
          border-radius: var(--radius-sm);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 0.8125rem;
        }

        [data-theme='dark'] .allowance-item {
          background: rgba(0, 0, 0, 0.25);
          border-color: rgba(255, 255, 255, 0.08);
        }

        .allowance-item strong {
          color: var(--text-primary);
        }

        .allowance-item span {
          color: var(--text-secondary);
        }

        /* Physical */
        .physical-standards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .pft-standard-box {
          background: rgba(244, 247, 245, 0.85);
          border: 1px solid rgba(226, 232, 240, 0.85);
          border-radius: var(--radius-md);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        [data-theme='dark'] .pft-standard-box {
          background: rgba(0, 0, 0, 0.25);
          border-color: rgba(255, 255, 255, 0.08);
        }

        .pft-icon {
          color: var(--army-primary);
        }

        [data-theme='dark'] .pft-icon {
          color: var(--gold-light);
        }

        .pft-standard-box h4 {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .pft-standard-box p {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        /* Bottom CTA */
        .detail-bottom-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(244, 247, 245, 0.85);
          border: 1.5px solid rgba(226, 232, 240, 0.9);
          border-radius: var(--radius-md);
          padding: 24px;
          margin-top: 36px;
          gap: 20px;
        }

        [data-theme='dark'] .detail-bottom-cta {
          background: rgba(0, 0, 0, 0.3);
          border-color: rgba(255, 255, 255, 0.08);
        }

        .detail-bottom-cta h3 {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .detail-bottom-cta p {
          font-size: 0.8125rem;
          color: var(--text-secondary);
        }

        @media (max-width: 860px) {
          .opp-detail-title {
            font-size: 2.2rem;
          }
          .academies-grid,
          .eligibility-specs-grid,
          .allowances-grid,
          .physical-standards-grid {
            grid-template-columns: 1fr;
          }
          .detail-bottom-cta {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default OpportunityDetailPage;
