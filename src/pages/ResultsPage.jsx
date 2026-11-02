import React, { useState, useRef, useEffect } from 'react';
import {
  TrendingUp,
  Download,
  Search,
  Award,
  CheckCircle2,
  Calendar,
  Filter,
  FileText
} from 'lucide-react';
import { MOCK_RESULTS } from '../data/mockData';
import { useApp } from '../context/AppContext';

const ResultsPage = () => {
  const { addToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [rollCheck, setRollCheck] = useState('');
  const [rollCheckResult, setRollCheckResult] = useState(null);

  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
  const chipsTrackRef = useRef(null);
  const chipsRefs = useRef({});

  const categories = ['All', 'Agnipath Scheme', 'Officers Entry', 'JCO / OR Entry', 'Women Enrolment'];

  const updateIndicator = () => {
    const currentBtn = chipsRefs.current[selectedCat];
    const track = chipsTrackRef.current;
    if (currentBtn && track) {
      setIndicatorStyle({
        left: currentBtn.offsetLeft,
        top: currentBtn.offsetTop,
        width: currentBtn.offsetWidth,
        height: currentBtn.offsetHeight,
        opacity: 1
      });
    }
  };

  useEffect(() => {
    updateIndicator();
    const timer = setTimeout(updateIndicator, 50);
    window.addEventListener('resize', updateIndicator);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [selectedCat]);

  const filteredResults = MOCK_RESULTS.filter((r) => {
    const matchCat = selectedCat === 'All' || r.category === selectedCat;
    const matchSearch =
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.zone.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleRollSearch = (e) => {
    e.preventDefault();
    const query = rollCheck.trim().toUpperCase();
    if (!query) return;

    if (query.includes('88921') || query.includes('44102') || query.includes('11893') || query.includes('TGC') || query.includes('AMB')) {
      setRollCheckResult({
        qualified: true,
        roll: query,
        meritRank: 'All India Rank: 142',
        stream: 'TGC-141 (Mechanical Engineering) / Agniveer CEE',
        remarks: 'RECOMMENDED for Stage II SSB / Physical Fitness Test'
      });
      addToast(`Roll Number ${query} is RECOMMENDED in Merit List!`, 'success');
    } else {
      setRollCheckResult({
        qualified: false,
        roll: query,
        remarks: 'Not listed in the provisional merit list for Batch 01/2026.'
      });
      addToast(`Roll Number ${query} not found in active merit lists.`, 'info');
    }
  };

  return (
    <div className="results-page" id="main-content">
      {/* Background Liquid Glass Tricolor Canvas */}
      <div className="results-bg-wrapper" aria-hidden="true">
        <img src="/assets/tricolor-glass-light.jpg" alt="" className="results-bg-img light-img" />
        <img src="/assets/tricolor-glass-dark.jpg" alt="" className="results-bg-img dark-img" />
        <div className="results-bg-overlay" />
      </div>

      <div className="results-content-relative">
        {/* Hero Banner */}
        <div className="results-hero-banner">
          <div className="container">
            <span className="section-tag" style={{ color: 'var(--gold-light)' }}>
              MERIT LISTS & OFFICIAL GAZETTES
            </span>
            <h1 className="results-hero-title">Recruitment Results & Cut-Offs 2026</h1>
            <p className="results-hero-sub">
              Access official Common Entrance Exam (CEE) scorecards, UPSC CDS/NDA final merit rankings, and zonal recruitment rally cut-offs.
            </p>
          </div>
        </div>

        <div className="container results-main-layout">
        {/* Quick Roll Number Result Finder Box */}
        <div className="roll-checker-card">
          <div className="checker-header">
            <Award size={22} className="checker-icon" />
            <div>
              <h2 className="checker-title">Individual Candidate Result Finder</h2>
              <span className="checker-sub">Enter your Roll Number to instantly verify your merit status across all 2026 entrance lists.</span>
            </div>
          </div>

          <form onSubmit={handleRollSearch} className="checker-form">
            <div className="checker-input-wrap">
              <input
                type="text"
                required
                placeholder="Enter Roll Number (e.g. TGC141/2026/88921 or AMB/HAR/GD/2026/44102)..."
                value={rollCheck}
                onChange={(e) => setRollCheck(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              <Search size={16} />
              <span>Search Merit Lists</span>
            </button>
          </form>

          {rollCheckResult && (
            <div className={`roll-result-pane animate-fade-in ${rollCheckResult.qualified ? 'is-pass' : 'is-fail'}`}>
              {rollCheckResult.qualified ? (
                <div>
                  <div className="pass-status">
                    <CheckCircle2 size={20} />
                    <strong>CANDIDATURE RECOMMENDED / QUALIFIED</strong>
                  </div>
                  <div className="pass-meta">
                    <span>Roll Number: <strong>{rollCheckResult.roll}</strong></span>
                    <span>•</span>
                    <span>{rollCheckResult.meritRank}</span>
                  </div>
                  <p className="pass-desc">{rollCheckResult.remarks}</p>
                </div>
              ) : (
                <div>
                  <div className="fail-status">
                    <span>STATUS: NOT RECOMMENDED</span>
                  </div>
                  <p>{rollCheckResult.remarks}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Official Notifications & Merit Gazettes List */}
        <div className="merit-lists-section-card">
          <div className="lists-header-flex">
            <div>
              <h3 className="section-title" style={{ fontSize: '1.5rem' }}>Published Merit Gazettes & Scorecards</h3>
              <p className="section-subtitle" style={{ fontSize: '0.875rem' }}>
                Download authorized PDF gazettes released by the Directorate General of Recruiting.
              </p>
            </div>

            {/* Filter */}
            <div className="category-filter-chips" role="tablist" ref={chipsTrackRef}>
              {/* Sliding Liquid Glass Indicator */}
              <div
                className="sliding-glass-result-pill"
                style={{
                  transform: `translate3d(${indicatorStyle.left}px, ${indicatorStyle.top}px, 0)`,
                  width: `${indicatorStyle.width}px`,
                  height: `${indicatorStyle.height}px`,
                  opacity: indicatorStyle.opacity
                }}
                aria-hidden="true"
              />
              {categories.map((cat) => (
                <button
                  key={cat}
                  ref={(el) => (chipsRefs.current[cat] = el)}
                  type="button"
                  className={`cat-chip ${selectedCat === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCat(cat)}
                  role="tab"
                  aria-selected={selectedCat === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="merit-results-table-wrap">
            <table className="merit-table">
              <thead>
                <tr>
                  <th>Gazette Notification Title</th>
                  <th>Category / Stream</th>
                  <th>Zone / Authority</th>
                  <th>Cut-Off Threshold</th>
                  <th>Published Date</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((res) => (
                  <tr key={res.id}>
                    <td>
                      <div className="gazette-title-cell">
                        <FileText size={16} className="file-icon" />
                        <strong>{res.title}</strong>
                      </div>
                    </td>
                    <td><span className="cat-tag-badge">{res.category}</span></td>
                    <td>{res.zone}</td>
                    <td><strong className="cut-off-val">{res.cutOff}</strong></td>
                    <td>{res.date}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={() => addToast(`Downloading PDF Gazette: ${res.title.slice(0, 30)}...`, 'success')}
                      >
                        <Download size={14} />
                        <span>PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>{/* end results-content-relative */}

      <style>{`
        .results-page {
          background-color: var(--bg-app);
          min-height: 100vh;
          padding-bottom: 80px;
          position: relative;
          overflow: hidden;
        }

        .results-bg-wrapper {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .results-bg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transition: opacity 0.3s ease;
        }
        .results-bg-img.light-img { opacity: 0.75; display: block; }
        .results-bg-img.dark-img  { opacity: 0; display: none; }
        [data-theme='dark'] .results-bg-img.light-img { opacity: 0; display: none; }
        [data-theme='dark'] .results-bg-img.dark-img  { opacity: 0.85; display: block; }
        .results-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(244,246,248,0.45) 0%, rgba(255,255,255,0.3) 35%, rgba(244,246,248,0.6) 100%);
        }
        [data-theme='dark'] .results-bg-overlay {
          background: linear-gradient(180deg, rgba(11,23,16,0.6) 0%, rgba(18,36,25,0.45) 35%, rgba(11,23,16,0.75) 100%);
        }
        .results-content-relative {
          position: relative;
          z-index: 1;
        }

        .results-hero-banner {
          background: linear-gradient(135deg, #0e1a11 0%, #172c1c 100%);
          color: #ffffff;
          padding: 44px 0 52px;
          border-bottom: 1px solid var(--border-dark);
        }

        .results-hero-title {
          font-family: var(--font-display);
          font-size: 2.25rem;
          font-weight: 900;
          color: #ffffff;
          margin: 6px 0 8px;
        }

        .results-hero-sub {
          font-size: 1rem;
          color: #cbd5e1;
          max-width: 720px;
        }

        .results-main-layout {
          margin-top: -24px;
          max-width: 1060px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Checker Card */
        .roll-checker-card {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255,255,255,0.45);
          padding: 28px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }

        [data-theme='dark'] .roll-checker-card {
          background: rgba(18,34,23,0.75);
          border-color: rgba(255,255,255,0.08);
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }

        .checker-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 18px;
        }

        .checker-icon {
          color: var(--gold-dark);
          flex-shrink: 0;
        }

        .checker-title {
          font-family: var(--font-display);
          font-size: 1.1875rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .checker-sub {
          font-size: 0.8125rem;
          color: var(--text-muted);
        }

        .checker-form {
          display: flex;
          gap: 12px;
        }

        .checker-input-wrap {
          flex: 1;
        }

        .checker-input-wrap input {
          width: 100%;
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          border: 1.5px solid var(--border-medium);
          background: var(--bg-surface);
          color: var(--text-primary);
          font-size: 0.9375rem;
          outline: none;
        }

        .roll-result-pane {
          margin-top: 18px;
          padding: 16px 20px;
          border-radius: var(--radius-md);
          font-size: 0.875rem;
        }

        .roll-result-pane.is-pass {
          background: #dcfce7;
          border: 1px solid #86efac;
          color: #14532d;
        }

        .roll-result-pane.is-fail {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #991b1b;
        }

        .pass-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-display);
          font-weight: 800;
          margin-bottom: 4px;
        }

        .pass-meta {
          display: flex;
          gap: 10px;
          font-size: 0.8125rem;
          margin-bottom: 6px;
        }

        /* Merit Card */
        .merit-lists-section-card {
          background: #ffffff;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-subtle);
          padding: 28px;
          box-shadow: var(--shadow-md);
        }

        [data-theme='dark'] .merit-lists-section-card {
          background: var(--army-darkest);
          border-color: var(--border-medium);
        }

        .lists-header-flex {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 18px;
          margin-bottom: 20px;
          gap: 20px;
          flex-wrap: wrap;
        }

        .category-filter-chips {
          position: relative;
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          padding: 4px;
          background: rgba(0, 0, 0, 0.03);
          border-radius: var(--radius-full);
          border: 1px solid var(--border-subtle);
        }

        [data-theme='dark'] .category-filter-chips {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.08);
        }

        /* Animated Sliding Liquid Glass Results Pill */
        .sliding-glass-result-pill {
          position: absolute;
          left: 0;
          top: 0;
          border-radius: var(--radius-full);
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.98) 0%,
            rgba(242, 248, 244, 0.94) 50%,
            rgba(230, 240, 233, 0.88) 100%
          );
          backdrop-filter: blur(16px) saturate(200%);
          -webkit-backdrop-filter: blur(16px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, 0.98);
          box-shadow:
            0 6px 18px -2px rgba(27, 60, 36, 0.16),
            0 2px 6px rgba(0, 0, 0, 0.06),
            inset 0 1.5px 2px rgba(255, 255, 255, 1),
            inset 0 -1.5px 2px rgba(0, 0, 0, 0.04);
          pointer-events: none;
          z-index: 1;
          transition: transform 0.28s cubic-bezier(0.19, 1, 0.22, 1),
                      width 0.28s cubic-bezier(0.19, 1, 0.22, 1),
                      height 0.28s cubic-bezier(0.19, 1, 0.22, 1),
                      opacity 0.2s ease;
          will-change: transform, width;
        }

        [data-theme='dark'] .sliding-glass-result-pill {
          background: linear-gradient(
            145deg,
            rgba(45, 80, 56, 0.92) 0%,
            rgba(28, 50, 35, 0.88) 50%,
            rgba(22, 38, 27, 0.92) 100%
          );
          border: 1px solid rgba(197, 155, 39, 0.6);
          box-shadow:
            0 6px 20px rgba(0, 0, 0, 0.55),
            0 0 16px rgba(197, 155, 39, 0.3),
            inset 0 1.5px 2px rgba(255, 255, 255, 0.45),
            inset 0 -1px 2px rgba(0, 0, 0, 0.35);
        }

        .cat-chip {
          position: relative;
          z-index: 2;
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-size: 0.78125rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: color 0.2s ease, transform 0.16s cubic-bezier(0.34, 1.56, 0.64, 1);
          white-space: nowrap;
          user-select: none;
        }

        .cat-chip:hover {
          color: var(--text-primary);
          transform: scale(1.04);
        }

        .cat-chip:active {
          transform: scale(0.94);
        }

        [data-theme='dark'] .cat-chip:hover {
          color: #ffffff;
        }

        .cat-chip.active {
          color: var(--army-primary);
          font-weight: 800;
          background: transparent;
          box-shadow: none;
        }

        [data-theme='dark'] .cat-chip.active {
          color: var(--gold-light);
          background: transparent;
          box-shadow: none;
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
        }

        /* Table */
        .merit-results-table-wrap {
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow-x: auto;
        }

        .merit-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.8125rem;
        }

        .merit-table th {
          background: var(--bg-surface-subtle);
          padding: 12px 16px;
          font-weight: 800;
          color: var(--text-muted);
          text-transform: uppercase;
          font-size: 0.6875rem;
          letter-spacing: 0.04em;
          border-bottom: 1px solid var(--border-subtle);
        }

        .merit-table td {
          padding: 14px 16px;
          border-bottom: 1px solid var(--border-subtle);
          color: var(--text-secondary);
        }

        .merit-table tr:last-child td {
          border-bottom: none;
        }

        .gazette-title-cell {
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }

        .file-icon {
          color: var(--army-primary);
          flex-shrink: 0;
          margin-top: 2px;
        }

        [data-theme='dark'] .file-icon {
          color: var(--gold-light);
        }

        .cat-tag-badge {
          display: inline-flex;
          align-items: center;
          background: rgba(31, 73, 48, 0.08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: var(--army-primary);
          font-size: 0.6875rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 100px;
          border: 1px solid rgba(31, 73, 48, 0.15);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        [data-theme='dark'] .cat-tag-badge {
          color: var(--gold-light);
          background: rgba(197, 155, 39, 0.12);
          border-color: rgba(197, 155, 39, 0.25);
        }

        .cut-off-val {
          color: var(--army-primary);
        }

        [data-theme='dark'] .cut-off-val {
          color: var(--gold-light);
        }

        @media (max-width: 768px) {
          .checker-form {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default ResultsPage;
