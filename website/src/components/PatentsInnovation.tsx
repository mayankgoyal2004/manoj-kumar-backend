import React from 'react';
import { FileCheck, Cpu } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const PatentsInnovation: React.FC = () => {
  const { patents } = usePortfolio();

  const parseInnovations = (patent: any) => {
    if (Array.isArray(patent.keyUtility) && patent.keyUtility.length) {
      return patent.keyUtility;
    }
    const abs = patent.abstract || patent.description || '';
    if (abs.includes('Innovations:')) {
      const parts = abs.split('Innovations:');
      return parts[1].split('\n').map((l: string) => l.replace(/^[•\-\*]\s*/, '').trim()).filter(Boolean);
    }
    return [];
  };

  const cleanDescription = (patent: any) => {
    const abs = patent.abstract || patent.description || '';
    if (abs.includes('Innovations:')) {
      return abs.split('Innovations:')[0].trim();
    }
    return abs;
  };

  return (
    <div className="section-content-wrapper">
      <div className="content-header">
        <div className="academic-breadcrumb">
          <span>Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Patents & Innovation</span>
        </div>
        <div className="content-eyebrow">Intellectual Property</div>
        <h2 className="content-title">Patents & Technological Inventions</h2>
        <div className="content-subtitle">
          Published patents in digital communication systems, AI surveillance, biomedical IoT energy harvesting, and water telemetry
        </div>
      </div>

      <div className="patents-grid">
        {patents.map((patent: any) => {
          const innovations = parseInnovations(patent);
          const desc = cleanDescription(patent);
          const pubDate = patent.grantDate || patent.publicationDate;

          return (
            <div key={patent.id} className="patent-card">
              <div className="patent-top-meta">
                <span className="patent-number">App No: {patent.patentNumber}</span>
                <span className="badge badge-patent">
                  <FileCheck size={12} />
                  <span>{patent.status}</span>
                </span>
              </div>

              <h4 className="patent-title">{patent.title}</h4>

              <div className="patent-domain-badge">
                <span className="badge badge-navy">
                  <Cpu size={12} />
                  <span>{patent.domain || 'Communications & IoT'}</span>
                </span>
              </div>

              {desc && <p className="patent-desc">{desc}</p>}

              {innovations.length > 0 && (
                <div className="patent-utility-box">
                  <div className="patent-utility-title">Key Technological Innovations</div>
                  <ul className="patent-utility-list">
                    {innovations.map((u: string, idx: number) => (
                      <li key={idx}>{u}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="patent-date-footer">
                {patent.filingDate && <span>Filed: {patent.filingDate}</span>}
                {pubDate && <span>Published: {pubDate}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
