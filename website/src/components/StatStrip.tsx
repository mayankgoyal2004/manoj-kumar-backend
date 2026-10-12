import React from 'react';
import { Users, FileText, GraduationCap, BookOpen, Lightbulb, Award, Globe } from 'lucide-react';
import { executiveProfile } from '../data/profileData';

export const StatStrip: React.FC = () => {
  const stats = [
    {
      num: `${executiveProfile.metrics.experienceYears}`,
      suffix: '+',
      label: 'Years Leadership',
      detail: 'Higher Education',
      icon: Users,
      iconClass: 'stat-icon-crimson'
    },
    {
      num: `${executiveProfile.metrics.publicationsCount}`,
      suffix: '+',
      label: 'Publications',
      detail: 'SCI / Scopus / IEEE',
      icon: FileText,
      iconClass: 'stat-icon-navy'
    },
    {
      num: `${executiveProfile.metrics.phdSupervisedCount}`,
      suffix: '',
      label: 'Ph.D. Scholars',
      detail: 'Supervised & Guided',
      icon: GraduationCap,
      iconClass: 'stat-icon-crimson'
    },
    {
      num: '13',
      suffix: '',
      label: 'Books & Chapters',
      detail: 'Authored & Edited',
      icon: BookOpen,
      iconClass: 'stat-icon-gold'
    },
    {
      num: `${executiveProfile.metrics.patentsCount}`,
      suffix: '',
      label: 'Patents to Credit',
      detail: 'Published & Granted',
      icon: Lightbulb,
      iconClass: 'stat-icon-gold'
    },
    {
      num: `${executiveProfile.metrics.awardsCount}`,
      suffix: '+',
      label: 'National Awards',
      detail: '& Global Honors',
      icon: Award,
      iconClass: 'stat-icon-crimson'
    },
    {
      num: `${executiveProfile.metrics.mousCount}`,
      suffix: '+',
      label: 'MoUs & Alliances',
      detail: 'Industry & Global',
      icon: Globe,
      iconClass: 'stat-icon-navy'
    }
  ];

  return (
    <section className="stat-strip">
      <div className="container">
        <div className="stat-strip-grid">
          {stats.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={idx} className="stat-strip-item">
                <div className={`stat-icon-wrapper ${item.iconClass}`}>
                  <IconComponent size={20} strokeWidth={2} />
                </div>
                <div className="stat-content">
                  <div className="stat-value-row">
                    <span className="stat-number">{item.num}</span>
                    {item.suffix && <span className="stat-suffix">{item.suffix}</span>}
                  </div>
                  <div className="stat-label">{item.label}</div>
                  <div className="stat-detail">{item.detail}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

