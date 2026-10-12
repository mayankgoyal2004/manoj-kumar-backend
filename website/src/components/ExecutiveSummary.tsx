import React from 'react';
import { Landmark, Lightbulb, Globe2, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import { executiveProfile } from '../data/profileData';

interface ExecutiveSummaryProps {
  onNavigate: (sectionId: string) => void;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ onNavigate }) => {
  const pillarIcons: Record<string, React.ReactNode> = {
    Landmark: <Landmark size={22} />,
    Lightbulb: <Lightbulb size={22} />,
    Globe2: <Globe2 size={22} />,
    Award: <Award size={22} />
  };

  return (
    <div className="section-content-wrapper">
      <div className="content-header">
        <div className="academic-breadcrumb">
          <span>Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">About Biosketch</span>
        </div>
        <div className="content-eyebrow">Academic & Leadership Profile</div>
        <h2 className="content-title">Executive Biosketch</h2>
        <div className="content-subtitle">
          Vice-Chancellor, DAV University | Dean's Visiting Scholar, Univ of Memphis (USA) | President, JMA (AIMA)
        </div>
      </div>

      {/* Main Bio Grid */}
      <div className="overview-grid">
        <div className="bio-text-column">
          <p className="bio-paragraph bio-lead">
            {executiveProfile.bioSummary}
          </p>
          {executiveProfile.fullBio.slice(1).map((para, i) => (
            <p key={i} className="bio-paragraph">
              {para}
            </p>
          ))}
        </div>

        <div className="executive-portrait-card">
          <div className="portrait-frame">
            <img
              src="/images/prof_manoj_kumar.jpg"
              alt={executiveProfile.fullName}
              className="portrait-img"
            />
          </div>

          <div className="quote-academic-card">
            <blockquote>
              "{executiveProfile.quote}"
            </blockquote>
            <cite>— {executiveProfile.fullName}</cite>
          </div>
        </div>
      </div>

      {/* Leadership Pillars */}
      <h3 className="pillars-section-title">
        <Award size={20} />
        <span>Core Pillars of Leadership & Impact</span>
      </h3>

      <div className="pillars-grid">
        {executiveProfile.leadershipPillars.map((pillar, idx) => (
          <div key={idx} className="pillar-card">
            <div className="pillar-icon-box">
              {pillarIcons[pillar.icon] || <Landmark size={22} />}
            </div>
            <h4 className="pillar-title">{pillar.title}</h4>
            <div className="pillar-subtitle">{pillar.subtitle}</div>
            <p className="pillar-desc">{pillar.description}</p>
          </div>
        ))}
      </div>

      {/* Field of Specialization Tags */}
      <div className="specializations-box">
        <h4 className="specializations-title">
          <CheckCircle2 size={18} color="var(--color-crimson-800)" />
          <span>Fields of Academic & Technological Specialization</span>
        </h4>
        <div className="specializations-tags">
          {executiveProfile.specializations.map((spec, idx) => (
            <span key={idx} className="specialization-tag">
              <span>•</span>
              <span>{spec}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
