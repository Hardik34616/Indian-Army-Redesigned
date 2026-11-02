import React from 'react';
import { Link } from 'react-router-dom';
import {
  UserCheck,
  ChevronsUp,
  Flame,
  Shield,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Globe,
  Award
} from 'lucide-react';
import { OPPORTUNITIES } from '../../data/mockData';

const ExploreOpportunities = () => {
  const cardIcons = {
    'officers-entry': UserCheck,
    'jco-or-enrolment': ChevronsUp,
    'agnipath-scheme': Flame,
    'territorial-army': Shield
  };

  return (
    <section className="explore-opportunities-section" id="opportunities" aria-label="Explore Recruitment Opportunities">
      <div className="container">
        {/* Section Header */}
        <div className="opportunities-header">
          <div className="header-title-wrap">
            <span className="opportunities-tag">— EXPLORE OPPORTUNITIES —</span>
          </div>
          <Link to="/opportunities" className="view-all-link">
            <span>View All</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* 4 Cards Grid Matching Reference */}
        <div className="opportunities-grid">
          {OPPORTUNITIES.map((opp) => {
            const Icon = cardIcons[opp.id] || UserCheck;
            return (
              <div key={opp.id} className="opportunity-card" id={`card-${opp.id}`}>
                <div className="card-image-wrapper">
                  <img
                    src={opp.image}
                    alt={`${opp.title} soldier representation`}
                    className="card-bg-image"
                    loading="lazy"
                  />
                  <div className="card-gradient-overlay" />
                </div>

                <div className="card-content-box">
                  <div className="card-icon-pill">
                    <Icon size={18} />
                  </div>

                  <h3 className="card-title">{opp.title}</h3>
                  <p className="card-desc">
                    {opp.id === 'officers-entry' && 'Join as an Officer and lead with pride and honour.'}
                    {opp.id === 'jco-or-enrolment' && 'Enlist as JCO / OR and be the strength of the Army.'}
                    {opp.id === 'agnipath-scheme' && 'Serve the nation with Agnipath. A chance to be the change.'}
                    {opp.id === 'territorial-army' && 'Serve voluntarily while pursuing your civilian profession.'}
                  </p>

                  <div className="card-action-bottom">
                    <Link to={`/opportunities/${opp.id}`} className="card-link-btn">
                      <span>View More</span>
                      <ArrowRight size={15} className="arrow-icon" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Feature Benefits Ribbon */}
        <div className="benefits-ribbon">
          <div className="benefit-item">
            <div className="benefit-icon-box">
              <CheckCircle size={20} />
            </div>
            <div className="benefit-text">
              <span className="benefit-title">Transparent Process</span>
              <span className="benefit-sub">Fair and merit-based selection</span>
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon-box">
              <TrendingUp size={20} />
            </div>
            <div className="benefit-text">
              <span className="benefit-title">Great Career Growth</span>
              <span className="benefit-sub">Learn, grow and lead</span>
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon-box">
              <Globe size={20} />
            </div>
            <div className="benefit-text">
              <span className="benefit-title">Explore the World</span>
              <span className="benefit-sub">Travel, experience and excel</span>
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon-box">
              <Award size={20} />
            </div>
            <div className="benefit-text">
              <span className="benefit-title">Pride & Respect</span>
              <span className="benefit-sub">Earn lifelong pride and respect</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .explore-opportunities-section {
          background-color: var(--bg-surface-subtle);
          padding: 56px 0 64px;
          color: var(--text-primary);
          position: relative;
        }

        [data-theme='dark'] .explore-opportunities-section {
          background-color: #101b13;
          color: #ffffff;
        }

        .opportunities-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
          position: relative;
        }

        .header-title-wrap {
          flex: 1;
          text-align: center;
        }

        .opportunities-tag {
          font-family: var(--font-display);
          font-size: 0.875rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          color: var(--army-primary);
          text-transform: uppercase;
        }

        [data-theme='dark'] .opportunities-tag {
          color: #cbd5e1;
        }

        .view-all-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--army-primary);
          font-family: var(--font-display);
          font-size: 0.875rem;
          font-weight: 700;
          transition: all var(--transition-fast);
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }

        .view-all-link:hover {
          color: var(--gold-dark);
          transform: translateY(-50%) translateX(4px);
        }

        [data-theme='dark'] .view-all-link {
          color: #cbd5e1;
        }

        [data-theme='dark'] .view-all-link:hover {
          color: var(--gold-light);
        }

        /* 4 Cards Grid */
        .opportunities-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }

        .opportunity-card {
          background: #192a1d;
          border-radius: var(--radius-lg);
          overflow: hidden;
          position: relative;
          min-height: 310px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
          transition: all var(--transition-normal);
        }

        [data-theme='dark'] .opportunity-card {
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
        }

        .opportunity-card:hover {
          transform: translateY(-6px);
          border-color: rgba(197, 155, 39, 0.4);
          box-shadow: 0 20px 35px rgba(0, 0, 0, 0.2);
        }

        [data-theme='dark'] .opportunity-card:hover {
          box-shadow: 0 20px 35px rgba(0, 0, 0, 0.4);
        }

        .card-image-wrapper {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .card-bg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .opportunity-card:hover .card-bg-image {
          transform: scale(1.06);
        }

        .card-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(18, 32, 22, 0.12) 0%,
            rgba(18, 32, 22, 0.72) 55%,
            rgba(12, 22, 15, 0.96) 100%
          );
        }

        .card-content-box {
          position: relative;
          z-index: 10;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .card-icon-pill {
          width: 36px;
          height: 36px;
          background: rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }

        .card-title {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 6px;
        }

        .card-desc {
          font-size: 0.8125rem;
          color: #e2e8f0;
          line-height: 1.4;
          margin-bottom: 14px;
          min-height: 38px;
        }

        .card-action-bottom {
          display: flex;
          align-items: center;
        }

        .card-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-display);
          font-size: 0.8125rem;
          font-weight: 700;
          color: #ffffff;
          transition: all var(--transition-fast);
        }

        .card-link-btn:hover {
          color: var(--gold-light);
        }

        .arrow-icon {
          transition: transform var(--transition-fast);
        }

        .opportunity-card:hover .arrow-icon {
          transform: translateX(4px);
        }

        /* Benefits Ribbon */
        .benefits-ribbon {
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
          border-radius: var(--radius-md);
          padding: 18px 28px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        [data-theme='dark'] .benefits-ribbon {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: none;
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .benefit-icon-box {
          color: var(--army-primary);
          flex-shrink: 0;
        }

        [data-theme='dark'] .benefit-icon-box {
          color: var(--gold-light);
        }

        .benefit-text {
          display: flex;
          flex-direction: column;
        }

        .benefit-title {
          font-family: var(--font-display);
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        [data-theme='dark'] .benefit-title {
          color: #ffffff;
        }

        .benefit-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        [data-theme='dark'] .benefit-sub {
          color: #94a3b8;
        }

        @media (max-width: 1100px) {
          .opportunities-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .benefits-ribbon {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .opportunities-grid {
            grid-template-columns: 1fr;
          }
          .benefits-ribbon {
            grid-template-columns: 1fr;
          }
          .view-all-link {
            position: static;
            transform: none;
          }
          .opportunities-header {
            flex-direction: column;
            gap: 8px;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
};

export default ExploreOpportunities;
