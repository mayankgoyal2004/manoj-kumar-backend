import React, { useEffect, useState, useCallback } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  ExternalLink,
  Download,
  Calendar,
  Newspaper,
  CheckCircle2,
  Tag,
  Globe2,
  Layers
} from 'lucide-react';
import { PressClipping } from '../data/newsMediaData';
import { resolveDocumentUrl } from '../context/PortfolioContext';

interface NewsImageLightboxProps {
  isOpen: boolean;
  clippings: PressClipping[];
  currentIndex: number;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const NewsImageLightbox: React.FC<NewsImageLightboxProps> = ({
  isOpen,
  clippings,
  currentIndex,
  onClose,
  onSelectIndex,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const currentItem = clippings[currentIndex] || clippings[0];

  // Reset zoom on item change
  useEffect(() => {
    setZoomLevel(1);
  }, [currentIndex]);

  const handlePrev = useCallback(() => {
    if (clippings.length === 0) return;
    const nextIdx = (currentIndex - 1 + clippings.length) % clippings.length;
    onSelectIndex(nextIdx);
  }, [currentIndex, clippings.length, onSelectIndex]);

  const handleNext = useCallback(() => {
    if (clippings.length === 0) return;
    const nextIdx = (currentIndex + 1) % clippings.length;
    onSelectIndex(nextIdx);
  }, [currentIndex, clippings.length, onSelectIndex]);

  // Keyboard navigation & lock scroll
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === '+' || e.key === '=') {
        setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
      } else if (e.key === '-') {
        setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
      } else if (e.key === '0') {
        setZoomLevel(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentItem) return null;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleZoomReset = () => setZoomLevel(1);

  return (
    <div
      className="news-lightbox-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Newspaper Clipping Viewer"
    >
      <div
        className={`news-lightbox-container ${isFullscreen ? 'news-lightbox-fullscreen' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="news-lightbox-topbar">
          <div className="news-lightbox-topbar-left">
            <span className="badge badge-crimson" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Newspaper size={13} /> {currentItem.newspaper}
            </span>
            <span className="news-lightbox-counter">
              Clipping <strong>{currentIndex + 1}</strong> of <strong>{clippings.length}</strong>
            </span>
          </div>

          <div className="news-lightbox-topbar-right">
            {/* Zoom Controls */}
            <div className="news-lightbox-zoom-group">
              <button
                type="button"
                className="news-lightbox-icon-btn"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.75}
                title="Zoom Out (-)"
              >
                <ZoomOut size={16} />
              </button>
              <span className="news-lightbox-zoom-val">{Math.round(zoomLevel * 100)}%</span>
              <button
                type="button"
                className="news-lightbox-icon-btn"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 2.5}
                title="Zoom In (+)"
              >
                <ZoomIn size={16} />
              </button>
              {zoomLevel !== 1 && (
                <button
                  type="button"
                  className="news-lightbox-icon-btn"
                  onClick={handleZoomReset}
                  title="Reset Zoom (0)"
                >
                  <RotateCcw size={15} />
                </button>
              )}
            </div>

            {/* Open Raw Image in New Tab */}
            <a
              href={resolveDocumentUrl(currentItem.imageUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="news-lightbox-icon-btn"
              title="Open full-resolution image in new tab"
            >
              <ExternalLink size={16} />
            </a>

            {/* Download */}
            <a
              href={resolveDocumentUrl(currentItem.imageUrl)}
              download={`${currentItem.newspaper.replace(/\s+/g, '_')}_${currentItem.date.replace(/\s+/g, '_')}.jpg`}
              className="news-lightbox-icon-btn"
              title="Download clipping"
            >
              <Download size={16} />
            </a>

            {/* Fullscreen Toggle */}
            <button
              type="button"
              className="news-lightbox-icon-btn"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}
            >
              <Maximize2 size={16} />
            </button>

            {/* Close Button */}
            <button
              type="button"
              className="news-lightbox-close-btn"
              onClick={onClose}
              title="Close (Esc)"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main Content: Split Left-Right Format */}
        <div className="news-lightbox-split-body">
          {/* Left Column: Interactive Image Viewer with Left/Right Arrows */}
          <div className="news-lightbox-image-stage">
            {/* Previous Left Button */}
            {clippings.length > 1 && (
              <button
                type="button"
                className="news-lightbox-nav-arrow news-lightbox-nav-left"
                onClick={handlePrev}
                title="Previous Clipping (Left Arrow)"
                aria-label="Previous image"
              >
                <ChevronLeft size={28} />
              </button>
            )}

            {/* Image Canvas */}
            <div className="news-lightbox-canvas">
              <div
                className="news-lightbox-img-wrapper"
                style={{
                  transform: `scale(${zoomLevel})`,
                  cursor: zoomLevel > 1 ? 'grab' : 'zoom-in',
                }}
                onClick={() => {
                  if (zoomLevel === 1) handleZoomIn();
                  else if (zoomLevel > 1.5) handleZoomReset();
                  else handleZoomIn();
                }}
                title={zoomLevel === 1 ? 'Click to zoom in' : 'Click to zoom further or reset'}
              >
                <img
                  src={resolveDocumentUrl(currentItem.imageUrl)}
                  alt={currentItem.headline || currentItem.title}
                  className="news-lightbox-img"
                />
              </div>
            </div>

            {/* Next Right Button */}
            {clippings.length > 1 && (
              <button
                type="button"
                className="news-lightbox-nav-arrow news-lightbox-nav-right"
                onClick={handleNext}
                title="Next Clipping (Right Arrow)"
                aria-label="Next image"
              >
                <ChevronRight size={28} />
              </button>
            )}

            {/* Floating Navigation Hint */}
            <div className="news-lightbox-stage-hint">
              <span>Use <strong>←</strong> and <strong>→</strong> keys or arrows to browse</span>
              <span>•</span>
              <span>Click image to zoom</span>
            </div>
          </div>

          {/* Right Column: News Clipping Details & Transcript Panel */}
          <div className="news-lightbox-details-panel">
            <div className="news-lightbox-panel-inner">
              {/* Publication Meta Badges */}
              <div className="news-lightbox-badges-row">
                <span className="badge badge-crimson" style={{ fontWeight: 700 }}>
                  {currentItem.newspaper}
                </span>
                <span className="badge badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Calendar size={12} /> {currentItem.date}
                </span>
                {currentItem.edition && (
                  <span className="badge badge-surface">{currentItem.edition}</span>
                )}
                {currentItem.language && (
                  <span className="badge badge-surface" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Globe2 size={12} /> {currentItem.language}
                  </span>
                )}
              </div>

              {/* Main Headline */}
              <h2 className="news-lightbox-headline">
                {currentItem.headline}
              </h2>

              {/* Sub-headline */}
              {currentItem.subheadline && (
                <div className="news-lightbox-subheadline">
                  {currentItem.subheadline}
                </div>
              )}

              {/* Description */}
              <div className="news-lightbox-desc-box">
                <div className="news-lightbox-desc-title">Coverage Summary:</div>
                <p className="news-lightbox-description">
                  {currentItem.description}
                </p>
              </div>

              {/* Key Highlights */}
              {currentItem.highlights && currentItem.highlights.length > 0 && (
                <div className="news-lightbox-highlights-section">
                  <div className="news-lightbox-highlights-title">
                    <CheckCircle2 size={15} color="var(--color-crimson-800)" />
                    <span>Report Highlights</span>
                  </div>
                  <ul className="news-lightbox-highlights-list">
                    {currentItem.highlights.map((hl, i) => (
                      <li key={i}>{hl}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              {currentItem.tags && (
                <div className="news-lightbox-tags-row">
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Tag size={12} /> Tags:
                  </span>
                  {currentItem.tags.map((t, i) => (
                    <span key={i} className="news-tag-chip">
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              {/* Thumbnail Strip for Fast Left-Right Navigation */}
              {clippings.length > 1 && (
                <div className="news-lightbox-thumbs-section">
                  <div className="news-lightbox-thumbs-label">
                    <Layers size={13} />
                    <span>All Archival Clippings ({clippings.length}):</span>
                  </div>
                  <div className="news-lightbox-thumbs-track">
                    {clippings.map((clip, idx) => (
                      <button
                        key={clip.id}
                        type="button"
                        className={`news-lightbox-thumb-btn ${idx === currentIndex ? 'active' : ''}`}
                        onClick={() => onSelectIndex(idx)}
                        title={`Go to ${clip.newspaper} (${clip.date})`}
                      >
                        <img src={resolveDocumentUrl(clip.imageUrl)} alt={clip.newspaper} />
                        <span className="news-lightbox-thumb-caption">
                          {clip.newspaper}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Prev / Next Action Strip */}
              {clippings.length > 1 && (
                <div className="news-lightbox-action-row">
                  <button
                    type="button"
                    className="btn btn-outline news-lightbox-action-btn"
                    onClick={handlePrev}
                  >
                    <ChevronLeft size={16} />
                    <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                      <span style={{ fontSize: '0.7rem', display: 'block', opacity: 0.8 }}>Previous</span>
                      <strong style={{ fontSize: '0.8rem' }}>
                        {clippings[(currentIndex - 1 + clippings.length) % clippings.length].newspaper}
                      </strong>
                    </div>
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline news-lightbox-action-btn"
                    onClick={handleNext}
                  >
                    <div style={{ textAlign: 'right', lineHeight: 1.2 }}>
                      <span style={{ fontSize: '0.7rem', display: 'block', opacity: 0.8 }}>Next</span>
                      <strong style={{ fontSize: '0.8rem' }}>
                        {clippings[(currentIndex + 1) % clippings.length].newspaper}
                      </strong>
                    </div>
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
