import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, User, Lock, Mail, ShieldCheck, RefreshCw, KeyRound, ArrowRight, UserPlus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const AuthModal = () => {
  const { authModal, setAuthModal, login, addToast } = useApp();
  const navigate = useNavigate();

  const [tab, setTab] = useState(authModal.initialTab || 'candidate');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('7K9P4');
  const [rememberMe, setRememberMe] = useState(true);

  // Registration state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regAadhaar, setRegAadhaar] = useState('');
  const [regPass, setRegPass] = useState('');

  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
  const tabsTrackRef = useRef(null);
  const tabsRefs = useRef({});

  const updateIndicator = () => {
    const currentBtn = tabsRefs.current[tab];
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
  }, [tab, authModal.isOpen]);

  if (!authModal.isOpen) return null;

  const refreshCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let res = '';
    for (let i = 0; i < 5; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(res);
  };

  const handleFillDemo = (type) => {
    if (type === 'officer') {
      setEmail('officer.candidate@joinindianarmy.nic.in');
      setPassword('IndianArmy@2026');
      setCaptchaInput(captchaCode);
    } else {
      setEmail('vikram.sharma@example.com');
      setPassword('Candidate@2026');
      setCaptchaInput(captchaCode);
    }
    addToast('Demo credentials autofilled!', 'info');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (captchaInput.toUpperCase() !== captchaCode) {
      addToast('Invalid Security Captcha code entered. Please try again.', 'error');
      refreshCaptcha();
      return;
    }
    const destination = authModal.redirectTo?.startsWith('/') ? authModal.redirectTo : '/dashboard';
    login(email, tab === 'officer' ? 'officer' : 'candidate');
    navigate(destination);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPhone) {
      addToast('Please fill all mandatory registration fields.', 'error');
      return;
    }
    const destination = authModal.redirectTo?.startsWith('/') ? authModal.redirectTo : '/dashboard';
    login(regEmail, 'candidate');
    addToast('Aadhaar verified! New candidate account created successfully.', 'success');
    navigate(destination);
  };

  return (
    <div className="modal-backdrop" onClick={() => setAuthModal({ isOpen: false, initialTab: 'candidate' })}>
      <div
        className="auth-modal-dialog animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Authentication Portal"
      >
        {/* Header */}
        <div className="auth-header">
          <div className="auth-brand-wrap">
            <img src="/Logo.png" alt="Indian Army Crest" className="auth-emblem" width="38" height="38" />
            <div>
              <h3 className="auth-modal-title">RECRUITMENT LOGIN</h3>
              <span className="auth-modal-sub">DIRECTORATE GENERAL OF RECRUITING</span>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={() => setAuthModal({ isOpen: false, initialTab: 'candidate' })}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="auth-tabs" role="tablist" ref={tabsTrackRef}>
          {/* Sliding Liquid Glass Indicator */}
          <div
            className="sliding-glass-auth-pill"
            style={{
              transform: `translate3d(${indicatorStyle.left}px, ${indicatorStyle.top}px, 0)`,
              width: `${indicatorStyle.width}px`,
              height: `${indicatorStyle.height}px`,
              opacity: indicatorStyle.opacity
            }}
            aria-hidden="true"
          />

          <button
            ref={(el) => (tabsRefs.current['candidate'] = el)}
            type="button"
            className={`auth-tab ${tab === 'candidate' ? 'active' : ''}`}
            onClick={() => setTab('candidate')}
            role="tab"
            aria-selected={tab === 'candidate'}
          >
            <User size={15} />
            <span>Agniveer / JCO Login</span>
          </button>
          <button
            ref={(el) => (tabsRefs.current['officer'] = el)}
            type="button"
            className={`auth-tab ${tab === 'officer' ? 'active' : ''}`}
            onClick={() => setTab('officer')}
            role="tab"
            aria-selected={tab === 'officer'}
          >
            <ShieldCheck size={15} />
            <span>Officer Candidate</span>
          </button>
          <button
            ref={(el) => (tabsRefs.current['register'] = el)}
            type="button"
            className={`auth-tab ${tab === 'register' ? 'active' : ''}`}
            onClick={() => setTab('register')}
            role="tab"
            aria-selected={tab === 'register'}
          >
            <UserPlus size={15} />
            <span>New Registration</span>
          </button>
        </div>

        {/* Login / Register Form Body */}
        <div className="auth-body">
          {authModal.redirectTo && (
            <div className="auth-continue-notice">
              <Lock size={15} />
              <span>Sign in to continue securely to your application.</span>
            </div>
          )}
          {tab !== 'register' ? (
            <form onSubmit={handleLoginSubmit} className="auth-form">
              {/* Candidate Quick Profile Preview with Photo */}
              {tab === 'candidate' && (
                <div className="candidate-login-photo-card">
                  <img
                    src="/PHOTO.jpg"
                    alt="Registered Candidate"
                    className="login-candidate-thumb"
                  />
                  <div className="login-candidate-meta">
                    <strong className="login-candidate-name">Hardik Yash Raj</strong>
                    <span className="login-candidate-roll">Roll No: TGC141/2026/88921</span>
                    <span className="login-candidate-status">
                      <ShieldCheck size={12} /> DigiLocker Verified Profile
                    </span>
                  </div>
                  <button
                    type="button"
                    className="demo-autofill-btn"
                    onClick={() => handleFillDemo('candidate')}
                  >
                    Use Profile
                  </button>
                </div>
              )}

              {/* Quick Demo Credentials Autofill Banner */}
              <div className="demo-helper-box">
                <span>Testing Demo Mode:</span>
                <button
                  type="button"
                  className="demo-autofill-link"
                  onClick={() => handleFillDemo(tab)}
                >
                  ⚡ Autofill 1-Click Demo Credentials
                </button>
              </div>

              <div className="form-field">
                <label htmlFor="auth-email">
                  {tab === 'officer' ? 'Roll Number / Registered Email' : 'User Name / Registered Email ID'}
                </label>
                <div className="input-group-icon">
                  <Mail size={16} className="field-icon" />
                  <input
                    id="auth-email"
                    type="text"
                    required
                    placeholder={tab === 'officer' ? 'e.g. TGC141/2026/88921' : 'e.g. candidate@example.com'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="auth-pass">Password</label>
                <div className="input-group-icon">
                  <Lock size={16} className="field-icon" />
                  <input
                    id="auth-pass"
                    type="password"
                    required
                    placeholder="Enter candidate password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Captcha Security */}
              <div className="form-field">
                <label htmlFor="auth-captcha">Security Captcha</label>
                <div className="captcha-row">
                  <div className="captcha-display" aria-label={`Captcha code ${captchaCode}`}>
                    <span className="captcha-text">{captchaCode}</span>
                    <button
                      type="button"
                      className="captcha-reload-btn"
                      onClick={refreshCaptcha}
                      title="Reload Captcha"
                    >
                      <RefreshCw size={13} />
                    </button>
                  </div>
                  <input
                    id="auth-captcha"
                    type="text"
                    required
                    maxLength={5}
                    placeholder="Enter code"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    className="captcha-input"
                  />
                </div>
              </div>

              <div className="form-extra-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember my login</span>
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); addToast('Password reset link sent to demo registered email.', 'info'); }} className="forgot-link">
                  Forgot Password?
                </a>
              </div>

              <button type="submit" className="btn btn-primary auth-submit-btn">
                <span>Secure Sign In</span>
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="auth-form">
              <div className="form-field">
                <label htmlFor="reg-name">Candidate Full Name (As per Matriculation Certificate)</label>
                <div className="input-group-icon">
                  <User size={16} className="field-icon" />
                  <input
                    id="reg-name"
                    type="text"
                    required
                    placeholder="e.g. Hardik Yash Raj"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="reg-email">Active Email ID (For Admit Card & Notifications)</label>
                <div className="input-group-icon">
                  <Mail size={16} className="field-icon" />
                  <input
                    id="reg-email"
                    type="email"
                    required
                    placeholder="candidate@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-field">
                  <label htmlFor="reg-phone">Mobile Number</label>
                  <input
                    id="reg-phone"
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="9876543210"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="reg-aadhaar">Mock Aadhaar No (12 Digits)</label>
                  <input
                    id="reg-aadhaar"
                    type="text"
                    maxLength={12}
                    placeholder="XXXX-XXXX-XXXX"
                    value={regAadhaar}
                    onChange={(e) => setRegAadhaar(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="reg-pass">Create Password (Min 8 Characters)</label>
                <div className="input-group-icon">
                  <Lock size={16} className="field-icon" />
                  <input
                    id="reg-pass"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={regPass}
                    onChange={(e) => setRegPass(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-gold auth-submit-btn">
                <span>Verify & Create Account</span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>

        {/* Footer Security Note */}
        <div className="auth-footer-notice">
          <ShieldCheck size={14} className="security-icon" />
          <span>Secured with 256-bit encryption. NIC Government Cloud Gateway.</span>
        </div>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(8, 14, 9, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .auth-modal-dialog {
          background: #ffffff;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-subtle);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
          width: 100%;
          max-width: 520px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          max-height: calc(100vh - 48px);
        }

        [data-theme='dark'] .auth-modal-dialog {
          background: var(--army-dark);
          border-color: var(--border-medium);
        }

        .auth-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-subtle);
          background: var(--bg-surface-subtle);
        }

        .auth-brand-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .auth-modal-title {
          font-family: var(--font-display);
          font-size: 0.9375rem;
          font-weight: 800;
          color: var(--army-primary);
          letter-spacing: 0.04em;
        }

        [data-theme='dark'] .auth-modal-title {
          color: #ffffff;
        }

        .auth-modal-sub {
          font-size: 0.6875rem;
          color: var(--text-muted);
          font-weight: 600;
          letter-spacing: 0.06em;
          display: block;
        }

        .modal-close-btn {
          color: var(--text-muted);
          padding: 4px;
          border-radius: var(--radius-xs);
          transition: all var(--transition-fast);
        }

        .modal-close-btn:hover {
          color: var(--text-primary);
          background: var(--bg-surface);
        }

        /* Tabs */
        .auth-tabs {
          position: relative;
          display: flex;
          background: rgba(0, 0, 0, 0.04);
          border-bottom: 1px solid var(--border-subtle);
          padding: 6px;
          gap: 4px;
        }

        [data-theme='dark'] .auth-tabs {
          background: rgba(0, 0, 0, 0.25);
          border-color: rgba(255, 255, 255, 0.08);
        }

        /* Animated Sliding Liquid Glass Auth Pill */
        .sliding-glass-auth-pill {
          position: absolute;
          left: 0;
          top: 0;
          border-radius: var(--radius-sm);
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.98) 0%,
            rgba(245, 249, 246, 0.95) 50%,
            rgba(235, 243, 238, 0.9) 100%
          );
          backdrop-filter: blur(16px) saturate(200%);
          -webkit-backdrop-filter: blur(16px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow:
            0 6px 16px -2px rgba(27, 60, 36, 0.18),
            0 2px 5px rgba(0, 0, 0, 0.06),
            inset 0 1.5px 2px rgba(255, 255, 255, 1),
            inset 0 -1px 2px rgba(0, 0, 0, 0.04);
          pointer-events: none;
          z-index: 1;
          transition: transform 0.28s cubic-bezier(0.19, 1, 0.22, 1),
                      width 0.28s cubic-bezier(0.19, 1, 0.22, 1),
                      height 0.28s cubic-bezier(0.19, 1, 0.22, 1),
                      opacity 0.2s ease;
          will-change: transform, width;
        }

        [data-theme='dark'] .sliding-glass-auth-pill {
          background: linear-gradient(
            145deg,
            rgba(45, 80, 56, 0.94) 0%,
            rgba(28, 50, 35, 0.9) 50%,
            rgba(22, 38, 27, 0.94) 100%
          );
          border: 1px solid rgba(197, 155, 39, 0.65);
          box-shadow:
            0 6px 20px rgba(0, 0, 0, 0.55),
            0 0 16px rgba(197, 155, 39, 0.35),
            inset 0 1.5px 2px rgba(255, 255, 255, 0.45),
            inset 0 -1px 2px rgba(0, 0, 0, 0.35);
        }

        .auth-tab {
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 8px;
          font-family: var(--font-display);
          font-size: 0.78125rem;
          font-weight: 700;
          color: var(--text-muted);
          background: transparent;
          border: none;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: color 0.2s ease, transform 0.16s cubic-bezier(0.34, 1.56, 0.64, 1);
          user-select: none;
        }

        .auth-tab:hover {
          color: var(--text-primary);
          transform: scale(1.02);
        }

        .auth-tab:active {
          transform: scale(0.96);
        }

        [data-theme='dark'] .auth-tab:hover {
          color: #ffffff;
        }

        .auth-tab.active {
          color: var(--army-primary);
          font-weight: 800;
          background: transparent;
          box-shadow: none;
        }

        [data-theme='dark'] .auth-tab.active {
          color: var(--gold-light);
          background: transparent;
          box-shadow: none;
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
        }

        /* Form */
        .auth-body {
          padding: 24px;
          overflow-y: auto;
        }

        .auth-continue-notice {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          background: rgba(197, 155, 39, 0.1);
          border: 1px solid rgba(197, 155, 39, 0.25);
          color: var(--text-secondary);
          font-size: 0.75rem;
          font-weight: 600;
          line-height: 1.4;
        }

        .auth-continue-notice svg {
          color: var(--gold-dark);
          flex-shrink: 0;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .candidate-login-photo-card {
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: var(--shadow-sm);
        }

        .login-candidate-thumb {
          width: 44px;
          height: 48px;
          object-fit: cover;
          border-radius: var(--radius-xs);
          border: 1.5px solid var(--gold-primary);
          flex-shrink: 0;
        }

        .login-candidate-meta {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .login-candidate-name {
          font-family: var(--font-display);
          font-size: 0.84375rem;
          color: var(--text-primary);
          font-weight: 800;
        }

        .login-candidate-roll {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--text-secondary);
        }

        .login-candidate-status {
          font-size: 0.65625rem;
          color: #16a34a;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 3px;
        }

        .demo-autofill-btn {
          font-size: 0.71875rem;
          font-weight: 700;
          padding: 5px 10px;
          border-radius: var(--radius-xs);
          background: var(--army-primary);
          color: #ffffff;
          transition: all var(--transition-fast);
        }

        [data-theme='dark'] .demo-autofill-btn {
          background: var(--gold-primary);
          color: #0d1a0f;
        }

        .demo-helper-box {
          background: rgba(197, 155, 39, 0.12);
          border: 1px dashed var(--gold-primary);
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--text-primary);
        }

        .demo-autofill-link {
          font-weight: 800;
          color: var(--gold-dark);
          text-decoration: underline;
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

        .input-group-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .field-icon {
          position: absolute;
          left: 12px;
          color: var(--text-muted);
        }

        .input-group-icon input,
        .form-field input {
          width: 100%;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-medium);
          background: var(--bg-surface);
          color: var(--text-primary);
          font-size: 0.875rem;
          outline: none;
          transition: all var(--transition-fast);
        }

        .input-group-icon input {
          padding-left: 38px;
        }

        .input-group-icon input:focus,
        .form-field input:focus {
          border-color: var(--army-primary);
          box-shadow: 0 0 0 3px rgba(27, 48, 34, 0.1);
        }

        .captcha-row {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 12px;
        }

        .captcha-display {
          background: #e2e8f0;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          padding: 8px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          letter-spacing: 0.25em;
          user-select: none;
        }

        [data-theme='dark'] .captcha-display {
          background: #1e293b;
        }

        .captcha-text {
          font-family: var(--font-mono);
          font-weight: 900;
          font-size: 1rem;
          color: var(--army-primary);
          text-decoration: line-through;
        }

        [data-theme='dark'] .captcha-text {
          color: var(--gold-light);
        }

        .captcha-reload-btn {
          color: var(--text-muted);
        }

        .form-extra-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.78125rem;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          cursor: pointer;
        }

        .forgot-link {
          color: var(--army-primary);
          font-weight: 600;
        }

        [data-theme='dark'] .forgot-link {
          color: var(--gold-light);
        }

        .auth-submit-btn {
          width: 100%;
          padding: 12px;
          margin-top: 4px;
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .auth-footer-notice {
          padding: 10px 20px;
          background: var(--bg-surface-subtle);
          border-top: 1px solid var(--border-subtle);
          font-size: 0.71875rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .security-icon {
          color: #16a34a;
        }
      `}</style>
    </div>
  );
};

export default AuthModal;
