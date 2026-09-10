import React, { useState } from 'react';
import { 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Edit3, 
  RefreshCw, 
  Eye, 
  CheckSquare, 
  ShoppingBag, 
  AlertCircle
} from 'lucide-react';
import type { ShopifyProduct, CreativeDraft, MarketingAngleType, ActiveTab } from '../../types';
import { CreativeDetailModal } from './CreativeDetailModal';

interface CreativeStudioViewProps {
  products: ShopifyProduct[];
  selectedProduct: ShopifyProduct | null;
  onSelectProduct: (product: ShopifyProduct) => void;
  onSaveDraftToApprovals: (newDrafts: CreativeDraft[]) => void;
  onNavigate?: (tab: ActiveTab) => void;
}

interface CardDraftState {
  id: string;
  angleType: 'product' | 'benefit' | 'offer';
  angleBadge: string;
  hook: string;
  headline: string;
  body: string;
  cta: string;
  visualDirection: string;
  sceneStructure: string;
  hasClaimWarning: boolean;
  warningText?: string;
  warningAcknowledged: boolean;
  isEditing: boolean;
}

export const CreativeStudioView: React.FC<CreativeStudioViewProps> = ({
  products,
  selectedProduct,
  onSelectProduct,
  onSaveDraftToApprovals,
  onNavigate
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'product' | 'benefit' | 'offer'>('all');
  const [selectedProductId, setSelectedProductId] = useState<string>(selectedProduct?.id || (products[0]?.id || 'prod_101'));
  const [isBulkGenerating, setIsBulkGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [regenerateTargetId, setRegenerateTargetId] = useState<string | null>(null);
  const [previewDraft, setPreviewDraft] = useState<CardDraftState | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  const currentProduct = products.find(p => p.id === selectedProductId) || products[0];

  // Draft cards state for 3 side-by-side marketing angles
  const [draftCards, setDraftCards] = useState<CardDraftState[]>([
    {
      id: 'card_prod_led',
      angleType: 'product',
      angleBadge: 'Product-Led',
      hook: 'Meet the thermal hoodie engineered for sub-zero performance.',
      headline: 'Aura Thermal Active Hoodie',
      body: `Features responsive micro-weave fleece, 4-way stretch flexibility, and custom wind-resistant zipper lining built for extreme winter workouts.`,
      cta: 'Shop Thermal Collection',
      visualDirection: 'Macro close-up on fabric weave texture transition to model running in cold mountain fog.',
      sceneStructure: 'Scene 1: Fabric Spec (0-3s) • Scene 2: Weather Endurance (3-10s) • Scene 3: Product Shot & CTA (10-15s)',
      hasClaimWarning: false,
      warningAcknowledged: false,
      isEditing: false
    },
    {
      id: 'card_benefit_led',
      angleType: 'benefit',
      angleBadge: 'Benefit-Led',
      hook: 'Stop layering 3 jackets. One thermal active hoodie does it all.',
      headline: 'Lightweight Sub-Zero Warmth',
      body: `Maintains optimal core body temperature without restricting athletic movement. 100% breathable thermal regulation for winter running.`,
      cta: 'Explore Technical Gear',
      visualDirection: 'Fast split-screen comparing heavy bulky jacket vs single lightweight Aura hoodie.',
      sceneStructure: 'Scene 1: Problem - Bulky Layers (0-3s) • Scene 2: Benefit & Solution (3-10s) • Scene 3: CTA (10-15s)',
      hasClaimWarning: true,
      warningText: 'Review required — "100% breathable thermal regulation" could not be fully verified from Shopify catalog data.',
      warningAcknowledged: false,
      isEditing: false
    },
    {
      id: 'card_offer_led',
      angleType: 'offer',
      angleBadge: 'Offer-Led',
      hook: 'Flash Fall Sale: Save 20% + Free Express Shipping ends tonight!',
      headline: 'Limited Inventory Alert',
      body: `Stock is down to the final 142 units in Charcoal. Claim your 20% discount before seasonal restock prices return.`,
      cta: 'Claim 20% Discount',
      visualDirection: 'Bold countdown timer overlay with high-contrast inventory ticker badge.',
      sceneStructure: 'Scene 1: Flash Sale Hook (0-3s) • Scene 2: Inventory Scarcity (3-10s) • Scene 3: Discount CTA (10-15s)',
      hasClaimWarning: true,
      warningText: 'Review required — 20% discount claim needs active discount code verification in Shopify Admin.',
      warningAcknowledged: false,
      isEditing: false
    }
  ]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCardInputChange = (id: string, field: keyof CardDraftState, value: any) => {
    setDraftCards(prev => prev.map(card => {
      if (card.id === id) {
        return { ...card, [field]: value };
      }
      return card;
    }));
  };

  const toggleEditCard = (id: string) => {
    setDraftCards(prev => prev.map(card => {
      if (card.id === id) {
        return { ...card, isEditing: !card.isEditing };
      }
      return card;
    }));
  };

  const handleSaveCardDraft = (id: string) => {
    setDraftCards(prev => prev.map(card => {
      if (card.id === id) {
        return { ...card, isEditing: false };
      }
      return card;
    }));
    triggerToast('Creative draft saved.');
  };

  const handleAcknowledgeWarning = (id: string) => {
    setDraftCards(prev => prev.map(card => {
      if (card.id === id) {
        return { ...card, warningAcknowledged: !card.warningAcknowledged };
      }
      return card;
    }));
  };

  const handleRegenerateConfirm = () => {
    if (!regenerateTargetId) return;
    setDraftCards(prev => prev.map(card => {
      if (card.id === regenerateTargetId) {
        return {
          ...card,
          hook: `NEW AI DRAFT: Re-engineered angle script focused on ${card.angleBadge}.`,
          body: `Fresh AI copy generation incorporating latest merchant reviews and product highlights.`,
          warningAcknowledged: false,
          isEditing: false
        };
      }
      return card;
    }));
    setRegenerateTargetId(null);
    triggerToast('Creative draft regenerated.');
  };

  const handleSendCardToApproval = (card: CardDraftState) => {
    const angleMap: { [key: string]: MarketingAngleType } = {
      product: 'benefit',
      benefit: 'benefit',
      offer: 'urgency'
    };

    const newDraft: CreativeDraft = {
      id: `draft_${Date.now()}_${card.id}`,
      productId: currentProduct.id,
      productTitle: currentProduct.title,
      productImage: currentProduct.image,
      angleId: angleMap[card.angleType] || 'benefit',
      angleName: card.angleBadge,
      hookCopy: card.hook,
      bodyCopy: card.body,
      ctaText: card.cta,
      estimatedDuration: 15,
      status: 'draft',
      warnings: card.hasClaimWarning ? [card.warningText || 'Claim safety warning'] : [],
      hasDiscountClaim: card.hasClaimWarning,
      updatedAt: 'Just now'
    };

    onSaveDraftToApprovals([newDraft]);
    triggerToast(`"${card.angleBadge}" draft sent to Approvals queue.`);
  };

  const handleBulkGenerateTrigger = () => {
    setIsBulkGenerating(true);
    setGenerationProgress(10);
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsBulkGenerating(false);
            triggerToast('Generated 72 creative drafts across 24 products.');
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  const filteredCards = draftCards.filter(card => {
    if (activeFilter === 'all') return true;
    return card.angleType === activeFilter;
  });

  // 3-Card Skeleton Loading State
  if (isBulkGenerating && generationProgress === 0) {
    return (
      <div>
        <div className="page-header" style={{ marginBottom: '20px' }}>
          <div>
            <div className="skeleton" style={{ width: '220px', height: '28px', marginBottom: '8px' }} />
            <div className="skeleton" style={{ width: '420px', height: '16px' }} />
          </div>
        </div>
        <div className="grid-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="xora-card" style={{ padding: '16px' }}>
              <div className="skeleton" style={{ width: '100%', height: '180px', borderRadius: 'var(--radius-input)', marginBottom: '16px' }} />
              <div className="skeleton" style={{ width: '70%', height: '20px', marginBottom: '10px' }} />
              <div className="skeleton" style={{ width: '100%', height: '14px', marginBottom: '6px' }} />
              <div className="skeleton" style={{ width: '90%', height: '14px', marginBottom: '16px' }} />
              <div className="skeleton" style={{ width: '40%', height: '32px', borderRadius: 'var(--radius-btn)' }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty State
  if (!products || products.length === 0) {
    return (
      <div style={{ padding: '60px 0', maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
        <div className="xora-card" style={{ padding: '40px 32px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'var(--xora-primary-light)',
            color: 'var(--xora-primary)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <Sparkles size={28} />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--xora-text-primary)', marginBottom: '8px' }}>
            No creatives generated yet
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--xora-text-secondary)', lineHeight: 1.5, marginBottom: '24px' }}>
            No creatives generated yet. Select eligible products to get started.
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => onNavigate && onNavigate('products')}
          >
            <ShoppingBag size={16} /> Select Eligible Products
          </button>
        </div>
      </div>
    );
  }

  // Error State with Retry Action
  if (hasError) {
    return (
      <div style={{ padding: '40px 0', maxWidth: '540px', margin: '0 auto', textAlign: 'center' }}>
        <div className="xora-card" style={{ padding: '32px 24px', backgroundColor: 'var(--xora-critical-light)', border: '1px solid var(--xora-critical)' }}>
          <AlertCircle size={36} style={{ color: 'var(--xora-critical)', marginBottom: '12px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--xora-text-primary)', marginBottom: '8px' }}>
            Unable to generate creatives
          </h3>
          <p style={{ fontSize: '13.5px', color: 'var(--xora-text-secondary)', marginBottom: '20px' }}>
            Unable to generate creatives. Please try again.
          </p>
          <button className="btn btn-primary" onClick={() => setHasError(false)}>
            <RefreshCw size={14} /> Retry Generation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Toast Feedback Popup */}
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

      {/* 1. Header Area */}
      <div className="page-header" style={{ marginBottom: '20px' }}>
        <div>
          <h1 className="page-title">Creative Studio</h1>
          <p className="page-subtitle">
            Generate, review, and refine AI-powered creative concepts before rendering.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="badge badge-neutral" style={{ fontSize: '12.5px', padding: '6px 12px' }}>
            <ShoppingBag size={14} style={{ color: 'var(--xora-primary)' }} /> 24 products selected
          </span>

          <button 
            className="btn btn-primary"
            onClick={handleBulkGenerateTrigger}
            disabled={isBulkGenerating}
          >
            <Sparkles size={16} className={isBulkGenerating ? 'spin' : ''} />
            {isBulkGenerating ? 'Generating...' : 'Generate Creatives'}
          </button>
        </div>
      </div>

      {/* Bulk Generation Processing Overlay Banner */}
      {isBulkGenerating && (
        <div className="xora-card" style={{ marginBottom: '20px', padding: '20px', backgroundColor: 'var(--xora-primary-light)', border: '1px solid var(--xora-primary-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={20} className="spin" style={{ color: 'var(--xora-primary)' }} />
              <div>
                <strong style={{ fontSize: '14px', color: 'var(--xora-text-primary)' }}>
                  Generating 72 creative drafts...
                </strong>
                <div style={{ fontSize: '12px', color: 'var(--xora-text-secondary)' }}>
                  Processing 24 products × 3 marketing angles (Benefit, Social Proof, Urgency)
                </div>
              </div>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--xora-primary)' }}>
              {generationProgress}%
            </span>
          </div>

          <div style={{ width: '100%', height: '8px', backgroundColor: 'white', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
            <div style={{ width: `${generationProgress}%`, height: '100%', backgroundColor: 'var(--xora-primary)', transition: 'width 0.3s ease' }} />
          </div>
        </div>
      )}

      {/* 2. Product Selector & Angle Filter Bar */}
      <div className="xora-card" style={{ marginBottom: '24px' }}>
        <div className="xora-card-body" style={{ padding: '16px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px' }}>
          {/* Active Product Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src={currentProduct.image} 
              alt={currentProduct.title} 
              style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-input)', objectFit: 'cover' }} 
            />
            <div>
              <span style={{ fontSize: '11px', color: 'var(--xora-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Active Catalog Product
              </span>
              <select 
                className="xora-select"
                value={selectedProductId}
                onChange={(e) => {
                  setSelectedProductId(e.target.value);
                  const found = products.find(p => p.id === e.target.value);
                  if (found) onSelectProduct(found);
                }}
                style={{ fontWeight: 600, fontSize: '13.5px', padding: '4px 10px' }}
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.title} ({p.price})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Angle Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--xora-text-secondary)', marginRight: '4px' }}>Filter Angle:</span>
            {[
              { id: 'all', label: 'All 3 Angles' },
              { id: 'product', label: 'Product-Led' },
              { id: 'benefit', label: 'Benefit-Led' },
              { id: 'offer', label: 'Offer-Led' }
            ].map(btn => (
              <button
                key={btn.id}
                onClick={() => setActiveFilter(btn.id as any)}
                style={{
                  padding: '5px 12px',
                  fontSize: '12.5px',
                  fontWeight: activeFilter === btn.id ? 600 : 500,
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid ' + (activeFilter === btn.id ? 'var(--xora-primary)' : 'var(--xora-border)'),
                  backgroundColor: activeFilter === btn.id ? 'var(--xora-primary-light)' : 'var(--xora-surface)',
                  color: activeFilter === btn.id ? 'var(--xora-primary)' : 'var(--xora-text-primary)',
                  cursor: 'pointer'
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Side-by-Side 3-Angle Cards Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: activeFilter === 'all' ? 'repeat(auto-fit, minmax(320px, 1fr))' : '1fr', 
        gap: '20px', 
        marginBottom: '24px' 
      }}>
        {filteredCards.map((card) => {
          const isApprovalDisabled = card.hasClaimWarning && !card.warningAcknowledged;

          return (
            <div 
              key={card.id}
              className="xora-card"
              style={{
                border: card.hasClaimWarning ? '1px solid var(--xora-warning)' : '1px solid var(--xora-border)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Card Top Header */}
              <div className="xora-card-header" style={{ backgroundColor: 'var(--xora-bg-app)', padding: '12px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-neutral" style={{ fontWeight: 700, fontSize: '11.5px' }}>
                    {card.angleBadge}
                  </span>
                  <span className="badge badge-warning" style={{ fontSize: '11px', fontWeight: 600 }}>
                    DRAFT — AI GENERATED
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button 
                    className="btn btn-tertiary btn-sm"
                    onClick={() => setPreviewDraft(card)}
                    title="Preview full script"
                  >
                    <Eye size={13} /> Preview
                  </button>
                </div>
              </div>

              {/* Card Body & Content */}
              <div className="xora-card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px', padding: '16px' }}>
                {/* Product Reference */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '10px', borderBottom: '1px solid var(--xora-border-subtle)' }}>
                  <img 
                    src={currentProduct.image} 
                    alt={currentProduct.title} 
                    style={{ width: '36px', height: '36px', borderRadius: '4px', objectFit: 'cover' }} 
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--xora-text-primary)' }}>
                      {currentProduct.title}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--xora-text-muted)' }}>
                      Target: {currentProduct.category} • {currentProduct.price}
                    </div>
                  </div>
                </div>

                {/* Prominent AI Claim Safety Warning Banner */}
                {card.hasClaimWarning && (
                  <div style={{
                    padding: '12px',
                    backgroundColor: 'var(--xora-warning-light)',
                    border: '1px solid var(--xora-warning)',
                    borderRadius: 'var(--radius-input)',
                    fontSize: '12px',
                    color: '#8A6100'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px', fontWeight: 600 }}>
                      <AlertTriangle size={16} style={{ color: '#8A6100', marginTop: '1px' }} />
                      <span>{card.warningText}</span>
                    </div>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', cursor: 'pointer', fontWeight: 600 }}>
                      <input 
                        type="checkbox"
                        checked={card.warningAcknowledged}
                        onChange={() => handleAcknowledgeWarning(card.id)}
                      />
                      I acknowledge & verify this claim from Shopify store data
                    </label>
                  </div>
                )}

                {/* Edit Mode vs Display Mode */}
                {card.isEditing ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--xora-text-muted)', display: 'block', marginBottom: '4px' }}>
                        Hook Line (0-3s)
                      </label>
                      <input 
                        type="text"
                        className="xora-input"
                        value={card.hook}
                        onChange={(e) => handleCardInputChange(card.id, 'hook', e.target.value)}
                        style={{ fontSize: '13px', width: '100%' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--xora-text-muted)', display: 'block', marginBottom: '4px' }}>
                        Headline Text
                      </label>
                      <input 
                        type="text"
                        className="xora-input"
                        value={card.headline}
                        onChange={(e) => handleCardInputChange(card.id, 'headline', e.target.value)}
                        style={{ fontSize: '13px', width: '100%' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--xora-text-muted)', display: 'block', marginBottom: '4px' }}>
                        Body Copy Script
                      </label>
                      <textarea 
                        className="xora-textarea"
                        rows={3}
                        value={card.body}
                        onChange={(e) => handleCardInputChange(card.id, 'body', e.target.value)}
                        style={{ fontSize: '12.5px', width: '100%' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--xora-text-muted)', display: 'block', marginBottom: '4px' }}>
                        Call-to-Action Text
                      </label>
                      <input 
                        type="text"
                        className="xora-input"
                        value={card.cta}
                        onChange={(e) => handleCardInputChange(card.id, 'cta', e.target.value)}
                        style={{ fontSize: '13px', width: '100%' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--xora-text-muted)', display: 'block', marginBottom: '4px' }}>
                        Visual Direction
                      </label>
                      <textarea 
                        className="xora-textarea"
                        rows={2}
                        value={card.visualDirection}
                        onChange={(e) => handleCardInputChange(card.id, 'visualDirection', e.target.value)}
                        style={{ fontSize: '12px', width: '100%' }}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                      <button className="btn btn-primary btn-sm" onClick={() => handleSaveCardDraft(card.id)}>
                        Save Draft
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => toggleEditCard(card.id)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Display Mode */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--xora-text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '2px' }}>
                        Hook Line (0-3s)
                      </span>
                      <p style={{ fontWeight: 600, color: 'var(--xora-text-primary)', lineHeight: 1.4 }}>
                        "{card.hook}"
                      </p>
                    </div>

                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--xora-text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '2px' }}>
                        Body Copy Script
                      </span>
                      <p style={{ color: 'var(--xora-text-secondary)', lineHeight: 1.5, fontSize: '12.5px' }}>
                        {card.body}
                      </p>
                    </div>

                    <div style={{ padding: '8px 10px', backgroundColor: 'var(--xora-bg-app)', borderRadius: 'var(--radius-input)', border: '1px solid var(--xora-border-subtle)' }}>
                      <span style={{ fontSize: '11px', color: 'var(--xora-text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '2px' }}>
                        CTA Button Text
                      </span>
                      <span className="badge badge-success" style={{ fontWeight: 600 }}>
                        {card.cta}
                      </span>
                    </div>

                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--xora-text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '2px' }}>
                        Visual Direction
                      </span>
                      <p style={{ fontSize: '12px', color: 'var(--xora-text-secondary)', fontStyle: 'italic' }}>
                        {card.visualDirection}
                      </p>
                    </div>

                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--xora-text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '2px' }}>
                        Scene Breakdown
                      </span>
                      <div style={{ fontSize: '11.5px', color: 'var(--xora-text-secondary)' }}>
                        {card.sceneStructure}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer Action Bar */}
              <div className="xora-card-footer" style={{ padding: '12px 16px', borderTop: '1px solid var(--xora-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => toggleEditCard(card.id)}>
                    <Edit3 size={13} /> Edit
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => setRegenerateTargetId(card.id)}>
                    <RefreshCw size={13} /> Regenerate
                  </button>
                </div>

                <button 
                  className="btn btn-primary btn-sm"
                  disabled={isApprovalDisabled}
                  onClick={() => handleSendCardToApproval(card)}
                  title={isApprovalDisabled ? 'Acknowledge warning or edit copy to enable' : 'Send to Merchant Approvals Queue'}
                >
                  <CheckSquare size={13} /> Send to Approval
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Regeneration Overwrite Guard Modal */}
      {regenerateTargetId && (
        <div className="modal-overlay" onClick={() => setRegenerateTargetId(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px', textAlign: 'center' }}>
            <div style={{ padding: '24px 20px' }}>
              <RefreshCw size={36} style={{ color: 'var(--xora-warning)', marginBottom: '12px' }} />
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--xora-text-primary)', marginBottom: '8px' }}>
                Regenerate AI Draft?
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--xora-text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
                This may replace your previous draft, including any custom edits you have saved to this concept.
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button className="btn btn-secondary" onClick={() => setRegenerateTargetId(null)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleRegenerateConfirm}>
                  Confirm Regeneration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Creative Detail / Draft Preview Modal Screen (/creatives/:creativeId) */}
      {previewDraft && (
        <CreativeDetailModal
          creative={previewDraft}
          product={currentProduct}
          onClose={() => setPreviewDraft(null)}
          onUpdateCreative={(updated) => {
            setDraftCards(prev => prev.map(c => c.id === updated.id ? updated : c));
          }}
          onApproveCreative={(id) => {
            const found = draftCards.find(c => c.id === id);
            if (found) handleSendCardToApproval(found);
            setPreviewDraft(null);
          }}
          onRejectCreative={(_id, reason) => {
            triggerToast(`Draft rejected: "${reason}"`);
            setPreviewDraft(null);
          }}
        />
      )}
    </div>
  );
};
