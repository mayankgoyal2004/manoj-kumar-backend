import React from 'react';
import { GraduationCap, Award, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const EducationCredentials: React.FC = () => {
  const { education } = usePortfolio();

  const isCert = (item: any) => {
    const d = (item.degree || item.title || '').toLowerCase();
    const g = (item.grade || '').toLowerCase();
    return d.includes('certificate') || d.includes('certified') || d.includes('diploma') || g === 'certified';
  };

  const academicDegrees = education.filter((e: any) => !isCert(e));
  const executiveCertifications = education.filter((e: any) => isCert(e));

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
          {academicDegrees.map((deg: any, i: number) => {
            const title = deg.degree || deg.title;
            const field = deg.specialization || deg.field;
            const inst = deg.institution || deg.issuingBody;
            const honors = deg.grade || deg.honors;
            const desc = deg.notes || deg.description;

            return (
              <div key={deg.id || i} className="degree-card">
                {deg.year && <span className="degree-year-badge">{deg.year}</span>}
                <h4 className="degree-title">{title}</h4>
                {field && <div className="degree-field">{field}</div>}
                <div className="degree-inst">{inst}</div>
                {honors && (
                  <div className="degree-honors">
                    <Award size={14} />
                    <span>{honors}</span>
                  </div>
                )}
                {desc && (
                  <p style={{ marginTop: '0.85rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    {desc}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Executive Leadership & Certifications */}
      <div>
        <h3 style={{ fontSize: '1.35rem', color: 'var(--color-crimson-900)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={20} color="var(--color-gold-500)" />
          <span>Executive Leadership & International Certifications</span>
        </h3>

        <div className="certifications-grid">
          {executiveCertifications.map((cert: any, i: number) => {
            const title = cert.degree || cert.title;
            const badge = cert.specialization || cert.badge || 'Executive Credential';
            const inst = cert.institution || cert.issuingBody;
            const desc = cert.notes || cert.description;

            return (
              <div key={cert.id || i} className="cert-card">
                <span className="badge badge-gold cert-badge-tag">{badge}</span>
                <h4 className="cert-title">{title}</h4>
                <div className="cert-body">{inst} {cert.year ? `(${cert.year})` : ''}</div>
                {desc && <p className="cert-desc">{desc}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
