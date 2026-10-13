import React from 'react';
import { BookOpen, Bookmark, FileText, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const BooksLibrary: React.FC = () => {
  const { books } = usePortfolio();

  const isChapter = (b: any) => {
    const k = (b.kind || b.type || '').toLowerCase();
    return k.includes('chapter');
  };

  const isReviewed = (b: any) => {
    const k = (b.kind || b.type || '').toLowerCase();
    return k.includes('review') || k.includes('edit');
  };

  const bookChapters = books.filter((b: any) => isChapter(b));
  const authoredBooks = books.filter((b: any) => !isChapter(b) && !isReviewed(b));
  const reviewedBooks = books.filter((b: any) => isReviewed(b));

  return (
    <div className="section-content-wrapper">
      <div className="content-header">
        <div className="academic-breadcrumb">
          <span>Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Books Authored & Chapters</span>
        </div>
        <div className="content-eyebrow">Academic Publications</div>
        <h2 className="content-title">Books, Springer Chapters & Textbooks</h2>
        <div className="content-subtitle">
          Authored textbooks, Springer research chapters on IoT and public health, and reviewed volumes
        </div>
      </div>

      {/* Springer Book Chapters */}
      {bookChapters.length > 0 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.35rem', color: 'var(--color-crimson-900)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bookmark size={20} color="var(--color-gold-500)" />
            <span>Springer Nature Research Chapters ({String(bookChapters.length).padStart(2, '0')} Chapters)</span>
          </h3>

          <div className="books-grid">
            {bookChapters.map((b: any) => {
              const authors = b.authors || b.coAuthors;
              const desc = b.description || b.abstract;

              return (
                <div key={b.id} className="book-card" style={{ borderTopColor: 'var(--color-gold-500)' }}>
                  <span className="badge badge-gold" style={{ alignSelf: 'flex-start', marginBottom: '0.5rem' }}>
                    Springer Book Chapter
                  </span>
                  <h4 className="book-title">{b.title}</h4>
                  {authors && <div className="book-authors">{authors}</div>}
                  <div className="book-publisher">{b.publisher} {b.year ? `(${b.year})` : ''}</div>
                  {desc && (
                    <p style={{ fontSize: '0.86rem', color: 'var(--color-text-secondary)', margin: '0.5rem 0', lineHeight: 1.5 }}>
                      {desc}
                    </p>
                  )}

                  <div className="book-meta-footer">
                    {b.isbn && <span className="mono-font" style={{ fontSize: '0.75rem' }}>ISBN: {b.isbn}</span>}
                    {b.doi && (
                      <a
                        href={b.doi.startsWith('http') ? b.doi : `https://doi.org/${b.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}
                      >
                        <ExternalLink size={11} />
                        <span>DOI Link</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Authored Textbooks */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.35rem', color: 'var(--color-crimson-900)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={20} />
          <span>Authored & Co-Authored Textbooks ({String(authoredBooks.length).padStart(2, '0')} Books)</span>
        </h3>

        <div className="books-grid">
          {authoredBooks.map((b: any) => {
            const authors = b.authors || b.coAuthors;
            const desc = b.description || b.abstract;

            return (
              <div key={b.id} className="book-card">
                <span className="badge badge-crimson" style={{ alignSelf: 'flex-start', marginBottom: '0.5rem' }}>
                  Textbook
                </span>
                <h4 className="book-title">{b.title}</h4>
                {authors && <div className="book-authors">{authors}</div>}
                <div className="book-publisher">{b.publisher} {b.location ? `, ${b.location}` : ''} {b.year ? `(${b.year})` : ''}</div>
                {desc && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: '0.5rem 0', lineHeight: 1.5 }}>
                    {desc}
                  </p>
                )}

                {b.isbn && (
                  <div className="book-meta-footer">
                    <span className="mono-font">ISBN: {b.isbn}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviewed / Edited Textbooks */}
      {reviewedBooks.length > 0 && (
        <div>
          <h3 style={{ fontSize: '1.35rem', color: 'var(--color-crimson-900)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={19} />
            <span>Peer-Reviewed & Edited Textbooks ({String(reviewedBooks.length).padStart(2, '0')} Books)</span>
          </h3>

          <div className="mtech-table-wrapper">
            <table className="academic-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>#</th>
                  <th>Book Title & Edition</th>
                  <th>Original Authors / Editors</th>
                  <th>Publishing House</th>
                </tr>
              </thead>
              <tbody>
                {reviewedBooks.map((b: any, idx: number) => (
                  <tr key={b.id || idx}>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{String(idx + 1).padStart(2, '0')}</td>
                    <td style={{ fontWeight: 600, color: 'var(--color-crimson-900)' }}>{b.title}</td>
                    <td>{b.authors || b.coAuthors || '—'}</td>
                    <td>{b.publisher || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
