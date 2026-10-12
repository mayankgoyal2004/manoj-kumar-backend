import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, FileText, Lightbulb, BookOpen, Award, Users, Briefcase, Video, Newspaper, ArrowRight } from 'lucide-react';
import { allPublications } from '../data/publicationsData';
import { patentsList } from '../data/patentsData';
import { booksList } from '../data/booksData';
import { awardsList } from '../data/awardsData';
import { phdScholarsList } from '../data/phdSupervisionData';
import { careerPositions } from '../data/positionsData';
import { galleryItems } from '../data/galleryData';
import { newsMediaItems } from '../data/newsMediaData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
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

    // Search News & Media Coverage (top matches)
    for (const news of newsMediaItems) {
      if (
        news.title.toLowerCase().includes(q) ||
        news.headline.toLowerCase().includes(q) ||
        news.source.toLowerCase().includes(q) ||
        news.excerpt.toLowerCase().includes(q) ||
        news.tags.some(t => t.toLowerCase().includes(q))
      ) {
        results.push({
          category: `News (${news.source})`,
          title: news.title,
          snippet: news.excerpt.slice(0, 110) + '...',
          sectionId: 'news',
          icon: Newspaper
        });
      }
    }

    // Search Publications (top 5 matches)
    for (const pub of allPublications) {
      if (pub.rawCitation.toLowerCase().includes(q)) {
        results.push({
          category: `Publication (${pub.category})`,
          title: pub.rawCitation.slice(0, 100) + '...',
          snippet: pub.rawCitation,
          sectionId: 'publications',
          icon: FileText
        });
        if (results.filter(r => r.sectionId === 'publications').length >= 4) break;
      }
    }

    // Search Patents
    for (const pat of patentsList) {
      if (pat.title.toLowerCase().includes(q) || pat.patentNumber.toLowerCase().includes(q) || pat.description.toLowerCase().includes(q)) {
        results.push({
          category: 'Patent / IP',
          title: pat.title,
          snippet: `Patent No: ${pat.patentNumber} • ${pat.domain}`,
          sectionId: 'patents',
          icon: Lightbulb
        });
      }
    }

    // Search Books
    for (const book of booksList) {
      if (book.title.toLowerCase().includes(q) || book.authors.toLowerCase().includes(q) || (book.description && book.description.toLowerCase().includes(q))) {
        results.push({
          category: `Book (${book.type})`,
          title: book.title,
          snippet: `${book.authors} • ${book.publisher}`,
          sectionId: 'books',
          icon: BookOpen
        });
      }
    }

    // Search Awards
    for (const award of awardsList) {
      if (award.title.toLowerCase().includes(q) || award.description.toLowerCase().includes(q)) {
        results.push({
          category: 'Award / Honor',
          title: award.title,
          snippet: `${award.conferringBody} (${award.year})`,
          sectionId: 'awards',
          icon: Award
        });
      }
    }

    // Search Ph.D.
    for (const scholar of phdScholarsList) {
      if (scholar.scholarName.toLowerCase().includes(q) || scholar.thesisTitle.toLowerCase().includes(q)) {
        results.push({
          category: 'Ph.D. Scholar',
          title: scholar.scholarName,
          snippet: `Thesis: ${scholar.thesisTitle}`,
          sectionId: 'phd',
          icon: Users
        });
      }
    }

    // Search Positions
    for (const pos of careerPositions) {
      if (pos.role.toLowerCase().includes(q) || pos.institution.toLowerCase().includes(q) || pos.description.toLowerCase().includes(q)) {
        results.push({
          category: 'Position / Appointment',
          title: `${pos.role} — ${pos.institution}`,
          snippet: pos.period,
          sectionId: 'positions',
          icon: Briefcase
        });
      }
    }

    // Search Media & Gallery
    for (const item of galleryItems) {
      if (
        item.title.toLowerCase().includes(q) ||
        item.caption.toLowerCase().includes(q) ||
        (item.channel && item.channel.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        q.includes('video') ||
        q.includes('gallery') ||
        q.includes('youtube')
      ) {
        results.push({
          category: `Gallery (${item.type === 'video' ? 'Video' : item.category})`,
          title: item.title,
          snippet: item.caption,
          sectionId: 'gallery',
          icon: Video
        });
      }
    }

    return results;
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-header">
          <Search size={20} color="var(--color-crimson-800)" />
          <input
            ref={inputRef}
            type="text"
            className="search-modal-input"
            placeholder="Search across 151+ publications, patents, books, awards, scholars..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <div className="search-modal-results">
          {query.trim().length < 2 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
              Type at least 2 characters to search across the academic archive...
            </div>
          ) : searchResults.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
              No matches found for "{query}".
            </div>
          ) : (
            searchResults.map((res, idx) => {
              const IconComp = res.icon;
              return (
                <div
                  key={idx}
                  className="search-result-item"
                  onClick={() => {
                    onNavigate(res.sectionId);
                    onClose();
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="badge badge-navy" style={{ fontSize: '0.7rem' }}>
                      {res.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-crimson-800)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <span>Jump to section</span>
                      <ArrowRight size={11} />
                    </span>
                  </div>
                  <div className="search-result-title">{res.title}</div>
                  <div className="search-result-snippet">{res.snippet}</div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
