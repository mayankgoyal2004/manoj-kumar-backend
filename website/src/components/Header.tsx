import React from 'react';
import { Search, Mail, Phone, GraduationCap } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface HeaderProps {
  onOpenSearch: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, activeSection, onNavigate }) => {
  const { profile, settings, liveMetrics, positions, affiliations } = usePortfolio();

  const mobileSections = [
    { id: 'overview', label: 'Biosketch' },
    { id: 'positions', label: 'Positions' },
    { id: 'education', label: 'Education' },
    { id: 'awards', label: `Awards (${liveMetrics.awardsCount || profile.metrics?.awardsCount || '26+'})` },
    { id: 'patents', label: `Patents (${String(liveMetrics.patentsCount || profile.metrics?.patentsCount || 4).padStart(2, '0')})` },
    { id: 'publications', label: `Publications (${liveMetrics.publicationsCount || profile.metrics?.publicationsCount || '150+'})` },
    { id: 'phd', label: `Ph.D. (${String(liveMetrics.supervisionCount || profile.metrics?.phdSupervisedCount || 9).padStart(2, '0')})` },
    { id: 'books', label: `Books (${liveMetrics.booksCount || profile.metrics?.booksCount || 13})` },
    { id: 'grants', label: 'Grants' },
    { id: 'mous', label: `MoUs (${liveMetrics.mousCount || profile.metrics?.mousCount || 26})` },
    { id: 'affiliations', label: 'Affiliations' },
    { id: 'events', label: 'Events' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'news', label: 'News & Media' },
    { id: 'contact', label: 'Contact' }
  ];

  const officePhone = profile.contact?.officePhone || settings?.phone || '+91 181 662 8000';
  const officialEmail = profile.contact?.officialEmail || settings?.contactEmail || 'vc@davuniversity.org';
  const institutionName = profile.institution || 'DAV University, Jalandhar';
  const photoUrl = profile.headerPhoto || profile.photo || '/images/prof_manoj_kumar.jpg';
  const pillars = Array.isArray(profile.specializations) && profile.specializations.length
    ? profile.specializations.slice(0, 4)
    : [
        'Higher Education Leadership',
        'Optical Wireless Communications',
        'Photonics & Solitons',
        'Institutional Governance',
      ];

  // Top header positions from profile.headerPositions array (e.g. ['DAV University, Jalandhar', 'University of Memphis (USA)', 'President, JMA (AIMA)'])
  const headerPositionsList: string[] = (() => {
    if (Array.isArray(profile.headerPositions) && profile.headerPositions.length) {
      return profile.headerPositions.filter(Boolean);
    }
    // Fallback if not configured yet: main institution
    return [institutionName].filter(Boolean);
  })();

  return (
    <header className="site-header">
      {/* Top Institutional Bar */}
      <div className="institutional-bar">
        <div className="container">
          <div className="institutional-affiliation">
            {headerPositionsList.map((posText: string, idx: number) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="affiliation-dot hide-xs">•</span>}
                <span className={idx === 0 ? "inst-main" : idx === 1 ? "hide-sm" : "hide-md"}>
                  {posText}
                </span>
              </React.Fragment>
            ))}
          </div>

          <div className="institutional-actions">
            <a href={`tel:${officePhone}`} className="quick-contact-link" title={`Call ${profile.designation || 'Office'}`}>
              <Phone size={13} />
              <span className="hide-xs">{officePhone}</span>
            </a>
            <a href={`mailto:${officialEmail}`} className="quick-contact-link" title={`Email ${profile.designation || 'Office'}`}>
              <Mail size={13} />
              <span className="hide-sm">{officialEmail}</span>
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
                  src={photoUrl}
                  alt={profile.fullName}
                  className="hero-portrait-img"
                />
              </div>

              <div className="hero-identity">
                <div className="hero-crest-badge">
                  <GraduationCap size={15} />
                  <span>
                    {profile.designation
                      ? (profile.designation.toLowerCase().startsWith('office')
                          ? profile.designation
                          : `Office of the ${profile.designation}`)
                      : 'Office of the Vice-Chancellor'}
                  </span>
                </div>
                <h1 className="hero-name">{profile.fullName}</h1>
                <div className="hero-title">{profile.designation}</div>
                <div className="hero-institution">
                  <span>{institutionName}</span>
                </div>

                <div className="hero-pillars-row">
                  {pillars.map((pil: string, idx: number) => (
                    <span key={idx} className="hero-pillar-item">{pil}</span>
                  ))}
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
