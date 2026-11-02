import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  FileText,
  Clock,
  ArrowRight,
  Filter,
  CheckCircle2,
  Download
} from 'lucide-react';
import { RECRUITMENT_RALLIES } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

const RecruitmentCalendarPreview = () => {
  const { addToast } = useApp();
  const [selectedZone, setSelectedZone] = useState('All');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
  const pillsTrackRef = useRef(null);
  const pillsRefs = useRef({});

  const zones = ['All', 'Ambala', 'Bangalore', 'Danapur', 'Jalandhar', 'Kolkata', 'Lucknow', 'Pune', 'Shillong'];

  const filteredRallies = selectedZone === 'All'
    ? RECRUITMENT_RALLIES.slice(0, 4)
    : RECRUITMENT_RALLIES.filter((r) => r.zone.toLowerCase().includes(selectedZone.toLowerCase())).slice(0, 4);

  const updateIndicator = () => {
    const currentBtn = pillsRefs.current[selectedZone];
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
    // Small timeout to catch fonts/layout settles
    const timer = setTimeout(updateIndicator, 50);
    window.addEventListener('resize', updateIndicator);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [selectedZone]);

  const handleDownloadNotification = (rally) => {
    addToast(`Downloading Official Rally Notification for ${rally.zone} (${rally.category})`, 'success');
  };

  return (
    <section className="calendar-preview-section" id="rallies" aria-label="Recruitment Rally Radar">
      {/* Background Liquid Glass Tricolor Canvas */}
      <div className="calendar-bg-wrapper" aria-hidden="true">
        <img
          src="/assets/tricolor-glass-light.jpg"
          alt=""
          className="calendar-bg-img light-img"
        />
        <img
          src="/assets/tricolor-glass-dark.jpg"
          alt=""
          className="calendar-bg-img dark-img"
        />
        <div className="calendar-bg-overlay" />
      </div>

      <div className="container calendar-content-relative">
        {/* Section Header */}
        <div className="calendar-header-flex">
          <div>
            <span className="section-tag">LIVE SCHEDULE 2026</span>
            <h2 className="section-title">Recruitment Rally Radar</h2>
            <p className="section-subtitle">
              Locate active online registrations, upcoming physical fitness rallies, and Common Entrance Exam (CEE) schedules across all Zonal Recruiting Offices.
            </p>
          </div>

          <Link to="/calendar" className="btn btn-outline view-all-calendar-btn">
            <span>Full 2026 Calendar</span>
            <Calendar size={16} />
          </Link>
        </div>

        {/* Zone Filter Pills */}
        <div className="zone-filter-pills-bar" role="tablist" aria-label="Filter rallies by zone">
          <div className="filter-pill-label">
            <Filter size={14} />
            <span>Filter Zone:</span>
          </div>
          <div className="pills-scroll-track" ref={pillsTrackRef}>
            {/* Sliding Liquid Glass Indicator */}
            <div
              className="sliding-glass-pill"
              style={{
                transform: `translate3d(${indicatorStyle.left}px, ${indicatorStyle.top}px, 0)`,
                width: `${indicatorStyle.width}px`,
                height: `${indicatorStyle.height}px`,
                opacity: indicatorStyle.opacity
              }}
              aria-hidden="true"
            />

            {zones.map((zone) => (
              <button
                key={zone}
                ref={(el) => (pillsRefs.current[zone] = el)}
                type="button"
                className={`zone-pill ${selectedZone === zone ? 'active' : ''}`}
                onClick={() => setSelectedZone(zone)}
                role="tab"
                aria-selected={selectedZone === zone}
              >
                {zone === 'All' ? 'All Zones (Pan-India)' : `HQ ${zone}`}
              </button>
            ))}
          </div>
        </div>

        {/* Rally Cards List */}
        <div className="rally-cards-grid">
          {filteredRallies.map((rally) => (
            <div key={rally.id} className="rally-card">
              <div className="rally-card-top">
                <div className="rally-zone-badge">
                  <MapPin size={14} />
                  <span>{rally.zone}</span>
                </div>
                <span className={`status-badge-chip ${rally.statusType}`}>
                  {rally.status}
                </span>
              </div>

              <h3 className="rally-category-title">{rally.category}</h3>
              <p className="rally-venue-text">
                <strong>Venue:</strong> {rally.location}
              </p>
              <p className="rally-districts-text">
                <strong>Districts Covered:</strong> {rally.districts}
              </p>

              <div className="rally-dates-box">
                <div className="date-item">
                  <span className="date-label">Registration Window</span>
                  <span className="date-value">{rally.registrationWindow}</span>
                </div>
                <div className="date-item">
                  <span className="date-label">Physical Rally Dates</span>
                  <span className="date-value highlight">{rally.rallyDates}</span>
                </div>
                <div className="date-item">
                  <span className="date-label">Online CEE Date</span>
                  <span className="date-value">{rally.ceeDate}</span>
                </div>
              </div>

              <div className="rally-card-footer">
                <button
                  type="button"
                  className="download-notif-btn"
                  onClick={() => handleDownloadNotification(rally)}
                >
                  <Download size={14} />
                  <span>PDF Gazette</span>
                </button>

                <Link to="/find-entry" className="apply-rally-btn">
                  <span>Apply Online</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .calendar-preview-section {
          position: relative;
          padding: 72px 0 80px;
          overflow: hidden;
          background-color: var(--bg-app);
        }

        .calendar-bg-wrapper {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .calendar-bg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: opacity var(--transition-normal);
        }

        .calendar-bg-img.light-img {
          opacity: 0.65;
          display: block;
        }

        .calendar-bg-img.dark-img {
          opacity: 0;
          display: none;
        }

        [data-theme='dark'] .calendar-bg-img.light-img {
          opacity: 0;
          display: none;
        }

        [data-theme='dark'] .calendar-bg-img.dark-img {
          opacity: 0.7;
          display: block;
        }

        .calendar-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(244, 246, 248, 0.76) 0%,
            rgba(255, 255, 255, 0.45) 45%,
            rgba(244, 246, 248, 0.82) 100%
          );
        }

        [data-theme='dark'] .calendar-bg-overlay {
          background: linear-gradient(
            180deg,
            rgba(8, 13, 9, 0.82) 0%,
            rgba(14, 23, 16, 0.52) 50%,
            rgba(8, 13, 9, 0.88) 100%
          );
        }

        .calendar-content-relative {
          position: relative;
          z-index: 1;
        }

        .calendar-header-flex {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 28px;
        }

        .view-all-calendar-btn {
          flex-shrink: 0;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        [data-theme='dark'] .view-all-calendar-btn {
          background: rgba(22, 38, 26, 0.78);
        }

        /* Filter Pills */
        .zone-filter-pills-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
          background: rgba(255, 255, 255, 0.78);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          padding: 8px 16px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.85);
          box-shadow: 0 8px 24px -6px rgba(0, 0, 0, 0.07), inset 0 1px 1px rgba(255, 255, 255, 0.9);
        }

        [data-theme='dark'] .zone-filter-pills-bar {
          background: rgba(22, 38, 26, 0.78);
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.1);
        }

        .filter-pill-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .pills-scroll-track {
          position: relative;
          display: flex;
          align-items: center;
          gap: 6px;
          overflow-x: auto;
          padding: 3px;
          border-radius: var(--radius-full);
          scrollbar-width: none;
        }

        .pills-scroll-track::-webkit-scrollbar {
          display: none;
        }

        /* Animated Sliding Liquid Glass Pill (Expo UI / SwiftUI Depth) */
        .sliding-glass-pill {
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
            0 6px 20px -2px rgba(27, 60, 36, 0.18),
            0 2px 6px rgba(0, 0, 0, 0.07),
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

        [data-theme='dark'] .sliding-glass-pill {
          background: linear-gradient(
            145deg,
            rgba(45, 80, 56, 0.92) 0%,
            rgba(28, 50, 35, 0.88) 50%,
            rgba(22, 38, 27, 0.92) 100%
          );
          border: 1px solid rgba(197, 155, 39, 0.6);
          box-shadow:
            0 6px 22px rgba(0, 0, 0, 0.55),
            0 0 16px rgba(197, 155, 39, 0.3),
            inset 0 1.5px 2px rgba(255, 255, 255, 0.45),
            inset 0 -1px 2px rgba(0, 0, 0, 0.35);
        }

        .zone-pill {
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

        .zone-pill:hover {
          color: var(--text-primary);
          transform: scale(1.04);
        }

        .zone-pill:active {
          transform: scale(0.94);
        }

        [data-theme='dark'] .zone-pill:hover {
          color: #ffffff;
        }

        .zone-pill.active {
          color: var(--army-primary);
          font-weight: 800;
          background: transparent;
          box-shadow: none;
        }

        [data-theme='dark'] .zone-pill.active {
          color: var(--gold-light);
          background: transparent;
          box-shadow: none;
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
        }

        /* Rally Cards Grid */
        .rally-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .rally-card {
          background: rgba(255, 255, 255, 0.84);
          backdrop-filter: blur(24px) saturate(190%);
          -webkit-backdrop-filter: blur(24px) saturate(190%);
          border-radius: var(--radius-md);
          padding: 24px;
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 14px 34px -8px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 2px rgba(255, 255, 255, 0.95);
          display: flex;
          flex-direction: column;
          transition: all var(--transition-normal);
        }

        [data-theme='dark'] .rally-card {
          background: rgba(20, 35, 24, 0.78);
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: 0 16px 38px -8px rgba(0, 0, 0, 0.5), inset 0 1px 1.5px rgba(255, 255, 255, 0.15);
        }

        .rally-card:hover {
          border-color: var(--army-light);
          box-shadow: 0 22px 44px -10px rgba(0, 0, 0, 0.14), inset 0 1px 2px rgba(255, 255, 255, 1);
          transform: translateY(-3px);
        }

        [data-theme='dark'] .rally-card:hover {
          border-color: var(--gold-primary);
          box-shadow: 0 24px 48px -10px rgba(0, 0, 0, 0.7), inset 0 1px 2px rgba(255, 255, 255, 0.25);
        }

        .rally-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 12px;
        }

        .rally-zone-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-display);
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--army-primary);
        }

        [data-theme='dark'] .rally-zone-badge {
          color: var(--gold-light);
        }

        .status-badge-chip {
          padding: 4px 12px;
          border-radius: var(--radius-full);
          font-size: 0.71875rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.04em;
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
            0 6px 20px -2px rgba(27, 60, 36, 0.18),
            0 2px 6px rgba(0, 0, 0, 0.07),
            inset 0 1.5px 2px rgba(255, 255, 255, 1),
            inset 0 -1.5px 2px rgba(0, 0, 0, 0.04);
        }

        [data-theme='dark'] .status-badge-chip {
          background: linear-gradient(
            145deg,
            rgba(45, 80, 56, 0.92) 0%,
            rgba(28, 50, 35, 0.88) 50%,
            rgba(22, 38, 27, 0.92) 100%
          );
          border: 1px solid rgba(197, 155, 39, 0.6);
          box-shadow:
            0 6px 22px rgba(0, 0, 0, 0.55),
            0 0 16px rgba(197, 155, 39, 0.3),
            inset 0 1.5px 2px rgba(255, 255, 255, 0.45),
            inset 0 -1px 2px rgba(0, 0, 0, 0.35);
        }

        .status-badge-chip.active {
          color: var(--army-forest);
        }
        [data-theme='dark'] .status-badge-chip.active {
          color: var(--gold-light);
        }

        .status-badge-chip.admit-card {
          color: #b45309;
        }
        [data-theme='dark'] .status-badge-chip.admit-card {
          color: #fcd34d;
        }

        .status-badge-chip.upcoming {
          color: #3730a3;
        }
        [data-theme='dark'] .status-badge-chip.upcoming {
          color: #a5b4fc;
        }

        .rally-category-title {
          font-family: var(--font-display);
          font-size: 1.1875rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .rally-venue-text, .rally-districts-text {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.4;
          margin-bottom: 6px;
        }

        .rally-dates-box {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: var(--radius-sm);
          padding: 12px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin: 16px 0;
          border: 1px solid rgba(0, 0, 0, 0.06);
        }

        [data-theme='dark'] .rally-dates-box {
          background: rgba(0, 0, 0, 0.28);
          border-color: rgba(255, 255, 255, 0.08);
        }

        .date-item {
          display: flex;
          flex-direction: column;
        }

        .date-label {
          font-size: 0.6875rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .date-value {
          font-size: 0.78125rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-top: 2px;
        }

        .date-value.highlight {
          color: var(--army-primary);
        }

        [data-theme='dark'] .date-value.highlight {
          color: var(--gold-light);
        }

        .rally-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
        }

        [data-theme='dark'] .rally-card-footer {
          border-top-color: rgba(255, 255, 255, 0.08);
        }

        .download-notif-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-secondary);
          padding: 6px 12px;
          border-radius: var(--radius-xs);
          border: 1px solid var(--border-subtle);
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(8px);
          transition: all var(--transition-fast);
        }

        [data-theme='dark'] .download-notif-btn {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .download-notif-btn:hover {
          background: var(--bg-surface-subtle);
          color: var(--army-primary);
          border-color: var(--army-light);
        }

        [data-theme='dark'] .download-notif-btn:hover {
          background: rgba(255, 255, 255, 0.14);
          color: var(--gold-light);
          border-color: var(--gold-primary);
        }

        .apply-rally-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-display);
          font-size: 0.8125rem;
          font-weight: 700;
          color: #ffffff;
          background: var(--army-primary);
          padding: 7px 16px;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
          box-shadow: 0 4px 12px rgba(27, 48, 34, 0.25);
        }

        .apply-rally-btn:hover {
          background: var(--army-forest);
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(27, 48, 34, 0.35);
        }

        @media (max-width: 960px) {
          .rally-cards-grid {
            grid-template-columns: 1fr;
          }
          .calendar-header-flex {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
};

export default RecruitmentCalendarPreview;
