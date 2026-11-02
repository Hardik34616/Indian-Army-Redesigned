import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  User,
  Calendar,
  GraduationCap,
  Briefcase,
  MapPin,
  Shield,
  Award,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { OPPORTUNITIES } from '../data/mockData';

const FindEntryPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Wizard Steps: 1: Demographic, 2: DOB & Age, 3: Education, 4: Career Interest, 5: Results
  const [step, setStep] = useState(1);

  // Form State
  const [gender, setGender] = useState('male');
  const [maritalStatus, setMaritalStatus] = useState('unmarried');
  const [dob, setDob] = useState('2005-06-15');
  const [education, setEducation] = useState('12th-pcm');
  const [percentage, setPercentage] = useState('75');
  const [careerInterest, setCareerInterest] = useState('officer');
  const [state, setState] = useState('Haryana');

  // Calculate age from DOB
  const calculateAge = (dobString) => {
    if (!dobString) return 20;
    const birthDate = new Date(dobString);
    const today = new Date('2026-08-25');
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    const months = (today.getMonth() + 12 - birthDate.getMonth()) % 12;
    return { fullYears: age, decimalAge: (age + months / 12).toFixed(1) };
  };

  const ageData = calculateAge(dob);
  const currentAge = parseFloat(ageData.decimalAge);

  // Eligibility Evaluation Algorithm
  const evaluateEntries = () => {
    const results = [];

    // 1. NDA
    if (currentAge >= 16.5 && currentAge <= 19.5 && maritalStatus === 'unmarried') {
      if (education.includes('12th') || education.includes('graduate') || education.includes('engineering')) {
        results.push({
          id: 'nda',
          title: 'NDA (National Defence Academy)',
          category: 'Officers Entry',
          academy: 'National Defence Academy, Khadakwasla (Pune)',
          ageRange: '16.5 - 19.5 Years',
          eduReq: '10+2 Pass in any stream (PCM for Air Force/Navy)',
          commission: 'Permanent Commission',
          matchStatus: 'Highly Recommended',
          matchScore: 98,
          opportunityId: 'officers-entry',
          reasons: [
            `Your age (${currentAge} yrs) is within the eligible bracket (16.5 - 19.5 yrs).`,
            `Your marital status (${maritalStatus}) satisfies the NDA requirement.`,
            `Your qualification (${education.replace('-', ' ').toUpperCase()}) meets the minimum 10+2 standard.`
          ]
        });
      }
    }

    // 2. TGC (Technical Graduate Course)
    if (currentAge >= 20 && currentAge <= 27 && gender === 'male' && maritalStatus === 'unmarried') {
      if (education === 'engineering' || education === 'post-graduate') {
        results.push({
          id: 'tgc',
          title: 'TGC (Technical Graduate Course - Army)',
          category: 'Officers Entry',
          academy: 'Indian Military Academy (IMA), Dehradun',
          ageRange: '20.0 - 27.0 Years',
          eduReq: 'BE / B.Tech in Engineering',
          commission: 'Permanent Commission (Direct SSB)',
          matchStatus: 'Perfect Match',
          matchScore: 100,
          opportunityId: 'officers-entry',
          reasons: [
            `You hold an engineering degree with ${percentage}% marks.`,
            `Direct SSB interview with NO written exam required.`,
            `Direct Permanent Commission as Lieutenant upon graduation.`
          ]
        });
      }
    }

    // 3. CDS (Combined Defence Services)
    if (currentAge >= 19 && currentAge <= 25) {
      if (education.includes('graduate') || education.includes('engineering') || education.includes('law')) {
        results.push({
          id: 'cds',
          title: 'CDS Entry (IMA / OTA Chennai)',
          category: 'Officers Entry',
          academy: 'IMA Dehradun / OTA Chennai',
          ageRange: '19.0 - 25.0 Years',
          eduReq: 'Graduation in any discipline',
          commission: gender === 'female' ? 'Short Service Commission (OTA)' : 'Permanent / Short Service',
          matchStatus: 'Highly Recommended',
          matchScore: 95,
          opportunityId: 'officers-entry',
          reasons: [
            `You hold a recognized university graduation degree.`,
            `Eligible for both Indian Military Academy and Officers Training Academy.`
          ]
        });
      }
    }

    // 4. SSC Tech (Men & Women)
    if (currentAge >= 20 && currentAge <= 27 && (education === 'engineering' || education === 'post-graduate')) {
      results.push({
        id: 'ssc-tech',
        title: 'SSC Tech (Short Service Commission Technical)',
        category: 'Officers Entry',
        academy: 'Officers Training Academy (OTA), Chennai',
        ageRange: '20.0 - 27.0 Years',
        eduReq: 'Engineering Degree (All Branches)',
        commission: 'Short Service Commission (Men & Women)',
        matchStatus: 'Direct SSB Entry',
        matchScore: 96,
        opportunityId: 'officers-entry',
        reasons: [
          `Direct SSB interview based on engineering degree merit.`,
          `Open for both male and female engineering candidates.`
        ]
      });
    }

    // 5. Agniveer General Duty
    if (currentAge >= 17.5 && currentAge <= 21) {
      if (education !== '8th-pass' || education === '10th-pass' || education.includes('12th')) {
        results.push({
          id: 'agniveer-gd',
          title: 'Agniveer (General Duty) - All Arms',
          category: 'Agnipath Scheme',
          academy: 'Respective Regimental Training Centre',
          ageRange: '17.5 - 21.0 Years',
          eduReq: 'Class 10th / Matriculation with min 45% aggregate',
          commission: '4-Year Agnipath Tenure (25% Permanent Absorption)',
          matchStatus: 'Prime Combat Entry',
          matchScore: 94,
          opportunityId: 'agnipath-scheme',
          reasons: [
            `Age (${currentAge} yrs) qualifies within the active 17.5 - 21 yrs window.`,
            `Educational qualification meets 10th matriculation standard.`,
            `Entitled to ₹11.71 Lakh tax-free Seva Nidhi package + Agniveer Skill Diploma.`
          ]
        });
      }
    }

    // 6. Agniveer Technical
    if (currentAge >= 17.5 && currentAge <= 21 && (education === '12th-pcm' || education === 'engineering')) {
      results.push({
        id: 'agniveer-tech',
        title: 'Agniveer (Technical) - Aviation / Artillery / Signals',
        category: 'Agnipath Scheme',
        academy: 'Technical Training Centres (CME, EME, Signals)',
        ageRange: '17.5 - 21.0 Years',
        eduReq: '10+2 with Physics, Chemistry, Maths & English min 50%',
        commission: '4-Year Agnipath Technical Cadre',
        matchStatus: 'Technical Specialist Match',
        matchScore: 97,
        opportunityId: 'agnipath-scheme',
        reasons: [
          `Possesses 10+2 Science (PCM) qualification with ${percentage}% marks.`,
          `Specialized military technical training in radar, electronic warfare, and weapons systems.`
        ]
      });
    }

    // 7. Agniveer Women (Corps of Military Police)
    if (gender === 'female' && currentAge >= 17.5 && currentAge <= 21) {
      results.push({
        id: 'agniveer-women-cmp',
        title: 'Agniveer Women (Corps of Military Police)',
        category: 'Agnipath Scheme',
        academy: 'CMP Centre & School, Bangalore',
        ageRange: '17.5 - 21.0 Years',
        eduReq: 'Class 10th Matric with min 45% marks',
        commission: '4-Year Agnipath Tenure',
        matchStatus: 'Dedicated Women Enrolment',
        matchScore: 99,
        opportunityId: 'agnipath-scheme',
        reasons: [
          `Dedicated women's military police recruitment stream.`,
          `Elite security, policing, and ceremonial duties for the armed forces.`
        ]
      });
    }

    // 8. Territorial Army Officer
    if (currentAge >= 18 && currentAge <= 42) {
      if (education.includes('graduate') || education.includes('engineering') || education.includes('law')) {
        results.push({
          id: 'ta-officer',
          title: 'Territorial Army Officer (Civilian Professional)',
          category: 'Territorial Army',
          academy: 'TA Regimental Training Battalion',
          ageRange: '18.0 - 42.0 Years',
          eduReq: 'Graduation from recognized university + Gainfully Employed',
          commission: 'Part-Time Military Commission',
          matchStatus: 'Civilian Dual-Career Entry',
          matchScore: 90,
          opportunityId: 'territorial-army',
          reasons: [
            `Allows you to maintain your civilian corporate/professional job.`,
            `Serve 2 months of active military training each year in officer rank.`
          ]
        });
      }
    }

    // Fallback if none matched
    if (results.length === 0) {
      results.push({
        id: 'general-consult',
        title: 'Special & Departmental Entries',
        category: 'Indian Army Recruitment',
        academy: 'ZRO / Regimental Centres',
        ageRange: 'Varies by Special Entry',
        eduReq: '8th / 10th / 12th / Degree',
        commission: 'Regular / Special Commission',
        matchStatus: 'Consult ZRO Guidelines',
        matchScore: 80,
        opportunityId: 'jco-or-enrolment',
        reasons: [
          `Check special departmental entries, religious teachers, or territorial army units.`,
          `Visit your nearest Zonal Recruiting Office for age relaxation and sports quota exemptions.`
        ]
      });
    }

    return results;
  };

  const matchingEntries = evaluateEntries();

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 5));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setStep(1);
    setGender('male');
    setMaritalStatus('unmarried');
    setDob('2005-06-15');
    setEducation('12th-pcm');
    setPercentage('75');
    setCareerInterest('officer');
  };

  return (
    <div className="find-entry-page" id="main-content">
      {/* Background Liquid Glass Tricolor Canvas */}
      <div className="find-entry-bg-wrapper" aria-hidden="true">
        <img
          src="/assets/tricolor-glass-light.jpg"
          alt=""
          className="find-entry-bg-img light-img"
        />
        <img
          src="/assets/tricolor-glass-dark.jpg"
          alt=""
          className="find-entry-bg-img dark-img"
        />
        <div className="find-entry-bg-overlay" />
      </div>

      <div className="find-entry-content-relative">
        {/* Top Banner */}
        <div className="wizard-hero-banner">
          <div className="container">
            <div className="wizard-hero-content">
              <span className="section-tag wizard-tag">
                AI-POWERED RECRUITMENT ASSISTANT
              </span>
              <h1 className="wizard-hero-title">Find Your Entry in the Indian Army</h1>
              <p className="wizard-hero-subtitle">
                Answer 4 simple questions about your age, education, and career aspirations. Our real-time eligibility engine will determine every matching officer and soldier entry for you.
              </p>
            </div>
          </div>
        </div>

        <div className="container wizard-container">
        {/* Step Progress Tracker */}
        <div className="wizard-steps-indicator" role="navigation" aria-label="Wizard Steps">
          {[
            { num: 1, label: 'Identity & Gender' },
            { num: 2, label: 'Date of Birth' },
            { num: 3, label: 'Education & Marks' },
            { num: 4, label: 'Career Interests' },
            { num: 5, label: 'Eligible Matches' }
          ].map((s) => (
            <div
              key={s.num}
              className={`step-indicator-item ${step === s.num ? 'active' : ''} ${step > s.num ? 'completed' : ''}`}
            >
              <div className="step-circle">
                {step > s.num ? <CheckCircle2 size={16} /> : s.num}
              </div>
              <span className="step-text-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Wizard Card Body */}
        <div className="wizard-card-box">
          {/* STEP 1: GENDER & MARITAL STATUS */}
          {step === 1 && (
            <div className="wizard-step-pane animate-fade-in">
              <h2 className="step-pane-title">Step 1: Select Your Gender & Marital Status</h2>
              <p className="step-pane-sub">Entry schemes differ based on gender and marital criteria mandated by defence regulations.</p>

              <div className="options-selection-grid">
                <div className="selection-group">
                  <label className="group-label-text">Gender</label>
                  <div className="choice-buttons-row">
                    <button
                      type="button"
                      className={`choice-card ${gender === 'male' ? 'selected' : ''}`}
                      onClick={() => setGender('male')}
                    >
                      <User size={24} className="choice-icon" />
                      <strong>Male Candidate</strong>
                      <span>Eligible for all Combat Arms, Technical, and Officer entries</span>
                    </button>

                    <button
                      type="button"
                      className={`choice-card ${gender === 'female' ? 'selected' : ''}`}
                      onClick={() => setGender('female')}
                    >
                      <User size={24} className="choice-icon" />
                      <strong>Female Candidate</strong>
                      <span>Eligible for NDA, CDS (OTA), SSC Tech, JAG, and Agniveer Women CMP</span>
                    </button>
                  </div>
                </div>

                <div className="selection-group">
                  <label className="group-label-text">Marital Status</label>
                  <div className="choice-buttons-row">
                    <button
                      type="button"
                      className={`choice-card ${maritalStatus === 'unmarried' ? 'selected' : ''}`}
                      onClick={() => setMaritalStatus('unmarried')}
                    >
                      <strong>Unmarried (Single)</strong>
                      <span>Required for NDA, 10+2 TES, CDS IMA, and Agnipath Scheme</span>
                    </button>

                    <button
                      type="button"
                      className={`choice-card ${maritalStatus === 'married' ? 'selected' : ''}`}
                      onClick={() => setMaritalStatus('married')}
                    >
                      <strong>Married / Divorced</strong>
                      <span>Eligible for Territorial Army, JAG, and Age-relaxed entries</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: DATE OF BIRTH & AGE */}
          {step === 2 && (
            <div className="wizard-step-pane animate-fade-in">
              <h2 className="step-pane-title">Step 2: Enter Your Date of Birth</h2>
              <p className="step-pane-sub">Age cut-offs are strictly calculated as of the course commencement date.</p>

              <div className="dob-calculator-wrap">
                <div className="form-field dob-input-field">
                  <label htmlFor="wizard-dob">Date of Birth (As on Matriculation Certificate)</label>
                  <input
                    id="wizard-dob"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="large-date-input"
                  />
                </div>

                <div className="age-result-badge-card">
                  <span className="age-computed-label">Calculated Age on 25 August 2026:</span>
                  <div className="age-computed-number">{ageData.decimalAge} Years</div>
                  <span className="age-computed-meta">({ageData.fullYears} Years & Months)</span>
                </div>
              </div>

              <div className="age-hint-box">
                <Shield size={16} />
                <span>
                  <strong>Age Quick Reference:</strong> NDA (16.5 - 19.5 yrs) | Agnipath (17.5 - 21 yrs) | CDS (19 - 25 yrs) | TGC / SSC Tech (20 - 27 yrs) | Territorial Army (18 - 42 yrs).
                </span>
              </div>
            </div>
          )}

          {/* STEP 3: EDUCATION & MARKS */}
          {step === 3 && (
            <div className="wizard-step-pane animate-fade-in">
              <h2 className="step-pane-title">Step 3: Educational Qualifications</h2>
              <p className="step-pane-sub">Select your highest completed or appearing qualification.</p>

              <div className="form-grid-2">
                <div className="form-field">
                  <label htmlFor="wizard-edu">Highest Educational Qualification</label>
                  <select
                    id="wizard-edu"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="select-dropdown-large"
                  >
                    <option value="12th-pcm">10+2 / Intermediate (Physics, Chemistry, Mathematics)</option>
                    <option value="12th-pcb">10+2 / Intermediate (Physics, Chemistry, Biology)</option>
                    <option value="12th-arts">10+2 / Intermediate (Arts / Commerce / Humanities)</option>
                    <option value="engineering">Graduation: BE / B.Tech (Engineering Degree)</option>
                    <option value="graduate-general">Graduation: BA / B.Sc / B.Com / BBA / BCA</option>
                    <option value="law">Graduation: LLB / Law Degree</option>
                    <option value="medical">Graduation: MBBS / BDS (Medical)</option>
                    <option value="10th-pass">Class 10th / Matriculation Pass</option>
                    <option value="8th-pass">Class 8th Pass</option>
                    <option value="post-graduate">Post Graduate (MA / M.Sc / M.Tech / MCA)</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="wizard-pct">Aggregate Percentage / CGPA Equivalent</label>
                  <div className="percentage-input-wrap">
                    <input
                      id="wizard-pct"
                      type="number"
                      min="33"
                      max="100"
                      value={percentage}
                      onChange={(e) => setPercentage(e.target.value)}
                      placeholder="e.g. 75"
                    />
                    <span className="pct-symbol">%</span>
                  </div>
                </div>
              </div>

              <div className="edu-criteria-hint">
                <GraduationCap size={16} />
                <span>
                  Candidates appearing in final year of Graduation or 10+2 are also eligible to apply for CDS and NDA respectively.
                </span>
              </div>
            </div>
          )}

          {/* STEP 4: CAREER INTERESTS & DOMICILE */}
          {step === 4 && (
            <div className="wizard-step-pane animate-fade-in">
              <h2 className="step-pane-title">Step 4: Career Interests & Domicile</h2>
              <p className="step-pane-sub">Tell us which military pathway excites you the most.</p>

              <div className="career-interests-grid">
                {[
                  {
                    id: 'officer',
                    title: 'Commissioned Officer (Leadership & Strategy)',
                    desc: 'Lead infantry platoons, armoured troops, or aviation squadrons as a military officer.',
                    icon: Award
                  },
                  {
                    id: 'tech',
                    title: 'Technical & Engineering Specialist',
                    desc: 'Manage radars, missiles, communications, electronic warfare, and cyber defense systems.',
                    icon: Briefcase
                  },
                  {
                    id: 'agnipath',
                    title: 'Agniveer Combat Force (4-Year Tenure)',
                    desc: 'Transformative military experience with Seva Nidhi corpus and skill certification.',
                    icon: Shield
                  },
                  {
                    id: 'ta',
                    title: 'Territorial Army (Civilian Dual-Career)',
                    desc: 'Wear the uniform part-time while pursuing your existing corporate or civilian job.',
                    icon: User
                  }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`interest-card ${careerInterest === item.id ? 'selected' : ''}`}
                      onClick={() => setCareerInterest(item.id)}
                    >
                      <Icon size={22} className="interest-icon" />
                      <div className="interest-text">
                        <strong>{item.title}</strong>
                        <span>{item.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="form-field" style={{ marginTop: '20px' }}>
                <label htmlFor="wizard-state">Home State / Domicile</label>
                <select
                  id="wizard-state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="select-dropdown-large"
                >
                  {['Haryana', 'Punjab', 'Uttar Pradesh', 'Rajasthan', 'Maharashtra', 'Bihar', 'Karnataka', 'Madhya Pradesh', 'Tamil Nadu', 'West Bengal', 'Uttarakhand', 'Himachal Pradesh', 'Delhi (UT)', 'Assam'].map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* STEP 5: ELIGIBILITY MATCHES & RESULTS */}
          {step === 5 && (
            <div className="wizard-step-pane animate-fade-in">
              <div className="results-top-header">
                <div>
                  <span className="section-tag" style={{ color: 'var(--army-primary)' }}>
                    ANALYSIS COMPLETE
                  </span>
                  <h2 className="step-pane-title">
                    Found {matchingEntries.length} Matching Recruitment {matchingEntries.length === 1 ? 'Entry' : 'Entries'}
                  </h2>
                  <p className="step-pane-sub">
                    Based on your profile (<strong>{gender.toUpperCase()}</strong>, <strong>{ageData.decimalAge} Yrs</strong>, <strong>{education.replace('-', ' ').toUpperCase()}</strong> with <strong>{percentage}%</strong> marks).
                  </p>
                </div>

                <button type="button" className="btn btn-outline btn-sm reset-wizard-btn" onClick={handleReset}>
                  <RotateCcw size={14} />
                  <span>Modify Criteria</span>
                </button>
              </div>

              {/* Matching Entries Grid */}
              <div className="matched-entries-list">
                {matchingEntries.map((match) => (
                  <div key={match.id} className="match-card animate-fade-in">
                    <div className="match-card-header">
                      <div className="match-title-box">
                        <span className="match-category-pill">{match.category}</span>
                        <h3 className="match-entry-title">{match.title}</h3>
                        <span className="match-academy-text">
                          <MapPin size={13} /> {match.academy}
                        </span>
                      </div>

                      <div className="match-score-badge">
                        <span className="score-pct">{match.matchScore}%</span>
                        <span className="score-label">Eligibility Match</span>
                      </div>
                    </div>

                    {/* Criteria Match Details */}
                    <div className="match-reasons-box">
                      <strong>Why You Are Eligible:</strong>
                      <ul className="reasons-list">
                        {match.reasons.map((r, idx) => (
                          <li key={idx}>
                            <CheckCircle2 size={15} className="reason-check" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="match-specs-grid">
                      <div className="spec-item">
                        <span className="spec-label">Age Window:</span>
                        <span className="spec-val">{match.ageRange}</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Commission:</span>
                        <span className="spec-val">{match.commission}</span>
                      </div>
                    </div>

                    <div className="match-card-actions">
                      <Link
                        to={`/apply?entry=${match.id}`}
                        className="btn btn-primary"
                      >
                        <span>Apply For {match.id.toUpperCase()}</span>
                        <ArrowRight size={16} />
                      </Link>

                      <Link
                        to={`/opportunities/${match.opportunityId}`}
                        className="btn btn-outline btn-sm"
                      >
                        <span>View Syllabus & Pay Scale</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Bottom Controls */}
          <div className="wizard-controls-bar">
            {step > 1 && step < 5 && (
              <button type="button" className="btn btn-outline" onClick={handleBack}>
                <ArrowLeft size={16} />
                <span>Previous Step</span>
              </button>
            )}

            {step < 4 && (
              <button type="button" className="btn btn-primary next-btn-right" onClick={handleNext}>
                <span>Continue</span>
                <ArrowRight size={16} />
              </button>
            )}

            {step === 4 && (
              <button type="button" className="btn btn-gold next-btn-right" onClick={handleNext}>
                <Sparkles size={16} />
                <span>Check My Eligible Entries</span>
              </button>
            )}

            {step === 5 && (
              <Link to="/opportunities" className="btn btn-outline next-btn-right">
                <span>Browse All Opportunities</span>
                <ChevronRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </div>
      </div>

      <style>{`
        .find-entry-page {
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
        .find-entry-bg-wrapper {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .find-entry-bg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transition: opacity 0.3s ease;
        }

        .find-entry-bg-img.light-img {
          opacity: 0.75;
          display: block;
        }

        .find-entry-bg-img.dark-img {
          opacity: 0;
          display: none;
        }

        [data-theme='dark'] .find-entry-bg-img.light-img {
          opacity: 0;
          display: none;
        }

        [data-theme='dark'] .find-entry-bg-img.dark-img {
          opacity: 0.85;
          display: block;
        }

        .find-entry-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(244, 246, 248, 0.45) 0%,
            rgba(255, 255, 255, 0.3) 35%,
            rgba(244, 246, 248, 0.6) 100%
          );
        }

        [data-theme='dark'] .find-entry-bg-overlay {
          background: linear-gradient(
            180deg,
            rgba(11, 23, 16, 0.6) 0%,
            rgba(18, 36, 25, 0.45) 35%,
            rgba(11, 23, 16, 0.75) 100%
          );
        }

        .find-entry-content-relative {
          position: relative;
          z-index: 1;
        }

        /* -------------------------------------------------------------
           HERO BANNER: LIGHT & DARK LIQUID GLASS
           ------------------------------------------------------------- */
        .wizard-hero-banner {
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          color: var(--text-primary);
          padding: 48px 0 56px;
          border-bottom: 1px solid rgba(226, 232, 240, 0.85);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          transition: background 0.3s ease, border-color 0.3s ease;
        }

        [data-theme='dark'] .wizard-hero-banner {
          background: rgba(18, 34, 23, 0.85);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);
        }

        .wizard-tag {
          color: var(--gold-dark);
        }

        [data-theme='dark'] .wizard-tag {
          color: var(--gold-light);
        }

        .wizard-hero-content {
          max-width: 800px;
        }

        .wizard-hero-title {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 900;
          line-height: 1.15;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        [data-theme='dark'] .wizard-hero-title {
          color: #ffffff;
        }

        .wizard-hero-subtitle {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        [data-theme='dark'] .wizard-hero-subtitle {
          color: #cbd5e1;
        }

        .wizard-container {
          margin-top: -30px;
          max-width: 960px;
        }

        /* Step Indicators */
        .wizard-steps-indicator {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: var(--radius-md);
          padding: 14px 24px;
          box-shadow: 0 10px 25px -5px rgba(27, 60, 36, 0.06), 0 2px 6px rgba(0, 0, 0, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.95);
          margin-bottom: 24px;
          overflow-x: auto;
        }

        [data-theme='dark'] .wizard-steps-indicator {
          background: rgba(19, 34, 23, 0.85);
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
        }

        .step-indicator-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-muted);
          font-size: 0.8125rem;
          font-weight: 700;
          white-space: nowrap;
        }

        .step-indicator-item.active {
          color: var(--army-primary);
        }

        [data-theme='dark'] .step-indicator-item.active {
          color: var(--gold-light);
        }

        .step-indicator-item.completed {
          color: #16a34a;
        }

        .step-circle {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--bg-surface-subtle);
          border: 1.5px solid var(--border-medium);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 0.75rem;
          transition: all var(--transition-fast);
        }

        .step-indicator-item.active .step-circle {
          background: var(--army-primary);
          color: #ffffff;
          border-color: var(--army-primary);
          box-shadow: 0 0 0 3px rgba(27, 48, 34, 0.15);
        }

        [data-theme='dark'] .step-indicator-item.active .step-circle {
          background: var(--gold-primary);
          color: #0d1a0f;
          border-color: var(--gold-primary);
        }

        .step-indicator-item.completed .step-circle {
          background: #dcfce7;
          border-color: #16a34a;
          color: #16a34a;
        }

        /* Wizard Card Box */
        .wizard-card-box {
          background: #ffffff;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-lg);
          padding: 36px;
        }

        [data-theme='dark'] .wizard-card-box {
          background: var(--army-darkest);
          border-color: var(--border-medium);
        }

        .step-pane-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .step-pane-sub {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        /* Selection Grids */
        .options-selection-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .group-label-text {
          font-size: 0.8125rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 10px;
          display: block;
        }

        .choice-buttons-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .choice-card {
          background: var(--bg-surface-subtle);
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 20px;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 4px;
          transition: all var(--transition-fast);
        }

        .choice-card:hover {
          border-color: var(--army-light);
          transform: translateY(-2px);
        }

        .choice-card.selected {
          border-color: var(--army-primary);
          background: rgba(27, 48, 34, 0.05);
          box-shadow: 0 0 0 3px rgba(27, 48, 34, 0.1);
        }

        [data-theme='dark'] .choice-card.selected {
          border-color: var(--gold-primary);
          background: rgba(197, 155, 39, 0.1);
        }

        .choice-icon {
          color: var(--army-primary);
          margin-bottom: 6px;
        }

        [data-theme='dark'] .choice-icon {
          color: var(--gold-light);
        }

        .choice-card strong {
          font-family: var(--font-display);
          font-size: 1rem;
          color: var(--text-primary);
        }

        .choice-card span {
          font-size: 0.78125rem;
          color: var(--text-secondary);
        }

        /* Step 2 DOB */
        .dob-calculator-wrap {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 20px;
          align-items: center;
          margin-bottom: 24px;
        }

        .large-date-input {
          width: 100%;
          padding: 14px 18px;
          border-radius: var(--radius-md);
          border: 1.5px solid var(--border-medium);
          font-size: 1.125rem;
          color: var(--text-primary);
          background: var(--bg-surface);
          outline: none;
        }

        .age-result-badge-card {
          background: var(--army-primary);
          color: #ffffff;
          border-radius: var(--radius-md);
          padding: 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        [data-theme='dark'] .age-result-badge-card {
          background: var(--army-forest);
        }

        .age-computed-label {
          font-size: 0.75rem;
          color: var(--gold-light);
          font-weight: 700;
          text-transform: uppercase;
        }

        .age-computed-number {
          font-family: var(--font-display);
          font-size: 2.25rem;
          font-weight: 900;
          line-height: 1.1;
          color: #ffffff;
          margin: 4px 0;
        }

        .age-computed-meta {
          font-size: 0.75rem;
          color: #cbd5e1;
        }

        .age-hint-box, .edu-criteria-hint {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        /* Step 3 Form */
        .form-grid-2 {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .select-dropdown-large {
          width: 100%;
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          border: 1.5px solid var(--border-medium);
          background: var(--bg-surface);
          color: var(--text-primary);
          font-size: 0.875rem;
          outline: none;
        }

        .percentage-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .percentage-input-wrap input {
          width: 100%;
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          border: 1.5px solid var(--border-medium);
          background: var(--bg-surface);
          color: var(--text-primary);
          font-size: 1rem;
          outline: none;
        }

        .pct-symbol {
          position: absolute;
          right: 14px;
          font-weight: 800;
          color: var(--text-muted);
        }

        /* Step 4 Interests */
        .career-interests-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .interest-card {
          background: var(--bg-surface-subtle);
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 18px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          text-align: left;
          transition: all var(--transition-fast);
        }

        .interest-card:hover {
          border-color: var(--army-light);
          transform: translateY(-2px);
        }

        .interest-card.selected {
          border-color: var(--army-primary);
          background: rgba(27, 48, 34, 0.05);
          box-shadow: 0 0 0 3px rgba(27, 48, 34, 0.1);
        }

        [data-theme='dark'] .interest-card.selected {
          border-color: var(--gold-primary);
          background: rgba(197, 155, 39, 0.1);
        }

        .interest-icon {
          color: var(--army-primary);
          flex-shrink: 0;
          margin-top: 2px;
        }

        [data-theme='dark'] .interest-icon {
          color: var(--gold-light);
        }

        .interest-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .interest-text strong {
          font-family: var(--font-display);
          font-size: 0.9375rem;
          color: var(--text-primary);
        }

        .interest-text span {
          font-size: 0.78125rem;
          color: var(--text-secondary);
        }

        /* Step 5 Results */
        .results-top-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 24px;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 16px;
          gap: 20px;
        }

        .reset-wizard-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }

        .matched-entries-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .match-card {
          background: var(--bg-surface-subtle);
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: all var(--transition-normal);
        }

        .match-card:hover {
          border-color: var(--army-light);
          box-shadow: var(--shadow-md);
        }

        .match-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
        }

        .match-category-pill {
          font-size: 0.6875rem;
          font-weight: 800;
          color: var(--army-primary);
          background: rgba(35, 63, 45, 0.1);
          padding: 3px 8px;
          border-radius: var(--radius-xs);
          text-transform: uppercase;
        }

        [data-theme='dark'] .match-category-pill {
          color: var(--gold-light);
          background: rgba(197, 155, 39, 0.15);
        }

        .match-entry-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 4px 0;
        }

        .match-academy-text {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.78125rem;
          color: var(--text-muted);
        }

        .match-score-badge {
          background: rgba(34, 197, 94, 0.1);
          backdrop-filter: blur(12px) saturate(180%);
          -webkit-backdrop-filter: blur(12px) saturate(180%);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: var(--radius-md);
          padding: 8px 14px;
          text-align: center;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 14px rgba(34, 197, 94, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.6);
        }

        [data-theme='dark'] .match-score-badge {
          background: rgba(34, 197, 94, 0.12);
          border-color: rgba(34, 197, 94, 0.35);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.05);
        }

        .score-pct {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 900;
          color: #15803d;
          line-height: 1;
        }

        [data-theme='dark'] .score-pct {
          color: #4ade80;
        }

        .score-label {
          font-size: 0.625rem;
          color: #166534;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        [data-theme='dark'] .score-label {
          color: #86efac;
        }

        .match-reasons-box {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 14px;
          font-size: 0.8125rem;
        }

        .match-reasons-box strong {
          color: var(--text-primary);
          margin-bottom: 6px;
          display: block;
        }

        .reasons-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .reasons-list li {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
        }

        .reason-check {
          color: #16a34a;
          flex-shrink: 0;
        }

        .match-specs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          font-size: 0.8125rem;
        }

        .spec-item {
          display: flex;
          gap: 6px;
        }

        .spec-label {
          color: var(--text-muted);
        }

        .spec-val {
          font-weight: 700;
          color: var(--text-primary);
        }

        .match-card-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* Bottom Controls */
        .wizard-controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 36px;
          padding-top: 20px;
          border-top: 1px solid var(--border-subtle);
        }

        .next-btn-right {
          margin-left: auto;
        }

        @media (max-width: 768px) {
          .choice-buttons-row,
          .career-interests-grid,
          .dob-calculator-wrap,
          .form-grid-2 {
            grid-template-columns: 1fr;
          }
          .wizard-steps-indicator {
            justify-content: flex-start;
            gap: 16px;
          }
          .step-text-label {
            display: none;
          }
          .wizard-hero-title {
            font-size: 1.875rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FindEntryPage;
