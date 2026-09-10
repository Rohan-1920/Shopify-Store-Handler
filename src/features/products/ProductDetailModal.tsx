import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Sparkles, 
  Eye, 
  ExternalLink, 
  AlertCircle
} from 'lucide-react';
import type { ShopifyProduct, StoreContext, ActiveTab } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';

interface ProductDetailModalProps {
  product: ShopifyProduct;
  storeContext: StoreContext;
  onClose: () => void;
  onNavigate: (tab: ActiveTab) => void;
  onGenerateAngles: (product: ShopifyProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  storeContext,
  onClose,
  onNavigate,
  onGenerateAngles
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Gallery images list (uses primary image + 3 contextual fallback thumbnails)
  const galleryImages = [
    product.image,
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80'
  ];

  // Keyboard navigation for image gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryImages.length, onClose]);

  // Eligibility evaluation rules
  const isEligible = product.aiEligibility === 'eligible';
  const hasImage = Boolean(product.image) && product.aiEligibility !== 'needs_images';
  const hasTitle = Boolean(product.title) && product.title.length > 3;
  const hasDescription = Boolean(product.description && product.description.length > 10);
  const hasPrice = Boolean(product.price) && product.price !== '$0.00';
  const hasStock = product.inventory > 0;

  const eligibilityChecklist = [
    {
      label: 'Product image',
      passed: hasImage,
      reason: hasImage ? 'High-res 1200x1200px image synced' : 'Product is missing a usable image'
    },
    {
      label: 'Product title',
      passed: hasTitle,
      reason: hasTitle ? `Valid title (${product.title.length} chars)` : 'Product title too short'
    },
    {
      label: 'Description',
      passed: hasDescription,
      reason: hasDescription ? 'Detailed marketing description present' : 'Missing rich product description'
    },
    {
      label: 'Price',
      passed: hasPrice,
      reason: hasPrice ? `Valid pricing (${product.price})` : 'Missing price metadata'
    },
    {
      label: 'Inventory / Product Status',
      passed: hasStock,
      reason: hasStock ? `Active status with ${product.inventory} units` : 'Product out of stock'
    }
  ];

  // Angle statuses
  const angleStatuses = [
    {
      id: 'benefit',
      name: 'Product-Led / Benefit-Led',
      status: product.syncStatus === 'synced' && isEligible ? 'needs_review' : 'not_generated',
      updatedAt: '12m ago'
    },
    {
      id: 'social_proof',
      name: 'Social Proof / Reviews',
      status: product.syncStatus === 'synced' && isEligible ? 'approved' : 'not_generated',
      updatedAt: '45m ago'
    },
    {
      id: 'urgency',
      name: 'Offer / Urgency-Led',
      status: product.syncStatus === 'synced' && isEligible ? 'rendering' : 'not_generated',
      updatedAt: '1h ago'
    }
  ];

  const handleSyncProduct = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      triggerToast('Product synced.');
    }, 1000);
  };

  const handleGenerateClick = () => {
    triggerToast('Creative regeneration started.');
    setTimeout(() => {
      onGenerateAngles(product);
      onClose();
    }, 800);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Inline Error State
  if (hasError) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px', textAlign: 'center' }}>
          <div style={{ padding: '30px 20px' }}>
            <AlertCircle size={40} style={{ color: 'var(--xora-critical)', marginBottom: '12px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Unable to load product</h3>
            <p style={{ fontSize: '13.5px', color: 'var(--xora-text-secondary)', marginBottom: '20px' }}>
              Please check your store connectivity and try again.
            </p>
            <button className="btn btn-primary" onClick={() => setHasError(false)}>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading State
  if (isLoading) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px' }}>
          <div className="modal-header">
            <div className="skeleton" style={{ width: '240px', height: '20px' }} />
            <button className="icon-btn" onClick={onClose}><X size={18} /></button>
          </div>
          <div className="modal-body" style={{ padding: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <div className="skeleton" style={{ width: '100%', height: '300px', borderRadius: 'var(--radius-panel)', marginBottom: '12px' }} />
                <div className="skeleton" style={{ width: '80%', height: '24px', marginBottom: '8px' }} />
                <div className="skeleton" style={{ width: '50%', height: '16px' }} />
              </div>
              <div>
                <div style={{ padding: '16px', backgroundColor: 'var(--xora-bg-app)', borderRadius: 'var(--radius-panel)', marginBottom: '16px' }}>
                  <div className="skeleton" style={{ width: '180px', height: '18px', marginBottom: '8px' }} />
                  <span style={{ fontSize: '13px', color: 'var(--xora-text-muted)' }}>Checking eligibility...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Toast popup */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '76px',
          right: '24px',
          zIndex: 200,
          backgroundColor: 'var(--xora-header-bg)',
          color: 'white',
          padding: '10px 16px',
          borderRadius: 'var(--radius-btn)',
          boxShadow: 'var(--shadow-modal)',
          fontSize: '13px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'slideIn 0.2s ease'
        }}>
          <CheckCircle2 size={16} style={{ color: '#34d399' }} />
          {toastMessage}
        </div>
      )}

      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '960px', width: '92vw', padding: 0, overflow: 'hidden' }}
      >
        {/* Modal Header & Breadcrumb */}
        <div className="modal-header" style={{ padding: '16px 24px', borderBottom: '1px solid var(--xora-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px' }}>
            <span 
              onClick={onClose}
              style={{ color: 'var(--xora-text-secondary)', cursor: 'pointer' }}
            >
              Products
            </span>
            <span style={{ color: 'var(--xora-text-muted)' }}>/</span>
            <span style={{ fontWeight: 600, color: 'var(--xora-text-primary)' }}>
              {product.title}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a 
              href={`https://${storeContext.domain}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-tertiary btn-sm"
              style={{ textDecoration: 'none' }}
            >
              <ExternalLink size={13} /> View on Shopify
            </a>
            <button className="icon-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body: Two Column Desktop Layout */}
        <div className="modal-body" style={{ padding: '24px', maxHeight: '78vh', overflowY: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
            {/* LEFT COLUMN: Product Overview & Image Gallery */}
            <div>
              {/* Interactive Image Gallery */}
              <div style={{ position: 'relative', marginBottom: '14px', borderRadius: 'var(--radius-panel)', overflow: 'hidden', backgroundColor: 'var(--xora-bg-app)', border: '1px solid var(--xora-border)' }}>
                <img 
                  src={galleryImages[activeImageIndex]} 
                  alt={product.title} 
                  style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
                />

                {/* Gallery Navigation Controls */}
                <button 
                  onClick={() => setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid var(--xora-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                  title="Previous image (Left Arrow)"
                >
                  <ChevronLeft size={16} />
                </button>

                <button 
                  onClick={() => setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid var(--xora-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                  title="Next image (Right Arrow)"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Thumbnails Row */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                {galleryImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    onClick={() => setActiveImageIndex(idx)}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: 'var(--radius-input)',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      border: activeImageIndex === idx ? '2px solid var(--xora-primary)' : '1px solid var(--xora-border)',
                      opacity: activeImageIndex === idx ? 1 : 0.6,
                      transition: 'all var(--transition-fast)'
                    }}
                  />
                ))}
              </div>

              {/* Real Ecommerce Information Hierarchy */}
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--xora-text-primary)', marginBottom: '8px' }}>
                  {product.title}
                </h2>

                <p style={{ fontSize: '13px', color: 'var(--xora-text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                  {product.description}
                </p>

                {/* Ecommerce Details Metadata Table */}
                <div style={{ padding: '14px', backgroundColor: 'var(--xora-bg-app)', borderRadius: 'var(--radius-input)', border: '1px solid var(--xora-border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12.5px' }}>
                  <div>
                    <span style={{ color: 'var(--xora-text-muted)', display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>Vendor</span>
                    <strong style={{ color: 'var(--xora-text-primary)' }}>XORA Direct</strong>
                  </div>

                  <div>
                    <span style={{ color: 'var(--xora-text-muted)', display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>Category</span>
                    <strong style={{ color: 'var(--xora-text-primary)' }}>{product.category}</strong>
                  </div>

                  <div>
                    <span style={{ color: 'var(--xora-text-muted)', display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>SKU</span>
                    <strong style={{ color: 'var(--xora-text-primary)', fontFamily: 'monospace' }}>{product.handle.toUpperCase()}</strong>
                  </div>

                  <div>
                    <span style={{ color: 'var(--xora-text-muted)', display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>Price</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <strong style={{ color: 'var(--xora-text-primary)', fontSize: '14px' }}>{product.price}</strong>
                      <span style={{ textDecoration: 'line-through', color: 'var(--xora-text-muted)', fontSize: '12px' }}>$159.00</span>
                    </div>
                  </div>

                  <div>
                    <span style={{ color: 'var(--xora-text-muted)', display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>Inventory Stock</span>
                    <span style={{ fontWeight: 600, color: product.inventory > 0 ? 'var(--xora-primary)' : 'var(--xora-critical)' }}>
                      {product.inventory > 0 ? `${product.inventory} units` : 'Out of stock'}
                    </span>
                  </div>

                  <div>
                    <span style={{ color: 'var(--xora-text-muted)', display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>Shopify Status</span>
                    <span className="badge badge-success" style={{ display: 'inline-block', marginTop: '2px' }}>
                      Active Catalog Item
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Creative Eligibility Panel & Angle Statuses */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Eligibility Panel */}
              <div className="xora-card" style={{ padding: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--xora-text-primary)' }}>
                    Creative Eligibility
                  </h3>
                  {isEligible ? (
                    <span className="badge badge-success" style={{ fontWeight: 700 }}>
                      ELIGIBLE FOR CREATIVE GENERATION
                    </span>
                  ) : (
                    <span className="badge badge-critical" style={{ fontWeight: 700 }}>
                      NOT ELIGIBLE
                    </span>
                  )}
                </div>

                {!isEligible && (
                  <div style={{
                    padding: '10px 12px',
                    backgroundColor: 'var(--xora-critical-light)',
                    border: '1px solid var(--xora-critical)',
                    borderRadius: 'var(--radius-input)',
                    fontSize: '12.5px',
                    color: 'var(--xora-critical)',
                    marginBottom: '14px',
                    fontWeight: 600
                  }}>
                    Not eligible — Product is missing a usable image.
                  </div>
                )}

                {/* 5-Item Checklist */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {eligibilityChecklist.map((item, idx) => (
                    <div 
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        padding: '8px 10px',
                        borderRadius: 'var(--radius-input)',
                        backgroundColor: 'var(--xora-bg-app)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        {item.passed ? (
                          <CheckCircle2 size={16} style={{ color: 'var(--xora-primary)', marginTop: '2px' }} />
                        ) : (
                          <XCircle size={16} style={{ color: 'var(--xora-critical)', marginTop: '2px' }} />
                        )}
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--xora-text-primary)' }}>
                            {item.label}
                          </div>
                          <div style={{ fontSize: '11.5px', color: 'var(--xora-text-secondary)' }}>
                            {item.reason}
                          </div>
                        </div>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: item.passed ? 'var(--xora-primary)' : 'var(--xora-critical)' }}>
                        {item.passed ? 'PASS' : 'FAIL'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Three Angle Status Monitor */}
              <div className="xora-card" style={{ padding: '18px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--xora-text-primary)', marginBottom: '12px' }}>
                  3-Angle Creative Automation Status
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {angleStatuses.map((angle) => (
                    <div 
                      key={angle.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        border: '1px solid var(--xora-border)',
                        borderRadius: 'var(--radius-input)',
                        backgroundColor: 'var(--xora-surface)'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--xora-text-primary)' }}>
                          {angle.name}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--xora-text-muted)' }}>
                          Updated {angle.updatedAt}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <StatusBadge status={angle.status as any} />
                        <button 
                          className="btn btn-tertiary btn-sm"
                          onClick={() => {
                            onClose();
                            onNavigate('approvals');
                          }}
                        >
                          <Eye size={12} /> View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Bar */}
              <div style={{
                padding: '16px',
                backgroundColor: 'var(--xora-surface)',
                border: '1px solid var(--xora-border)',
                borderRadius: 'var(--radius-panel)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={handleGenerateClick}
                  style={{ width: '100%' }}
                >
                  <Sparkles size={18} />
                  {product.syncStatus === 'synced' ? 'Regenerate Creatives' : 'Generate Creatives'}
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => {
                      onClose();
                      onNavigate('approvals');
                    }}
                  >
                    <Eye size={15} /> View Creatives
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={handleSyncProduct}
                    disabled={isSyncing}
                  >
                    <RefreshCw size={15} className={isSyncing ? 'spin' : ''} />
                    {isSyncing ? 'Syncing...' : 'Sync Product'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
