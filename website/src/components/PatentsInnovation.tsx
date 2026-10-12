import React from 'react';
import { Lightbulb, FileCheck, Calendar, ShieldCheck, CheckCircle2, Cpu } from 'lucide-react';
import { patentsList } from '../data/patentsData';

export const PatentsInnovation: React.FC = () => {
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
        {patentsList.map((patent) => (
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
                <span>{patent.domain}</span>
              </span>
            </div>

            <p className="patent-desc">{patent.description}</p>

            <div className="patent-utility-box">
              <div className="patent-utility-title">Key Technological Innovations</div>
              <ul className="patent-utility-list">
                {patent.keyUtility.map((u, idx) => (
                  <li key={idx}>{u}</li>
                ))}
              </ul>
            </div>

            <div className="patent-date-footer">
              <span>Filed: {patent.filingDate}</span>
              <span>Published: {patent.publicationDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
