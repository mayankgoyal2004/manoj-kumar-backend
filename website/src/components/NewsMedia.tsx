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
  Share2, 
  Award, 
  Globe, 
  Globe2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Eye,
  Layers
} from 'lucide-react';
import { usePortfolio, resolveDocumentUrl } from '../context/PortfolioContext';
import { 
  pressClippings as fallbackPressClippings, 
  newsMediaItems as fallbackNewsItems,
  PressClipping,
  NewsMediaItem 
} from '../data/newsMediaData';
import { NewsImageLightbox } from './NewsImageLightbox';

interface NewsMediaProps {
  onNavigate?: (sectionId: string) => void;
}

export const NewsMedia: React.FC<NewsMediaProps> = () => {
  const { news: rawNews } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<NewsMediaItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Lightbox modal state for Left-Right interactive image gallery
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  const handleOpenLightbox = (index: number = 0) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  // Build unified dynamic Press Clippings list (merging backend news with clippings data)
  const clippings: PressClipping[] = useMemo(() => {
    // If backend has news items with images, transform or enrich them
    const dynamicFromBackend: PressClipping[] = [];
    const usedIds = new Set<string>();

    if (Array.isArray(rawNews) && rawNews.length > 0) {
      rawNews.forEach((item: any, idx: number) => {
        const img = item.image || item.imageUrl;
        // Check if item has a newspaper/clipping image
        if (img && typeof img === 'string' && img.trim() !== '') {
          // See if it matches any known fallback clipping for rich Hindi/Punjabi details
          const matchingFallback = fallbackPressClippings.find(
            (fb) => 
              fb.id === item.id || 
              (item.headline && fb.headline.toLowerCase().includes(item.headline.toLowerCase())) ||
              (item.outlet && fb.newspaper.toLowerCase() === item.outlet.toLowerCase() && fb.date === item.date)
          );

          const clippingItem: PressClipping = {
            id: item.id || matchingFallback?.id || `clip-dynamic-${idx}`,
            title: matchingFallback?.title || item.headline || item.title || 'Press Clipping',
            newspaper: item.outlet || item.source || matchingFallback?.newspaper || 'Print Media',
            date: item.date || matchingFallback?.date || 'Archival',
            edition: matchingFallback?.edition || item.edition || 'State Edition',
            imageUrl: resolveDocumentUrl(img || matchingFallback?.imageUrl || ''),
            headline: matchingFallback?.headline || item.headline || item.title || 'Newspaper Feature',
            subheadline: matchingFallback?.subheadline || item.summary || item.excerpt || '',
            description: item.summary || item.excerpt || matchingFallback?.description || '',
            language: matchingFallback?.language || item.language || 'Hindi / Punjabi / English',
            highlights: matchingFallback?.highlights || (Array.isArray(item.keyHighlights) ? item.keyHighlights : (Array.isArray(item.highlights) ? item.highlights : [])),
            tags: matchingFallback?.tags || (Array.isArray(item.tags) ? item.tags : [item.outlet || 'Print Media', 'Press Feature'])
          };

          usedIds.add(clippingItem.id);
          if (matchingFallback) usedIds.add(matchingFallback.id);
          dynamicFromBackend.push(clippingItem);
        }
      });
    }

    // Include any fallback press clippings not already included from backend
    const remainingFallbacks = fallbackPressClippings
      .filter((fb) => !usedIds.has(fb.id))
      .map((fb) => ({
        ...fb,
        imageUrl: resolveDocumentUrl(fb.imageUrl)
      }));

    const result = [...dynamicFromBackend, ...remainingFallbacks];
    return result.length > 0 ? result : fallbackPressClippings;
  }, [rawNews]);

  // Build unified dynamic news media articles list for filtering & search
  const newsMediaItems: NewsMediaItem[] = useMemo(() => {
    if (!Array.isArray(rawNews) || rawNews.length === 0) {
      return fallbackNewsItems.map((item) => ({
        ...item,
        imageUrl: item.imageUrl ? resolveDocumentUrl(item.imageUrl) : undefined
      }));
    }

    return rawNews.map((item: any, idx: number) => {
      const title = item.headline || item.title || 'News Update';
      const excerpt = item.summary || item.excerpt || title;
      const source = item.outlet || item.source || 'Institutional Media';
      const category = item.category || 'Press Release';
      const date = item.date || '2026';
      const rawImg = item.image || item.imageUrl;
      const imageUrl = rawImg ? resolveDocumentUrl(rawImg) : undefined;
      const sourceUrl = item.link || item.sourceUrl || 'https://www.davuniversity.org';
      const tags = Array.isArray(item.tags) && item.tags.length ? item.tags : ['DAV University', 'Academic Excellence'];

      // Look up if there's a richer fallback with full content or highlights
      const matchingFallback = fallbackNewsItems.find(
        (fb) => fb.id === item.id || fb.title.toLowerCase() === title.toLowerCase()
      );

      return {
        id: item.id || `news-${idx}`,
        title,
        headline: item.headline || title,
        source,
        category: (category as any),
        date,
        readTime: item.readTime || matchingFallback?.readTime || '3 min read',
        location: item.location || matchingFallback?.location || 'Jalandhar / New Delhi',
        excerpt,
        fullContent: Array.isArray(item.fullContent) && item.fullContent.length 
          ? item.fullContent 
          : (matchingFallback?.fullContent || [excerpt]),
        keyHighlights: Array.isArray(item.keyHighlights) && item.keyHighlights.length
          ? item.keyHighlights
          : (matchingFallback?.keyHighlights || []),
        imageUrl: imageUrl || (matchingFallback?.imageUrl ? resolveDocumentUrl(matchingFallback.imageUrl) : undefined),
        sourceUrl,
        tags: tags.length ? tags : (matchingFallback?.tags || ['DAV University', 'Media Coverage']),
        isFeatured: item.isFeatured || matchingFallback?.isFeatured || idx === 0,
      };
    });
  }, [rawNews]);

  // Categories list
  const categoriesSet = new Set<string>();
  newsMediaItems.forEach((i) => {
    if (i.category) categoriesSet.add(i.category);
  });
  const categories = ['All', ...Array.from(categoriesSet)];

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
  }, [newsMediaItems, activeCategory, searchQuery]);

  // Featured story
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

  // Helper to open clipping in lightbox if an article has a matching clipping image
  const handleArticleClippingClick = (article: NewsMediaItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!article.imageUrl) return;
    const clipIdx = clippings.findIndex(
      c => c.imageUrl === article.imageUrl || c.id === article.id || c.headline.includes(article.headline)
    );
    if (clipIdx !== -1) {
      handleOpenLightbox(clipIdx);
    } else {
      handleOpenLightbox(0);
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
        <div className="content-eyebrow">Archival Press Bureau & Media Archives</div>
        <h2 className="content-title">News & Media Coverage</h2>
        <div className="content-subtitle">
          Original archival press coverage, newspaper features, national award highlights, and media archives of Prof. (Dr.) Manoj Kumar
        </div>
      </div>

      {/* Media Metrics Bar */}
      <div className="news-metrics-strip">
        <div className="news-metric-pill">
          <Newspaper size={16} className="news-metric-icon" />
          <div>
            <span className="news-metric-val">{clippings.length}</span>
            <span className="news-metric-lbl">Print Clippings</span>
          </div>
        </div>
        <div className="news-metric-pill">
          <Globe size={16} className="news-metric-icon" />
          <div>
            <span className="news-metric-val">{newsMediaItems.length}+</span>
            <span className="news-metric-lbl">Media Reports</span>
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
            <span className="news-metric-val">2016–26</span>
            <span className="news-metric-lbl">Archival Timeline</span>
          </div>
        </div>
      </div>

      {/* Archival Newspaper Clippings Section with Left-Right Viewer */}
      {clippings.length > 0 && (
        <div className="news-clippings-showcase">
          <div className="news-clippings-header">
            <div className="news-clippings-title-group">
              <h3>
                <Newspaper size={20} color="var(--color-crimson-800)" />
                <span>Archival Newspaper Clippings & Print Features</span>
              </h3>
              <p>
                Original press clippings from leading national and state dailies. Click any clipping to open the interactive Left/Right popup viewer.
              </p>
            </div>
          </div>

          <div className="news-clippings-grid">
            {clippings.map((clip, idx) => (
              <div
                key={clip.id}
                className="news-clipping-card"
                onClick={() => handleOpenLightbox(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleOpenLightbox(idx);
                  }
                }}
                title={`Click to inspect ${clip.newspaper} clipping in Left/Right viewer`}
              >
                <div className="news-clipping-img-wrap">
                  <img
                    src={clip.imageUrl}
                    alt={clip.headline}
                    className="news-clipping-img"
                    loading="lazy"
                  />
                  <div className="news-clipping-overlay">
                    <span className="news-clipping-zoom-badge">
                      <Eye size={12} /> Click to View Clipping ({idx + 1}/{clippings.length})
                    </span>
                    <span className="badge badge-gold" style={{ fontSize: '0.74rem' }}>
                      {clip.date}
                    </span>
                  </div>
                </div>

                <div className="news-clipping-body">
                  <div className="news-clipping-meta-row">
                    <span className="badge badge-crimson">{clip.newspaper}</span>
                    {clip.edition && <span className="badge badge-surface">{clip.edition}</span>}
                    {clip.language && (
                      <span className="badge badge-surface" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Globe2 size={11} /> {clip.language}
                      </span>
                    )}
                  </div>

                  <h4 className="news-clipping-headline">{clip.headline}</h4>
                  <p className="news-clipping-sub">{clip.subheadline || clip.description}</p>

                  <div className="news-clipping-action">
                    <span>Open Left/Right Viewer</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
              {/* Optional Clipping Image Preview */}
              {item.imageUrl && (
                <div 
                  className="news-card-image-preview"
                  onClick={(e) => handleArticleClippingClick(item, e)}
                  title="Click to view full clipping in Left/Right viewer"
                >
                  <img src={item.imageUrl} alt={item.headline} loading="lazy" />
                  <span className="news-card-image-badge">
                    <Eye size={11} /> View Clipping
                  </span>
                </div>
              )}

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
              {/* Optional Clipping Preview in Modal with button to open Left-Right Viewer */}
              {selectedArticle.imageUrl && (
                <div className="news-modal-clipping-box">
                  <div className="news-modal-clipping-header">
                    <span className="news-modal-clipping-title">
                      <Newspaper size={14} color="var(--color-gold-400)" />
                      <span>Original Archival Press Clipping</span>
                    </span>
                    <button
                      type="button"
                      className="btn btn-crimson-sm"
                      style={{ fontSize: '0.74rem', padding: '0.25rem 0.6rem' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleArticleClippingClick(selectedArticle, e);
                      }}
                    >
                      <Layers size={12} />
                      <span>Open in Left/Right Viewer</span>
                    </button>
                  </div>
                  <div
                    className="news-modal-clipping-img-wrap"
                    onClick={(e) => handleArticleClippingClick(selectedArticle, e)}
                    title="Click to open interactive Left/Right popup viewer"
                  >
                    <img src={selectedArticle.imageUrl} alt={selectedArticle.headline} />
                    <div className="news-modal-clipping-overlay">
                      <span>Click to open full Left/Right interactive viewer</span>
                    </div>
                  </div>
                </div>
              )}

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

      {/* Newspaper Clipping Interactive Left-Right Lightbox */}
      <NewsImageLightbox
        isOpen={isLightboxOpen}
        clippings={clippings}
        currentIndex={lightboxIndex}
        onClose={() => setIsLightboxOpen(false)}
        onSelectIndex={(index) => setLightboxIndex(index)}
      />
    </div>
  );
};

export default NewsMedia;
