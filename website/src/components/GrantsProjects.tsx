import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const GrantsProjects: React.FC = () => {
  const { grants } = usePortfolio();

  const formatAmount = (amt: any) => {
    if (!amt) return 'Sponsored Research';
    if (typeof amt === 'string' && (amt.includes('₹') || amt.includes('Lakhs'))) return amt;
    const num = typeof amt === 'number' ? amt : parseFloat(amt);
    if (!isNaN(num) && num > 0) {
      if (num >= 100000) {
        return `₹${(num / 100000).toFixed(2)} Lakhs`;
      }
      return `₹${num.toLocaleString('en-IN')}`;
    }
    return 'Sponsored Research';
  };

  const formatYear = (g: any) => {
    if (g.year) return g.year;
    if (g.startYear && g.endYear) return `${g.startYear} – ${g.endYear}`;
    if (g.startYear) return `${g.startYear}`;
    return 'Active';
  };

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
        {grants.map((grant: any, idx: number) => {
          const scheme = grant.project || grant.scheme;
          const agency = grant.agency;
          const amount = formatAmount(grant.amount);
          const year = formatYear(grant);
          const purpose = grant.outcomes || grant.purpose;
          const inst = grant.institution || 'Principal Investigator';

          return (
            <div key={grant.id || idx} className="grant-card">
              <div className="grant-amount">{amount}</div>
              <h4 className="grant-scheme">{scheme}</h4>
              <div className="grant-agency">{agency}</div>

              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                <span>Tenure / Year: </span>
                <strong style={{ color: 'var(--color-text-main)' }}>{year}</strong>
                <span> • {inst}</span>
              </div>

              {purpose && <p className="grant-purpose">{purpose}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
