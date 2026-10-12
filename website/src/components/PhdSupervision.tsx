import React from 'react';
import { Users, GraduationCap, Calendar, BookOpen, CheckCircle } from 'lucide-react';
import { phdScholarsList, mtechSupervisionList } from '../data/phdSupervisionData';

export const PhdSupervision: React.FC = () => {
  return (
    <div className="section-content-wrapper">
      <div className="content-header">
        <div className="academic-breadcrumb">
          <span>Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Ph.D. Supervision</span>
        </div>
        <div className="content-eyebrow">Doctoral Mentorship</div>
        <h2 className="content-title">Ph.D. Supervision & Mentorship</h2>
        <div className="content-subtitle">
          Supervision of 09 successfully defended and awarded Ph.D. dissertations and 19 M.Tech. postgraduate theses
        </div>
      </div>

      {/* Ph.D. Scholars Grid */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.35rem', color: 'var(--color-crimson-900)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <GraduationCap size={20} />
          <span>Doctor of Philosophy (Ph.D.) Scholars (Awarded: 09)</span>
        </h3>

        <div className="phd-grid">
          {phdScholarsList.map((scholar) => (
            <div key={scholar.id} className="phd-card">
              <h4 className="phd-scholar-name">{scholar.scholarName}</h4>
              <div className="phd-award-date">
                Awarded: {scholar.awardDate} • {scholar.institution}
              </div>

              <div className="phd-thesis-title">
                "{scholar.thesisTitle}"
              </div>

              <div className="phd-domain-tag">
                <span className="badge badge-navy">{scholar.domain}</span>
              </div>

              <p className="phd-impact">{scholar.impactSummary}</p>
            </div>
          ))}
        </div>
      </div>

      {/* M.Tech Theses Supervised */}
      <div>
        <h3 style={{ fontSize: '1.35rem', color: 'var(--color-crimson-900)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={19} />
          <span>M.Tech. Postgraduate Theses Supervised (19 Theses)</span>
        </h3>

        <div className="mtech-table-wrapper">
          <table className="academic-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>#</th>
                <th style={{ width: '220px' }}>Candidate Name</th>
                <th>M.Tech. Thesis Title</th>
                <th style={{ width: '100px', textAlign: 'center' }}>Year</th>
              </tr>
            </thead>
            <tbody>
              {mtechSupervisionList.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{item.id.toString().padStart(2, '0')}</td>
                  <td style={{ fontWeight: 600, color: 'var(--color-crimson-900)' }}>{item.scholarName}</td>
                  <td>{item.thesisTitle}</td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{item.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
