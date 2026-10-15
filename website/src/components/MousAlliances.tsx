import React, { useState, useMemo } from 'react';
import { Globe2, Building2, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const MousAlliances: React.FC = () => {
  const { mous } = usePortfolio();
  const [activeTab, setActiveTab] = useState<string>('All');

  const normalizedMoUs = useMemo(() => {
    return (mous || []).map((m: any, idx: number) => {
      const partnerName = m.partner || m.partnerName || 'Partner Organisation';
      const country = m.country || 'Global';

      let isIntl = false;
      if (m.type === 'International') {
        isIntl = true;
      } else if (m.category && m.category.toLowerCase().includes('international')) {
        isIntl = true;
      } else if (country && !country.toLowerCase().includes('india')) {
        isIntl = true;
      }

      const standardCategory = isIntl ? 'International Universities' : 'Corporate & Industrial Alliances';
      const category = m.category && !m.category.toLowerCase().includes('international') && !m.category.toLowerCase().includes('corporate')
        ? m.category
        : standardCategory;

      let link = (m.link || '').trim() || null;
      let institutionAtSigning = m.institutionAtSigning || '';

      if (m.notes) {
        if (!link) {
          const linkMatch = m.notes.match(/https?:\/\/[^\s|]+/);
          if (linkMatch) link = linkMatch[0];
        }
        if (!institutionAtSigning && m.notes.includes('Established at:')) {
          institutionAtSigning = m.notes.split('|')[0].replace(/^Established at:\s*/, '').trim();
        }
      }
      if (!institutionAtSigning) {
        institutionAtSigning = 'DAV University, Jalandhar';
      }

      return {
        id: m.id || idx,
        partnerName,
        country,
        category,
        isIntl,
        scope: m.scope,
        link,
        institutionAtSigning,
      };
    });
  }, [mous]);

  // Compute dynamic category list and counts
  const categoryTabs = useMemo(() => {
    const intlCount = normalizedMoUs.filter(m => m.isIntl).length;
    const corpCount = normalizedMoUs.filter(m => !m.isIntl).length;

    // Check if there are any other custom categories
    const customCategories: { id: string; label: string; count: number }[] = [];
    const knownStandard = new Set(['International Universities', 'Corporate & Industrial Alliances']);
    
    const otherCounts: Record<string, number> = {};
    normalizedMoUs.forEach(m => {
      if (!knownStandard.has(m.category)) {
        otherCounts[m.category] = (otherCounts[m.category] || 0) + 1;
      }
    });

    Object.entries(otherCounts).forEach(([cat, count]) => {
      customCategories.push({ id: cat, label: cat, count });
    });

    return [
      { id: 'All', label: 'All Strategic Partnerships', count: normalizedMoUs.length },
      { id: 'International', label: 'International Universities', count: intlCount },
      { id: 'Corporate', label: 'Corporate & Industrial Alliances', count: corpCount },
      ...customCategories,
    ];
  }, [normalizedMoUs]);

  // If activeTab is not in current tabs, fallback to 'All'
  const currentTab = categoryTabs.some((t) => t.id === activeTab) ? activeTab : 'All';

  const filteredList = useMemo(() => {
    if (currentTab === 'All') return normalizedMoUs;
    if (currentTab === 'International') return normalizedMoUs.filter(m => m.isIntl);
    if (currentTab === 'Corporate') return normalizedMoUs.filter(m => !m.isIntl);
    return normalizedMoUs.filter(m => m.category === currentTab);
  }, [normalizedMoUs, currentTab]);

  return (
    <div className="section-content-wrapper">
      <div className="content-header">
        <div className="academic-breadcrumb">
          <span>Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">MoUs & Strategic Alliances</span>
        </div>
        <div className="content-eyebrow">Institutional Global Footprint</div>
        <h2 className="content-title">MoUs & Strategic Alliances</h2>
        <div className="content-subtitle">
          Over {normalizedMoUs.length} bilateral partnerships with leading international universities across USA, Canada, Europe, and corporate tech pioneers
        </div>
      </div>

      {/* Dynamic Filter Tabs */}
      <div className="awards-filter-bar">
        {categoryTabs.map((tab) => (
          <button
            key={tab.id}
            className={`filter-btn ${currentTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <div className="mous-grid">
        {filteredList.map((mou) => {
          return (
            <div key={mou.id} className="mou-card">
              <div className="mou-header">
                <span className={`badge ${mou.isIntl ? 'badge-crimson' : 'badge-navy'}`}>
                  {mou.isIntl ? <Globe2 size={12} /> : <Building2 size={12} />}
                  <span>{mou.country}</span>
                </span>
                {mou.link && (
                  <a
                    href={mou.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mou-official-link"
                    title="Official Press / Verification Link"
                  >
                    <span>Official Press</span>
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>

              <h4 className="mou-partner">{mou.partnerName}</h4>
              <div className="mou-country">
                {mou.country} • {mou.category}
              </div>
              {mou.scope && <p className="mou-scope">{mou.scope}</p>}

              <div className="mou-inst-tag">
                Established at: {mou.institutionAtSigning}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MousAlliances;
