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

  const profileCopyright = `© ${currentYear} ${name} • All Rights Reserved`;

  return (
    <footer className="academic-footer-simple">
      <div className="container">
        <div className="footer-simple-content">
          <div className="footer-simple-left">
            <span className="footer-copyright">
              {footerText}
            </span>
          </div>

          <div className="footer-simple-right">
            <span className="footer-profile-copyright">
              {profileCopyright}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
