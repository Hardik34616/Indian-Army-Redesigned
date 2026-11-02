import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  FileText,
  Calendar,
  Award,
  BookOpen,
  ArrowRight,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  Check,
  X,
  Printer,
  QrCode,
  MapPin,
  PenSquare,
  Search,
  User,
  Phone,
  Mail,
  Home,
  GraduationCap,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_SSB_HISTORY } from '../data/mockData';

const DashboardPage = () => {
  const { user, updateUser, applications, addToast } = useApp();
  const navigate = useNavigate();

  // Helper date formatters
  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return '06 Oct 2001';
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const parts = dateStr.split('-');
      const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      }
    }
    return dateStr;
  };

  const formatIsoDate = (dateStr) => {
    if (!dateStr) return '2001-10-06';
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    const parsed = Date.parse(dateStr);
    if (!isNaN(parsed)) {
      const d = new Date(parsed);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    }
    return '2001-10-06';
  };

  // Modals state
  const [selectedAppForTracker, setSelectedAppForTracker] = useState(null);
  const [selectedAppForAdmit, setSelectedAppForAdmit] = useState(null);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [trackWithIdModal, setTrackWithIdModal] = useState(false);
  const [trackSearchId, setTrackSearchId] = useState('');
  const [mockExamModal, setMockExamModal] = useState(null);
  const [showFullProfileDetails, setShowFullProfileDetails] = useState(false);
  const [selectedSsbForDossier, setSelectedSsbForDossier] = useState(null);

  // Profile Edit Form State
  const [profileForm, setProfileForm] = useState({
    name: user.name || 'Hardik Yash Raj',
    email: user.email || 'vikram.sharma@example.com',
    mobile: user.mobile || '9876543210',
    dob: user.dob || '2001-10-06',
    dobFormatted: user.dobFormatted || '06 Oct 2001',
    gender: user.gender || 'Male',
    category: user.category || 'General / Unreserved',
    fatherName: user.fatherName || 'Shri Yash Raj',
    motherName: user.motherName || 'Smt. Sunita Devi',
    address: user.address || '14, Rajputana Enclave, Vaishali Nagar, Jaipur, Rajasthan - 302021',
    rollNumber: user.rollNumber || 'TGC141/2026/88921',
    education10th: user.education10th || 'CBSE Board • 88.4% (2017)',
    education12th: user.education12th || 'CBSE Board PCM • 84.6% (2019)',
    degree: user.degree || 'B.Tech Mechanical Engineering • 82.4% CGPA (2023)',
    nccCert: user.nccCert || 'NCC \'C\' Certificate (Alpha Grade)'
  });

  const openEditModal = () => {
    setProfileForm({
      name: user.name || 'Hardik Yash Raj',
      email: user.email || 'vikram.sharma@example.com',
      mobile: user.mobile || '9876543210',
      dob: user.dob || '2001-10-06',
      dobFormatted: user.dobFormatted || formatDisplayDate(user.dob || '2001-10-06'),
      gender: user.gender || 'Male',
      category: user.category || 'General / Unreserved',
      fatherName: user.fatherName || 'Shri Yash Raj',
      motherName: user.motherName || 'Smt. Sunita Devi',
      address: user.address || '14, Rajputana Enclave, Vaishali Nagar, Jaipur, Rajasthan - 302021',
      rollNumber: user.rollNumber || 'TGC141/2026/88921',
      education10th: user.education10th || 'CBSE Board • 88.4% (2017)',
      education12th: user.education12th || 'CBSE Board PCM • 84.6% (2019)',
      degree: user.degree || 'B.Tech Mechanical Engineering • 82.4% CGPA (2023)',
      nccCert: user.nccCert || 'NCC \'C\' Certificate (Alpha Grade)'
    });
    setEditProfileModal(true);
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    if (!profileForm.mobile || profileForm.mobile.length !== 10) {
      addToast('Please enter a valid 10-digit mobile number.', 'warning');
      return;
    }
    const formattedDob = profileForm.dobFormatted || formatDisplayDate(profileForm.dob);
    const updatedData = {
      ...profileForm,
      dobFormatted: formattedDob
    };
    if (typeof updateUser === 'function') {
      updateUser(updatedData);
    }
    setEditProfileModal(false);
    addToast('Candidate details updated and synchronized with DigiLocker!', 'success');
  };

  const handleTrackWithIdSubmit = (e) => {
    e.preventDefault();
    const query = trackSearchId.trim().toUpperCase();
    const found = applications.find(
      (app) => app.id.toUpperCase() === query || (app.rollNumber && app.rollNumber.toUpperCase().includes(query))
    );
    if (found) {
      setTrackWithIdModal(false);
      setSelectedAppForTracker(found);
      setTrackSearchId('');
    } else {
      addToast(`No application record found for ID: ${trackSearchId}`, 'error');
    }
  };

  const handleStartExam = (examTitle) => {
    setMockExamModal({ title: examTitle });
    setCurrentQuestionIdx(0);
    setSelectedAnswer(null);
    setExamSubmitted(false);
  };

  return (
    <div className="official-dashboard-page" id="main-content">
      {/* Background Liquid Glass Tricolor Canvas */}
      <div className="dashboard-bg-wrapper" aria-hidden="true">
        <img
          src="/assets/tricolor-glass-light.jpg"
          alt=""
          className="dashboard-bg-img light-img"
        />
        <img
          src="/assets/tricolor-glass-dark.jpg"
          alt=""
          className="dashboard-bg-img dark-img"
        />
        <div className="dashboard-bg-overlay" />
      </div>

      <div className="dashboard-content-relative">
        {/* =========================================================================
            TOP HERO: OFFICIAL CANDIDATE PORTAL BANNER
            ========================================================================= */}
        <section className="cand-hero-banner">
          <div className="container">
            <div className="cand-hero-inner">
              <div className="cand-hero-left">
                <div className="cand-avatar-slot">
                  <img
                    src={user.photo || '/avatar.png'}
                    alt={user.name}
                    className="cand-hero-avatar"
                  />
                </div>
                <div className="cand-hero-info">
                  <span className="portal-badge-label">OFFICIAL CANDIDATE PORTAL</span>
                  <h1 className="cand-name-heading">{user.name || 'Hardik Yash Raj'}</h1>
                  <div className="cand-meta-line">
                    <span>Roll No: <strong>{user.rollNumber || 'TGC141/2026/88921'}</strong></span>
                    <span className="meta-sep">•</span>
                    <span>Email: <strong>{user.email || 'vikram.sharma@example.com'}</strong></span>
                    <span className="meta-sep">•</span>
                    <span className="digi-verified-pill">
                      <ShieldCheck size={14} /> DigiLocker Verified
                    </span>
                  </div>
                </div>
              </div>

              <div className="cand-hero-actions">
                <button
                  type="button"
                  className="btn-edit-profile-quick"
                  onClick={openEditModal}
                >
                  <PenSquare size={14} />
                  <span>Edit Profile</span>
                </button>

                <Link to="/find-entry" className="btn-new-app-gold">
                  <span>New Application</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4 FLOATING STATISTIC KPI CARDS
            ========================================================================= */}
        <div className="container stats-container-wrap">
          <div className="floating-stats-grid">
            {/* Stat 1: Active Applications */}
            <div className="stat-pill-card">
              <div className="stat-icon-square green">
                <FileText size={22} />
              </div>
              <div className="stat-data">
                <span className="stat-number">4</span>
                <span className="stat-label">Active Applications</span>
              </div>
            </div>

            {/* Stat 2: Scheduled Tests / Rallies */}
            <div className="stat-pill-card">
              <div className="stat-icon-square gold">
                <Calendar size={22} />
              </div>
              <div className="stat-data">
                <span className="stat-number">02</span>
                <span className="stat-label">Scheduled Tests / Rallies</span>
              </div>
            </div>

            {/* Stat 3: Admit Card Available */}
            <div className="stat-pill-card">
              <div className="stat-icon-square blue">
                <Award size={22} />
              </div>
              <div className="stat-data">
                <span className="stat-number">01</span>
                <span className="stat-label">Admit Card Available</span>
              </div>
            </div>

            {/* Stat 4: Mock CEE Tests Ready */}
            <div className="stat-pill-card">
              <div className="stat-icon-square purple">
                <BookOpen size={22} />
              </div>
              <div className="stat-data">
                <span className="stat-number">04</span>
                <span className="stat-label">Mock CEE Tests Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            MAIN CANDIDATE CONTENT WRAPPER
            ========================================================================= */}
        <div className="container main-dashboard-body">
          {/* Quick Expandable Candidate Details Bar */}
          <div className="profile-details-toggle-bar">
            <div className="toggle-left">
              <div className="user-icon-glass-circle">
                <User size={18} className="icon-user" />
              </div>
              <div>
                <strong>Candidate Identity & DigiLocker Profile</strong>
                <small>DOB: {user.dobFormatted || formatDisplayDate(user.dob) || '06 Oct 2001'} • Mobile: {user.mobile || '9876543210'} • Category: {user.category || 'General / Unreserved'}</small>
              </div>
            </div>
            <div className="toggle-right">
              <button
                type="button"
                className="btn btn-sm btn-glass-outline"
                onClick={() => setShowFullProfileDetails(!showFullProfileDetails)}
              >
                {showFullProfileDetails ? (
                  <><span>Hide Details</span><ChevronUp size={14} /></>
                ) : (
                  <><span>View Complete Details</span><ChevronDown size={14} /></>
                )}
              </button>
              <button
                type="button"
                className="btn btn-sm btn-glass-primary"
                onClick={openEditModal}
              >
                <PenSquare size={13} />
                <span>Edit Details</span>
              </button>
            </div>
          </div>

          {/* Expandable Full Candidate Profile Card */}
          {showFullProfileDetails && (
            <div className="dash-white-card profile-expanded-card animate-scale-up">
              <div className="card-header-row">
                <h3 className="section-title">Verified Personal & Academic Details</h3>
                <span className="badge-pill green"><ShieldCheck size={13} /> Aadhaar Biometric Linked</span>
              </div>
              <div className="profile-details-grid">
                <div className="p-item"><label>Full Name</label><strong>{user.name || 'Hardik Yash Raj'}</strong></div>
                <div className="p-item"><label>Date of Birth</label><strong>{user.dobFormatted || formatDisplayDate(user.dob) || '06 Oct 2001'}</strong></div>
                <div className="p-item"><label>Father's Name</label><strong>{user.fatherName || 'Shri Yash Raj'}</strong></div>
                <div className="p-item"><label>Mother's Name</label><strong>{user.motherName || 'Smt. Sunita Devi'}</strong></div>
                <div className="p-item"><label>Gender</label><strong>{user.gender || 'Male'}</strong></div>
                <div className="p-item"><label>Social Category</label><strong>{user.category || 'General / Unreserved'}</strong></div>
                <div className="p-item"><label>Mobile Number</label><strong>{user.mobile || '9876543210'}</strong></div>
                <div className="p-item"><label>Email Address</label><strong>{user.email || 'vikram.sharma@example.com'}</strong></div>
                <div className="p-item full"><label>Permanent Residence Address</label><strong>{user.address || '14, Rajputana Enclave, Vaishali Nagar, Jaipur, Rajasthan - 302021'}</strong></div>
                <div className="p-item"><label>Class 10th (Secondary)</label><strong>{user.education10th || 'CBSE Board • 88.4% (2017)'}</strong></div>
                <div className="p-item"><label>Class 12th (Senior Secondary)</label><strong>{user.education12th || 'CBSE Board PCM • 84.6% (2019)'}</strong></div>
                <div className="p-item"><label>Higher Qualification</label><strong>{user.degree || 'B.Tech Mechanical Engineering • 82.4% CGPA (2023)'}</strong></div>
                <div className="p-item"><label>NCC / Defence Ward</label><strong>{user.nccCert || 'NCC \'C\' Certificate (Alpha Grade)'}</strong></div>
              </div>
            </div>
          )}

          {/* =========================================================================
              SECTION: MY RECRUITMENT APPLICATIONS
              ========================================================================= */}
          <section className="dash-white-card applications-section-card">
            <div className="apps-section-header">
              <div>
                <h2 className="section-title">My Recruitment Applications</h2>
                <p className="section-subtitle">Real-time status tracking across recruitment pipelines</p>
              </div>
              <button
                type="button"
                className="btn-track-with-id"
                onClick={() => setTrackWithIdModal(true)}
              >
                Track with ID
              </button>
            </div>

            <div className="application-rows-list">
              {applications.map((app) => (
                <div key={app.id} className="app-entry-row">
                  <div className="app-left-meta">
                    <span className="app-id-pill">{app.id}</span>
                    <div className="app-title-group">
                      <h3 className="app-entry-title">{app.entryName}</h3>
                      <span className="app-submitted-time">Submitted on: {app.appliedDate}</span>
                    </div>
                  </div>

                  <div className="app-status-middle">
                    <div className="status-badge-live">
                      <span className="status-dot-pulse" />
                      <strong>{app.currentStatus}</strong>
                    </div>
                    <span className="app-center-text">Center: {app.centerAllotted}</span>
                  </div>

                  <div className="app-actions-right">
                    <button
                      type="button"
                      className="btn-view-tracker"
                      onClick={() => setSelectedAppForTracker(app)}
                    >
                      View Tracker
                    </button>

                    {app.admitCardReady ? (
                      <button
                        type="button"
                        className="btn-admit-card-gold"
                        onClick={() => setSelectedAppForAdmit(app)}
                      >
                        <Download size={14} />
                        <span>Admit Card</span>
                      </button>
                    ) : (
                      <button type="button" className="btn-admit-card-pending" disabled>
                        Admit Card Pending
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =========================================================================
              SECTION: HISTORY OF SSB APPEARED
              ========================================================================= */}
          <section className="dash-white-card ssb-history-section-card">
            <div className="apps-section-header">
              <div>
                <div className="ssb-header-title-row">
                  <h2 className="section-title">History of SSB Appeared</h2>
                  <span className="badge-pill gold"><Award size={13} /> {MOCK_SSB_HISTORY.length} Previous SSB Attempts</span>
                </div>
                <p className="section-subtitle">
                  Historical Services Selection Board interview records, stage qualification outcomes, batch/chest numbers, and conference results
                </p>
              </div>
              <div className="ssb-header-actions">
                <button
                  type="button"
                  className="btn-track-with-id"
                  onClick={() => addToast('SSB Candidate Record verified with Dte Gen of Recruiting.', 'info')}
                >
                  <ShieldCheck size={14} />
                  <span>Dossier Verified</span>
                </button>
              </div>
            </div>

            <div className="application-rows-list">
              {MOCK_SSB_HISTORY.map((ssb) => (
                <div key={ssb.id} className="app-entry-row ssb-entry-row">
                  <div className="app-left-meta">
                    <span className={`app-id-pill ssb-batch-pill ssb-type-${ssb.resultType}`}>
                      {ssb.batchNo}
                    </span>
                    <div className="app-title-group">
                      <h3 className="app-entry-title">{ssb.entryName}</h3>
                      <span className="app-submitted-time">
                        {ssb.dateRange} • Chest No: <strong>{ssb.chestNo}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="app-status-middle">
                    <div className={`status-badge-live ssb-status-badge ssb-status-${ssb.resultType}`}>
                      <span className={`status-dot-pulse ssb-dot ssb-dot-${ssb.resultType}`} />
                      <strong>{ssb.resultStatus}</strong>
                    </div>
                    <span className="app-center-text">Board: {ssb.boardName}</span>
                  </div>

                  <div className="app-actions-right">
                    <button
                      type="button"
                      className="btn-view-tracker btn-view-dossier"
                      onClick={() => setSelectedSsbForDossier(ssb)}
                    >
                      View SSB Dossier
                    </button>

                    <button
                      type="button"
                      className="btn-admit-card-gold"
                      onClick={() => setSelectedSsbForDossier(ssb)}
                    >
                      <FileText size={14} />
                      <span>Report / Call Letter</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =========================================================================
              BOTTOM 2-COLUMN SECTION: CEE MOCK ARENA & INSTRUCTIONS
              ========================================================================= */}
          <div className="dash-bottom-2col-grid">
            {/* Left Column: Computer Based Test (CEE) Mock Arena */}
            <div className="dash-white-card mock-arena-card">
              <h2 className="section-title">Computer Based Test (CEE) Mock Arena</h2>
              <p className="section-subtitle">
                Practice standard 50-question simulated computer-based tests matching the exact Indian Army examination portal interface.
              </p>

              <div className="mock-tests-stack">
                {/* Mock Test 1 */}
                <div className="mock-test-item">
                  <div className="mock-test-info">
                    <h4>Agniveer GD / Tech Mock Examination 01</h4>
                    <span>50 Questions • 60 Minutes • Bilingual (EN / HI)</span>
                  </div>
                  <button
                    type="button"
                    className="btn-start-test-dark"
                    onClick={() => handleStartExam('Agniveer GD / Tech Mock Examination 01')}
                  >
                    Start Practice Test
                  </button>
                </div>

                {/* Mock Test 2 */}
                <div className="mock-test-item">
                  <div className="mock-test-info">
                    <h4>Officers Entry: General Aptitude & English</h4>
                    <span>100 Questions • 120 Minutes • UPSC Standard</span>
                  </div>
                  <button
                    type="button"
                    className="btn-start-test-outline"
                    onClick={() => handleStartExam('Officers Entry: General Aptitude & English')}
                  >
                    Start Practice Test
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Candidate Instructions & Advisory */}
            <div className="dash-white-card advisory-card">
              <h2 className="section-title">Candidate Instructions & Advisory</h2>

              <div className="advisory-items-list">
                <div className="advisory-item">
                  <div className="advisory-icon yellow">
                    <AlertCircle size={18} />
                  </div>
                  <p className="advisory-text">
                    Original documents along with 2 sets of attested photocopies are mandatory during rally registration.
                  </p>
                </div>

                <div className="advisory-item">
                  <div className="advisory-icon green">
                    <CheckCircle2 size={18} />
                  </div>
                  <p className="advisory-text">
                    Verify that your Aadhaar biometric status is "Unlocked" before appearing for computer-based testing.
                  </p>
                </div>

                <div className="advisory-item">
                  <div className="advisory-icon green">
                    <CheckCircle2 size={18} />
                  </div>
                  <p className="advisory-text">
                    Report 60 minutes prior to scheduled reporting time for document barcode scanning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MODALS & INTERACTIVE DIALOGS
          ========================================================================= */}

      {/* 1. Edit Profile Details Modal */}
      {editProfileModal && (
        <div className="dash-modal-backdrop" onClick={() => setEditProfileModal(false)}>
          <div className="dash-modal-dialog animate-scale-up" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3>Edit Candidate Details</h3>
                <small className="modal-sub">Update profile credentials, contact info and qualifications</small>
              </div>
              <button type="button" className="close-btn" onClick={() => setEditProfileModal(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleProfileSave}>
              <div className="modal-body">
                <div className="form-2col-grid">
                  <div className="form-group">
                    <label>Candidate Full Name</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth (Calendar Picker)</label>
                    <input
                      type="date"
                      max="2008-12-31"
                      min="1990-01-01"
                      value={formatIsoDate(profileForm.dob)}
                      onChange={(e) => {
                        const iso = e.target.value;
                        setProfileForm({
                          ...profileForm,
                          dob: iso,
                          dobFormatted: formatDisplayDate(iso)
                        });
                      }}
                      required
                    />
                    <small style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: 2 }}>
                      Formatted: <strong>{profileForm.dobFormatted || formatDisplayDate(profileForm.dob)}</strong>
                    </small>
                  </div>
                  <div className="form-group">
                    <label>Father's Name</label>
                    <input
                      type="text"
                      value={profileForm.fatherName}
                      onChange={(e) => setProfileForm({ ...profileForm, fatherName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Mother's Name</label>
                    <input
                      type="text"
                      value={profileForm.motherName}
                      onChange={(e) => setProfileForm({ ...profileForm, motherName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Mobile Number (10 Digits Only)</label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      placeholder="e.g. 9876543210"
                      value={profileForm.mobile}
                      onChange={(e) => {
                        const numericOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setProfileForm({ ...profileForm, mobile: numericOnly });
                      }}
                      onKeyDown={(e) => {
                        if (
                          !/^\d$/.test(e.key) &&
                          !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key) &&
                          !e.ctrlKey &&
                          !e.metaKey
                        ) {
                          e.preventDefault();
                        }
                      }}
                      required
                    />
                    <small style={{ color: profileForm.mobile.length === 10 ? '#16a34a' : 'var(--text-muted)', fontSize: '0.72rem', marginTop: 2 }}>
                      {profileForm.mobile.length}/10 digits entered {profileForm.mobile.length === 10 ? '✓' : ''}
                    </small>
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Social Category</label>
                    <select
                      value={profileForm.category}
                      onChange={(e) => setProfileForm({ ...profileForm, category: e.target.value })}
                    >
                      <option value="General / Unreserved">General / Unreserved</option>
                      <option value="OBC (Non-Creamy Layer)">OBC (Non-Creamy Layer)</option>
                      <option value="Scheduled Caste (SC)">Scheduled Caste (SC)</option>
                      <option value="Scheduled Tribe (ST)">Scheduled Tribe (ST)</option>
                      <option value="EWS">EWS</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      value={profileForm.gender}
                      onChange={(e) => setProfileForm({ ...profileForm, gender: e.target.value })}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="form-group full">
                    <label>Permanent Residential Address</label>
                    <textarea
                      rows="2"
                      value={profileForm.address}
                      onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setEditProfileModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-glass-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. View Tracker Modal */}
      {selectedAppForTracker && (
        <div className="dash-modal-backdrop" onClick={() => setSelectedAppForTracker(null)}>
          <div className="dash-modal-dialog animate-scale-up" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3>Recruitment Progress Tracker</h3>
                <small className="modal-sub">Application ID: <strong>{selectedAppForTracker.id}</strong> — {selectedAppForTracker.entryName}</small>
              </div>
              <button type="button" className="close-btn" onClick={() => setSelectedAppForTracker(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="tracker-summary-card">
                <div className="summary-row"><label>Candidate Name:</label> <strong>{user.name}</strong></div>
                <div className="summary-row"><label>Allocated Center:</label> <strong>{selectedAppForTracker.centerAllotted}</strong></div>
                <div className="summary-row"><label>Reporting Schedule:</label> <strong>{selectedAppForTracker.reportingDate}</strong></div>
              </div>

              <h4 className="tracker-timeline-head">Pipeline Milestones</h4>
              <div className="tracker-timeline-list">
                {selectedAppForTracker.steps.map((step, idx) => (
                  <div key={idx} className={`tracker-step-item ${step.done ? 'done' : 'pending'}`}>
                    <div className="tracker-dot">
                      {step.done ? <Check size={14} /> : <span>{idx + 1}</span>}
                    </div>
                    <div className="tracker-step-content">
                      <strong>{step.name}</strong>
                      <small>{step.date}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline" onClick={() => setSelectedAppForTracker(null)}>
                Close
              </button>
              {selectedAppForTracker.admitCardReady && (
                <button
                  type="button"
                  className="btn btn-glass-primary"
                  onClick={() => {
                    const app = selectedAppForTracker;
                    setSelectedAppForTracker(null);
                    setSelectedAppForAdmit(app);
                  }}
                >
                  <Download size={14} /> Download Admit Card
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. Admit Card Modal */}
      {selectedAppForAdmit && (
        <div className="dash-modal-backdrop" onClick={() => setSelectedAppForAdmit(null)}>
          <div className="dash-modal-dialog admit-modal-lg animate-scale-up" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3>E-Admit Card Pass</h3>
                <small className="modal-sub">Roll No: {selectedAppForAdmit.rollNumber}</small>
              </div>
              <button type="button" className="close-btn" onClick={() => setSelectedAppForAdmit(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="admit-paper-card">
                <div className="admit-top-bar">
                  <img src="/Logo.png" alt="Indian Army" width="46" height="46" />
                  <div className="admit-titles">
                    <h3>JOIN INDIAN ARMY</h3>
                    <h4>DIRECTORATE GENERAL OF RECRUITING</h4>
                    <span>E-ADMIT CARD FOR RECRUITMENT YEAR 2026</span>
                  </div>
                  <img src={user.photo || '/avatar.png'} alt="Candidate" width="60" height="72" className="admit-cand-img" />
                </div>

                <div className="admit-grid-fields">
                  <div><label>Candidate Name:</label> <strong>{user.name}</strong></div>
                  <div><label>Roll Number:</label> <strong>{selectedAppForAdmit.rollNumber}</strong></div>
                  <div><label>Application ID:</label> <strong>{selectedAppForAdmit.id}</strong></div>
                  <div><label>Recruitment Entry:</label> <strong>{selectedAppForAdmit.entryName}</strong></div>
                  <div><label>Date of Birth:</label> <strong>{user.dob || '06 Oct 2001'}</strong></div>
                  <div><label>Father's Name:</label> <strong>{user.fatherName || 'Shri Yash Raj'}</strong></div>
                  <div className="full"><label>Reporting Venue:</label> <strong>{selectedAppForAdmit.centerAllotted}</strong></div>
                  <div className="full"><label>Reporting Date & Time:</label> <strong>{selectedAppForAdmit.reportingDate}</strong></div>
                </div>

                <div className="admit-barcode-bar">
                  <div className="barcode-graphic" />
                  <div className="qr-graphic">
                    <QrCode size={40} />
                    <small>UIDAI Biometric Verified</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline" onClick={() => setSelectedAppForAdmit(null)}>
                Close
              </button>
              <button
                type="button"
                className="btn btn-glass-primary"
                onClick={() => {
                  window.print();
                  addToast('Admit Card downloaded successfully!', 'success');
                }}
              >
                <Printer size={15} /> Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3B. SSB Performance Dossier Modal */}
      {selectedSsbForDossier && (
        <div className="dash-modal-backdrop" onClick={() => setSelectedSsbForDossier(null)}>
          <div className="dash-modal-dialog ssb-dossier-modal animate-scale-up" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="ssb-modal-title-flex">
                <img src="/Logo.png" alt="Indian Army" width="36" height="36" />
                <div>
                  <h3>SSB Candidate Performance Dossier</h3>
                  <small className="modal-sub">
                    {selectedSsbForDossier.entryName} • {selectedSsbForDossier.boardName}
                  </small>
                </div>
              </div>
              <button type="button" className="close-btn" onClick={() => setSelectedSsbForDossier(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              {/* SSB Top Hero Banner within Modal */}
              <div className={`ssb-dossier-top-strip ssb-strip-${selectedSsbForDossier.resultType}`}>
                <div className="ssb-strip-left">
                  <span className="ssb-strip-label">SSB OUTCOME & FINAL STATUS</span>
                  <h4 className="ssb-strip-status">{selectedSsbForDossier.resultStatus}</h4>
                  <div className="ssb-strip-meta">
                    <span>Batch: <strong>{selectedSsbForDossier.batchNo}</strong></span>
                    <span>•</span>
                    <span>Chest No: <strong>{selectedSsbForDossier.chestNo}</strong></span>
                    <span>•</span>
                    <span>Dates: <strong>{selectedSsbForDossier.dateRange}</strong></span>
                  </div>
                </div>
                <div className="ssb-strip-right">
                  <div className="ssb-badge-round">
                    <Award size={24} />
                  </div>
                </div>
              </div>

              {/* Candidate & Board Reference Grid */}
              <div className="ssb-dossier-grid-fields">
                <div className="dossier-cell">
                  <label>Candidate Full Name</label>
                  <strong>{user.name}</strong>
                </div>
                <div className="dossier-cell">
                  <label>Entry Scheme</label>
                  <strong>{selectedSsbForDossier.entryType}</strong>
                </div>
                <div className="dossier-cell">
                  <label>SSB Call Letter No.</label>
                  <strong>{selectedSsbForDossier.callLetterNo}</strong>
                </div>
                <div className="dossier-cell">
                  <label>Reporting Selection Centre</label>
                  <strong>{selectedSsbForDossier.boardName}</strong>
                </div>
                <div className="dossier-cell full">
                  <label>Centre Reporting Venue</label>
                  <strong>{selectedSsbForDossier.reportingVenue}</strong>
                </div>
              </div>

              {/* 5-Day Assessment Stages Breakdown */}
              <div className="ssb-assessment-breakdown-section">
                <h4 className="dossier-subheading">Services Selection Board (5-Day Testing Record)</h4>
                
                <div className="ssb-stages-flow-grid">
                  {/* Stage 1 */}
                  <div className={`stage-dossier-card ${selectedSsbForDossier.resultType === 'screened-out' ? 'stage-failed' : 'stage-passed'}`}>
                    <div className="stage-card-head">
                      <span className="stage-num-badge">STAGE I</span>
                      <h5>Screening Intelligence (Day 1)</h5>
                      <span className="stage-res-pill">{selectedSsbForDossier.resultType === 'screened-out' ? 'Screened Out' : 'Screened In'}</span>
                    </div>
                    <div className="stage-card-body">
                      <p><strong>OIR Rating:</strong> {selectedSsbForDossier.dossierDetails.oirRating}</p>
                      <p><strong>PPDT Theme:</strong> {selectedSsbForDossier.dossierDetails.ppdtTheme}</p>
                      <p className="stage-res-note"><strong>Stage Result:</strong> {selectedSsbForDossier.stage1Result}</p>
                    </div>
                  </div>

                  {/* Stage 2 - Psychology */}
                  <div className={`stage-dossier-card ${selectedSsbForDossier.resultType === 'screened-out' ? 'stage-na' : 'stage-passed'}`}>
                    <div className="stage-card-head">
                      <span className="stage-num-badge">STAGE II - A</span>
                      <h5>Psychological Battery (Day 2)</h5>
                      <span className="stage-res-pill">{selectedSsbForDossier.resultType === 'screened-out' ? 'N/A' : 'Assessed'}</span>
                    </div>
                    <div className="stage-card-body">
                      <p><strong>Tests:</strong> TAT, WAT (60 words), SRT (60 situations), Self Description</p>
                      <p><strong>Battery Record:</strong> {selectedSsbForDossier.dossierDetails.psychologyBattery}</p>
                    </div>
                  </div>

                  {/* Stage 2 - GTO */}
                  <div className={`stage-dossier-card ${selectedSsbForDossier.resultType === 'screened-out' ? 'stage-na' : 'stage-passed'}`}>
                    <div className="stage-card-head">
                      <span className="stage-num-badge">STAGE II - B</span>
                      <h5>Group Testing (Day 3 & 4)</h5>
                      <span className="stage-res-pill">{selectedSsbForDossier.resultType === 'screened-out' ? 'N/A' : 'Assessed'}</span>
                    </div>
                    <div className="stage-card-body">
                      <p><strong>Outdoor GTO Series:</strong> PGT, HGT, Snake Race, Individual Obstacles, Command Task, FGT</p>
                      <p><strong>GTO Record:</strong> {selectedSsbForDossier.dossierDetails.gtoTasks}</p>
                    </div>
                  </div>

                  {/* Stage 2 - Interview & Conference */}
                  <div className={`stage-dossier-card ${selectedSsbForDossier.resultType === 'recommended' ? 'stage-recommended' : selectedSsbForDossier.resultType === 'screened-out' ? 'stage-na' : 'stage-conference-out'}`}>
                    <div className="stage-card-head">
                      <span className="stage-num-badge">STAGE II - C</span>
                      <h5>Interview & Conference (Day 4/5)</h5>
                      <span className="stage-res-pill">{selectedSsbForDossier.resultType === 'recommended' ? 'Recommended' : selectedSsbForDossier.resultType === 'conference-out' ? 'Conference Out' : 'N/A'}</span>
                    </div>
                    <div className="stage-card-body">
                      <p><strong>Personal Interview:</strong> {selectedSsbForDossier.dossierDetails.interviewDuration}</p>
                      <p><strong>Final Board Decision:</strong> {selectedSsbForDossier.conferenceResult}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assessor Remarks & OLQ Guidance */}
              <div className="ssb-remarks-box">
                <div className="remarks-icon">
                  <Sparkles size={20} />
                </div>
                <div>
                  <strong>Assessor & Board Review Notes (Officer Like Qualities)</strong>
                  <p>{selectedSsbForDossier.dossierDetails.remarks}</p>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-outline" onClick={() => setSelectedSsbForDossier(null)}>
                Close
              </button>
              <button
                type="button"
                className="btn btn-glass-primary"
                onClick={() => {
                  window.print();
                  addToast(`SSB Performance Dossier (${selectedSsbForDossier.batchNo}) ready for print.`, 'success');
                }}
              >
                <Printer size={15} /> Print / Save Dossier PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Track with ID Modal */}
      {trackWithIdModal && (
        <div className="dash-modal-backdrop" onClick={() => setTrackWithIdModal(false)}>
          <div className="dash-modal-dialog animate-scale-up" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Track Application by ID</h3>
              <button type="button" className="close-btn" onClick={() => setTrackWithIdModal(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleTrackWithIdSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Enter Application ID or Roll Number</label>
                  <input
                    type="text"
                    placeholder="e.g. IA-2026-98421 or TGC141/2026/88921"
                    value={trackSearchId}
                    onChange={(e) => setTrackSearchId(e.target.value)}
                    required
                  />
                  <small style={{ color: 'var(--text-muted)', marginTop: 4 }}>
                    Try: <strong>IA-2026-68901</strong>, <strong>IA-2026-98421</strong>, <strong>IA-2026-44102</strong>, or <strong>IA-2026-11893</strong>
                  </small>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setTrackWithIdModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-glass-primary">
                  <Search size={14} /> Search Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. CEE Mock Arena Exam Simulator */}
      {mockExamModal && (
        <div className="dash-modal-backdrop" onClick={() => setMockExamModal(null)}>
          <div className="dash-modal-dialog exam-modal animate-scale-up" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3>{mockExamModal.title}</h3>
                <small className="modal-sub">Question {currentQuestionIdx + 1} of {mockQuestions.length}</small>
              </div>
              <button type="button" className="close-btn" onClick={() => setMockExamModal(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              {!examSubmitted ? (
                <div className="exam-question-body">
                  <h4 className="exam-q-text">{mockQuestions[currentQuestionIdx].q}</h4>
                  <div className="exam-options-list">
                    {mockQuestions[currentQuestionIdx].options.map((opt, idx) => (
                      <label
                        key={idx}
                        className={`exam-option-label ${selectedAnswer === idx ? 'selected' : ''}`}
                      >
                        <input
                          type="radio"
                          name="quiz-opt"
                          checked={selectedAnswer === idx}
                          onChange={() => setSelectedAnswer(idx)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="exam-result-box">
                  <CheckCircle2 size={48} color="#16a34a" />
                  <h4>Practice Test Completed!</h4>
                  <p>Your responses have been recorded and evaluated based on Indian Army CEE grading scheme.</p>
                  <div className="score-pill">Score: 100% (Qualified)</div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              {!examSubmitted ? (
                <>
                  <button type="button" className="btn btn-outline" onClick={() => setMockExamModal(null)}>
                    Exit Test
                  </button>
                  {currentQuestionIdx < mockQuestions.length - 1 ? (
                    <button
                      type="button"
                      className="btn btn-glass-primary"
                      onClick={() => {
                        setCurrentQuestionIdx(currentQuestionIdx + 1);
                        setSelectedAnswer(null);
                      }}
                    >
                      Next Question
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-glass-primary"
                      onClick={() => setExamSubmitted(true)}
                    >
                      Submit Exam
                    </button>
                  )}
                </>
              ) : (
                <button type="button" className="btn btn-glass-primary" onClick={() => setMockExamModal(null)}>
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          EMBEDDED CSS STYLING WITH AESTHETIC TRICOLOR & LIQUID GLASS
          ========================================================================= */}
      <style>{`
        .official-dashboard-page {
          min-height: calc(100vh - 120px);
          position: relative;
          background-color: var(--bg-app);
          font-family: var(--font-sans);
          padding-bottom: 80px;
          overflow: hidden;
        }

        /* -------------------------------------------------------------
           BACKGROUND TRICOLOR LIQUID GLASS VEIL
           ------------------------------------------------------------- */
        .dashboard-bg-wrapper {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .dashboard-bg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transition: opacity 0.3s ease;
        }

        .dashboard-bg-img.light-img {
          opacity: 0.75;
          display: block;
        }

        .dashboard-bg-img.dark-img {
          opacity: 0;
          display: none;
        }

        [data-theme='dark'] .dashboard-bg-img.light-img {
          opacity: 0;
          display: none;
        }

        [data-theme='dark'] .dashboard-bg-img.dark-img {
          opacity: 0.85;
          display: block;
        }

        .dashboard-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(244, 246, 248, 0.45) 0%,
            rgba(255, 255, 255, 0.3) 35%,
            rgba(244, 246, 248, 0.6) 100%
          );
        }

        [data-theme='dark'] .dashboard-bg-overlay {
          background: linear-gradient(
            180deg,
            rgba(11, 23, 16, 0.6) 0%,
            rgba(18, 36, 25, 0.45) 35%,
            rgba(11, 23, 16, 0.75) 100%
          );
        }

        .dashboard-content-relative {
          position: relative;
          z-index: 1;
        }

        /* -------------------------------------------------------------
           TOP HERO BANNER (LIGHT & DARK LIQUID GLASS)
           ------------------------------------------------------------- */
        .cand-hero-banner {
          position: relative;
          padding: 38px 0 56px;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(24px) saturate(200%);
          -webkit-backdrop-filter: blur(24px) saturate(200%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 10px 30px rgba(15, 39, 25, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        [data-theme='dark'] .cand-hero-banner {
          background: rgba(14, 28, 19, 0.78);
          backdrop-filter: blur(24px) saturate(200%);
          -webkit-backdrop-filter: blur(24px) saturate(200%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.12);
        }

        .cand-hero-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .cand-hero-left {
          display: flex;
          align-items: center;
          gap: 22px;
        }

        .cand-avatar-slot {
          width: 76px;
          height: 76px;
          border-radius: 50%;
          border: 3px solid #d97706;
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 4px 16px rgba(217, 119, 6, 0.25);
          flex-shrink: 0;
        }

        .cand-hero-avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cand-hero-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .portal-badge-label {
          font-size: 0.6875rem;
          font-weight: 800;
          color: #b45309;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        [data-theme='dark'] .portal-badge-label {
          color: #e5be59;
        }

        .cand-name-heading {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 900;
          color: #133820;
          margin: 0;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        [data-theme='dark'] .cand-name-heading {
          color: #ffffff;
        }

        .cand-meta-line {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 0.8125rem;
          color: #475569;
          margin-top: 4px;
        }

        [data-theme='dark'] .cand-meta-line {
          color: rgba(255, 255, 255, 0.8);
        }

        .cand-meta-line strong {
          color: #0f172a;
        }

        [data-theme='dark'] .cand-meta-line strong {
          color: #ffffff;
        }

        .meta-sep {
          color: rgba(148, 163, 184, 0.6);
        }

        .digi-verified-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #166534;
          background: #dcfce7;
          border: 1px solid #bbf7d0;
          padding: 2px 10px;
          border-radius: 100px;
          font-weight: 700;
          font-size: 0.75rem;
        }

        [data-theme='dark'] .digi-verified-pill {
          background: rgba(34, 197, 94, 0.2);
          color: #86efac;
          border-color: rgba(34, 197, 94, 0.35);
        }

        .cand-hero-actions {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        /* -------------------------------------------------------------
           3D LIQUID GLASS BUTTONS (EMERALD & GOLD CAPSULES)
           ------------------------------------------------------------- */
        .btn-new-app-gold {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 22px;
          border-radius: 100px;
          font-size: 0.84375rem;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          background: linear-gradient(135deg, rgba(22, 101, 52, 0.95) 0%, rgba(15, 68, 35, 0.98) 100%);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(254, 240, 138, 0.5);
          color: #fef08a;
          box-shadow: 0 6px 18px rgba(22, 101, 52, 0.32), inset 0 1px 1px rgba(255, 255, 255, 0.5);
        }

        .btn-new-app-gold:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(22, 101, 52, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.7);
          background: linear-gradient(135deg, rgba(27, 122, 63, 0.98) 0%, rgba(18, 82, 42, 1) 100%);
          color: #ffffff;
        }

        [data-theme='dark'] .btn-new-app-gold {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.25) 0%, rgba(22, 101, 52, 0.45) 100%);
          color: #86efac;
          border: 1px solid rgba(134, 239, 172, 0.45);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.25);
        }

        [data-theme='dark'] .btn-new-app-gold:hover {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.35) 0%, rgba(22, 101, 52, 0.6) 100%);
          color: #ffffff;
          border-color: rgba(134, 239, 172, 0.7);
        }

        .btn-edit-profile-quick {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 20px;
          border-radius: 100px;
          font-size: 0.84375rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(203, 213, 225, 0.85);
          color: #166534;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.9);
        }

        .btn-edit-profile-quick:hover {
          background: rgba(255, 255, 255, 0.95);
          border-color: #166534;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(22, 101, 52, 0.12);
        }

        [data-theme='dark'] .btn-edit-profile-quick {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.18);
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
        }

        [data-theme='dark'] .btn-edit-profile-quick:hover {
          background: rgba(255, 255, 255, 0.16);
          border-color: rgba(255, 255, 255, 0.35);
        }

        .btn-glass-primary {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, rgba(22, 101, 52, 0.92) 0%, rgba(15, 68, 35, 0.96) 100%);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          color: #fef08a;
          border: 1px solid rgba(254, 240, 138, 0.45);
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 0.8125rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 14px rgba(22, 101, 52, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.5);
        }

        .btn-glass-primary:hover {
          background: linear-gradient(135deg, rgba(27, 122, 63, 0.96) 0%, rgba(18, 82, 42, 0.98) 100%);
          transform: translateY(-1px);
          color: #ffffff;
          box-shadow: 0 6px 18px rgba(22, 101, 52, 0.35);
        }

        [data-theme='dark'] .btn-glass-primary {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(22, 101, 52, 0.4) 100%);
          color: #86efac;
          border-color: rgba(134, 239, 172, 0.4);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2);
        }

        [data-theme='dark'] .btn-glass-primary:hover {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(22, 101, 52, 0.55) 100%);
          color: #ffffff;
        }

        .btn-glass-outline {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(14px) saturate(180%);
          -webkit-backdrop-filter: blur(14px) saturate(180%);
          color: #334155;
          border: 1px solid rgba(203, 213, 225, 0.8);
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 0.8125rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }

        .btn-glass-outline:hover {
          background: rgba(255, 255, 255, 0.9);
          border-color: #94a3b8;
          color: #0f172a;
        }

        [data-theme='dark'] .btn-glass-outline {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.15);
          color: #e2e8f0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        [data-theme='dark'] .btn-glass-outline:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.3);
        }

        /* -------------------------------------------------------------
           4 FLOATING STATISTIC KPI CARDS (LIQUID GLASS TILES)
           ------------------------------------------------------------- */
        .stats-container-wrap {
          margin-top: -28px;
          position: relative;
          z-index: 10;
        }

        .floating-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .stat-pill-card {
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-radius: 14px;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 8px 28px rgba(15, 39, 25, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.85);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .stat-pill-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(15, 39, 25, 0.09), inset 0 1px 1px rgba(255, 255, 255, 1);
        }

        [data-theme='dark'] .stat-pill-card {
          background: rgba(18, 36, 25, 0.82);
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.12);
        }

        .stat-icon-square {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.8);
        }

        .stat-icon-square.green { background: #dcfce7; color: #166534; }
        .stat-icon-square.gold { background: #fef3c7; color: #b45309; }
        .stat-icon-square.blue { background: #e0e7ff; color: #3730a3; }
        .stat-icon-square.purple { background: #f3e8ff; color: #6b21a8; }

        [data-theme='dark'] .stat-icon-square.green { background: rgba(34, 197, 94, 0.2); color: #86efac; }
        [data-theme='dark'] .stat-icon-square.gold { background: rgba(245, 158, 11, 0.2); color: #fde68a; }
        [data-theme='dark'] .stat-icon-square.blue { background: rgba(99, 102, 241, 0.2); color: #a5b4fc; }
        [data-theme='dark'] .stat-icon-square.purple { background: rgba(168, 85, 247, 0.2); color: #d8b4fe; }

        .stat-data {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-size: 1.625rem;
          font-weight: 900;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .stat-label {
          font-size: 0.78125rem;
          color: var(--text-secondary);
          font-weight: 500;
          margin-top: 2px;
        }

        /* -------------------------------------------------------------
           MAIN DASHBOARD BODY CARDS (LIQUID GLASS PANES)
           ------------------------------------------------------------- */
        .main-dashboard-body {
          margin-top: 28px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .dash-white-card {
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-radius: 16px;
          padding: 26px 30px;
          box-shadow: 0 8px 32px rgba(15, 39, 25, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.85);
        }

        [data-theme='dark'] .dash-white-card {
          background: rgba(18, 36, 25, 0.8);
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .section-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.2;
        }

        .section-subtitle {
          font-size: 0.84375rem;
          color: var(--text-muted);
          margin: 4px 0 0;
        }

        /* Profile Toggle Bar */
        .profile-details-toggle-bar {
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-radius: 14px;
          padding: 16px 26px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          box-shadow: 0 6px 24px rgba(15, 39, 25, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.85);
        }

        [data-theme='dark'] .profile-details-toggle-bar {
          background: rgba(18, 36, 25, 0.8);
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);
        }

        .toggle-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .user-icon-glass-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: #dcfce7;
          color: #166534;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.8);
        }

        [data-theme='dark'] .user-icon-glass-circle {
          background: rgba(34, 197, 94, 0.2);
          color: #86efac;
        }

        .toggle-left strong {
          display: block;
          font-size: 0.9375rem;
          color: var(--text-primary);
        }

        .toggle-left small {
          font-size: 0.78125rem;
          color: var(--text-muted);
        }

        .toggle-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .profile-expanded-card {
          border-left: 4px solid #166534;
        }

        .card-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .profile-details-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px 20px;
        }

        .p-item {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .p-item.full {
          grid-column: 1 / -1;
        }

        .p-item label {
          font-size: 0.71875rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
        }

        .p-item strong {
          font-size: 0.875rem;
          color: var(--text-primary);
        }

        /* -------------------------------------------------------------
           MY RECRUITMENT APPLICATIONS LIST
           ------------------------------------------------------------- */
        .applications-section-card {
          padding: 26px 30px 30px;
        }

        .apps-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 22px;
        }

        .btn-track-with-id {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(203, 213, 225, 0.8);
          color: #334155;
          padding: 8px 18px;
          border-radius: 100px;
          font-size: 0.8125rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-track-with-id:hover {
          border-color: #166534;
          color: #166534;
          background: rgba(255, 255, 255, 0.95);
        }

        [data-theme='dark'] .btn-track-with-id {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.18);
          color: #e2e8f0;
        }

        [data-theme='dark'] .btn-track-with-id:hover {
          background: rgba(255, 255, 255, 0.16);
          color: #ffffff;
        }

        .application-rows-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .app-entry-row {
          background: rgba(248, 250, 252, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 12px;
          padding: 16px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .app-entry-row:hover {
          background: rgba(255, 255, 255, 0.95);
          border-color: rgba(148, 163, 184, 0.6);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(15, 39, 25, 0.05);
        }

        [data-theme='dark'] .app-entry-row {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.08);
        }

        [data-theme='dark'] .app-entry-row:hover {
          background: rgba(255, 255, 255, 0.07);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
        }

        .app-left-meta {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 320px;
        }

        .app-id-pill {
          background: #e2e8f0;
          color: #334155;
          font-family: monospace;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
          flex-shrink: 0;
        }

        [data-theme='dark'] .app-id-pill {
          background: rgba(255, 255, 255, 0.12);
          color: #f1f5f9;
        }

        .app-title-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .app-entry-title {
          font-size: 0.9375rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
        }

        .app-submitted-time {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .app-status-middle {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .status-badge-live {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #166534;
          font-size: 0.8125rem;
          font-weight: 700;
        }

        [data-theme='dark'] .status-badge-live {
          color: #4ade80;
        }

        .status-dot-pulse {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.25);
        }

        .app-center-text {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .app-actions-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .btn-view-tracker {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(203, 213, 225, 0.8);
          color: #334155;
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 0.8125rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-view-tracker:hover {
          background: rgba(255, 255, 255, 0.95);
          border-color: #94a3b8;
          color: #0f172a;
        }

        [data-theme='dark'] .btn-view-tracker {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.18);
          color: #e2e8f0;
        }

        /* Liquid Glass Droplet Admit Card Button */
        .btn-admit-card-gold {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 100px;
          font-size: 0.8125rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          background: linear-gradient(135deg, rgba(22, 101, 52, 0.92) 0%, rgba(15, 68, 35, 0.96) 100%);
          backdrop-filter: blur(14px) saturate(180%);
          -webkit-backdrop-filter: blur(14px) saturate(180%);
          border: 1px solid rgba(254, 240, 138, 0.45);
          color: #fef08a;
          box-shadow: 0 4px 14px rgba(22, 101, 52, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.5);
        }

        .btn-admit-card-gold:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(22, 101, 52, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.7);
          background: linear-gradient(135deg, rgba(27, 122, 63, 0.96) 0%, rgba(18, 82, 42, 0.98) 100%);
          color: #ffffff;
        }

        [data-theme='dark'] .btn-admit-card-gold {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(22, 101, 52, 0.4) 100%);
          color: #86efac;
          border-color: rgba(134, 239, 172, 0.4);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
        }

        [data-theme='dark'] .btn-admit-card-gold:hover {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(22, 101, 52, 0.55) 100%);
          color: #ffffff;
        }

        .btn-admit-card-pending {
          background: rgba(226, 232, 240, 0.6);
          color: #94a3b8;
          border: 1px solid rgba(203, 213, 225, 0.5);
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 0.8125rem;
          font-weight: 600;
          cursor: not-allowed;
        }

        [data-theme='dark'] .btn-admit-card-pending {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.08);
          color: #64748b;
        }

        /* -------------------------------------------------------------
           BOTTOM 2-COLUMN SECTION: CEE MOCK ARENA & ADVISORY
           ------------------------------------------------------------- */
        .dash-bottom-2col-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .mock-arena-card, .advisory-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .mock-tests-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 4px;
        }

        .mock-test-item {
          background: rgba(248, 250, 252, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 12px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        [data-theme='dark'] .mock-test-item {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.08);
        }

        .mock-test-info h4 {
          font-size: 0.875rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 3px;
        }

        .mock-test-info span {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .btn-start-test-dark {
          background: linear-gradient(135deg, rgba(23, 56, 36, 0.94) 0%, rgba(15, 38, 24, 0.98) 100%);
          backdrop-filter: blur(14px);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 8px 18px;
          border-radius: 100px;
          font-size: 0.8125rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(23, 56, 36, 0.2);
        }

        .btn-start-test-dark:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(23, 56, 36, 0.3);
        }

        [data-theme='dark'] .btn-start-test-dark {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.85) 0%, rgba(22, 163, 74, 0.95) 100%);
          color: #0b1c11;
        }

        .btn-start-test-outline {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(203, 213, 225, 0.8);
          color: #334155;
          padding: 8px 18px;
          border-radius: 100px;
          font-size: 0.8125rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .btn-start-test-outline:hover {
          background: rgba(255, 255, 255, 0.95);
          border-color: #94a3b8;
          color: #0f172a;
        }

        [data-theme='dark'] .btn-start-test-outline {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.18);
          color: #e2e8f0;
        }

        /* Advisory Items List */
        .advisory-items-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 8px;
        }

        .advisory-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .advisory-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.8);
        }

        .advisory-icon.yellow {
          background: #fffbeb;
          color: #d97706;
          border: 1px solid #fde68a;
        }

        .advisory-icon.green {
          background: #f0fdf4;
          color: #16a34a;
          border: 1px solid #bbf7d0;
        }

        [data-theme='dark'] .advisory-icon.yellow {
          background: rgba(245, 158, 11, 0.2);
          color: #fde68a;
          border-color: rgba(245, 158, 11, 0.35);
        }

        [data-theme='dark'] .advisory-icon.green {
          background: rgba(34, 197, 94, 0.2);
          color: #86efac;
          border-color: rgba(34, 197, 94, 0.35);
        }

        .advisory-text {
          font-size: 0.84375rem;
          color: var(--text-primary);
          line-height: 1.45;
          margin: 0;
        }

        /* -------------------------------------------------------------
           MODALS & DIALOGS
           ------------------------------------------------------------- */
        .dash-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: grid;
          place-items: center;
          z-index: 2000;
          padding: 20px;
        }

        .dash-modal-dialog {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(24px) saturate(200%);
          -webkit-backdrop-filter: blur(24px) saturate(200%);
          border-radius: 18px;
          width: 100%;
          max-width: 620px;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.9);
          overflow: hidden;
        }

        [data-theme='dark'] .dash-modal-dialog {
          background: rgba(18, 34, 24, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
        }

        .dash-modal-dialog.admit-modal-lg {
          max-width: 680px;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 24px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .modal-header h3 {
          font-family: var(--font-display);
          font-size: 1.1875rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
        }

        .modal-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .modal-body {
          padding: 24px;
          max-height: 72vh;
          overflow-y: auto;
        }

        .modal-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
          padding: 16px 24px;
          border-top: 1px solid var(--border-subtle);
          background: rgba(248, 250, 252, 0.7);
        }

        [data-theme='dark'] .modal-footer {
          background: rgba(0, 0, 0, 0.25);
        }

        .form-2col-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px 18px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-bottom: 12px;
        }

        .form-group.full {
          grid-column: 1 / -1;
        }

        .form-group label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .form-group input, .form-group select, .form-group textarea {
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid var(--border-subtle);
          background: var(--bg-surface);
          color: var(--text-primary);
          font-size: 0.875rem;
          outline: none;
        }

        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          border-color: var(--army-primary);
          box-shadow: 0 0 0 3px rgba(22, 101, 52, 0.15);
        }

        /* Tracker Timeline Inside Modal */
        .tracker-summary-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 14px;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        [data-theme='dark'] .tracker-summary-card {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.08);
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.8125rem;
        }

        .summary-row label { color: var(--text-muted); }
        .summary-row strong { color: var(--text-primary); }

        .tracker-timeline-head {
          font-size: 0.9375rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 14px;
        }

        .tracker-timeline-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-left: 8px;
        }

        .tracker-step-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .tracker-dot {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          font-size: 0.75rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .tracker-step-item.done .tracker-dot {
          background: #16a34a;
          color: #ffffff;
        }

        .tracker-step-item.pending .tracker-dot {
          background: #e2e8f0;
          color: #64748b;
        }

        [data-theme='dark'] .tracker-step-item.pending .tracker-dot {
          background: rgba(255, 255, 255, 0.1);
          color: #94a3b8;
        }

        .tracker-step-content {
          display: flex;
          flex-direction: column;
        }

        .tracker-step-content strong {
          font-size: 0.84375rem;
          color: var(--text-primary);
        }

        .tracker-step-content small {
          font-size: 0.71875rem;
          color: var(--text-muted);
        }

        /* Admit Card Layout */
        .admit-paper-card {
          border: 2px solid #0f172a;
          background: #ffffff;
          padding: 24px;
          border-radius: 6px;
        }

        .admit-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid #0f172a;
          padding-bottom: 12px;
          margin-bottom: 16px;
        }

        .admit-titles {
          text-align: center;
        }

        .admit-titles h3 { margin: 0; font-size: 1.125rem; font-weight: 900; color: #0f172a; }
        .admit-titles h4 { margin: 2px 0; font-size: 0.75rem; font-weight: 700; color: #334155; }
        .admit-titles span { font-size: 0.6875rem; font-weight: 800; color: #991b1b; }

        .admit-cand-img {
          border: 1px solid #cbd5e1;
        }

        .admit-grid-fields {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 20px;
          font-size: 0.8125rem;
          margin-bottom: 18px;
        }

        .admit-grid-fields div {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px dashed #cbd5e1;
          padding-bottom: 4px;
        }

        .admit-grid-fields div.full {
          grid-column: 1 / -1;
        }

        .admit-grid-fields label { color: #475569; }
        .admit-grid-fields strong { color: #0f172a; }

        .admit-barcode-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid #cbd5e1;
          padding-top: 12px;
        }

        .barcode-graphic {
          width: 160px;
          height: 32px;
          background: repeating-linear-gradient(90deg, #000 0px, #000 2px, transparent 2px, transparent 4px, #000 4px, #000 7px, transparent 7px, transparent 9px);
        }

        .qr-graphic {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #475569;
          font-size: 0.6875rem;
        }

        /* Mock Exam Options */
        .exam-q-text {
          font-size: 1.0625rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 16px;
          line-height: 1.4;
        }

        .exam-options-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .exam-option-label {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.875rem;
          color: var(--text-primary);
          transition: all 0.2s ease;
        }

        .exam-option-label:hover {
          background: var(--bg-surface-subtle);
        }

        .exam-option-label.selected {
          border-color: #166534;
          background: #f0fdf4;
          color: #166534;
          font-weight: 700;
        }

        [data-theme='dark'] .exam-option-label.selected {
          background: rgba(22, 101, 52, 0.25);
          color: #86efac;
          border-color: #86efac;
        }

        .exam-result-box {
          text-align: center;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .score-pill {
          background: #dcfce7;
          color: #166534;
          font-weight: 800;
          padding: 8px 18px;
          border-radius: 100px;
          font-size: 0.9375rem;
        }

        /* -------------------------------------------------------------
           HISTORY OF SSB APPEARED SECTION & DOSSIER MODAL
           ------------------------------------------------------------- */
        .ssb-history-section-card {
          padding: 26px 30px 30px;
        }

        .ssb-header-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .badge-pill.gold {
          background: #fef9c3;
          color: #854d0e;
          border: 1px solid #fef08a;
          padding: 3px 10px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        [data-theme='dark'] .badge-pill.gold {
          background: rgba(234, 179, 8, 0.2);
          color: #fde047;
          border-color: rgba(234, 179, 8, 0.35);
        }

        .ssb-batch-pill {
          font-family: monospace;
          font-weight: 800;
        }

        .ssb-type-recommended {
          background: #dcfce7 !important;
          color: #166534 !important;
          border: 1px solid #bbf7d0 !important;
        }

        .ssb-type-conference-out {
          background: #f1f5f9 !important;
          color: #334155 !important;
          border: 1px solid #cbd5e1 !important;
        }

        .ssb-type-screened-out {
          background: #fffbeb !important;
          color: #b45309 !important;
          border: 1px solid #fde68a !important;
        }

        [data-theme='dark'] .ssb-type-recommended {
          background: rgba(34, 197, 94, 0.2) !important;
          color: #86efac !important;
          border-color: rgba(34, 197, 94, 0.35) !important;
        }

        [data-theme='dark'] .ssb-type-conference-out {
          background: rgba(148, 163, 184, 0.18) !important;
          color: #cbd5e1 !important;
          border-color: rgba(148, 163, 184, 0.25) !important;
        }

        [data-theme='dark'] .ssb-type-screened-out {
          background: rgba(245, 158, 11, 0.2) !important;
          color: #fde68a !important;
          border-color: rgba(245, 158, 11, 0.35) !important;
        }

        .ssb-status-badge.ssb-status-recommended {
          color: #15803d;
        }

        .ssb-status-badge.ssb-status-conference-out {
          color: #475569;
        }

        .ssb-status-badge.ssb-status-screened-out {
          color: #d97706;
        }

        [data-theme='dark'] .ssb-status-badge.ssb-status-recommended {
          color: #4ade80;
        }

        [data-theme='dark'] .ssb-status-badge.ssb-status-conference-out {
          color: #94a3b8;
        }

        [data-theme='dark'] .ssb-status-badge.ssb-status-screened-out {
          color: #fbbf24;
        }

        .ssb-dot-recommended {
          background: #22c55e;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.25);
        }

        .ssb-dot-conference-out {
          background: #64748b;
          box-shadow: 0 0 0 3px rgba(100, 116, 139, 0.25);
        }

        .ssb-dot-screened-out {
          background: #f59e0b;
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.25);
        }

        .btn-view-dossier {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        /* Dossier Modal Styling */
        .dash-modal-dialog.ssb-dossier-modal {
          max-width: 860px;
        }

        .ssb-modal-title-flex {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ssb-dossier-top-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .ssb-strip-recommended {
          background: linear-gradient(135deg, rgba(220, 252, 231, 0.85) 0%, rgba(187, 247, 208, 0.95) 100%);
          border: 1px solid #86efac;
          color: #14532d;
        }

        .ssb-strip-conference-out {
          background: linear-gradient(135deg, rgba(241, 245, 249, 0.85) 0%, rgba(226, 232, 240, 0.95) 100%);
          border: 1px solid #cbd5e1;
          color: #1e293b;
        }

        .ssb-strip-screened-out {
          background: linear-gradient(135deg, rgba(254, 243, 199, 0.85) 0%, rgba(253, 230, 138, 0.95) 100%);
          border: 1px solid #fde68a;
          color: #78350f;
        }

        [data-theme='dark'] .ssb-strip-recommended {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(22, 101, 52, 0.35) 100%);
          border-color: rgba(34, 197, 94, 0.4);
          color: #bbf7d0;
        }

        [data-theme='dark'] .ssb-strip-conference-out {
          background: linear-gradient(135deg, rgba(148, 163, 184, 0.15) 0%, rgba(71, 85, 105, 0.35) 100%);
          border-color: rgba(148, 163, 184, 0.3);
          color: #f1f5f9;
        }

        [data-theme='dark'] .ssb-strip-screened-out {
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(180, 83, 9, 0.35) 100%);
          border-color: rgba(245, 158, 11, 0.4);
          color: #fef08a;
        }

        .ssb-strip-label {
          font-size: 0.6875rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          opacity: 0.85;
        }

        .ssb-strip-status {
          font-size: 1.1875rem;
          font-weight: 800;
          margin: 2px 0 4px;
        }

        .ssb-strip-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78125rem;
          opacity: 0.9;
        }

        .ssb-badge-round {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: rgba(255, 255, 255, 0.7);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        [data-theme='dark'] .ssb-badge-round {
          background: rgba(255, 255, 255, 0.15);
        }

        .ssb-dossier-grid-fields {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px 18px;
          padding: 14px 18px;
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .dossier-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .dossier-cell.full {
          grid-column: 1 / -1;
        }

        .dossier-cell label {
          font-size: 0.6875rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .dossier-cell strong {
          font-size: 0.84375rem;
          color: var(--text-primary);
        }

        .dossier-subheading {
          font-size: 0.9375rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 12px;
        }

        .ssb-stages-flow-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          margin-bottom: 20px;
        }

        .stage-dossier-card {
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          padding: 14px;
          background: var(--bg-surface);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .stage-card-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .stage-num-badge {
          font-size: 0.6875rem;
          font-weight: 800;
          background: #e2e8f0;
          color: #334155;
          padding: 2px 6px;
          border-radius: 4px;
        }

        [data-theme='dark'] .stage-num-badge {
          background: rgba(255, 255, 255, 0.12);
          color: #cbd5e1;
        }

        .stage-card-head h5 {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
          flex: 1;
        }

        .stage-res-pill {
          font-size: 0.6875rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 100px;
          background: #e2e8f0;
          color: #334155;
        }

        .stage-passed .stage-res-pill, .stage-recommended .stage-res-pill {
          background: #dcfce7;
          color: #166534;
        }

        .stage-failed .stage-res-pill {
          background: #fee2e2;
          color: #991b1b;
        }

        .stage-conference-out .stage-res-pill {
          background: #f1f5f9;
          color: #475569;
        }

        [data-theme='dark'] .stage-passed .stage-res-pill,
        [data-theme='dark'] .stage-recommended .stage-res-pill {
          background: rgba(34, 197, 94, 0.2);
          color: #86efac;
        }

        [data-theme='dark'] .stage-failed .stage-res-pill {
          background: rgba(239, 68, 68, 0.2);
          color: #fca5a5;
        }

        .stage-card-body p {
          font-size: 0.78125rem;
          color: var(--text-secondary);
          margin: 0 0 4px;
          line-height: 1.4;
        }

        .stage-res-note {
          color: var(--text-primary) !important;
        }

        .ssb-remarks-box {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 18px;
          border-radius: 10px;
          background: #fffbeb;
          border: 1px solid #fde68a;
          color: #92400e;
        }

        [data-theme='dark'] .ssb-remarks-box {
          background: rgba(245, 158, 11, 0.12);
          border-color: rgba(245, 158, 11, 0.25);
          color: #fde68a;
        }

        .ssb-remarks-box strong {
          display: block;
          font-size: 0.8125rem;
          margin-bottom: 2px;
        }

        .ssb-remarks-box p {
          font-size: 0.78125rem;
          margin: 0;
          line-height: 1.45;
        }

        .remarks-icon {
          flex-shrink: 0;
          color: #d97706;
        }

        [data-theme='dark'] .remarks-icon {
          color: #fbbf24;
        }

        /* -------------------------------------------------------------
           RESPONSIVE BREAKPOINTS
           ------------------------------------------------------------- */
        @media (max-width: 1024px) {
          .floating-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .dash-bottom-2col-grid { grid-template-columns: 1fr; }
          .profile-details-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .cand-hero-inner { flex-direction: column; align-items: flex-start; }
          .cand-hero-actions { width: 100%; justify-content: flex-start; }
          .floating-stats-grid { grid-template-columns: 1fr; }
          .app-entry-row { flex-direction: column; align-items: flex-start; }
          .app-left-meta { min-width: 100%; }
          .app-actions-right { width: 100%; justify-content: space-between; }
          .profile-details-toggle-bar { flex-direction: column; align-items: flex-start; }
          .profile-details-grid { grid-template-columns: 1fr; }
          .form-2col-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
