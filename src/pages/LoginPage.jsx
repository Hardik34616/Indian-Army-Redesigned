import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import armyMottoImage from '../../Gemini_Generated_Image_8ssw2d8ssw2d8ssw.png';
import {
  User,
  Lock,
  Mail,
  ShieldCheck,
  RefreshCw,
  ArrowRight,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  Globe,
  Sun,
  Moon,
  Home,
  CheckCircle2,
  Phone,
  CreditCard,
  Volume2,
  VolumeX,
  Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const ACADEMY_SLIDES = [
  {
    id: 'indian-army-motto',
    code: 'IA',
    title: 'INDIAN ARMY',
    highlight: '(SERVICE BEFORE SELF)',
    tagline: 'A timeless commitment to duty, honour and the nation — service before self.',
    image: armyMottoImage,
    location: 'Indian Army'
  },
  {
    id: 'ima',
    code: 'IMA',
    title: 'INDIAN MILITARY ACADEMY',
    highlight: '(IMA)',
    tagline: 'Where future leaders are forged with courage, discipline and unwavering commitment to the nation.',
    image: '/assets/academy/IMA.png',
    location: 'Dehradun, Uttarakhand'
  },
  {
    id: 'nda',
    code: 'NDA',
    title: 'NATIONAL DEFENCE ACADEMY',
    highlight: '(NDA)',
    tagline: 'The cradle of military leadership and the world’s premier tri-services training institution.',
    image: '/assets/academy/NDA.png',
    location: 'Khadakwasla, Pune'
  },
  {
    id: 'ota',
    code: 'OTA',
    title: 'OFFICERS TRAINING ACADEMY',
    highlight: '(OTA)',
    tagline: 'Transforming graduates into commissioned leaders through relentless tactical and physical mastery.',
    image: '/assets/academy/OTA.png',
    location: 'Chennai, Tamil Nadu'
  },
  {
    id: 'grand-pop',
    code: 'GP',
    title: 'IMA PASSING OUT PARADE',
    highlight: '(WITNESS THE MAKING OF WARRIORS)',
    tagline: 'A proud ceremony where Gentleman Cadets take their final step towards becoming commissioned officers.',
    ctaHref: 'https://joinindianarmy.nic.in/',
    videoId: 'pdyaFlOE_qM',
    startAt: 0,
    location: 'Indian Military Academy, Dehradun'
  },
  {
    id: 'special-forces',
    code: 'SF',
    title: 'SPECIAL FORCES',
    highlight: '(INDIAN ARMY)',
    tagline: 'Elite warriors, forged for the most demanding missions with precision, courage and an unbreakable spirit.',
    videoId: 'huf6NS8qB2Y',
    startAt: 25,
    location: 'Across the Nation'
  }
];

const LoginPage = () => {
  const { user, login, addToast, theme, setTheme, language, setLanguage } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect destination if coming from protected route
  const destination = location.state?.from?.pathname || '/dashboard';

  // Tabs: 'candidate' | 'officer' | 'register'
  const [tab, setTab] = useState('candidate');

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaCode, setCaptchaCode] = useState('7K9P4');
  const [captchaInput, setCaptchaInput] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Registration form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regAadhaar, setRegAadhaar] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regCaptcha, setRegCaptcha] = useState('');

  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    setIsVideoMuted(Boolean(ACADEMY_SLIDES[currentSlide].videoId));
  }, [currentSlide]);

  const handleToggleVideoAudio = () => {
    const frame = document.querySelector('.slide-video-layer.active iframe');
    frame?.contentWindow?.postMessage(JSON.stringify({
      event: 'command',
      func: isVideoMuted ? 'unMute' : 'mute',
      args: []
    }), 'https://www.youtube.com');
    if (isVideoMuted) {
      frame?.contentWindow?.postMessage(JSON.stringify({
        event: 'command',
        func: 'setVolume',
        args: [100]
      }), 'https://www.youtube.com');
    }
    setIsVideoMuted((muted) => !muted);
  };

  // Auto-advance slideshow
  useEffect(() => {
    // Keep the video slide on screen until the user chooses another slide.
    if (isPaused || ACADEMY_SLIDES[currentSlide].videoId) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ACADEMY_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide, isPaused]);

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

  const handleUseProfile = (role) => {
    if (role === 'officer') {
      login('sandeep.varma@nic.in', 'officer');
      addToast('Signed in as Major Sandeep Varma (Officer Candidate)', 'success');
    } else {
      login('vikram.sharma@example.com', 'candidate');
      addToast('Signed in as Hardik Yash Raj (DigiLocker Verified)', 'success');
    }
    navigate(destination);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (captchaInput.toUpperCase() !== captchaCode) {
      addToast('Invalid Security Captcha code entered. Please try again.', 'error');
      refreshCaptcha();
      return;
    }
    login(email, tab === 'officer' ? 'officer' : 'candidate');
    addToast(`Welcome back, ${tab === 'officer' ? 'Officer Candidate' : 'Hardik'}!`, 'success');
    navigate(destination);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPhone || regPhone.length !== 10) {
      addToast('Please fill all mandatory fields with a valid 10-digit mobile number.', 'error');
      return;
    }
    if (regCaptcha.toUpperCase() !== captchaCode) {
      addToast('Invalid Security Captcha code.', 'error');
      refreshCaptcha();
      return;
    }
    login(regEmail, 'candidate');
    addToast('Aadhaar verified! Candidate registration successful.', 'success');
    navigate(destination);
  };

  const activeSlideData = ACADEMY_SLIDES[currentSlide];

  return (
    <div className="fullscreen-login-layout" id="main-content">
      {/* =========================================================================
          LEFT SIDE: CINEMATIC ACADEMY SLIDESHOW (~68% WIDTH)
          ========================================================================= */}
      <section
        className="login-visual-panel"
        aria-label="Prestigious Academies Slideshow"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Slides Images Background with Fade Transitions */}
        <div className="slides-container">
          {ACADEMY_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`slide-image-layer ${slide.videoId ? 'slide-video-layer' : ''} ${idx === currentSlide ? 'active' : ''}`}
              style={slide.image ? { backgroundImage: `url(${slide.image})` } : undefined}
              role={slide.videoId ? undefined : 'img'}
              aria-label={slide.title}
            >
              {slide.videoId && idx === currentSlide && (
                <iframe
                  src={`https://www.youtube.com/embed/${slide.videoId}?autoplay=1&mute=1&start=${slide.startAt ?? 0}&controls=0&disablekb=1&modestbranding=1&rel=0&playsinline=1&loop=1&playlist=${slide.videoId}&iv_load_policy=3&fs=0&enablejsapi=1`}
                  title={slide.title}
                  aria-hidden="true"
                  tabIndex={-1}
                  allow="autoplay; encrypted-media"
                />
              )}
            </div>
          ))}
        </div>

        {/* Adaptive Light/Dark Clean Overlay */}
        <div className="slide-overlay-veil" />

        {/* Top Left Branding Header */}
        <div className="slide-top-header">
          <Link to="/" className="army-emblem-brand" title="Return to Portal Home">
            <img
              src="/Logo.png"
              alt="Indian Army Emblem"
              className="brand-logo-img"
              width="44"
              height="44"
            />
            <div className="brand-text-block">
              <span className="brand-title">JOIN INDIAN ARMY</span>
              <span className="brand-sub">GOVERNMENT OF INDIA</span>
            </div>
          </Link>
        </div>

        {/* Bottom Left Minimal Slide Caption & Controls */}
        <div className="slide-bottom-footer">
          <div className="slide-caption-block">
            <div className="slide-accent-dash" />
            <h2 className="slide-academy-title">
              {activeSlideData.title} <span className="slide-title-highlight">{activeSlideData.highlight}</span>
            </h2>
            <p className="slide-tagline-text">
              {activeSlideData.tagline}
              {activeSlideData.ctaHref && (
                <>
                  {' '}
                  <a
                    className="slide-caption-link"
                    href={activeSlideData.ctaHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Get tickets at the Official Indian Army Website
                  </a>
                </>
              )}
            </p>
          </div>

          <div className="slide-controls-row">
            {/* Slide Navigation Bars/Dots */}
            <div className="slide-indicators-group" role="tablist" aria-label="Slideshow Indicators">
              {ACADEMY_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  className={`slide-indicator-bar ${idx === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}: ${slide.code}`}
                  aria-selected={idx === currentSlide}
                  role="tab"
                />
              ))}
            </div>

            {/* Circular Next & Prev Arrow Buttons */}
            <div className="slide-arrow-buttons">
              {activeSlideData.videoId && (
                <button
                  type="button"
                  className="slide-circle-btn slide-video-audio-btn"
                  onClick={handleToggleVideoAudio}
                  aria-label={isVideoMuted ? 'Unmute Special Forces video' : 'Mute Special Forces video'}
                  title={isVideoMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isVideoMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
                </button>
              )}
              <button
                type="button"
                className="slide-circle-btn"
                onClick={() => setCurrentSlide((prev) => (prev - 1 + ACADEMY_SLIDES.length) % ACADEMY_SLIDES.length)}
                aria-label="Previous Slide"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                className="slide-circle-btn"
                onClick={() => setCurrentSlide((prev) => (prev + 1) % ACADEMY_SLIDES.length)}
                aria-label="Next Slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          RIGHT SIDE: RECRUITMENT LOGIN PANEL (~32% WIDTH)
          ========================================================================= */}
      <aside className="login-form-panel" aria-label="Official Recruitment Login">
        {/* Top Control Bar: Language Dropdown, Theme Toggle & Home Button */}
        <div className="login-top-toolbar">
          <div className="toolbar-left">
            <Link to="/" className="portal-home-link" title="Go to Join Indian Army Home">
              <Home size={15} />
              <span>Portal Home</span>
            </Link>
          </div>

          <div className="toolbar-right">
            {/* Theme Switcher */}
            <button
              type="button"
              className="toolbar-icon-btn"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

          </div>
        </div>

        {/* Scrollable Form Content Body */}
        <div className="login-panel-content">
          {/* Header Title & Crest */}
          <div className="login-panel-header">
            <img
              src="/Logo.png"
              alt="Indian Army Emblem"
              className="login-emblem-gold"
              width="48"
              height="48"
            />
            <div className="login-heading-group">
              <h1 className="login-main-title">RECRUITMENT LOGIN</h1>
              <span className="login-sub-title">DIRECTORATE GENERAL OF RECRUITING</span>
            </div>
          </div>

          {/* 3 Clean 2D Flat Navigation Tabs */}
          <div className="login-tabs-nav" role="tablist">
            <button
              type="button"
              className={`login-nav-tab ${tab === 'candidate' ? 'active' : ''}`}
              onClick={() => setTab('candidate')}
              role="tab"
              aria-selected={tab === 'candidate'}
            >
              <User size={15} />
              <span>Agniveer / JCO Login</span>
            </button>

            <button
              type="button"
              className={`login-nav-tab ${tab === 'officer' ? 'active' : ''}`}
              onClick={() => setTab('officer')}
              role="tab"
              aria-selected={tab === 'officer'}
            >
              <ShieldCheck size={15} />
              <span>Officer Candidate</span>
            </button>

            <button
              type="button"
              className={`login-nav-tab ${tab === 'register' ? 'active' : ''}`}
              onClick={() => setTab('register')}
              role="tab"
              aria-selected={tab === 'register'}
            >
              <UserPlus size={15} />
              <span>New Registration</span>
            </button>
          </div>

          {/* TAB 1: AGNIVEER / JCO CANDIDATE LOGIN */}
          {tab === 'candidate' && (
            <div className="tab-pane-form animate-fade-in">
              {/* Candidate Quick Profile Card */}
              <div className="login-profile-card">
                <img
                  src="/PHOTO.jpg"
                  alt="Hardik Yash Raj"
                  className="profile-avatar-img"
                  width="48"
                  height="48"
                />
                <div className="profile-card-info">
                  <strong className="profile-card-name">Hardik Yash Raj</strong>
                  <span className="profile-card-roll">Roll No: TGC141/2026/88921</span>
                  <span className="profile-card-verified">
                    <CheckCircle2 size={12} /> DigiLocker Verified Profile
                  </span>
                </div>
                <button
                  type="button"
                  className="btn-use-profile"
                  onClick={() => handleUseProfile('candidate')}
                >
                  Use Profile
                </button>
              </div>

              {/* Demo Mode 1-Click Autofill Banner */}
              <div className="demo-mode-strip">
                <span className="demo-strip-label">Testing Demo Mode:</span>
                <button
                  type="button"
                  className="btn-demo-autofill"
                  onClick={() => handleFillDemo('candidate')}
                >
                  <Zap size={13} />
                  <span>Autofill 1-Click Demo Credentials</span>
                </button>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="login-form-element">
                <div className="form-input-group">
                  <label htmlFor="cand-username">User Name / Registered Email ID</label>
                  <div className="input-field-wrapper">
                    <Mail size={16} className="input-leading-icon" />
                    <input
                      id="cand-username"
                      type="text"
                      placeholder="e.g. candidate@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-input-group">
                  <label htmlFor="cand-password">Password</label>
                  <div className="input-field-wrapper">
                    <Lock size={16} className="input-leading-icon" />
                    <input
                      id="cand-password"
                      type="password"
                      placeholder="Enter candidate password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-input-group">
                  <label>Security Captcha</label>
                  <div className="captcha-row-layout">
                    <div className="captcha-code-box" aria-label={`Captcha: ${captchaCode}`}>
                      <span className="captcha-text-chars">{captchaCode}</span>
                    </div>
                    <button
                      type="button"
                      className="captcha-refresh-btn"
                      onClick={refreshCaptcha}
                      title="Refresh Captcha"
                      aria-label="Refresh Captcha Code"
                    >
                      <RefreshCw size={15} />
                    </button>
                    <input
                      type="text"
                      className="captcha-input-field"
                      placeholder="Enter code"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      maxLength={6}
                      required
                    />
                  </div>
                </div>

                <div className="form-remember-row">
                  <label className="remember-checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Remember my login</span>
                  </label>
                  <button
                    type="button"
                    className="forgot-password-link"
                    onClick={() => addToast('Password reset link sent to your registered email.', 'info')}
                  >
                    Forgot Password?
                  </button>
                </div>

                <button type="submit" className="btn-primary-sign-in">
                  <span>Secure Sign In</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: OFFICER CANDIDATE LOGIN */}
          {tab === 'officer' && (
            <div className="tab-pane-form animate-fade-in">
              {/* Officer Candidate Profile Card */}
              <div className="login-profile-card">
                <img
                  src="/PHOTO.jpg"
                  alt="Major Sandeep Varma"
                  className="profile-avatar-img"
                  width="48"
                  height="48"
                />
                <div className="profile-card-info">
                  <strong className="profile-card-name">Major Sandeep Varma</strong>
                  <span className="profile-card-roll">Roll No: OFF/2026/68901</span>
                  <span className="profile-card-verified">
                    <CheckCircle2 size={12} /> Service Selection Verified
                  </span>
                </div>
                <button
                  type="button"
                  className="btn-use-profile"
                  onClick={() => handleUseProfile('officer')}
                >
                  Use Profile
                </button>
              </div>

              {/* Demo Mode Autofill */}
              <div className="demo-mode-strip">
                <span className="demo-strip-label">Testing Demo Mode:</span>
                <button
                  type="button"
                  className="btn-demo-autofill"
                  onClick={() => handleFillDemo('officer')}
                >
                  <Zap size={13} />
                  <span>Autofill Officer Credentials</span>
                </button>
              </div>

              <form onSubmit={handleLoginSubmit} className="login-form-element">
                <div className="form-input-group">
                  <label htmlFor="officer-email">Officer Registered Email ID / Service ID</label>
                  <div className="input-field-wrapper">
                    <Mail size={16} className="input-leading-icon" />
                    <input
                      id="officer-email"
                      type="text"
                      placeholder="e.g. officer.candidate@joinindianarmy.nic.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-input-group">
                  <label htmlFor="officer-pass">Password</label>
                  <div className="input-field-wrapper">
                    <Lock size={16} className="input-leading-icon" />
                    <input
                      id="officer-pass"
                      type="password"
                      placeholder="Enter officer candidate password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-input-group">
                  <label>Security Captcha</label>
                  <div className="captcha-row-layout">
                    <div className="captcha-code-box">
                      <span className="captcha-text-chars">{captchaCode}</span>
                    </div>
                    <button
                      type="button"
                      className="captcha-refresh-btn"
                      onClick={refreshCaptcha}
                      title="Refresh Captcha"
                    >
                      <RefreshCw size={15} />
                    </button>
                    <input
                      type="text"
                      className="captcha-input-field"
                      placeholder="Enter code"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      maxLength={6}
                      required
                    />
                  </div>
                </div>

                <div className="form-remember-row">
                  <label className="remember-checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Remember my login</span>
                  </label>
                  <button
                    type="button"
                    className="forgot-password-link"
                    onClick={() => addToast('Officer OTP sent to your registered mobile and official email.', 'info')}
                  >
                    Forgot Password?
                  </button>
                </div>

                <button type="submit" className="btn-primary-sign-in">
                  <span>Secure Sign In</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: NEW CANDIDATE REGISTRATION */}
          {tab === 'register' && (
            <div className="tab-pane-form animate-fade-in">
              <div className="register-info-box">
                <strong>Direct Aadhaar Verified Registration</strong>
                <p>New candidates can register instantly using their Aadhaar Number and Matriculation credentials.</p>
              </div>

              <form onSubmit={handleRegisterSubmit} className="login-form-element">
                <div className="form-input-group">
                  <label htmlFor="reg-name">Candidate Full Name (As per Matric Cert)</label>
                  <div className="input-field-wrapper">
                    <User size={16} className="input-leading-icon" />
                    <input
                      id="reg-name"
                      type="text"
                      placeholder="e.g. Hardik Yash Raj"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-input-group">
                  <label htmlFor="reg-email">Email Address</label>
                  <div className="input-field-wrapper">
                    <Mail size={16} className="input-leading-icon" />
                    <input
                      id="reg-email"
                      type="email"
                      placeholder="e.g. candidate@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-input-group">
                  <label htmlFor="reg-phone">Mobile Number (10 Digits Only)</label>
                  <div className="input-field-wrapper">
                    <Phone size={16} className="input-leading-icon" />
                    <input
                      id="reg-phone"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="e.g. 9876543210"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      required
                    />
                  </div>
                </div>

                <div className="form-input-group">
                  <label htmlFor="reg-aadhaar">Aadhaar Number (12 Digits)</label>
                  <div className="input-field-wrapper">
                    <CreditCard size={16} className="input-leading-icon" />
                    <input
                      id="reg-aadhaar"
                      type="text"
                      maxLength={14}
                      placeholder="XXXX-XXXX-XXXX"
                      value={regAadhaar}
                      onChange={(e) => setRegAadhaar(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-input-group">
                  <label htmlFor="reg-pass">Create Password</label>
                  <div className="input-field-wrapper">
                    <Lock size={16} className="input-leading-icon" />
                    <input
                      id="reg-pass"
                      type="password"
                      placeholder="Minimum 8 characters with symbol"
                      value={regPass}
                      onChange={(e) => setRegPass(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-input-group">
                  <label>Security Captcha</label>
                  <div className="captcha-row-layout">
                    <div className="captcha-code-box">
                      <span className="captcha-text-chars">{captchaCode}</span>
                    </div>
                    <button
                      type="button"
                      className="captcha-refresh-btn"
                      onClick={refreshCaptcha}
                      title="Refresh Captcha"
                    >
                      <RefreshCw size={15} />
                    </button>
                    <input
                      type="text"
                      className="captcha-input-field"
                      placeholder="Enter code"
                      value={regCaptcha}
                      onChange={(e) => setRegCaptcha(e.target.value)}
                      maxLength={6}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary-sign-in">
                  <span>Register & Verify with Aadhaar</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          )}

          {/* Bottom Security Notice */}
          <div className="login-security-notice">
            <ShieldCheck size={16} className="security-icon" />
            <span>Secured with 256-bit encryption. NIC Government Cloud Gateway.</span>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          EMBEDDED CLEAN 2D FLAT CSS DESIGN SYSTEM
          ========================================================================= */}
      <style>{`
        /* Reset and Layout */
        .fullscreen-login-layout {
          width: 100vw;
          min-height: 100vh;
          height: 100vh;
          display: grid;
          grid-template-columns: 1fr 480px;
          background-color: var(--bg-app);
          overflow: hidden;
          font-family: var(--font-sans);
          position: fixed;
          inset: 0;
          z-index: 100;
        }

        /* -------------------------------------------------------------
           LEFT: CINEMATIC SLIDESHOW (~68%)
           ------------------------------------------------------------- */
        .login-visual-panel {
          position: relative;
          height: 100%;
          overflow: hidden;
          background-color: #0b140e;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 36px 44px;
        }

        .slides-container {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .slide-image-layer {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center center;
          opacity: 0;
          transform: scale(1.04);
          transition: opacity 1.2s ease-in-out, transform 2.4s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        .slide-image-layer.active {
          opacity: 1;
          transform: scale(1);
        }

        .slide-video-layer {
          overflow: hidden;
          background: #07100a;
        }

        .slide-video-layer iframe {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          border: 0;
          transform: translate(-50%, -50%) scale(1.35);
          pointer-events: none;
        }

        /* Subtle Adaptive Overlay: Light vs Dark */
        .slide-overlay-veil {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          transition: background 0.4s ease;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.62) 0%,
            rgba(255, 255, 255, 0.12) 35%,
            rgba(255, 255, 255, 0.68) 80%,
            rgba(255, 255, 255, 0.9) 100%
          );
        }

        [data-theme='dark'] .slide-overlay-veil {
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.28) 35%,
            rgba(8, 14, 10, 0.76) 80%,
            rgba(8, 14, 10, 0.92) 100%
          );
        }

        /* Top Left Emblem Header */
        .slide-top-header {
          position: relative;
          z-index: 10;
        }

        .army-emblem-brand {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          text-decoration: none;
        }

        .brand-logo-img {
          width: 44px;
          height: 44px;
          object-fit: contain;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
        }

        .brand-text-block {
          display: flex;
          flex-direction: column;
        }

        .brand-title {
          font-family: var(--font-display);
          font-size: 1.0625rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          color: #0f172a;
          line-height: 1.2;
        }

        .brand-sub {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #475569;
        }

        [data-theme='dark'] .brand-title {
          color: #ffffff;
        }

        [data-theme='dark'] .brand-sub {
          color: #94a3b8;
        }

        /* Bottom Slide Caption & Navigation Controls */
        .slide-bottom-footer {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .slide-caption-block {
          max-width: 640px;
        }

        .slide-accent-dash {
          width: 36px;
          height: 3.5px;
          border-radius: 2px;
          background: #d97706;
          margin-bottom: 12px;
        }

        .slide-academy-title {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: 0.02em;
          color: #143d22;
          margin: 0 0 8px;
          line-height: 1.2;
        }

        [data-theme='dark'] .slide-academy-title {
          color: #ffffff;
        }

        .slide-title-highlight {
          color: #b45309;
        }

        [data-theme='dark'] .slide-title-highlight {
          color: #f59e0b;
        }

        .slide-tagline-text {
          font-size: 0.9375rem;
          color: #334155;
          line-height: 1.5;
          margin: 0;
          max-width: 580px;
        }

        .slide-caption-link {
          color: #166534;
          font-weight: 800;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .slide-caption-link:hover {
          color: #b45309;
        }

        [data-theme='dark'] .slide-tagline-text {
          color: #cbd5e1;
        }

        [data-theme='dark'] .slide-caption-link {
          color: #86efac;
        }

        [data-theme='dark'] .slide-caption-link:hover {
          color: #fbbf24;
        }

        .slide-controls-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        /* Slide Indicators */
        .slide-indicators-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .slide-indicator-bar {
          width: 20px;
          height: 4px;
          border-radius: 4px;
          border: none;
          background: rgba(15, 23, 42, 0.25);
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .slide-indicator-bar.active {
          width: 44px;
          background: #166534;
        }

        [data-theme='dark'] .slide-indicator-bar {
          background: rgba(255, 255, 255, 0.25);
        }

        [data-theme='dark'] .slide-indicator-bar.active {
          background: #f59e0b;
        }

        /* Arrow Navigation Buttons */
        .slide-arrow-buttons {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .slide-circle-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          color: #1e293b;
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .slide-circle-btn:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          transform: scale(1.05);
        }

        [data-theme='dark'] .slide-circle-btn {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.18);
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        [data-theme='dark'] .slide-circle-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.35);
        }

        /* -------------------------------------------------------------
           RIGHT: RECRUITMENT LOGIN PANEL (~32%)
           ------------------------------------------------------------- */
        .login-form-panel {
          height: 100%;
          background: #ffffff;
          border-left: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          position: relative;
          z-index: 10;
        }

        [data-theme='dark'] .login-form-panel {
          background: #0d1610;
          border-left: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* Top Toolbar */
        .login-top-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          border-bottom: 1px solid var(--border-subtle);
          flex-shrink: 0;
        }

        .portal-home-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78125rem;
          font-weight: 700;
          color: var(--text-secondary);
          text-decoration: none;
          padding: 6px 12px;
          border-radius: 6px;
          border: 1px solid var(--border-subtle);
          background: var(--bg-surface-subtle);
          transition: all 0.2s ease;
        }

        .portal-home-link:hover {
          color: var(--text-primary);
          border-color: #166534;
        }

        .toolbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .toolbar-icon-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: 1px solid var(--border-subtle);
          background: var(--bg-surface);
          color: var(--text-secondary);
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .toolbar-icon-btn:hover {
          color: var(--text-primary);
          border-color: #94a3b8;
        }

        .language-selector-wrap {
          position: relative;
        }

        .language-dropdown-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border-radius: 6px;
          border: 1px solid var(--border-subtle);
          background: var(--bg-surface);
          color: var(--text-primary);
          font-size: 0.78125rem;
          font-weight: 700;
          cursor: pointer;
        }

        .dropdown-caret {
          font-size: 0.8125rem;
          opacity: 0.7;
        }

        .language-popover {
          position: absolute;
          top: calc(100% + 4px);
          right: 0;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
          width: 140px;
          padding: 4px;
          z-index: 100;
        }

        .lang-option {
          width: 100%;
          text-align: left;
          padding: 8px 10px;
          border-radius: 4px;
          border: none;
          background: none;
          font-size: 0.78125rem;
          color: var(--text-primary);
          cursor: pointer;
        }

        .lang-option:hover {
          background: var(--bg-surface-subtle);
        }

        .lang-option.active {
          font-weight: 700;
          color: #166534;
        }

        [data-theme='dark'] .lang-option.active {
          color: #4ade80;
        }

        /* Content Body */
        .login-panel-content {
          padding: 28px 32px 36px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .login-panel-header {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .login-emblem-gold {
          width: 48px;
          height: 48px;
          object-fit: contain;
          flex-shrink: 0;
        }

        .login-heading-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .login-main-title {
          font-family: var(--font-display);
          font-size: 1.1875rem;
          font-weight: 800;
          letter-spacing: 0.03em;
          color: var(--text-primary);
          margin: 0;
        }

        .login-sub-title {
          font-size: 0.6875rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: var(--text-muted);
        }

        /* 3 Flat Clean Tabs */
        .login-tabs-nav {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          background: var(--bg-surface-subtle);
          padding: 4px;
          border-radius: 8px;
          border: 1px solid var(--border-subtle);
        }

        .login-nav-tab {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 6px;
          border-radius: 6px;
          border: 1px solid transparent;
          background: transparent;
          color: var(--text-muted);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .login-nav-tab.active {
          background: var(--bg-surface);
          color: #166534;
          font-weight: 800;
          border-color: #166534;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        [data-theme='dark'] .login-nav-tab.active {
          background: rgba(34, 197, 94, 0.12);
          color: #4ade80;
          border-color: #4ade80;
        }

        /* Candidate Profile Card */
        .login-profile-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid var(--border-subtle);
          background: var(--bg-surface);
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02);
        }

        .profile-avatar-img {
          width: 44px;
          height: 44px;
          border-radius: 6px;
          object-fit: cover;
          border: 1px solid var(--border-subtle);
          flex-shrink: 0;
        }

        .profile-card-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
          min-width: 0;
        }

        .profile-card-name {
          font-size: 0.875rem;
          font-weight: 800;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .profile-card-roll {
          font-size: 0.71875rem;
          color: var(--text-muted);
          font-family: monospace;
        }

        .profile-card-verified {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.6875rem;
          font-weight: 700;
          color: #16a34a;
        }

        .btn-use-profile {
          background: #166534;
          color: #ffffff;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .btn-use-profile:hover {
          background: #14532d;
        }

        [data-theme='dark'] .btn-use-profile {
          background: #22c55e;
          color: #0b140e;
        }

        [data-theme='dark'] .btn-use-profile:hover {
          background: #4ade80;
        }

        /* Demo Mode Strip */
        .demo-mode-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 6px;
          border: 1px dashed #d97706;
          background: #fffbeb;
        }

        [data-theme='dark'] .demo-mode-strip {
          background: rgba(245, 158, 11, 0.08);
          border-color: rgba(245, 158, 11, 0.35);
        }

        .demo-strip-label {
          font-size: 0.71875rem;
          font-weight: 700;
          color: #92400e;
        }

        [data-theme='dark'] .demo-strip-label {
          color: #fbbf24;
        }

        .btn-demo-autofill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          border: none;
          background: transparent;
          color: #b45309;
          font-size: 0.71875rem;
          font-weight: 800;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s ease;
        }

        .btn-demo-autofill:hover {
          color: #78350f;
          text-decoration: underline;
        }

        [data-theme='dark'] .btn-demo-autofill {
          color: #fde68a;
        }

        [data-theme='dark'] .btn-demo-autofill:hover {
          color: #ffffff;
        }

        /* Form Controls */
        .tab-pane-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .login-form-element {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .form-input-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .form-input-group label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .input-field-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-leading-icon {
          position: absolute;
          left: 12px;
          color: var(--text-muted);
          pointer-events: none;
        }

        .input-field-wrapper input {
          width: 100%;
          padding: 10px 12px 10px 38px;
          border-radius: 6px;
          border: 1px solid var(--border-subtle);
          background: var(--bg-surface);
          color: var(--text-primary);
          font-size: 0.84375rem;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .input-field-wrapper input:focus {
          border-color: #166534;
          box-shadow: 0 0 0 3px rgba(22, 101, 52, 0.12);
        }

        [data-theme='dark'] .input-field-wrapper input:focus {
          border-color: #4ade80;
          box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.15);
        }

        /* Captcha Row */
        .captcha-row-layout {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .captcha-code-box {
          height: 38px;
          padding: 0 14px;
          background: #f1f5f9;
          border: 1px solid var(--border-subtle);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          letter-spacing: 4px;
          font-family: monospace;
          font-size: 1rem;
          font-weight: 800;
          color: #166534;
          text-decoration: line-through;
          background-image: radial-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 0);
          background-size: 4px 4px;
        }

        [data-theme='dark'] .captcha-code-box {
          background: rgba(255, 255, 255, 0.08);
          color: #86efac;
        }

        .captcha-refresh-btn {
          width: 38px;
          height: 38px;
          border-radius: 6px;
          border: 1px solid var(--border-subtle);
          background: var(--bg-surface);
          color: var(--text-secondary);
          display: grid;
          place-items: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .captcha-refresh-btn:hover {
          color: #166534;
          border-color: #166534;
        }

        .captcha-input-field {
          flex: 1;
          height: 38px;
          padding: 0 12px;
          border-radius: 6px;
          border: 1px solid var(--border-subtle);
          background: var(--bg-surface);
          color: var(--text-primary);
          font-size: 0.84375rem;
          outline: none;
          text-transform: uppercase;
        }

        .captcha-input-field:focus {
          border-color: #166534;
          box-shadow: 0 0 0 3px rgba(22, 101, 52, 0.12);
        }

        /* Remember & Forgot Row */
        .form-remember-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.78125rem;
        }

        .remember-checkbox-label {
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          color: var(--text-primary);
        }

        .remember-checkbox-label input {
          accent-color: #166534;
          cursor: pointer;
        }

        .forgot-password-link {
          background: none;
          border: none;
          padding: 0;
          color: #166534;
          font-weight: 700;
          font-size: 0.78125rem;
          cursor: pointer;
        }

        .forgot-password-link:hover {
          text-decoration: underline;
        }

        [data-theme='dark'] .forgot-password-link {
          color: #4ade80;
        }

        /* Solid Deep Army Green Submit Button */
        .btn-primary-sign-in {
          width: 100%;
          padding: 12px 18px;
          border-radius: 6px;
          border: none;
          background: #166534;
          color: #ffffff;
          font-size: 0.90625rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(22, 101, 52, 0.25);
          margin-top: 4px;
        }

        .btn-primary-sign-in:hover {
          background: #14532d;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(22, 101, 52, 0.35);
        }

        [data-theme='dark'] .btn-primary-sign-in {
          background: #15803d;
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        }

        [data-theme='dark'] .btn-primary-sign-in:hover {
          background: #16a34a;
        }

        /* Registration Info Box */
        .register-info-box {
          padding: 10px 12px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 6px;
          font-size: 0.75rem;
          color: #166534;
        }

        [data-theme='dark'] .register-info-box {
          background: rgba(34, 197, 94, 0.1);
          border-color: rgba(34, 197, 94, 0.25);
          color: #86efac;
        }

        .register-info-box strong {
          display: block;
          margin-bottom: 2px;
        }

        .register-info-box p {
          margin: 0;
          line-height: 1.4;
        }

        /* Bottom Security Badge */
        .login-security-notice {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.71875rem;
          color: var(--text-muted);
          padding-top: 8px;
          border-top: 1px solid var(--border-subtle);
          margin-top: auto;
        }

        .security-icon {
          color: #16a34a;
          flex-shrink: 0;
        }

        /* -------------------------------------------------------------
           RESPONSIVENESS (MOBILE & TABLET ADAPTATION)
           ------------------------------------------------------------- */
        @media (max-width: 1024px) {
          .fullscreen-login-layout {
            grid-template-columns: 1fr 440px;
          }
        }

        @media (max-width: 860px) {
          .fullscreen-login-layout {
            grid-template-columns: 1fr;
            height: auto;
            min-height: 100vh;
            overflow-y: auto;
            position: relative;
          }

          .login-visual-panel {
            min-height: 380px;
            padding: 24px;
          }

          .slide-academy-title {
            font-size: 1.35rem;
          }

          .login-form-panel {
            border-left: none;
            border-top: 1px solid var(--border-subtle);
          }

          .login-panel-content {
            padding: 24px 20px 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
