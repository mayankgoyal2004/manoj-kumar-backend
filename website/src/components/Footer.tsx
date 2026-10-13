import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

interface FooterProps {
  onNavigate?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const { profile, settings } = usePortfolio();

  const currentYear = new Date().getFullYear();
  const name = profile.fullName || 'Prof. (Dr.) Manoj Kumar';
  const designation = profile.designation || 'Vice-Chancellor';
  const footerText = settings?.footer || `© ${currentYear} ${name} · ${designation} • All Rights Reserved`;

  const socialLinkedIn = settings?.linkedin || profile.contact?.linkedIn;
  const socialTwitter = settings?.x || profile.contact?.twitter;

  return (
    <footer className="academic-footer-simple">
      <div className="container">
        <div className="footer-simple-content">
          <div className="footer-simple-left">
            <span className="footer-developer">
              Developed and Powered by <strong className="footer-dev-brand">Vibrantick Infotech Solutions</strong>
            </span>
          </div>

          <div className="footer-simple-right">
            {(socialLinkedIn || socialTwitter) && (
              <div className="footer-social-links" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {socialLinkedIn && (
                  <a
                    href={socialLinkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn Profile"
                    style={{ color: 'rgba(255,255,255,0.7)', display: 'inline-flex', transition: 'color 0.2s' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" r="2" cy="4" />
                    </svg>
                  </a>
                )}
                {socialTwitter && (
                  <a
                    href={socialTwitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="X (Twitter) Profile"
                    style={{ color: 'rgba(255,255,255,0.7)', display: 'inline-flex', transition: 'color 0.2s' }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                )}
              </div>
            )}
            <span className="footer-copyright">
              {footerText}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
