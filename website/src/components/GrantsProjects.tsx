import React from 'react';
import { IndianRupee, Landmark, ShieldCheck, CheckCircle2, FileCheck } from 'lucide-react';
import { researchGrantsList } from '../data/grantsData';

export const GrantsProjects: React.FC = () => {
  return (
    <div className="section-content-wrapper">
      <div className="content-header">
        <div className="academic-breadcrumb">
          <span>Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Research Grants</span>
        </div>
        <div className="content-eyebrow">Sponsored Research</div>
        <h2 className="content-title">Grants-in-Aid & Sponsored Projects</h2>
        <div className="content-subtitle">
          Secured substantial government and industrial research grants from PSCST, AICTE, DST, ISTE, MSME, and World Bank projects
        </div>
      </div>

      <div className="grants-grid">
        {researchGrantsList.map((grant) => (
          <div key={grant.id} className="grant-card">
            <div className="grant-amount">{grant.amount}</div>
            <h4 className="grant-scheme">{grant.scheme}</h4>
            <div className="grant-agency">{grant.agency}</div>

            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
              <span>Tenure / Year: </span>
              <strong style={{ color: 'var(--color-text-main)' }}>{grant.year}</strong>
              <span> • {grant.institution}</span>
            </div>

            <p className="grant-purpose">{grant.purpose}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
