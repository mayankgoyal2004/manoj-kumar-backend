import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const AffiliationsGovernance: React.FC = () => {
  const { affiliations } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const normalized = affiliations.map((item: any, idx: number) => {
    const role = item.position || item.role;
    const organization = item.body || item.organization;
    const category = item.kind || item.category || 'Professional Body';
    const period = item.since ? `Since ${item.since}` : item.period;
    const details = item.notes || item.details;

    return {
      id: item.id || idx,
      role,
      organization,
      category,
      period,
      details,
    };
  });

  const categoriesSet = new Set<string>();
  normalized.forEach((item) => {
    if (item.category) categoriesSet.add(item.category);
  });
  const categories = ['All', ...Array.from(categoriesSet)];

  const filteredAffiliations = activeCategory === 'All'
    ? normalized
    : normalized.filter((a) => a.category === activeCategory);

  return (
    <div className="section-content-wrapper">
      <div className="content-header">
        <div className="academic-breadcrumb">
          <span>Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Professional Affiliations</span>
        </div>
        <div className="content-eyebrow">Governance & Academic Bodies</div>
        <h2 className="content-title">Affiliations, Fellowships & Governance</h2>
        <div className="content-subtitle">
          Founding Fellowships, Board of Governors appointments, state advisory councils, and international journal reviewer boards
        </div>
      </div>

      {/* Category Pills */}
      <div className="awards-filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Affiliations Cards */}
      <div className="awards-cards-list">
        {filteredAffiliations.map((item) => (
          <div key={item.id} className="award-card">
            <div className="award-medal-icon" style={{ background: 'var(--color-navy-100)', borderColor: 'rgba(30, 46, 79, 0.3)', color: 'var(--color-navy-800)' }}>
              <ShieldCheck size={22} />
            </div>

            <div className="award-content">
              <div className="award-header-row">
                <h4 className="award-title">{item.role}</h4>
                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                  {item.period && <span className="badge badge-gold">{item.period}</span>}
                  <span className="badge badge-navy">{item.category}</span>
                </div>
              </div>

              <div className="award-conferring">{item.organization}</div>
              {item.details && <p className="award-desc">{item.details}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
