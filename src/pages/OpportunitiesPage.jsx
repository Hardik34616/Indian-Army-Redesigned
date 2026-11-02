import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  UserCheck,
  ChevronsUp,
  Flame,
  ArrowRight,
  Filter,
  GraduationCap,
  Users,
  Award,
  Sparkles
} from 'lucide-react';
import { OPPORTUNITIES } from '../data/mockData';

const OpportunitiesPage = () => {
  const [selectedCat, setSelectedCat] = useState('All');
  const [selectedEdu, setSelectedEdu] = useState('All');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
  const pillsTrackRef = useRef(null);
  const pillsRefs = useRef({});

  const categories = [
    { id: 'All', label: 'All Streams' },
    { id: 'officer', label: 'Officers Entry' },
    { id: 'jco', label: 'JCO / Other Ranks' },
    { id: 'agnipath', label: 'Agnipath Scheme' },
    { id: 'ta', label: 'Territorial Army' }
  ];

  const updateIndicator = () => {
    const currentBtn = pillsRefs.current[selectedCat];
    const track = pillsTrackRef.current;
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

  const filtered = OPPORTUNITIES.filter((opp) => {
    const matchCat = selectedCat === 'All' || opp.category === selectedCat;
    const matchEdu =
      selectedEdu === 'All' ||
      opp.qualification.toLowerCase().includes(selectedEdu.toLowerCase());
    return matchCat && matchEdu;
  });

  return (
    <div className="opportunities-page" id="main-content">
      {/* Background Liquid Glass Tricolor Canvas */}
      <div className="opp-bg-wrapper" aria-hidden="true">
        <img
          src="/assets/tricolor-glass-light.jpg"
          alt=""
          className="opp-bg-img light-img"
        />
        <img
          src="/assets/tricolor-glass-dark.jpg"
          alt=""
          className="opp-bg-img dark-img"
        />
        <div className="opp-bg-overlay" />
      </div>

      <div className="opp-content-relative">
        {/* Header Banner */}
        <div className="page-hero-banner">
          <div className="container">
            <span className="section-tag opp-tag">
              CAREER PATHWAYS 2026
            </span>
            <h1 className="page-hero-title">Recruitment Schemes & Opportunities</h1>
            <p className="page-hero-sub">
              Explore diverse entry routes for officers, soldiers, technical experts, and citizen soldiers in the Indian Army.
            </p>
          </div>
        </div>

        <div className="container main-content-layout">
        {/* Filters Bar */}
        <div className="catalog-filters-bar">
          <div className="filter-group">
            <span className="filter-title">Category:</span>
            <div className="filter-pills" role="tablist" ref={pillsTrackRef}>
              {/* Sliding Liquid Glass Indicator */}
              <div
                className="sliding-glass-opp-pill"
                style={{
                  transform: `translate3d(${indicatorStyle.left}px, ${indicatorStyle.top}px, 0)`,
                  width: `${indicatorStyle.width}px`,
                  height: `${indicatorStyle.height}px`,
                  opacity: indicatorStyle.opacity
                }}
                aria-hidden="true"
              />

              {categories.map((c) => (
                <button
                  key={c.id}
                  ref={(el) => (pillsRefs.current[c.id] = el)}
                  type="button"
                  className={`filter-pill-btn ${selectedCat === c.id ? 'active' : ''}`}
                  onClick={() => setSelectedCat(c.id)}
                  role="tab"
                  aria-selected={selectedCat === c.id}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-title">Education:</span>
            <select
              value={selectedEdu}
              onChange={(e) => setSelectedEdu(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Education Levels</option>
              <option value="10th">10th / Matriculation</option>
              <option value="10+2">10+2 / Intermediate</option>
              <option value="Graduate">Graduation (Any Stream)</option>
              <option value="B.Tech">Engineering (B.Tech/BE)</option>
              <option value="Law">Law Degree (LLB)</option>
            </select>
          </div>
        </div>

        {/* Opportunity Cards Showcase */}
        <div className="opportunities-catalog-grid">
          {filtered.map((opp) => (
            <div key={opp.id} className="catalog-card">
              <div className="catalog-img-box">
                <img src={opp.image} alt={opp.title} className="catalog-img" />
                <div className="catalog-img-overlay" />
                <span className="catalog-badge">{opp.badge}</span>
              </div>

              <div className="catalog-body">
                <h2 className="catalog-title">{opp.title}</h2>
                <p className="catalog-tagline">{opp.tagline}</p>
                <p className="catalog-desc">{opp.description}</p>

                {/* Specs Box */}
                <div className="catalog-specs-box">
                  <div className="spec-row">
                    <span className="spec-name">Gender:</span>
                    <span className="spec-val">{opp.gender}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-name">Age Limit:</span>
                    <span className="spec-val">{opp.ageLimit}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-name">Qualification:</span>
                    <span className="spec-val">{opp.qualification}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-name">Pay & Perks:</span>
                    <span className="spec-val highlight">{opp.salary}</span>
                  </div>
                </div>

                {/* Specific Entry Sub-items */}
                <div className="entries-sublist">
                  <span className="sublist-title">Notable Entry Streams:</span>
                  <div className="sublist-tags">
                    {opp.entries.map((entry, idx) => (
                      <span key={idx} className="sublist-chip">
                        {entry.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="catalog-eligibility-box">
                  <div className="eligibility-heading">
                    <GraduationCap size={16} />
                    <span>Eligibility at a glance</span>
                  </div>
                  <ul>
                    {opp.eligibilityCriteria.map((criterion, idx) => (
                      <li key={idx}>
                        <span className="eligibility-check">✓</span>
                        <span>{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="catalog-actions">
                  <Link to={`/opportunities/${opp.id}`} className="btn btn-primary">
                    <span>View Scheme Details</span>
                    <ArrowRight size={16} />
                  </Link>
                  <Link to={`/opportunities/${opp.id}?tab=eligibility`} className="btn btn-outline btn-sm">
                    <span>View Eligibility</span>
                  </Link>
                  <Link to={`/apply?entry=${opp.id}`} className="btn btn-gold btn-sm">
                    <span>Apply Online</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>

      <style>{`
        .opportunities-page {
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
        .opp-bg-wrapper {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .opp-bg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transition: opacity 0.3s ease;
        }

        .opp-bg-img.light-img {
          opacity: 0.75;
          display: block;
        }

        .opp-bg-img.dark-img {
          opacity: 0;
          display: none;
        }

        [data-theme='dark'] .opp-bg-img.light-img {
          opacity: 0;
          display: none;
        }

        [data-theme='dark'] .opp-bg-img.dark-img {
          opacity: 0.85;
          display: block;
        }

        .opp-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(244, 246, 248, 0.45) 0%,
            rgba(255, 255, 255, 0.3) 35%,
            rgba(244, 246, 248, 0.6) 100%
          );
        }

        [data-theme='dark'] .opp-bg-overlay {
          background: linear-gradient(
            180deg,
            rgba(11, 23, 16, 0.6) 0%,
            rgba(18, 36, 25, 0.45) 35%,
            rgba(11, 23, 16, 0.75) 100%
          );
        }

        .opp-content-relative {
          position: relative;
          z-index: 1;
        }

        /* -------------------------------------------------------------
           HERO BANNER: LIGHT & DARK LIQUID GLASS
           ------------------------------------------------------------- */
        .page-hero-banner {
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          color: var(--text-primary);
          padding: 48px 0;
          border-bottom: 1px solid rgba(226, 232, 240, 0.85);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          transition: background 0.3s ease, border-color 0.3s ease;
        }

        [data-theme='dark'] .page-hero-banner {
          background: rgba(18, 34, 23, 0.85);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);
        }

        .opp-tag {
          color: var(--gold-dark);
        }

        [data-theme='dark'] .opp-tag {
          color: var(--gold-light);
        }

        .page-hero-title {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 900;
          margin: 6px 0 10px;
          color: var(--text-primary);
        }

        [data-theme='dark'] .page-hero-title {
          color: #ffffff;
        }

        .page-hero-sub {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          max-width: 720px;
        }

        [data-theme='dark'] .page-hero-sub {
          color: #cbd5e1;
        }

        .main-content-layout {
          padding-top: 32px;
        }

        /* Filter Bar */
        .catalog-filters-bar {
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 255, 255, 0.95);
          padding: 16px 20px;
          box-shadow: 0 10px 25px -5px rgba(27, 60, 36, 0.06), 0 2px 6px rgba(0, 0, 0, 0.02);
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
          gap: 20px;
          flex-wrap: wrap;
        }

        [data-theme='dark'] .catalog-filters-bar {
          background: rgba(19, 34, 23, 0.85);
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .filter-title {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .filter-pills {
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

        [data-theme='dark'] .filter-pills {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.08);
        }

        /* Animated Sliding Liquid Glass Opportunity Pill */
        .sliding-glass-opp-pill {
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

        [data-theme='dark'] .sliding-glass-opp-pill {
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

        .filter-pill-btn {
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

        .filter-pill-btn:hover {
          color: var(--text-primary);
          transform: scale(1.04);
        }

        .filter-pill-btn:active {
          transform: scale(0.94);
        }

        [data-theme='dark'] .filter-pill-btn:hover {
          color: #ffffff;
        }

        .filter-pill-btn.active {
          color: var(--army-primary);
          font-weight: 800;
          background: transparent;
          box-shadow: none;
        }

        [data-theme='dark'] .filter-pill-btn.active {
          color: var(--gold-light);
          background: transparent;
          box-shadow: none;
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
        }

        .filter-select {
          padding: 8px 14px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-medium);
          background: var(--bg-surface);
          color: var(--text-primary);
          font-size: 0.8125rem;
          outline: none;
        }

        /* Catalog Grid */
        .opportunities-catalog-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }

        .catalog-card {
          background: #ffffff;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-md);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all var(--transition-normal);
        }

        [data-theme='dark'] .catalog-card {
          background: var(--army-dark);
          border-color: var(--border-medium);
        }

        .catalog-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl);
          border-color: var(--army-light);
        }

        .catalog-img-box {
          position: relative;
          height: 230px;
          overflow: hidden;
        }

        .catalog-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
        }

        .catalog-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.6) 100%);
        }

        .catalog-badge {
          position: absolute;
          bottom: 14px;
          left: 16px;
          background: linear-gradient(135deg, rgba(218, 165, 32, 0.35) 0%, rgba(180, 130, 20, 0.22) 100%);
          backdrop-filter: blur(14px) saturate(190%);
          -webkit-backdrop-filter: blur(14px) saturate(190%);
          color: #fff9e6;
          font-size: 0.71875rem;
          font-weight: 800;
          padding: 5px 13px;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border: 1px solid rgba(255, 223, 128, 0.55);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3), 0 0 12px rgba(218, 165, 32, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.5);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
        }

        .catalog-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .catalog-title {
          font-family: var(--font-display);
          font-size: 1.375rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .catalog-tagline {
          font-size: 0.8125rem;
          color: var(--army-primary);
          font-weight: 700;
          margin-bottom: 10px;
        }

        [data-theme='dark'] .catalog-tagline {
          color: var(--gold-light);
        }

        .catalog-desc {
          font-size: 0.84375rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 18px;
        }

        .catalog-specs-box {
          background: var(--bg-surface-subtle);
          border-radius: var(--radius-sm);
          padding: 12px 14px;
          border: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
          font-size: 0.8125rem;
        }

        .spec-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .spec-name {
          color: var(--text-muted);
        }

        .spec-val {
          font-weight: 700;
          color: var(--text-primary);
        }

        .spec-val.highlight {
          color: var(--army-primary);
        }

        [data-theme='dark'] .spec-val.highlight {
          color: var(--gold-light);
        }

        .entries-sublist {
          margin-bottom: 20px;
        }

        .sublist-title {
          font-size: 0.71875rem;
          font-weight: 800;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 6px;
          display: block;
        }

        .sublist-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .sublist-chip {
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          padding: 3px 10px;
          border-radius: 100px;
          font-size: 0.71875rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .catalog-eligibility-box {
          margin: 18px 0;
          padding: 14px 16px;
          border: 1px solid rgba(197, 155, 39, 0.28);
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, #fffdf6, #f9fbf8);
        }

        [data-theme='dark'] .catalog-eligibility-box {
          background: rgba(197, 155, 39, 0.08);
          border-color: rgba(229, 190, 89, 0.3);
        }

        .eligibility-heading {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--army-primary);
          font-family: var(--font-display);
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.02em;
          margin-bottom: 8px;
        }

        [data-theme='dark'] .eligibility-heading {
          color: var(--gold-light);
        }

        .catalog-eligibility-box ul {
          display: grid;
          gap: 6px;
          list-style: none;
        }

        .catalog-eligibility-box li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 0.76rem;
          line-height: 1.4;
        }

        .eligibility-check {
          color: var(--army-medium);
          font-weight: 900;
        }

        .catalog-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
          flex-wrap: wrap;
        }

        @media (max-width: 960px) {
          .opportunities-catalog-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default OpportunitiesPage;
