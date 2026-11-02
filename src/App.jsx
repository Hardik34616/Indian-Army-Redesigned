import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useApp } from './context/AppContext';
import AccessibilityBar from './components/layout/AccessibilityBar';
import DisclaimerBanner from './components/layout/DisclaimerBanner';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Modals & Popups
import SearchModal from './components/common/SearchModal';
import NotificationToast from './components/common/NotificationToast';
import AuthModal from './components/modals/AuthModal';
import StatusModal from './components/modals/StatusModal';
import AdmitCardModal from './components/modals/AdmitCardModal';
import OperationDetailModal from './components/modals/OperationDetailModal';
import VeerAIModal from './components/modals/VeerAIModal';

// Pages
import HomePage from './pages/HomePage';
import FindEntryPage from './pages/FindEntryPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import OpportunityDetailPage from './pages/OpportunityDetailPage';
import AcademyDetailPage from './pages/AcademyDetailPage';
import ApplyPage from './pages/ApplyPage';
import DashboardPage from './pages/DashboardPage';
import TrackApplicationPage from './pages/TrackApplicationPage';
import AdmitCardPage from './pages/AdmitCardPage';
import ResultsPage from './pages/ResultsPage';
import CalendarPage from './pages/CalendarPage';
import HelpPage from './pages/HelpPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import QuickMedicalCheckPage from './pages/QuickMedicalCheckPage';
import ArmyInformationPage from './pages/ArmyInformationPage';
import ArmyCommandStructurePage from './pages/ArmyCommandStructurePage';
import ArmyValuesEthicsPage from './pages/ArmyValuesEthicsPage';
import LifeExperiencePage from './pages/LifeExperiencePage';
import OperationExperiencePage from './pages/OperationExperiencePage';
import SSBMentorPage from './pages/SSBMentorPage';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ProtectedRoute = ({ children }) => {
  const { user, setAuthModal } = useApp();
  const location = useLocation();
  const requestedPath = `${location.pathname}${location.search}${location.hash}`;

  useEffect(() => {
    if (!user.isLoggedIn) {
      setAuthModal((current) => ({
        ...current,
        isOpen: true,
        initialTab: 'candidate',
        redirectTo: requestedPath
      }));
    }
  }, [requestedPath, setAuthModal, user.isLoggedIn]);

  if (!user.isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login';

  return (
    <div className="app-root-container">
      <ScrollToTop />

      {/* Top Accessibility Bar */}
      {!isAuthPage && <AccessibilityBar />}

      {/* Prototype Notice */}
      {!isAuthPage && <DisclaimerBanner />}

      {/* Main Government Portal Navbar */}
      {!isAuthPage && <Navbar />}

      {/* Page Routing */}
      <main id="main-content" className={`app-main-content ${isAuthPage ? 'auth-fullscreen-wrap' : ''}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/find-entry" element={<FindEntryPage />} />
          <Route path="/opportunities" element={<OpportunitiesPage />} />
          <Route path="/opportunities/:id" element={<OpportunityDetailPage />} />
          <Route path="/about/gallantry" element={<ArmyInformationPage />} />
          <Route path="/about/commands" element={<ArmyCommandStructurePage />} />
          <Route path="/about/values" element={<ArmyValuesEthicsPage />} />
          <Route path="/life/adventure-sports" element={<LifeExperiencePage type="adventure" />} />
          <Route path="/life/csd-canteen" element={<LifeExperiencePage type="csd" />} />
          <Route path="/operations/:id" element={<OperationExperiencePage />} />
          <Route path="/academies/:id" element={<AcademyDetailPage />} />
          <Route path="/ssb-mentor" element={<SSBMentorPage />} />
          <Route path="/apply" element={<ProtectedRoute><ApplyPage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/track" element={<TrackApplicationPage />} />
          <Route path="/admit-card" element={<AdmitCardPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/quick-medical-check" element={<QuickMedicalCheckPage />} />
          <Route path="/tenders" element={<Navigate to="/quick-medical-check" replace />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Footer */}
      {!isAuthPage && <Footer />}

      {/* Global Interactive Modals */}
      <SearchModal />
      <AuthModal />
      <StatusModal />
      <AdmitCardModal />
      <OperationDetailModal />
      <VeerAIModal />

      {/* Toast Alerts Container */}
      <NotificationToast />
    </div>
  );
};

export default App;
