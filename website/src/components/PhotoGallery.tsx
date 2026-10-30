import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Play, Video, ExternalLink, X, Calendar, UserCheck, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = useMemo(() => {
    return rawGallery.map((item: any, idx: number) => {
      const rawUrl = item.videoUrl || (item.mediaType?.toLowerCase().includes('video') ? item.image : '') || '';
      const youtubeMatch = (rawUrl || item.image || '').match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?(?:.*&)?v=|shorts\/))([\w-]{11})/);
      const youtubeId = item.youtubeId || (youtubeMatch ? youtubeMatch[1] : undefined);
      const isVideo = item.mediaType === 'YouTube Video' || item.mediaType === 'Direct Video' || item.type === 'video' || Boolean(youtubeId || item.videoUrl);

      const rawCaption = (item.caption || item.title || '').trim();
      let title = (item.title || '').trim();
      let caption = (item.caption || '').trim();

      // If title is missing or identical to caption, smartly separate headline and description
      if (!title && rawCaption) {
        const lines = rawCaption.split(/\r?\n/).filter(Boolean);
        if (lines.length > 1) {
          title = lines[0].trim();
          caption = lines.slice(1).join('\n\n').trim();
        } else if (rawCaption.length > 85) {
          // Check for first sentence boundary (. followed by space/capital)
          const match = rawCaption.match(/^([^.!?\n]{25,120}[.!?])\s*(.*)$/s);
          if (match && match[2]?.trim()) {
            title = match[1].trim();
            caption = match[2].trim();
          } else {
            // Cut cleanly at last word boundary before 85 chars
            const cutIdx = rawCaption.slice(0, 85).lastIndexOf(' ');
            if (cutIdx > 35) {
              title = rawCaption.slice(0, cutIdx).trim();
              caption = rawCaption.slice(cutIdx).trim();
            } else {
              title = rawCaption;
              caption = '';
            }
          }
        } else {
          title = rawCaption;
          caption = '';
        }
      }

      // If caption starts with title, remove it from caption to prevent repetitive duplicate text
      if (title && caption && caption.startsWith(title) && caption.length > title.length) {
        caption = caption.slice(title.length).replace(/^[\s:—–-]+/, '').trim();
      } else if (caption === title) {
        caption = '';
      }

      const displayTitle = title || 'Institutional Media';
      const category = item.category || item.album || 'Leadership';
      const thumbnailUrl = item.thumbnailUrl || (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : item.image || '');
      const imageUrl = item.imageUrl || item.image || (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : '');
      const videoUrl = item.videoUrl || (youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : undefined);

      return {
        id: item.id || `gal-${idx}`,
        title: displayTitle,
        category,
        type: isVideo ? 'video' : 'image',
        youtubeId,
        videoUrl,
        imageUrl,
        thumbnailUrl,
        caption: caption,
        year: item.year || item.date || '',
        channel: item.channel || item.credit || '',
      };
    });
  }, [rawGallery]);

  // Category counts and dynamic tabs
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    galleryItems.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [galleryItems]);

  const uniqueCategories = Object.keys(categoryCounts);

  const filterTabs = useMemo(() => [
    { id: 'All', label: 'All', count: galleryItems.length },
    ...uniqueCategories.map((cat) => ({
      id: cat,
      label: cat,
      count: categoryCounts[cat],
    })),
  ], [galleryItems.length, uniqueCategories, categoryCounts]);

  const currentTab = filterTabs.some((t) => t.id === activeCategory) ? activeCategory : 'All';

  const filteredItems = useMemo(() => {
    return currentTab === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === currentTab);
  }, [currentTab, galleryItems]);

  const selectedItem = selectedIndex !== null && filteredItems[selectedIndex]
    ? filteredItems[selectedIndex]
    : null;

  const handlePrev = useCallback(() => {
    if (filteredItems.length === 0 || selectedIndex === null) return;
    setSelectedIndex((prev) => ((prev ?? 0) - 1 + filteredItems.length) % filteredItems.length);
  }, [filteredItems.length, selectedIndex]);

  const handleNext = useCallback(() => {
    if (filteredItems.length === 0 || selectedIndex === null) return;
    setSelectedIndex((prev) => ((prev ?? 0) + 1) % filteredItems.length);
  }, [filteredItems.length, selectedIndex]);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  // Keyboard navigation & lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, handleClose, handlePrev, handleNext]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    setTouchStartX(null);
  };

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
          Recorded presidential addresses, keynote lectures, YouTube videos, and institutional visual milestones at DAV University
        </div>
      </div>

      {/* Filter Tabs if multiple categories */}
      {filterTabs.length > 2 && (
        <div className="awards-filter-bar">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              className={`filter-btn ${currentTab === tab.id ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(tab.id);
                setSelectedIndex(null);
              }}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      )}

      {/* Gallery Items Grid */}
      <div className="gallery-grid">
        {filteredItems.map((item, index) => {
          const displayImage = item.imageUrl || item.thumbnailUrl || (item.youtubeId ? `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg` : '');
          const isVideo = item.type === 'video' || !!item.youtubeId;

          return (
            <div
              key={item.id}
              className="gallery-card"
              onClick={() => setSelectedIndex(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedIndex(index);
                }
              }}
            >
              <div className="gallery-thumb-wrapper">
                {displayImage ? (
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
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#0d1117', color: '#fff' }}>
                    <Video size={40} opacity={0.4} />
                  </div>
                )}

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
                <h4 className="gallery-title" title={item.title}>
                  {item.title}
                </h4>
                {item.caption ? (
                  <p className="gallery-caption" title={item.caption}>
                    {item.caption}
                  </p>
                ) : null}

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

      {/* Lightbox Modal with Left/Right Movement */}
      {selectedItem && selectedIndex !== null && (
        <div
          className="gallery-lightbox-overlay"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
        >
          {/* External Left Navigation Arrow for larger screens */}
          {filteredItems.length > 1 && (
            <button
              type="button"
              className="gallery-lightbox-arrow gallery-lightbox-arrow-left"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              title="Previous (Left arrow key)"
              aria-label="Previous item"
            >
              <ChevronLeft size={30} />
            </button>
          )}

          {/* External Right Navigation Arrow for larger screens */}
          {filteredItems.length > 1 && (
            <button
              type="button"
              className="gallery-lightbox-arrow gallery-lightbox-arrow-right"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              title="Next (Right arrow key)"
              aria-label="Next item"
            >
              <ChevronRight size={30} />
            </button>
          )}

          <div
            className="gallery-lightbox-modal"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              type="button"
              className="gallery-lightbox-close"
              onClick={handleClose}
              title="Close modal (Esc)"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="gallery-lightbox-content">
              {/* Media Container with Left / Right Floating Arrows */}
              <div className="gallery-lightbox-media-container">
                {filteredItems.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="gallery-inmedia-arrow gallery-inmedia-left"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                      }}
                      title="Previous"
                      aria-label="Previous"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      type="button"
                      className="gallery-inmedia-arrow gallery-inmedia-right"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      title="Next"
                      aria-label="Next"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </>
                )}

                {selectedItem.type === 'video' && selectedItem.youtubeId ? (
                  <div className="lightbox-video-frame">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${selectedItem.youtubeId}?autoplay=1`}
                      title={selectedItem.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : selectedItem.type === 'video' && selectedItem.videoUrl && selectedItem.videoUrl.match(/\.(mp4|webm|ogg)/i) ? (
                  <div className="lightbox-video-frame" style={{ background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <video
                      src={selectedItem.videoUrl}
                      controls
                      autoPlay
                      style={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: '8px' }}
                    />
                  </div>
                ) : (
                  <img
                    src={selectedItem.imageUrl || selectedItem.thumbnailUrl}
                    alt={selectedItem.title}
                    className="lightbox-full-img"
                  />
                )}
              </div>

              <div className="lightbox-meta">
                <div className="gallery-lightbox-meta-top">
                  <div className="gallery-lightbox-meta-tags">
                    <span className="badge badge-gold">{selectedItem.category}</span>
                    {filteredItems.length > 1 && (
                      <span className="gallery-lightbox-counter-badge">
                        {selectedIndex + 1} of {filteredItems.length}
                      </span>
                    )}
                  </div>

                  {filteredItems.length > 1 && (
                    <div className="gallery-lightbox-actions">
                      <button
                        type="button"
                        className="gallery-nav-pill-btn"
                        onClick={handlePrev}
                        title="Previous item (←)"
                      >
                        <ChevronLeft size={15} /> Prev
                      </button>
                      <button
                        type="button"
                        className="gallery-nav-pill-btn"
                        onClick={handleNext}
                        title="Next item (→)"
                      >
                        Next <ChevronRight size={15} />
                      </button>
                    </div>
                  )}
                </div>

                <h3 className="lightbox-title">{selectedItem.title}</h3>
                {selectedItem.caption ? (
                  <p className="lightbox-caption">{selectedItem.caption}</p>
                ) : null}

                {selectedItem.videoUrl && (
                  <a
                    href={selectedItem.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-crimson-sm"
                    style={{ marginTop: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    Watch on YouTube <ExternalLink size={13} />
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
