import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StatStrip } from './components/StatStrip';
import { SidebarNav } from './components/SidebarNav';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { AcademicPositions } from './components/AcademicPositions';
import { EducationCredentials } from './components/EducationCredentials';
import { AwardsRecognitions } from './components/AwardsRecognitions';
import { PatentsInnovation } from './components/PatentsInnovation';
import { PublicationsRepository } from './components/PublicationsRepository';
import { PhdSupervision } from './components/PhdSupervision';
import { BooksLibrary } from './components/BooksLibrary';
import { GrantsProjects } from './components/GrantsProjects';
import { MousAlliances } from './components/MousAlliances';
import { AffiliationsGovernance } from './components/AffiliationsGovernance';
import { ConferencesLectures } from './components/ConferencesLectures';
import { PhotoGallery } from './components/PhotoGallery';
import { NewsMedia } from './components/NewsMedia';
import { ContactSecretariat } from './components/ContactSecretariat';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Sync with URL hash if present
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveSection(hash);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSectionSelect = (sectionId: string) => {
    setActiveSection(sectionId);
    window.location.hash = sectionId;
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <ExecutiveSummary onNavigate={handleSectionSelect} />;
      case 'positions':
        return <AcademicPositions />;
      case 'education':
        return <EducationCredentials />;
      case 'awards':
        return <AwardsRecognitions />;
      case 'patents':
        return <PatentsInnovation />;
      case 'publications':
        return <PublicationsRepository />;
      case 'phd':
        return <PhdSupervision />;
      case 'books':
        return <BooksLibrary />;
      case 'grants':
        return <GrantsProjects />;
      case 'mous':
        return <MousAlliances />;
      case 'affiliations':
        return <AffiliationsGovernance />;
      case 'events':
        return <ConferencesLectures />;
      case 'gallery':
        return <PhotoGallery />;
      case 'news':
      case 'news-media':
        return <NewsMedia onNavigate={handleSectionSelect} />;
      case 'contact':
        return <ContactSecretariat />;
      default:
        return <ExecutiveSummary onNavigate={handleSectionSelect} />;
    }
  };

  return (
    <div className="academic-portal-root">
      {/* Institutional Top Bar & Banner */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        activeSection={activeSection}
        onNavigate={handleSectionSelect}
      />

      {/* Presidential Quick Metrics */}
      <StatStrip />

      {/* Main Academic Portal Content */}
      <main className="academic-workspace">
        <div className="container">
          <div className="workspace-layout">
            {/* Left Stately Navigation */}
            <SidebarNav
              activeSection={activeSection}
              onSelectSection={handleSectionSelect}
            />

            {/* Right Active Section */}
            <section className="academic-main-content">
              {renderActiveSection()}
            </section>
          </div>
        </div>
      </main>

      {/* Global Command Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleSectionSelect}
      />

      {/* Official Academic Footer */}
      <Footer onNavigate={handleSectionSelect} />

      {/* Floating Scroll To Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default App;
