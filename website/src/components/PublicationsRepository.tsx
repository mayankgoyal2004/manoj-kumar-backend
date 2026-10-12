import React, { useState, useMemo } from 'react';
import { Search, FileText, ExternalLink, Copy, Check, Filter, BookOpen } from 'lucide-react';
import { allPublications, journalPublications, conferencePublications, Publication } from '../data/publicationsData';

export const PublicationsRepository: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const itemsPerPage = 12;

  // Extract unique years
  const availableYears = useMemo(() => {
    const years = new Set<number>();
    allPublications.forEach(p => {
      if (p.year) years.add(p.year);
    });
    return Array.from(years).sort((a, b) => b - a);
  }, []);

  // Filter logic
  const filteredPublications = useMemo(() => {
    return allPublications.filter(pub => {
      // Filter category
      if (selectedFilter === 'journal' && pub.category !== 'Journal') return false;
      if (selectedFilter === 'conference' && pub.category !== 'Conference') return false;
      if (selectedFilter === 'sci' && !pub.isSci) return false;
      if (selectedFilter === 'scopus' && !pub.isScopus) return false;
      if (selectedFilter === 'ugc' && !pub.isUgc) return false;
      if (selectedFilter === 'ieee' && !pub.isIeee) return false;

      // Filter year
      if (selectedYear !== 'all' && pub.year !== parseInt(selectedYear)) return false;

      // Filter query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return pub.rawCitation.toLowerCase().includes(q) || (pub.doi && pub.doi.toLowerCase().includes(q));
      }

      return true;
    });
  }, [searchQuery, selectedFilter, selectedYear]);

  // Pagination
  const totalPages = Math.ceil(filteredPublications.length / itemsPerPage) || 1;
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPublications.slice(start, start + itemsPerPage);
  }, [filteredPublications, currentPage]);

  const handleCopyCitation = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  return (
    <div className="section-content-wrapper">
      <div className="content-header">
        <div className="academic-breadcrumb">
          <span>Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Publications</span>
        </div>
        <div className="content-eyebrow">Scholarly Research</div>
        <h2 className="content-title">Research Publications Repository</h2>
        <div className="content-subtitle">
          Over 150 research articles in leading SCI / Scopus indexed international journals and IEEE / Springer conference proceedings
        </div>
      </div>

      {/* Toolbar */}
      <div className="pub-toolbar">
        <div className="pub-search-row">
          <div className="pub-search-input-wrapper">
            <Search size={16} className="pub-search-icon" />
            <input
              type="text"
              className="pub-search-input"
              placeholder="Search by keyword, author, journal, topic, or DOI..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <select
            className="form-select"
            style={{ width: 'auto', minWidth: '140px' }}
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Years</option>
            {availableYears.map(y => (
              <option key={y} value={y.toString()}>{y}</option>
            ))}
          </select>
        </div>

        {/* Filter Badges */}
        <div className="pub-filter-tags">
          <button
            className={`filter-btn ${selectedFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            All Papers ({allPublications.length})
          </button>
          <button
            className={`filter-btn ${selectedFilter === 'journal' ? 'active' : ''}`}
            onClick={() => handleFilterChange('journal')}
          >
            Journal Articles ({journalPublications.length})
          </button>
          <button
            className={`filter-btn ${selectedFilter === 'conference' ? 'active' : ''}`}
            onClick={() => handleFilterChange('conference')}
          >
            Conference Proceedings ({conferencePublications.length})
          </button>
          <button
            className={`filter-btn ${selectedFilter === 'sci' ? 'active' : ''}`}
            onClick={() => handleFilterChange('sci')}
          >
            SCI / SCIE Indexed
          </button>
          <button
            className={`filter-btn ${selectedFilter === 'scopus' ? 'active' : ''}`}
            onClick={() => handleFilterChange('scopus')}
          >
            Scopus Indexed
          </button>
          <button
            className={`filter-btn ${selectedFilter === 'ugc' ? 'active' : ''}`}
            onClick={() => handleFilterChange('ugc')}
          >
            UGC-CARE
          </button>
          <button
            className={`filter-btn ${selectedFilter === 'ieee' ? 'active' : ''}`}
            onClick={() => handleFilterChange('ieee')}
          >
            IEEE Conferences
          </button>
        </div>

        <div className="pub-stats-summary">
          <span>Showing {filteredPublications.length} matching publication{filteredPublications.length === 1 ? '' : 's'}</span>
          <span>Page {currentPage} of {totalPages}</span>
        </div>
      </div>

      {/* Publications List */}
      <div className="pub-items-list">
        {paginatedList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--color-text-muted)' }}>
            No publications found matching your search criteria.
          </div>
        ) : (
          paginatedList.map((pub) => (
            <div key={pub.id} className="pub-item-card">
              <div className="pub-item-top">
                <span className="pub-id-badge">{pub.id}</span>
                <div className="pub-badges-group">
                  {pub.year && <span className="badge badge-gold">{pub.year}</span>}
                  <span className={`badge ${pub.category === 'Journal' ? 'badge-crimson' : 'badge-navy'}`}>
                    {pub.category}
                  </span>
                  {pub.isSci && <span className="badge badge-sci">SCI</span>}
                  {pub.isScopus && <span className="badge badge-scopus">Scopus</span>}
                  {pub.isUgc && <span className="badge badge-ugc">UGC Care</span>}
                  {pub.isIeee && <span className="badge badge-navy">IEEE</span>}
                </div>
              </div>

              <div className="pub-citation-text">
                {pub.rawCitation}
              </div>

              <div className="pub-card-footer">
                <div>
                  {pub.doi && (
                    <a
                      href={pub.doi.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pub-doi-link"
                    >
                      <ExternalLink size={12} />
                      <span>{pub.doi}</span>
                    </a>
                  )}
                  {pub.issn && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--color-text-muted)', marginLeft: '0.75rem' }}>
                      ISSN: {pub.issn}
                    </span>
                  )}
                </div>

                <button
                  className="filter-btn"
                  style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  onClick={() => handleCopyCitation(pub.id, pub.rawCitation)}
                  title="Copy Citation"
                >
                  {copiedId === pub.id ? (
                    <>
                      <Check size={12} color="#059669" />
                      <span style={{ color: '#059669' }}>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy Citation</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pub-pagination">
          <button
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          >
            Previous
          </button>

          {(() => {
            const pages: (number | string)[] = [];
            if (totalPages <= 7) {
              for (let i = 1; i <= totalPages; i++) pages.push(i);
            } else if (currentPage <= 4) {
              for (let i = 1; i <= 5; i++) pages.push(i);
              pages.push('...');
              pages.push(totalPages);
            } else if (currentPage >= totalPages - 3) {
              pages.push(1);
              pages.push('...');
              for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
            } else {
              pages.push(1);
              pages.push('...');
              pages.push(currentPage - 1);
              pages.push(currentPage);
              pages.push(currentPage + 1);
              pages.push('...');
              pages.push(totalPages);
            }

            return pages.map((page, idx) => {
              if (page === '...') {
                return (
                  <span
                    key={`ellipsis-${idx}`}
                    style={{ padding: '0.45rem 0.6rem', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}
                  >
                    ...
                  </span>
                );
              }
              const pageNum = page as number;
              return (
                <button
                  key={`page-${pageNum}`}
                  className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            });
          })()}

          <button
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
