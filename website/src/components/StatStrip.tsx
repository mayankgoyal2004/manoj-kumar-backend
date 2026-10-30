import React from 'react';
import { Users, FileText, GraduationCap, BookOpen, Lightbulb, Award, Globe } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const StatStrip: React.FC = () => {
  const { profile, liveMetrics } = usePortfolio();

  const rawMetrics = profile?.metrics || {};
  const useManual = rawMetrics.useManualStats !== false;
  const metrics = useManual
    ? { ...liveMetrics, ...rawMetrics }
    : { ...rawMetrics, ...liveMetrics };

  const stats = [
    {
      num: `${metrics.experienceYears ?? 35}`,
      suffix: metrics.experienceYearsSuffix !== undefined ? metrics.experienceYearsSuffix : '+',
      label: 'Years Leadership',
      detail: 'Higher Education',
      icon: Users,
      iconClass: 'stat-icon-crimson'
    },
    {
      num: `${metrics.publicationsCount ?? 151}`,
      suffix: metrics.publicationsSuffix !== undefined ? metrics.publicationsSuffix : '+',
      label: 'Publications',
      detail: 'SCI / Scopus / IEEE',
      icon: FileText,
      iconClass: 'stat-icon-navy'
    },
    {
      num: `${metrics.supervisionCount ?? metrics.phdSupervisedCount ?? 9}`,
      suffix: metrics.supervisionSuffix !== undefined ? metrics.supervisionSuffix : '',
      label: 'Ph.D. Scholars',
      detail: 'Supervised & Guided',
      icon: GraduationCap,
      iconClass: 'stat-icon-crimson'
    },
    {
      num: `${metrics.booksCount ?? 13}`,
      suffix: metrics.booksSuffix !== undefined ? metrics.booksSuffix : '',
      label: 'Books & Chapters',
      detail: 'Authored & Edited',
      icon: BookOpen,
      iconClass: 'stat-icon-gold'
    },
    {
      num: `${metrics.patentsCount ?? 4}`,
      suffix: metrics.patentsSuffix !== undefined ? metrics.patentsSuffix : '',
      label: 'Patents to Credit',
      detail: 'Published & Granted',
      icon: Lightbulb,
      iconClass: 'stat-icon-gold'
    },
    {
      num: `${metrics.awardsCount ?? 26}`,
      suffix: metrics.awardsSuffix !== undefined ? metrics.awardsSuffix : '+',
      label: 'National Awards',
      detail: '& Global Honors',
      icon: Award,
      iconClass: 'stat-icon-crimson'
    },
    {
      num: `${metrics.mousCount ?? 26}`,
      suffix: metrics.mousSuffix !== undefined ? metrics.mousSuffix : '+',
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
