import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Monitor,
  Activity,
  Users,
  HeartPulse,
  Award,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
  Layers,
  ListOrdered
} from 'lucide-react';

const STAGE_DETAILS = [
  {
    step: '01',
    code: 'REGISTRATION',
    title: 'Online Application & Aadhaar Verification',
    subtitle: 'Digital eKYC & Profile Creation',
    duration: '30-45 Days Window',
    venue: 'joinindianarmy.nic.in Portal',
    icon: FileText,
    accent: '#ff9933',
    summary: 'Candidates register on the official portal, verify credentials via DigiLocker / Aadhaar biometric integration, fill educational qualifications, and select exam city preferences.',
    metrics: [
      { label: 'Platform', val: 'DigiLocker / Aadhaar OTP' },
      { label: 'Fee', val: '₹250 for Online CEE' },
      { label: 'Cities Choice', val: '5 Exam Center Preferences' }
    ],
    tips: [
      'Ensure your Matriculation Certificate name, father’s name & DOB match Aadhaar exactly.',
      'Upload high-clarity passport photograph and signature within the specified 20KB-50KB limits.',
      'Active mobile number and email ID will receive all OTPs and CEE admit card alerts.'
    ],
    ctaText: 'Check Eligibility Requirements',
    ctaLink: '/find-entry'
  },
  {
    step: '02',
    code: 'ENTRANCE EXAM',
    title: 'Common Entrance Exam (CEE) / UPSC NDA & CDS',
    subtitle: 'Computer-Based Objective Assessment',
    duration: '60 - 120 Mins Test',
    venue: '176+ Cities Pan-India',
    icon: Monitor,
    accent: '#3b82f6',
    summary: 'Comprehensive nationwide testing covering General Knowledge, General Science, Mathematics, English, and Specialized Technical Aptitude with transparent normalized scoring.',
    metrics: [
      { label: 'Exam Mode', val: 'CBT (Computer Based Test)' },
      { label: 'Negative Marking', val: '0.25 Marks per Wrong Ans' },
      { label: 'Answer Keys', val: 'Live Grievance Window' }
    ],
    tips: [
      'Practice official mock tests on candidate dashboards to familiarize with the CBT timer.',
      'Focus on high-yield General Science and basic arithmetic speed calculations.',
      'Carry original color printout of Admit Card and government photo ID to exam center.'
    ],
    ctaText: 'Explore Mock Test & Syllabus',
    ctaLink: '/opportunities'
  },
  {
    step: '03',
    code: 'PHYSICAL RALLY',
    title: 'Physical Fitness Test (PFT) & PMT Rally',
    subtitle: 'Grit, Endurance & Physical Measurement',
    duration: '1-Day Intensive Rally',
    venue: 'Zonal Recruiting Grounds',
    icon: Activity,
    accent: '#10b981',
    summary: 'Rigorous outdoor physical assessment comprising the famous 1.6 km endurance run, beam pull-ups, 9-feet ditch clearance, and zig-zag balance beam test.',
    metrics: [
      { label: '1.6 Km Run Group I', val: 'Up to 5:30 Min (60 Pts)' },
      { label: 'Beam Pull-ups', val: '10 Pull-ups (40 Pts)' },
      { label: 'Ditch & Balance', val: '9 Feet Jump (Qualifying)' }
    ],
    tips: [
      'Start sprint and endurance training 3 months ahead; clock under 5:30 for maximum Group 1 score.',
      'Practice strict overhand pull-ups with full arm extension to ensure clean rep counts.',
      'Maintain adequate hydration and strictly adhere to prescribed height-weight-chest charts.'
    ],
    ctaText: 'View 2026 Rally Radar',
    ctaLink: '/calendar'
  },
  {
    step: '04',
    code: 'LEADERSHIP & SSB',
    title: 'Services Selection Board (SSB) / Adaptability Test',
    subtitle: 'Evaluating 15 Officer Like Qualities (OLQs)',
    duration: '5-Day SSB / 1-Day Adaptability',
    venue: 'Selection Centres (Allahabad, Bhopal, Bengaluru, Jalandhar)',
    icon: Users,
    accent: '#c59b27',
    summary: 'Scientific psychological evaluation, Group Testing Officer (GTO) outdoor obstacles, interview with Board President, and final conference assessing personality and character.',
    metrics: [
      { label: 'SSB Duration', val: '5 Days Comprehensive' },
      { label: 'Dimensions', val: 'Psychology, GTO, Interview' },
      { label: 'Qualities', val: '15 OLQs Assessed' }
    ],
    tips: [
      'Be authentic, spontaneous, and demonstrate teamwork rather than trying to portray rehearsed answers.',
      'Stay updated on national/international strategic affairs and general military awareness.',
      'Show composure under physical and mental pressure during progressive group tasks.'
    ],
    ctaText: 'Officers Entry Pathways',
    ctaLink: '/opportunities'
  },
  {
    step: '05',
    code: 'MEDICAL BOARD',
    title: 'Specialist Medical Board Examination (SMB)',
    subtitle: 'Military Physical & Physiological Standard',
    duration: '3-5 Days Evaluation',
    venue: 'Military & Command Hospitals',
    icon: HeartPulse,
    accent: '#ec4899',
    summary: 'Meticulous head-to-toe screening by Military Medical Specialists including ophthalmology, ENT (audiometry), surgical, orthopedic, pathology, and dental health standards.',
    metrics: [
      { label: 'Dental Points', val: 'Min 14 Sound Teeth Points' },
      { label: 'Vision Standard', val: '6/6 Corrected as per Arm' },
      { label: 'Review Window', val: '42 Days Appeal Board' }
    ],
    tips: [
      'Get ear wax cleared by an ENT specialist prior to attending the medical board.',
      'Maintain dental hygiene and address cavities to score above 14 requisite dental points.',
      'Avoid unprescribed supplements or crash weight loss prior to clinical blood tests.'
    ],
    ctaText: 'Medical Standards Guide',
    ctaLink: '/help'
  },
  {
    step: '06',
    code: 'FINAL MERIT & CALL',
    title: 'All India Merit List & Academy Allotment',
    subtitle: 'Joining Letter & Passing Out Milestone',
    duration: 'Commissioning & Regimental Induction',
    venue: 'IMA, OTA, NDA & Training Centers',
    icon: Award,
    accent: '#138808',
    summary: 'Consolidated pan-India merit lists published transparently. Selected candidates receive joining instructions to commence rigorous military leadership training.',
    metrics: [
      { label: 'Merit Basis', val: 'Written + Rally / SSB' },
      { label: 'Allotment', val: 'Arms / Services / Regiments' },
      { label: 'Call Letters', val: 'Online Digital Download' }
    ],
    tips: [
      'Download your Joining Letter, Railway Warrant, and Document Dossier directly from dashboard.',
      'Complete pre-course physical conditioning guidelines provided in joining instructions.',
      'Keep multiple attested copies of all educational credentials, character, and domicile certificates.'
    ],
    ctaText: 'Track Merit Status',
    ctaLink: '/results'
  }
];

