import React, { useState } from 'react';
import { Globe2, Building2, Landmark, ExternalLink, CheckCircle2 } from 'lucide-react';
import { strategicMoUsList } from '../data/mousData';

export const MousAlliances: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');

  const internationalMoUs = strategicMoUsList.filter(m => m.type === 'International');
  const corporateMoUs = strategicMoUsList.filter(m => m.type === 'Corporate' || m.type === 'National Institute');

  const filteredList = activeTab === 'All'
    ? strategicMoUsList
    : activeTab === 'International'
      ? internationalMoUs
      : corporateMoUs;

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
          Over 26 bilateral partnerships with leading international universities across USA, Canada, Europe, and corporate tech pioneers
        </div>
      </div>

      {/* Tabs */}
      <div className="awards-filter-bar">
        <button
          className={`filter-btn ${activeTab === 'All' ? 'active' : ''}`}
          onClick={() => setActiveTab('All')}
        >
          All Strategic Partnerships ({strategicMoUsList.length})
        </button>
        <button
          className={`filter-btn ${activeTab === 'International' ? 'active' : ''}`}
          onClick={() => setActiveTab('International')}
        >
          International Universities ({internationalMoUs.length})
        </button>
        <button
          className={`filter-btn ${activeTab === 'Corporate' ? 'active' : ''}`}
          onClick={() => setActiveTab('Corporate')}
        >
          Corporate & National Alliances ({corporateMoUs.length})
        </button>
      </div>

      <div className="mous-grid">
        {filteredList.map((mou) => (
          <div key={mou.id} className="mou-card">
            <div className="mou-header">
              <span className={`badge ${mou.type === 'International' ? 'badge-crimson' : 'badge-navy'}`}>
                {mou.type === 'International' ? <Globe2 size={12} /> : <Building2 size={12} />}
                <span>{mou.country}</span>
              </span>
              {mou.link && (
                <a
                  href={mou.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.75rem' }}
                >
                  <span>Official Press</span>
                  <ExternalLink size={11} />
                </a>
              )}
            </div>

            <h4 className="mou-partner">{mou.partnerName}</h4>
            <div className="mou-country">{mou.country} • {mou.type}</div>
            <p className="mou-scope">{mou.scope}</p>

            <div className="mou-inst-tag">
              Established at: {mou.institutionAtSigning}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
