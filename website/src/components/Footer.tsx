import React from 'react';

interface FooterProps {
  onNavigate?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
            <span className="footer-copyright">
              © {new Date().getFullYear()} Prof. (Dr.) Manoj Kumar • All Rights Reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
