import React from 'react';
import { Shield, Award, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HISTORIC_OPERATIONS } from '../../data/mockData';

const HistoricOperationsGallery = () => {
  return (
    <section className="historic-operations-section" id="operations" aria-label="Historic Operations and Gallantry">
      {/* Background Liquid Glass Tricolor Canvas */}
      <div className="operations-bg-wrapper" aria-hidden="true">
        <img
          src="/assets/tricolor-glass-light.jpg"
          alt=""
          className="operations-bg-img light-img"
        />
        <img
          src="/assets/tricolor-glass-dark.jpg"
          alt=""
          className="operations-bg-img dark-img"
        />
        <div className="operations-bg-overlay" />
      </div>

      <div className="container operations-content-relative">
        <div className="section-header-center">
          <span className="section-tag">LEGACY OF VALOUR</span>
          <h2 className="section-title">Historic Operations & Gallantry</h2>
          <p className="section-subtitle">
            From the frozen heights of Siachen and Kargil to rapid overseas interventions and life-saving disaster relief: discover the battle honors forged by the Indian soldier.
          </p>
        </div>

        <div className="operations-masonry-grid">
          {HISTORIC_OPERATIONS.map((op) => (
            <article
              key={op.id}
              className="operation-card"
            >
              <div className="op-image-box">
                <img
                  src={op.image}
                  alt={op.name}
                  className="op-cover-image"
                  loading="lazy"
                />
                <div className="op-overlay" />
                <span className="op-year-badge">{op.year}</span>
                <span className="op-honour-pill">{op.badge}</span>
              </div>

              <div className="op-info-content">
                <div className="op-theatre-tag">
                  <MapPin size={13} />
                  <span>{op.theatre}</span>
                </div>

                <h3 className="op-title">{op.name}</h3>
                <p className="op-summary">{op.summary}</p>

                <Link to={`/operations/${op.id}`} className="op-action-link" aria-label={`Read details of ${op.name}`}>
                  <span>Read Operation History & Heroes</span>
                  <ArrowRight size={14} className="op-arrow" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .historic-operations-section {
          position: relative;
          padding: 84px 0 96px;
          overflow: hidden;
          background-color: var(--bg-app);
        }

        .section-header-center {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 52px;
        }

        .operations-bg-wrapper {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .operations-bg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: opacity var(--transition-normal);
        }

        .operations-bg-img.light-img {
          opacity: 0.65;
          display: block;
        }

        .operations-bg-img.dark-img {
          opacity: 0;
          display: none;
        }

        [data-theme='dark'] .operations-bg-img.light-img {
          opacity: 0;
          display: none;
        }

        [data-theme='dark'] .operations-bg-img.dark-img {
          opacity: 0.7;
          display: block;
        }

        .operations-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(244, 246, 248, 0.76) 0%,
            rgba(255, 255, 255, 0.45) 45%,
            rgba(244, 246, 248, 0.82) 100%
          );
        }

        [data-theme='dark'] .operations-bg-overlay {
          background: linear-gradient(
            180deg,
            rgba(8, 13, 9, 0.82) 0%,
            rgba(14, 23, 16, 0.52) 50%,
            rgba(8, 13, 9, 0.88) 100%
          );
        }

        .operations-content-relative {
          position: relative;
          z-index: 1;
        }

        .operations-masonry-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .operation-card {
          background: rgba(255, 255, 255, 0.84);
          backdrop-filter: blur(24px) saturate(190%);
          -webkit-backdrop-filter: blur(24px) saturate(190%);
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 14px 34px -8px rgba(0, 0, 0, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.95);
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: all var(--transition-normal);
        }

        [data-theme='dark'] .operation-card {
          background: rgba(20, 35, 24, 0.78);
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: 0 16px 38px -8px rgba(0, 0, 0, 0.5), inset 0 1px 1.5px rgba(255, 255, 255, 0.15);
        }

        .operation-card:hover {
          transform: translateY(-6px);
          border-color: var(--army-light);
          box-shadow: 0 22px 44px -10px rgba(0, 0, 0, 0.14), inset 0 1px 2px rgba(255, 255, 255, 1);
        }

        [data-theme='dark'] .operation-card:hover {
          border-color: var(--gold-primary);
          box-shadow: 0 24px 48px -10px rgba(0, 0, 0, 0.7), inset 0 1px 2px rgba(255, 255, 255, 0.25);
        }

        .op-image-box {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .op-cover-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .operation-card:hover .op-cover-image {
          transform: scale(1.08);
        }

        .op-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.1) 0%,
            rgba(0, 0, 0, 0.65) 100%
          );
        }

        .op-year-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          background: rgba(15, 23, 42, 0.55);
          backdrop-filter: blur(12px) saturate(180%);
          -webkit-backdrop-filter: blur(12px) saturate(180%);
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.3);
          letter-spacing: 0.04em;
        }

        .op-honour-pill {
          position: absolute;
          bottom: 12px;
          left: 14px;
          background: linear-gradient(135deg, rgba(218, 165, 32, 0.35) 0%, rgba(180, 130, 20, 0.25) 100%);
          backdrop-filter: blur(14px) saturate(190%);
          -webkit-backdrop-filter: blur(14px) saturate(190%);
          color: #fff9e6;
          font-size: 0.71875rem;
          font-weight: 800;
          padding: 5px 13px;
          border-radius: 100px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border: 1px solid rgba(255, 223, 128, 0.55);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3), 0 0 12px rgba(218, 165, 32, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.5);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
        }

        .op-info-content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .op-theatre-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 8px;
        }

        .op-title {
          font-family: var(--font-display);
          font-size: 1.1875rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .op-summary {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .op-action-link {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-display);
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--army-primary);
          margin-top: auto;
          padding-top: 10px;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
        }

        [data-theme='dark'] .op-action-link {
          color: var(--gold-light);
          border-top-color: rgba(255, 255, 255, 0.08);
        }

        .op-arrow {
          transition: transform var(--transition-fast);
        }

        .operation-card:hover .op-arrow {
          transform: translateX(4px);
        }

        @media (max-width: 1024px) {
          .operations-masonry-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .operations-masonry-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default HistoricOperationsGallery;
