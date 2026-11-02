import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const RegisterPage = () => {
  const { login, addToast } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: 'Hardik Yash Raj',
    email: 'vikram.sharma@example.com',
    mobile: '9876543210',
    aadhaar: '9842-1192-3401',
    password: 'Password@123',
    confirmPassword: 'Password@123',
    acceptedTerms: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile) {
      addToast('Please complete all mandatory registration fields.', 'error');
      return;
    }

    login({
      name: formData.name,
      email: formData.email,
      rollNumber: 'TGC141/2026/' + Math.floor(10000 + Math.random() * 90000)
    });

    addToast('Candidate profile registered successfully with DigiLocker!', 'success');
    navigate('/find-entry');
  };

  return (
    <div className="auth-standalone-page" id="main-content">
      {/* Background Liquid Glass Tricolor Canvas */}
      <div className="register-bg-wrapper" aria-hidden="true">
        <img src="/assets/tricolor-glass-light.jpg" alt="" className="register-bg-img light-img" />
        <img src="/assets/tricolor-glass-dark.jpg" alt="" className="register-bg-img dark-img" />
        <div className="register-bg-overlay" />
      </div>

      <div className="auth-container" style={{ maxWidth: '520px', position: 'relative', zIndex: 1 }}>
        <div className="auth-card animate-fade-in">
          <div className="auth-header">
            <img src="/Logo.png" alt="Indian Army Emblem" width="60" height="60" />
            <h1 className="auth-title">New Candidate Registration</h1>
            <p className="auth-sub">Create your candidate profile to apply for Officer, JCO, or Agniveer entries</p>
          </div>

          <div className="digilocker-badge-box">
            <ShieldCheck size={18} className="digi-icon" />
            <span>Integrated with DigiLocker for instant biometric credential verification</span>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-field">
              <label>Full Name (As per Class 10th Certificate) *</label>
              <div className="input-icon-wrap">
                <User size={16} className="icon-pos" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-field">
                <label>Email Address *</label>
                <div className="input-icon-wrap">
                  <Mail size={16} className="icon-pos" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-field">
                <label>Mobile (For SMS) *</label>
                <div className="input-icon-wrap">
                  <Phone size={16} className="icon-pos" />
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="form-field">
              <label>Mock Aadhaar Number (12 Digits Synthetic)</label>
              <input
                type="text"
                value={formData.aadhaar}
                onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
              />
            </div>

            <div className="form-grid-2">
              <div className="form-field">
                <label>Create Password</label>
                <div className="input-icon-wrap">
                  <Lock size={16} className="icon-pos" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-field">
                <label>Confirm Password</label>
                <div className="input-icon-wrap">
                  <Lock size={16} className="icon-pos" />
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <label className="terms-checkbox-label">
              <input
                type="checkbox"
                checked={formData.acceptedTerms}
                onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
              />
              <span>I agree to receive SMS/Email notifications regarding recruitment rallies and examinations.</span>
            </label>

            <button type="submit" className="btn btn-gold btn-lg submit-btn">
              <span>Register Candidate Profile</span>
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="auth-footer-links">
            <span>Already registered? <Link to="/login">Sign In to Account</Link></span>
          </div>
        </div>
      </div>

      <style>{`
        .auth-standalone-page {
          background-color: var(--bg-app);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 16px 80px;
          position: relative;
          overflow: hidden;
        }

        .register-bg-wrapper {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .register-bg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transition: opacity 0.3s ease;
        }
        .register-bg-img.light-img { opacity: 0.75; display: block; }
        .register-bg-img.dark-img  { opacity: 0; display: none; }
        [data-theme='dark'] .register-bg-img.light-img { opacity: 0; display: none; }
        [data-theme='dark'] .register-bg-img.dark-img  { opacity: 0.85; display: block; }
        .register-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(244,246,248,0.45) 0%, rgba(255,255,255,0.3) 35%, rgba(244,246,248,0.6) 100%);
        }
        [data-theme='dark'] .register-bg-overlay {
          background: linear-gradient(180deg, rgba(11,23,16,0.6) 0%, rgba(18,36,25,0.45) 35%, rgba(11,23,16,0.75) 100%);
        }

        .auth-container {
          width: 100%;
        }

        .auth-card {
          background: rgba(255,255,255,0.78);
          backdrop-filter: blur(18px) saturate(180%);
          -webkit-backdrop-filter: blur(18px) saturate(180%);
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255,255,255,0.5);
          padding: 36px 32px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.06);
        }

        [data-theme='dark'] .auth-card {
          background: rgba(14,28,18,0.8);
          border-color: rgba(255,255,255,0.08);
          box-shadow: 0 8px 32px rgba(0,0,0,0.35);
        }

        .auth-header {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }

        .auth-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 12px 0 4px;
        }

        .auth-sub {
          font-size: 0.8125rem;
          color: var(--text-muted);
        }

        .digilocker-badge-box {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #166534;
          border-radius: var(--radius-sm);
          padding: 8px 12px;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }

        .digi-icon {
          flex-shrink: 0;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .form-field label {
          font-size: 0.71875rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .input-icon-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .icon-pos {
          position: absolute;
          left: 12px;
          color: var(--text-muted);
        }

        .input-icon-wrap input,
        .form-field input {
          width: 100%;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-medium);
          background: var(--bg-surface);
          color: var(--text-primary);
          font-size: 0.875rem;
          outline: none;
        }

        .input-icon-wrap input {
          padding-left: 36px;
        }

        .terms-checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.75rem;
          color: var(--text-secondary);
          line-height: 1.4;
          cursor: pointer;
          margin: 6px 0;
        }

        .terms-checkbox-label input {
          margin-top: 2px;
          accent-color: var(--army-primary);
        }

        .submit-btn {
          width: 100%;
          margin-top: 6px;
        }

        .auth-footer-links {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
          font-size: 0.8125rem;
          color: var(--text-muted);
        }

        .auth-footer-links a {
          color: var(--army-primary);
          font-weight: 700;
        }

        [data-theme='dark'] .auth-footer-links a {
          color: var(--gold-light);
        }

        @media (max-width: 600px) {
          .form-grid-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;
