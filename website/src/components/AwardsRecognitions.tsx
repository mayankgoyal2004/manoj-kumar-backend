import React, { useState } from 'react';
import { Award, Trophy, Medal, Building2, Landmark, CheckCircle } from 'lucide-react';
import { awardsList } from '../data/awardsData';

export const AwardsRecognitions: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredAwards = activeCategory === 'All'
    ? awardsList
    : awardsList.filter(a => a.category === activeCategory);

  const categories = ['All', 'Personal', 'Institutional', 'Government'];

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
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat === 'All' ? 'All Honors & Accolades' : `${cat} Awards`}
            {' '}
            <span style={{ opacity: 0.7, fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
              ({cat === 'All' ? awardsList.length : awardsList.filter(a => a.category === cat).length})
            </span>
          </button>
        ))}
      </div>

      {/* Awards List */}
      <div className="awards-cards-list">
        {filteredAwards.map((award) => (
          <div key={award.id} className="award-card">
            <div className="award-medal-icon">
              {award.category === 'Institutional' ? <Building2 size={22} /> : <Trophy size={22} />}
            </div>

            <div className="award-content">
              <div className="award-header-row">
                <h4 className="award-title">{award.title}</h4>
                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                  <span className="badge badge-gold">{award.year}</span>
                  <span className={`badge ${award.category === 'Institutional' ? 'badge-navy' : 'badge-crimson'}`}>
                    {award.category}
                  </span>
                </div>
              </div>

              <div className="award-conferring">{award.conferringBody}</div>
              <p className="award-desc">{award.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
