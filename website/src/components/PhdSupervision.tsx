import React from 'react';
import { GraduationCap, BookOpen } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const PhdSupervision: React.FC = () => {
  const { supervision } = usePortfolio();

  const isMtech = (s: any) => {
    const prog = (s.program || '').toLowerCase();
    return prog.includes('tech') || prog.includes('postgrad') || prog.includes('master');
  };

  const phdScholars = supervision.filter((s: any) => !isMtech(s));
  const mtechTheses = supervision.filter((s: any) => isMtech(s));

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
          Supervision of successfully defended and awarded Ph.D. dissertations and M.Tech. postgraduate theses
        </div>
      </div>

      {/* Ph.D. Scholars Grid */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.35rem', color: 'var(--color-crimson-900)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <GraduationCap size={20} />
          <span>Doctor of Philosophy (Ph.D.) Scholars (Awarded: {String(phdScholars.length).padStart(2, '0')})</span>
        </h3>

        <div className="phd-grid">
          {phdScholars.map((scholar: any, i: number) => {
            const name = scholar.scholar || scholar.scholarName;
            const thesis = scholar.thesis || scholar.thesisTitle;
            const year = scholar.awardDate || scholar.enrolledYear || 'Awarded';
            const impact = scholar.progress || scholar.impactSummary;
            const domain = scholar.domain || 'Photonics & Wireless Communications';

            return (
              <div key={scholar.id || i} className="phd-card">
                <h4 className="phd-scholar-name">{name}</h4>
                <div className="phd-award-date">
                  Awarded: {year}
                </div>

                {thesis && (
                  <div className="phd-thesis-title">
                    "{thesis}"
                  </div>
                )}

                <div className="phd-domain-tag">
                  <span className="badge badge-navy">{domain}</span>
                </div>

                {impact && <p className="phd-impact">{impact}</p>}
              </div>
            );
          })}
        </div>
      </div>

      {/* M.Tech Theses Supervised */}
      {mtechTheses.length > 0 && (
        <div>
          <h3 style={{ fontSize: '1.35rem', color: 'var(--color-crimson-900)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={19} />
            <span>M.Tech. Postgraduate Theses Supervised ({mtechTheses.length} Theses)</span>
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
                {mtechTheses.map((item: any, idx: number) => {
                  const name = item.scholar || item.scholarName;
                  const thesis = item.thesis || item.thesisTitle;
                  const year = item.enrolledYear || item.year;

                  return (
                    <tr key={item.id || idx}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{String(idx + 1).padStart(2, '0')}</td>
                      <td style={{ fontWeight: 600, color: 'var(--color-crimson-900)' }}>{name}</td>
                      <td>{thesis}</td>
                      <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{year || '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
