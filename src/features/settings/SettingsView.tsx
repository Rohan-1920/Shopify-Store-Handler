import React, { useState } from 'react';
import { 
  Store, 
  Sparkles, 
  Wand2, 
  Video, 
  Bell, 
  Users, 
  AlertTriangle, 
  Save, 
  RefreshCw, 
  Lock, 
  ShieldAlert, 
  Trash2, 
  Unlink, 
  XCircle, 
  X
} from 'lucide-react';
import type { StoreContext, CreditBalance } from '../../types';

interface SettingsViewProps {
  storeContext: StoreContext;
  creditBalance: CreditBalance;
  onSaveSettings: (sectionName: string) => void;
  onSyncCatalog: () => void;
  isSyncing: boolean;
  onDisconnectStore?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  storeContext,
  creditBalance: _creditBalance,
  onSaveSettings,
  onSyncCatalog,
  isSyncing,
  onDisconnectStore
}) => {
  // Active Section Tab State (store | brand | ai | templates | notifications | team | danger)
  const [activeSection, setActiveSection] = useState<'store' | 'brand' | 'ai' | 'templates' | 'notifications' | 'team' | 'danger'>('store');

  // Save States
  const [isSaving, setIsSaving] = useState(false);
  const [isSaveError, setIsSaveError] = useState(false);

  // Modal Confirmation States
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [typedDisconnectConfirm, setTypedDisconnectConfirm] = useState('');
  const [typedDeleteConfirm, setTypedDeleteConfirm] = useState('');
  const [hasConfirmedDeleteCheckbox, setHasConfirmedDeleteCheckbox] = useState(false);

  // Form State Values (Preserved on failure)
  // Brand State
  const [brandName, setBrandName] = useState(storeContext.storeName || 'Aura & Co. Apparel');
  const [brandLogo, setBrandLogo] = useState('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=300&q=80');
  const [primaryColor, setPrimaryColor] = useState('#008060');
  const [secondaryColor, setSecondaryColor] = useState('#1A1A1A');
  const [ctaStyle, setCtaStyle] = useState('Solid High-Contrast');
  const [brandVoice, setBrandVoice] = useState('Bold, Premium & Direct');

  // AI Preferences State
  const [aiTone, setAiTone] = useState('Benefit-Focused & Educational');
  const [writingStyle, setWritingStyle] = useState('Punchy Short Sentences & Hook-First');
  const [defaultCta, setDefaultCta] = useState('Shop Now & Save 20%');
  const [language, setLanguage] = useState('English (US)');
  const [claimBehavior, setClaimBehavior] = useState('Strict Safety (Flag unverified claims)');
  const [offerBehavior, setOfferBehavior] = useState('Always Highlight Discount %');
  const [creativityLevel, setCreativityLevel] = useState('0.7 (Balanced)');

  // Video Templates State
  const [defaultTemplate, setDefaultTemplate] = useState('TikTok UGC Split-Screen');
  const [aspectRatio, setAspectRatio] = useState('9:16 vertical (1080x1920)');
  const [brandingPlacement, setBrandingPlacement] = useState('Top-Left Badge');
  const [logoPosition, setLogoPosition] = useState('Top Left');
  const [textStyle, setTextStyle] = useState('Modern Sans Bold (Inter)');
  const [ctaPlacement, setCtaPlacement] = useState('Persistent Bottom Banner');

  // Notifications Toggle Switches State
  const [notifRenderingComplete, setNotifRenderingComplete] = useState(true);
  const [notifRenderingFailed, setNotifRenderingFailed] = useState(true);
  const [notifApprovalRequired, setNotifApprovalRequired] = useState(true);
  const [notifSyncCompleted, setNotifSyncCompleted] = useState(false);
  const [notifCreditWarning, setNotifCreditWarning] = useState(true);

  // Handle Save with Loading and Error simulation
  const handleSave = (sectionLabel: string) => {
    setIsSaving(true);
    setIsSaveError(false);

    setTimeout(() => {
      setIsSaving(false);
      onSaveSettings(`${sectionLabel} settings saved.`);
    }, 800);
  };

  const handleSimulateSaveError = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaveError(true);
    }, 600);
  };

  const sectionsNav: Array<{
    id: 'store' | 'brand' | 'ai' | 'templates' | 'notifications' | 'team' | 'danger';
    label: string;
    icon: any;
    isDanger?: boolean;
  }> = [
    { id: 'store', label: 'Store Connection', icon: Store },
    { id: 'brand', label: 'Brand Identity', icon: Sparkles },
    { id: 'ai', label: 'AI Preferences', icon: Wand2 },
    { id: 'templates', label: 'Video Templates', icon: Video },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'team', label: 'Team / Account', icon: Users },
    { id: 'danger', label: 'Danger Zone', icon: AlertTriangle, isDanger: true }
  ];

  return (
    <div className="settings-page">
      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">
            Manage your Shopify integration, brand identity, AI generation rules, and notifications.
          </p>
        </div>

        {/* Global Save Button (Top Right) */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={handleSimulateSaveError}
            title="Test save error state handling"
          >
            Test Save Error
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => handleSave(activeSection.toUpperCase())}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <RefreshCw size={16} className="spin" /> Saving...
              </>
            ) : (
              <>
                <Save size={16} /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* SAVE ERROR ALERT BANNER (Preserving edits) */}
      {isSaveError && (
        <div className="xora-card" style={{
          marginBottom: '20px',
          backgroundColor: 'var(--xora-critical-light)',
          border: '1px solid #F5C2C0',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'var(--xora-critical)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', fontWeight: 600 }}>
            <XCircle size={18} />
            <span>Unable to save changes. Please try again. Your edits have been preserved.</span>
          </div>
          <button 
            onClick={() => setIsSaveError(false)}
            style={{ background: 'none', border: 'none', color: 'var(--xora-critical)', cursor: 'pointer' }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* SHARED SETTINGS SHELL GRID (LEFT SUBNAV, RIGHT ACTIVE PANEL) */}
      <div className="settings-shell-grid" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '24px' }}>
        
        {/* LEFT SUB-NAVIGATION */}
        <div className="settings-subnav-wrapper">
          <div className="xora-card" style={{ padding: '8px 0' }}>
            {sectionsNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id as any);
                    setIsSaveError(false);
                  }}
                  className={`settings-nav-item ${isActive ? 'active' : ''} ${item.isDanger ? 'danger-item' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '10px 16px',
                    border: 'none',
                    borderLeft: isActive ? `3px solid ${item.isDanger ? 'var(--xora-critical)' : 'var(--xora-primary)'}` : '3px solid transparent',
                    backgroundColor: isActive ? (item.isDanger ? 'var(--xora-critical-light)' : 'var(--xora-surface-hover)') : 'transparent',
                    color: item.isDanger ? (isActive ? 'var(--xora-critical)' : 'var(--xora-critical)') : (isActive ? 'var(--xora-primary)' : 'var(--xora-text-primary)'),
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '13.5px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Icon size={16} style={{ color: item.isDanger ? 'var(--xora-critical)' : (isActive ? 'var(--xora-primary)' : 'var(--xora-text-secondary)') }} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT ACTIVE SETTINGS PANEL */}
        <div className="settings-panel-wrapper">
          
          {/* PANEL 1: STORE */}
          {activeSection === 'store' && (
            <div className="xora-card">
              <div className="xora-card-header" style={{ justifyContent: 'space-between' }}>
                <div className="xora-card-title">
                  <Store size={18} style={{ color: 'var(--xora-primary)' }} />
                  Shopify Store Connection
                </div>
                <span className="badge badge-success">Connected</span>
              </div>
              <div className="xora-card-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">Shopify Store Name</label>
                    <input type="text" className="xora-input" value={storeContext.storeName} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">myshopify.com Domain</label>
                    <input type="text" className="xora-input" value={storeContext.domain} readOnly />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                  <div className="form-group">
                    <label className="form-label">Store Identifier</label>
                    <input type="text" className="xora-input" value={storeContext.storeId} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Catalog Sync</label>
                    <input type="text" className="xora-input" value={storeContext.lastSync} readOnly />
                  </div>
                </div>

                <div style={{ paddingTop: '20px', borderTop: '1px solid var(--xora-border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--xora-text-primary)' }}>Sync Product Catalog</div>
                    <div style={{ fontSize: '12px', color: 'var(--xora-text-secondary)' }}>Refresh products, variants, prices, and high-res media from Shopify.</div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn btn-secondary" onClick={onSyncCatalog} disabled={isSyncing}>
                      {isSyncing ? <RefreshCw size={14} className="spin" /> : <RefreshCw size={14} />}
                      {isSyncing ? 'Syncing Catalog...' : 'Sync Now'}
                    </button>
                    <button className="btn btn-destructive btn-sm" onClick={() => setShowDisconnectModal(true)}>
                      <Unlink size={14} /> Disconnect Store
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PANEL 2: BRAND */}
          {activeSection === 'brand' && (
            <div className="xora-card">
              <div className="xora-card-header">
                <div className="xora-card-title">
                  <Sparkles size={18} style={{ color: 'var(--xora-primary)' }} />
                  Brand Identity & Style System
                </div>
              </div>
              <div className="xora-card-body">
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label className="form-label">Brand Name</label>
                  <input 
                    type="text" 
                    className="xora-input"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label className="form-label">Brand Logo Asset URL</label>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <img src={brandLogo} alt="Logo Preview" style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover', border: '1px solid var(--xora-border)' }} />
                    <input 
                      type="text" 
                      className="xora-input"
                      value={brandLogo}
                      onChange={(e) => setBrandLogo(e.target.value)}
                      style={{ flex: 1 }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Primary Brand Color</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} style={{ width: '36px', height: '36px', border: 'none', cursor: 'pointer' }} />
                      <input type="text" className="xora-input" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Secondary Color</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} style={{ width: '36px', height: '36px', border: 'none', cursor: 'pointer' }} />
                      <input type="text" className="xora-input" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">CTA Button Visual Style</label>
                    <select className="xora-select" value={ctaStyle} onChange={(e) => setCtaStyle(e.target.value)}>
                      <option value="Solid High-Contrast">Solid High-Contrast</option>
                      <option value="Pill Button">Pill Button (Rounded)</option>
                      <option value="Outline Minimal">Outline Minimal</option>
                      <option value="Gradient Glow">Gradient Glow</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Brand Voice Guidelines</label>
                    <select className="xora-select" value={brandVoice} onChange={(e) => setBrandVoice(e.target.value)}>
                      <option value="Bold, Premium & Direct">Bold, Premium & Direct</option>
                      <option value="Conversational & Playful">Conversational & Playful</option>
                      <option value="Authoritative & Science-Backed">Authoritative & Science-Backed</option>
                      <option value="High-Energy Promotional">High-Energy Promotional</option>
                    </select>
                  </div>
                </div>

                <button className="btn btn-primary" onClick={() => handleSave('Brand')}>
                  <Save size={14} /> Save Brand Settings
                </button>
              </div>
            </div>
          )}

          {/* PANEL 3: AI PREFERENCES */}
          {activeSection === 'ai' && (
            <div className="xora-card">
              <div className="xora-card-header">
                <div className="xora-card-title">
                  <Wand2 size={18} style={{ color: 'var(--xora-primary)' }} />
                  AI Generation & Copywriting Preferences
                </div>
              </div>
              <div className="xora-card-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Marketing Tone</label>
                    <select className="xora-select" value={aiTone} onChange={(e) => setAiTone(e.target.value)}>
                      <option value="Benefit-Focused & Educational">Benefit-Focused & Educational</option>
                      <option value="Urgent & Promotional">Urgent & Promotional</option>
                      <option value="Relatable UGC Aesthetic">Relatable UGC Aesthetic</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Writing Style</label>
                    <select className="xora-select" value={writingStyle} onChange={(e) => setWritingStyle(e.target.value)}>
                      <option value="Punchy Short Sentences & Hook-First">Punchy Short Sentences & Hook-First</option>
                      <option value="Storytelling & Narrative Driven">Storytelling & Narrative Driven</option>
                      <option value="Feature-Benefit Bullets">Feature-Benefit Bullets</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Default Call-To-Action</label>
                    <input type="text" className="xora-input" value={defaultCta} onChange={(e) => setDefaultCta(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Target Generation Language</label>
                    <select className="xora-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                      <option value="English (US)">English (US)</option>
                      <option value="English (UK)">English (UK)</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Claim Safety Guardrails</label>
                    <select className="xora-select" value={claimBehavior} onChange={(e) => setClaimBehavior(e.target.value)}>
                      <option value="Strict Safety (Flag unverified claims)">Strict Safety (Flag unverified claims)</option>
                      <option value="Moderate Guardrails">Moderate Guardrails</option>
                      <option value="Unrestricted Creative">Unrestricted Creative</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Discount & Offer Behavior</label>
                    <select className="xora-select" value={offerBehavior} onChange={(e) => setOfferBehavior(e.target.value)}>
                      <option value="Always Highlight Discount %">Always Highlight Discount %</option>
                      <option value="Include Countdown Urgency">Include Countdown Urgency</option>
                      <option value="Product Value First">Product Value First</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label className="form-label">Creativity Level (Temperature)</label>
                  <select className="xora-select" value={creativityLevel} onChange={(e) => setCreativityLevel(e.target.value)}>
                    <option value="0.2 (Conservative)">Conservative (0.2 - Strict brand adherence)</option>
                    <option value="0.7 (Balanced)">Balanced (0.7 - Optimal hooks & variations)</option>
                    <option value="1.0 (High Creative Variation)">High Creative Variation (1.0 - Bold experimental copy)</option>
                  </select>
                </div>

                <button className="btn btn-primary" onClick={() => handleSave('AI Preferences')}>
                  <Save size={14} /> Save AI Preferences
                </button>
              </div>
            </div>
          )}

          {/* PANEL 4: VIDEO TEMPLATES */}
          {activeSection === 'templates' && (
            <div className="xora-card">
              <div className="xora-card-header">
                <div className="xora-card-title">
                  <Video size={18} style={{ color: 'var(--xora-primary)' }} />
                  Video Template & Layout Defaults
                </div>
              </div>
              <div className="xora-card-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Default Video Template</label>
                    <select className="xora-select" value={defaultTemplate} onChange={(e) => setDefaultTemplate(e.target.value)}>
                      <option value="TikTok UGC Split-Screen">TikTok UGC Split-Screen</option>
                      <option value="Instagram Reel Dynamic Text">Instagram Reel Dynamic Text</option>
                      <option value="Product Showcase Clean">Product Showcase Clean</option>
                      <option value="Minimalist Editorial Grid">Minimalist Editorial Grid</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Aspect Ratio (Default)</label>
                    <select className="xora-select" value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)}>
                      <option value="9:16 vertical (1080x1920)">9:16 vertical (1080x1920 - Default)</option>
                      <option value="1:1 square (1080x1080)">1:1 square (1080x1080)</option>
                      <option value="16:9 landscape (1920x1080)">16:9 landscape (1920x1080)</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Branding Placement</label>
                    <select className="xora-select" value={brandingPlacement} onChange={(e) => setBrandingPlacement(e.target.value)}>
                      <option value="Top-Left Badge">Top-Left Badge</option>
                      <option value="Bottom Watermark">Bottom Watermark</option>
                      <option value="End-Card Screen">End-Card Screen</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Logo Position</label>
                    <select className="xora-select" value={logoPosition} onChange={(e) => setLogoPosition(e.target.value)}>
                      <option value="Top Left">Top Left</option>
                      <option value="Top Right">Top Right</option>
                      <option value="Center Header">Center Header</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">Subtitle Text Style</label>
                    <select className="xora-select" value={textStyle} onChange={(e) => setTextStyle(e.target.value)}>
                      <option value="Modern Sans Bold (Inter)">Modern Sans Bold (Inter)</option>
                      <option value="Editorial Serif">Editorial Serif</option>
                      <option value="Neon Subtitles">Neon Subtitles</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">CTA Placement</label>
                    <select className="xora-select" value={ctaPlacement} onChange={(e) => setCtaPlacement(e.target.value)}>
                      <option value="Persistent Bottom Banner">Persistent Bottom Banner</option>
                      <option value="End Frame 3-Second Slide">End Frame 3-Second Slide</option>
                    </select>
                  </div>
                </div>

                <button className="btn btn-primary" onClick={() => handleSave('Video Templates')}>
                  <Save size={14} /> Save Template Defaults
                </button>
              </div>
            </div>
          )}

          {/* PANEL 5: NOTIFICATIONS */}
          {activeSection === 'notifications' && (
            <div className="xora-card">
              <div className="xora-card-header">
                <div className="xora-card-title">
                  <Bell size={18} style={{ color: 'var(--xora-primary)' }} />
                  Notification Preferences
                </div>
              </div>
              <div className="xora-card-body">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--xora-border-subtle)' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--xora-text-primary)' }}>Rendering Complete</div>
                      <div style={{ fontSize: '12px', color: 'var(--xora-text-secondary)' }}>Receive notification when video render job finishes.</div>
                    </div>
                    <label className="xora-toggle-switch">
                      <input type="checkbox" checked={notifRenderingComplete} onChange={(e) => setNotifRenderingComplete(e.target.checked)} />
                      <span className="xora-toggle-slider" />
                    </label>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--xora-border-subtle)' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--xora-text-primary)' }}>Rendering Failed</div>
                      <div style={{ fontSize: '12px', color: 'var(--xora-text-secondary)' }}>Alert when a video render encounters an error reason.</div>
                    </div>
                    <label className="xora-toggle-switch">
                      <input type="checkbox" checked={notifRenderingFailed} onChange={(e) => setNotifRenderingFailed(e.target.checked)} />
                      <span className="xora-toggle-slider" />
                    </label>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--xora-border-subtle)' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--xora-text-primary)' }}>Approval Required</div>
                      <div style={{ fontSize: '12px', color: 'var(--xora-text-secondary)' }}>Notification when new AI script drafts need merchant review.</div>
                    </div>
                    <label className="xora-toggle-switch">
                      <input type="checkbox" checked={notifApprovalRequired} onChange={(e) => setNotifApprovalRequired(e.target.checked)} />
                      <span className="xora-toggle-slider" />
                    </label>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--xora-border-subtle)' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--xora-text-primary)' }}>Product Sync Completed</div>
                      <div style={{ fontSize: '12px', color: 'var(--xora-text-secondary)' }}>Notify when catalog synchronization finishes.</div>
                    </div>
                    <label className="xora-toggle-switch">
                      <input type="checkbox" checked={notifSyncCompleted} onChange={(e) => setNotifSyncCompleted(e.target.checked)} />
                      <span className="xora-toggle-slider" />
                    </label>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--xora-text-primary)' }}>Credit Warning</div>
                      <div style={{ fontSize: '12px', color: 'var(--xora-text-secondary)' }}>Alert when available rendering credits fall below 100.</div>
                    </div>
                    <label className="xora-toggle-switch">
                      <input type="checkbox" checked={notifCreditWarning} onChange={(e) => setNotifCreditWarning(e.target.checked)} />
                      <span className="xora-toggle-slider" />
                    </label>
                  </div>

                </div>

                <button className="btn btn-primary" style={{ marginTop: '16px' }} onClick={() => handleSave('Notifications')}>
                  <Save size={14} /> Save Notifications
                </button>
              </div>
            </div>
          )}

          {/* PANEL 6: TEAM / ACCOUNT */}
          {activeSection === 'team' && (
            <div className="xora-card">
              <div className="xora-card-header">
                <div className="xora-card-title">
                  <Users size={18} style={{ color: 'var(--xora-primary)' }} />
                  Account & Team Administration
                </div>
              </div>
              <div className="xora-card-body">
                {/* Current Admin Account Card */}
                <div style={{
                  padding: '16px',
                  backgroundColor: 'var(--xora-bg-app)',
                  borderRadius: 'var(--radius-card)',
                  border: '1px solid var(--xora-border-subtle)',
                  marginBottom: '24px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--xora-primary)',
                      color: 'white',
                      fontWeight: 800,
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      AM
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--xora-text-primary)' }}>Alex Morgan</div>
                      <div style={{ fontSize: '12px', color: 'var(--xora-text-secondary)' }}>alex@auraco.com</div>
                      <div style={{ marginTop: '4px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span className="badge badge-success" style={{ fontSize: '10.5px' }}>Store Owner / Admin</span>
                        <span style={{ fontSize: '11px', color: 'var(--xora-text-muted)' }}>Active now</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Multi-User Roadmap Banner */}
                <div style={{
                  padding: '20px',
                  backgroundColor: '#FAFAFD',
                  borderRadius: 'var(--radius-card)',
                  border: '1px solid var(--xora-primary-border)',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <Lock size={18} style={{ color: 'var(--xora-primary)' }} />
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--xora-text-primary)' }}>
                      Multi-User Team Invites & Permissions
                    </h4>
                    <span className="badge badge-info" style={{ fontSize: '10.5px' }}>Roadmap / Coming Soon</span>
                  </div>
                  <p style={{ fontSize: '12.5px', color: 'var(--xora-text-secondary)', lineHeight: 1.4 }}>
                    Multi-user role-based access control (RBAC), team member invites, and approval workflows for creative agencies are scheduled for post-launch releases.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* PANEL 7: DANGER ZONE */}
          {activeSection === 'danger' && (
            <div className="xora-card" style={{ border: '1.5px solid var(--xora-critical)', backgroundColor: '#FFFDFD' }}>
              <div className="xora-card-header" style={{ backgroundColor: 'var(--xora-critical-light)', borderBottom: '1px solid #F5C2C0' }}>
                <div className="xora-card-title" style={{ color: 'var(--xora-critical)' }}>
                  <ShieldAlert size={18} />
                  Danger Zone — High-Risk Administrative Actions
                </div>
              </div>
              <div className="xora-card-body">
                
                {/* Disconnect Shopify Row */}
                <div style={{ paddingBottom: '20px', marginBottom: '20px', borderBottom: '1px solid var(--xora-border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--xora-text-primary)' }}>Disconnect Shopify Store</h4>
                    <p style={{ fontSize: '12.5px', color: 'var(--xora-text-secondary)', maxWidth: '420px' }}>
                      Halts real-time product webhooks and catalog sync. Existing rendered videos remain stored in your library.
                    </p>
                  </div>
                  <button className="btn btn-destructive" onClick={() => setShowDisconnectModal(true)}>
                    <Unlink size={14} /> Disconnect Shopify
                  </button>
                </div>

                {/* Delete Account Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--xora-critical)' }}>Delete XORA Platform Account</h4>
                    <p style={{ fontSize: '12.5px', color: 'var(--xora-text-secondary)', maxWidth: '420px' }}>
                      Permanently purges all account data, AI generation templates, credit subscriptions, and stored MP4 video assets.
                    </p>
                  </div>
                  <button className="btn btn-destructive" onClick={() => setShowDeleteAccountModal(true)}>
                    <Trash2 size={14} /> Delete Account
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>

      {/* TYPED CONFIRMATION MODAL 1: DISCONNECT SHOPIFY STORE */}
      {showDisconnectModal && (
        <div className="modal-overlay" onClick={() => setShowDisconnectModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '460px' }}>
            <div className="modal-header" style={{ backgroundColor: 'var(--xora-critical-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AlertTriangle size={20} style={{ color: 'var(--xora-critical)' }} />
                <h3 className="modal-title" style={{ color: 'var(--xora-critical)' }}>Confirm Disconnecting Store</h3>
              </div>
              <button className="icon-btn" onClick={() => setShowDisconnectModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body" style={{ fontSize: '13.5px', color: 'var(--xora-text-secondary)' }}>
              Are you sure you want to disconnect <strong>{storeContext.domain}</strong>?
              <p style={{ marginTop: '8px', fontSize: '12px', color: 'var(--xora-text-muted)' }}>
                This will halt automated catalog syncing. Type <code>DISCONNECT</code> to confirm.
              </p>
              
              <div style={{ marginTop: '14px' }}>
                <input 
                  type="text"
                  className="xora-input"
                  placeholder="Type DISCONNECT to confirm"
                  value={typedDisconnectConfirm}
                  onChange={(e) => setTypedDisconnectConfirm(e.target.value)}
                  style={{ textTransform: 'uppercase' }}
                />
              </div>
            </div>
            <div className="modal-footer" style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowDisconnectModal(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-destructive"
                disabled={typedDisconnectConfirm.trim() !== 'DISCONNECT'}
                onClick={() => {
                  if (onDisconnectStore) onDisconnectStore();
                  setShowDisconnectModal(false);
                  setTypedDisconnectConfirm('');
                }}
              >
                Confirm Disconnect
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TYPED & CHECKBOX CONFIRMATION MODAL 2: DELETE ACCOUNT */}
      {showDeleteAccountModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteAccountModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div className="modal-header" style={{ backgroundColor: 'var(--xora-critical-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldAlert size={20} style={{ color: 'var(--xora-critical)' }} />
                <h3 className="modal-title" style={{ color: 'var(--xora-critical)' }}>Permanently Delete Account</h3>
              </div>
              <button className="icon-btn" onClick={() => setShowDeleteAccountModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body" style={{ fontSize: '13.5px', color: 'var(--xora-text-secondary)' }}>
              This action is permanent and cannot be undone. All video assets and credits will be purged.
              
              <div style={{ marginTop: '16px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <input 
                  type="checkbox"
                  id="confirmDeleteCheck"
                  checked={hasConfirmedDeleteCheckbox}
                  onChange={(e) => setHasConfirmedDeleteCheckbox(e.target.checked)}
                  style={{ marginTop: '3px', cursor: 'pointer' }}
                />
                <label htmlFor="confirmDeleteCheck" style={{ fontSize: '12.5px', cursor: 'pointer', color: 'var(--xora-text-primary)' }}>
                  I understand that deleting my XORA account permanently purges all assets.
                </label>
              </div>

              <div style={{ marginTop: '14px' }}>
                <label className="form-label" style={{ fontSize: '12px' }}>Type <code>DELETE</code> to authorize:</label>
                <input 
                  type="text"
                  className="xora-input"
                  placeholder="Type DELETE to confirm"
                  value={typedDeleteConfirm}
                  onChange={(e) => setTypedDeleteConfirm(e.target.value)}
                  style={{ textTransform: 'uppercase' }}
                />
              </div>
            </div>
            <div className="modal-footer" style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowDeleteAccountModal(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-destructive"
                disabled={!hasConfirmedDeleteCheckbox || typedDeleteConfirm.trim() !== 'DELETE'}
                onClick={() => {
                  setShowDeleteAccountModal(false);
                  setTypedDeleteConfirm('');
                  setHasConfirmedDeleteCheckbox(false);
                  onSaveSettings('Account purge requested.');
                }}
              >
                Permanently Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
