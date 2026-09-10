import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Check, 
  Wand2, 
  Search, 
  Eye, 
  ThumbsUp, 
  ThumbsDown, 
  RotateCcw, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import type { CreativeDraft, CreditBalance } from '../../types';
import { CreativeDetailModal } from '../creatives/CreativeDetailModal';

interface ApprovalsViewProps {
  drafts: CreativeDraft[];
  creditBalance: CreditBalance;
  onApproveAndOpenQuote: (selectedDrafts: CreativeDraft[]) => void;
  onDeleteDraft: (draftId: string) => void;
  onNavigateToStudio: () => void;
}

export const ApprovalsView: React.FC<ApprovalsViewProps> = ({
  drafts: initialDrafts,
  creditBalance: _creditBalance,
  onApproveAndOpenQuote,
  onDeleteDraft: _onDeleteDraft,
  onNavigateToStudio
}) => {
  const [draftsList, setDraftsList] = useState<CreativeDraft[]>(initialDrafts);
  const [statusFilter, setStatusFilter] = useState<'all' | 'needs_review' | 'approved' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Inspection & Modals
  const [detailModalCreative, setDetailModalCreative] = useState<CreativeDraft | null>(null);
  const [showBulkApproveModal, setShowBulkApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectTargetId, setRejectTargetId] = useState<string | null>(null);
  const [selectedRejectReason, setSelectedRejectReason] = useState('unsupported_claim');
  const [customRejectNote, setCustomRejectNote] = useState('');
  
  // Feedback Toast & States
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // KPI Metrics Calculations
  const needsReviewCount = 148;
  const approvedCount = 24;
  const rejectedCount = 6;

  // Filter & Search Logic
  const filteredDrafts = draftsList.filter((d) => {
    // Status Filter
    if (statusFilter === 'needs_review' && d.status !== 'draft') return false;
    if (statusFilter === 'approved' && d.status !== 'approved') return false;
    if (statusFilter === 'rejected' && d.status !== 'rejected') return false;

    // Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = d.productTitle.toLowerCase().includes(q);
      const matchHook = d.hookCopy.toLowerCase().includes(q);
      const matchId = d.id.toLowerCase().includes(q);
      return matchTitle || matchHook || matchId;
    }

    return true;
  });

  const toggleSelectOne = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredDrafts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredDrafts.map(d => d.id));
    }
  };

  const handleSingleApprove = (draft: CreativeDraft) => {
    if (draft.hasDiscountClaim && draft.warnings.length > 0) {
      triggerToast('⚠️ Unresolved claim warning. Resolve or acknowledge warning to approve.');
      return;
    }

    setDraftsList(prev => prev.map(d => d.id === draft.id ? { ...d, status: 'approved' } : d));
    triggerToast('Creative approved.');
  };

  const handleConfirmSingleReject = () => {
    if (!rejectTargetId) return;
    setDraftsList(prev => prev.map(d => d.id === rejectTargetId ? { ...d, status: 'rejected' } : d));
    setShowRejectModal(false);
    setRejectTargetId(null);
    triggerToast('Creative rejected.');
  };

  const handleBulkApproveConfirm = () => {
    const validSelected = draftsList.filter(d => selectedIds.includes(d.id) && (!d.hasDiscountClaim || d.warnings.length === 0));
    setDraftsList(prev => prev.map(d => selectedIds.includes(d.id) ? { ...d, status: 'approved' } : d));
    setShowBulkApproveModal(false);
    triggerToast(`${selectedIds.length} creatives approved.`);
    onApproveAndOpenQuote(validSelected);
  };

  const handleSendBackForEditing = (_draftId: string) => {
    triggerToast('Creative script sent back to Creative Studio for editing.');
  };

  // Mock product object for detail modal
  const getProductForDraft = (draft: CreativeDraft) => ({
    id: draft.productId,
    title: draft.productTitle,
    handle: draft.productTitle.toLowerCase().replace(/\s+/g, '-'),
    image: draft.productImage,
    price: '$88.00',
    category: 'Apparel',
    inventory: 142,
    syncStatus: 'synced' as const,
    aiEligibility: 'eligible' as const
  });

  return (
    <div>
      {/* Toast Feedback */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '76px',
          right: '24px',
          zIndex: 250,
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
          <h1 className="page-title">Approvals</h1>
          <p className="page-subtitle">
            Review AI-generated creatives before they enter rendering.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn btn-secondary" onClick={onNavigateToStudio}>
            <Wand2 size={16} /> Open Creative Studio
          </button>
          
          <button 
            className="btn btn-primary btn-lg"
            onClick={() => onApproveAndOpenQuote(draftsList.filter(d => d.status === 'approved' || selectedIds.includes(d.id)))}
          >
            Continue to Cost Quote <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* 2. KPI Metrics Row */}
      <div className="grid-3" style={{ marginBottom: '20px' }}>
        <div className="kpi-card">
          <div className="kpi-label">Needs Review</div>
          <div className="kpi-value" style={{ color: 'var(--xora-warning)' }}>{needsReviewCount}</div>
          <div className="kpi-meta">Awaiting merchant inspection</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">Approved</div>
          <div className="kpi-value" style={{ color: 'var(--xora-primary)' }}>{approvedCount}</div>
          <div className="kpi-meta">Ready for cost quote & rendering</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">Rejected</div>
          <div className="kpi-value" style={{ color: 'var(--xora-critical)' }}>{rejectedCount}</div>
          <div className="kpi-meta">Requires script re-drafting</div>
        </div>
      </div>

      {/* 3. Filter & Search Controls */}
      <div className="xora-card" style={{ marginBottom: '20px' }}>
        <div className="xora-card-body" style={{ padding: '16px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px' }}>
          {/* Status Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--xora-text-secondary)', marginRight: '4px' }}>Status:</span>
            {[
              { id: 'all', label: 'All Creatives' },
              { id: 'needs_review', label: `Needs Review (${needsReviewCount})` },
              { id: 'approved', label: `Approved (${approvedCount})` },
              { id: 'rejected', label: `Rejected (${rejectedCount})` }
            ].map((pill) => (
              <button
                key={pill.id}
                onClick={() => setStatusFilter(pill.id as any)}
                style={{
                  padding: '5px 12px',
                  fontSize: '12.5px',
                  fontWeight: statusFilter === pill.id ? 600 : 500,
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid ' + (statusFilter === pill.id ? 'var(--xora-primary)' : 'var(--xora-border)'),
                  backgroundColor: statusFilter === pill.id ? 'var(--xora-primary-light)' : 'var(--xora-surface)',
                  color: statusFilter === pill.id ? 'var(--xora-primary)' : 'var(--xora-text-primary)',
                  cursor: 'pointer'
                }}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', minWidth: '280px' }}>
            <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--xora-text-muted)' }} />
            <input 
              type="text"
              className="xora-input"
              placeholder="Search product name, SKU, or creative ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '32px', fontSize: '13px', width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Sticky Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div style={{
          position: 'sticky',
          top: '72px',
          zIndex: 100,
          marginBottom: '20px',
          padding: '12px 20px',
          backgroundColor: 'var(--xora-header-bg)',
          color: 'white',
          borderRadius: 'var(--radius-panel)',
          boxShadow: 'var(--shadow-modal)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="badge" style={{ backgroundColor: 'var(--xora-primary)', color: 'white', fontWeight: 700, fontSize: '12px' }}>
              {selectedIds.length} creatives selected
            </span>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
              Select actions to apply to all selected items
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => setShowBulkApproveModal(true)}>
              <ThumbsUp size={14} /> Approve Selected
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => {
              setDraftsList(prev => prev.map(d => selectedIds.includes(d.id) ? { ...d, status: 'rejected' } : d));
              triggerToast(`${selectedIds.length} creatives rejected.`);
            }}>
              <ThumbsDown size={14} /> Reject Selected
            </button>
            <button className="btn btn-tertiary btn-sm" style={{ color: 'white' }} onClick={() => setSelectedIds([])}>
              Cancel Selection
            </button>
          </div>
        </div>
      )}

      {/* 4. Approval Cards List */}
      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="xora-card" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', gap: '14px' }}>
                <div className="skeleton" style={{ width: '54px', height: '54px', borderRadius: 'var(--radius-input)' }} />
                <div style={{ flex: 1 }}>
                  <div className="skeleton" style={{ width: '200px', height: '18px', marginBottom: '8px' }} />
                  <div className="skeleton" style={{ width: '90%', height: '14px', marginBottom: '6px' }} />
                  <div className="skeleton" style={{ width: '60%', height: '14px' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : hasError ? (
        <div className="xora-card" style={{ padding: '32px', textAlign: 'center', backgroundColor: 'var(--xora-critical-light)', border: '1px solid var(--xora-critical)' }}>
          <AlertCircle size={36} style={{ color: 'var(--xora-critical)', marginBottom: '12px' }} />
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--xora-text-primary)' }}>Unable to load approval queue</h3>
          <p style={{ fontSize: '13px', color: 'var(--xora-text-secondary)', marginBottom: '16px' }}>
            Unable to load approval queue. Please try again.
          </p>
          <button className="btn btn-primary" onClick={() => setHasError(false)}>
            <RefreshCw size={14} /> Retry Loading Queue
          </button>
        </div>
      ) : filteredDrafts.length === 0 ? (
        /* Empty State */
        <div className="xora-card" style={{ padding: '48px 32px', textAlign: 'center' }}>
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
            <CheckCircle2 size={28} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--xora-text-primary)', marginBottom: '6px' }}>
            No creatives require approval
          </h3>
          <p style={{ fontSize: '13.5px', color: 'var(--xora-text-secondary)', maxWidth: '440px', margin: '0 auto 20px auto', lineHeight: 1.5 }}>
            Approved creatives will move to the cost quote workflow and rendering pipeline.
          </p>
          <button className="btn btn-primary" onClick={onNavigateToStudio}>
            <Wand2 size={16} /> Open Creative Studio
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Select All Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px', fontSize: '12.5px', color: 'var(--xora-text-secondary)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600 }}>
              <input 
                type="checkbox"
                checked={selectedIds.length === filteredDrafts.length && filteredDrafts.length > 0}
                onChange={toggleSelectAll}
              />
              Select All ({filteredDrafts.length} items)
            </label>

            <span>Showing {filteredDrafts.length} creative drafts</span>
          </div>

          {filteredDrafts.map((draft) => {
            const isSelected = selectedIds.includes(draft.id);
            const hasWarning = draft.hasDiscountClaim || draft.warnings.length > 0;
            const isApproveBlocked = hasWarning;

            return (
              <div 
                key={draft.id}
                className="xora-card"
                style={{
                  border: isSelected ? '1px solid var(--xora-primary)' : '1px solid var(--xora-border)',
                  backgroundColor: isSelected ? 'var(--xora-primary-light)' : 'var(--xora-surface)',
                  padding: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  {/* Select Checkbox */}
                  <input 
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelectOne(draft.id)}
                    style={{ marginTop: '4px' }}
                  />

                  {/* Product Thumbnail */}
                  <img 
                    src={draft.productImage} 
                    alt={draft.productTitle} 
                    style={{ width: '54px', height: '54px', borderRadius: 'var(--radius-input)', objectFit: 'cover' }} 
                  />

                  {/* Content Breakdown */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--xora-text-primary)' }}>
                          {draft.productTitle}
                        </span>
                        <span className="badge badge-neutral" style={{ fontSize: '11px', fontWeight: 600 }}>
                          {draft.angleName}
                        </span>
                        {draft.status === 'approved' && <span className="badge badge-success">Approved</span>}
                        {draft.status === 'rejected' && <span className="badge badge-critical">Rejected</span>}
                        {draft.status === 'draft' && <span className="badge badge-warning">Needs Review</span>}
                      </div>

                      <span style={{ fontSize: '11.5px', color: 'var(--xora-text-muted)' }}>
                        Updated {draft.updatedAt}
                      </span>
                    </div>

                    {/* Hook & Headline Preview */}
                    <div style={{ marginBottom: '8px' }}>
                      <strong style={{ fontSize: '13px', color: 'var(--xora-text-primary)' }}>
                        "{draft.hookCopy}"
                      </strong>
                      <p style={{ fontSize: '12.5px', color: 'var(--xora-text-secondary)', marginTop: '2px', lineHeight: 1.4 }}>
                        {draft.bodyCopy}
                      </p>
                    </div>

                    {/* Claim Safety Warning Alert Box */}
                    {hasWarning && (
                      <div style={{
                        padding: '10px 12px',
                        backgroundColor: 'var(--xora-warning-light)',
                        border: '1px solid var(--xora-warning)',
                        borderRadius: 'var(--radius-input)',
                        fontSize: '12px',
                        color: '#8A6100',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <AlertTriangle size={15} style={{ color: '#8A6100', flexShrink: 0 }} />
                        <span>This creative contains an unsupported claim. Resolve or acknowledge warning to approve.</span>
                      </div>
                    )}

                    {/* Action Bar */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--xora-border-subtle)' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={() => setDetailModalCreative(draft)}
                        >
                          <Eye size={13} /> Deep Review
                        </button>
                        <button 
                          className="btn btn-tertiary btn-sm"
                          onClick={() => handleSendBackForEditing(draft.id)}
                        >
                          <RotateCcw size={13} /> Send for Editing
                        </button>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            setRejectTargetId(draft.id);
                            setShowRejectModal(true);
                          }}
                        >
                          <ThumbsDown size={13} /> Reject
                        </button>

                        <button 
                          className="btn btn-primary btn-sm"
                          disabled={isApproveBlocked && draft.status !== 'approved'}
                          onClick={() => handleSingleApprove(draft)}
                          title={isApproveBlocked ? 'Resolve claim warning to enable approval' : 'Approve creative concept'}
                        >
                          <Check size={13} /> {draft.status === 'approved' ? 'Approved' : 'Approve'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. Deep Review Modal Integration */}
      {detailModalCreative && (
        <CreativeDetailModal
          creative={{
            id: detailModalCreative.id,
            angleType: detailModalCreative.angleId,
            angleBadge: detailModalCreative.angleName,
            hook: detailModalCreative.hookCopy,
            headline: detailModalCreative.productTitle,
            body: detailModalCreative.bodyCopy,
            cta: detailModalCreative.ctaText,
            visualDirection: 'Dynamic product zoom with high contrast value overlay.',
            sceneStructure: 'Scene 1: Hook • Scene 2: Product Intro • Scene 3: Benefit • Scene 4: CTA',
            hasClaimWarning: detailModalCreative.hasDiscountClaim,
            warningText: detailModalCreative.warnings[0],
            warningAcknowledged: false
          }}
          product={getProductForDraft(detailModalCreative)}
          onClose={() => setDetailModalCreative(null)}
          onUpdateCreative={(updated) => {
            setDraftsList(prev => prev.map(d => d.id === updated.id ? { ...d, hookCopy: updated.hook, bodyCopy: updated.body, ctaText: updated.cta } : d));
            triggerToast('Creative draft updated.');
          }}
          onApproveCreative={(id) => {
            setDraftsList(prev => prev.map(d => d.id === id ? { ...d, status: 'approved' } : d));
            setDetailModalCreative(null);
            triggerToast('Creative approved.');
          }}
          onRejectCreative={(id, reason) => {
            setDraftsList(prev => prev.map(d => d.id === id ? { ...d, status: 'rejected' } : d));
            setDetailModalCreative(null);
            triggerToast(`Creative rejected: ${reason}`);
          }}
        />
      )}

      {/* 6. Bulk Approval Confirmation Modal */}
      {showBulkApproveModal && (
        <div className="modal-overlay" onClick={() => setShowBulkApproveModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '460px', textAlign: 'center' }}>
            <div style={{ padding: '24px 20px' }}>
              <CheckCircle2 size={40} style={{ color: 'var(--xora-primary)', marginBottom: '12px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--xora-text-primary)', marginBottom: '6px' }}>
                You are approving {selectedIds.length} creatives.
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--xora-text-secondary)', marginBottom: '20px', lineHeight: 1.5 }}>
                Approved creatives will immediately transition to the Cost & Credit Quote checkpoint before rendering.
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button className="btn btn-secondary" onClick={() => setShowBulkApproveModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleBulkApproveConfirm}>
                  Confirm & Move to Cost Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. Rejection Reason Modal */}
      {showRejectModal && (
        <div className="modal-overlay" onClick={() => setShowRejectModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--xora-text-primary)' }}>
                Why are you rejecting this creative?
              </h3>
              <button className="icon-btn" onClick={() => setShowRejectModal(false)}><X size={18} /></button>
            </div>

            <div className="modal-body" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                {[
                  { id: 'unsupported_claim', label: 'Unsupported claim or unverified discount' },
                  { id: 'incorrect_info', label: 'Incorrect product information or metadata' },
                  { id: 'weak_creative', label: 'Weak creative hook or copy quality' },
                  { id: 'other', label: 'Other custom feedback' }
                ].map(opt => (
                  <label key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', border: '1px solid var(--xora-border)', borderRadius: 'var(--radius-input)', cursor: 'pointer', fontSize: '13px' }}>
                    <input 
                      type="radio" 
                      name="rejectReasonSingle"
                      value={opt.id}
                      checked={selectedRejectReason === opt.id}
                      onChange={() => setSelectedRejectReason(opt.id)}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>

              {selectedRejectReason === 'other' && (
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--xora-text-muted)', display: 'block', marginBottom: '4px' }}>
                    Provide specific rejection feedback:
                  </label>
                  <textarea 
                    className="xora-textarea"
                    rows={3}
                    placeholder="Describe what needs to be fixed..."
                    value={customRejectNote}
                    onChange={(e) => setCustomRejectNote(e.target.value)}
                    style={{ fontSize: '13px', width: '100%' }}
                  />
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowRejectModal(false)}>
                Cancel
              </button>
              <button className="btn btn-critical" onClick={handleConfirmSingleReject}>
                Reject Creative
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
