import React from 'react';
import { GraduationCap, Award, ShieldCheck, CheckCircle2, BookmarkCheck } from 'lucide-react';
import { degrees, executiveCertifications } from '../data/educationData';

export const EducationCredentials: React.FC = () => {
  return (
    <div className="section-content-wrapper">
      <div className="content-header">
        <div className="academic-breadcrumb">
          <span>Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Education & Qualification</span>
        </div>
        <div className="content-eyebrow">Scholarly Background</div>
        <h2 className="content-title">Education & Executive Credentials</h2>
        <div className="content-subtitle">
          Doctoral research in photonics, University Silver Medal, and international leadership accreditations
        </div>
      </div>

      {/* Degrees */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.35rem', color: 'var(--color-crimson-900)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <GraduationCap size={20} />
          <span>Academic Degrees</span>
        </h3>

        <div className="degrees-grid">
          {degrees.map((deg, i) => (
            <div key={i} className="degree-card">
              <span className="degree-year-badge">{deg.year}</span>
              <h4 className="degree-title">{deg.degree}</h4>
              <div className="degree-field">{deg.field}</div>
              <div className="degree-inst">{deg.institution}</div>
              {deg.honors && (
                <div className="degree-honors">
                  <Award size={14} />
                  <span>{deg.honors}</span>
                </div>
              )}
              {deg.description && (
                <p style={{ marginTop: '0.85rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  {deg.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Executive Leadership & Certifications */}
      <div>
        <h3 style={{ fontSize: '1.35rem', color: 'var(--color-crimson-900)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={20} color="var(--color-gold-500)" />
          <span>Executive Leadership & International Certifications</span>
        </h3>

        <div className="certifications-grid">
          {executiveCertifications.map((cert, i) => (
            <div key={i} className="cert-card">
              <span className="badge badge-gold cert-badge-tag">{cert.badge}</span>
              <h4 className="cert-title">{cert.title}</h4>
              <div className="cert-body">{cert.issuingBody} {cert.year ? `(${cert.year})` : ''}</div>
              <p className="cert-desc">{cert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
