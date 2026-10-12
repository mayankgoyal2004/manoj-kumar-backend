import React from 'react';
import { Briefcase, MapPin, Calendar, CheckCircle, Award } from 'lucide-react';
import { careerPositions } from '../data/positionsData';

export const AcademicPositions: React.FC = () => {
  const currentPositions = careerPositions.filter(p => p.isCurrent);
  const pastPositions = careerPositions.filter(p => !p.isCurrent);

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
          {currentPositions.map((pos) => (
            <div key={pos.id} className="timeline-item">
              <div className="timeline-marker current"></div>
              <div className="position-card current">
                <div className="position-header">
                  <div>
                    <h4 className="position-role">{pos.role}</h4>
                    <div className="position-org">{pos.institution}</div>
                  </div>
                  <span className="badge badge-crimson">Active Appointment</span>
                </div>

                <div className="position-meta">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Calendar size={14} />
                    <span>{pos.period}</span>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MapPin size={14} />
                    <span>{pos.location}</span>
                  </span>
                </div>

                <p className="position-desc">{pos.description}</p>

                {pos.keyHighlights && pos.keyHighlights.length > 0 && (
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-crimson-800)', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
                      Key Leadership Milestones
                    </div>
                    <ul className="position-highlights-list">
                      {pos.keyHighlights.map((hl, i) => (
                        <li key={i}>{hl}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prior Leadership & Academic Appointments */}
      <div>
        <h3 style={{ fontSize: '1.35rem', color: 'var(--color-crimson-900)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Briefcase size={19} />
          <span>Prior Administrative & Academic Leadership</span>
        </h3>

        <div className="timeline-container">
          {pastPositions.map((pos) => (
            <div key={pos.id} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="position-card">
                <div className="position-header">
                  <div>
                    <h4 className="position-role">{pos.role}</h4>
                    <div className="position-org">{pos.institution}</div>
                  </div>
                  <span className="badge badge-navy">{pos.type}</span>
                </div>

                <div className="position-meta">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Calendar size={14} />
                    <span>{pos.period}</span>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MapPin size={14} />
                    <span>{pos.location}</span>
                  </span>
                </div>

                <p className="position-desc">{pos.description}</p>

                {pos.keyHighlights && pos.keyHighlights.length > 0 && (
                  <ul className="position-highlights-list">
                    {pos.keyHighlights.map((hl, i) => (
                      <li key={i}>{hl}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
