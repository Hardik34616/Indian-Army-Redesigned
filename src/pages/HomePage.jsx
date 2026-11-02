import React from 'react';
import HeroSection from '../components/home/HeroSection';
import PopularLinksBar from '../components/home/PopularLinksBar';
import ExploreOpportunities from '../components/home/ExploreOpportunities';
import RecruitmentCalendarPreview from '../components/home/RecruitmentCalendarPreview';
import PrestigiousAcademies from '../components/home/PrestigiousAcademies';
import SelectionJourneyRoadmap from '../components/home/SelectionJourneyRoadmap';
import HistoricOperationsGallery from '../components/home/HistoricOperationsGallery';
import AnnouncementsSection from '../components/home/AnnouncementsSection';
import FaqSection from '../components/home/FaqSection';

const HomePage = () => {
  return (
    <main id="main-content" className="homepage-wrapper">
      {/* 1. Snowy Mountain Soldier Hero Section */}
      <HeroSection />

      {/* 2. Floating Popular Links Bar */}
      <PopularLinksBar />

      {/* 3. Dark Green Explore Opportunities 4-Cards Grid */}
      <ExploreOpportunities />

      {/* 4. Live Schedule & Recruitment Rally Radar */}
      <RecruitmentCalendarPreview />

      {/* 4.5. Our Prestigious Academies (NDA, IMA, OTA) */}
      <PrestigiousAcademies />

      {/* 5. The Selection Journey Interactive Roadmap */}
      <SelectionJourneyRoadmap />

      {/* 6. Historic Battles & Gallantry Gallery */}
      <HistoricOperationsGallery />

      {/* 7. Live Flash Announcements & Notices */}
      <AnnouncementsSection />

      {/* 8. Interactive FAQs */}
      <FaqSection />

      <style>{`
        .homepage-wrapper {
          display: flex;
          flex-direction: column;
          min-height: 100%;
        }
      `}</style>
    </main>
  );
};

export default HomePage;
