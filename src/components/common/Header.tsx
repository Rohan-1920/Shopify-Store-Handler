import React, { useState } from 'react';
import { 
  Sparkles, 
  Store, 
  Search, 
  Bell, 
  HelpCircle, 
  ChevronDown, 
  User, 
  Coins, 
  CheckCircle2, 
  LogOut,
  ExternalLink,
  Menu,
  Plus,
  Settings as SettingsIcon
} from 'lucide-react';
import type { StoreContext, CreditBalance, ActiveTab } from '../../types';

interface HeaderProps {
  storeContext: StoreContext;
  creditBalance: CreditBalance;
  onOpenSearch: () => void;
  onToggleNotifications: () => void;
  onOpenHelp: () => void;
  onToggleMobileMenu: () => void;
  onNavigate: (tab: ActiveTab) => void;
  unreadCount: number;
  onNavigateToLanding?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  storeContext,
  creditBalance,
  onOpenSearch,
  onToggleNotifications,
  onOpenHelp,
  onToggleMobileMenu,
  onNavigate,
  unreadCount,
  onNavigateToLanding
}) => {
  const [showStoreDropdown, setShowStoreDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showCreditDropdown, setShowCreditDropdown] = useState(false);

  return (
    <header className="topbar">
      {/* Left: Brand & Store Context */}
      <div className="header-brand">
        <button 
          className="icon-btn mobile-menu-btn" 
          onClick={onToggleMobileMenu}
          title="Open Navigation Menu"
          aria-label="Open Navigation Menu"
        >
          <Menu size={20} />
        </button>

        <div 
          className="brand-badge" 
          onClick={onNavigateToLanding}
          style={{ backgroundColor: 'var(--xora-green, #00a878)', cursor: onNavigateToLanding ? 'pointer' : 'default' }}
          title="Back to Public Landing Page"
        >
          <Sparkles size={16} style={{ marginRight: '6px' }} />
          XORA
        </div>

        <div className="topbar-divider" />

        {/* Store Selector Component */}
        <div style={{ position: 'relative' }}>
          <button 
            className="store-selector"
            onClick={() => {
              setShowStoreDropdown(!showStoreDropdown);
              setShowCreditDropdown(false);
              setShowProfileDropdown(false);
            }}
          >
            <Store size={15} style={{ color: 'var(--xora-green, #00a878)' }} />
            <span style={{ color: '#ffffff', fontWeight: 600 }}>{storeContext.storeName}</span>
            <span style={{ 
              width: '6px', 
              height: '6px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--xora-green, #00a878)',
              display: 'inline-block'
            }} />
            <ChevronDown size={14} style={{ color: 'var(--xora-header-text-muted)' }} />
          </button>

          {showStoreDropdown && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: '6px',
              width: '270px',
              backgroundColor: 'var(--xora-surface)',
              border: '1px solid var(--xora-border)',
              borderRadius: 'var(--radius-panel)',
              boxShadow: 'var(--shadow-modal)',
              zIndex: 100,
              padding: '8px',
              color: 'var(--xora-text-primary)'
            }}>
              <div style={{ padding: '6px 10px', fontSize: '11px', fontWeight: 600, color: 'var(--xora-text-muted)', textTransform: 'uppercase' }}>
                Connected Shopify Store
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '8px 10px', 
                backgroundColor: 'var(--xora-primary-light)', 
                borderRadius: 'var(--radius-input)',
                marginBottom: '6px'
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--xora-text-primary)' }}>{storeContext.storeName}</div>
                  <div style={{ fontSize: '11px', color: 'var(--xora-text-secondary)' }}>ID: {storeContext.storeId} • {storeContext.currency}</div>
                </div>
                <CheckCircle2 size={16} style={{ color: 'var(--xora-primary)' }} />
              </div>

              <a 
                href={`https://${storeContext.domain}`} 
                target="_blank" 
                rel="noreferrer"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  padding: '8px 10px', 
                  fontSize: '12.5px',
                  color: 'var(--xora-text-secondary)',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-input)'
                }}
              >
                <ExternalLink size={14} />
                Open Shopify Admin
              </a>

              <div style={{ borderTop: '1px solid var(--xora-border-subtle)', marginTop: '6px', paddingTop: '6px' }}>
                <button 
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 10px',
                    fontSize: '12.5px',
                    color: 'var(--xora-primary)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: 'var(--radius-input)',
                    fontWeight: 600
                  }}
                  onClick={() => {
                    setShowStoreDropdown(false);
                    onNavigate('settings');
                  }}
                >
                  <Plus size={14} />
                  Connect Another Store
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center: Global Search Input Field */}
      <button className="search-trigger" onClick={onOpenSearch}>
        <Search size={15} />
        <span className="search-text">Search products, creatives, or SKU...</span>
        <span className="shortcut-kbd">⌘K</span>
      </button>

      {/* Right: Credit Status Control, Notifications, Help & Profile */}
      <div className="header-actions">
        {/* Interactive Credit Status Popover */}
        <div style={{ position: 'relative' }}>
          <button 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              backgroundColor: 'rgba(0, 128, 96, 0.15)',
              border: '1px solid rgba(0, 128, 96, 0.3)',
              borderRadius: 'var(--radius-full)',
              color: '#00a47c',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onClick={() => {
              setShowCreditDropdown(!showCreditDropdown);
              setShowStoreDropdown(false);
              setShowProfileDropdown(false);
            }}
            title="View Credit Balance & Usage Capacity"
          >
            <Coins size={14} />
            <span>{creditBalance.available.toLocaleString()} credits</span>
            <span style={{ fontSize: '10px', backgroundColor: 'rgba(0, 164, 124, 0.2)', padding: '2px 6px', borderRadius: '4px', color: '#00a47c' }}>
              Healthy
            </span>
          </button>

          {showCreditDropdown && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '8px',
              width: '260px',
              backgroundColor: 'var(--xora-surface)',
              border: '1px solid var(--xora-border)',
              borderRadius: 'var(--radius-panel)',
              boxShadow: 'var(--shadow-modal)',
              zIndex: 100,
              padding: '14px',
              color: 'var(--xora-text-primary)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--xora-text-muted)', textTransform: 'uppercase' }}>
                  Credit Status
                </span>
                <span className="badge badge-success">Active Plan</span>
              </div>

              <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--xora-text-primary)', marginBottom: '2px' }}>
                {creditBalance.available.toLocaleString()}
                <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--xora-text-secondary)', marginLeft: '4px' }}>
                  / {creditBalance.total.toLocaleString()} credits
                </span>
              </div>

              <p style={{ fontSize: '12px', color: 'var(--xora-text-secondary)', marginBottom: '12px' }}>
                Capacity for ~{Math.floor(creditBalance.available / 15)} high-definition 9:16 videos @ 15 credits/render.
              </p>

              <div style={{
                padding: '8px 10px',
                backgroundColor: 'var(--xora-bg-app)',
                borderRadius: 'var(--radius-input)',
                fontSize: '11.5px',
                color: 'var(--xora-text-secondary)',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span>Plan Renewal:</span>
                <strong style={{ color: 'var(--xora-text-primary)' }}>{creditBalance.renewsOn}</strong>
              </div>

              <button 
                className="btn btn-primary btn-sm"
                style={{ width: '100%' }}
                onClick={() => {
                  setShowCreditDropdown(false);
                  onNavigate('settings');
                }}
              >
                Manage Plan & Credits
              </button>
            </div>
          )}
        </div>

        {/* Notifications */}
        <button 
          className="icon-btn" 
          onClick={onToggleNotifications}
          title="Notifications"
          aria-label="View notifications"
        >
          <Bell size={18} />
          {unreadCount > 0 && <span className="icon-badge" />}
        </button>

        {/* Help */}
        <button 
          className="icon-btn" 
          onClick={onOpenHelp}
          title="Merchant Documentation & Support"
          aria-label="Open documentation and support"
        >
          <HelpCircle size={18} />
        </button>

        <div style={{ height: '20px', width: '1px', backgroundColor: 'var(--xora-header-border)', margin: '0 4px' }} />

        {/* User Profile */}
        <div style={{ position: 'relative' }}>
          <button 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              color: 'var(--xora-header-text)',
              cursor: 'pointer',
              padding: '2px'
            }}
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          >
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'var(--xora-primary)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: '12px'
            }}>
              JD
            </div>
            <span style={{ fontSize: '13px', fontWeight: 500 }} className="profile-name">John Doe</span>
            <ChevronDown size={13} style={{ color: 'var(--xora-header-text-muted)' }} />
          </button>

          {showProfileDropdown && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '8px',
              width: '220px',
              backgroundColor: 'var(--xora-surface)',
              border: '1px solid var(--xora-border)',
              borderRadius: 'var(--radius-panel)',
              boxShadow: 'var(--shadow-modal)',
              zIndex: 100,
              padding: '6px',
              color: 'var(--xora-text-primary)'
            }}>
              <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--xora-border-subtle)' }}>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>John Doe</div>
                <div style={{ fontSize: '11px', color: 'var(--xora-text-secondary)' }}>Shopify Store Owner</div>
              </div>
              <div style={{ padding: '4px 0' }}>
                <div 
                  style={{ padding: '8px 10px', fontSize: '12.5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: 'var(--radius-input)' }}
                  onClick={() => {
                    setShowProfileDropdown(false);
                    onNavigate('settings');
                  }}
                >
                  <User size={14} /> Account Details
                </div>
                <div 
                  style={{ padding: '8px 10px', fontSize: '12.5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: 'var(--radius-input)' }}
                  onClick={() => {
                    setShowProfileDropdown(false);
                    onNavigate('settings');
                  }}
                >
                  <SettingsIcon size={14} /> Platform Settings
                </div>
                <div style={{ borderTop: '1px solid var(--xora-border-subtle)', margin: '4px 0' }} />
                <div 
                  style={{ padding: '8px 10px', fontSize: '12.5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--xora-critical)', borderRadius: 'var(--radius-input)' }}
                  onClick={() => {
                    setShowProfileDropdown(false);
                    alert('Signed out of XORA platform session.');
                  }}
                >
                  <LogOut size={14} /> Log Out
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
