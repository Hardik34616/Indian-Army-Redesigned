import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  GraduationCap
} from 'lucide-react';
import { ACADEMIES } from '../../data/academiesData';

const PrestigiousAcademies = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalAcademies = ACADEMIES.length;

  const goToAcademy = useCallback(
    (index) => {
      if (isTransitioning || index === activeIndex) return;
      setIsTransitioning(true);
      setActiveIndex(index);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    },
    [activeIndex, isTransitioning]
  );

  const nextAcademy = useCallback(() => {
    goToAcademy((activeIndex + 1) % totalAcademies);
  }, [activeIndex, goToAcademy, totalAcademies]);

  const prevAcademy = useCallback(() => {
    goToAcademy((activeIndex - 1 + totalAcademies) % totalAcademies);
  }, [activeIndex, goToAcademy, totalAcademies]);

  // Keyboard navigation with Left and Right arrow keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        document.activeElement &&
        (document.activeElement.tagName === 'INPUT' ||
          document.activeElement.tagName === 'TEXTAREA')
      ) {
        return;
      }

      if (e.key === 'ArrowRight') {
        nextAcademy();
      } else if (e.key === 'ArrowLeft') {
        prevAcademy();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextAcademy, prevAcademy]);

  const current = ACADEMIES[activeIndex];

  return (
    <section
      className="hero-container prestigious-academies-section"
      aria-label="Our Prestigious Military Training Academies"
      id="prestigious-academies"
    >
      {/* Background Image Layer with Smooth Transitions */}
      <div className="hero-background-wrapper">
        {ACADEMIES.map((academy, idx) => (
          <div
            key={academy.id}
            className={`academy-bg-slide ${idx === activeIndex ? 'active' : ''}`}
            aria-hidden={idx !== activeIndex}
          >
            <img
              src={academy.image}
              alt={`${academy.title} - ${academy.location}`}
              className="hero-bg-img light-img"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
            <img
              src={academy.darkImage}
              alt={`${academy.title} - ${academy.location}`}
              className="hero-bg-img dark-img"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* Dual Light/Dark Overlays & Vignettes matching HeroSection */}
        <div className="hero-overlay-gradient light-overlay" />
        <div className="hero-overlay-gradient dark-overlay" />
        <div className="hero-vignette light-vignette" />
        <div className="hero-vignette dark-vignette" />
      </div>

      <div className="container hero-content-relative academy-content-container">
        <div className="hero-main-layout">
          {/* Left Editorial Text Column */}
          <div className={`hero-text-column academy-editorial-col ${isTransitioning ? 'transitioning' : ''}`}>
            {/* Top Category Badge */}
            <div className="academy-pre-heading">
              <span className="academy-section-label">OUR PRESTIGIOUS ACADEMIES</span>
            </div>

            {/* Tricolor Indicator Line with Motto */}
            <div className="hero-tricolor-badge">
              <span className="tricolor-bar-accent" />
              <span className="hero-tagline-text">
                {current.motto} • {current.mottoTranslation.toUpperCase()}
              </span>
            </div>

            {/* Huge Display Heading with Gradient Word Highlight */}
            <h2 className="hero-main-title academy-hero-title">
              {current.id === 'nda' && (
                <>
                  NATIONAL DEFENCE <br />
                  <span className="title-highlight">ACADEMY</span> (NDA)
                </>
              )}
              {current.id === 'ima' && (
                <>
                  INDIAN <span className="title-highlight">MILITARY</span> <br />
                  ACADEMY (IMA)
                </>
              )}
              {current.id === 'ota' && (
                <>
                  OFFICERS <span className="title-highlight">TRAINING</span> <br />
                  ACADEMY (OTA)
                </>
              )}
            </h2>

            {/* Location & Establishment Subheading */}
            <div className="academy-meta-pill">
              <MapPin size={15} className="meta-icon" />
              <span className="meta-location">{current.location}</span>
              <span className="meta-sep">•</span>
              <span className="meta-estd">{current.badge}</span>
            </div>

            {/* Subtitle & Compelling Description */}
            <p className="hero-subtext academy-hero-desc">
              {current.description}
            </p>

            {/* Quick Key Highlights Grid */}
            <div className="academy-quick-stats-row">
              {current.quickStats.map((stat, i) => (
                <div key={i} className="academy-quick-stat-card">
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-val">{stat.val}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons: Read More & Explore Entries */}
            <div className="hero-actions-group academy-actions-group">
              <Link
                to={`/academies/${current.id}`}
                className="btn btn-primary btn-lg hero-cta-apply"
                id={`btn-read-more-${current.id}`}
              >
                <span>Read More About {current.code}</span>
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/find-entry"
                className="btn hero-cta-rally"
              >
                <span>Explore Entry Schemes</span>
                <GraduationCap size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Navigation Controls on the Right Side */}
      <div className="academy-carousel-controls" aria-label="Carousel navigation">
        <button
          type="button"
          className="academy-nav-arrow-btn"
          onClick={prevAcademy}
          aria-label="Previous Academy (Left Arrow Key)"
          title="Previous Academy (Press Left Arrow)"
        >
          <ChevronLeft size={22} />
        </button>

        <div className="academy-counter-pill">
          <span className="counter-current">0{activeIndex + 1}</span>
          <span className="counter-divider">/</span>
          <span className="counter-total">0{totalAcademies}</span>
        </div>

        <button
          type="button"
          className="academy-nav-arrow-btn"
          onClick={nextAcademy}
          aria-label="Next Academy (Right Arrow Key)"
          title="Next Academy (Press Right Arrow)"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <style>{`
        .prestigious-academies-section {
          border-top: 1px solid rgba(27, 48, 34, 0.08);
          border-bottom: 1px solid rgba(27, 48, 34, 0.08);
          min-height: 700px;
          padding: 60px 0 80px;
          position: relative;
        }

        [data-theme='dark'] .prestigious-academies-section {
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .prestigious-academies-section .academy-content-container {
          padding-right: 0;
        }

        /* Slide Transition for Background Images */
        .academy-bg-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: scale(1.04);
          transition:
            opacity 800ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 1000ms cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
          will-change: opacity, transform;
        }

        .academy-bg-slide.active {
          opacity: 1;
          transform: scale(1);
          pointer-events: auto;
        }

        .academy-pre-heading {
          margin-bottom: 8px;
        }

        .academy-section-label {
          display: inline-block;
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 900;
          letter-spacing: 0.16em;
          color: var(--army-primary);
          background: rgba(31, 73, 48, 0.08);
          padding: 4px 12px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(31, 73, 48, 0.15);
        }

        [data-theme='dark'] .academy-section-label {
          color: var(--gold-light);
          background: rgba(197, 155, 39, 0.12);
          border-color: rgba(197, 155, 39, 0.25);
        }

        .academy-editorial-col {
          transition: opacity 300ms ease, transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .academy-editorial-col.transitioning {
          opacity: 0.2;
          transform: translateY(8px);
        }

        .academy-hero-title {
          font-size: 3.4rem;
          margin-bottom: 12px;
        }

        .academy-meta-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.875rem;
          color: #475569;
          margin-bottom: 16px;
          font-weight: 600;
        }

        [data-theme='dark'] .academy-meta-pill {
          color: #cbd5e1;
        }

        .academy-meta-pill .meta-icon {
          color: var(--gold-dark);
        }

        [data-theme='dark'] .academy-meta-pill .meta-icon {
          color: var(--gold-light);
        }

        .academy-meta-pill .meta-sep {
          opacity: 0.4;
        }

        .meta-estd {
          background: rgba(31, 73, 48, 0.08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: var(--army-primary);
          font-weight: 700;
          padding: 2px 10px;
          border-radius: 100px;
          border: 1px solid rgba(31, 73, 48, 0.15);
          font-size: 0.75rem;
        }

        [data-theme='dark'] .meta-estd {
          color: var(--gold-light);
          background: rgba(197, 155, 39, 0.12);
          border-color: rgba(197, 155, 39, 0.25);
        }

        .academy-hero-desc {
          max-width: 680px;
          font-size: 1.05rem;
          margin-bottom: 20px;
        }

        /* Quick Stats Grid inside Hero View */
        .academy-quick-stats-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 12px;
          max-width: 680px;
          margin-bottom: 28px;
        }

        .academy-quick-stat-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: var(--radius-sm);
          padding: 8px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .academy-quick-stat-card:hover {
          border-color: rgba(31, 73, 48, 0.3);
          transform: translateY(-2px);
        }

        [data-theme='dark'] .academy-quick-stat-card {
          background: rgba(11, 29, 18, 0.7);
          border-color: rgba(255, 255, 255, 0.1);
        }

        [data-theme='dark'] .academy-quick-stat-card:hover {
          border-color: var(--gold-primary);
        }

        .academy-quick-stat-card .stat-label {
          font-size: 0.6875rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #64748b;
          font-weight: 700;
        }

        [data-theme='dark'] .academy-quick-stat-card .stat-label {
          color: #94a3b8;
        }

        .academy-quick-stat-card .stat-val {
          font-size: 0.8125rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.25;
        }

        [data-theme='dark'] .academy-quick-stat-card .stat-val {
          color: #f8fafc;
        }

        .academy-actions-group {
          margin-bottom: 0;
        }

        /* Carousel Navigation Controls positioned on the Right Side */
        .academy-carousel-controls {
          position: absolute;
          bottom: 40px;
          right: 60px;
          left: auto;
          transform: none;
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 30;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          padding: 8px 16px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        [data-theme='dark'] .academy-carousel-controls {
          background: rgba(11, 29, 18, 0.88);
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }

        .academy-nav-arrow-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(31, 73, 48, 0.08);
          border: 1px solid rgba(31, 73, 48, 0.15);
          color: var(--army-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .academy-nav-arrow-btn:hover {
          background: var(--army-primary);
          color: #ffffff;
          transform: scale(1.08);
        }

        [data-theme='dark'] .academy-nav-arrow-btn {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
          color: #ffffff;
        }

        [data-theme='dark'] .academy-nav-arrow-btn:hover {
          background: var(--gold-primary);
          border-color: var(--gold-primary);
          color: #0d1a0f;
        }

        .academy-counter-pill {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-display);
          font-size: 0.9375rem;
          font-weight: 800;
          padding: 0 10px;
        }

        .counter-current {
          color: var(--army-primary);
        }

        [data-theme='dark'] .counter-current {
          color: var(--gold-light);
        }

        .counter-divider {
          color: #94a3b8;
          font-weight: 400;
        }

        .counter-total {
          color: #64748b;
        }

        [data-theme='dark'] .counter-total {
          color: #94a3b8;
        }

        @media (max-width: 1200px) {
          .academy-hero-title {
            font-size: 2.8rem;
          }
          .academy-carousel-controls {
            right: 40px;
            bottom: 30px;
          }
        }

        @media (max-width: 992px) {
          .prestigious-academies-section {
            padding: 40px 0 90px;
            min-height: auto;
          }
          .academy-hero-title {
            font-size: 2.3rem;
          }
          .academy-carousel-controls {
            bottom: 24px;
            right: 24px;
          }
        }

        @media (max-width: 640px) {
          .academy-hero-title {
            font-size: 1.9rem;
          }
          .academy-quick-stats-row {
            grid-template-columns: 1fr 1fr;
          }
          .academy-meta-pill {
            font-size: 0.75rem;
            flex-wrap: wrap;
          }
          .academy-carousel-controls {
            bottom: 20px;
            right: 20px;
            padding: 6px 12px;
          }
          .academy-nav-arrow-btn {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </section>
  );
};

export default PrestigiousAcademies;
