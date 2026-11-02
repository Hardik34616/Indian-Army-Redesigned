import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { FAQS } from '../../data/mockData';

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
  const pillsTrackRef = useRef(null);
  const pillsRefs = useRef({});

  const categories = ['All', 'Agnipath', 'Officers', 'Selection', 'Admit Card', 'General'];

  const updateIndicator = () => {
    const currentBtn = pillsRefs.current[selectedCategory];
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
  }, [selectedCategory]);

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="faq-section" id="faqs" aria-label="Frequently Asked Questions">
      <div className="container">
        <div className="section-header-center">
          <span className="section-tag">HAVE QUESTIONS?</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Find prompt answers regarding educational requirements, physical fitness standards, Agnipath terms, SSB interview process, and medical fitness.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="faq-controls-bar">
          <div className="faq-search-box">
            <Search size={16} className="faq-search-icon" />
            <input
              type="text"
              placeholder="Search questions (e.g. 10th pass, SSB interview, Seva Nidhi, age limit)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="faq-search-input"
            />
          </div>

          <div className="faq-cat-pills" role="tablist" ref={pillsTrackRef}>
            {/* Sliding Liquid Glass Indicator */}
            <div
              className="sliding-glass-faq-pill"
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
                ref={(el) => (pillsRefs.current[cat] = el)}
                type="button"
                className={`faq-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
                role="tab"
                aria-selected={selectedCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="faq-accordion-list">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className={`faq-accordion-item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleAccordion(idx)}
                    aria-expanded={isOpen}
                  >
                    <div className="faq-q-left">
                      <span className="faq-cat-tag">{faq.category}</span>
                      <span className="faq-q-text">{faq.q}</span>
                    </div>
                    <ChevronDown size={18} className={`faq-chevron ${isOpen ? 'rotate' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="faq-answer-pane animate-fade-in">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="faq-empty-state">
              <HelpCircle size={36} className="empty-icon" />
              <p>No questions matched your search query "{searchTerm}".</p>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .faq-section {
          padding: 80px 0 96px;
          background-color: var(--bg-surface);
        }

        .section-header-center {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 48px;
        }

        .faq-controls-bar {
          max-width: 800px;
          margin: 0 auto 44px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .faq-search-box {
          position: relative;
          width: 100%;
        }

        .faq-search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .faq-search-input {
          width: 100%;
          padding: 12px 16px 12px 44px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-medium);
          background: var(--bg-surface-subtle);
          color: var(--text-primary);
          font-size: 0.875rem;
          outline: none;
          transition: all var(--transition-fast);
        }

        .faq-search-input:focus {
          border-color: var(--army-primary);
          background: var(--bg-surface);
          box-shadow: 0 0 0 3px rgba(27, 48, 34, 0.12);
        }

        .faq-cat-pills {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
          padding: 4px;
          background: rgba(0, 0, 0, 0.03);
          border-radius: var(--radius-full);
          border: 1px solid var(--border-subtle);
          width: fit-content;
          margin: 0 auto;
        }

        [data-theme='dark'] .faq-cat-pills {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.08);
        }

        /* Animated Sliding Liquid Glass FAQ Indicator */
        .sliding-glass-faq-pill {
          position: absolute;
          left: 0;
          top: 0;
          border-radius: var(--radius-full);
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.98) 0%,
            rgba(240, 246, 242, 0.92) 50%,
            rgba(228, 238, 231, 0.88) 100%
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
                      opacity 0.18s ease;
          will-change: transform, width;
        }

        [data-theme='dark'] .sliding-glass-faq-pill {
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

        .faq-pill {
          position: relative;
          z-index: 2;
          padding: 6px 16px;
          border-radius: var(--radius-full);
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: color 0.2s ease, transform 0.16s cubic-bezier(0.34, 1.56, 0.64, 1);
          white-space: nowrap;
          user-select: none;
        }

        .faq-pill:hover {
          color: var(--text-primary);
          transform: scale(1.04);
        }

        .faq-pill:active {
          transform: scale(0.94);
        }

        [data-theme='dark'] .faq-pill:hover {
          color: #ffffff;
        }

        .faq-pill.active {
          color: var(--army-primary);
          font-weight: 800;
          background: transparent;
          box-shadow: none;
        }

        [data-theme='dark'] .faq-pill.active {
          color: var(--gold-light);
          background: transparent;
          box-shadow: none;
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
        }

        /* Accordion */
        .faq-accordion-list {
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .faq-accordion-item {
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: all var(--transition-fast);
        }

        .faq-accordion-item.is-open {
          border-color: var(--army-light);
          box-shadow: var(--shadow-sm);
        }

        .faq-question-btn {
          width: 100%;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: left;
          gap: 16px;
          transition: background var(--transition-fast);
        }

        .faq-question-btn:hover {
          background: rgba(0, 0, 0, 0.02);
        }

        .faq-q-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .faq-cat-tag {
          font-size: 0.6875rem;
          font-weight: 700;
          color: var(--army-primary);
          background: rgba(35, 63, 45, 0.1);
          padding: 3px 8px;
          border-radius: var(--radius-xs);
          text-transform: uppercase;
          flex-shrink: 0;
        }

        [data-theme='dark'] .faq-cat-tag {
          color: var(--gold-light);
          background: rgba(197, 155, 39, 0.15);
        }

        .faq-q-text {
          font-family: var(--font-display);
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.35;
        }

        .faq-chevron {
          color: var(--text-muted);
          transition: transform var(--transition-fast);
          flex-shrink: 0;
        }

        .faq-chevron.rotate {
          transform: rotate(180deg);
        }

        .faq-answer-pane {
          padding: 0 20px 20px 20px;
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.6;
          border-top: 1px solid var(--border-subtle);
          margin-top: 4px;
          padding-top: 14px;
        }

        .faq-empty-state {
          text-align: center;
          padding: 48px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          color: var(--text-muted);
        }

        .empty-icon {
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
};

export default FaqSection;
