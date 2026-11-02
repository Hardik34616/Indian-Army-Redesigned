import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, FileText, ChevronRight, Download, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const AnnouncementsSection = () => {
  const { addToast } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
  const tabsTrackRef = useRef(null);
  const tabsRefs = useRef({});

  const categories = [
    { id: 'All', label: 'All Notices' },
    { id: 'officer', label: 'Officers Entry' },
    { id: 'agniveer', label: 'Agnipath' },
    { id: 'rally', label: 'Rally Updates' },
    { id: 'results', label: 'Results' }
  ];

  const updateIndicator = () => {
    const currentBtn = tabsRefs.current[activeCategory];
    const track = tabsTrackRef.current;
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
  }, [activeCategory]);

  const notifications = [
    {
      id: 'notif-01',
      type: 'officer',
      tag: 'Officers Entry',
      title: 'TGC-141 Course: Online applications closing on 15 March 2026. Engineering graduates eligible to apply.',
      date: '24 Aug 2026',
      isNew: true
    },
    {
      id: 'notif-02',
      type: 'agniveer',
      tag: 'Agnipath Scheme',
      title: 'Online Common Entrance Exam (CEE) for Agniveer Batch 01/2026: Mock Test Portal is now LIVE on Candidate Dashboard.',
      date: '22 Aug 2026',
      isNew: true
    },
    {
      id: 'notif-03',
      type: 'results',
      tag: 'Merit List',
      title: 'Combined Defence Services Examination (CDS I 2026) OTA Final Recommended Candidates list published by UPSC.',
      date: '19 Aug 2026',
      isNew: false
    },
    {
      id: 'notif-04',
      type: 'rally',
      tag: 'Rally Schedule',
      title: 'HQ Rtg Zone Ambala: Physical Fitness Rally schedule revised for Khadga Sports Ground from 12 May 2026.',
      date: '16 Aug 2026',
      isNew: false
    },
    {
      id: 'notif-05',
      type: 'advisory',
      tag: 'Important Notice',
      title: 'Mandatory Aadhaar-DigiLocker integration required for all upcoming Agnipath registrations.',
      date: '10 Aug 2026',
      isNew: false
    }
  ];

  const filteredNotifs = activeCategory === 'All'
    ? notifications
    : notifications.filter((n) => n.type === activeCategory || (activeCategory === 'officer' && n.type === 'officer'));

  return (
    <section className="announcements-section" aria-label="Latest Announcements and Notices">
      <div className="container">
        {/* Live Marquee Ticker */}
        <div className="live-ticker-wrap">
          <div className="ticker-badge">
            <span className="live-pulse" />
            <Bell size={14} />
            <span>FLASH NEWS</span>
          </div>
          <div className="ticker-marquee">
            <div className="marquee-content">
              <span>★ TGC-141 applications closing 15 March 2026</span>
              <span className="separator">|</span>
              <span>★ Agniveer Online CEE Practice Mock Tests available in candidate dashboard</span>
              <span className="separator">|</span>
              <span>★ Beware of touts: Recruitment is 100% free and strictly merit based</span>
              <span className="separator">|</span>
              <span>★ CDS II 2026 OTA joining instructions uploaded</span>
            </div>
          </div>
        </div>

        {/* Notices Board Card */}
        <div className="notices-card">
          <div className="notices-header">
            <div>
              <span className="section-tag">OFFICIAL CIRCULARS</span>
              <h2 className="section-title" style={{ fontSize: '1.75rem' }}>Latest Recruitment Announcements</h2>
            </div>

            <div className="notices-filter-tabs" role="tablist" ref={tabsTrackRef}>
              {/* Sliding Liquid Glass Indicator */}
              <div
                className="sliding-glass-notif-pill"
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
                  ref={(el) => (tabsRefs.current[c.id] = el)}
                  type="button"
                  className={`notif-tab ${activeCategory === c.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(c.id)}
                  role="tab"
                  aria-selected={activeCategory === c.id}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="notices-list">
            {filteredNotifs.map((notif) => (
              <div key={notif.id} className="notice-row">
                <div className="notice-meta">
                  <span className="notice-category-badge">{notif.tag}</span>
                  <span className="notice-date">{notif.date}</span>
                  {notif.isNew && (
                    <span className="new-badge">
                      <Sparkles size={11} /> NEW
                    </span>
                  )}
                </div>

                <p className="notice-title-text">{notif.title}</p>

                <button
                  type="button"
                  className="notice-download-btn"
                  onClick={() => addToast(`Opening Gazette Notification: ${notif.title.slice(0, 40)}...`, 'info')}
                >
                  <Download size={14} />
                  <span>PDF Document</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .announcements-section {
          padding: 32px 0 64px;
          background-color: var(--bg-app);
        }

        /* Marquee Ticker */
        .live-ticker-wrap {
          display: flex;
          align-items: center;
          background: #ffffff;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
          padding: 8px 16px;
          box-shadow: var(--shadow-sm);
          margin-bottom: 24px;
          overflow: hidden;
        }

        [data-theme='dark'] .live-ticker-wrap {
          background: var(--army-dark);
          border-color: var(--border-medium);
        }

        .ticker-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, rgba(31, 73, 48, 0.9) 0%, rgba(19, 42, 26, 0.95) 100%);
          backdrop-filter: blur(8px);
          color: #ffffff;
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 800;
          padding: 4px 12px;
          border-radius: 100px;
          flex-shrink: 0;
          letter-spacing: 0.06em;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        [data-theme='dark'] .ticker-badge {
          background: linear-gradient(135deg, rgba(218, 165, 32, 0.35) 0%, rgba(180, 130, 20, 0.2) 100%);
          color: var(--gold-light);
          border: 1px solid rgba(255, 223, 128, 0.35);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.3);
        }

        .live-pulse {
          width: 7px;
          height: 7px;
          background: #22c55e;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.4);
        }

        .ticker-marquee {
          flex: 1;
          overflow: hidden;
          padding-left: 16px;
        }

        .marquee-content {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          animation: marquee 25s linear infinite;
        }

        .separator {
          color: var(--gold-primary);
        }

        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        /* Notices Card */
        .notices-card {
          background: var(--bg-surface);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-md);
          padding: 28px;
        }

        .notices-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 18px;
          margin-bottom: 18px;
          gap: 20px;
        }

        .notices-filter-tabs {
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

        [data-theme='dark'] .notices-filter-tabs {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.08);
        }

        /* Animated Sliding Liquid Glass Notification Pill */
        .sliding-glass-notif-pill {
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

        [data-theme='dark'] .sliding-glass-notif-pill {
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

        .notif-tab {
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

        .notif-tab:hover {
          color: var(--text-primary);
          transform: scale(1.04);
        }

        .notif-tab:active {
          transform: scale(0.94);
        }

        [data-theme='dark'] .notif-tab:hover {
          color: #ffffff;
        }

        .notif-tab.active {
          color: var(--army-primary);
          font-weight: 800;
          background: transparent;
          box-shadow: none;
        }

        [data-theme='dark'] .notif-tab.active {
          color: var(--gold-light);
          background: transparent;
          box-shadow: none;
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
        }

        .notices-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .notice-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          border-radius: var(--radius-sm);
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          gap: 16px;
          transition: all var(--transition-fast);
        }

        .notice-row:hover {
          background: var(--bg-surface);
          border-color: var(--army-light);
          transform: translateX(3px);
        }

        .notice-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .notice-category-badge {
          font-size: 0.6875rem;
          font-weight: 700;
          color: var(--army-primary);
          background: rgba(31, 73, 48, 0.08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 3px 10px;
          border-radius: 100px;
          border: 1px solid rgba(31, 73, 48, 0.15);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        [data-theme='dark'] .notice-category-badge {
          color: var(--gold-light);
          background: rgba(197, 155, 39, 0.12);
          border-color: rgba(197, 155, 39, 0.25);
        }

        .notice-date {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .new-badge {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: #ffffff;
          font-size: 0.625rem;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 100px;
          box-shadow: 0 2px 6px rgba(239, 68, 68, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .notice-title-text {
          flex: 1;
          font-size: 0.84375rem;
          color: var(--text-primary);
          font-weight: 600;
          line-height: 1.4;
        }

        .notice-download-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.78125rem;
          font-weight: 600;
          color: var(--army-primary);
          padding: 6px 12px;
          border-radius: var(--radius-xs);
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          flex-shrink: 0;
          transition: all var(--transition-fast);
        }

        [data-theme='dark'] .notice-download-btn {
          background: var(--army-dark);
          color: var(--gold-light);
          border-color: var(--border-medium);
        }

        .notice-download-btn:hover {
          background: var(--army-primary);
          color: #ffffff;
        }

        @media (max-width: 900px) {
          .notice-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .notices-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
};

export default AnnouncementsSection;
