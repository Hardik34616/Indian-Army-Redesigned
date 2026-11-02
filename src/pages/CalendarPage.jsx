import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  MapPin,
  Filter,
  Download,
  ArrowRight,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { RECRUITMENT_RALLIES } from '../data/mockData';
import { useApp } from '../context/AppContext';

const CalendarPage = () => {
  const { addToast } = useApp();
  const [selectedZone, setSelectedZone] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const [zoneIndicator, setZoneIndicator] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
  const [statusIndicator, setStatusIndicator] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
  const zoneTrackRef = useRef(null);
  const zoneBtnsRef = useRef({});
  const statusTrackRef = useRef(null);
  const statusBtnsRef = useRef({});

  const zones = ['All', 'Ambala', 'Bangalore', 'Chennai', 'Danapur', 'Jalandhar', 'Kolkata', 'Lucknow', 'Pune', 'Shillong'];

  const statusOptions = [
    { id: 'All', label: 'All Rallies' },
    { id: 'active', label: 'Registration Open' },
    { id: 'upcoming', label: 'Upcoming Rallies' }
  ];

  const updateZoneIndicator = () => {
    const currentBtn = zoneBtnsRef.current[selectedZone];
    const track = zoneTrackRef.current;
    if (currentBtn && track) {
      setZoneIndicator({
        left: currentBtn.offsetLeft,
        top: currentBtn.offsetTop,
        width: currentBtn.offsetWidth,
        height: currentBtn.offsetHeight,
        opacity: 1
      });
    }
  };

  const updateStatusIndicator = () => {
    const currentBtn = statusBtnsRef.current[selectedStatus];
    const track = statusTrackRef.current;
    if (currentBtn && track) {
      setStatusIndicator({
        left: currentBtn.offsetLeft,
        top: currentBtn.offsetTop,
        width: currentBtn.offsetWidth,
        height: currentBtn.offsetHeight,
        opacity: 1
      });
    }
  };

  useEffect(() => {
    updateZoneIndicator();
    const timer = setTimeout(updateZoneIndicator, 50);
    window.addEventListener('resize', updateZoneIndicator);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateZoneIndicator);
    };
  }, [selectedZone]);

  useEffect(() => {
    updateStatusIndicator();
    const timer = setTimeout(updateStatusIndicator, 50);
    window.addEventListener('resize', updateStatusIndicator);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateStatusIndicator);
    };
  }, [selectedStatus]);

  const filteredRallies = RECRUITMENT_RALLIES.filter((r) => {
    const matchZone = selectedZone === 'All' || r.zone.toLowerCase().includes(selectedZone.toLowerCase());
    const matchStatus = selectedStatus === 'All' || (selectedStatus === 'active' && r.statusType === 'active') || (selectedStatus === 'upcoming' && r.statusType === 'upcoming');
    return matchZone && matchStatus;
  });

  return (
    <div className="calendar-page" id="main-content">
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

      <div className="calendar-content-relative">
        {/* Top Banner */}
        <div className="calendar-hero-banner">
          <div className="container">
            <span className="section-tag calendar-tag">
              ANNUAL RALLY SCHEDULE 2026-2027
            </span>
            <h1 className="calendar-hero-title">Recruitment Rallies & Examination Calendar</h1>
            <p className="calendar-hero-sub">
              Find designated rally grounds, online registration cutoff dates, and Computer Based Common Entrance Exam schedules for all Zonal Recruiting Offices across India.
            </p>
          </div>
        </div>

        <div className="container calendar-main-layout">
          {/* Filters */}
          <div className="calendar-filter-card">
            <div className="filter-row-item">
              <span className="filter-label">Recruiting Zone:</span>
              <div className="zones-scroll" role="tablist" ref={zoneTrackRef}>
                {/* Sliding Liquid Glass Indicator */}
                <div
                  className="sliding-glass-cal-pill"
                  style={{
                    transform: `translate3d(${zoneIndicator.left}px, ${zoneIndicator.top}px, 0)`,
                    width: `${zoneIndicator.width}px`,
                    height: `${zoneIndicator.height}px`,
                    opacity: zoneIndicator.opacity
                  }}
                  aria-hidden="true"
                />

                {zones.map((z) => (
                  <button
                    key={z}
                    ref={(el) => (zoneBtnsRef.current[z] = el)}
                    type="button"
                    className={`zone-filter-chip ${selectedZone === z ? 'active' : ''}`}
                    onClick={() => setSelectedZone(z)}
                    role="tab"
                    aria-selected={selectedZone === z}
                  >
                    {z === 'All' ? 'All Zones (Pan-India)' : `HQ ${z}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-row-item" style={{ marginTop: '14px' }}>
              <span className="filter-label">Status Filter:</span>
              <div className="status-chips" role="tablist" ref={statusTrackRef}>
                {/* Sliding Liquid Glass Indicator */}
                <div
                  className="sliding-glass-cal-pill"
                  style={{
                    transform: `translate3d(${statusIndicator.left}px, ${statusIndicator.top}px, 0)`,
                    width: `${statusIndicator.width}px`,
                    height: `${statusIndicator.height}px`,
                    opacity: statusIndicator.opacity
                  }}
                  aria-hidden="true"
                />

                {statusOptions.map((st) => (
                  <button
                    key={st.id}
                    ref={(el) => (statusBtnsRef.current[st.id] = el)}
                    type="button"
                    className={`status-filter-chip ${selectedStatus === st.id ? 'active' : ''}`}
                    onClick={() => setSelectedStatus(st.id)}
                    role="tab"
                    aria-selected={selectedStatus === st.id}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Rallies Grid */}
          <div className="rallies-detailed-grid">
            {filteredRallies.map((rally) => (
              <div key={rally.id} className="detailed-rally-card animate-fade-in">
                <div className="detailed-card-top">
                  <div className="detailed-zone-tag">
                    <MapPin size={16} />
                    <span>{rally.zone}</span>
                  </div>
                  <span className={`status-badge-chip ${rally.statusType}`}>
                    {rally.status}
                  </span>
                </div>

                <h2 className="detailed-category-title">{rally.category}</h2>

                <div className="rally-location-details">
                  <div className="loc-item">
                    <strong>Rally Stadium / Venue:</strong>
                    <span>{rally.location}</span>
                  </div>
                  <div className="loc-item">
                    <strong>Eligible Districts:</strong>
                    <span>{rally.districts}</span>
                  </div>
                </div>

                <div className="schedule-matrix-box">
                  <div className="matrix-item">
                    <span className="m-label">Online Registration:</span>
                    <span className="m-val">{rally.registrationWindow}</span>
                  </div>
                  <div className="matrix-item">
                    <span className="m-label">Physical Fitness Rally:</span>
                    <span className="m-val highlight">{rally.rallyDates}</span>
                  </div>
                  <div className="matrix-item">
                    <span className="m-label">Computer Based CEE:</span>
                    <span className="m-val">{rally.ceeDate}</span>
                  </div>
                </div>

                <div className="detailed-card-footer">
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => addToast(`Downloading Notification PDF for ${rally.zone}`, 'success')}
                  >
                    <Download size={14} />
                    <span>Gazette PDF</span>
                  </button>

                  <Link to="/find-entry" className="btn btn-primary btn-sm">
                    <span>Register Online</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .calendar-page {
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
          object-position: center top;
          transition: opacity 0.3s ease;
        }

        .calendar-bg-img.light-img {
          opacity: 0.75;
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
          opacity: 0.85;
          display: block;
        }

        .calendar-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(244, 246, 248, 0.45) 0%,
            rgba(255, 255, 255, 0.3) 35%,
            rgba(244, 246, 248, 0.6) 100%
          );
        }

        [data-theme='dark'] .calendar-bg-overlay {
          background: linear-gradient(
            180deg,
            rgba(11, 23, 16, 0.6) 0%,
            rgba(18, 36, 25, 0.45) 35%,
            rgba(11, 23, 16, 0.75) 100%
          );
        }

        .calendar-content-relative {
          position: relative;
          z-index: 1;
        }

        /* -------------------------------------------------------------
           HERO BANNER: LIGHT & DARK LIQUID GLASS
           ------------------------------------------------------------- */
        .calendar-hero-banner {
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          color: var(--text-primary);
          padding: 44px 0 52px;
          border-bottom: 1px solid rgba(226, 232, 240, 0.85);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          transition: background 0.3s ease, border-color 0.3s ease;
        }

        [data-theme='dark'] .calendar-hero-banner {
          background: rgba(18, 34, 23, 0.85);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);
        }

        .calendar-tag {
          color: var(--gold-dark);
        }

        [data-theme='dark'] .calendar-tag {
          color: var(--gold-light);
        }

        .calendar-hero-title {
          font-family: var(--font-display);
          font-size: 2.25rem;
          font-weight: 900;
          color: var(--text-primary);
          margin: 6px 0 8px;
        }

        [data-theme='dark'] .calendar-hero-title {
          color: #ffffff;
        }

        .calendar-hero-sub {
          font-size: 1rem;
          color: var(--text-secondary);
          max-width: 720px;
        }

        [data-theme='dark'] .calendar-hero-sub {
          color: #cbd5e1;
        }

        .calendar-main-layout {
          margin-top: -24px;
          max-width: 1060px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Filter Card */
        .calendar-filter-card {
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.95);
          padding: 20px 24px;
          box-shadow: 0 10px 25px -5px rgba(27, 60, 36, 0.06), 0 2px 6px rgba(0, 0, 0, 0.02);
        }

        [data-theme='dark'] .calendar-filter-card {
          background: rgba(19, 34, 23, 0.85);
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
        }

        .filter-row-item {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .filter-label {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-muted);
          min-width: 120px;
        }

        .zones-scroll, .status-chips {
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

        [data-theme='dark'] .zones-scroll,
        [data-theme='dark'] .status-chips {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.08);
        }

        /* Animated Sliding Liquid Glass Calendar Pill */
        .sliding-glass-cal-pill {
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

        [data-theme='dark'] .sliding-glass-cal-pill {
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

        .zone-filter-chip, .status-filter-chip {
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

        .zone-filter-chip:hover, .status-filter-chip:hover {
          color: var(--text-primary);
          transform: scale(1.04);
        }

        .zone-filter-chip:active, .status-filter-chip:active {
          transform: scale(0.94);
        }

        [data-theme='dark'] .zone-filter-chip:hover,
        [data-theme='dark'] .status-filter-chip:hover {
          color: #ffffff;
        }

        .zone-filter-chip.active, .status-filter-chip.active {
          color: var(--army-primary);
          font-weight: 800;
          background: transparent;
          box-shadow: none;
        }

        [data-theme='dark'] .zone-filter-chip.active,
        [data-theme='dark'] .status-filter-chip.active {
          color: var(--gold-light);
          background: transparent;
          box-shadow: none;
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
        }

        /* Rallies Grid */
        .rallies-detailed-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .detailed-rally-card {
          background: rgba(255, 255, 255, 0.84);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.95);
          padding: 24px;
          box-shadow: 0 10px 25px -5px rgba(27, 60, 36, 0.05), 0 2px 6px rgba(0, 0, 0, 0.02);
          display: flex;
          flex-direction: column;
          transition: all var(--transition-normal);
        }

        [data-theme='dark'] .detailed-rally-card {
          background: rgba(19, 34, 23, 0.82);
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
        }

        .detailed-rally-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 32px -6px rgba(27, 60, 36, 0.12);
          border-color: var(--army-light);
        }

        [data-theme='dark'] .detailed-rally-card:hover {
          box-shadow: 0 16px 32px -6px rgba(0, 0, 0, 0.6);
          border-color: rgba(197, 155, 39, 0.4);
        }

        .detailed-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .detailed-zone-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-display);
          font-size: 0.875rem;
          font-weight: 800;
          color: var(--army-primary);
        }

        [data-theme='dark'] .detailed-zone-tag {
          color: var(--gold-light);
        }

        .detailed-category-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .status-badge-chip {
          padding: 4px 12px;
          border-radius: 100px;
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

        .rally-location-details {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 0.8125rem;
          margin-bottom: 16px;
        }

        .loc-item strong {
          color: var(--text-primary);
          margin-right: 6px;
        }

        .loc-item span {
          color: var(--text-secondary);
        }

        .schedule-matrix-box {
          background: rgba(244, 247, 245, 0.85);
          border: 1px solid rgba(226, 232, 240, 0.85);
          border-radius: var(--radius-sm);
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
          font-size: 0.8125rem;
        }

        [data-theme='dark'] .schedule-matrix-box {
          background: rgba(0, 0, 0, 0.25);
          border-color: rgba(255, 255, 255, 0.06);
        }

        .matrix-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .m-label {
          color: var(--text-muted);
        }

        .m-val {
          font-weight: 700;
          color: var(--text-primary);
        }

        .m-val.highlight {
          color: var(--army-primary);
        }

        [data-theme='dark'] .m-val.highlight {
          color: var(--gold-light);
        }

        .detailed-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
        }

        @media (max-width: 900px) {
          .rallies-detailed-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default CalendarPage;
