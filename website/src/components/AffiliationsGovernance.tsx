import React, { useState, useMemo } from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const AffiliationsGovernance: React.FC = () => {
  const { affiliations } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const normalized = useMemo(() => {
    return (affiliations || []).map((item: any, idx: number) => {
      const role = item.position || item.role || 'Member / Fellow';
      const organization = item.body || item.organization || 'Academic & Governance Body';
      const category = (item.kind || item.category || 'Fellowship').trim();
      const period = item.since ? `Since ${item.since}` : (item.period || '');
      const details = item.notes || item.details;

      let link = (item.link || '').trim() || null;
      if (!link && item.notes) {
        const linkMatch = item.notes.match(/https?:\/\/[^\s|]+/);
        if (linkMatch) link = linkMatch[0];
      }

      return {
        id: item.id || idx,
        role,
        organization,
        category,
        period,
        details,
        link,
      };
    });
  }, [affiliations]);

  // Dynamically compute category counts and tabs
  const categoryTabs = useMemo(() => {
    const counts: Record<string, number> = {};
    normalized.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });

    const uniqueCategories = Object.keys(counts);

    return [
      { id: 'All', label: 'All Affiliations & Fellowships', count: normalized.length },
      ...uniqueCategories.map((cat) => ({
        id: cat,
        label: cat,
        count: counts[cat],
      })),
    ];
  }, [normalized]);

  const currentCategory = categoryTabs.some((t) => t.id === activeCategory) ? activeCategory : 'All';

  const filteredAffiliations = currentCategory === 'All'
    ? normalized
    : normalized.filter((a) => a.category === currentCategory);

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

      {/* Dynamic Category Filter Bar */}
      <div className="awards-filter-bar">
        {categoryTabs.map((tab) => (
          <button
            key={tab.id}
            className={`filter-btn ${currentCategory === tab.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(tab.id)}
          >
            {tab.label} ({tab.count})
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
                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  {item.period && <span className="badge badge-gold">{item.period}</span>}
                  <span className="badge badge-navy">{item.category}</span>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mou-official-link"
                      title="Official Order / Verification Link"
                      style={{ marginLeft: '0.2rem' }}
                    >
                      <span>Official Link</span>
                      <ExternalLink size={11} />
                    </a>
                  )}
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

