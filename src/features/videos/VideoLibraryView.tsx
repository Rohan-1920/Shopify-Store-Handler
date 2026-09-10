import React, { useState, useMemo } from 'react';
import { 
  Video, 
  Search, 
  Play, 
  Download, 
  ExternalLink, 
  CheckSquare, 
  Square, 
  RotateCcw, 
  AlertCircle, 
  Tag, 
  X,
  AlertTriangle
} from 'lucide-react';
import type { VideoAsset, StoreContext } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';

interface VideoLibraryViewProps {
  videos: VideoAsset[];
  storeContext?: StoreContext;
  onPreviewVideo: (video: VideoAsset) => void;
  onPushToShopify: (videoId: string) => void;
}

export const VideoLibraryView: React.FC<VideoLibraryViewProps> = ({
  videos,
  onPreviewVideo,
  onPushToShopify
}) => {
  // Category / Angle Filter Tab State
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Product-Led' | 'Benefit-Led' | 'Offer-Led'>('All');
  
  // Search & Sort States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductFilter, setSelectedProductFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  // Bulk Multi-Select State
  const [selectedVideoIds, setSelectedVideoIds] = useState<string[]>([]);

  // Simulation Toggles for Loading Skeletons & Error State
  const [isLoading, setIsLoading] = useState(false);
  const [isSimulatedError, setIsSimulatedError] = useState(false);

  // Extract unique products for dropdown filter
  const uniqueProducts = useMemo(() => {
    const map = new Map<string, string>();
    videos.forEach((v) => map.set(v.productId, v.productTitle));
    return Array.from(map.entries());
  }, [videos]);

  // Filtered & Sorted Videos
  const filteredVideos = useMemo(() => {
    let list = [...videos];

    // Category Filter (All, Product-Led, Benefit-Led, Offer-Led)
    if (categoryFilter !== 'All') {
      list = list.filter((v) => {
        if (v.category) return v.category === categoryFilter;
        if (categoryFilter === 'Product-Led') return v.angleName.toLowerCase().includes('product');
        if (categoryFilter === 'Benefit-Led') return v.angleName.toLowerCase().includes('benefit');
        if (categoryFilter === 'Offer-Led') return v.angleName.toLowerCase().includes('urgency') || v.angleName.toLowerCase().includes('offer') || v.angleName.toLowerCase().includes('promo');
        return true;
      });
    }

    // Product Dropdown Filter
    if (selectedProductFilter !== 'all') {
      list = list.filter((v) => v.productId === selectedProductFilter);
    }

    // Status Dropdown Filter
    if (statusFilter !== 'all') {
      list = list.filter((v) => v.status === statusFilter);
    }

    // Search input (Product title, SKU, creative/angle)
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter((v) => 
        v.productTitle.toLowerCase().includes(q) ||
        (v.sku && v.sku.toLowerCase().includes(q)) ||
        v.angleName.toLowerCase().includes(q) ||
        v.id.toLowerCase().includes(q)
      );
    }

    // Sort order
    if (sortBy === 'oldest') {
      list.reverse();
    }

    return list;
  }, [videos, categoryFilter, selectedProductFilter, statusFilter, searchTerm, sortBy]);

  // Multi-Select Handlers
  const isAllSelected = filteredVideos.length > 0 && selectedVideoIds.length === filteredVideos.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedVideoIds([]);
    } else {
      setSelectedVideoIds(filteredVideos.map((v) => v.id));
    }
  };

  const toggleSelectVideo = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedVideoIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkDownload = () => {
    const selectedVideos = videos.filter((v) => selectedVideoIds.includes(v.id));
    selectedVideos.forEach((v) => {
      const link = document.createElement('a');
      link.href = v.videoUrl;
      link.download = `${v.productTitle.replace(/\s+/g, '_')}_${v.id}.mp4`;
      link.click();
    });
  };

  const handleBulkExport = () => {
    selectedVideoIds.forEach((id) => onPushToShopify(id));
    setSelectedVideoIds([]);
  };

  // ERROR STATE VIEW
  if (isSimulatedError) {
    return (
      <div className="video-library-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">Video Library</h1>
            <p className="page-subtitle">Browse, preview, and download your completed video creatives.</p>
          </div>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setIsSimulatedError(false)}
          >
            <RotateCcw size={14} /> Clear Error State
          </button>
        </div>

        <div className="xora-card" style={{ padding: '48px 24px', textAlign: 'center', margin: '40px auto', maxWidth: '580px' }}>
          <AlertCircle size={48} style={{ color: 'var(--xora-critical)', margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: 'var(--xora-text-primary)' }}>
            Unable to load your video library. Please try again.
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--xora-text-secondary)', marginBottom: '24px' }}>
            We encountered a network glitch retrieving your render assets. Your files remain safe in cloud storage.
          </p>
          <button className="btn btn-primary" onClick={() => setIsSimulatedError(false)}>
            <RotateCcw size={16} /> Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="video-library-page">
      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Video Library</h1>
          <p className="page-subtitle">
            Browse, preview, and download your completed video creatives.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 1500);
            }}
            title="Test skeleton loading view"
          >
            <RotateCcw size={14} /> Test Skeleton Loading
          </button>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setIsSimulatedError(true)}
            title="Test error state view"
          >
            <AlertTriangle size={14} style={{ color: 'var(--xora-warning-text)' }} /> Test Error View
          </button>
        </div>
      </div>

      {/* FILTERS & SEARCH CONTROLS BAR */}
      <div className="xora-card" style={{ marginBottom: '24px' }}>
        <div className="xora-card-body" style={{ padding: '16px 20px' }}>
          {/* Top Row: Category Filter Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div className="filter-tabs" style={{ display: 'flex', gap: '8px' }}>
              {(['All', 'Product-Led', 'Benefit-Led', 'Offer-Led'] as const).map((tab) => (
                <button
                  key={tab}
                  className={`filter-tab ${categoryFilter === tab ? 'active' : ''}`}
                  onClick={() => setCategoryFilter(tab)}
                >
                  {tab === 'All' ? `All Creatives (${videos.length})` : tab}
                </button>
              ))}
            </div>

            {/* Select All Toggle Button */}
            {filteredVideos.length > 0 && (
              <button 
                className="btn btn-tertiary btn-sm"
                onClick={toggleSelectAll}
                style={{ fontSize: '12.5px' }}
              >
                {isAllSelected ? <CheckSquare size={15} /> : <Square size={15} />}
                {isAllSelected ? 'Deselect All' : 'Select All'}
              </button>
            )}
          </div>

          {/* Bottom Row: Search Box & Dropdown Controls */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Search Input */}
            <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--xora-text-muted)' }} />
              <input 
                type="text"
                className="xora-input"
                placeholder="Search by product, SKU, creative, or angle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '36px', fontSize: '13px' }}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--xora-text-muted)' }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Product Filter Dropdown */}
            <select 
              className="xora-select"
              value={selectedProductFilter}
              onChange={(e) => setSelectedProductFilter(e.target.value)}
              style={{ width: '200px', fontSize: '13px' }}
            >
              <option value="all">All Products</option>
              {uniqueProducts.map(([id, title]) => (
                <option key={id} value={id}>{title}</option>
              ))}
            </select>

            {/* Status Filter Dropdown */}
            <select 
              className="xora-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ width: '180px', fontSize: '13px' }}
            >
              <option value="all">All Statuses</option>
              <option value="ready">Ready for Shopify</option>
              <option value="pushed_to_shopify">Pushed to Shopify</option>
            </select>

            {/* Sort Dropdown */}
            <select 
              className="xora-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
              style={{ width: '150px', fontSize: '13px' }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* FLOATING BULK ACTION BAR */}
      {selectedVideoIds.length > 0 && (
        <div className="bulk-selection-bar" style={{
          position: 'sticky',
          top: '72px',
          zIndex: 40,
          backgroundColor: 'var(--xora-header-bg)',
          color: 'var(--xora-header-text)',
          borderRadius: 'var(--radius-card)',
          padding: '12px 20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-modal)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckSquare size={18} style={{ color: 'var(--xora-primary)' }} />
            <span style={{ fontWeight: 700, fontSize: '14px' }}>
              {selectedVideoIds.length} {selectedVideoIds.length === 1 ? 'video' : 'videos'} selected
            </span>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button className="btn btn-secondary btn-sm" onClick={handleBulkDownload}>
              <Download size={14} /> Download Selected
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleBulkExport}>
              <ExternalLink size={14} /> Export to Shopify
            </button>
            <button 
              className="btn btn-tertiary btn-sm"
              onClick={() => setSelectedVideoIds([])}
              style={{ color: 'var(--xora-header-text-muted)' }}
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* SKELETON LOADING STATE VIEW */}
      {isLoading ? (
        <div className="grid-3">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div key={idx} className="xora-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="skeleton" style={{ height: '240px', width: '100%' }} />
              <div style={{ padding: '16px' }}>
                <div className="skeleton" style={{ height: '18px', width: '80%', marginBottom: '8px' }} />
                <div className="skeleton" style={{ height: '14px', width: '50%', marginBottom: '16px' }} />
                <div className="skeleton" style={{ height: '32px', width: '100%' }} />
              </div>
            </div>
          ))}
        </div>
      ) : filteredVideos.length === 0 ? (
        /* EMPTY STATE VIEW */
        <div className="xora-card">
          <div className="xora-card-body" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <Video size={48} style={{ color: 'var(--xora-text-muted)', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: 'var(--xora-text-primary)' }}>
              Your completed videos will appear here.
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--xora-text-secondary)', maxWidth: '440px', margin: '0 auto' }}>
              Once rendering finishes, your MP4 assets will appear here.
            </p>
          </div>
        </div>
      ) : (
        /* E-COMMERCE MEDIA CARD GRID */
        <div className="grid-3 video-media-grid">
          {filteredVideos.map((video) => {
            const isSelected = selectedVideoIds.includes(video.id);

            return (
              <div 
                key={video.id}
                className={`video-media-card ${isSelected ? 'selected-card' : ''}`}
                style={{
                  backgroundColor: 'var(--xora-surface)',
                  border: isSelected ? '2px solid var(--xora-primary)' : '1px solid var(--xora-border)',
                  borderRadius: 'var(--radius-card)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                {/* 9:16 Vertical Thumbnail Container */}
                <div 
                  className="video-thumb-wrapper" 
                  onClick={() => onPreviewVideo(video)}
                  style={{ position: 'relative', height: '240px', backgroundColor: '#0A0A0C', cursor: 'pointer' }}
                >
                  <img 
                    src={video.thumbnail} 
                    alt={video.productTitle} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} 
                  />

                  {/* Multi-Select Checkbox Overlay */}
                  <button
                    className="video-select-checkbox"
                    onClick={(e) => toggleSelectVideo(video.id, e)}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: isSelected ? 'var(--xora-primary)' : 'rgba(0,0,0,0.6)',
                      border: 'none',
                      color: 'white',
                      borderRadius: '4px',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 10
                    }}
                    title={isSelected ? 'Deselect Video' : 'Select Video'}
                  >
                    {isSelected ? <CheckSquare size={16} /> : <Square size={16} />}
                  </button>
                  
                  {/* Overlay Play Button */}
                  <div 
                    className="play-overlay-button"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 128, 96, 0.92)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    <Play size={22} style={{ marginLeft: '3px' }} />
                  </div>

                  {/* Duration Badge */}
                  <span style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    backgroundColor: 'rgba(0,0,0,0.85)',
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 7px',
                    borderRadius: '4px'
                  }}>
                    {video.duration}
                  </span>

                  {/* Resolution Badge */}
                  <span style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    color: '#DDD',
                    fontSize: '10.5px',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>
                    9:16 HD
                  </span>
                </div>

                {/* Card Metadata & Actions */}
                <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    {/* Title & SKU */}
                    <div style={{ fontWeight: 700, fontSize: '14.5px', color: 'var(--xora-text-primary)', marginBottom: '2px', lineHeight: 1.3 }}>
                      {video.productTitle}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11.5px', color: 'var(--xora-text-muted)', marginBottom: '10px' }}>
                      {video.sku && <span>{video.sku}</span>}
                      <span>• Created {video.createdAt}</span>
                    </div>

                    {/* Angle Badge & Status */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <span className="badge badge-neutral" style={{ fontSize: '11.5px', fontWeight: 600 }}>
                        <Tag size={11} /> {video.angleName}
                      </span>
                      <StatusBadge status={video.status} />
                    </div>
                  </div>

                  {/* Card Action Buttons (Preview Primary, Download Secondary) */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1 }}
                      onClick={() => onPreviewVideo(video)}
                    >
                      <Play size={13} /> Preview
                    </button>
                    <button 
                      className="btn btn-secondary btn-sm"
                      style={{ flex: 1 }}
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = video.videoUrl;
                        link.download = `${video.productTitle.replace(/\s+/g, '_')}_${video.id}.mp4`;
                        link.click();
                      }}
                      title="Download MP4 Video"
                    >
                      <Download size={13} /> Download
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
