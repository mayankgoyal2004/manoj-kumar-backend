import React, { useState } from 'react';
import { Calendar, Mic, Award } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const ConferencesLectures: React.FC = () => {
  const { conferences } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'organized' | 'keynotes' | 'trainings'>('organized');

  const organizedEvents = conferences.filter((c: any) => {
    const r = (c.role || '').toLowerCase();
    return r.includes('organ') || r.includes('chair') || r.includes('convener');
  });

  const keynotesAndPresentations = conferences.filter((c: any) => {
    const r = (c.role || '').toLowerCase();
    return r.includes('keynote') || r.includes('invited') || r.includes('talk') || r.includes('speaker');
  });

  const trainingsAttended = conferences.filter((c: any) => {
    const r = (c.role || '').toLowerCase();
    return r.includes('train') || r.includes('participant') || r.includes('fellow');
  });

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
          Convener and session chair for over 50 international conferences, keynote deliveries across national symposia, and global leadership summits
        </div>
      </div>

      {/* Tabs */}
      <div className="awards-filter-bar">
        <button
          className={`filter-btn ${activeTab === 'organized' ? 'active' : ''}`}
          onClick={() => setActiveTab('organized')}
        >
          Conferences & FDPs Organized ({organizedEvents.length})
        </button>
        <button
          className={`filter-btn ${activeTab === 'keynotes' ? 'active' : ''}`}
          onClick={() => setActiveTab('keynotes')}
        >
          Keynotes & Invited Talks ({keynotesAndPresentations.length})
        </button>
        <button
          className={`filter-btn ${activeTab === 'trainings' ? 'active' : ''}`}
          onClick={() => setActiveTab('trainings')}
        >
          Advanced Executive Trainings ({trainingsAttended.length})
        </button>
      </div>

      {/* Content */}
      <div className="awards-cards-list">
        {activeTab === 'organized' &&
          organizedEvents.map((event: any, idx: number) => {
            const title = event.title;
            const details = event.summary || event.details || event.event;

            return (
              <div key={event.id || idx} className="award-card">
                <div className="award-medal-icon" style={{ background: 'var(--color-crimson-100)', color: 'var(--color-crimson-800)', borderColor: 'rgba(115, 19, 38, 0.2)' }}>
                  <Calendar size={20} />
                </div>
                <div className="award-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                    <span className="mono-font" style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                      Event #{String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="badge badge-crimson">Organized / Chaired</span>
                  </div>
                  <div style={{ fontSize: '0.92rem', color: 'var(--color-text-main)', lineHeight: 1.6 }}>
                    <strong style={{ color: 'var(--color-crimson-900)' }}>{title}</strong>
                    {details && <div style={{ marginTop: '0.25rem', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>{details}</div>}
                  </div>
                </div>
              </div>
            );
          })}

        {activeTab === 'keynotes' &&
          keynotesAndPresentations.map((kn: any, idx: number) => {
            const title = kn.title;
            const eventName = kn.event;
            const location = kn.location;
            const date = kn.date;
            const summary = kn.summary;

            return (
              <div key={kn.id || idx} className="award-card">
                <div className="award-medal-icon" style={{ background: 'var(--color-navy-100)', color: 'var(--color-navy-800)', borderColor: 'rgba(30, 46, 79, 0.2)' }}>
                  <Mic size={20} />
                </div>
                <div className="award-content">
                  <div className="award-header-row">
                    <h4 className="award-title">{title}</h4>
                    {date && <span className="badge badge-gold">{date}</span>}
                  </div>
                  <div className="award-conferring">
                    {eventName} {location ? `• ${location}` : ''}
                  </div>
                  {summary && <p className="award-desc">{summary}</p>}
                </div>
              </div>
            );
          })}

        {activeTab === 'trainings' &&
          trainingsAttended.map((tr: any, idx: number) => {
            const title = tr.title;
            const provider = tr.event || tr.provider;
            const year = tr.date || tr.year;
            const location = tr.location;
            const desc = tr.summary || tr.description;

            return (
              <div key={tr.id || idx} className="award-card">
                <div className="award-medal-icon" style={{ background: 'var(--color-gold-100)', color: 'var(--color-gold-800)', borderColor: 'rgba(217, 119, 6, 0.2)' }}>
                  <Award size={20} />
                </div>
                <div className="award-content">
                  <div className="award-header-row">
                    <h4 className="award-title">{title}</h4>
                    {year && <span className="badge badge-gold">{year}</span>}
                  </div>
                  <div className="award-conferring">
                    {provider} {location ? `• ${location}` : ''}
                  </div>
                  {desc && <p className="award-desc">{desc}</p>}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
