import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_APPLICATIONS } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Accessibility state
  const [fontSize, setFontSize] = useState('normal'); // 'small' (14px), 'normal' (16px), 'large' (18px)
  const [theme, setTheme] = useState('light'); // 'light' (default per reference), 'dark'
  const [contrast, setContrast] = useState('normal'); // 'normal', 'high'
  const [language, setLanguage] = useState('en'); // 'en', 'hi'
  const [screenReaderActive, setScreenReaderActive] = useState(false);

  // Authentication State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ia_user');
    const parsed = saved
      ? JSON.parse(saved)
      : {
          name: 'Hardik Yash Raj',
          email: 'vikram.sharma@example.com',
          mobile: '9876543210',
          dob: '2001-10-06',
          dobFormatted: '06 Oct 2001',
          gender: 'Male',
          category: 'General / Unreserved',
          fatherName: 'Shri Yash Raj',
          motherName: 'Smt. Sunita Devi',
          address: '14, Rajputana Enclave, Vaishali Nagar, Jaipur, Rajasthan - 302021',
          rollNumber: 'TGC141/2026/88921',
          candidateId: 'IA26-482913'
        };
    return { ...parsed, isLoggedIn: false };
  });

  const updateUser = (updatedFields) => {
    setUser((prev) => {
      const next = { ...prev, ...updatedFields };
      try {
        localStorage.setItem('ia_user', JSON.stringify(next));
      } catch (err) {
        console.error('Failed to save to localStorage:', err);
      }
      return next;
    });
  };

  // Applications list
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('ia_applications');
    return saved ? JSON.parse(saved) : MOCK_APPLICATIONS;
  });

  // Modals state
  const [authModal, setAuthModal] = useState({ isOpen: false, initialTab: 'candidate' });
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [admitCardModalOpen, setAdmitCardModalOpen] = useState(false);
  const [isVeerAIOpen, setIsVeerAIOpen] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState(null);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Sync font size to html root
  useEffect(() => {
    const root = document.documentElement;
    if (fontSize === 'small') {
      root.style.setProperty('--font-base-size', '14.5px');
    } else if (fontSize === 'large') {
      root.style.setProperty('--font-base-size', '18px');
    } else {
      root.style.setProperty('--font-base-size', '16px');
    }
  }, [fontSize]);

  // Sync theme & contrast
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-contrast', contrast);
  }, [theme, contrast]);

  // Save applications to local storage
  useEffect(() => {
    localStorage.setItem('ia_applications', JSON.stringify(applications));
  }, [applications]);

  // Keyboard shortcut Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
        setAuthModal({ isOpen: false, initialTab: 'candidate' });
        setStatusModalOpen(false);
        setAdmitCardModalOpen(false);
        setIsVeerAIOpen(false);
        setSelectedOperation(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const login = (email, role = 'candidate') => {
    const updated = {
      ...user,
      name: role === 'officer' ? 'Major Sandeep Varma' : 'Hardik Yash Raj',
      email: email || (role === 'officer' ? 'sandeep.varma@nic.in' : 'vikram.sharma@example.com'),
      rollNumber: 'TGC141/2026/88921',
      candidateId: 'IA26-482913',
      isLoggedIn: true,
      role
    };
    setUser(updated);
    try {
      localStorage.setItem('ia_user', JSON.stringify(updated));
    } catch (err) {}
    setAuthModal({ isOpen: false, initialTab: 'candidate' });
    addToast(`Welcome back, ${role === 'officer' ? 'Major Sandeep Varma' : 'Hardik'}!`, 'success');
  };

  const logout = () => {
    setUser((prev) => {
      const next = { ...prev, isLoggedIn: false };
      try {
        localStorage.setItem('ia_user', JSON.stringify(next));
      } catch (err) {}
      return next;
    });
    addToast('You have been logged out securely.', 'info');
  };

  const submitApplication = (newAppData) => {
    const id = `IA-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newEntry = {
      id,
      candidateName: newAppData.personal.fullName,
      dob: newAppData.personal.dob,
      category: newAppData.opportunity.category === 'officer' ? 'Officers Entry' : 'Agnipath Scheme',
      entryName: newAppData.opportunity.title,
      appliedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      currentStatus: 'Application Submitted - Under Initial Scrutiny',
      statusStage: 1,
      centerAllotted: newAppData.preferences.firstChoiceCity + ' Examination Centre',
      reportingDate: 'Admit Card to be issued 15 days before CEE',
      rollNumber: `${newAppData.opportunity.id.slice(0, 3).toUpperCase()}/2026/${Math.floor(10000 + Math.random() * 90000)}`,
      admitCardReady: false,
      formData: newAppData,
      steps: [
        { name: 'Application Submitted', date: 'Today', done: true },
        { name: 'Document Scrutiny', date: 'In Progress', done: false },
        { name: 'Admit Card Issuance', date: 'Pending', done: false },
        { name: 'Written / CEE Exam', date: 'Pending', done: false },
        { name: 'PFT / SSB Stage', date: 'Pending', done: false },
        { name: 'Medical & Merit List', date: 'Pending', done: false }
      ]
    };

    setApplications((prev) => {
      const next = [newEntry, ...prev];
      try {
        localStorage.setItem('ia_applications', JSON.stringify(next));
      } catch (err) {}
      return next;
    });
    return newEntry;
  };

  return (
    <AppContext.Provider
      value={{
        fontSize,
        setFontSize,
        theme,
        setTheme,
        contrast,
        setContrast,
        language,
        setLanguage,
        screenReaderActive,
        setScreenReaderActive,
        user,
        updateUser,
        login,
        logout,
        applications,
        submitApplication,
        authModal,
        setAuthModal,
        searchModalOpen,
        setSearchModalOpen,
        statusModalOpen,
        setStatusModalOpen,
        admitCardModalOpen,
        setAdmitCardModalOpen,
        isVeerAIOpen,
        setIsVeerAIOpen,
        selectedOperation,
        setSelectedOperation,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
