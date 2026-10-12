import React from 'react';
import { Search, Mail, Phone, GraduationCap, Menu, X, ChevronDown } from 'lucide-react';
import { executiveProfile } from '../data/profileData';

interface HeaderProps {
  onOpenSearch: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const mobileSections = [
  { id: 'overview', label: 'Biosketch' },
  { id: 'positions', label: 'Positions' },
  { id: 'education', label: 'Education' },
  { id: 'awards', label: 'Awards (26+)' },
  { id: 'patents', label: 'Patents (04)' },
  { id: 'publications', label: 'Publications (151+)' },
  { id: 'phd', label: 'Ph.D. (09)' },
  { id: 'books', label: 'Books (13)' },
  { id: 'grants', label: 'Grants' },
  { id: 'mous', label: 'MoUs (26)' },
  { id: 'affiliations', label: 'Affiliations' },
  { id: 'events', label: 'Events' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'news', label: 'News & Media' },
  { id: 'contact', label: 'Contact' }
];

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, activeSection, onNavigate }) => {
  return (
    <header className="site-header">
      {/* Top Institutional Bar */}
      <div className="institutional-bar">
        <div className="container">
          <div className="institutional-affiliation">
            <span className="inst-main">DAV University, Jalandhar</span>
            <span className="affiliation-dot hide-xs">•</span>
            <span className="hide-sm">University of Memphis (USA)</span>
            <span className="affiliation-dot hide-md">•</span>
            <span className="hide-md">President, JMA (AIMA)</span>
          </div>

          <div className="institutional-actions">
            <a href={`tel:${executiveProfile.contact.officePhone}`} className="quick-contact-link" title="Call Vice-Chancellor Office">
              <Phone size={13} />
              <span className="hide-xs">{executiveProfile.contact.officePhone}</span>
            </a>
            <a href={`mailto:${executiveProfile.contact.officialEmail}`} className="quick-contact-link" title="Email Vice-Chancellor Office">
              <Mail size={13} />
              <span className="hide-sm">{executiveProfile.contact.officialEmail}</span>
            </a>
            <button className="header-search-btn" onClick={onOpenSearch} title="Search publications, patents, books">
              <Search size={13} />
              <span className="search-btn-label">Search</span>
              <span className="kbd-shortcut hide-xs">⌘K</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stately Academic Hero Header */}
      <div className="academic-hero">
        <div className="hero-backdrop-pattern"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-identity-wrapper">
              <div className="hero-portrait-frame">
                <img
                  src="/images/prof_manoj_kumar.jpg"
                  alt={executiveProfile.fullName}
                  className="hero-portrait-img"
                />
              </div>

              <div className="hero-identity">
                <div className="hero-crest-badge">
                  <GraduationCap size={15} />
                  <span>Office of the Vice-Chancellor</span>
                </div>
                <h1 className="hero-name">{executiveProfile.fullName}</h1>
                <div className="hero-title">{executiveProfile.designation}</div>
                <div className="hero-institution">
                  <span>{executiveProfile.institution}</span>
                </div>

                <div className="hero-pillars-row">
                  <span className="hero-pillar-item">Higher Education Leadership</span>
                  <span className="hero-pillar-item">Optical Wireless Communications</span>
                  <span className="hero-pillar-item">Photonics & Solitons</span>
                  <span className="hero-pillar-item">Institutional Governance</span>
                </div>
              </div>
            </div>

            <div className="hero-calligraphy-side">
              <div className="calligraphy-quote">
                “Knowledge, Innovation & Societal Impact”
              </div>
              <div className="calligraphy-sub">
                विद्या ददाति विनयं
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Responsive Navigation Ribbon (< 992px) */}
      <div className="mobile-nav-ribbon">
        <div className="container">
          <div className="mobile-nav-scroll">
            {mobileSections.map((sec) => (
              <button
                key={sec.id}
                className={`mobile-nav-chip ${activeSection === sec.id ? 'active' : ''}`}
                onClick={() => onNavigate(sec.id)}
              >
                {sec.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
