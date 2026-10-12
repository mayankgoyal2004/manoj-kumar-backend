import React from 'react';
import { BookOpen, Bookmark, FileText, CheckCircle2, ExternalLink } from 'lucide-react';
import { booksList } from '../data/booksData';

export const BooksLibrary: React.FC = () => {
  const authoredBooks = booksList.filter(b => b.type === 'Authored');
  const bookChapters = booksList.filter(b => b.type === 'Chapter');
  const reviewedBooks = booksList.filter(b => b.type === 'Reviewed');

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
          09 authored textbooks, 04 Springer research chapters on IoT and public health, and 05 national textbooks reviewed for Tata McGraw-Hill
        </div>
      </div>

      {/* Springer Book Chapters */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.35rem', color: 'var(--color-crimson-900)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Bookmark size={20} color="var(--color-gold-500)" />
          <span>Springer Nature Research Chapters (04 Chapters)</span>
        </h3>

        <div className="books-grid">
          {bookChapters.map((b) => (
            <div key={b.id} className="book-card" style={{ borderTopColor: 'var(--color-gold-500)' }}>
              <span className="badge badge-gold" style={{ alignSelf: 'flex-start', marginBottom: '0.5rem' }}>
                Springer Book Chapter
              </span>
              <h4 className="book-title">{b.title}</h4>
              <div className="book-authors">{b.authors}</div>
              <div className="book-publisher">{b.publisher} ({b.year})</div>
              {b.description && (
                <p style={{ fontSize: '0.86rem', color: 'var(--color-text-secondary)', margin: '0.5rem 0', lineHeight: 1.5 }}>
                  {b.description}
                </p>
              )}

              <div className="book-meta-footer">
                {b.isbn && <span className="mono-font" style={{ fontSize: '0.75rem' }}>ISBN: {b.isbn}</span>}
                {b.doi && (
                  <a
                    href={`https://doi.org/${b.doi}`}
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
          ))}
        </div>
      </div>

      {/* Authored Textbooks */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.35rem', color: 'var(--color-crimson-900)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={20} />
          <span>Authored & Co-Authored Textbooks (09 Books)</span>
        </h3>

        <div className="books-grid">
          {authoredBooks.map((b) => (
            <div key={b.id} className="book-card">
              <span className="badge badge-crimson" style={{ alignSelf: 'flex-start', marginBottom: '0.5rem' }}>
                Textbook
              </span>
              <h4 className="book-title">{b.title}</h4>
              <div className="book-authors">{b.authors}</div>
              <div className="book-publisher">{b.publisher}, {b.location} ({b.year})</div>
              {b.description && (
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: '0.5rem 0', lineHeight: 1.5 }}>
                  {b.description}
                </p>
              )}

              <div className="book-meta-footer">
                <span className="mono-font">ISBN: {b.isbn}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviewed Textbooks */}
      <div>
        <h3 style={{ fontSize: '1.35rem', color: 'var(--color-crimson-900)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText size={19} />
          <span>Peer-Reviewed National & International Textbooks (05 Books)</span>
        </h3>

        <div className="mtech-table-wrapper">
          <table className="academic-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>#</th>
                <th>Book Title & Edition</th>
                <th>Original Authors</th>
                <th>Publishing House</th>
              </tr>
            </thead>
            <tbody>
              {reviewedBooks.map((b, idx) => (
                <tr key={b.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>0{idx + 1}</td>
                  <td style={{ fontWeight: 600, color: 'var(--color-crimson-900)' }}>{b.title}</td>
                  <td>{b.authors}</td>
                  <td>{b.publisher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
