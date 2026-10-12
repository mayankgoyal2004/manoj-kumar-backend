import React, { useState } from 'react';
import { Calendar, Mic, Award, GraduationCap, CheckCircle2 } from 'lucide-react';
import { organizedEvents, keynotesAndPresentations, trainingsAttended } from '../data/eventsData';

export const ConferencesLectures: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'organized' | 'keynotes' | 'trainings'>('organized');

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
        {activeTab === 'organized' && (
          organizedEvents.map((event) => (
            <div key={event.id} className="award-card">
              <div className="award-medal-icon" style={{ background: 'var(--color-crimson-100)', color: 'var(--color-crimson-800)', borderColor: 'rgba(115, 19, 38, 0.2)' }}>
                <Calendar size={20} />
              </div>
              <div className="award-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                  <span className="mono-font" style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                    Event #{event.id.toString().padStart(2, '0')}
                  </span>
                  <span className="badge badge-crimson">Organized / Chaired</span>
                </div>
                <div style={{ fontSize: '0.92rem', color: 'var(--color-text-main)', lineHeight: 1.6 }}>
                  {event.title}
                </div>
              </div>
            </div>
          ))
        )}

        {activeTab === 'keynotes' && (
          keynotesAndPresentations.map((event) => (
            <div key={event.id} className="award-card">
              <div className="award-medal-icon" style={{ background: 'var(--color-gold-100)', color: 'var(--color-gold-600)', borderColor: 'rgba(181, 133, 20, 0.3)' }}>
                <Mic size={20} />
              </div>
              <div className="award-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                  <span className="mono-font" style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                    Keynote #{event.id.toString().padStart(2, '0')}
                  </span>
                  <span className="badge badge-gold">Keynote / Invited Address</span>
                </div>
                <div style={{ fontSize: '0.92rem', color: 'var(--color-text-main)', lineHeight: 1.6 }}>
                  {event.title}
                </div>
              </div>
            </div>
          ))
        )}

        {activeTab === 'trainings' && (
          trainingsAttended.map((event) => (
            <div key={event.id} className="award-card">
              <div className="award-medal-icon" style={{ background: 'var(--color-navy-100)', color: 'var(--color-navy-800)', borderColor: 'rgba(30, 46, 79, 0.2)' }}>
                <GraduationCap size={20} />
              </div>
              <div className="award-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                  <span className="mono-font" style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                    Training #{event.id.toString().padStart(2, '0')}
                  </span>
                  <span className="badge badge-navy">Executive Development</span>
                </div>
                <div style={{ fontSize: '0.92rem', color: 'var(--color-text-main)', lineHeight: 1.6 }}>
                  {event.title}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