const getMetricIcon = (label) => {
  const l = label.toLowerCase();
  if (l.includes('platform')) return <ShieldCheck size={20} />;
  if (l.includes('fee')) return <span className="rupee-icon">₹</span>;
  if (l.includes('cit')) return <MapPin size={20} />;
  if (l.includes('run')) return <Activity size={20} />;
  if (l.includes('pull')) return <Users size={20} />;
  if (l.includes('exam')) return <Monitor size={20} />;
  if (l.includes('dental')) return <HeartPulse size={20} />;
  if (l.includes('vision')) return <FileText size={20} />;
  return <CheckCircle2 size={20} />;
};

const SelectionJourneyRoadmap = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [viewMode, setViewMode] = useState('horizontal'); // 'horizontal' | 'timeline'
  const timelineRef = useRef(null);
  const [visibleStages, setVisibleStages] = useState(new Set([0, 1]));
  const [switcherIndicator, setSwitcherIndicator] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
  const switcherTrackRef = useRef(null);
  const switcherBtnsRef = useRef({});

  const updateSwitcherIndicator = () => {
    const currentBtn = switcherBtnsRef.current[viewMode];
    const track = switcherTrackRef.current;
    if (currentBtn && track) {
      setSwitcherIndicator({
        left: currentBtn.offsetLeft,
        top: currentBtn.offsetTop,
        width: currentBtn.offsetWidth,
        height: currentBtn.offsetHeight,
        opacity: 1
      });
    }
  };

  useEffect(() => {
    updateSwitcherIndicator();
    const timer = setTimeout(updateSwitcherIndicator, 50);
    window.addEventListener('resize', updateSwitcherIndicator);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateSwitcherIndicator);
    };
  }, [viewMode]);

  useEffect(() => {
    if (viewMode !== 'timeline') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-stage-idx'), 10);
            if (!isNaN(index)) {
              setVisibleStages((prev) => new Set([...prev, index]));
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    const stepElements = document.querySelectorAll('.vertical-timeline-step');
    stepElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [viewMode]);

  const currentStage = STAGE_DETAILS[activeStage];
  const CurrentIcon = currentStage.icon;

  return (
    <section className="selection-roadmap-section" id="selection-journey" aria-label="Recruitment Selection Roadmap">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-flex">
          <div>
            <span className="section-tag">2D STEP-BY-STEP PATHWAY</span>
            <h2 className="section-title">The Selection Journey</h2>
            <p className="section-subtitle">
              From online eKYC registration to passing out parade: explore every milestone of India's most transparent and prestigious recruitment system.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="timeline-view-switcher" role="tablist" aria-label="Switch roadmap display view" ref={switcherTrackRef}>
            {/* Sliding Liquid Glass Switcher Indicator */}
            <div
              className="sliding-glass-switcher-pill"
              style={{
                transform: `translate3d(${switcherIndicator.left}px, ${switcherIndicator.top}px, 0)`,
                width: `${switcherIndicator.width}px`,
                height: `${switcherIndicator.height}px`,
                opacity: switcherIndicator.opacity
              }}
              aria-hidden="true"
            />

            <button
              ref={(el) => (switcherBtnsRef.current['horizontal'] = el)}
              type="button"
              className={`switcher-pill ${viewMode === 'horizontal' ? 'active' : ''}`}
              onClick={() => setViewMode('horizontal')}
              role="tab"
              aria-selected={viewMode === 'horizontal'}
            >
              <Layers size={15} />
              <span>Interactive Explorer</span>
            </button>
            <button
              ref={(el) => (switcherBtnsRef.current['timeline'] = el)}
              type="button"
              className={`switcher-pill ${viewMode === 'timeline' ? 'active' : ''}`}
              onClick={() => setViewMode('timeline')}
              role="tab"
              aria-selected={viewMode === 'timeline'}
            >
              <ListOrdered size={15} />
              <span>Connected Pathway</span>
            </button>
          </div>
        </div>

        {/* 1. HORIZONTAL INTERACTIVE TIMELINE VIEW */}
        {viewMode === 'horizontal' && (
          <div className="horizontal-timeline-wrapper animate-fade-in">
            {/* Animated 2D Progress Spine & Milestone Nodes */}
            <div className="milestone-rail-track" role="tablist" aria-label="Selection milestones">
              {/* Progress Line */}
              <div className="rail-line-bg">
                <div
                  className="rail-line-fill"
                  style={{ width: `${(activeStage / (STAGE_DETAILS.length - 1)) * 100}%` }}
                />
              </div>

              {/* 6 Connected Nodes */}
              {STAGE_DETAILS.map((stage, idx) => {
                const isActive = activeStage === idx;
                const isCompleted = idx < activeStage;

                return (
                  <button
                    key={stage.step}
                    type="button"
                    className={`rail-node-btn ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                    onClick={() => setActiveStage(idx)}
                    role="tab"
                    aria-selected={isActive}
                    id={`stage-node-${stage.step}`}
                  >
                    <div className="node-circle">
                      {isCompleted ? (
                        <CheckCircle2 size={18} className="node-check-icon" />
                      ) : (
                        <span className="node-num">{stage.step}</span>
                      )}
                      {isActive && <span className="node-pulse-ring" />}
                    </div>

                    <div className="node-text-wrap">
                      <span className="node-code">{stage.code}</span>
                      <span className="node-label">{stage.title.split('(')[0]}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Detailed Feature Showcase */}
            <div className="showcase-glass-card">
              <div className="showcase-left-col">
                <div className="showcase-stage-badge">
                  <span className="stage-num-pill">MILESTONE {currentStage.step} OF 06</span>
                  <div className="stage-time-chip">
                    <Clock size={14} />
                    <span>{currentStage.duration}</span>
                  </div>
                  <div className="stage-venue-chip">
                    <MapPin size={14} />
                    <span>{currentStage.venue}</span>
                  </div>
                </div>

                <h3 className="showcase-title">{currentStage.title}</h3>
                <p className="showcase-subtitle">{currentStage.subtitle}</p>
                <p className="showcase-desc">{currentStage.summary}</p>

                {/* Key Metrics Grid */}
                <div className="metrics-specs-grid">
                  {currentStage.metrics.map((m, i) => (
                    <div key={i} className="spec-item-box">
                      <div className="spec-icon-wrap">
                        {getMetricIcon(m.label)}
                      </div>
                      <span className="spec-label">{m.label}</span>
                      <span className="spec-val">{m.val}</span>
                    </div>
                  ))}
                </div>

                {/* Candidate Tips Drawer */}
                <div className="candidate-tips-box">
                  <div className="tips-header">
                    <ShieldCheck size={18} className="shield-icon" />
                    <strong>Essential Success Guidelines for Candidates:</strong>
                  </div>
                  <ul className="tips-list">
                    {currentStage.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>

                {/* Action Footer */}
                <div className="showcase-footer">
                  <Link to={currentStage.ctaLink} className="stage-action-btn">
                    <span>{currentStage.ctaText}</span>
                    <ArrowRight size={16} />
                  </Link>

                  <div className="stage-nav-buttons">
                    <button
                      type="button"
                      className="stage-nav-pill"
                      disabled={activeStage === 0}
                      onClick={() => setActiveStage((prev) => Math.max(0, prev - 1))}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      className="stage-nav-pill next"
                      disabled={activeStage === STAGE_DETAILS.length - 1}
                      onClick={() => setActiveStage((prev) => Math.min(STAGE_DETAILS.length - 1, prev + 1))}
                    >
                      <span>Next Stage</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Visual Milestone Meter */}
              <div className="showcase-right-col">
                <div className="milestone-meter-card">
                  <div className="meter-icon-wrap">
                    <FileText size={28} className="meter-main-icon" />
                  </div>

                  <div className="meter-step-number">{currentStage.step}</div>
                  <div className="meter-status-title">{currentStage.code}</div>
                  <p className="meter-status-desc">{currentStage.subtitle}</p>

                  <div className="meter-divider"></div>

                  <div className="meter-progress-section">
                    <div className="meter-progress-label">YOUR PROGRESS</div>
                    <div className="meter-progress-track">
                      <div
                        className="meter-progress-fill"
                        style={{ width: `${((activeStage + 1) / STAGE_DETAILS.length) * 100}%` }}
                      />
                    </div>
                    <div className="meter-percentage-text">
                      {Math.round(((activeStage + 1) / STAGE_DETAILS.length) * 100)}% Completed
                    </div>
                  </div>

                  <div className="meter-steps-section">
                    <div className="meter-steps-label">STEPS IN THIS STAGE</div>
                    <div className="meter-all-steps-pill">
                      {STAGE_DETAILS.map((s, idx) => (
                        <button
                          key={s.step}
                          type="button"
                          className={`step-dot ${activeStage === idx ? 'active' : ''} ${idx < activeStage ? 'passed' : ''}`}
                          onClick={() => setActiveStage(idx)}
                          title={`Stage ${s.step}: ${s.title}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="meter-info-box">
                    <div className="info-icon-wrap">
                      <span className="info-i">i</span>
                    </div>
                    <p>This stage usually takes<br/><strong>{currentStage.duration.replace(' Window', '').replace(' Test', '').replace(' Intensive Rally', '').replace(' Comprehensive', '').replace(' Evaluation', '')} to complete.</strong></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. CONNECTED 2D VERTICAL TIMELINE VIEW */}
        {viewMode === 'timeline' && (
          <div className="vertical-timeline-container animate-fade-in" ref={timelineRef}>
            <div className="timeline-central-spine" />

            {STAGE_DETAILS.map((stage, idx) => {
              const Icon = stage.icon;
              const isEven = idx % 2 === 0;
              const isRevealed = visibleStages.has(idx);

              return (
                <div
                  key={stage.step}
                  data-stage-idx={idx}
                  className={`vertical-timeline-step ${isEven ? 'step-left' : 'step-right'} ${isRevealed ? 'revealed' : ''}`}
                >
                  {/* Central Node Badge */}
                  <div className="timeline-node-anchor">
                    <div className="node-ring-wrapper">
                      <div className="node-ring-core">
                        <Icon size={18} />
                      </div>
                      <span className="node-num-tag">{stage.step}</span>
                    </div>
                  </div>

                  {/* Step Glass Card */}
                  <div className="timeline-step-card">
                    <div className="card-top-header">
                      <span className="card-step-badge">STAGE {stage.step}</span>
                      <span className="card-code-badge">{stage.code}</span>
                      <div className="card-duration-tag">
                        <Clock size={12} />
                        <span>{stage.duration}</span>
                      </div>
                    </div>

                    <h3 className="card-heading">{stage.title}</h3>
                    <p className="card-subhead">{stage.subtitle}</p>
                    <p className="card-desc-text">{stage.summary}</p>

                    <div className="card-specs-row">
                      {stage.metrics.map((m, i) => (
                        <div key={i} className="mini-spec-item">
                          <span className="mini-lbl">{m.label}:</span>
                          <span className="mini-val">{m.val}</span>
                        </div>
                      ))}
                    </div>

                    <div className="card-action-bar">
                      <Link to={stage.ctaLink} className="timeline-link-btn">
                        <span>{stage.ctaText}</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        .selection-roadmap-section {
          position: relative;
          padding: 72px 0 88px;
          overflow: hidden;
          background-color: transparent;
        }

        .section-header-flex {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 36px;
        }

        /* View Mode Switcher */
        .timeline-view-switcher {
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.78);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          padding: 4px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.85);
          box-shadow: 0 8px 24px -6px rgba(0, 0, 0, 0.06);
          flex-shrink: 0;
        }

        [data-theme='dark'] .timeline-view-switcher {
          background: rgba(22, 38, 26, 0.78);
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }

        /* Animated Sliding Liquid Glass Switcher Indicator */
        .sliding-glass-switcher-pill {
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

        [data-theme='dark'] .sliding-glass-switcher-pill {
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

        .switcher-pill {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: var(--radius-full);
          font-family: var(--font-display);
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: color 0.2s ease, transform 0.16s cubic-bezier(0.34, 1.56, 0.64, 1);
          user-select: none;
        }

        .switcher-pill:hover {
          color: var(--text-primary);
          transform: scale(1.03);
        }

        .switcher-pill:active {
          transform: scale(0.95);
        }

        [data-theme='dark'] .switcher-pill:hover {
          color: #ffffff;
        }

        .switcher-pill.active {
          color: var(--army-primary);
          font-weight: 800;
          background: transparent;
          box-shadow: none;
        }

        [data-theme='dark'] .switcher-pill.active {
          color: var(--gold-light);
          background: transparent;
          box-shadow: none;
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
        }

        /* 1. HORIZONTAL TIMELINE RAIL */
        .horizontal-timeline-wrapper {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .milestone-rail-track {
          position: relative;
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
          padding: 24px 16px 16px;
          background: rgba(255, 255, 255, 0.78);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.85);
          box-shadow: 0 10px 30px -8px rgba(0, 0, 0, 0.07), inset 0 1px 1px rgba(255, 255, 255, 0.95);
        }

        [data-theme='dark'] .milestone-rail-track {
          background: rgba(22, 38, 26, 0.78);
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.1);
        }

        .rail-line-bg {
          position: absolute;
          top: 44px;
          left: 8%;
          right: 8%;
          height: 4px;
          background: rgba(0, 0, 0, 0.08);
          border-radius: 2px;
          z-index: 1;
        }

        [data-theme='dark'] .rail-line-bg {
          background: rgba(255, 255, 255, 0.1);
        }

        .rail-line-fill {
          height: 100%;
          background: linear-gradient(90deg, #ff9933 0%, var(--gold-primary) 50%, #138808 100%);
          border-radius: 2px;
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 0 12px rgba(197, 155, 39, 0.5);
        }

        .rail-node-btn {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 10px;
          background: transparent;
          padding: 0 4px;
          transition: all var(--transition-normal);
        }

        .node-circle {
          position: relative;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #ffffff;
          border: 2.5px solid var(--border-medium);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-normal);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        [data-theme='dark'] .node-circle {
          background: #111e14;
          border-color: rgba(255, 255, 255, 0.2);
        }

        .node-num {
          font-family: var(--font-display);
          font-size: 0.875rem;
          font-weight: 800;
          color: var(--text-secondary);
        }

        .node-check-icon {
          color: #10b981;
        }

        .rail-node-btn.completed .node-circle {
          border-color: #10b981;
          background: rgba(16, 185, 129, 0.1);
        }

        .rail-node-btn.active .node-circle {
          background: var(--army-primary);
          border-color: var(--gold-primary);
          transform: scale(1.15);
          box-shadow: 0 0 20px rgba(197, 155, 39, 0.6);
        }

        [data-theme='dark'] .rail-node-btn.active .node-circle {
          background: var(--gold-primary);
          border-color: #ffffff;
        }

        .rail-node-btn.active .node-num {
          color: #ffffff;
        }

        [data-theme='dark'] .rail-node-btn.active .node-num {
          color: #0d1a0f;
        }

        .node-pulse-ring {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 2px solid var(--gold-primary);
          animation: pulseHalo 2s infinite ease-out;
        }

        @keyframes pulseHalo {
          0% { transform: scale(0.9); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }

        .node-text-wrap {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .node-code {
          font-size: 0.65625rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .rail-node-btn.active .node-code {
          color: var(--gold-primary);
        }

        .node-label {
          font-family: var(--font-display);
          font-size: 0.78125rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .rail-node-btn.active .node-label {
          color: var(--army-primary);
        }

        [data-theme='dark'] .rail-node-btn.active .node-label {
          color: var(--gold-light);
        }

        /* SHOWCASE GLASS CARD */
        .showcase-glass-card {
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid #eaeaea;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          padding: 24px;
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 36px;
          transition: all var(--transition-normal);
        }

        [data-theme='dark'] .showcase-glass-card {
          background: #111;
          border-color: #333;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .showcase-stage-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .stage-num-pill {
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          color: #ffffff;
          background: #0f4a25;
          padding: 6px 14px;
          border-radius: 100px;
        }

        [data-theme='dark'] .stage-num-pill {
          background: #105934;
        }

        .stage-time-chip, .stage-venue-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #333;
          background: #ffffff;
          padding: 6px 14px;
          border-radius: 100px;
          border: 1px solid #e5e7eb;
        }

        [data-theme='dark'] .stage-time-chip,
        [data-theme='dark'] .stage-venue-chip {
          background: #222;
          border-color: #444;
          color: #eee;
        }

        .showcase-title {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 800;
          color: #111;
          line-height: 1.2;
          margin-bottom: 6px;
        }
        
        [data-theme='dark'] .showcase-title {
          color: #fff;
        }

        .showcase-subtitle {
          font-size: 1rem;
          font-weight: 700;
          color: #0f4a25;
          margin-bottom: 16px;
        }

        [data-theme='dark'] .showcase-subtitle {
          color: #4ade80;
        }

        .showcase-desc {
          font-size: 0.9rem;
          color: #555;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        [data-theme='dark'] .showcase-desc {
          color: #aaa;
        }

        .metrics-specs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .spec-item-box {
          background: #ffffff;
          padding: 16px 12px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        [data-theme='dark'] .spec-item-box {
          background: #1a1a1a;
          border-color: #333;
        }

        .spec-icon-wrap {
          color: #0f4a25;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 24px;
        }

        [data-theme='dark'] .spec-icon-wrap {
          color: #4ade80;
        }

        .rupee-icon {
          font-size: 20px;
          font-weight: 600;
        }

        .spec-label {
          font-size: 0.7rem;
          font-weight: 700;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }

        .spec-val {
          font-size: 0.85rem;
          font-weight: 800;
          color: #111;
        }

        [data-theme='dark'] .spec-val {
          color: #fff;
        }

        .candidate-tips-box {
          background: #ffffff;
          border-radius: 8px;
          padding: 18px 24px;
          border: 1px solid #e5e7eb;
          margin-bottom: 24px;
        }

        [data-theme='dark'] .candidate-tips-box {
          background: #1a1a1a;
          border-color: #333;
        }

        .tips-header {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
          font-weight: 700;
          color: #0f4a25;
          margin-bottom: 12px;
        }

        [data-theme='dark'] .tips-header {
          color: #4ade80;
        }

        .shield-icon {
          flex-shrink: 0;
        }

        .tips-list {
          list-style: disc;
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.85rem;
          color: #4b5563;
          line-height: 1.5;
          margin: 0;
        }

        [data-theme='dark'] .tips-list {
          color: #aaa;
        }

        .showcase-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          padding-top: 10px;
        }

        .stage-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-display);
          font-size: 0.85rem;
          font-weight: 700;
          color: #ffffff;
          background: #0f4a25;
          padding: 10px 20px;
          border-radius: 6px;
          transition: all var(--transition-fast);
          border: none;
          cursor: pointer;
        }

        .stage-action-btn:hover {
          background: #0a331a;
        }

        .stage-nav-buttons {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .stage-nav-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 20px;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #4b5563;
          background: #ffffff;
          border: 1px solid #d1d5db;
          transition: all var(--transition-fast);
          cursor: pointer;
        }

        [data-theme='dark'] .stage-nav-pill {
          background: #222;
          border-color: #444;
          color: #ddd;
        }

        .stage-nav-pill:hover:not(:disabled) {
          border-color: #9ca3af;
          color: #111;
        }

        [data-theme='dark'] .stage-nav-pill:hover:not(:disabled) {
          border-color: #666;
          color: #fff;
        }

        .stage-nav-pill:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .stage-nav-pill.next {
          background: #0f4a25;
          color: #ffffff;
          border: none;
        }
        
        [data-theme='dark'] .stage-nav-pill.next {
          background: #105934;
        }

        .stage-nav-pill.next:hover:not(:disabled) {
          background: #0a331a;
          color: #fff;
        }

        /* RIGHT METER BOX - LIGHT THEME */
        .showcase-right-col {
          display: flex;
          align-items: stretch;
          justify-content: center;
        }

        .milestone-meter-card {
          width: 100%;
          background: #fafafa;
          color: #111;
          border-radius: 12px;
          padding: 32px 24px;
          text-align: center;
          border: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        [data-theme='dark'] .milestone-meter-card {
          background: #1a1a1a;
          border-color: #333;
          color: #fff;
        }

        .meter-icon-wrap {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #e8f5e9;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f4a25;
          margin-bottom: 16px;
        }

        [data-theme='dark'] .meter-icon-wrap {
          background: #0f4a25;
          color: #fff;
        }

        .meter-step-number {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1;
          color: #0f4a25;
          margin-bottom: 8px;
        }

        [data-theme='dark'] .meter-step-number {
          color: #4ade80;
        }

        .meter-status-title {
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          color: #111;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        
        [data-theme='dark'] .meter-status-title {
          color: #fff;
        }

        .meter-status-desc {
          font-size: 0.85rem;
          color: #555;
          margin-bottom: 24px;
        }
        
        [data-theme='dark'] .meter-status-desc {
          color: #aaa;
        }

        .meter-divider {
          width: 100%;
          height: 1px;
          background: #e5e7eb;
          margin-bottom: 24px;
        }

        [data-theme='dark'] .meter-divider {
          background: #333;
        }

        .meter-progress-section, .meter-steps-section {
          width: 100%;
          margin-bottom: 24px;
        }

        .meter-progress-label, .meter-steps-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #4b5563;
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        [data-theme='dark'] .meter-progress-label,
        [data-theme='dark'] .meter-steps-label {
          color: #9ca3af;
        }

        .meter-progress-track {
          width: 100%;
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 10px;
        }

        [data-theme='dark'] .meter-progress-track {
          background: #333;
        }

        .meter-progress-fill {
          height: 100%;
          background: #0f4a25;
          border-radius: 4px;
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        [data-theme='dark'] .meter-progress-fill {
          background: #4ade80;
        }

        .meter-percentage-text {
          font-size: 0.8rem;
          font-weight: 700;
          color: #0f4a25;
        }

        [data-theme='dark'] .meter-percentage-text {
          color: #4ade80;
        }

        .meter-all-steps-pill {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .step-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: transparent;
          border: 2px solid #d1d5db;
          transition: all var(--transition-fast);
          cursor: pointer;
          padding: 0;
        }

        [data-theme='dark'] .step-dot {
          border-color: #444;
        }

        .step-dot:hover {
          border-color: #9ca3af;
        }

        .step-dot.active {
          background: #0f4a25;
          border-color: #0f4a25;
        }

        [data-theme='dark'] .step-dot.active {
          background: #4ade80;
          border-color: #4ade80;
        }

        .step-dot.passed {
          background: #10b981;
          border-color: #10b981;
        }

        .meter-info-box {
          margin-top: auto;
          width: 100%;
          background: #f3f4f6;
          border-radius: 8px;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          text-align: left;
        }

        [data-theme='dark'] .meter-info-box {
          background: #222;
        }

        .info-icon-wrap {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1px solid #0f4a25;
          color: #0f4a25;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: serif;
          font-style: italic;
          font-weight: bold;
          font-size: 14px;
          flex-shrink: 0;
        }

        [data-theme='dark'] .info-icon-wrap {
          border-color: #4ade80;
          color: #4ade80;
        }

        .meter-info-box p {
          font-size: 0.8rem;
          color: #333;
          margin: 0;
          line-height: 1.4;
        }

        [data-theme='dark'] .meter-info-box p {
          color: #eee;
        }

        /* 2. CONNECTED 2D VERTICAL TIMELINE VIEW */
        .vertical-timeline-container {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px 0 40px;
        }

        .timeline-central-spine {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 4px;
          transform: translateX(-50%);
          background: linear-gradient(
            180deg,
            #ff9933 0%,
            var(--gold-primary) 40%,
            #10b981 80%,
            var(--army-primary) 100%
          );
          border-radius: 2px;
          box-shadow: 0 0 14px rgba(197, 155, 39, 0.4);
        }

        .vertical-timeline-step {
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: 48px;
          width: 100%;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .vertical-timeline-step.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        .vertical-timeline-step.step-left {
          justify-content: flex-start;
          padding-right: 54%;
        }

        .vertical-timeline-step.step-right {
          justify-content: flex-end;
          padding-left: 54%;
        }

        .timeline-node-anchor {
          position: absolute;
          left: 50%;
          top: 32px;
          transform: translate(-50%, -50%);
          z-index: 10;
        }

        .node-ring-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .node-ring-core {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid var(--army-primary);
          color: var(--army-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
          transition: all var(--transition-normal);
        }

        [data-theme='dark'] .node-ring-core {
          background: #0f1c12;
          border-color: var(--gold-primary);
          color: var(--gold-light);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6);
        }

        .vertical-timeline-step:hover .node-ring-core {
          transform: scale(1.15);
          border-color: var(--gold-primary);
          box-shadow: 0 0 20px rgba(197, 155, 39, 0.6);
        }

        .node-num-tag {
          position: absolute;
          top: -8px;
          right: -8px;
          background: var(--army-primary);
          color: #ffffff;
          font-family: var(--font-display);
          font-size: 0.625rem;
          font-weight: 800;
          padding: 2px 5px;
          border-radius: 4px;
        }

        [data-theme='dark'] .node-num-tag {
          background: var(--gold-primary);
          color: #0d1a0f;
        }

        .timeline-step-card {
          width: 100%;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(24px) saturate(190%);
          -webkit-backdrop-filter: blur(24px) saturate(190%);
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.9);
          padding: 24px;
          box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.95);
          transition: all var(--transition-normal);
        }

        [data-theme='dark'] .timeline-step-card {
          background: rgba(20, 35, 24, 0.78);
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.5), inset 0 1px 1.5px rgba(255, 255, 255, 0.15);
        }

        .vertical-timeline-step:hover .timeline-step-card {
          transform: translateY(-4px);
          border-color: var(--army-light);
          box-shadow: 0 20px 42px -10px rgba(0, 0, 0, 0.14), inset 0 1px 2px rgba(255, 255, 255, 1);
        }

        [data-theme='dark'] .vertical-timeline-step:hover .timeline-step-card {
          border-color: var(--gold-primary);
          box-shadow: 0 22px 46px -10px rgba(0, 0, 0, 0.7), inset 0 1px 2px rgba(255, 255, 255, 0.25);
        }

        .card-top-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }

        .card-step-badge {
          font-family: var(--font-display);
          font-size: 0.6875rem;
          font-weight: 800;
          color: #ffffff;
          background: linear-gradient(135deg, rgba(31, 73, 48, 0.9) 0%, rgba(19, 42, 26, 0.95) 100%);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 3px 10px;
          border-radius: 100px;
          letter-spacing: 0.04em;
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.3);
        }

        [data-theme='dark'] .card-step-badge {
          background: linear-gradient(135deg, rgba(218, 165, 32, 0.35) 0%, rgba(180, 130, 20, 0.2) 100%);
          color: #fff9e6;
          border-color: rgba(255, 223, 128, 0.4);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.3);
        }

        .card-code-badge {
          font-size: 0.6875rem;
          font-weight: 800;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .card-duration-tag {
          margin-left: auto;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.71875rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .card-heading {
          font-family: var(--font-display);
          font-size: 1.1875rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.3;
          margin-bottom: 4px;
        }

        .card-subhead {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--army-primary);
          margin-bottom: 10px;
        }

        [data-theme='dark'] .card-subhead {
          color: var(--gold-light);
        }

        .card-desc-text {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 14px;
        }

        .card-specs-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 10px 12px;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          border-radius: var(--radius-sm);
          border: 1px solid rgba(0, 0, 0, 0.05);
          margin-bottom: 14px;
        }

        [data-theme='dark'] .card-specs-row {
          background: rgba(0, 0, 0, 0.25);
          border-color: rgba(255, 255, 255, 0.08);
        }

        .mini-spec-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
        }

        .mini-lbl {
          color: var(--text-muted);
          font-weight: 600;
        }

        .mini-val {
          color: var(--text-primary);
          font-weight: 700;
        }

        .card-action-bar {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-top: 10px;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
        }

        [data-theme='dark'] .card-action-bar {
          border-top-color: rgba(255, 255, 255, 0.08);
        }

        .timeline-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-display);
          font-size: 0.78125rem;
          font-weight: 700;
          color: var(--army-primary);
          transition: all var(--transition-fast);
        }

        [data-theme='dark'] .timeline-link-btn {
          color: var(--gold-light);
        }

        .timeline-link-btn:hover {
          transform: translateX(4px);
          color: var(--army-forest);
        }

        [data-theme='dark'] .timeline-link-btn:hover {
          color: #ffffff;
        }

        /* RESPONSIVE LAYOUT */
        @media (max-width: 1024px) {
          .milestone-rail-track {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
          .rail-line-bg {
            display: none;
          }
          .showcase-glass-card {
            grid-template-columns: 1fr;
          }
          .metrics-specs-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .section-header-flex {
            flex-direction: column;
            align-items: flex-start;
          }
          .milestone-rail-track {
            grid-template-columns: repeat(2, 1fr);
          }
          .vertical-timeline-container {
            padding-left: 28px;
          }
          .timeline-central-spine {
            left: 14px;
          }
          .vertical-timeline-step.step-left,
          .vertical-timeline-step.step-right {
            padding-left: 36px;
            padding-right: 0;
            justify-content: flex-start;
          }
          .timeline-node-anchor {
            left: 14px;
          }
          .showcase-glass-card {
            padding: 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default SelectionJourneyRoadmap;
