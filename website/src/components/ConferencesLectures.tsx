import React, { useState, useMemo } from 'react';
import { Calendar, Mic, Award, FileText, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

function getConferenceCategory(c: any): string {
  const role = (c.role || c.category || c.type || '').trim();
  const lower = role.toLowerCase();

  if (lower.includes('paper')) {
    return 'Paper Presentations';
  }
  if (lower.includes('organ') || lower.includes('convener')) {
    return 'Conferences & FDPs Organized';
  }
  if (lower.includes('keynote') || lower.includes('invited') || lower.includes('talk') || lower.includes('speaker')) {
    return 'Keynotes & Invited Talks';
  }
  if (lower.includes('train') || lower.includes('participant') || lower.includes('fellow')) {
    return 'Advanced Executive Trainings';
  }
  if (lower.includes('chair') || lower.includes('session')) {
    return 'Session Chair & Advisory';
  }
  if (lower.includes('panel')) {
    return 'Panel Discussions';
  }

  // Infer from title if role is not specific
  const titleLower = (c.title || '').toLowerCase();
  if (titleLower.includes('paper presentation') || titleLower.includes('presented paper')) {
    return 'Paper Presentations';
  }
  if (titleLower.includes('organized') || titleLower.includes('convener') || titleLower.includes('co-ordinator')) {
    return 'Conferences & FDPs Organized';
  }
  if (titleLower.includes('training') || titleLower.includes('attended') || titleLower.includes('fellowship')) {
    return 'Advanced Executive Trainings';
  }
  if (titleLower.includes('keynote') || titleLower.includes('invited') || titleLower.includes('chief guest')) {
    return 'Keynotes & Invited Talks';
  }

  return role || 'Conferences & Engagements';
}

function getDisplayRole(c: any, category: string): string {
  if (c.role && c.role !== 'Keynotes & Presentations' && c.role !== 'Keynote/Presentation') {
    return c.role;
  }
  if (category === 'Conferences & FDPs Organized') return 'Convener / Organizer';
  if (category === 'Paper Presentations') return 'Paper Presentation';
  if (category === 'Keynotes & Invited Talks') return 'Keynote';
  if (category === 'Advanced Executive Trainings') return 'Executive Participant';
  return category;
}

export const ConferencesLectures: React.FC = () => {
  const { conferences } = usePortfolio();
  const [activeTab, setActiveTab] = useState<string>('All');

  const normalized = useMemo(() => {
    return (conferences || []).map((c: any, idx: number) => {
      const category = getConferenceCategory(c);
      const role = getDisplayRole(c, category);
      return {
        id: c.id || idx,
        title: c.title,
        event: c.event,
        location: c.location,
        date: c.date,
        role,
        category,
        summary: c.summary,
        link: c.link,
      };
    });
  }, [conferences]);

  // Dynamically compute category counts and tabs
  const categoryTabs = useMemo(() => {
    const counts: Record<string, number> = {};
    normalized.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });

    const uniqueCategories = Object.keys(counts);

    return [
      { id: 'All', label: 'All Conclaves & Engagements', count: normalized.length },
      ...uniqueCategories.map((cat) => ({
        id: cat,
        label: cat,
        count: counts[cat],
      })),
    ];
  }, [normalized]);

  const currentTab = categoryTabs.some((t) => t.id === activeTab) ? activeTab : 'All';

  const filteredList = currentTab === 'All'
    ? normalized
    : normalized.filter((item) => item.category === currentTab);

  return (
    <div className="section-content-wrapper">
      <div className="content-header">
        <div className="academic-breadcrumb">
          <span>Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Conferences & Keynotes</span>
        </div>
        <div className="content-eyebrow">Academic Conclaves & Addresses</div>
        <h2 className="content-title">Conferences, Keynotes & Executive Seminars</h2>
        <div className="content-subtitle">
          Convener and session chair for over 50 international conferences, keynote deliveries across national symposia, paper presentations, and global leadership summits
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

      {/* Content */}
      <div className="awards-cards-list">
        {filteredList.map((item: any, idx: number) => {
          const lower = (item.role || item.category || '').toLowerCase();
          const isOrganized = lower.includes('organ') || lower.includes('convener');
          const isTraining = lower.includes('train') || lower.includes('participant');
          const isPaper = lower.includes('paper');

          const icon = isPaper ? (
            <FileText size={20} />
          ) : isTraining ? (
            <Award size={20} />
          ) : isOrganized ? (
            <Calendar size={20} />
          ) : (
            <Mic size={20} />
          );

          const iconBg = isPaper
            ? { background: 'var(--color-navy-50)', color: 'var(--color-navy-700)', borderColor: 'rgba(30, 46, 79, 0.2)' }
            : isTraining
            ? { background: 'var(--color-gold-100)', color: 'var(--color-gold-800)', borderColor: 'rgba(217, 119, 6, 0.2)' }
            : isOrganized
            ? { background: 'var(--color-crimson-100)', color: 'var(--color-crimson-800)', borderColor: 'rgba(115, 19, 38, 0.2)' }
            : { background: 'var(--color-navy-100)', color: 'var(--color-navy-800)', borderColor: 'rgba(30, 46, 79, 0.2)' };

          return (
            <div key={item.id || idx} className="award-card">
              <div className="award-medal-icon" style={iconBg}>
                {icon}
              </div>
              <div className="award-content">
                <div className="award-header-row">
                  <h4 className="award-title">{item.title}</h4>
                  <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    {item.date && <span className="badge badge-gold">{item.date}</span>}
                    <span className="badge badge-navy">{item.role}</span>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mou-official-link"
                        title="Official Proceedings / Link"
                      >
                        <span>Official Link</span>
                        <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </div>
                {(item.event || item.location) && (
                  <div className="award-conferring">
                    {item.event} {item.location ? `• ${item.location}` : ''}
                  </div>
                )}
                {item.summary && <p className="award-desc">{item.summary}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

