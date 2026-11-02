import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  HeartPulse,
  Info,
  Ruler,
  Scale,
  ShieldCheck,
  Stethoscope,
  UserRound
} from 'lucide-react';

const INITIAL_FORM = {
  entry: 'graduate',
  sex: 'male',
  age: '22',
  region: 'general',
  height: '',
  weight: '',
  chestExpansion: 'not-measured',
  bloodPressure: 'not-measured',
  visionRight: '6/6',
  visionLeft: '6/6',
  correctedVision: '6/6',
  colourVision: 'normal',
  hearing: 'normal',
  musculoskeletal: 'none',
  medicalHistory: 'none',
  dental: 'clear'
};

// Reference rows transcribed from the UPSC NDA & NA I 2025 at-entry tables.
// The official tables contain a row for every centimetre; these common-height
// rows keep this quick reference readable while retaining the published values.
const HEIGHT_WEIGHT_REFERENCE = {
  male: [
    { height: 152, min: 40, below20: 53, age20to25: 55, above25: 58 },
    { height: 157, min: 42, below20: 57, age20to25: 59, above25: 62 },
    { height: 160, min: 44, below20: 59, age20to25: 61, above25: 64 },
    { height: 165, min: 46, below20: 63, age20to25: 65, above25: 68 },
    { height: 170, min: 49, below20: 66, age20to25: 69, above25: 72 },
    { height: 175, min: 52, below20: 70, age20to25: 74, above25: 77 },
    { height: 180, min: 55, below20: 75, age20to25: 78, above25: 81 },
    { height: 185, min: 58, below20: 79, age20to25: 82, above25: 86 },
    { height: 190, min: 61, below20: 83, age20to25: 87, above25: 90 },
    { height: 195, min: 65, below20: 87, age20to25: 91, above25: 95 }
  ],
  female: [
    { height: 147, min: 37, below20: 45, age20to25: 48, above25: 51 },
    { height: 152, min: 37, below20: 49, age20to25: 51, above25: 54 },
    { height: 157, min: 39, below20: 52, age20to25: 54, above25: 58 },
    { height: 160, min: 41, below20: 54, age20to25: 56, above25: 60 },
    { height: 165, min: 44, below20: 57, age20to25: 60, above25: 64 },
    { height: 170, min: 46, below20: 61, age20to25: 64, above25: 68 },
    { height: 175, min: 49, below20: 64, age20to25: 67, above25: 72 },
    { height: 180, min: 52, below20: 68, age20to25: 71, above25: 76 },
    { height: 185, min: 55, below20: 72, age20to25: 75, above25: 80 },
    { height: 190, min: 58, below20: 76, age20to25: 79, above25: 85 }
  ]
};

const ENTRY_LABELS = {
  graduate: 'CDS · IMA / OTA / TGC equivalent',
  nda: '10+2 · NDA / TES equivalent'
};

const AGE_BAND_LABELS = {
  below20: 'Below 20 years',
  age20to25: '20 to 25 years',
  above25: 'Above 25 years'
};

const getAgeBand = (age) => {
  const numericAge = Number(age);
  if (numericAge < 20) return 'below20';
  if (numericAge <= 25) return 'age20to25';
  return 'above25';
};

const getClosestReference = (rows, height) => {
  if (!height) return null;
  return rows.reduce((closest, row) => {
    if (!closest) return row;
    return Math.abs(row.height - height) < Math.abs(closest.height - height) ? row : closest;
  }, null);
};

const getVisionDenominator = (value) => {
  const match = String(value).match(/6\/(\d+)/);
  return match ? Number(match[1]) : null;
};

const QuickMedicalCheckPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [form, setForm] = useState(INITIAL_FORM);
  const [hasChecked, setHasChecked] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setHasChecked(false);
  };

  const reference = useMemo(() => {
    const rows = HEIGHT_WEIGHT_REFERENCE[form.sex];
    const height = Number(form.height);
    const row = getClosestReference(rows, height);
    const ageBand = getAgeBand(form.age);
    const minimumHeight = form.sex === 'female'
      ? (form.region === 'hill' ? 147 : form.region === 'lakshadweep' ? 150 : 152)
      : (form.region === 'hill' ? 152 : form.region === 'lakshadweep' ? 155 : 157);

    return {
      row,
      ageBand,
      minimumHeight,
      maximumWeight: row ? row[ageBand] : null
    };
  }, [form.age, form.height, form.region, form.sex]);

  const screening = useMemo(() => {
    const flags = [];
    const height = Number(form.height);
    const weight = Number(form.weight);
    const hasMeasurements = Number.isFinite(height) && height > 0 && Number.isFinite(weight) && weight > 0;

    if (!hasMeasurements) {
      flags.push({
        title: 'Height and weight',
        detail: 'Enter both measurements to compare them with the published reference range.'
      });
    } else {
      if (height < reference.minimumHeight) {
        flags.push({
          title: 'Minimum height',
          detail: `The selected reference requires at least ${reference.minimumHeight} cm for this sex and region.`
        });
      }

      if (reference.row && (weight < reference.row.min || weight > reference.maximumWeight)) {
        flags.push({
          title: 'Height-to-weight range',
          detail: `The nearest ${reference.row.height} cm reference row is ${reference.row.min}–${reference.maximumWeight} kg for your age band.`
        });
      }

      const bmi = weight / ((height / 100) ** 2);
      if (bmi >= 25) {
        flags.push({
          title: 'BMI review',
          detail: `Your calculated BMI is ${bmi.toFixed(1)}. A medical specialist should review this with your build and composition.`
        });
      }
    }

    const entryUncorrectedLimit = form.entry === 'nda' ? 36 : 60;
    const rightVision = getVisionDenominator(form.visionRight);
    const leftVision = getVisionDenominator(form.visionLeft);
    if (!rightVision || !leftVision || rightVision > entryUncorrectedLimit || leftVision > entryUncorrectedLimit) {
      flags.push({
        title: 'Vision review',
        detail: `The selected ${ENTRY_LABELS[form.entry]} reference uses an uncorrected limit of 6/${entryUncorrectedLimit}; entry-specific vision rules still apply.`
      });
    }
    if (form.correctedVision !== '6/6') {
      flags.push({
        title: 'Best corrected vision',
        detail: 'The reference standard expects best corrected vision of 6/6 in each eye.'
      });
    }
    if (form.colourVision !== 'normal') flags.push({ title: 'Colour vision', detail: 'Colour vision should be assessed by the official medical team.' });
    if (form.hearing !== 'normal') flags.push({ title: 'Hearing', detail: 'An ENT assessment is recommended before the official board.' });
    if (form.musculoskeletal !== 'none') flags.push({ title: 'Musculoskeletal history', detail: 'A past injury or current pain needs a specialist review.' });
    if (form.medicalHistory !== 'none') flags.push({ title: 'Medical history', detail: 'Declare medical conditions and regular medicines to the official board.' });
    if (form.dental !== 'clear') flags.push({ title: 'Dental review', detail: 'Arrange a dental assessment before reporting for medicals.' });
    if (form.chestExpansion === 'below') flags.push({ title: 'Chest expansion', detail: 'The reference minimum is 5 cm; have this measured correctly.' });
    if (form.bloodPressure === 'elevated') flags.push({ title: 'Blood pressure', detail: 'A repeated, properly measured reading should be reviewed by a clinician.' });

    return {
      flags,
      bmi: hasMeasurements ? weight / ((height / 100) ** 2) : null,
      hasMeasurements
    };
  }, [form, reference]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setHasChecked(true);
  };

  const renderSelect = (name, label, options, help) => (
    <div className="form-field medical-form-field">
      <label htmlFor={`medical-${name}`}>{label}</label>
      <select id={`medical-${name}`} name={name} value={form[name]} onChange={updateField}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      {help && <span className="medical-field-help">{help}</span>}
    </div>
  );

  const renderResult = () => {
    if (!hasChecked) return null;
    const isReady = screening.flags.length === 0;

    return (
      <section className={`medical-result-card ${isReady ? 'is-ready' : 'needs-review'}`} aria-live="polite">
        <div className="medical-result-icon">
          {isReady ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
        </div>
        <div className="medical-result-copy">
          <span className="medical-result-kicker">PRELIMINARY RESULT</span>
          <h3>{isReady ? 'No screening flags found' : 'A few items need medical review'}</h3>
          <p>
            {isReady
              ? 'The information entered is within the selected reference checks. This is not an official medical certificate.'
              : 'This is not a rejection. Please take the flagged items to a qualified clinician before your official medical examination.'}
          </p>
          {screening.flags.length > 0 && (
            <ul className="medical-result-list">
              {screening.flags.map((flag) => (
                <li key={flag.title}>
                  <strong>{flag.title}</strong>
                  <span>{flag.detail}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="medical-result-footnote">
            <Info size={15} />
            <span>Only the Armed Forces Medical Board can determine medical fitness.</span>
          </div>
        </div>
      </section>
    );
  };

  const renderProfileTab = () => (
    <div className="tab-pane animate-fade-in">
      <div className="medical-pane-heading">
        <div>
          <h2 className="pane-title">Check your basic readiness</h2>
          <p className="pane-text">Enter the details below for a quick, private pre-screening guide based on published Armed Forces entry references.</p>
        </div>
        <span className="medical-secure-note"><ShieldCheck size={15} /> Self-attested guide</span>
      </div>

      <form className="medical-form" onSubmit={handleSubmit}>
        <div className="medical-form-section">
          <div className="medical-section-heading">
            <UserRound size={20} />
            <div>
              <h3>Profile and entry</h3>
              <p>Select the reference closest to the entry you are preparing for.</p>
            </div>
          </div>
          <div className="medical-form-grid medical-form-grid-4">
            {renderSelect('entry', 'Entry reference', [
              { value: 'graduate', label: ENTRY_LABELS.graduate },
              { value: 'nda', label: ENTRY_LABELS.nda }
            ])}
            {renderSelect('sex', 'Sex', [
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' }
            ])}
            <div className="form-field medical-form-field">
              <label htmlFor="medical-age">Age at last birthday</label>
              <input id="medical-age" name="age" type="number" min="16" max="45" value={form.age} onChange={updateField} />
              <span className="medical-field-help">Used to choose the chart age band.</span>
            </div>
            {renderSelect('region', 'Height concession region', [
              { value: 'general', label: 'General reference' },
              { value: 'hill', label: 'Gorkha / North-East / hilly Uttarakhand' },
              { value: 'lakshadweep', label: 'Lakshadweep ethnicity (where applicable)' }
            ], 'Choose a concession only if it applies to you.')}
          </div>
        </div>

        <div className="medical-form-section">
          <div className="medical-section-heading">
            <Ruler size={20} />
            <div>
              <h3>Measurements</h3>
              <p>Use a level floor and a calibrated scale; record your morning measurements where possible.</p>
            </div>
          </div>
          <div className="medical-form-grid medical-form-grid-4">
            <div className="form-field medical-form-field">
              <label htmlFor="medical-height">Height (cm)</label>
              <input id="medical-height" name="height" type="number" min="130" max="220" step="0.1" placeholder="e.g. 172" value={form.height} onChange={updateField} required />
              <span className="medical-field-help">Reference minimum: {reference.minimumHeight} cm.</span>
            </div>
            <div className="form-field medical-form-field">
              <label htmlFor="medical-weight">Weight (kg)</label>
              <input id="medical-weight" name="weight" type="number" min="30" max="160" step="0.1" placeholder="e.g. 66" value={form.weight} onChange={updateField} required />
              <span className="medical-field-help">Closest chart row: {reference.row ? `${reference.row.height} cm` : 'enter height first'}.</span>
            </div>
            {renderSelect('chestExpansion', 'Chest expansion', [
              { value: 'not-measured', label: 'Not measured' },
              { value: 'five-plus', label: '5 cm or more' },
              { value: 'below', label: 'Below 5 cm' }
            ], 'The published reference recommends at least 5 cm.')}
            {renderSelect('bloodPressure', 'Blood pressure', [
              { value: 'not-measured', label: 'Not measured' },
              { value: 'normal', label: 'Normal on recent reading' },
              { value: 'elevated', label: 'Elevated / known high' }
            ])}
          </div>
        </div>

        <div className="medical-form-section">
          <div className="medical-section-heading">
            <Eye size={20} />
            <div>
              <h3>Vision and health declaration</h3>
              <p>These are self-attested prompts only; do not use them to replace an examination.</p>
            </div>
          </div>
          <div className="medical-form-grid medical-form-grid-4">
            {renderSelect('visionRight', 'Uncorrected vision · right eye', [
              { value: '6/6', label: '6/6' }, { value: '6/9', label: '6/9' }, { value: '6/12', label: '6/12' }, { value: '6/18', label: '6/18' }, { value: '6/24', label: '6/24' }, { value: '6/36', label: '6/36' }, { value: '6/60', label: '6/60 or worse' }
            ])}
            {renderSelect('visionLeft', 'Uncorrected vision · left eye', [
              { value: '6/6', label: '6/6' }, { value: '6/9', label: '6/9' }, { value: '6/12', label: '6/12' }, { value: '6/18', label: '6/18' }, { value: '6/24', label: '6/24' }, { value: '6/36', label: '6/36' }, { value: '6/60', label: '6/60 or worse' }
            ])}
            {renderSelect('correctedVision', 'Best corrected vision', [
              { value: '6/6', label: '6/6 both eyes' }, { value: '6/9', label: '6/9 or worse' }
            ])}
            {renderSelect('colourVision', 'Colour vision', [
              { value: 'normal', label: 'Normal on recent test' },
              { value: 'defective', label: 'Defective / unsure' }
            ])}
            {renderSelect('hearing', 'Hearing', [
              { value: 'normal', label: 'No known difficulty' },
              { value: 'impaired', label: 'Difficulty / not assessed' }
            ])}
            {renderSelect('musculoskeletal', 'Bones, joints and movement', [
              { value: 'none', label: 'No current issue' },
              { value: 'history', label: 'Past injury / surgery' },
              { value: 'current', label: 'Current pain / limitation' }
            ])}
            {renderSelect('medicalHistory', 'Medical history', [
              { value: 'none', label: 'No known condition or regular medicine' },
              { value: 'condition', label: 'Condition / regular medicine' },
              { value: 'unsure', label: 'Unsure — need a review' }
            ])}
            {renderSelect('dental', 'Dental health', [
              { value: 'clear', label: 'No known dental issue' },
              { value: 'review', label: 'Treatment or review pending' }
            ])}
          </div>
        </div>

        <div className="medical-form-actions">
          <p><Info size={15} /> Your entries stay in this page and are not submitted to the Army.</p>
          <button type="submit" className="btn btn-primary medical-submit-btn">
            <ClipboardCheck size={18} />
            <span>Check if I am fit</span>
            <ArrowRight size={17} />
          </button>
        </div>
      </form>
      {renderResult()}
    </div>
  );

  const renderChecklistTab = () => (
    <div className="tab-pane animate-fade-in">
      <h2 className="pane-title">What the official medicals consider</h2>
      <p className="pane-text">The medical examination is comprehensive. These headings help you prepare your documents and questions before reporting.</p>
      <div className="medical-checklist-grid">
        {[
          { icon: HeartPulse, title: 'General health and constitution', text: 'Overall physique, nutrition, BMI, vital signs and fitness for military training.' },
          { icon: Eye, title: 'Vision and colour perception', text: 'Visual acuity, refraction, colour vision and entry or branch-specific eyesight requirements.' },
          { icon: Activity, title: 'Musculoskeletal system', text: 'Posture, spine, joints, limbs, movement, old injuries and functional capacity.' },
          { icon: Stethoscope, title: 'ENT, hearing and dental', text: 'Ear, nose and throat health, hearing assessment and dental fitness.' },
          { icon: ShieldCheck, title: 'Cardio-respiratory health', text: 'Heart, blood pressure, lungs and other clinical findings are examined by specialists.' },
          { icon: ClipboardCheck, title: 'Investigations where prescribed', text: 'Officer-entry examinations can include haemogram, urine testing, chest X-ray and abdominal or pelvic ultrasound.' }
        ].map(({ icon: Icon, title, text }) => (
          <article className="spec-card medical-checklist-card" key={title}>
            <Icon size={22} className="spec-card-icon" />
            <h4>{title}</h4>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <div className="eligibility-summary-panel medical-notice-panel">
        <div className="eligibility-summary-heading"><Info size={18} /><div><span>Prepare honestly</span><small>Bring prescriptions, reports and prior treatment records when relevant.</small></div></div>
        <p>Recruitment and officer-entry medical standards are guidelines and can change. The Medical Board’s examination and decision are final.</p>
      </div>
    </div>
  );

  const renderChartTab = () => {
    const rows = HEIGHT_WEIGHT_REFERENCE[form.sex];
    const selectedHeight = Number(form.height);
    const selectedRow = reference.row;
    const ageBand = reference.ageBand;

    return (
      <div className="tab-pane animate-fade-in">
        <div className="medical-pane-heading">
          <div>
            <h2 className="pane-title">Height and weight reference</h2>
            <p className="pane-text">Published at-entry reference rows. Enter your height and select the chart profile below to highlight the closest row and age-specific column.</p>
          </div>
          <span className="medical-chart-badge">{form.sex === 'female' ? 'Female' : 'Male'} · {AGE_BAND_LABELS[ageBand]}</span>
        </div>

        <div className="medical-chart-controls" aria-label="Chart selection controls">
          <div className="form-field medical-form-field">
            <label htmlFor="chart-height">Enter height (cm)</label>
            <input id="chart-height" name="height" type="number" min="130" max="220" step="0.1" placeholder="e.g. 172" value={form.height} onChange={updateField} />
            <span className="medical-field-help">The closest published row will be highlighted.</span>
          </div>
          {renderSelect('sex', 'Chart for', [
            { value: 'male', label: 'Male candidates' },
            { value: 'female', label: 'Female candidates' }
          ])}
          <div className="form-field medical-form-field">
            <label htmlFor="chart-age">Age at last birthday</label>
            <input id="chart-age" name="age" type="number" min="16" max="45" value={form.age} onChange={updateField} />
            <span className="medical-field-help">Current column: {AGE_BAND_LABELS[ageBand]}.</span>
          </div>
        </div>

        <div className="medical-reference-strip">
          <div><Ruler size={18} /><span>Minimum height</span><strong>{reference.minimumHeight} cm</strong></div>
          <div><Scale size={18} /><span>Selected chart row</span><strong>{selectedRow ? `${selectedRow.height} cm` : 'Enter height'}</strong>{selectedHeight > 0 && selectedRow && <small>{selectedHeight} cm entered</small>}</div>
          <div><Activity size={18} /><span>Calculated BMI</span><strong>{screening.bmi ? screening.bmi.toFixed(1) : '—'}</strong></div>
        </div>

        <div className="entries-table-card medical-chart-table-card">
          <table className="entries-table">
            <thead>
              <tr><th>Height</th><th>Minimum weight</th><th>Max · below 20</th><th>Max · 20–25</th><th>Max · above 25</th></tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.height} className={selectedRow && row.height === selectedRow.height ? 'medical-selected-row' : ''}>
                  <td><strong>{row.height} cm</strong>{selectedHeight && row.height === selectedRow?.height && <span className="medical-row-marker">closest to your height</span>}</td>
                  <td>{row.min} kg</td>
                  <td>{row.below20} kg</td>
                  <td>{row.age20to25} kg</td>
                  <td>{row.above25} kg</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="medical-chart-note">
          <Info size={17} />
          <p>The official notifications publish a row for each centimetre. This page shows common-height rows for a quick guide; always check the notification for your exact height, entry, age and any specialist-branch rule.</p>
        </div>
        <div className="medical-source-links">
          <span>Reference documents:</span>
          <a href="https://upsc.gov.in/sites/default/files/Notific-NDA-NA-I-2025-Engl-11122024.pdf" target="_blank" rel="noreferrer">UPSC NDA & NA I 2025 notification</a>
          <a href="https://upsc.gov.in/sites/default/files/Notifi-CDSE-I-2025-Engl-11122024.pdf" target="_blank" rel="noreferrer">UPSC CDS I 2025 notification</a>
        </div>
      </div>
    );
  };

  return (
    <div className="opp-detail-page medical-page" id="main-content">
      <div className="opp-detail-bg-wrapper" aria-hidden="true">
        <img src="/assets/tricolor-glass-light.jpg" alt="" className="opp-detail-bg-img light-img" />
        <img src="/assets/tricolor-glass-dark.jpg" alt="" className="opp-detail-bg-img dark-img" />
        <div className="opp-detail-bg-overlay" />
      </div>

      <div className="opp-detail-content-relative">
        <div className="detail-hero-banner medical-hero-banner">
          <div className="detail-hero-bg">
            <img src="/assets/army-medical-officer.png" alt="Indian Army medical officer in a clinical setting" className="detail-hero-img" />
            <div className="detail-hero-overlay" />
          </div>
          <div className="container detail-hero-content">
            <Link to="/" className="back-link"><ArrowLeft size={16} /><span>Back to Home</span></Link>
            <span className="opp-detail-badge">MEDICAL PRE-SCREENING GUIDE</span>
            <h1 className="opp-detail-title">Quick Medical Check</h1>
            <p className="opp-detail-tagline">Prepare with clarity for the standards that shape a life of service in the Indian Army.</p>
            <div className="opp-detail-quick-meta">
              <div className="quick-meta-item"><HeartPulse size={16} /><span className="meta-lbl">Purpose:</span><strong className="meta-val">Preparation guide</strong></div>
              <div className="quick-meta-item"><Stethoscope size={16} /><span className="meta-lbl">Scope:</span><strong className="meta-val">Army entry references</strong></div>
              <div className="quick-meta-item"><ShieldCheck size={16} /><span className="meta-lbl">Decision:</span><strong className="meta-val">Medical Board</strong></div>
            </div>
          </div>
        </div>

        <div className="container detail-main-container medical-main-container">
          <div className="detail-tabs-bar" role="tablist" aria-label="Quick medical check sections">
            {[
              { id: 'profile', label: 'Your profile' },
              { id: 'checklist', label: 'Medical checklist' },
              { id: 'chart', label: 'Height & weight chart' }
            ].map((tab) => (
              <button key={tab.id} type="button" className={`detail-tab-btn ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)} role="tab" aria-selected={activeTab === tab.id}>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="detail-tab-content-card medical-content-card">
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'checklist' && renderChecklistTab()}
            {activeTab === 'chart' && renderChartTab()}
          </div>

          <div className="detail-bottom-cta medical-bottom-cta">
            <div><h3>Official medicals are the final word.</h3><p>Use this page to prepare, then follow the current notification for your entry.</p></div>
            <Link to="/opportunities" className="btn btn-gold btn-lg"><span>Explore Army Entries</span><ArrowRight size={18} /></Link>
          </div>
        </div>
      </div>

      <style>{`
        .medical-page { background-color: var(--bg-app); min-height: 100vh; padding-bottom: 80px; position: relative; overflow: hidden; font-family: var(--font-sans); }
        .medical-page .opp-detail-bg-wrapper { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
        .medical-page .opp-detail-bg-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center top; }
        .medical-page .opp-detail-bg-img.light-img { opacity: 0.75; display: block; }
        .medical-page .opp-detail-bg-img.dark-img { opacity: 0; display: none; }
        [data-theme='dark'] .medical-page .opp-detail-bg-img.light-img { opacity: 0; display: none; }
        [data-theme='dark'] .medical-page .opp-detail-bg-img.dark-img { opacity: 0.85; display: block; }
        .medical-page .opp-detail-bg-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(244,246,248,0.45) 0%, rgba(255,255,255,0.3) 35%, rgba(244,246,248,0.6) 100%); }
        [data-theme='dark'] .medical-page .opp-detail-bg-overlay { background: linear-gradient(180deg, rgba(11,23,16,0.6) 0%, rgba(18,36,25,0.45) 35%, rgba(11,23,16,0.75) 100%); }
        .medical-page .opp-detail-content-relative { position: relative; z-index: 1; }
        .medical-page .detail-hero-banner { position: relative; min-height: 520px; display: flex; align-items: center; background: #09120b; overflow: hidden; padding: 64px 0 120px; color: #fff; }
        .medical-page .detail-hero-bg { position: absolute; inset: 0; z-index: 1; }
        .medical-page .detail-hero-img { width: 100%; height: 100%; object-fit: cover; object-position: center 34%; }
        .medical-page .detail-hero-overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(9,18,11,0.95) 0%, rgba(9,18,11,0.76) 42%, rgba(9,18,11,0.32) 100%); }
        .medical-page .detail-hero-content { position: relative; z-index: 10; max-width: 860px; display: flex; flex-direction: column; align-items: flex-start; }
        .medical-page .back-link { display: inline-flex; align-items: center; gap: 6px; font-size: 0.8125rem; color: var(--gold-light); font-weight: 600; margin-bottom: 20px; width: fit-content; transition: color var(--transition-fast), transform var(--transition-fast); }
        .medical-page .back-link:hover { color: #fff; transform: translateX(-3px); }
        .medical-page .opp-detail-badge { display: inline-flex; width: fit-content; background: linear-gradient(135deg, rgba(218,165,32,0.35), rgba(180,130,20,0.22)); backdrop-filter: blur(14px) saturate(190%); color: #fff9e6; font-size: 0.75rem; font-weight: 800; padding: 6px 16px; border-radius: 100px; text-transform: uppercase; letter-spacing: 0.05em; border: 1px solid rgba(255,223,128,0.55); margin-bottom: 14px; }
        .medical-page .opp-detail-title { font-family: var(--font-display); font-size: 3rem; font-weight: 900; line-height: 1.1; color: #fff; margin-bottom: 10px; }
        .medical-page .opp-detail-tagline { font-size: 1.125rem; color: #cbd5e1; margin-bottom: 24px; max-width: 620px; }
        .medical-page .opp-detail-quick-meta { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; background: rgba(255,255,255,0.08); backdrop-filter: blur(14px) saturate(180%); padding: 14px 24px; border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.18); width: fit-content; margin-bottom: 24px; }
        .medical-page .quick-meta-item { display: flex; align-items: center; gap: 6px; font-size: 0.8125rem; }
        .medical-page .quick-meta-item > svg { color: var(--gold-light); }
        .medical-page .meta-lbl { color: #cbd5e1; }
        .medical-page .meta-val { color: #fff; }
        .medical-page .detail-main-container { margin-top: -28px; position: relative; z-index: 20; max-width: 1120px; }
        .medical-page .detail-tabs-bar { display: flex; gap: 4px; border-radius: var(--radius-md); overflow-x: auto; scrollbar-width: none; margin-bottom: 24px; padding: 6px; background: rgba(255,255,255,0.88); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.95); box-shadow: 0 10px 25px -5px rgba(27,60,36,0.06); }
        [data-theme='dark'] .medical-page .detail-tabs-bar { background: rgba(19,34,23,0.86); border-color: rgba(255,255,255,0.08); box-shadow: 0 10px 25px -5px rgba(0,0,0,0.4); }
        .medical-page .detail-tab-btn { flex: 1; padding: 11px 14px; border-radius: var(--radius-sm); font-family: var(--font-display); font-size: 0.84375rem; font-weight: 700; color: var(--text-secondary); white-space: nowrap; background: transparent; border: none; cursor: pointer; }
        .medical-page .detail-tab-btn:hover { color: var(--army-primary); background: rgba(255,255,255,0.85); }
        [data-theme='dark'] .medical-page .detail-tab-btn:hover { color: var(--gold-light); background: rgba(255,255,255,0.12); }
        .medical-page .detail-tab-btn.active { background: var(--army-primary); color: #fff; }
        [data-theme='dark'] .medical-page .detail-tab-btn.active { background: var(--gold-primary); color: #0d1a0f; }
        .medical-page .detail-tab-content-card { background: rgba(255,255,255,0.9); backdrop-filter: blur(16px); border-radius: var(--radius-lg); border: 1px solid rgba(255,255,255,0.95); box-shadow: 0 16px 36px -6px rgba(27,60,36,0.08); padding: 36px; }
        [data-theme='dark'] .medical-page .detail-tab-content-card { background: rgba(19,34,23,0.88); border-color: rgba(255,255,255,0.08); box-shadow: 0 16px 36px -6px rgba(0,0,0,0.45); }
        .medical-page .pane-title { font-family: var(--font-display); font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 10px; }
        .medical-page .pane-text { font-size: 0.9375rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px; }
        .medical-pane-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; margin-bottom: 22px; }
        .medical-secure-note, .medical-chart-badge { display: inline-flex; align-items: center; gap: 6px; flex-shrink: 0; color: var(--army-primary); background: rgba(31,73,48,0.08); border: 1px solid rgba(31,73,48,0.14); border-radius: 100px; padding: 7px 11px; font-size: 0.72rem; font-weight: 800; }
        [data-theme='dark'] .medical-secure-note, [data-theme='dark'] .medical-chart-badge { color: var(--gold-light); background: rgba(197,155,39,0.12); border-color: rgba(197,155,39,0.26); }
        .medical-form { display: grid; gap: 18px; }
        .medical-form-section { border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 20px; background: rgba(247,249,248,0.72); }
        [data-theme='dark'] .medical-form-section { background: rgba(0,0,0,0.18); }
        .medical-section-heading { display: flex; align-items: flex-start; gap: 11px; margin-bottom: 18px; color: var(--army-primary); }
        [data-theme='dark'] .medical-section-heading { color: var(--gold-light); }
        .medical-section-heading h3 { font-family: var(--font-display); font-size: 1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 3px; }
        .medical-section-heading p { font-size: 0.78rem; color: var(--text-secondary); line-height: 1.45; }
        .medical-form-grid { display: grid; gap: 16px; }
        .medical-form-grid-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .medical-form-field { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
        .medical-form-field label { font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); }
        .medical-form-field input, .medical-form-field select { width: 100%; min-height: 43px; padding: 9px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-medium); background: var(--bg-surface); color: var(--text-primary); font-size: 0.8rem; outline: none; }
        .medical-form-field input:focus, .medical-form-field select:focus { border-color: var(--army-primary); box-shadow: 0 0 0 3px rgba(27,48,34,0.1); }
        [data-theme='dark'] .medical-form-field input:focus, [data-theme='dark'] .medical-form-field select:focus { border-color: var(--gold-primary); box-shadow: 0 0 0 3px rgba(197,155,39,0.16); }
        .medical-field-help { color: var(--text-muted); font-size: 0.68rem; line-height: 1.35; }
        .medical-form-actions { display: flex; align-items: center; justify-content: space-between; gap: 18px; padding: 4px 2px 0; }
        .medical-form-actions p { display: inline-flex; align-items: center; gap: 6px; color: var(--text-muted); font-size: 0.75rem; }
        .medical-form-actions p svg { color: var(--army-primary); flex-shrink: 0; }
        [data-theme='dark'] .medical-form-actions p svg { color: var(--gold-light); }
        .medical-submit-btn { min-height: 46px; }
        .medical-result-card { display: flex; align-items: flex-start; gap: 14px; margin-top: 22px; padding: 20px; border-radius: var(--radius-md); border: 1px solid rgba(31,73,48,0.22); background: linear-gradient(135deg, rgba(234,248,237,0.94), rgba(255,255,255,0.82)); }
        .medical-result-card.needs-review { border-color: rgba(197,155,39,0.35); background: linear-gradient(135deg, rgba(255,250,233,0.95), rgba(255,255,255,0.82)); }
        [data-theme='dark'] .medical-result-card { background: rgba(31,73,48,0.22); border-color: rgba(130,200,147,0.26); }
        [data-theme='dark'] .medical-result-card.needs-review { background: rgba(197,155,39,0.1); border-color: rgba(229,190,89,0.3); }
        .medical-result-icon { color: var(--army-primary); flex-shrink: 0; }
        .needs-review .medical-result-icon { color: var(--gold-dark); }
        [data-theme='dark'] .medical-result-icon, [data-theme='dark'] .needs-review .medical-result-icon { color: var(--gold-light); }
        .medical-result-kicker { display: block; color: var(--army-primary); font-size: 0.68rem; font-weight: 800; letter-spacing: 0.08em; margin-bottom: 4px; }
        [data-theme='dark'] .medical-result-kicker { color: var(--gold-light); }
        .medical-result-copy h3 { font-family: var(--font-display); font-size: 1.05rem; color: var(--text-primary); margin-bottom: 5px; }
        .medical-result-copy > p { color: var(--text-secondary); font-size: 0.8rem; line-height: 1.5; }
        .medical-result-list { display: grid; gap: 9px; margin: 14px 0; list-style: none; }
        .medical-result-list li { display: grid; gap: 1px; padding-left: 14px; border-left: 2px solid var(--gold-primary); }
        .medical-result-list strong { font-size: 0.78rem; color: var(--text-primary); }
        .medical-result-list span { color: var(--text-secondary); font-size: 0.75rem; line-height: 1.45; }
        .medical-result-footnote { display: flex; align-items: center; gap: 6px; color: var(--text-muted); font-size: 0.72rem; margin-top: 12px; }
        .medical-result-footnote svg { color: var(--gold-dark); flex-shrink: 0; }
        .medical-checklist-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .medical-checklist-card { gap: 8px; min-height: 168px; }
        .medical-checklist-card p { line-height: 1.55; }
        .medical-notice-panel { margin: 24px 0 0; }
        .medical-notice-panel p { color: var(--text-secondary); font-size: 0.8rem; line-height: 1.5; }
        .medical-chart-controls { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; padding: 18px; margin: 4px 0 18px; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); background: linear-gradient(135deg, rgba(247,249,248,0.86), rgba(255,255,255,0.64)); }
        [data-theme='dark'] .medical-chart-controls { background: rgba(0,0,0,0.18); }
        .medical-reference-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 4px 0 22px; }
        .medical-reference-strip > div { display: grid; grid-template-columns: auto 1fr; align-items: center; column-gap: 8px; row-gap: 1px; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); background: var(--bg-surface-subtle); padding: 13px 14px; }
        .medical-reference-strip svg { grid-row: span 2; color: var(--army-primary); }
        [data-theme='dark'] .medical-reference-strip svg { color: var(--gold-light); }
        .medical-reference-strip span { color: var(--text-muted); font-size: 0.68rem; }
        .medical-reference-strip strong { color: var(--text-primary); font-size: 0.92rem; }
        .medical-reference-strip small { grid-column: 2; color: var(--gold-dark); font-size: 0.64rem; font-weight: 700; }
        [data-theme='dark'] .medical-reference-strip small { color: var(--gold-light); }
        .medical-chart-table-card { margin-bottom: 20px; overflow-x: auto; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); background: var(--bg-surface); box-shadow: 0 8px 22px rgba(27,60,36,0.05); }
        [data-theme='dark'] .medical-chart-table-card { background: rgba(11,23,16,0.48); box-shadow: 0 8px 22px rgba(0,0,0,0.22); }
        .medical-chart-table-card .entries-table { width: 100%; min-width: 720px; border-collapse: separate; border-spacing: 0; text-align: left; font-size: 0.8rem; }
        .medical-chart-table-card .entries-table th { padding: 14px 16px; background: var(--bg-surface-subtle); color: var(--text-muted); border-bottom: 1px solid var(--border-subtle); font-family: var(--font-display); font-size: 0.68rem; font-weight: 800; letter-spacing: 0.045em; text-transform: uppercase; white-space: nowrap; }
        .medical-chart-table-card .entries-table td { padding: 14px 16px; color: var(--text-secondary); border-bottom: 1px solid var(--border-subtle); white-space: nowrap; }
        .medical-chart-table-card .entries-table tbody tr:last-child td { border-bottom: none; }
        .medical-chart-table-card .entries-table tbody tr:nth-child(even) td { background: rgba(247,249,248,0.5); }
        [data-theme='dark'] .medical-chart-table-card .entries-table tbody tr:nth-child(even) td { background: rgba(255,255,255,0.025); }
        .medical-chart-table-card .entries-table tbody tr:hover td { background: rgba(31,73,48,0.045); }
        [data-theme='dark'] .medical-chart-table-card .entries-table tbody tr:hover td { background: rgba(255,255,255,0.05); }
        .medical-chart-table-card td strong { color: var(--text-primary); font-weight: 800; }
        .medical-selected-row td { background: rgba(197,155,39,0.08); }
        .medical-row-marker { display: block; color: var(--gold-dark); font-size: 0.64rem; font-weight: 700; margin-top: 2px; }
        [data-theme='dark'] .medical-row-marker { color: var(--gold-light); }
        .medical-chart-note { display: flex; align-items: flex-start; gap: 8px; padding: 14px 16px; border-radius: var(--radius-md); background: rgba(197,155,39,0.08); border: 1px solid rgba(197,155,39,0.25); color: var(--text-secondary); }
        .medical-chart-note svg { color: var(--gold-dark); flex-shrink: 0; margin-top: 2px; }
        [data-theme='dark'] .medical-chart-note svg { color: var(--gold-light); }
        .medical-chart-note p { font-size: 0.76rem; line-height: 1.5; }
        .medical-source-links { display: flex; flex-wrap: wrap; gap: 8px 14px; align-items: center; margin-top: 18px; color: var(--text-muted); font-size: 0.72rem; }
        .medical-source-links a { color: var(--army-primary); text-decoration: underline; text-underline-offset: 2px; }
        [data-theme='dark'] .medical-source-links a { color: var(--gold-light); }
        .medical-bottom-cta { margin-top: 30px; }
        .medical-page .detail-bottom-cta { display: flex; align-items: center; justify-content: space-between; background: rgba(244,247,245,0.86); border: 1.5px solid rgba(226,232,240,0.9); border-radius: var(--radius-md); padding: 24px; gap: 20px; }
        [data-theme='dark'] .medical-page .detail-bottom-cta { background: rgba(0,0,0,0.3); border-color: rgba(255,255,255,0.08); }
        .medical-page .detail-bottom-cta h3 { font-family: var(--font-display); font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin-bottom: 4px; }
        .medical-page .detail-bottom-cta p { font-size: 0.78rem; color: var(--text-secondary); }
        @media (max-width: 980px) { .medical-form-grid-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); } .medical-checklist-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 700px) { .medical-page .detail-hero-banner { min-height: 580px; padding: 48px 0 110px; } .medical-page .opp-detail-title { font-size: 2.2rem; } .medical-page .opp-detail-quick-meta { gap: 12px; padding: 12px 16px; } .medical-page .detail-tab-content-card { padding: 22px 16px; } .medical-form-grid-4, .medical-checklist-grid, .medical-reference-strip, .medical-chart-controls { grid-template-columns: 1fr; } .medical-pane-heading, .medical-form-actions, .medical-page .detail-bottom-cta { flex-direction: column; align-items: flex-start; } .medical-submit-btn { width: 100%; } .entries-table-card { overflow-x: auto; } .entries-table { min-width: 660px; } }
      `}</style>
    </div>
  );
};

export default QuickMedicalCheckPage;
