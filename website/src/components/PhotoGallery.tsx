import React, { useState, useMemo, useEffect } from 'react';
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

  // Close lightbox on Escape and prevent body scrolling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    };

    if (selectedItem) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem]);

  const galleryItems: GalleryItem[] = rawGallery.map((item: any, idx: number) => {
    const rawUrl = item.videoUrl || (item.mediaType?.toLowerCase().includes('video') ? item.image : '') || '';
    const youtubeMatch = (rawUrl || item.image || '').match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?(?:.*&)?v=|shorts\/))([\w-]{11})/);
    const youtubeId = item.youtubeId || (youtubeMatch ? youtubeMatch[1] : undefined);
    const isVideo = item.mediaType === 'YouTube Video' || item.mediaType === 'Direct Video' || item.type === 'video' || Boolean(youtubeId || item.videoUrl);

    const title = item.title || item.caption || 'Institutional Media';
    const displayTitle = title.length > 70 ? `${title.slice(0, 67)}...` : title;
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
      caption: item.caption || item.title || '',
      year: item.year || item.date || '',
      channel: item.channel || item.credit || '',
    };
  });

  // Category counts and dynamic tabs
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    galleryItems.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [galleryItems]);

  const uniqueCategories = Object.keys(categoryCounts);

  const filterTabs = [
    { id: 'All', label: 'All', count: galleryItems.length },
    ...uniqueCategories.map((cat) => ({
      id: cat,
      label: cat,
      count: categoryCounts[cat],
    })),
  ];

  const currentTab = filterTabs.some((t) => t.id === activeCategory) ? activeCategory : 'All';

  const filteredItems = currentTab === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === currentTab);

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
              onClick={() => setActiveCategory(tab.id)}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      )}

      {/* Gallery Items Grid - All filtered items displayed */}
      <div className="gallery-grid">
        {filteredItems.map((item) => {
          const displayImage = item.imageUrl || item.thumbnailUrl || (item.youtubeId ? `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg` : '');
          const isVideo = item.type === 'video' || !!item.youtubeId;

          return (
            <div
              key={item.id}
              className="gallery-card"
              onClick={() => setSelectedItem(item)}
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
