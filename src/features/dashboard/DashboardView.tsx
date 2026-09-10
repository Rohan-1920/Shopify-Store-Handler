import React, { useState } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  CheckSquare, 
  Cpu, 
  Video, 
  ArrowRight, 
  RefreshCw, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  Zap, 
  ShieldAlert,
  Store,
  Layers,
  Activity,
  Film,
  Coins
} from 'lucide-react';
import type { ActiveTab, ShopifyProduct, CreativeDraft, RenderJob, VideoAsset, StoreContext, CreditBalance } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';

interface DashboardViewProps {
  onNavigate: (tab: ActiveTab) => void;
  products: ShopifyProduct[];
  drafts: CreativeDraft[];
  renderJobs: RenderJob[];
  videos: VideoAsset[];
  storeContext: StoreContext;
  creditBalance: CreditBalance;
  onQuickGenerate: (productId: string) => void;
  onPreviewVideo: (video: VideoAsset) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  products,
  drafts,
  renderJobs,
  videos,
  storeContext,
  creditBalance,
  onQuickGenerate,
  onPreviewVideo
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isStoreConnected, setIsStoreConnected] = useState(true);

  // Counts & Pipeline Metrics
  const totalProductsCount = products.length > 0 ? 1248 : 0;
  const eligibleProductsCount = products.length > 0 ? 982 : 0;
  const awaitingReviewCount = drafts.filter(d => d.status === 'draft').length || 148;
  const activeRenderingCount = renderJobs.filter(j => j.status === 'rendering' || j.status === 'queued').length || 36;
  const videosReadyCount = videos.length > 0 ? 2840 : 0;

  const pendingDrafts = drafts.filter(d => d.status === 'draft').slice(0, 3);
  const activeJobs = renderJobs.slice(0, 3);

  // Recent operational activity stream
  const recentEvents = [
    { id: 'e1', icon: RefreshCw, title: 'Product catalog synced', desc: '148 product items and images updated from Shopify.', time: '12m ago', color: 'var(--xora-primary)' },
    { id: 'e2', icon: Sparkles, title: '24 creatives generated', desc: '3-angle draft scripts created for Aura Thermal Hoodie & Kettle.', time: '35m ago', color: '#8A6100' },
    { id: 'e3', icon: CheckSquare, title: '12 creatives approved', desc: 'Merchant authorized script execution & Zvid credit dispatch.', time: '1h ago', color: 'var(--xora-primary)' },
    { id: 'e4', icon: Cpu, title: 'Rendering started', desc: '120 videos dispatched to Zvid GPU scene render cluster.', time: '2h ago', color: 'var(--xora-info)' },
    { id: 'e5', icon: AlertCircle, title: '3 rendering jobs failed', desc: 'Source resolution under 1080p threshold for Desk Mat.', time: '3h ago', color: 'var(--xora-critical)' },
  ];

  // Inline Error Alert View
  if (hasError) {
    return (
      <div style={{ padding: '40px 0', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          padding: '24px',
          backgroundColor: 'var(--xora-critical-light)',
          border: '1px solid var(--xora-critical)',
          borderRadius: 'var(--radius-panel)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}>
          <AlertCircle size={36} style={{ color: 'var(--xora-critical)' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--xora-text-primary)' }}>
            Unable to load dashboard data
          </h3>
          <p style={{ fontSize: '13.5px', color: 'var(--xora-text-secondary)' }}>
            Please verify your Shopify store API connectivity or network connection and try again.
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setHasError(false);
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 800);
            }}
          >
            <RefreshCw size={14} /> Retry Loading Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Skeleton Loading State
  if (isLoading) {
    return (
      <div>
        <div className="page-header">
          <div>
            <div className="skeleton" style={{ width: '200px', height: '28px', marginBottom: '8px' }} />
            <div className="skeleton" style={{ width: '400px', height: '16px' }} />
          </div>
        </div>
        <div className="grid-4" style={{ marginBottom: '24px' }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="kpi-card">
              <div className="skeleton" style={{ width: '100px', height: '14px', marginBottom: '12px' }} />
              <div className="skeleton" style={{ width: '60px', height: '32px', marginBottom: '8px' }} />
              <div className="skeleton" style={{ width: '120px', height: '12px' }} />
            </div>
          ))}
        </div>
        <div className="skeleton" style={{ width: '100%', height: '120px', borderRadius: 'var(--radius-panel)', marginBottom: '24px' }} />
        <div className="grid-2">
          <div className="skeleton" style={{ width: '100%', height: '280px', borderRadius: 'var(--radius-panel)' }} />
          <div className="skeleton" style={{ width: '100%', height: '280px', borderRadius: 'var(--radius-panel)' }} />
        </div>
      </div>
    );
  }

  // Disconnected Empty State
  if (!isStoreConnected) {
    return (
      <div style={{ padding: '60px 0', maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
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
            <Store size={28} />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--xora-text-primary)', marginBottom: '8px' }}>
            Connect your Shopify store
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--xora-text-secondary)', lineHeight: 1.5, marginBottom: '24px' }}>
            Sync your product catalog to start creating AI-powered video ads across Benefit, Social Proof, and Urgency angles.
          </p>
          <button 
            className="btn btn-primary btn-lg"
            onClick={() => setIsStoreConnected(true)}
            style={{ width: '100%' }}
          >
            <Sparkles size={18} /> Connect Shopify Store
          </button>
        </div>
      </div>
    );
  }

  // Connected but No Products Empty State
  if (products.length === 0) {
    return (
      <div style={{ padding: '60px 0', maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
        <div className="xora-card" style={{ padding: '40px 32px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'var(--xora-warning-light)',
            color: '#8A6100',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <ShoppingBag size={28} />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--xora-text-primary)', marginBottom: '8px' }}>
            No products found
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--xora-text-secondary)', lineHeight: 1.5, marginBottom: '24px' }}>
            Your Shopify store is connected, but no product catalog items have been imported into the XORA matrix yet.
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => onNavigate('products')}
          >
            <RefreshCw size={16} /> Sync Products Catalog
          </button>
        </div>
      </div>
    );
  }

  // Dynamic Primary Action based on pipeline state
  const getPrimaryAction = () => {
    if (awaitingReviewCount > 0) {
      return {
        label: `Review ${awaitingReviewCount} Creatives`,
        tab: 'approvals' as ActiveTab,
        icon: CheckSquare
      };
    }
    if (activeRenderingCount > 0) {
      return {
        label: 'View Rendering Progress',
        tab: 'rendering' as ActiveTab,
        icon: Cpu
      };
    }
    if (videosReadyCount > 0) {
      return {
        label: 'Open Video Library',
        tab: 'videos' as ActiveTab,
        icon: Video
      };
    }
    return {
      label: 'Generate Creatives',
      tab: 'creatives' as ActiveTab,
      icon: Sparkles
    };
  };

  const primaryAction = getPrimaryAction();
  const ActionIcon = primaryAction.icon;

  return (
    <div>
      {/* 1. Header Area with Store Connection Status & Dynamic Primary Action */}
      <div className="page-header" style={{ marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <h1 className="page-title">Dashboard</h1>
            <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={12} /> {storeContext.storeName} Connected
            </span>
          </div>
          <p className="page-subtitle">
            Monitor your Shopify catalog, creative pipeline, rendering jobs, and video output.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={() => onNavigate('products')}>
            <ShoppingBag size={15} /> Catalog Matrix
          </button>
          <button className="btn btn-primary btn-lg" onClick={() => onNavigate(primaryAction.tab)}>
            <ActionIcon size={16} /> {primaryAction.label}
          </button>
        </div>
      </div>

      {/* 2. KPI Row (5 Compact Cards) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '12px', 
        marginBottom: '24px' 
      }}>
        <div className="kpi-card" onClick={() => onNavigate('products')} style={{ cursor: 'pointer' }}>
          <div className="kpi-header">
            <span>Products</span>
            <ShoppingBag size={16} style={{ color: 'var(--xora-text-muted)' }} />
          </div>
          <div className="kpi-value">{totalProductsCount.toLocaleString()}</div>
          <div className="kpi-footer">
            <span style={{ color: 'var(--xora-primary)', fontWeight: 600 }}>Synced</span> • 12m ago
          </div>
        </div>

        <div className="kpi-card" onClick={() => onNavigate('products')} style={{ cursor: 'pointer' }}>
          <div className="kpi-header">
            <span>Eligible Products</span>
            <Sparkles size={16} style={{ color: 'var(--xora-primary)' }} />
          </div>
          <div className="kpi-value">{eligibleProductsCount.toLocaleString()}</div>
          <div className="kpi-footer">
            <span style={{ color: 'var(--xora-primary)' }}>78%</span> of total catalog
          </div>
        </div>

        <div className="kpi-card" onClick={() => onNavigate('approvals')} style={{ cursor: 'pointer' }}>
          <div className="kpi-header">
            <span>Awaiting Review</span>
            <CheckSquare size={16} style={{ color: 'var(--xora-warning)' }} />
          </div>
          <div className="kpi-value">{awaitingReviewCount}</div>
          <div className="kpi-footer">
            <span style={{ color: '#8A6100', fontWeight: 600 }}>Requires merchant review</span>
          </div>
        </div>

        <div className="kpi-card" onClick={() => onNavigate('rendering')} style={{ cursor: 'pointer' }}>
          <div className="kpi-header">
            <span>Rendering</span>
            <Cpu size={16} style={{ color: 'var(--xora-info)' }} />
          </div>
          <div className="kpi-value">{activeRenderingCount}</div>
          <div className="kpi-footer">
            <span style={{ color: 'var(--xora-info)', fontWeight: 600 }}>Active GPU cluster</span>
          </div>
        </div>

        <div className="kpi-card" onClick={() => onNavigate('videos')} style={{ cursor: 'pointer' }}>
          <div className="kpi-header">
            <span>Videos Ready</span>
            <Video size={16} style={{ color: 'var(--xora-primary)' }} />
          </div>
          <div className="kpi-value">{videosReadyCount.toLocaleString()}</div>
          <div className="kpi-footer">
            <span style={{ color: 'var(--xora-primary)', fontWeight: 600 }}>Available in library</span>
          </div>
        </div>
      </div>

      {/* 3. Operational Pipeline Stepper Overview */}
      <div className="xora-card" style={{ marginBottom: '24px', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} style={{ color: 'var(--xora-primary)' }} />
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--xora-text-primary)' }}>
              Creative Automation Pipeline Flow
            </h3>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--xora-text-secondary)' }}>
            Real-time status across 6 pipeline stages
          </span>
        </div>

        <div className="workflow-stepper" style={{ marginBottom: 0 }}>
          <div className="step-item completed" onClick={() => onNavigate('products')} style={{ cursor: 'pointer' }}>
            <div className="step-number">1</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '13px' }}>Shopify Sync</div>
              <div style={{ fontSize: '11px', color: 'var(--xora-text-secondary)' }}>{totalProductsCount.toLocaleString()} items</div>
            </div>
          </div>
          <div className="step-divider" />

          <div className="step-item completed" onClick={() => onNavigate('products')} style={{ cursor: 'pointer' }}>
            <div className="step-number">2</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '13px' }}>Eligible Products</div>
              <div style={{ fontSize: '11px', color: 'var(--xora-text-secondary)' }}>{eligibleProductsCount} eligible</div>
            </div>
          </div>
          <div className="step-divider" />

          <div className="step-item active" onClick={() => onNavigate('creatives')} style={{ cursor: 'pointer' }}>
            <div className="step-number">3</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '13px' }}>AI Drafts</div>
              <div style={{ fontSize: '11px', color: 'var(--xora-text-secondary)' }}>280 generated</div>
            </div>
          </div>
          <div className="step-divider" />

          <div className="step-item active" onClick={() => onNavigate('approvals')} style={{ cursor: 'pointer' }}>
            <div className="step-number">4</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '13px' }}>Approval</div>
              <div style={{ fontSize: '11px', color: '#8A6100', fontWeight: 600 }}>{awaitingReviewCount} awaiting</div>
            </div>
          </div>
          <div className="step-divider" />

          <div className="step-item active" onClick={() => onNavigate('rendering')} style={{ cursor: 'pointer' }}>
            <div className="step-number">5</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '13px' }}>Rendering</div>
              <div style={{ fontSize: '11px', color: 'var(--xora-info)' }}>{activeRenderingCount} active</div>
            </div>
          </div>
          <div className="step-divider" />

          <div className="step-item completed" onClick={() => onNavigate('videos')} style={{ cursor: 'pointer' }}>
            <div className="step-number">6</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '13px' }}>Videos Ready</div>
              <div style={{ fontSize: '11px', color: 'var(--xora-primary)' }}>{videosReadyCount.toLocaleString()} MP4s</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Main Operational Layout: Needs Review & Active Rendering */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Left Column: Needs Your Review + Rendering Queue */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Approval Attention ("Needs your review") */}
          <div className="xora-card">
            <div className="xora-card-header">
              <div className="xora-card-title">
                <CheckSquare size={18} style={{ color: 'var(--xora-warning)' }} />
                Needs Your Review ({awaitingReviewCount})
              </div>
              <button className="btn btn-tertiary btn-sm" onClick={() => onNavigate('approvals')}>
                Review All <ArrowRight size={13} />
              </button>
            </div>
            <div className="xora-card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {pendingDrafts.map((draft) => {
                  const hasWarning = draft.warnings && draft.warnings.length > 0;
                  return (
                    <div 
                      key={draft.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 14px',
                        border: '1px solid var(--xora-border)',
                        borderRadius: 'var(--radius-input)',
                        backgroundColor: 'var(--xora-surface)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img 
                          src={draft.productImage} 
                          alt={draft.productTitle} 
                          style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-input)', objectFit: 'cover' }} 
                        />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--xora-text-primary)', marginBottom: '2px' }}>
                            {draft.productTitle}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--xora-text-secondary)' }}>
                            <span className="badge badge-neutral" style={{ fontSize: '11px' }}>
                              {draft.angleName}
                            </span>
                            {hasWarning && (
                              <span style={{ color: 'var(--xora-critical)', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 600 }}>
                                <ShieldAlert size={12} /> Safety Warning
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <StatusBadge status="needs_review" />
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            onQuickGenerate(draft.productId);
                            onNavigate('approvals');
                          }}
                        >
                          Review
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active GPU Rendering Queue */}
          <div className="xora-card">
            <div className="xora-card-header">
              <div className="xora-card-title">
                <Cpu size={18} style={{ color: 'var(--xora-info)' }} />
                Active GPU Rendering Activity ({activeRenderingCount})
              </div>
              <button className="btn btn-tertiary btn-sm" onClick={() => onNavigate('rendering')}>
                View Full Queue <ArrowRight size={13} />
              </button>
            </div>
            <div className="xora-card-body" style={{ padding: 0 }}>
              <div className="table-responsive">
                <table className="xora-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Angle</th>
                      <th>Status</th>
                      <th>Progress</th>
                      <th>Started</th>
                      <th style={{ textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeJobs.map((job) => (
                      <tr key={job.id}>
                        <td style={{ fontWeight: 600 }}>{job.productTitle}</td>
                        <td style={{ fontSize: '12px', color: 'var(--xora-text-secondary)' }}>{job.angleName}</td>
                        <td>
                          <StatusBadge status={job.status} />
                        </td>
                        <td style={{ width: '140px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <div style={{
                              width: '100%',
                              height: '6px',
                              backgroundColor: 'var(--xora-border-subtle)',
                              borderRadius: 'var(--radius-full)',
                              overflow: 'hidden'
                            }}>
                              <div style={{
                                width: `${job.progress}%`,
                                height: '100%',
                                backgroundColor: 'var(--xora-primary)',
                                transition: 'width 0.4s ease'
                              }} />
                            </div>
                            <span style={{ fontSize: '11px', color: 'var(--xora-text-muted)' }}>{job.progress}%</span>
                          </div>
                        </td>
                        <td style={{ fontSize: '12px', color: 'var(--xora-text-secondary)' }}>{job.createdAt}</td>
                        <td style={{ textAlign: 'right' }}>
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => onNavigate('rendering')}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activity Feed & Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Quick Operational Actions Bar */}
          <div className="xora-card">
            <div className="xora-card-header">
              <div className="xora-card-title">
                <Zap size={18} style={{ color: 'var(--xora-primary)' }} />
                Quick Actions
              </div>
              <span className="badge badge-success" style={{ fontSize: '11px' }}>
                <Coins size={11} /> {creditBalance.available.toLocaleString()} Cr
              </span>
            </div>
            <div className="xora-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button 
                className="btn btn-secondary" 
                style={{ justifyContent: 'flex-start', width: '100%' }}
                onClick={() => onNavigate('products')}
              >
                <RefreshCw size={15} /> Sync Products
              </button>
              <button 
                className="btn btn-secondary" 
                style={{ justifyContent: 'flex-start', width: '100%' }}
                onClick={() => onNavigate('creatives')}
              >
                <Sparkles size={15} /> Generate Creatives
              </button>
              <button 
                className="btn btn-secondary" 
                style={{ justifyContent: 'flex-start', width: '100%' }}
                onClick={() => onNavigate('approvals')}
              >
                <CheckSquare size={15} /> Review Approvals ({awaitingReviewCount})
              </button>
              <button 
                className="btn btn-secondary" 
                style={{ justifyContent: 'flex-start', width: '100%' }}
                onClick={() => onNavigate('rendering')}
              >
                <Cpu size={15} /> View Rendering Queue
              </button>
              <button 
                className="btn btn-secondary" 
                style={{ justifyContent: 'flex-start', width: '100%' }}
                onClick={() => {
                  if (videos.length > 0) {
                    onPreviewVideo(videos[0]);
                  }
                  onNavigate('videos');
                }}
              >
                <Film size={15} /> View Video Library
              </button>
            </div>
          </div>

          {/* Recent Activity Log Stream */}
          <div className="xora-card">
            <div className="xora-card-header">
              <div className="xora-card-title">
                <Activity size={18} style={{ color: 'var(--xora-primary)' }} />
                Recent Activity
              </div>
            </div>
            <div className="xora-card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {recentEvents.map((evt) => {
                  const EventIcon = evt.icon;
                  return (
                    <div key={evt.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: 'var(--radius-input)',
                        backgroundColor: 'var(--xora-bg-app)',
                        border: '1px solid var(--xora-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '2px',
                        color: evt.color
                      }}>
                        <EventIcon size={14} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--xora-text-primary)' }}>
                          {evt.title}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--xora-text-secondary)', marginTop: '2px' }}>
                          {evt.desc}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--xora-text-muted)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={11} /> {evt.time}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
