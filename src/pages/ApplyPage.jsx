import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  User,
  GraduationCap,
  Sliders,
  Upload,
  FileCheck,
  KeyRound,
  Award,
  Sparkles,
  Printer,
  ShieldAlert,
  Info,
  Calendar,
  MapPin,
  QrCode
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { OPPORTUNITIES } from '../data/mockData';
import { useApp } from '../context/AppContext';

const ApplyPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { submitApplication, addToast } = useApp();

  const entryParam = searchParams.get('entry') || 'officers-entry';
  const selectedOpp = OPPORTUNITIES.find((o) => o.id === entryParam) || OPPORTUNITIES[0];

  // Steps: 1: Personal, 2: Education, 3: Preferences, 4: Documents, 5: Review, 6: Mock OTP, 7: Success
  const [currentStep, setCurrentStep] = useState(1);

  // Form Data State
  const [formData, setFormData] = useState({
    personal: {
      fullName: 'Hardik Yash Raj',
      fatherName: 'Col. Rajesh Sharma (Retd)',
      motherName: 'Sunita Sharma',
      dob: '2001-08-14',
      gender: 'Male',
      maritalStatus: 'Unmarried',
      category: 'General',
      mockAadhaar: '9842-1192-3401',
      idMark1: 'Mole on right collar bone',
      idMark2: 'Small scar on left forearm',
      mobile: '9876543210',
      email: 'vikram.sharma@example.com',
      address: 'House No 42, Sector 14, Ambala Cantt, Haryana - 133001'
    },
    education: {
      matricBoard: 'CBSE (Central Board of Secondary Education)',
      matricRoll: 'CBSE/2017/884210',
      matricMarks: '91.4',
      twelfthBoard: 'CBSE (Science - PCM)',
      twelfthMarks: '88.6',
      degree: 'B.Tech in Mechanical Engineering',
      university: 'National Institute of Technology (NIT)',
      degreeMarks: '82.4',
      passingYear: '2025'
    },
    preferences: {
      firstChoiceArm: 'Infantry (Combat Arms)',
      secondChoiceArm: 'Armoured Corps',
      thirdChoiceArm: 'Corps of Engineers (CME)',
      firstChoiceCity: 'Ambala',
      secondChoiceCity: 'Chandigarh'
    },
    documents: {
      photoName: 'avatar.png',
      signatureName: 'signature_vikram.jpg',
      matricCertName: 'class_10th_marksheet.pdf',
      degreeCertName: 'btech_provisional_degree.pdf'
    },
    declarationAccepted: false
  });

  // Mock OTP generator
  const [mockOtp, setMockOtp] = useState('849201');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [submittedResult, setSubmittedResult] = useState(null);

  // Generate new mock OTP when entering step 6
  useEffect(() => {
    if (currentStep === 6) {
      const generated = Math.floor(100000 + Math.random() * 900000).toString();
      setMockOtp(generated);
    }
  }, [currentStep]);

  // Trigger confetti on success
  useEffect(() => {
    if (currentStep === 7) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [currentStep]);

  const handlePersonalChange = (field, val) => {
    setFormData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: val }
    }));
  };

  const handleEducationChange = (field, val) => {
    setFormData((prev) => ({
      ...prev,
      education: { ...prev.education, [field]: val }
    }));
  };

  const handlePreferenceChange = (field, val) => {
    setFormData((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, [field]: val }
    }));
  };

  const handleNext = () => {
    if (currentStep === 5 && !formData.declarationAccepted) {
      addToast('Please accept the mandatory self-declaration to proceed.', 'error');
      return;
    }
    setCurrentStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (enteredOtp.trim() !== mockOtp) {
      addToast('Invalid OTP entered. Please use the simulated demo OTP shown on screen.', 'error');
      return;
    }

    const applicationRecord = submitApplication({
      opportunity: selectedOpp,
      personal: formData.personal,
      education: formData.education,
      preferences: formData.preferences,
      documents: formData.documents
    });

    setSubmittedResult(applicationRecord);
    setCurrentStep(7);
    addToast('Application submitted and verified successfully!', 'success');
  };

  const stepsList = [
    { num: 1, label: 'Personal Details' },
    { num: 2, label: 'Education' },
    { num: 3, label: 'Preferences' },
    { num: 4, label: 'Documents' },
    { num: 5, label: 'Review' },
    { num: 6, label: 'OTP Verification' },
    { num: 7, label: 'Acknowledgement' }
  ];

  return (
    <div className="apply-page" id="main-content">
      {/* Background Liquid Glass Tricolor Canvas */}
      <div className="apply-bg-wrapper" aria-hidden="true">
        <img src="/assets/tricolor-glass-light.jpg" alt="" className="apply-bg-img light-img" />
        <img src="/assets/tricolor-glass-dark.jpg" alt="" className="apply-bg-img dark-img" />
        <div className="apply-bg-overlay" />
      </div>

      <div className="apply-content-relative">
        {/* Top Banner */}
        <div className="apply-hero-banner">
          <div className="container">
            <span className="section-tag" style={{ color: 'var(--gold-light)' }}>
              ONLINE APPLICATION PORTAL 2026
            </span>
            <h1 className="apply-hero-title">
              Enrolment Application: {selectedOpp.title}
            </h1>
            <p className="apply-hero-sub">
              Fill in the multi-stage candidate form. Please ensure all demographic and educational details mirror your official matriculation certificate.
            </p>
          </div>
        </div>

        <div className="container apply-main-container">
        {/* Synthetic Demo Notice */}
        <div className="synthetic-data-warning">
          <Info size={18} className="warning-icon" />
          <span>
            <strong>PROTOTYPE DEMO MODE:</strong> All fields are pre-populated with synthetic demonstration data. No real personal identities, banking, or payments are processed.
          </span>
        </div>

        {/* Multi-step Header */}
        <div className="apply-steps-tracker" role="navigation" aria-label="Application Stages">
          {stepsList.map((s) => (
            <div
              key={s.num}
              className={`step-item ${currentStep === s.num ? 'active' : ''} ${currentStep > s.num ? 'completed' : ''}`}
            >
              <div className="step-num-circle">
                {currentStep > s.num ? <CheckCircle2 size={16} /> : s.num}
              </div>
              <span className="step-name">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Card Form Container */}
        <div className="apply-form-card">
          {/* STEP 1: PERSONAL DETAILS */}
          {currentStep === 1 && (
            <div className="form-step-pane animate-fade-in">
              <h2 className="step-title">Stage 1: Personal & Demographic Details</h2>
              <p className="step-sub">Enter details exactly as printed in your Class 10th / Matriculation Certificate.</p>

              <div className="form-grid-3">
                <div className="form-field">
                  <label>Full Name (Candidate)</label>
                  <input
                    type="text"
                    required
                    value={formData.personal.fullName}
                    onChange={(e) => handlePersonalChange('fullName', e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>Father's / Guardian's Name</label>
                  <input
                    type="text"
                    required
                    value={formData.personal.fatherName}
                    onChange={(e) => handlePersonalChange('fatherName', e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>Mother's Name</label>
                  <input
                    type="text"
                    required
                    value={formData.personal.motherName}
                    onChange={(e) => handlePersonalChange('motherName', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-grid-3" style={{ marginTop: '16px' }}>
                <div className="form-field">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    required
                    value={formData.personal.dob}
                    onChange={(e) => handlePersonalChange('dob', e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>Gender</label>
                  <select
                    value={formData.personal.gender}
                    onChange={(e) => handlePersonalChange('gender', e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>Social Category</label>
                  <select
                    value={formData.personal.category}
                    onChange={(e) => handlePersonalChange('category', e.target.value)}
                  >
                    <option value="General">General / Unreserved</option>
                    <option value="OBC">OBC (Non-Creamy Layer)</option>
                    <option value="SC">Scheduled Caste (SC)</option>
                    <option value="ST">Scheduled Tribe (ST)</option>
                    <option value="EWS">Economically Weaker Section (EWS)</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-2" style={{ marginTop: '16px' }}>
                <div className="form-field">
                  <label>Mock Aadhaar Number (Synthetic 12 Digits)</label>
                  <input
                    type="text"
                    value={formData.personal.mockAadhaar}
                    onChange={(e) => handlePersonalChange('mockAadhaar', e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>Mobile Number (For SMS Alerts)</label>
                  <input
                    type="tel"
                    value={formData.personal.mobile}
                    onChange={(e) => handlePersonalChange('mobile', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-grid-2" style={{ marginTop: '16px' }}>
                <div className="form-field">
                  <label>Visible Identification Mark 1</label>
                  <input
                    type="text"
                    value={formData.personal.idMark1}
                    onChange={(e) => handlePersonalChange('idMark1', e.target.value)}
                    placeholder="e.g. Mole on right side of neck"
                  />
                </div>
                <div className="form-field">
                  <label>Visible Identification Mark 2</label>
                  <input
                    type="text"
                    value={formData.personal.idMark2}
                    onChange={(e) => handlePersonalChange('idMark2', e.target.value)}
                    placeholder="e.g. Scar on left knee"
                  />
                </div>
              </div>

              <div className="form-field" style={{ marginTop: '16px' }}>
                <label>Permanent Residential Address</label>
                <textarea
                  rows="2"
                  value={formData.personal.address}
                  onChange={(e) => handlePersonalChange('address', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* STEP 2: EDUCATION */}
          {currentStep === 2 && (
            <div className="form-step-pane animate-fade-in">
              <h2 className="step-title">Stage 2: Educational Qualifications</h2>
              <p className="step-sub">Enter your educational records for verification against cut-off thresholds.</p>

              <h3 className="section-sub-heading">Class 10th / Matriculation Details:</h3>
              <div className="form-grid-3">
                <div className="form-field">
                  <label>Education Board</label>
                  <input
                    type="text"
                    value={formData.education.matricBoard}
                    onChange={(e) => handleEducationChange('matricBoard', e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>10th Roll Number</label>
                  <input
                    type="text"
                    value={formData.education.matricRoll}
                    onChange={(e) => handleEducationChange('matricRoll', e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>Aggregate Percentage / CGPA</label>
                  <input
                    type="text"
                    value={formData.education.matricMarks}
                    onChange={(e) => handleEducationChange('matricMarks', e.target.value)}
                  />
                </div>
              </div>

              <h3 className="section-sub-heading" style={{ marginTop: '24px' }}>Class 12th / Intermediate Details:</h3>
              <div className="form-grid-2">
                <div className="form-field">
                  <label>Stream & Board</label>
                  <input
                    type="text"
                    value={formData.education.twelfthBoard}
                    onChange={(e) => handleEducationChange('twelfthBoard', e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>Aggregate 12th Percentage (%)</label>
                  <input
                    type="text"
                    value={formData.education.twelfthMarks}
                    onChange={(e) => handleEducationChange('twelfthMarks', e.target.value)}
                  />
                </div>
              </div>

              <h3 className="section-sub-heading" style={{ marginTop: '24px' }}>Higher Qualification / Degree Details:</h3>
              <div className="form-grid-3">
                <div className="form-field">
                  <label>Graduation Degree / Course</label>
                  <input
                    type="text"
                    value={formData.education.degree}
                    onChange={(e) => handleEducationChange('degree', e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>University / College Institute</label>
                  <input
                    type="text"
                    value={formData.education.university}
                    onChange={(e) => handleEducationChange('university', e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>Graduation Aggregate (% or CGPA)</label>
                  <input
                    type="text"
                    value={formData.education.degreeMarks}
                    onChange={(e) => handleEducationChange('degreeMarks', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PREFERENCES */}
          {currentStep === 3 && (
            <div className="form-step-pane animate-fade-in">
              <h2 className="step-title">Stage 3: Corps & Examination City Preferences</h2>
              <p className="step-sub">Select your regiment/corps priority and choice of online CEE test centers.</p>

              <h3 className="section-sub-heading">Regiment / Corps Order of Preference:</h3>
              <div className="form-grid-3">
                <div className="form-field">
                  <label>1st Preference</label>
                  <select
                    value={formData.preferences.firstChoiceArm}
                    onChange={(e) => handlePreferenceChange('firstChoiceArm', e.target.value)}
                  >
                    <option value="Infantry (Combat Arms)">Infantry (Combat Arms)</option>
                    <option value="Armoured Corps">Armoured Corps (Tanks)</option>
                    <option value="Artillery Regiments">Artillery Regiments (Guns/Missiles)</option>
                    <option value="Corps of Engineers (CME)">Corps of Engineers (Combat Engineers)</option>
                    <option value="Corps of Signals">Corps of Signals (Cyber & Comms)</option>
                    <option value="Army Aviation Corps">Army Aviation Corps</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>2nd Preference</label>
                  <select
                    value={formData.preferences.secondChoiceArm}
                    onChange={(e) => handlePreferenceChange('secondChoiceArm', e.target.value)}
                  >
                    <option value="Armoured Corps">Armoured Corps</option>
                    <option value="Infantry (Combat Arms)">Infantry (Combat Arms)</option>
                    <option value="Artillery Regiments">Artillery Regiments</option>
                    <option value="Corps of Engineers (CME)">Corps of Engineers (CME)</option>
                    <option value="Corps of Signals">Corps of Signals</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>3rd Preference</label>
                  <select
                    value={formData.preferences.thirdChoiceArm}
                    onChange={(e) => handlePreferenceChange('thirdChoiceArm', e.target.value)}
                  >
                    <option value="Corps of Engineers (CME)">Corps of Engineers (CME)</option>
                    <option value="Corps of Signals">Corps of Signals</option>
                    <option value="Army Service Corps (ASC)">Army Service Corps (ASC)</option>
                    <option value="Army Ordnance Corps (AOC)">Army Ordnance Corps (AOC)</option>
                  </select>
                </div>
              </div>

              <h3 className="section-sub-heading" style={{ marginTop: '24px' }}>Choice of Examination Cities (CEE):</h3>
              <div className="form-grid-2">
                <div className="form-field">
                  <label>1st Choice Exam City</label>
                  <select
                    value={formData.preferences.firstChoiceCity}
                    onChange={(e) => handlePreferenceChange('firstChoiceCity', e.target.value)}
                  >
                    {['Ambala', 'Chandigarh', 'Delhi NCR', 'Dehradun', 'Jaipur', 'Lucknow', 'Patna', 'Pune', 'Bangalore', 'Kolkata', 'Bhopal'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label>2nd Choice Exam City</label>
                  <select
                    value={formData.preferences.secondChoiceCity}
                    onChange={(e) => handlePreferenceChange('secondChoiceCity', e.target.value)}
                  >
                    {['Chandigarh', 'Ambala', 'Delhi NCR', 'Dehradun', 'Jaipur', 'Lucknow', 'Patna', 'Pune', 'Bangalore', 'Kolkata', 'Bhopal'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: DOCUMENTS UPLOAD */}
          {currentStep === 4 && (
            <div className="form-step-pane animate-fade-in">
              <h2 className="step-title">Stage 4: Document Verification & Uploads</h2>
              <p className="step-sub">Upload digital scanned copies of required documents in prescribed formats.</p>

              <div className="documents-upload-grid">
                <div className="doc-upload-box">
                  <div className="doc-photo-preview-wrap">
                    <img
                      src="/avatar.png"
                      alt="Candidate Passport Photo"
                      className="doc-uploaded-thumb"
                    />
                  </div>
                  <h4>Recent Passport Photograph</h4>
                  <span className="doc-format">JPG/PNG format (20 KB - 50 KB)</span>
                  <div className="doc-preview-chip">
                    <CheckCircle2 size={14} className="chip-chk" />
                    <span>avatar.png (Uploaded)</span>
                  </div>
                </div>

                <div className="doc-upload-box">
                  <Upload size={24} className="upload-icon" />
                  <h4>Candidate Signature</h4>
                  <span className="doc-format">JPG/JPEG format (10 KB - 20 KB)</span>
                  <div className="doc-preview-chip">
                    <CheckCircle2 size={14} className="chip-chk" />
                    <span>{formData.documents.signatureName}</span>
                  </div>
                </div>

                <div className="doc-upload-box">
                  <Upload size={24} className="upload-icon" />
                  <h4>Class 10th / Matric Certificate</h4>
                  <span className="doc-format">PDF format (100 KB - 200 KB)</span>
                  <div className="doc-preview-chip">
                    <CheckCircle2 size={14} className="chip-chk" />
                    <span>{formData.documents.matricCertName}</span>
                  </div>
                </div>

                <div className="doc-upload-box">
                  <Upload size={24} className="upload-icon" />
                  <h4>Graduation / 12th Certificate</h4>
                  <span className="doc-format">PDF format (100 KB - 200 KB)</span>
                  <div className="doc-preview-chip">
                    <CheckCircle2 size={14} className="chip-chk" />
                    <span>{formData.documents.degreeCertName}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW & DECLARATION */}
          {currentStep === 5 && (
            <div className="form-step-pane animate-fade-in">
              <h2 className="step-title">Stage 5: Review Application Summary</h2>
              <p className="step-sub">Please review all submitted information carefully before generating OTP.</p>

              <div className="review-summary-card">
                <div className="review-section">
                  <h4>1. Personal & Identity</h4>
                  <div className="review-table-grid">
                    <div><span>Candidate Name:</span> <strong>{formData.personal.fullName}</strong></div>
                    <div><span>Father's Name:</span> <strong>{formData.personal.fatherName}</strong></div>
                    <div><span>Date of Birth:</span> <strong>{formData.personal.dob}</strong></div>
                    <div><span>Gender / Category:</span> <strong>{formData.personal.gender} ({formData.personal.category})</strong></div>
                    <div><span>Mobile / Email:</span> <strong>{formData.personal.mobile} | {formData.personal.email}</strong></div>
                    <div><span>Identification Mark:</span> <strong>{formData.personal.idMark1}</strong></div>
                  </div>
                </div>

                <div className="review-section">
                  <h4>2. Education & Qualification</h4>
                  <div className="review-table-grid">
                    <div><span>10th Board & Marks:</span> <strong>{formData.education.matricBoard} ({formData.education.matricMarks}%)</strong></div>
                    <div><span>12th Stream & Marks:</span> <strong>{formData.education.twelfthBoard} ({formData.education.twelfthMarks}%)</strong></div>
                    <div><span>Degree & University:</span> <strong>{formData.education.degree} ({formData.education.degreeMarks}%)</strong></div>
                  </div>
                </div>

                <div className="review-section">
                  <h4>3. Service & Examination Preferences</h4>
                  <div className="review-table-grid">
                    <div><span>Corps Choices:</span> <strong>1) {formData.preferences.firstChoiceArm} | 2) {formData.preferences.secondChoiceArm}</strong></div>
                    <div><span>Test Centers:</span> <strong>1) {formData.preferences.firstChoiceCity} | 2) {formData.preferences.secondChoiceCity}</strong></div>
                  </div>
                </div>
              </div>

              {/* Self Declaration Box */}
              <div className="declaration-box">
                <label className="declaration-checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.declarationAccepted}
                    onChange={(e) => setFormData({ ...formData, declarationAccepted: e.target.checked })}
                  />
                  <span>
                    <strong>I solemnly declare that:</strong> All particulars stated in this application are true and correct to the best of my knowledge. I understand that any false statement or suppression of material facts will lead to immediate cancellation of candidature and legal action under the Army Act.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 6: MOCK OTP VERIFICATION */}
          {currentStep === 6 && (
            <div className="form-step-pane animate-fade-in">
              <div className="otp-verification-container">
                <div className="otp-icon-wrap">
                  <KeyRound size={32} />
                </div>
                <h2 className="step-title">Stage 6: Candidate OTP Verification</h2>
                <p className="step-sub">
                  A 6-digit verification code has been sent to your registered mobile (<strong>******{formData.personal.mobile.slice(-4)}</strong>).
                </p>

                {/* Simulated OTP Banner */}
                <div className="simulated-otp-banner">
                  <span className="otp-sim-label">⚡ Simulated Demo OTP Generated:</span>
                  <span className="otp-code-highlight">{mockOtp}</span>
                  <button
                    type="button"
                    className="auto-fill-otp-btn"
                    onClick={() => {
                      setEnteredOtp(mockOtp);
                      addToast('Simulated OTP auto-filled!', 'info');
                    }}
                  >
                    Click to Autofill OTP
                  </button>
                </div>

                <form onSubmit={handleVerifyOtp} className="otp-input-form">
                  <div className="form-field">
                    <label htmlFor="otp-input">Enter 6-Digit OTP</label>
                    <input
                      id="otp-input"
                      type="text"
                      maxLength={6}
                      required
                      placeholder="• • • • • •"
                      className="large-otp-field"
                      value={enteredOtp}
                      onChange={(e) => setEnteredOtp(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn btn-gold btn-lg submit-app-btn">
                    <span>Verify & Submit Application</span>
                    <ArrowRight size={18} />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* STEP 7: SUCCESS ACKNOWLEDGEMENT */}
          {currentStep === 7 && submittedResult && (
            <div className="form-step-pane success-pane animate-fade-in">
              <div className="success-badge-icon">
                <CheckCircle2 size={56} />
              </div>
              <h2 className="success-heading">Application Submitted Successfully!</h2>
              <p className="success-sub">
                Your application for <strong>{selectedOpp.title}</strong> has been registered with the Directorate General of Recruiting.
              </p>

              {/* Official Acknowledgement Slip Card */}
              <div className="acknowledgement-slip-card print-area">
                <div className="slip-header">
                  <img src="/Logo.png" alt="Indian Army Crest" width="48" height="48" />
                  <div>
                    <h3>INDIAN ARMY RECRUITMENT ACKNOWLEDGEMENT 2026</h3>
                    <span>GOVERNMENT OF INDIA - MINISTRY OF DEFENCE</span>
                  </div>
                </div>

                <div className="slip-content-body-flex">
                  <div className="slip-meta-grid">
                    <div className="meta-box">
                      <span className="meta-k">Application ID:</span>
                      <strong className="meta-v highlight">{submittedResult.id}</strong>
                    </div>
                    <div className="meta-box">
                      <span className="meta-k">Assigned Roll No:</span>
                      <strong className="meta-v">{submittedResult.rollNumber}</strong>
                    </div>
                    <div className="meta-box">
                      <span className="meta-k">Candidate Name:</span>
                      <strong className="meta-v">{formData.personal.fullName}</strong>
                    </div>
                    <div className="meta-box">
                      <span className="meta-k">Date of Submission:</span>
                      <strong className="meta-v">{submittedResult.appliedDate}</strong>
                    </div>
                    <div className="meta-box">
                      <span className="meta-k">Allotted Exam Center:</span>
                      <strong className="meta-v">{formData.preferences.firstChoiceCity} Cantt</strong>
                    </div>
                    <div className="meta-box">
                      <span className="meta-k">Current Status:</span>
                      <strong className="meta-v status-ok">{submittedResult.currentStatus}</strong>
                    </div>
                  </div>

                  <div className="slip-photo-frame">
                    <img
                      src="/avatar.png"
                      alt="Verified Candidate"
                      className="slip-photo-img"
                    />
                    <span className="slip-photo-caption">Biometric Photo</span>
                  </div>
                </div>

                <div className="slip-qr-bar">
                  <div className="qr-box">
                    <QrCode size={48} />
                    <span className="qr-text">DigiLocker Verified Digital Token</span>
                  </div>
                  <div className="slip-warning-text">
                    Note: Retain this Application Number for tracking status and downloading Admit Card for the Online Common Entrance Exam (CEE).
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="success-actions-row no-print">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => window.print()}
                >
                  <Printer size={16} />
                  <span>Print Acknowledgement</span>
                </button>

                <Link to="/dashboard" className="btn btn-primary">
                  <span>Go to Candidate Dashboard</span>
                  <ArrowRight size={16} />
                </Link>

                <Link to={`/track?id=${submittedResult.id}`} className="btn btn-gold btn-sm">
                  <span>Track Application</span>
                </Link>
              </div>
            </div>
          )}

          {/* Form Bottom Step Navigation Controls */}
          {currentStep < 6 && (
            <div className="apply-bottom-nav">
              {currentStep > 1 && (
                <button type="button" className="btn btn-outline" onClick={handleBack}>
                  <ArrowLeft size={16} />
                  <span>Previous</span>
                </button>
              )}

              <button
                type="button"
                className="btn btn-primary next-step-btn"
                onClick={handleNext}
              >
                <span>{currentStep === 5 ? 'Proceed to OTP Verification' : 'Save & Continue'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
        </div>
      </div>{/* end apply-content-relative */}

      <style>{`
        .apply-page {
          background-color: var(--bg-app);
          min-height: 100vh;
          padding-bottom: 80px;
          position: relative;
          overflow: hidden;
        }

        .apply-bg-wrapper {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .apply-bg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transition: opacity 0.3s ease;
        }
        .apply-bg-img.light-img { opacity: 0.75; display: block; }
        .apply-bg-img.dark-img  { opacity: 0; display: none; }
        [data-theme='dark'] .apply-bg-img.light-img { opacity: 0; display: none; }
        [data-theme='dark'] .apply-bg-img.dark-img  { opacity: 0.85; display: block; }
        .apply-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(244,246,248,0.45) 0%, rgba(255,255,255,0.3) 35%, rgba(244,246,248,0.6) 100%);
        }
        [data-theme='dark'] .apply-bg-overlay {
          background: linear-gradient(180deg, rgba(11,23,16,0.6) 0%, rgba(18,36,25,0.45) 35%, rgba(11,23,16,0.75) 100%);
        }
        .apply-content-relative {
          position: relative;
          z-index: 1;
        }

        .apply-hero-banner {
          background: linear-gradient(135deg, #0e1a11 0%, #172c1c 100%);
          color: #ffffff;
          padding: 44px 0 52px;
          border-bottom: 1px solid var(--border-dark);
        }

        .apply-hero-title {
          font-family: var(--font-display);
          font-size: 2.25rem;
          font-weight: 900;
          color: #ffffff;
          margin: 6px 0 8px;
        }

        .apply-hero-sub {
          font-size: 1rem;
          color: #cbd5e1;
          max-width: 720px;
        }

        .apply-main-container {
          margin-top: -24px;
          max-width: 960px;
        }

        .synthetic-data-warning {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(14px) saturate(180%);
          -webkit-backdrop-filter: blur(14px) saturate(180%);
          border: 1px solid rgba(217, 119, 6, 0.25);
          color: #92400e;
          padding: 12px 20px;
          border-radius: var(--radius-md);
          font-size: 0.8125rem;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          box-shadow: 0 4px 16px rgba(217, 119, 6, 0.06), inset 0 1px 1px rgba(255, 255, 255, 0.8);
        }

        [data-theme='dark'] .synthetic-data-warning {
          background: rgba(20, 32, 24, 0.65);
          border-color: rgba(245, 158, 11, 0.35);
          color: #fde68a;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.05);
        }

        .warning-icon {
          flex-shrink: 0;
          color: #d97706;
        }

        [data-theme='dark'] .warning-icon {
          color: #fbbf24;
        }

        /* Tracker */
        .apply-steps-tracker {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          border-radius: var(--radius-md);
          padding: 14px 20px;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border-subtle);
          margin-bottom: 24px;
          overflow-x: auto;
        }

        [data-theme='dark'] .apply-steps-tracker {
          background: var(--army-dark);
          border-color: var(--border-medium);
        }

        .step-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78125rem;
          font-weight: 700;
          color: var(--text-muted);
          white-space: nowrap;
        }

        .step-item.active {
          color: var(--army-primary);
        }

        [data-theme='dark'] .step-item.active {
          color: var(--gold-light);
        }

        .step-item.completed {
          color: #16a34a;
        }

        .step-num-circle {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: var(--bg-surface-subtle);
          border: 1.5px solid var(--border-medium);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
        }

        .step-item.active .step-num-circle {
          background: var(--army-primary);
          color: #ffffff;
          border-color: var(--army-primary);
        }

        [data-theme='dark'] .step-item.active .step-num-circle {
          background: var(--gold-primary);
          color: #0d1a0f;
          border-color: var(--gold-primary);
        }

        .step-item.completed .step-num-circle {
          background: #dcfce7;
          color: #16a34a;
          border-color: #16a34a;
        }

        /* Form Card */
        .apply-form-card {
          background: #ffffff;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-lg);
          padding: 36px;
        }

        [data-theme='dark'] .apply-form-card {
          background: var(--army-darkest);
          border-color: var(--border-medium);
        }

        .step-title {
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .step-sub {
          font-size: 0.84375rem;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .section-sub-heading {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 800;
          color: var(--army-primary);
          margin-bottom: 12px;
        }

        [data-theme='dark'] .section-sub-heading {
          color: var(--gold-light);
        }

        .form-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .form-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-field label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .form-field input,
        .form-field select,
        .form-field textarea {
          width: 100%;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-medium);
          background: var(--bg-surface);
          color: var(--text-primary);
          font-size: 0.875rem;
          outline: none;
        }

        .form-field input:focus,
        .form-field select:focus,
        .form-field textarea:focus {
          border-color: var(--army-primary);
          box-shadow: 0 0 0 3px rgba(27, 48, 34, 0.1);
        }

        /* Documents Upload Grid */
        .documents-upload-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .doc-upload-box {
          background: var(--bg-surface-subtle);
          border: 1.5px dashed var(--border-medium);
          border-radius: var(--radius-md);
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 6px;
        }

        .upload-icon {
          color: var(--army-primary);
          margin-bottom: 6px;
        }

        [data-theme='dark'] .upload-icon {
          color: var(--gold-light);
        }

        .doc-upload-box h4 {
          font-family: var(--font-display);
          font-size: 0.9375rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .doc-format {
          font-size: 0.71875rem;
          color: var(--text-muted);
          margin-bottom: 10px;
        }

        .doc-preview-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #dcfce7;
          border: 1px solid #86efac;
          color: #15803d;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: var(--radius-full);
        }

        /* Review Card */
        .review-summary-card {
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-bottom: 24px;
        }

        .review-section h4 {
          font-family: var(--font-display);
          font-size: 0.875rem;
          font-weight: 800;
          color: var(--army-primary);
          margin-bottom: 8px;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 4px;
        }

        [data-theme='dark'] .review-section h4 {
          color: var(--gold-light);
        }

        .review-table-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px 16px;
          font-size: 0.8125rem;
        }

        .review-table-grid span {
          color: var(--text-muted);
          margin-right: 6px;
        }

        .review-table-grid strong {
          color: var(--text-primary);
        }

        .declaration-box {
          background: rgba(197, 155, 39, 0.08);
          border: 1px solid rgba(197, 155, 39, 0.3);
          border-radius: var(--radius-sm);
          padding: 16px;
        }

        .declaration-checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.5;
          cursor: pointer;
        }

        .declaration-checkbox-label input {
          margin-top: 3px;
          accent-color: var(--army-primary);
        }

        /* OTP Pane */
        .otp-verification-container {
          max-width: 480px;
          margin: 0 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .otp-icon-wrap {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(27, 48, 34, 0.1);
          color: var(--army-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        [data-theme='dark'] .otp-icon-wrap {
          background: rgba(197, 155, 39, 0.15);
          color: var(--gold-light);
        }

        .simulated-otp-banner {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: var(--radius-md);
          padding: 14px;
          margin: 16px 0 24px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .otp-sim-label {
          font-size: 0.75rem;
          color: #166534;
          font-weight: 700;
        }

        .otp-code-highlight {
          font-family: var(--font-mono);
          font-size: 1.875rem;
          font-weight: 900;
          color: #15803d;
          letter-spacing: 0.25em;
        }

        .auto-fill-otp-btn {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--army-primary);
          text-decoration: underline;
        }

        .otp-input-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .large-otp-field {
          text-align: center;
          font-family: var(--font-mono);
          font-size: 1.5rem !important;
          letter-spacing: 0.3em;
          padding: 12px !important;
        }

        .submit-app-btn {
          width: 100%;
        }

        /* Success Acknowledgement Slip */
        .success-pane {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .success-badge-icon {
          color: #16a34a;
          margin-bottom: 12px;
        }

        .success-heading {
          font-family: var(--font-display);
          font-size: 1.875rem;
          font-weight: 900;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .success-sub {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          margin-bottom: 28px;
        }

        .acknowledgement-slip-card {
          background: #ffffff;
          border: 2px solid var(--army-primary);
          border-radius: var(--radius-md);
          padding: 28px;
          width: 100%;
          max-width: 680px;
          text-align: left;
          box-shadow: var(--shadow-md);
          margin-bottom: 28px;
        }

        [data-theme='dark'] .acknowledgement-slip-card {
          background: var(--army-dark);
          border-color: var(--gold-primary);
        }

        .slip-header {
          display: flex;
          align-items: center;
          gap: 16px;
          border-bottom: 2px solid var(--border-subtle);
          padding-bottom: 14px;
          margin-bottom: 18px;
        }

        .slip-header h3 {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 900;
          color: var(--army-primary);
        }

        [data-theme='dark'] .slip-header h3 {
          color: #ffffff;
        }

        .slip-header span {
          font-size: 0.6875rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.06em;
        }

        .slip-content-body-flex {
          display: grid;
          grid-template-columns: 1fr 140px;
          gap: 20px;
          margin-bottom: 20px;
        }

        .slip-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .slip-photo-frame {
          border: 1.5px solid var(--border-medium);
          background: var(--bg-surface-subtle);
          border-radius: var(--radius-xs);
          padding: 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }

        .slip-photo-img {
          width: 90px;
          height: 105px;
          object-fit: cover;
          border-radius: 2px;
          border: 1px solid var(--border-medium);
        }

        .slip-photo-caption {
          font-size: 0.625rem;
          color: var(--text-muted);
          font-weight: 700;
          text-transform: uppercase;
        }

        .doc-photo-preview-wrap {
          margin-bottom: 8px;
        }

        .doc-uploaded-thumb {
          width: 60px;
          height: 70px;
          object-fit: cover;
          border-radius: var(--radius-xs);
          border: 2px solid var(--army-primary);
        }

        .meta-box {
          display: flex;
          flex-direction: column;
        }

        .meta-k {
          font-size: 0.6875rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
        }

        .meta-v {
          font-size: 0.9375rem;
          color: var(--text-primary);
        }

        .meta-v.highlight {
          color: var(--army-primary);
          font-family: var(--font-mono);
          font-size: 1.125rem;
        }

        [data-theme='dark'] .meta-v.highlight {
          color: var(--gold-light);
        }

        .meta-v.status-ok {
          color: #16a34a;
          font-weight: 700;
        }

        .slip-qr-bar {
          border-top: 1px solid var(--border-subtle);
          padding-top: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .qr-box {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .qr-text {
          font-size: 0.71875rem;
          color: var(--text-muted);
          max-width: 140px;
          line-height: 1.3;
        }

        .slip-warning-text {
          font-size: 0.75rem;
          color: var(--text-secondary);
          max-width: 320px;
          line-height: 1.4;
        }

        .success-actions-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .apply-bottom-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 32px;
          padding-top: 20px;
          border-top: 1px solid var(--border-subtle);
        }

        .next-step-btn {
          margin-left: auto;
        }

        @media (max-width: 768px) {
          .form-grid-3,
          .form-grid-2,
          .documents-upload-grid,
          .review-table-grid,
          .slip-meta-grid {
            grid-template-columns: 1fr;
          }
          .apply-steps-tracker {
            justify-content: flex-start;
          }
          .step-name {
            display: none;
          }
          .slip-qr-bar {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default ApplyPage;
