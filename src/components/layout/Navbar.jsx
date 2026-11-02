import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Search,
  User,
  ChevronDown,
  Menu,
  X,
  Shield,
  Award,
  BookOpen,
  Calendar,
  Compass,
  FileCheck,
  LogOut,
  LayoutDashboard
} from 'lucide-react';

const Navbar = () => {
  const { user, logout, setAuthModal, setSearchModalOpen, language } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navRef = useRef(null);

  const goToSection = (event, item) => {
    if (!item.anchor) {
      setActiveDropdown(null);
      return;
    }

    event.preventDefault();
    setActiveDropdown(null);
    navigate(`/#${item.anchor}`);

    // Allow the home page to mount before moving to the section from another route.
    window.setTimeout(() => {
      document.getElementById(item.anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, location.pathname === '/' ? 0 : 160);
  };

  // Close dropdowns on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Outside click effect
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    {
      name: language === 'hi' ? 'मुख्य पृष्ठ' : 'Home',
      path: '/',
      exact: true
    },
    {
      name: language === 'hi' ? 'भारतीय सेना परिचय' : 'About Indian Army',
      id: 'about',
      hasDropdown: true,
      items: [
        { title: 'Recruitment Schemes & Opportunities', desc: 'Explore entry routes, eligibility and career opportunities', path: '/opportunities' },
        { title: 'Param Vir Chakra & Gallantry', desc: '21 PVC recipients and highest military honours', path: '/about/gallantry' },
        { title: 'Command & Corps Structure', desc: '7 Commands and specialized combat and technical arms', path: '/about/commands' },
        { title: 'Values & Code of Ethics', desc: 'Service Before Self, Naam Namak Nishan doctrine', path: '/about/values' }
      ]
    },
    {
      name: language === 'hi' ? 'सेना में जीवन' : 'Life in Army',
      id: 'life',
      hasDropdown: true,
      items: [
        { title: 'Premier Training Academies', desc: 'IMA Dehradun, OTA Chennai, NDA Khadakwasla, CME Pune', path: '/', anchor: 'prestigious-academies' },
        { title: 'Adventure & High Altitude Sports', desc: 'Mountaineering, skydiving, sailing, equestrian, and marksman wings', path: '/life/adventure-sports' },
        { title: 'Medical (ECHS) & CSD Canteen', desc: 'World-class healthcare for personnel and dependent families', path: '/life/csd-canteen' }
      ]
    },
    {
      name: language === 'hi' ? 'अधिकारी प्रविष्टि' : 'Officers Entry',
      id: 'officers',
      hasDropdown: true,
      items: [
        { title: 'NDA & 10+2 TES Entry', desc: 'Direct commission after 12th standard via UPSC NDA & Technical Entry', path: '/opportunities/officers-entry' },
        { title: 'CDS Entry (IMA & OTA)', desc: 'Graduate entry via UPSC Combined Defence Services examination', path: '/opportunities/officers-entry' },
        { title: 'Technical Entries (TGC & SSC Tech)', desc: 'Direct SSB interview for Engineering Graduates (Men & Women)', path: '/opportunities/officers-entry' },
        { title: 'Special Entries (NCC & JAG)', desc: 'Direct SSB for NCC C Certificate & Law Graduates', path: '/opportunities/officers-entry' }
      ]
    },
    {
      name: language === 'hi' ? 'जेसीओ / अन्य रैंक' : 'JCO / OR Enrolment',
      id: 'jco',
      hasDropdown: true,
      items: [
        { title: 'Agnipath Scheme Overview', desc: '4-year transformative enlistment with Seva Nidhi & skill certificate', path: '/opportunities/agnipath-scheme' },
        { title: 'Agniveer (General Duty & Tech)', desc: 'Combat arms, technical trades, and aviation maintenance', path: '/opportunities/agnipath-scheme' },
        { title: 'Agniveer Women (Military Police)', desc: 'Dedicated enlistment for women in Corps of Military Police', path: '/opportunities/agnipath-scheme' },
        { title: 'Territorial Army Entry', desc: 'Serve as a citizen soldier alongside civilian career', path: '/opportunities/territorial-army' }
      ]
    },
    {
      name: language === 'hi' ? 'संपर्क व सहायता' : 'Contact Us',
      path: '/help'
    }
  ];

  return (
    <header className={`navbar-container ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container">
        <div className="nav-inner">
          {/* Brand Logo & Emblem */}
          <Link to="/" className="brand-logo" aria-label="Join Indian Army Home">
            <img
              src="/Logo.png"
              alt="Indian Army Emblem"
              className="emblem-img"
              width="46"
              height="46"
            />
            <div className="brand-text">
              <span className="brand-title">JOIN INDIAN ARMY</span>
              <span className="brand-subtitle">GOVERNMENT OF INDIA</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Main Navigation" ref={navRef}>
            <ul className="nav-list">
              {navLinks.map((link) => {
                const isActive = link.exact
                  ? location.pathname === link.path
                  : location.pathname.startsWith(link.path || `/${link.id}`);

                if (link.hasDropdown) {
                  return (
                    <li
                      key={link.id}
                      className="nav-item dropdown-item"
                    >
                      <button
                        type="button"
                        className={`nav-link dropdown-toggle ${activeDropdown === link.id ? 'active' : ''}`}
                        aria-expanded={activeDropdown === link.id}
                        onClick={() => setActiveDropdown(activeDropdown === link.id ? null : link.id)}
                      >
                        <span>{link.name}</span>
                        <ChevronDown size={14} className={`chevron-icon ${activeDropdown === link.id ? 'rotate' : ''}`} />
                      </button>

                      {/* Dropdown Menu */}
                      {activeDropdown === link.id && (
                        <div className="mega-dropdown" role="menu">
                          <div className="dropdown-grid">
                            {link.items.map((item, idx) => (
                              <Link
                                key={idx}
                                to={item.path}
                                className="dropdown-link-card"
                                role="menuitem"
                                onClick={(event) => goToSection(event, item)}
                              >
                                <span className="item-title">{item.title}</span>
                                <span className="item-desc">{item.desc}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </li>
                  );
                }

                return (
                  <li key={link.path} className="nav-item">
                    <Link
                      to={link.path}
                      className={`nav-link ${isActive ? 'active' : ''}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Action Icons & Login */}
          <div className="nav-actions">
            {/* Global Search Button */}
            <button
              type="button"
              className="search-btn"
              onClick={() => setSearchModalOpen(true)}
              aria-label="Search Recruitment Portal"
              title="Search opportunities, rallies, results (Ctrl+K)"
            >
              <Search size={19} />
            </button>

            {/* Login / User Profile */}
            {user.isLoggedIn ? (
              <div className="user-dropdown-container">
                <button
                  type="button"
                  className="user-profile-btn"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className="user-avatar">
                    <img
                      src={user.photo || '/avatar.png'}
                      alt={user.name}
                      className="nav-avatar-img"
                    />
                  </div>
                  <span className="user-name">{user.name.split(' ')[0]}</span>
                  <ChevronDown size={13} />
                </button>

                {userMenuOpen && (
                  <div className="user-dropdown-menu animate-fade-in">
                    <div className="user-info-header">
                      <div className="user-info-avatar-row">
                        <img
                          src={user.photo || '/avatar.png'}
                          alt={user.name}
                          className="dropdown-avatar-img"
                        />
                        <div className="user-info-copy">
                          <strong>{user.name}</strong>
                          <span>{user.email}</span>
                        </div>
                      </div>
                      <small className="user-roll">Roll: {user.rollNumber}</small>
                    </div>
                    <Link to="/dashboard" className="user-menu-item" onClick={() => setUserMenuOpen(false)}>
                      <LayoutDashboard size={16} /> Candidate Dashboard
                    </Link>
                    <Link to="/track" className="user-menu-item" onClick={() => setUserMenuOpen(false)}>
                      <FileCheck size={16} /> Track Application
                    </Link>
                    <Link to="/admit-card" className="user-menu-item" onClick={() => setUserMenuOpen(false)}>
                      <Calendar size={16} /> Download Admit Card
                    </Link>
                    <button
                      type="button"
                      className="user-menu-item logout"
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="login-register-btn"
              >
                <User size={16} />
                <span>{language === 'hi' ? 'लॉगिन / रजिस्टर' : 'Login / Register'}</span>
              </Link>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in">
          <div className="mobile-drawer-content">
            <Link to="/" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/find-entry" className="mobile-link highlight" onClick={() => setMobileMenuOpen(false)}>
              Find Your Entry (Eligibility Wizard)
            </Link>
            <Link to="/opportunities" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
              Explore All Opportunities
            </Link>
            <Link to="/opportunities/officers-entry" className="mobile-link sub" onClick={() => setMobileMenuOpen(false)}>
              Officers Entry
            </Link>
            <Link to="/opportunities/jco-or-enrolment" className="mobile-link sub" onClick={() => setMobileMenuOpen(false)}>
              JCO / OR Enrolment
            </Link>
            <Link to="/opportunities/agnipath-scheme" className="mobile-link sub" onClick={() => setMobileMenuOpen(false)}>
              Agnipath Scheme
            </Link>
            <Link to="/opportunities/territorial-army" className="mobile-link sub" onClick={() => setMobileMenuOpen(false)}>
              Territorial Army
            </Link>
            <Link to="/calendar" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
              Recruitment Rallies & Calendar
            </Link>
            <Link to="/track" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
              Check Application Status
            </Link>
            <Link to="/admit-card" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
              Download Admit Card
            </Link>
            <Link to="/results" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
              Results & Merit Lists
            </Link>
            <Link to="/help" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
              Helpdesk & FAQs
            </Link>
            {!user.isLoggedIn && (
              <div className="mobile-auth-actions">
                <Link
                  to="/login"
                  className="btn btn-primary"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User size={16} /> Candidate Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .navbar-container {
          position: sticky;
          top: 0;
          z-index: 900;
          transition: all var(--transition-normal);
        }

        .navbar-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background-color: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
          z-index: 0;
          pointer-events: none;
          transition: all var(--transition-normal);
        }

        [data-theme='dark'] .navbar-container::before {
          background-color: rgba(9, 18, 11, 0.85);
          border-bottom-color: rgba(255, 255, 255, 0.08);
        }

        .navbar-container.is-scrolled::before {
          background-color: rgba(255, 255, 255, 0.94);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          border-bottom-color: rgba(0, 0, 0, 0.12);
        }

        [data-theme='dark'] .navbar-container.is-scrolled::before {
          background-color: rgba(9, 18, 11, 0.94);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          border-bottom-color: rgba(255, 255, 255, 0.12);
        }

        .nav-inner {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
          gap: 20px;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .emblem-img {
          height: 48px;
          width: auto;
          object-fit: contain;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-title {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: 0.02em;
          color: var(--army-primary);
          line-height: 1.15;
        }

        [data-theme='dark'] .brand-title {
          color: #ffffff;
        }

        .brand-subtitle {
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        /* Desktop Nav */
        .desktop-nav {
          display: flex;
          align-items: center;
          height: 100%;
        }

        .nav-list {
          display: flex;
          align-items: center;
          list-style: none;
          gap: 4px;
          height: 100%;
        }

        .nav-item {
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
        }

        .nav-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-display);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
          position: relative;
        }

        .nav-link:hover {
          color: var(--army-primary);
          background-color: var(--bg-surface-subtle);
        }

        .nav-link.active {
          color: var(--army-primary);
          font-weight: 700;
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -18px;
          left: 12px;
          right: 12px;
          height: 3px;
          background: var(--army-primary);
          border-radius: 2px;
        }

        [data-theme='dark'] .nav-link:hover,
        [data-theme='dark'] .nav-link.active {
          color: var(--gold-light);
        }

        [data-theme='dark'] .nav-link.active::after {
          background: var(--gold-primary);
        }

        .chevron-icon {
          transition: transform var(--transition-fast);
          color: var(--text-muted);
        }

        .chevron-icon.rotate {
          transform: rotate(180deg);
        }

        /* Mega Dropdown - macOS / iOS Translucent Glassmorphism with deep blur */
        .mega-dropdown {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          min-width: 360px;
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(28px) saturate(190%);
          -webkit-backdrop-filter: blur(28px) saturate(190%);
          border-radius: 14px;
          box-shadow: 0 24px 50px -10px rgba(0, 0, 0, 0.25), inset 0 1px 1.5px rgba(255, 255, 255, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.5);
          padding: 8px;
          z-index: 1100;
          animation: dropdownFadeIn 0.18s ease-out forwards;
        }

        @keyframes dropdownFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        [data-theme='dark'] .mega-dropdown {
          background: rgba(14, 28, 18, 0.62);
          backdrop-filter: blur(30px) saturate(200%);
          -webkit-backdrop-filter: blur(30px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 28px 55px -10px rgba(0, 0, 0, 0.65), inset 0 1px 1.5px rgba(255, 255, 255, 0.25);
        }

        .dropdown-grid {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .dropdown-link-card {
          display: flex;
          flex-direction: column;
          padding: 11px 14px;
          border-radius: 10px;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          background: transparent;
        }

        .dropdown-link-card:hover {
          background: rgba(0, 0, 0, 0.06);
          transform: translateX(4px);
        }

        [data-theme='dark'] .dropdown-link-card:hover {
          background: rgba(255, 255, 255, 0.12);
        }

        .item-title {
          font-family: var(--font-display);
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.01em;
        }

        .item-desc {
          font-size: 0.76rem;
          color: var(--text-muted);
          margin-top: 3px;
          line-height: 1.35;
        }

        /* Nav Actions */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .search-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: var(--radius-full);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .search-btn:hover {
          color: var(--army-primary);
          background-color: var(--bg-surface-subtle);
        }

        .login-register-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: var(--army-dark);
          color: #ffffff;
          font-family: var(--font-display);
          font-size: 0.875rem;
          font-weight: 700;
          padding: 9px 18px;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
          box-shadow: var(--shadow-sm);
        }

        .login-register-btn:hover {
          background-color: var(--army-medium);
          box-shadow: var(--shadow-md);
        }

        .user-dropdown-container {
          position: relative;
        }

        .user-profile-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          padding: 6px 12px;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .user-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1.5px solid var(--gold-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .nav-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .user-info-avatar-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 4px;
          min-width: 0;
        }

        .user-info-copy {
          min-width: 0;
          flex: 1;
        }

        .dropdown-avatar-img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
          border: 1.5px solid var(--gold-primary);
          flex-shrink: 0;
        }

        .user-dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: min(280px, calc(100vw - 32px));
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(20px) saturate(190%);
          -webkit-backdrop-filter: blur(20px) saturate(190%);
          border-radius: var(--radius-md);
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: var(--shadow-xl);
          padding: 8px;
          z-index: 1000;
        }

        [data-theme='dark'] .user-dropdown-menu {
          background: rgba(14, 26, 17, 0.92);
          backdrop-filter: blur(20px) saturate(190%);
          -webkit-backdrop-filter: blur(20px) saturate(190%);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .user-info-header {
          padding: 8px 12px 12px;
          border-bottom: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
        }

        .user-info-header strong {
          display: block;
          font-size: 0.875rem;
          color: var(--text-primary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .user-info-header span {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .user-roll {
          font-size: 0.6875rem;
          color: var(--gold-dark);
          font-weight: 700;
          margin-top: 2px;
        }

        .user-menu-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          font-size: 0.8125rem;
          color: var(--text-secondary);
          border-radius: var(--radius-xs);
          width: 100%;
          text-align: left;
          transition: all var(--transition-fast);
        }

        .user-menu-item:hover {
          background: var(--bg-surface-subtle);
          color: var(--army-primary);
        }

        [data-theme='dark'] .user-menu-item:hover {
          background: rgba(229, 190, 89, 0.14);
          color: #ffffff;
        }

        .user-menu-item.logout {
          color: #dc2626;
          border-top: 1px solid var(--border-subtle);
          margin-top: 4px;
        }

        .mobile-toggle-btn {
          display: none;
          color: var(--text-primary);
          padding: 6px;
        }

        /* Mobile Drawer */
        .mobile-drawer {
          display: block;
          background: #ffffff;
          border-bottom: 1px solid var(--border-subtle);
          padding: 16px 24px 24px;
        }

        [data-theme='dark'] .mobile-drawer {
          background: var(--army-darkest);
        }

        .mobile-drawer-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mobile-link {
          font-family: var(--font-display);
          font-size: 0.9375rem;
          font-weight: 600;
          padding: 8px 0;
          border-bottom: 1px solid var(--border-subtle);
          color: var(--text-primary);
        }

        .mobile-link.highlight {
          color: var(--gold-dark);
          font-weight: 700;
        }

        .mobile-link.sub {
          padding-left: 16px;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .mobile-auth-actions {
          margin-top: 16px;
        }

        @media (max-width: 1024px) {
          .desktop-nav {
            display: none;
          }
          .mobile-toggle-btn {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
