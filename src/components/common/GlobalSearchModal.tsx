import React, { useState, useEffect } from 'react';
import { Search, X, ShoppingBag, Wand2, Video, ArrowRight, Tag } from 'lucide-react';
import type { ShopifyProduct, VideoAsset, ActiveTab } from '../../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: ShopifyProduct[];
  videos: VideoAsset[];
  onNavigate: (tab: ActiveTab) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  products,
  videos,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Product SKU/ID/Title search
  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(trimmed) || 
    p.category.toLowerCase().includes(trimmed) ||
    p.id.toLowerCase().includes(trimmed) ||
    p.handle.toLowerCase().includes(trimmed)
  );

  // Video / Creative search
  const filteredVideos = videos.filter(v => 
    v.productTitle.toLowerCase().includes(trimmed) || 
    v.angleName.toLowerCase().includes(trimmed) ||
    v.id.toLowerCase().includes(trimmed)
  );

  const hasResults = filteredProducts.length > 0 || filteredVideos.length > 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '640px', marginTop: '-60px' }}
      >
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 20px',
          borderBottom: '1px solid var(--xora-border)'
        }}>
          <Search size={20} style={{ color: 'var(--xora-primary)' }} />
          <input 
            type="text"
            placeholder="Search products, creatives, or SKU..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              fontSize: '15px',
              color: 'var(--xora-text-primary)',
              backgroundColor: 'transparent'
            }}
          />
          {query && (
            <button 
              className="icon-btn" 
              onClick={() => setQuery('')}
              style={{ color: 'var(--xora-text-muted)' }}
            >
              <X size={16} />
            </button>
          )}
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Search Body - 4 Interactive States */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '16px 20px' }}>
          {/* State 1: Empty Query - Quick Links */}
          {trimmed === '' && (
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--xora-text-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>
                Quick Search & Operational Jump
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div 
                  className="nav-item" 
                  onClick={() => { onNavigate('products'); onClose(); }}
                  style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShoppingBag size={16} style={{ color: 'var(--xora-primary)' }} /> 
                    <span>Browse Shopify Product Catalog Matrix</span>
                  </div>
                  <ArrowRight size={14} style={{ color: 'var(--xora-text-muted)' }} />
                </div>
                <div 
                  className="nav-item" 
                  onClick={() => { onNavigate('creatives'); onClose(); }}
                  style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Wand2 size={16} style={{ color: 'var(--xora-primary)' }} /> 
                    <span>Open 3-Angle Creative AI Studio</span>
                  </div>
                  <ArrowRight size={14} style={{ color: 'var(--xora-text-muted)' }} />
                </div>
                <div 
                  className="nav-item" 
                  onClick={() => { onNavigate('approvals'); onClose(); }}
                  style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Tag size={16} style={{ color: 'var(--xora-primary)' }} /> 
                    <span>Review Pending Creative Approvals</span>
                  </div>
                  <ArrowRight size={14} style={{ color: 'var(--xora-text-muted)' }} />
                </div>
                <div 
                  className="nav-item" 
                  onClick={() => { onNavigate('videos'); onClose(); }}
                  style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Video size={16} style={{ color: 'var(--xora-primary)' }} /> 
                    <span>Rendered MP4 Video Library</span>
                  </div>
                  <ArrowRight size={14} style={{ color: 'var(--xora-text-muted)' }} />
                </div>
              </div>
            </div>
          )}

          {/* State 2 & 3: Results State */}
          {trimmed !== '' && hasResults && (
            <div>
              {/* Product Matches */}
              {filteredProducts.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--xora-text-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>
                    Shopify Products ({filteredProducts.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {filteredProducts.map(p => (
                      <div 
                        key={p.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 12px',
                          borderRadius: 'var(--radius-input)',
                          cursor: 'pointer'
                        }}
                        className="nav-item"
                        onClick={() => { onNavigate('products'); onClose(); }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={p.image} alt={p.title} style={{ width: '36px', height: '36px', borderRadius: '4px', objectFit: 'cover' }} />
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--xora-text-primary)' }}>{p.title}</div>
                            <div style={{ fontSize: '11px', color: 'var(--xora-text-secondary)' }}>
                              SKU: {p.handle.toUpperCase()} • {p.category} • {p.price}
                            </div>
                          </div>
                        </div>
                        <span className="badge badge-success" style={{ fontSize: '11px' }}>
                          {p.syncStatus}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Video & Creative Matches */}
              {filteredVideos.length > 0 && (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--xora-text-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>
                    Rendered MP4 Videos ({filteredVideos.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {filteredVideos.map(v => (
                      <div 
                        key={v.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 12px',
                          borderRadius: 'var(--radius-input)',
                          cursor: 'pointer'
                        }}
                        className="nav-item"
                        onClick={() => { onNavigate('videos'); onClose(); }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={v.thumbnail} alt={v.productTitle} style={{ width: '36px', height: '36px', borderRadius: '4px', objectFit: 'cover' }} />
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--xora-text-primary)' }}>{v.productTitle}</div>
                            <div style={{ fontSize: '11px', color: 'var(--xora-text-secondary)' }}>
                              Angle: {v.angleName} • ID: {v.id}
                            </div>
                          </div>
                        </div>
                        <span className="badge badge-info" style={{ fontSize: '11px' }}>
                          {v.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* State 4: No Results State */}
          {trimmed !== '' && !hasResults && (
            <div style={{ textAlign: 'center', padding: '32px 16px' }}>
              <Search size={32} style={{ color: 'var(--xora-text-muted)', marginBottom: '12px' }} />
              <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--xora-text-primary)', marginBottom: '4px' }}>
                No matching results found
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--xora-text-secondary)' }}>
                No products, SKUs, or AI draft scripts match "{query}".
              </p>
            </div>
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div style={{
          padding: '10px 20px',
          backgroundColor: 'var(--xora-bg-app)',
          borderTop: '1px solid var(--xora-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: 'var(--xora-text-secondary)'
        }}>
          <div>Press <kbd className="shortcut-kbd" style={{ backgroundColor: 'var(--xora-surface)', color: 'var(--xora-text-primary)', border: '1px solid var(--xora-border)' }}>Esc</kbd> to exit search</div>
          <div>XORA Ecommerce Search Engine</div>
        </div>
      </div>
    </div>
  );
};
