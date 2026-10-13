import React, { useState } from 'react';
import { Play, Video, ExternalLink, X, Calendar, UserCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  type: 'video' | 'image';
  videoUrl?: string;
  youtubeId?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  caption: string;
  year?: string;
  channel?: string;
  duration?: string;
}

export const PhotoGallery: React.FC = () => {
  const { gallery: rawGallery } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = rawGallery.map((item: any, idx: number) => {
    const youtubeMatch = (item.image || item.videoUrl || '').match(/(?:vi\/|youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/);
    const youtubeId = item.youtubeId || (youtubeMatch ? youtubeMatch[1] : (idx === 0 ? 'McyJD5FNOVM' : undefined));
    const isVideo = item.type === 'video' || !!youtubeId;

    return {
      id: item.id || `gal-${idx}`,
      title: item.title || (item.caption?.slice(0, 50) ? `${item.caption.slice(0, 50)}...` : 'Institutional Gallery'),
      category: item.category || item.album || 'Leadership',
      type: isVideo ? 'video' : 'image',
      youtubeId,
      videoUrl: item.videoUrl || (youtubeId ? `https://youtu.be/${youtubeId}` : undefined),
      imageUrl: item.imageUrl || item.image,
      thumbnailUrl: item.thumbnailUrl || (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : item.image),
      caption: item.caption || item.title || '',
      year: item.year || item.date || '2026',
      channel: item.channel || item.credit || '',
    };
  });

  // Extract unique categories dynamically
  const existingCategories = Array.from(new Set(galleryItems.map((item) => item.category)));
  const categories = ['All', ...existingCategories];

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const featuredVideo = filteredItems.find((item) => item.type === 'video');
  const otherItems = filteredItems.filter((item) => item.id !== featuredVideo?.id);

  return (
    <div className="section-content-wrapper">
      <div className="content-header">
        <div className="academic-breadcrumb">
          <span>Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Media & Video Gallery</span>
        </div>
        <div className="content-eyebrow">Institutional Media Archives</div>
        <h2 className="content-title">Leadership, Keynotes & Academic Gallery</h2>
        <div className="content-subtitle">
          Recorded presidential addresses, keynote lectures, and institutional visual milestones at DAV University
        </div>
      </div>

      {/* Filter Tabs if multiple categories */}
      {categories.length > 2 && (
        <div className="awards-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat} {cat === 'All' ? `(${galleryItems.length})` : ''}
            </button>
          ))}
        </div>
      )}

      {/* Single Video Player Card */}
      {featuredVideo && featuredVideo.youtubeId && (
        <div className="featured-media-card">
          <div className="featured-media-split">
            <div className="featured-media-player-col">
              <div className="featured-media-frame-wrapper">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${featuredVideo.youtubeId}?rel=0`}
                  title={featuredVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="featured-media-body-compact">
              <div>
                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.65rem' }}>
                  <span className="badge badge-crimson" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Video size={13} /> {featuredVideo.category}
                  </span>
                  {featuredVideo.year && (
                    <span className="badge badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={13} /> {featuredVideo.year}
                    </span>
                  )}
                  {featuredVideo.channel && (
                    <span className="badge badge-surface" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      <UserCheck size={13} /> {featuredVideo.channel}
                    </span>
                  )}
                </div>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-crimson-900)', marginBottom: '0.45rem', fontWeight: 700, lineHeight: 1.35 }}>
                  {featuredVideo.title}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '0.75rem' }}>
                  {featuredVideo.caption}
                </p>
              </div>

              <div>
                <a
                  href={featuredVideo.videoUrl || `https://youtu.be/${featuredVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  Watch on YouTube <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Additional Gallery Items Grid */}
      {otherItems.length > 0 && (
        <div className="gallery-grid">
          {otherItems.map((item) => {
            const displayImage = item.imageUrl || item.thumbnailUrl || (item.youtubeId ? `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg` : '');
            const isVideo = item.type === 'video' || !!item.youtubeId;

            return (
              <div
                key={item.id}
                className="gallery-card"
                onClick={() => setSelectedItem(item)}
              >
                <div className="gallery-thumb-wrapper">
                  <img
                    src={displayImage}
                    alt={item.title}
                    className="gallery-thumb-img"
                    onError={(e) => {
                      if (item.youtubeId) {
                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;
                      }
                    }}
                  />

                  <span className="badge badge-gold gallery-category-badge">
                    {item.category}
                  </span>

                  {isVideo && (
                    <>
                      <div className="gallery-play-btn" title="Play Video">
                        <Play size={24} fill="#ffffff" />
                      </div>
                      <span className="gallery-type-badge">
                        <Video size={13} /> Video
                      </span>
                    </>
                  )}
                </div>

                <div className="gallery-info">
                  <h4 className="gallery-title">{item.title}</h4>
                  <p className="gallery-caption">{item.caption}</p>

                  <div className="gallery-meta-row">
                    {item.year && (
                      <span className="gallery-meta-item">
                        <Calendar size={13} /> {item.year}
                      </span>
                    )}
                    {item.channel && (
                      <span className="gallery-meta-item">
                        <UserCheck size={13} /> {item.channel}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="gallery-lightbox-overlay" onClick={() => setSelectedItem(null)}>
          <div className="gallery-lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="gallery-lightbox-close"
              onClick={() => setSelectedItem(null)}
              title="Close modal"
            >
              <X size={20} />
            </button>

            <div className="gallery-lightbox-content">
              {selectedItem.type === 'video' && selectedItem.youtubeId ? (
                <div className="lightbox-video-frame">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${selectedItem.youtubeId}?autoplay=1`}
                    title={selectedItem.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <img
                  src={selectedItem.imageUrl || selectedItem.thumbnailUrl}
                  alt={selectedItem.title}
                  className="lightbox-full-img"
                />
              )}

              <div className="lightbox-meta">
                <span className="badge badge-gold">{selectedItem.category}</span>
                <h3 className="lightbox-title">{selectedItem.title}</h3>
                <p className="lightbox-caption">{selectedItem.caption}</p>

                {selectedItem.videoUrl && (
                  <a
                    href={selectedItem.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-crimson-sm"
                    style={{ marginTop: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    Open in YouTube <ExternalLink size={13} />
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
