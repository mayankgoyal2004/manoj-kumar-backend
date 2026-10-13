import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, FileText, Lightbulb, BookOpen, Award, Users, Briefcase, Video, Newspaper, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const { news, publications, patents, books, awards, supervision, positions, gallery } = usePortfolio();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];

    const q = query.toLowerCase();
    const results: Array<{
      category: string;
      title: string;
      snippet: string;
      sectionId: string;
      icon: any;
    }> = [];

    // Search News & Media Coverage
    for (const item of news) {
      const title = item.headline || item.title || '';
      const excerpt = item.summary || item.excerpt || '';
      const source = item.outlet || item.source || '';
      if (
        title.toLowerCase().includes(q) ||
        excerpt.toLowerCase().includes(q) ||
        source.toLowerCase().includes(q)
      ) {
        results.push({
          category: `News (${source || 'Media'})`,
          title,
          snippet: excerpt.slice(0, 110) + '...',
          sectionId: 'news',
          icon: Newspaper,
        });
      }
    }

    // Search Publications (top matches)
    for (const pub of publications) {
      const text = pub.rawCitation || pub.abstract || pub.title || '';
      if (text.toLowerCase().includes(q)) {
        results.push({
          category: `Publication (${pub.category || pub.publicationType || 'Journal'})`,
          title: pub.title || text.slice(0, 100) + '...',
          snippet: text.slice(0, 120) + '...',
          sectionId: 'publications',
          icon: FileText,
        });
        if (results.filter((r) => r.sectionId === 'publications').length >= 5) break;
      }
    }

    // Search Patents
    for (const pat of patents) {
      const title = pat.title || '';
      const num = pat.patentNumber || '';
      const desc = pat.abstract || pat.description || '';
      if (title.toLowerCase().includes(q) || num.toLowerCase().includes(q) || desc.toLowerCase().includes(q)) {
        results.push({
          category: 'Patent / IP',
          title,
          snippet: `Patent No: ${num} • ${pat.domain || 'Communications'}`,
          sectionId: 'patents',
          icon: Lightbulb,
        });
      }
    }

    // Search Books
    for (const book of books) {
      const title = book.title || '';
      const authors = book.authors || book.coAuthors || '';
      const desc = book.description || book.abstract || '';
      if (title.toLowerCase().includes(q) || authors.toLowerCase().includes(q) || desc.toLowerCase().includes(q)) {
        results.push({
          category: `Book (${book.kind || book.type || 'Textbook'})`,
          title,
          snippet: `${authors} • ${book.publisher || ''}`,
          sectionId: 'books',
          icon: BookOpen,
        });
      }
    }

    // Search Awards
    for (const award of awards) {
      const title = award.title || '';
      const desc = award.citation || award.description || '';
      const org = award.organisation || award.conferringBody || '';
      if (title.toLowerCase().includes(q) || desc.toLowerCase().includes(q) || org.toLowerCase().includes(q)) {
        results.push({
          category: 'Award / Honor',
          title,
          snippet: `${org} (${award.year || ''})`,
          sectionId: 'awards',
          icon: Award,
        });
      }
    }

    // Search Ph.D. Scholars
    for (const scholar of supervision) {
      const name = scholar.scholar || scholar.scholarName || '';
      const thesis = scholar.thesis || scholar.thesisTitle || '';
      if (name.toLowerCase().includes(q) || thesis.toLowerCase().includes(q)) {
        results.push({
          category: 'Ph.D. / PG Scholar',
          title: name,
          snippet: `Thesis: ${thesis}`,
          sectionId: 'phd',
          icon: Users,
        });
      }
    }

    // Search Positions
    for (const pos of positions) {
      const role = pos.role || '';
      const org = pos.organisation || pos.institution || '';
      const desc = pos.description || '';
      if (role.toLowerCase().includes(q) || org.toLowerCase().includes(q) || desc.toLowerCase().includes(q)) {
        results.push({
          category: 'Position / Appointment',
          title: `${role} — ${org}`,
          snippet: pos.period || `${pos.startYear || ''} – ${pos.endYear || 'Present'}`,
          sectionId: 'positions',
          icon: Briefcase,
        });
      }
    }

    // Search Media & Gallery
    for (const item of gallery) {
      const title = item.title || item.caption || '';
      const caption = item.caption || '';
      if (title.toLowerCase().includes(q) || caption.toLowerCase().includes(q)) {
        results.push({
          category: 'Gallery',
          title,
          snippet: caption.slice(0, 110) + '...',
          sectionId: 'gallery',
          icon: Video,
        });
      }
    }

    return results.slice(0, 15);
  }, [query, news, publications, patents, books, awards, supervision, positions, gallery]);

  const handleSelectResult = (sectionId: string) => {
    onNavigate(sectionId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-backdrop" onClick={onClose}>
      <div className="search-modal-window" onClick={(e) => e.stopPropagation()}>
        {/* Search Header */}
        <div className="search-modal-header">
          <Search size={20} className="search-modal-input-icon" />
          <input
            ref={inputRef}
            type="text"
            className="search-modal-input"
            placeholder="Search publications, patents, books, awards, scholars..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              className="search-modal-clear-btn"
              onClick={() => setQuery('')}
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
          <button
            className="search-modal-close-btn"
            onClick={onClose}
            title="Close modal (Esc)"
          >
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', opacity: 0.6 }}>ESC</span>
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        {!query && (
          <div className="search-suggestions-box">
            <div className="search-suggestions-title">Quick Academic Searches</div>
            <div className="search-suggestions-chips">
              {['Photonics', 'Visible Light Communication', 'Optical Wireless', 'Patents', 'Vice-Chancellor', 'Awards', 'Books', 'DAV University'].map((chip) => (
                <button
                  key={chip}
                  className="search-chip"
                  onClick={() => setQuery(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        <div className="search-results-list">
          {query.trim().length >= 2 && searchResults.length === 0 && (
            <div className="search-empty-state">
              No academic records matching "<strong>{query}</strong>".
            </div>
          )}

          {searchResults.map((result, idx) => {
            const IconComp = result.icon;
            return (
              <div
                key={idx}
                className="search-result-item"
                onClick={() => handleSelectResult(result.sectionId)}
              >
                <div className="search-result-icon-box">
                  <IconComp size={16} />
                </div>
                <div className="search-result-content">
                  <div className="search-result-category">{result.category}</div>
                  <h4 className="search-result-title">{result.title}</h4>
                  <p className="search-result-snippet">{result.snippet}</p>
                </div>
                <div className="search-result-arrow">
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="search-modal-footer">
          <span>Navigate with cursor or click • Press <strong>ESC</strong> to close</span>
          {searchResults.length > 0 && (
            <span>{searchResults.length} matching items</span>
          )}
        </div>
      </div>
    </div>
  );
};
