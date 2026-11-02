import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, FileText, Calendar, Award, Shield, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OPPORTUNITIES, RECRUITMENT_RALLIES, HISTORIC_OPERATIONS, FAQS } from '../../data/mockData';

const SearchModal = () => {
  const { searchModalOpen, setSearchModalOpen } = useApp();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchModalOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [searchModalOpen]);

  if (!searchModalOpen) return null;

  // Search aggregations
  const trimmed = query.trim().toLowerCase();

  const oppMatches = trimmed
    ? OPPORTUNITIES.filter(
        (o) =>
          o.title.toLowerCase().includes(trimmed) ||
          o.description.toLowerCase().includes(trimmed) ||
          o.entries.some((e) => e.name.toLowerCase().includes(trimmed))
      )
    : [];

  const rallyMatches = trimmed
    ? RECRUITMENT_RALLIES.filter(
        (r) =>
          r.zone.toLowerCase().includes(trimmed) ||
          r.location.toLowerCase().includes(trimmed) ||
          r.category.toLowerCase().includes(trimmed) ||
          r.districts.toLowerCase().includes(trimmed)
      )
    : [];

  const opMatches = trimmed
    ? HISTORIC_OPERATIONS.filter(
        (op) =>
          op.name.toLowerCase().includes(trimmed) ||
          op.summary.toLowerCase().includes(trimmed) ||
          op.theatre.toLowerCase().includes(trimmed)
      )
    : [];

  const faqMatches = trimmed
    ? FAQS.filter(
        (f) =>
          f.q.toLowerCase().includes(trimmed) ||
          f.a.toLowerCase().includes(trimmed) ||
          f.category.toLowerCase().includes(trimmed)
      )
    : [];

  const hasResults = oppMatches.length > 0 || rallyMatches.length > 0 || opMatches.length > 0 || faqMatches.length > 0;

  const handleSelect = (path) => {
    setSearchModalOpen(false);
    navigate(path);
  };

  return (
    <div className="search-modal-backdrop" onClick={() => setSearchModalOpen(false)}>
      <div
        className="search-modal-dialog animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search Portal"
      >
        <div className="search-input-header">
          <Search size={20} className="search-box-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type to search (e.g., NDA, CDS, Agnipath, Ambala Rally, Kargil, PFT criteria)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="modal-search-input"
          />
          <button
            type="button"
            className="search-close-btn"
            onClick={() => setSearchModalOpen(false)}
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        <div className="search-results-pane">
          {trimmed ? (
            hasResults ? (
              <div className="results-groups">
                {/* Opportunities */}
                {oppMatches.length > 0 && (
                  <div className="result-group">
                    <span className="group-label">Recruitment Opportunities</span>
                    {oppMatches.map((opp) => (
                      <div
                        key={opp.id}
                        className="result-row"
                        onClick={() => handleSelect(`/opportunities/${opp.id}`)}
                      >
                        <Shield size={16} className="row-icon" />
                        <div className="row-text">
                          <strong>{opp.title}</strong>
                          <span>{opp.tagline}</span>
                        </div>
                        <ArrowRight size={14} className="row-arrow" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Rallies */}
                {rallyMatches.length > 0 && (
                  <div className="result-group">
                    <span className="group-label">Recruitment Rallies</span>
                    {rallyMatches.map((rally) => (
                      <div
                        key={rally.id}
                        className="result-row"
                        onClick={() => handleSelect('/calendar')}
                      >
                        <Calendar size={16} className="row-icon" />
                        <div className="row-text">
                          <strong>{rally.zone}: {rally.category}</strong>
                          <span>{rally.location} | Rally: {rally.rallyDates}</span>
                        </div>
                        <ArrowRight size={14} className="row-arrow" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Historic Operations */}
                {opMatches.length > 0 && (
                  <div className="result-group">
                    <span className="group-label">Historic Battles & Operations</span>
                    {opMatches.map((op) => (
                      <div
                        key={op.id}
                        className="result-row"
                        onClick={() => handleSelect('/#operations')}
                      >
                        <Award size={16} className="row-icon" />
                        <div className="row-text">
                          <strong>{op.name}</strong>
                          <span>{op.theatre}</span>
                        </div>
                        <ArrowRight size={14} className="row-arrow" />
                      </div>
                    ))}
                  </div>
                )}

                {/* FAQs */}
                {faqMatches.length > 0 && (
                  <div className="result-group">
                    <span className="group-label">FAQs & Guidelines</span>
                    {faqMatches.slice(0, 3).map((faq, idx) => (
                      <div
                        key={idx}
                        className="result-row"
                        onClick={() => handleSelect('/help')}
                      >
                        <FileText size={16} className="row-icon" />
                        <div className="row-text">
                          <strong>{faq.q}</strong>
                          <span>{faq.a.slice(0, 75)}...</span>
                        </div>
                        <ArrowRight size={14} className="row-arrow" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="no-results-state">
                <p>No results found for "<strong>{query}</strong>". Try searching for "NDA", "Agnipath", "CEE", or "Lucknow".</p>
              </div>
            )
          ) : (
            <div className="quick-suggestions-box">
              <span className="suggestions-label">Quick Suggestions:</span>
              <div className="quick-pill-tags">
                {['Find Your Entry', 'Agnipath Scheme', 'NDA 10+2', 'TGC-141', 'Admit Card', 'SSB Interview', 'Physical Fitness Test', 'Results'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="suggestion-tag-btn"
                    onClick={() => setQuery(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="search-modal-footer">
          <span>Press <kbd>ESC</kbd> to close or <kbd>Enter</kbd> to select</span>
        </div>
      </div>

      <style>{`
        .search-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(8, 14, 9, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 80px 16px 24px;
        }

        .search-modal-dialog {
          background: #ffffff;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-subtle);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
          width: 100%;
          max-width: 660px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          max-height: 80vh;
        }

        [data-theme='dark'] .search-modal-dialog {
          background: var(--army-dark);
          border-color: var(--border-medium);
        }

        .search-input-header {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1.5px solid var(--border-subtle);
          gap: 12px;
        }

        .search-box-icon {
          color: var(--army-primary);
          flex-shrink: 0;
        }

        [data-theme='dark'] .search-box-icon {
          color: var(--gold-light);
        }

        .modal-search-input {
          flex: 1;
          border: none;
          background: transparent;
          font-family: var(--font-display);
          font-size: 1.0625rem;
          color: var(--text-primary);
          outline: none;
        }

        .search-close-btn {
          color: var(--text-muted);
          padding: 4px;
          border-radius: var(--radius-xs);
          transition: all var(--transition-fast);
        }

        .search-close-btn:hover {
          color: var(--text-primary);
          background: var(--bg-surface-subtle);
        }

        .search-results-pane {
          padding: 16px 20px;
          overflow-y: auto;
          flex: 1;
        }

        .results-groups {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .group-label {
          font-size: 0.6875rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 6px;
          display: block;
        }

        .result-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .result-row:hover {
          background: var(--bg-surface-subtle);
          transform: translateX(3px);
        }

        .row-icon {
          color: var(--army-primary);
          flex-shrink: 0;
        }

        [data-theme='dark'] .row-icon {
          color: var(--gold-light);
        }

        .row-text {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .row-text strong {
          font-size: 0.875rem;
          color: var(--text-primary);
        }

        .row-text span {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .row-arrow {
          color: var(--text-muted);
        }

        .no-results-state {
          padding: 32px 16px;
          text-align: center;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .quick-suggestions-box {
          padding: 12px 0;
        }

        .suggestions-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          margin-bottom: 10px;
          display: block;
        }

        .quick-pill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .suggestion-tag-btn {
          padding: 6px 12px;
          border-radius: var(--radius-full);
          font-size: 0.78125rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          transition: all var(--transition-fast);
        }

        .suggestion-tag-btn:hover {
          background: var(--army-primary);
          color: #ffffff;
        }

        .search-modal-footer {
          padding: 10px 20px;
          background: var(--bg-surface-subtle);
          border-top: 1px solid var(--border-subtle);
          font-size: 0.71875rem;
          color: var(--text-muted);
          display: flex;
          justify-content: flex-end;
        }

        kbd {
          background: var(--bg-surface);
          border: 1px solid var(--border-medium);
          padding: 1px 5px;
          border-radius: 3px;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
        }
      `}</style>
    </div>
  );
};

export default SearchModal;
