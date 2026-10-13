import React, { useState } from 'react';
import { Trophy, Building2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const AwardsRecognitions: React.FC = () => {
  const { awards } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Dynamically extract categories with preferred ordering
  const preferredOrder = ['Personal', 'Institutional', 'Government', 'National', 'International'];
  const categoriesSet = new Set<string>();
  awards.forEach((a: any) => {
    if (a.category) categoriesSet.add(a.category);
  });
  const sortedCategories = Array.from(categoriesSet).sort((a, b) => {
    const idxA = preferredOrder.indexOf(a);
    const idxB = preferredOrder.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b);
  });
  const categories = ['All', ...sortedCategories];

  const filteredAwards = activeCategory === 'All'
    ? awards
    : awards.filter((a: any) => a.category === activeCategory);

  return (
    <div className="section-content-wrapper">
      <div className="content-header">
        <div className="academic-breadcrumb">
          <span>Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Awards & Recognition</span>
        </div>
        <div className="content-eyebrow">Honors & Accolades</div>
        <h2 className="content-title">Awards & Institutional Distinctions</h2>
        <div className="content-subtitle">
          National and international accolades recognizing visionary leadership, educational excellence, and research governance
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="awards-filter-bar">
        {categories.map((cat) => {
          const count = cat === 'All' ? awards.length : awards.filter((a: any) => a.category === cat).length;
          return (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'All' ? 'All Honors & Accolades' : `${cat} Awards`}
              {' '}
              <span style={{ opacity: 0.7, fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Awards List */}
      <div className="awards-cards-list">
        {filteredAwards.map((award: any) => {
          const conferringBody = award.organisation || award.conferringBody;
          const desc = award.citation || award.description;
          const isInst = award.category === 'Institutional';

          return (
            <div key={award.id} className="award-card">
              <div className="award-medal-icon">
                {isInst ? <Building2 size={22} /> : <Trophy size={22} />}
              </div>

              <div className="award-content">
                <div className="award-header-row">
                  <h4 className="award-title">{award.title}</h4>
                  <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                    {award.year && <span className="badge badge-gold">{award.year}</span>}
                    {award.category && (
                      <span className={`badge ${isInst ? 'badge-navy' : 'badge-crimson'}`}>
                        {award.category}
                      </span>
                    )}
                  </div>
                </div>

                {conferringBody && <div className="award-conferring">{conferringBody}</div>}
                {desc && <p className="award-desc">{desc}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
