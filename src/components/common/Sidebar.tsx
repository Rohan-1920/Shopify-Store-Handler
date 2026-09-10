import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Wand2, 
  CheckSquare, 
  Cpu, 
  Video, 
  BarChart3, 
  Settings,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import type { ActiveTab, StoreContext } from '../../types';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  pendingApprovalsCount: number;
  activeRenderCount: number;
  videosCount: number;
  storeContext: StoreContext;
  onSyncCatalog: () => void;
  isSyncing: boolean;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  pendingApprovalsCount,
  activeRenderCount,
  videosCount,
  storeContext,
  onSyncCatalog,
  isSyncing,
  isMobileDrawer = false,
  onCloseMobileDrawer
}) => {
  // Collapsed preference persisted in localStorage
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('xora_sidebar_collapsed');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('xora_sidebar_collapsed', JSON.stringify(next));
      } catch (err) {
        console.error('Failed to save sidebar collapse state', err);
      }
      return next;
    });
  };

  const navGroups = [
    {
      groupLabel: 'CORE',
      items: [
        { id: 'dashboard' as ActiveTab, label: 'Dashboard', icon: LayoutDashboard },
        { id: 'products' as ActiveTab, label: 'Products', icon: ShoppingBag, counter: storeContext.syncedProductsCount },
        { id: 'creatives' as ActiveTab, label: 'Creative Studio', icon: Wand2 },
      ]
    },
    {
      groupLabel: 'WORKFLOW',
      items: [
        { id: 'approvals' as ActiveTab, label: 'Approvals', icon: CheckSquare, counter: pendingApprovalsCount, highlight: pendingApprovalsCount > 0 },
        { id: 'rendering' as ActiveTab, label: 'Rendering', icon: Cpu, counter: activeRenderCount, highlight: activeRenderCount > 0 },
        { id: 'videos' as ActiveTab, label: 'Video Library', icon: Video, counter: videosCount },
      ]
    },
    {
      groupLabel: 'INSIGHTS',
      items: [
        { id: 'analytics' as ActiveTab, label: 'Analytics', icon: BarChart3 },
      ]
    },
    {
      groupLabel: 'CONFIGURATION',
      items: [
        { id: 'settings' as ActiveTab, label: 'Settings', icon: Settings },
      ]
    }
  ];

  const collapsedMode = isCollapsed && !isMobileDrawer;

  return (
    <aside 
      className={`sidebar ${collapsedMode ? 'collapsed' : ''} ${isMobileDrawer ? 'mobile-drawer' : ''}`}
      style={{ position: 'relative' }}
    >
      {/* Sidebar Edge Boundary Collapse Toggle (Desktop) */}
      {!isMobileDrawer && (
        <button 
          className="sidebar-edge-toggle"
          onClick={toggleCollapse}
          title={isCollapsed ? 'Expand Sidebar (Ctrl+B)' : 'Collapse Sidebar (Ctrl+B)'}
          aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      )}

      {/* Mobile Drawer Header */}
      {isMobileDrawer && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--xora-border)', marginBottom: '12px' }}>
          <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--xora-text-primary)' }}>XORA Operations</div>
          <button className="icon-btn" onClick={onCloseMobileDrawer} aria-label="Close Navigation Drawer">
            <X size={18} />
          </button>
        </div>
      )}

      {/* Navigation Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
        {navGroups.map((group) => (
          <div key={group.groupLabel} className="nav-section">
            {!collapsedMode && (
              <div className="nav-label" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.6px', color: 'var(--xora-text-muted)', marginBottom: '6px', paddingLeft: '8px' }}>
                {group.groupLabel}
              </div>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <a
                  key={item.id}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  title={collapsedMode ? item.label : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTab(item.id);
                    if (isMobileDrawer && onCloseMobileDrawer) {
                      onCloseMobileDrawer();
                    }
                  }}
                  href={`#${item.id}`}
                >
                  <Icon size={18} className="nav-icon" />
                  {!collapsedMode && <span className="nav-text">{item.label}</span>}
                  {!collapsedMode && typeof item.counter === 'number' && (
                    <span 
                      className="nav-counter"
                      style={('highlight' in item && item.highlight) ? { backgroundColor: 'var(--xora-primary)', color: 'white' } : {}}
                    >
                      {item.counter}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer: Store Sync Status Card */}
      <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
        {!collapsedMode ? (
          <div style={{
            padding: '12px',
            backgroundColor: 'var(--xora-bg-app)',
            borderRadius: 'var(--radius-input)',
            border: '1px solid var(--xora-border)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--xora-text-primary)' }}>
                <CheckCircle2 size={14} style={{ color: 'var(--xora-primary)' }} />
                Shopify Catalog
              </div>
              <span style={{ fontSize: '11px', color: 'var(--xora-text-secondary)' }}>{storeContext.lastSync}</span>
            </div>

            <button 
              className="btn btn-secondary btn-sm"
              style={{ width: '100%' }}
              onClick={onSyncCatalog}
              disabled={isSyncing}
            >
              {isSyncing ? 'Syncing...' : 'Sync Catalog'}
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <button 
              className="icon-btn"
              onClick={onSyncCatalog}
              disabled={isSyncing}
              title={`Shopify Catalog (Synced ${storeContext.lastSync})`}
              style={{ width: '36px', height: '36px', borderRadius: '50%', margin: '0 auto' }}
            >
              <CheckCircle2 size={18} style={{ color: 'var(--xora-primary)' }} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
