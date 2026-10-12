import React, { useState, useMemo } from 'react';
import { 
  Newspaper, 
  Calendar, 
  MapPin, 
  Clock, 
  ExternalLink, 
  Tag, 
  Search, 
  X, 
  CheckCircle2, 
  Bookmark, 
  Share2, 
  Award, 
  Globe, 
  FileText, 
  Sparkles,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { newsMediaItems, NewsMediaItem } from '../data/newsMediaData';

interface NewsMediaProps {
  onNavigate?: (sectionId: string) => void;
}

export const NewsMedia: React.FC<NewsMediaProps> = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<NewsMediaItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Categories list
  const categories = [
    'All',
    'Print Media',
    'Press Release',
    'Institutional',
    'Interviews',
    'Digital News'
  ];

  // Filter items based on Category & Search
  const filteredItems = useMemo(() => {
    return newsMediaItems.filter((item) => {
      const matchesCat = activeCategory === 'All' || item.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCat;

      const matchesSearch =
        item.title.toLowerCase().includes(query) ||
        item.headline.toLowerCase().includes(query) ||
        item.source.toLowerCase().includes(query) ||
        item.excerpt.toLowerCase().includes(query) ||
        (item.location && item.location.toLowerCase().includes(query)) ||
        item.tags.some(t => t.toLowerCase().includes(query));

      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Featured story (top featured story from all items)
  const featuredItem = newsMediaItems.find(item => item.isFeatured) || newsMediaItems[0];

  const handleShare = (item: NewsMediaItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `${item.title} — Prof. (Dr.) Manoj Kumar News Coverage`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${shareText}\n${window.location.origin}/#news`);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <div className="section-content-wrapper">
      {/* Header Section */}
      <div className="content-header">
        <div className="academic-breadcrumb">
          <span>Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">News & Media Coverage</span>
        </div>
        <div className="content-eyebrow">Institutional Press Bureau & Media Archives</div>
        <h2 className="content-title">News & Media Coverage</h2>
        <div className="content-subtitle">
          Press releases, newspaper features, television broadcasts, national award coverage, and thought leadership of Prof. (Dr.) Manoj Kumar
        </div>
      </div>

      {/* Media Metrics Bar */}
      <div className="news-metrics-strip">
        <div className="news-metric-pill">
          <Newspaper size={16} className="news-metric-icon" />
          <div>
            <span className="news-metric-val">{newsMediaItems.length}+</span>
            <span className="news-metric-lbl">Press Features</span>
          </div>
        </div>
        <div className="news-metric-pill">
          <Globe size={16} className="news-metric-icon" />
          <div>
            <span className="news-metric-val">10+</span>
            <span className="news-metric-lbl">Media Outlets</span>
          </div>
        </div>
        <div className="news-metric-pill">
          <Award size={16} className="news-metric-icon" />
          <div>
            <span className="news-metric-val">National</span>
            <span className="news-metric-lbl">Award Coverage</span>
          </div>
        </div>
        <div className="news-metric-pill">
          <TrendingUp size={16} className="news-metric-icon" />
          <div>
            <span className="news-metric-val">2024–26</span>
            <span className="news-metric-lbl">Recent Highlights</span>
          </div>
        </div>
      </div>

      {/* Featured Headline Spotlight */}
      {featuredItem && activeCategory === 'All' && !searchQuery && (
        <div className="news-featured-hero-card" onClick={() => setSelectedArticle(featuredItem)}>
          <div className="news-featured-badge-row">
            <span className="badge badge-crimson" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Sparkles size={12} /> Spotlight News
            </span>
            <span className="badge badge-gold">{featuredItem.source}</span>
            <span className="badge badge-surface">{featuredItem.date}</span>
          </div>

          <h3 className="news-featured-title">
            {featuredItem.title}
          </h3>

          <p className="news-featured-excerpt">
            {featuredItem.excerpt}
          </p>

          <div className="news-featured-footer">
            <div className="news-featured-meta">
              {featuredItem.location && (
                <span className="news-meta-item">
                  <MapPin size={13} /> {featuredItem.location}
                </span>
              )}
              {featuredItem.readTime && (
                <span className="news-meta-item">
                  <Clock size={13} /> {featuredItem.readTime}
                </span>
              )}
            </div>

            <button className="btn btn-crimson-sm" onClick={(e) => {
              e.stopPropagation();
              setSelectedArticle(featuredItem);
            }}>
              <span>Read Full Story</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="news-controls-row">
        <div className="awards-filter-bar news-filter-scroll">
          {categories.map((cat) => {
            const count = cat === 'All' 
              ? newsMediaItems.length 
              : newsMediaItems.filter(i => i.category === cat).length;
            return (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        <div className="news-search-box">
          <Search size={15} className="news-search-icon" />
          <input
            type="text"
            className="news-search-input"
            placeholder="Search news, topics, newspaper names..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="news-search-clear"
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* News Articles Grid */}
      {filteredItems.length === 0 ? (
        <div className="news-empty-state">
          <Newspaper size={40} strokeWidth={1.5} color="var(--color-crimson-800)" />
          <h4>No matching news articles found</h4>
          <p>Try adjusting your search query or switching the category filter.</p>
          <button 
            className="btn btn-outline" 
            style={{ marginTop: '0.75rem' }}
            onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="news-cards-grid">
          {filteredItems.map((item) => (
            <article 
              key={item.id} 
              className="news-article-card"
              onClick={() => setSelectedArticle(item)}
            >
              <div className="news-card-top">
                <div className="news-source-tag">
                  <span className="news-source-name">{item.source}</span>
                  <span className="news-category-pill">{item.category}</span>
                </div>

                <button 
                  className="news-card-share-btn"
                  onClick={(e) => handleShare(item, e)}
                  title="Copy link to this article"
                >
                  <Share2 size={13} />
                  {copiedId === item.id ? <span className="copied-tooltip">Copied!</span> : null}
                </button>
              </div>

              <h4 className="news-card-title">{item.title}</h4>

              <div className="news-card-meta-line">
                <span className="news-meta-item">
                  <Calendar size={12} /> {item.date}
                </span>
                {item.location && (
                  <span className="news-meta-item">
                    <MapPin size={12} /> {item.location}
                  </span>
                )}
                {item.readTime && (
                  <span className="news-meta-item">
                    <Clock size={12} /> {item.readTime}
                  </span>
                )}
              </div>

              <p className="news-card-excerpt">{item.excerpt}</p>

              {item.keyHighlights && item.keyHighlights.length > 0 && (
                <div className="news-card-highlights">
                  <div className="news-highlights-title">Key Highlights:</div>
                  <ul className="news-highlights-list">
                    {item.keyHighlights.slice(0, 2).map((highlight, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={12} className="news-check-icon" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="news-card-footer">
                <div className="news-tags-row">
                  {item.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="news-tag-chip">
                      #{tag}
                    </span>
                  ))}
                </div>

                <span className="news-read-more-link">
                  <span>Read Article</span>
                  <ArrowRight size={13} />
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Article Detail Reading Lightbox / Modal */}
      {selectedArticle && (
        <div className="lightbox-overlay" onClick={() => setSelectedArticle(null)}>
          <div 
            className="lightbox-content news-article-modal" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="lightbox-close-btn" 
              onClick={() => setSelectedArticle(null)}
              title="Close article"
            >
              <X size={20} />
            </button>

            <div className="news-modal-header">
              <div className="news-modal-badges">
                <span className="badge badge-crimson">{selectedArticle.category}</span>
                <span className="badge badge-gold">{selectedArticle.source}</span>
                <span className="badge badge-surface">{selectedArticle.date}</span>
                {selectedArticle.location && (
                  <span className="badge badge-surface" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <MapPin size={11} /> {selectedArticle.location}
                  </span>
                )}
              </div>

              <h2 className="news-modal-title">
                {selectedArticle.title}
              </h2>

              <div className="news-modal-headline">
                {selectedArticle.headline}
              </div>

              <div className="news-modal-meta-bar">
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                  <span>Published: <strong>{selectedArticle.date}</strong></span>
                  <span>•</span>
                  <span>Source: <strong>{selectedArticle.source}</strong></span>
                  {selectedArticle.readTime && (
                    <>
                      <span>•</span>
                      <span>{selectedArticle.readTime}</span>
                    </>
                  )}
                </div>

                <button 
                  className="btn btn-outline" 
                  style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                  onClick={(e) => handleShare(selectedArticle, e)}
                >
                  <Share2 size={13} />
                  <span>{copiedId === selectedArticle.id ? 'Link Copied!' : 'Share'}</span>
                </button>
              </div>
            </div>

            <div className="news-modal-body">
              {/* Excerpt Lead */}
              <div className="news-modal-lead">
                {selectedArticle.excerpt}
              </div>

              {/* Key Takeaways Box */}
              {selectedArticle.keyHighlights && selectedArticle.keyHighlights.length > 0 && (
                <div className="news-modal-takeaways">
                  <h4 className="takeaways-title">
                    <CheckCircle2 size={16} color="var(--color-crimson-800)" />
                    <span>Coverage Key Highlights</span>
                  </h4>
                  <ul className="takeaways-list">
                    {selectedArticle.keyHighlights.map((hl, idx) => (
                      <li key={idx}>{hl}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Full Content Paragraphs */}
              {selectedArticle.fullContent && selectedArticle.fullContent.map((paragraph, idx) => (
                <p key={idx} className="news-modal-p">
                  {paragraph}
                </p>
              ))}

              {/* Tags & External Link */}
              <div className="news-modal-footer">
                <div className="news-modal-tags">
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Tags:</span>
                  {selectedArticle.tags.map((tag, idx) => (
                    <span key={idx} className="badge badge-surface">
                      #{tag}
                    </span>
                  ))}
                </div>

                {selectedArticle.sourceUrl && (
                  <a
                    href={selectedArticle.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-crimson-sm"
                    style={{ textDecoration: 'none' }}
                  >
                    <span>Visit Institutional Portal</span>
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
