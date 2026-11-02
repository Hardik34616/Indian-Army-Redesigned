import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Phone, Mail, MapPin, ExternalLink, AlertTriangle, Clock, Eye } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer-wrapper" aria-label="Portal Footer">
      {/* Top Tricolor Accent Line */}
      <div className="tricolor-stripe" />

      {/* Anti-Fraud Recruitment Warning Banner */}
      <div className="anti-fraud-banner">
        <div className="container">
          <div className="anti-fraud-inner">
            <AlertTriangle className="fraud-icon" size={22} />
            <div className="fraud-text">
              <strong>BEWARE OF TOUTS & FRAUDULENT AGENTS:</strong>
              <span>
                Recruitment in the Indian Army is 100% free, transparent, and strictly merit-based. No private person or agency has any influence on selection. Report touts immediately to your nearest Military Police or Police Station.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Col 1: Brand & Ministry of Defence */}
            <div className="footer-col brand-col">
              <div className="footer-brand">
                <img src="/Logo.png" alt="Indian Army Emblem" className="footer-emblem" width="44" height="44" />
                <div>
                  <h3 className="footer-brand-title">JOIN INDIAN ARMY</h3>
                  <p className="footer-brand-sub">DIRECTORATE GENERAL OF RECRUITING</p>
                </div>
              </div>
              <p className="footer-desc">
                Serving the nation with unwavering honour, valor, and supreme devotion. Join the world’s second largest standing army and lead a life less ordinary.
              </p>
              <div className="motto-tag">
                <span className="motto-hi">सेवा परमो धर्म:</span>
                <span className="motto-en">Service Before Self</span>
              </div>
            </div>

            {/* Col 2: Pathways & Navigation */}
            <div className="footer-col">
              <h4 className="footer-heading">Recruitment Entries</h4>
              <ul className="footer-links">
                <li><Link to="/opportunities/officers-entry">Officers Entry (NDA & CDS)</Link></li>
                <li><Link to="/opportunities/officers-entry">Technical Entries (TGC / SSC)</Link></li>
                <li><Link to="/opportunities/agnipath-scheme">Agnipath Scheme (Agniveer)</Link></li>
                <li><Link to="/opportunities/jco-or-enrolment">JCO & Other Ranks Enrolment</Link></li>
                <li><Link to="/opportunities/territorial-army">Territorial Army (Civilian Entry)</Link></li>
                <li><Link to="/find-entry">Eligibility Wizard (Check Criteria)</Link></li>
              </ul>
            </div>

            {/* Col 3: Candidate Candidate Tools */}
            <div className="footer-col">
              <h4 className="footer-heading">Candidate Services</h4>
              <ul className="footer-links">
                <li><Link to="/track">Check Application Status</Link></li>
                <li><Link to="/admit-card">Download Admit Card (CEE & Rally)</Link></li>
                <li><Link to="/results">Online CEE Results & Merit Lists</Link></li>
                <li><Link to="/calendar">Recruitment Rally Radar & Schedule</Link></li>
                <li><Link to="/dashboard">Candidate Dashboard Portal</Link></li>
                <li><Link to="/help">Frequently Asked Questions (FAQs)</Link></li>
              </ul>
            </div>

            {/* Col 4: Official Helpdesk & ZRO Helpline */}
            <div className="footer-col contact-col">
              <h4 className="footer-heading">Recruiting Helpdesk</h4>
              <div className="contact-item">
                <MapPin size={16} className="contact-icon" />
                <span>West Block-III, RK Puram, New Delhi - 110066</span>
              </div>
              <div className="contact-item">
                <Phone size={16} className="contact-icon" />
                <span>011-26173215 / 011-26175471</span>
              </div>
              <div className="contact-item">
                <Mail size={16} className="contact-icon" />
                <span>feedback.joinindianarmy@gov.in</span>
              </div>
              <div className="contact-item">
                <Clock size={16} className="contact-icon" />
                <span>Monday - Friday: 09:30 AM - 05:30 PM</span>
              </div>
            </div>
          </div>

          {/* Government Network Links */}
          <div className="govt-network-bar">
            <span className="network-label">Official Portals:</span>
            <div className="network-links">
              <a href="https://www.india.gov.in" target="_blank" rel="noopener noreferrer">
                National Portal of India <ExternalLink size={11} />
              </a>
              <a href="https://mod.gov.in" target="_blank" rel="noopener noreferrer">
                Ministry of Defence <ExternalLink size={11} />
              </a>
              <a href="https://www.mygov.in" target="_blank" rel="noopener noreferrer">
                MyGov India <ExternalLink size={11} />
              </a>
              <a href="https://upsc.gov.in" target="_blank" rel="noopener noreferrer">
                UPSC Official <ExternalLink size={11} />
              </a>
              <a href="https://digitalindia.gov.in" target="_blank" rel="noopener noreferrer">
                Digital India <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Compliance */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <div className="copyright-text">
              © {new Date().getFullYear()} Directorate General of Recruiting, Indian Army. All Rights Reserved.
            </div>

            <div className="visitor-meta">
              <span className="visitor-count">
                <Eye size={13} /> Total Visitors: <strong>48,924,108</strong>
              </span>
              <span className="last-updated">
                Last Updated: 25 August 2026
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .footer-wrapper {
          background-image: url('/floral-light.jpg');
          background-size: cover;
          background-position: center bottom;
          background-repeat: no-repeat;
          position: relative;
          color: #334155;
          margin-top: auto;
          font-size: 0.875rem;
          z-index: 1;
        }

        .footer-wrapper::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.88);
          z-index: -1;
          backdrop-filter: blur(4px);
        }

        [data-theme='dark'] .footer-wrapper {
          background-image: url('/floral-dark.jpg');
          color: #cbd5e1;
        }

        [data-theme='dark'] .footer-wrapper::before {
          background: rgba(19, 34, 24, 0.92);
        }

        .anti-fraud-banner {
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(14px) saturate(180%);
          -webkit-backdrop-filter: blur(14px) saturate(180%);
          border-bottom: 1px solid rgba(217, 119, 6, 0.2);
          padding: 14px 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
        }

        [data-theme='dark'] .anti-fraud-banner {
          background: rgba(20, 32, 24, 0.7);
          border-bottom: 1px solid rgba(245, 158, 11, 0.25);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .anti-fraud-inner {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          color: #b45309;
          font-size: 0.8125rem;
          line-height: 1.5;
        }

        [data-theme='dark'] .anti-fraud-inner {
          color: #fde047;
        }

        .fraud-icon {
          flex-shrink: 0;
          margin-top: 2px;
          color: #d97706;
          filter: drop-shadow(0 2px 4px rgba(217, 119, 6, 0.3));
        }

        [data-theme='dark'] .fraud-icon {
          color: #fbbf24;
        }

        .fraud-text strong {
          color: #0f172a;
          margin-right: 6px;
        }

        [data-theme='dark'] .fraud-text strong {
          color: #ffffff;
        }

        .footer-main {
          padding: 48px 0 32px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
          gap: 36px;
          margin-bottom: 36px;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }

        .footer-emblem {
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
        }

        .footer-brand-title {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: 0.04em;
        }

        [data-theme='dark'] .footer-brand-title {
          color: #ffffff;
        }

        .footer-brand-sub {
          font-size: 0.6875rem;
          color: #c59b27;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        [data-theme='dark'] .footer-brand-sub {
          color: var(--gold-light);
          font-weight: 600;
        }

        .footer-desc {
          color: #475569;
          font-size: 0.8125rem;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        [data-theme='dark'] .footer-desc {
          color: #94a3b8;
        }

        .motto-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(197, 155, 39, 0.08);
          border: 1px solid rgba(197, 155, 39, 0.2);
          padding: 4px 10px;
          border-radius: var(--radius-xs);
          font-size: 0.75rem;
        }

        [data-theme='dark'] .motto-tag {
          background: rgba(197, 155, 39, 0.12);
          border: 1px solid rgba(197, 155, 39, 0.3);
        }

        .motto-hi {
          color: #b48512;
          font-weight: 700;
        }

        [data-theme='dark'] .motto-hi {
          color: var(--gold-light);
        }

        .motto-en {
          color: #475569;
          font-style: italic;
        }

        [data-theme='dark'] .motto-en {
          color: #e2e8f0;
        }

        .footer-heading {
          font-family: var(--font-display);
          font-size: 0.9375rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 16px;
          position: relative;
          padding-bottom: 8px;
        }

        [data-theme='dark'] .footer-heading {
          color: #ffffff;
        }

        .footer-heading::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 24px;
          height: 2px;
          background: #c59b27;
          border-radius: 2px;
        }

        [data-theme='dark'] .footer-heading::after {
          background: var(--gold-primary);
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-links a {
          color: #475569;
          font-size: 0.8125rem;
          transition: all var(--transition-fast);
          display: inline-block;
        }

        [data-theme='dark'] .footer-links a {
          color: #94a3b8;
        }

        .footer-links a:hover {
          color: #16a34a;
          transform: translateX(4px);
        }

        [data-theme='dark'] .footer-links a:hover {
          color: #ffffff;
        }

        .contact-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.8125rem;
          color: #475569;
          line-height: 1.4;
        }

        [data-theme='dark'] .contact-item {
          color: #94a3b8;
        }

        .contact-icon {
          color: #c59b27;
          flex-shrink: 0;
          margin-top: 2px;
        }

        [data-theme='dark'] .contact-icon {
          color: var(--gold-light);
        }

        .govt-network-bar {
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          padding-top: 20px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          font-size: 0.78125rem;
        }

        [data-theme='dark'] .govt-network-bar {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .network-label {
          color: #b48512;
          font-weight: 700;
        }

        [data-theme='dark'] .network-label {
          color: var(--gold-light);
        }

        .network-links {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }

        .network-links a {
          color: #475569;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: color var(--transition-fast);
        }

        [data-theme='dark'] .network-links a {
          color: #94a3b8;
        }

        .network-links a:hover {
          color: #16a34a;
        }

        [data-theme='dark'] .network-links a:hover {
          color: #ffffff;
        }

        .footer-bottom {
          background-color: rgba(255, 255, 255, 0.65);
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          padding: 16px 0;
          font-size: 0.75rem;
          color: #64748b;
          backdrop-filter: blur(8px);
        }

        [data-theme='dark'] .footer-bottom {
          background-color: rgba(14, 24, 17, 0.75);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .footer-bottom-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .visitor-meta {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .visitor-count {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #475569;
        }

        [data-theme='dark'] .visitor-count {
          color: #94a3b8;
        }

        .visitor-count strong {
          color: #b48512;
        }

        [data-theme='dark'] .visitor-count strong {
          color: var(--gold-light);
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 28px;
          }
        }

        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-bottom-inner {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
