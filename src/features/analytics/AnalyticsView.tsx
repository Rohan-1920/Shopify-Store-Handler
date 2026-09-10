import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  ShoppingBag, 
  Video, 
  Cpu, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  AlertCircle, 
  Layers, 
  FileText, 
  CheckSquare, 
  AlertTriangle, 
  Lock,
  Zap,
  Activity,
  ArrowRight
} from 'lucide-react';
import type { VideoAsset, StoreContext, RenderJob } from '../../types';

interface AnalyticsViewProps {
  videos: VideoAsset[];
  renderJobs?: RenderJob[];
  storeContext: StoreContext;
  onNavigateToStudio?: () => void;
  onNavigateToRendering?: () => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  videos: _videos,
  renderJobs: _renderJobs = [],
  storeContext,
  onNavigateToStudio,
  onNavigateToRendering
}) => {
  // Interactive Simulation States for Empty and Error views
  const [isLoading, setIsLoading] = useState(false);
  const [isEmptyState, setIsEmptyState] = useState(false);
  const [isSimulatedError, setIsSimulatedError] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | 'all'>('7d');

  // Pipeline Production Metrics
  const productsProcessed = 148;
  const creativesGenerated = 444; // 3 angles per product
  const creativesApproved = 300;
  const videosRendered = 212;
  const successRate = '98.6%';
  const avgRenderTime = '42s';

  // Angle Breakdown Data
  const angleMetrics = [
    {
      name: 'Product-Led',
      description: 'Feature spotlight & product close-up showcase',
      generated: 148,
      approved: 104,
      rendered: 74,
      approvalRate: '70.2%',
      color: 'var(--xora-primary)'
    },
    {
      name: 'Benefit-Led',
      description: 'Value proposition & problem-solver storytelling',
      generated: 148,
      approved: 102,
      rendered: 76,
      approvalRate: '68.9%',
      color: 'var(--xora-info)'
    },
    {
      name: 'Offer-Led',
      description: 'Flash promo, discount & limited time urgency',
      generated: 148,
      approved: 94,
      rendered: 62,
      approvalRate: '63.5%',
      color: '#8A6100'
    }
  ];

  // Daily Production Batch Logs
  const recentBatches = [
    { date: 'Sep 10, 2026', products: 28, creatives: 84, approved: 58, rendered: 42, failed: 0 },
    { date: 'Sep 09, 2026', products: 30, creatives: 90, approved: 62, rendered: 44, failed: 1 },
    { date: 'Sep 08, 2026', products: 30, creatives: 90, approved: 60, rendered: 42, failed: 1 },
    { date: 'Sep 07, 2026', products: 30, creatives: 90, approved: 60, rendered: 42, failed: 1 },
    { date: 'Sep 06, 2026', products: 30, creatives: 90, approved: 60, rendered: 42, failed: 0 }
  ];

  // 7-Day Bar Chart Data
  const dailyChartData = [
    { day: 'Mon', generated: 60, approved: 40, rendered: 30 },
    { day: 'Tue', generated: 90, approved: 60, rendered: 42 },
    { day: 'Wed', generated: 90, approved: 60, rendered: 42 },
    { day: 'Thu', generated: 90, approved: 62, rendered: 44 },
    { day: 'Fri', generated: 84, approved: 58, rendered: 42 },
    { day: 'Sat', generated: 30, approved: 20, rendered: 12 },
    { day: 'Sun', generated: 0, approved: 0, rendered: 0 }
  ];

  // SKELETON LOADING STATE VIEW
  if (isLoading) {
    return (
      <div className="analytics-page">
        <div className="page-header" style={{ marginBottom: '20px' }}>
          <div>
            <div className="skeleton" style={{ width: '180px', height: '28px', marginBottom: '8px' }} />
            <div className="skeleton" style={{ width: '360px', height: '16px' }} />
          </div>
        </div>
        <div className="grid-3" style={{ marginBottom: '20px' }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="xora-card" style={{ padding: '16px' }}>
              <div className="skeleton" style={{ width: '120px', height: '14px', marginBottom: '8px' }} />
              <div className="skeleton" style={{ width: '80px', height: '32px' }} />
            </div>
          ))}
        </div>
        <div className="xora-card" style={{ padding: '20px' }}>
          <div className="skeleton" style={{ width: '100%', height: '260px' }} />
        </div>
      </div>
    );
  }

  // ERROR STATE VIEW
  if (isSimulatedError) {
    return (
      <div className="analytics-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">Analytics</h1>
            <p className="page-subtitle">Understand the performance of your creative production pipeline.</p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => setIsSimulatedError(false)}>
            <RotateCcw size={14} /> Clear Error State
          </button>
        </div>

        <div className="xora-card" style={{ padding: '48px 24px', textAlign: 'center', margin: '40px auto', maxWidth: '580px' }}>
          <AlertCircle size={48} style={{ color: 'var(--xora-critical)', margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: 'var(--xora-text-primary)' }}>
            Unable to load production analytics. Please try again.
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--xora-text-secondary)', marginBottom: '24px' }}>
            We encountered a connection issue fetching pipeline throughput statistics.
          </p>
          <button className="btn btn-primary" onClick={() => setIsSimulatedError(false)}>
            <RotateCcw size={16} /> Retry
          </button>
        </div>
      </div>
    );
  }

  // EMPTY STATE VIEW
  if (isEmptyState) {
    return (
      <div className="analytics-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">Analytics</h1>
            <p className="page-subtitle">Understand the performance of your creative production pipeline.</p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => setIsEmptyState(false)}>
            <RotateCcw size={14} /> Load Demo Pipeline Data
          </button>
        </div>

        <div className="xora-card" style={{ padding: '60px 24px', textAlign: 'center', margin: '24px 0' }}>
          <Activity size={48} style={{ color: 'var(--xora-text-muted)', margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: 'var(--xora-text-primary)' }}>
            No analytics data yet.
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--xora-text-secondary)', maxWidth: '440px', margin: '0 auto 24px' }}>
            Analytics will appear as your creative production pipeline processes products.
          </p>
          {onNavigateToStudio && (
            <button className="btn btn-primary" onClick={onNavigateToStudio}>
              <Zap size={16} /> Open Creative Studio
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-page">
      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Analytics</h1>
          <p className="page-subtitle">
            Understand the performance of your creative production pipeline across <strong>{storeContext.storeName}</strong>.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div className="filter-tabs" style={{ display: 'flex', gap: '4px' }}>
            {(['7d', '30d', 'all'] as const).map((time) => (
              <button
                key={time}
                className={`filter-tab ${selectedTimeframe === time ? 'active' : ''}`}
                onClick={() => setSelectedTimeframe(time)}
                style={{ padding: '4px 10px', fontSize: '12px' }}
              >
                {time === '7d' ? 'Last 7 Days' : time === '30d' ? 'Last 30 Days' : 'All Time'}
              </button>
            ))}
          </div>

          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 1500);
            }}
            title="Test skeleton loading state"
          >
            Test Loading
          </button>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setIsEmptyState(true)}
            title="Test empty state view"
          >
            Test Empty State
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

      {/* TOP 6 KPI CARDS GRID */}
      <div className="grid-6 analytics-kpi-grid" style={{ marginBottom: '24px' }}>
        <div className="kpi-card">
          <div className="kpi-header">
            <span>Products Processed</span>
            <ShoppingBag size={18} style={{ color: 'var(--xora-primary)' }} />
          </div>
          <div className="kpi-value">{productsProcessed}</div>
          <div className="kpi-footer">
            <span>Catalog catalog sync</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span>Creatives Generated</span>
            <FileText size={18} style={{ color: 'var(--xora-info)' }} />
          </div>
          <div className="kpi-value">{creativesGenerated}</div>
          <div className="kpi-footer">
            <span>3 angles / product</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span>Creatives Approved</span>
            <CheckSquare size={18} style={{ color: 'var(--xora-success)' }} />
          </div>
          <div className="kpi-value" style={{ color: 'var(--xora-success)' }}>{creativesApproved}</div>
          <div className="kpi-footer">
            <span className="kpi-trend-up">67.6% approval rate</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span>Videos Rendered</span>
            <Video size={18} style={{ color: 'var(--xora-primary)' }} />
          </div>
          <div className="kpi-value">{videosRendered}</div>
          <div className="kpi-footer">
            <span>MP4 vertical files</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span>Success Rate</span>
            <CheckCircle2 size={18} style={{ color: 'var(--xora-success)' }} />
          </div>
          <div className="kpi-value" style={{ color: 'var(--xora-success)' }}>{successRate}</div>
          <div className="kpi-footer">
            <span>212 / 215 completed</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span>Avg Render Time</span>
            <Clock size={18} style={{ color: 'var(--xora-warning-text)' }} />
          </div>
          <div className="kpi-value">{avgRenderTime}</div>
          <div className="kpi-footer">
            <span>GPU node cluster</span>
          </div>
        </div>
      </div>

      {/* PIPELINE PERFORMANCE CHARTS & RENDERING SUMMARY */}
      <div className="grid-3" style={{ marginBottom: '24px', alignItems: 'stretch' }}>
        {/* Pipeline Production Volume Chart (2 Columns) */}
        <div className="xora-card" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
          <div className="xora-card-header" style={{ justifyContent: 'space-between' }}>
            <div className="xora-card-title">
              <BarChart3 size={18} style={{ color: 'var(--xora-primary)' }} />
              Pipeline Production Volume
            </div>
            <div style={{ display: 'flex', gap: '14px', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: 'var(--xora-info)' }} />
                <span>Generated</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: 'var(--xora-primary)' }} />
                <span>Approved</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: 'var(--xora-success)' }} />
                <span>Rendered</span>
              </div>
            </div>
          </div>

          <div className="xora-card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingTop: '20px' }}>
            {/* Clean Professional Bar Chart */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '200px', gap: '12px', paddingBottom: '8px', borderBottom: '1px solid var(--xora-border-subtle)' }}>
              {dailyChartData.map((item, index) => {
                const genHeight = Math.round((item.generated / 100) * 160);
                const appHeight = Math.round((item.approved / 100) * 160);
                const renHeight = Math.round((item.rendered / 100) * 160);

                return (
                  <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', width: '100%', justifyContent: 'center' }}>
                      <div 
                        style={{ height: `${genHeight}px`, width: '28%', backgroundColor: 'var(--xora-info)', borderRadius: '3px 3px 0 0' }}
                        title={`${item.day}: ${item.generated} Generated`} 
                      />
                      <div 
                        style={{ height: `${appHeight}px`, width: '28%', backgroundColor: 'var(--xora-primary)', borderRadius: '3px 3px 0 0' }}
                        title={`${item.day}: ${item.approved} Approved`} 
                      />
                      <div 
                        style={{ height: `${renHeight}px`, width: '28%', backgroundColor: 'var(--xora-success)', borderRadius: '3px 3px 0 0' }}
                        title={`${item.day}: ${item.rendered} Rendered`} 
                      />
                    </div>
                    <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--xora-text-secondary)' }}>
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Total Pipeline Stage Funnel Summary */}
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '16px', paddingTop: '12px', borderTop: '1px dashed var(--xora-border-subtle)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: 'var(--xora-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Generated</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--xora-info)' }}>{creativesGenerated}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: 'var(--xora-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Approved</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--xora-primary)' }}>{creativesApproved}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: 'var(--xora-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Rendered MP4s</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--xora-success)' }}>{videosRendered}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Rendering Performance Operational Box (1 Column) */}
        <div className="xora-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="xora-card-header">
            <div className="xora-card-title">
              <Cpu size={18} style={{ color: 'var(--xora-primary)' }} />
              Rendering Performance
            </div>
          </div>
          <div className="xora-card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--xora-border-subtle)' }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--xora-text-secondary)' }}>Success Rate</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--xora-success)' }}>98.6%</div>
                </div>
                <CheckCircle2 size={24} style={{ color: 'var(--xora-success)' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--xora-border-subtle)' }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--xora-text-secondary)' }}>Failure Rate</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--xora-critical)' }}>1.4% (3 jobs)</div>
                </div>
                <XCircle size={24} style={{ color: 'var(--xora-critical)' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--xora-border-subtle)' }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--xora-text-secondary)' }}>Average Render Time</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--xora-text-primary)' }}>42 seconds</div>
                </div>
                <Clock size={24} style={{ color: 'var(--xora-warning-text)' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--xora-text-secondary)' }}>Queued Jobs</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--xora-primary)' }}>24 jobs</div>
                </div>
                <Layers size={24} style={{ color: 'var(--xora-primary)' }} />
              </div>
            </div>

            {onNavigateToRendering && (
              <button className="btn btn-secondary btn-sm" style={{ marginTop: '20px', width: '100%' }} onClick={onNavigateToRendering}>
                Open Rendering Visibility Page <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ANGLE BREAKDOWN */}
      <div className="xora-card" style={{ marginBottom: '24px' }}>
        <div className="xora-card-header">
          <div className="xora-card-title">
            <Layers size={18} style={{ color: 'var(--xora-primary)' }} />
            Creative Angle Breakdown
          </div>
        </div>
        <div className="xora-card-body">
          <div className="grid-3">
            {angleMetrics.map((angle) => (
              <div 
                key={angle.name}
                style={{
                  padding: '20px',
                  border: '1px solid var(--xora-border)',
                  borderRadius: 'var(--radius-card)',
                  backgroundColor: 'var(--xora-surface)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--xora-text-primary)' }}>
                    {angle.name}
                  </h3>
                  <span className="badge badge-neutral" style={{ fontSize: '11px', fontWeight: 600 }}>
                    {angle.approvalRate} Approved
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--xora-text-secondary)', marginBottom: '16px', height: '32px' }}>
                  {angle.description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                    <span style={{ color: 'var(--xora-text-secondary)' }}>Creatives Generated</span>
                    <strong style={{ color: 'var(--xora-text-primary)' }}>{angle.generated}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                    <span style={{ color: 'var(--xora-text-secondary)' }}>Approved Scripts</span>
                    <strong style={{ color: 'var(--xora-primary)' }}>{angle.approved}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                    <span style={{ color: 'var(--xora-text-secondary)' }}>Rendered MP4s</span>
                    <strong style={{ color: 'var(--xora-success)' }}>{angle.rendered}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RECENT PRODUCTION LOG TABLE */}
      <div className="xora-card" style={{ marginBottom: '24px' }}>
        <div className="xora-card-header">
          <div className="xora-card-title">
            <Activity size={18} style={{ color: 'var(--xora-primary)' }} />
            Recent Production Batches
          </div>
        </div>
        <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
          <table className="xora-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Products</th>
                <th>Creatives</th>
                <th>Approved</th>
                <th>Rendered</th>
                <th>Failed</th>
              </tr>
            </thead>
            <tbody>
              {recentBatches.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600, color: 'var(--xora-text-primary)' }}>{row.date}</td>
                  <td>{row.products}</td>
                  <td>{row.creatives}</td>
                  <td style={{ color: 'var(--xora-primary)', fontWeight: 600 }}>{row.approved}</td>
                  <td style={{ color: 'var(--xora-success)', fontWeight: 600 }}>{row.rendered}</td>
                  <td>
                    {row.failed > 0 ? (
                      <span style={{ color: 'var(--xora-critical)', fontWeight: 700 }}>{row.failed}</span>
                    ) : (
                      <span style={{ color: 'var(--xora-text-muted)' }}>0</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FUTURE SCOPE ROADMAP BANNER (NO FABRICATED AD METRICS) */}
      <div className="xora-card" style={{
        backgroundColor: '#FAFAFD',
        border: '1px solid var(--xora-primary-border)',
        borderRadius: 'var(--radius-card)',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--xora-primary-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Lock size={20} style={{ color: 'var(--xora-primary)' }} />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--xora-text-primary)' }}>
                Future Integration Scope — Paid Media & ROAS Analytics
              </h3>
              <span className="badge badge-info" style={{ fontSize: '11px', fontWeight: 600 }}>
                Roadmap Integration
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--xora-text-secondary)', marginBottom: '14px', lineHeight: 1.5 }}>
              XORA MVP focuses strictly on operational creative production throughput. Paid media performance tracking (ROAS, CTR, ad spend, and cohort conversion attribution) will unlock when connecting official ad manager endpoints.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--xora-text-secondary)' }}>
                <TrendingUp size={14} style={{ color: 'var(--xora-primary)' }} />
                <span>Meta Ads Manager API Sync</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--xora-text-secondary)' }}>
                <Video size={14} style={{ color: 'var(--xora-info)' }} />
                <span>TikTok Commercial Ads Attribution</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--xora-text-secondary)' }}>
                <ShoppingBag size={14} style={{ color: 'var(--xora-success)' }} />
                <span>Shopify Checkout Conversion Pixel</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
