import React from 'react';
import { Download, FileText, Calendar, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TENDERS = [
  {
    title: 'Supply of Field Clothing and Personal Equipment',
    authority: 'Directorate General of Clothing & Stores',
    closing: '18 September 2026',
    reference: 'IA / C&S / 2026 / 041'
  },
  {
    title: 'Annual Maintenance of Training Simulation Systems',
    authority: 'Army Training Command',
    closing: '26 September 2026',
    reference: 'IA / ARTRAC / 2026 / 019'
  },
  {
    title: 'Civil Works for Regimental Training Centre Facilities',
    authority: 'Military Engineer Services',
    closing: '04 October 2026',
    reference: 'MES / RTC / 2026 / 117'
  }
];

const TendersPage = () => (
  <div className="tenders-page" id="main-content">
    {/* Background Liquid Glass Tricolor Canvas */}
    <div className="tenders-bg-wrapper" aria-hidden="true">
      <img src="/assets/tricolor-glass-light.jpg" alt="" className="tenders-bg-img light-img" />
      <img src="/assets/tricolor-glass-dark.jpg" alt="" className="tenders-bg-img dark-img" />
      <div className="tenders-bg-overlay" />
    </div>

    <div className="tenders-content-relative">
      <div className="tenders-hero">
        <div className="container">
          <Link to="/" className="tenders-back-link"><ArrowLeft size={15} /> Back to home</Link>
          <span className="section-tag" style={{ color: 'var(--gold-light)' }}>PUBLIC PROCUREMENT</span>
          <h1>Indian Army Tenders</h1>
          <p>Official procurement notices and bid information published for suppliers and service partners.</p>
        </div>
      </div>

      <div className="container tenders-content">
        <div className="tenders-notice">
          <FileText size={20} />
          <span>Always verify tender timelines and documents against the official notice before submitting a bid.</span>
        </div>

        <div className="tenders-list">
          {TENDERS.map((tender) => (
            <article className="tender-card" key={tender.reference}>
              <div className="tender-icon"><FileText size={22} /></div>
              <div className="tender-copy">
                <span className="tender-reference">{tender.reference}</span>
                <h2>{tender.title}</h2>
                <p>{tender.authority}</p>
              </div>
              <div className="tender-closing"><Calendar size={15} /><span>Bid closes {tender.closing}</span></div>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => window.print()}>
                <Download size={15} /> View notice
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>{/* end tenders-content-relative */}

    <style>{`
      .tenders-page { min-height: 100vh; background: var(--bg-app); padding-bottom: 80px; position: relative; overflow: hidden; }

      .tenders-bg-wrapper { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
      .tenders-bg-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center top; transition: opacity 0.3s ease; }
      .tenders-bg-img.light-img { opacity: 0.75; display: block; }
      .tenders-bg-img.dark-img  { opacity: 0; display: none; }
      [data-theme='dark'] .tenders-bg-img.light-img { opacity: 0; display: none; }
      [data-theme='dark'] .tenders-bg-img.dark-img  { opacity: 0.85; display: block; }
      .tenders-bg-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(244,246,248,0.45) 0%, rgba(255,255,255,0.3) 35%, rgba(244,246,248,0.6) 100%); }
      [data-theme='dark'] .tenders-bg-overlay { background: linear-gradient(180deg, rgba(11,23,16,0.6) 0%, rgba(18,36,25,0.45) 35%, rgba(11,23,16,0.75) 100%); }
      .tenders-content-relative { position: relative; z-index: 1; }

      .tenders-hero { background: linear-gradient(135deg, #0b180f, #1b3824); color: #fff; padding: 42px 0 52px; }
      .tenders-hero h1 { margin: 12px 0 10px; font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3rem); }
      .tenders-hero p { max-width: 650px; color: #cbd5e1; font-size: 1rem; }
      .tenders-back-link { display: inline-flex; align-items: center; gap: 6px; color: var(--gold-light); font-size: .8rem; font-weight: 700; }
      .tenders-content { padding-top: 32px; }
      .tenders-notice { display: flex; align-items: center; gap: 10px; padding: 14px 16px; margin-bottom: 20px; color: var(--text-secondary); background: rgba(255,255,255,0.6); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(197,155,39,.25); border-radius: var(--radius-md); font-size: .82rem; }
      [data-theme='dark'] .tenders-notice { background: rgba(18,34,23,0.65); border-color: rgba(197,155,39,.35); }
      .tenders-notice svg { color: var(--gold-dark); flex-shrink: 0; }
      .tenders-list { display: grid; gap: 14px; }
      .tender-card { display: grid; grid-template-columns: auto 1fr auto auto; align-items: center; gap: 16px; padding: 20px; background: rgba(255,255,255,0.72); backdrop-filter: blur(16px) saturate(180%); -webkit-backdrop-filter: blur(16px) saturate(180%); border: 1px solid rgba(255,255,255,0.45); border-radius: var(--radius-md); box-shadow: 0 4px 16px rgba(0,0,0,0.05); }
      [data-theme='dark'] .tender-card { background: rgba(18,34,23,0.75); border-color: rgba(255,255,255,0.08); box-shadow: 0 4px 16px rgba(0,0,0,0.3); }
      .tender-icon { width: 42px; height: 42px; display: grid; place-items: center; color: var(--gold-dark); background: var(--gold-pale); border-radius: 10px; }
      .tender-reference { color: var(--text-muted); font-size: .7rem; font-weight: 800; letter-spacing: .06em; }
      .tender-copy h2 { margin: 3px 0; font-family: var(--font-display); font-size: 1rem; color: var(--text-primary); }
      .tender-copy p { color: var(--text-secondary); font-size: .78rem; }
      .tender-closing { display: flex; align-items: center; gap: 6px; color: var(--text-secondary); font-size: .78rem; white-space: nowrap; }
      @media (max-width: 760px) { .tender-card { grid-template-columns: auto 1fr; } .tender-closing, .tender-card .btn { grid-column: 2; } }
    `}</style>
  </div>
);

export default TendersPage;
