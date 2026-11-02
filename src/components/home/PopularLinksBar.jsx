import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  FileCheck,
  Calendar,
  TrendingUp,
  UserCheck,
  Users,
  HeartPulse
} from 'lucide-react';

const PopularLinksBar = () => {
  const { setStatusModalOpen, setAdmitCardModalOpen } = useApp();

  const links = [
    {
      title: 'Check Application Status',
      icon: FileCheck,
      path: '/track',
      onClick: () => setStatusModalOpen(true)
    },
    {
      title: 'Admit Card',
      icon: Calendar,
      path: '/admit-card',
      onClick: () => setAdmitCardModalOpen(true)
    },
    {
      title: 'Results',
      icon: TrendingUp,
      path: '/results'
    },
    {
      title: 'AI Based SSB Mentor',
      icon: UserCheck,
      path: '/ssb-mentor'
    },
    {
      title: 'Join as JCO / OR',
      icon: Users,
      path: '/opportunities/jco-or-enrolment'
    },
    {
      title: 'Quick Medical Check',
      icon: HeartPulse,
      path: '/quick-medical-check'
    }
  ];

  return (
    <section className="popular-links-section" aria-label="Popular Quick Links">
      <div className="container">
        <div className="popular-links-card">
          <div className="popular-links-header">
            <span className="popular-label">POPULAR LINKS</span>
          </div>

          <div className="popular-links-grid">
            {links.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  to={item.path}
                  className="popular-link-item"
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                  }}
                >
                  <Icon size={18} className="popular-item-icon" />
                  <span className="popular-item-title">{item.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .popular-links-section {
          position: relative;
          z-index: 20;
          margin-top: -24px;
          padding-bottom: 24px;
        }

        .popular-links-card {
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border-radius: var(--radius-md);
          box-shadow: 0 14px 32px -12px rgba(18, 40, 25, 0.22), 0 4px 12px rgba(18, 40, 25, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.82);
          display: flex;
          align-items: center;
          padding: 8px 16px;
          overflow-x: auto;
        }

        [data-theme='dark'] .popular-links-card {
          background: rgba(12, 32, 20, 0.72);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border-color: rgba(145, 183, 151, 0.2);
        }

        .popular-links-header {
          padding: 10px 20px 10px 12px;
          border-right: 1px solid var(--border-subtle);
          flex-shrink: 0;
        }

        .popular-label {
          font-family: var(--font-display);
          font-size: 0.8125rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--text-primary);
          white-space: nowrap;
        }

        .popular-links-grid {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 8px;
          padding-left: 12px;
        }

        .popular-link-item {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-size: 0.84375rem;
          font-weight: 600;
          transition: all var(--transition-fast);
          white-space: nowrap;
        }

        .popular-link-item:hover {
          color: var(--army-primary);
          background-color: rgba(31, 73, 48, 0.06);
          transform: translateY(-1px);
        }

        [data-theme='dark'] .popular-link-item:hover {
          color: #ffffff;
          background-color: rgba(255, 255, 255, 0.05);
        }

        .popular-item-icon {
          color: var(--army-primary);
          flex-shrink: 0;
        }

        [data-theme='dark'] .popular-item-icon {
          color: var(--gold-light);
        }

        @media (max-width: 1100px) {
          .popular-links-card {
            flex-direction: column;
            align-items: flex-start;
            padding: 12px;
          }
          .popular-links-header {
            border-right: none;
            border-bottom: 1px solid var(--border-subtle);
            width: 100%;
            padding: 4px 8px 8px;
            margin-bottom: 8px;
          }
          .popular-links-grid {
            flex-wrap: wrap;
            padding-left: 0;
            gap: 4px;
          }
        }
      `}</style>
    </section>
  );
};

export default PopularLinksBar;
