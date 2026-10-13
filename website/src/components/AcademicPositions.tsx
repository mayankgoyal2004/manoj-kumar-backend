import React from 'react';
import { Briefcase, MapPin, Calendar, Award } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const AcademicPositions: React.FC = () => {
  const { positions } = usePortfolio();

  const parseHighlights = (pos: any) => {
    if (Array.isArray(pos.keyHighlights) && pos.keyHighlights.length) {
      return pos.keyHighlights;
    }
    if (pos.description && pos.description.includes('Milestones:')) {
      const parts = pos.description.split('Milestones:');
      const lines = parts[1].split('\n').map((l: string) => l.replace(/^[•\-\*]\s*/, '').trim()).filter(Boolean);
      return lines;
    }
    return [];
  };

  const cleanDescription = (pos: any) => {
    if (pos.description && pos.description.includes('Milestones:')) {
      return pos.description.split('Milestones:')[0].trim();
    }
    return pos.description || '';
  };

  const formatPeriod = (pos: any) => {
    if (pos.period) return pos.period;
    const start = pos.startYear || pos.start_year;
    const end = pos.endYear || pos.end_year;
    if (start && end) return `${start} – ${end}`;
    if (start && !end) return `${start} – Present`;
    if (!start && end) return `Until ${end}`;
    return 'Present';
  };

  const isPositionCurrent = (p: any) => {
    if (p.status !== undefined && p.status !== null) {
      return String(p.status).trim().toLowerCase() === 'current';
    }
    return Boolean(p.isCurrent);
  };

  const currentPositions = positions.filter((p: any) => isPositionCurrent(p));
  const pastPositions = positions.filter((p: any) => !isPositionCurrent(p));

  return (
    <div className="section-content-wrapper">
      <div className="content-header">
        <div className="academic-breadcrumb">
          <span>Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Academic Positions</span>
        </div>
        <div className="content-eyebrow">Professional Trajectory</div>
        <h2 className="content-title">Academic & Leadership Appointments</h2>
        <div className="content-subtitle">
          Over 35 years of distinguished leadership across universities, premier engineering colleges, and international institutions
        </div>
      </div>

      {/* Current Appointments */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.35rem', color: 'var(--color-crimson-900)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Award size={19} color="var(--color-gold-500)" />
          <span>Current Executive & Honorary Appointments</span>
        </h3>

        <div className="timeline-container">
          {currentPositions.map((pos: any) => {
            const highlights = parseHighlights(pos);
            const desc = cleanDescription(pos);
            const period = formatPeriod(pos);
            const org = pos.organisation || pos.institution;

            return (
              <div key={pos.id} className="timeline-item">
                <div className="timeline-marker current"></div>
                <div className="position-card current">
                  <div className="position-header">
                    <div>
                      <h4 className="position-role">{pos.role}</h4>
                      <div className="position-org">{org}</div>
                    </div>
                    <span className="badge badge-crimson">Active Appointment</span>
                  </div>

                  <div className="position-meta">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Calendar size={14} />
                      <span>{period}</span>
                    </span>
                    {pos.location && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <MapPin size={14} />
                        <span>{pos.location}</span>
                      </span>
                    )}
                  </div>

                  {desc && <p className="position-desc">{desc}</p>}

                  {highlights.length > 0 && (
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-crimson-800)', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
                        Key Leadership Milestones
                      </div>
                      <ul className="position-highlights-list">
                        {highlights.map((hl: string, i: number) => (
                          <li key={i}>{hl}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Prior Leadership & Academic Appointments */}
      <div>
        <h3 style={{ fontSize: '1.35rem', color: 'var(--color-crimson-900)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Briefcase size={19} />
          <span>Prior Administrative & Academic Leadership</span>
        </h3>

        <div className="timeline-container">
          {pastPositions.map((pos: any) => {
            const highlights = parseHighlights(pos);
            const desc = cleanDescription(pos);
            const period = formatPeriod(pos);
            const org = pos.organisation || pos.institution;

            return (
              <div key={pos.id} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="position-card">
                  <div className="position-header">
                    <div>
                      <h4 className="position-role">{pos.role}</h4>
                      <div className="position-org">{org}</div>
                    </div>
                    <span className="badge badge-navy">{pos.type || 'Academic'}</span>
                  </div>

                  <div className="position-meta">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Calendar size={14} />
                      <span>{period}</span>
                    </span>
                    {pos.location && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <MapPin size={14} />
                        <span>{pos.location}</span>
                      </span>
                    )}
                  </div>

                  {desc && <p className="position-desc">{desc}</p>}

                  {highlights.length > 0 && (
                    <ul className="position-highlights-list">
                      {highlights.map((hl: string, i: number) => (
                        <li key={i}>{hl}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
