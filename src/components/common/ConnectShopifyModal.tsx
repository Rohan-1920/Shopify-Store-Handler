import React, { useState } from 'react';
import { X, ShoppingBag, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ConnectShopifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (domain: string) => void;
  initialDomain?: string;
}

export const ConnectShopifyModal: React.FC<ConnectShopifyModalProps> = ({
  isOpen,
  onClose,
  onConnect,
  initialDomain = 'acme-apparel.myshopify.com'
}) => {
  const [storeDomain, setStoreDomain] = useState(initialDomain);
  const [step, setStep] = useState<'input' | 'authorizing' | 'success'>('input');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleConnectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDomain = storeDomain.trim().toLowerCase();

    if (!cleanDomain.includes('.myshopify.com') && !cleanDomain.includes('.')) {
      setError('Please enter a valid Shopify domain (e.g. store-name.myshopify.com)');
      return;
    }

    setError(null);
    setStep('authorizing');

    // Simulate Shopify OAuth handshake & API scope check
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onConnect(cleanDomain);
      }, 1000);
    }, 1200);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid var(--xora-border, #e4e7e5)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          overflow: 'hidden',
          animation: 'fadeInScale 200ms cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Obsidian Header */}
        <div style={{
          backgroundColor: '#0c0d0e',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #303030'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              backgroundColor: '#95bf47', // Official Shopify Green Accent
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShoppingBag size={18} style={{ color: '#000000' }} />
            </div>
            <div>
              <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '15px' }}>
                Connect Shopify Product Catalog
              </div>
              <div style={{ color: '#8e9390', fontSize: '12px' }}>
                Direct Admin OAuth 2.0 Integration
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#8e9390',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px'
            }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px' }}>
          {step === 'input' && (
            <form onSubmit={handleConnectSubmit}>
              <p style={{ fontSize: '13.5px', color: '#5f6361', marginBottom: '16px', lineHeight: 1.5 }}>
                Enter your Shopify store domain to sync eligible product catalog items and enable AI video creative generation.
              </p>

              {error && (
                <div style={{
                  padding: '10px 12px',
                  backgroundColor: '#fde8e8',
                  border: '1px solid #f5c2c0',
                  borderRadius: '8px',
                  color: '#d82c0d',
                  fontSize: '12.5px',
                  marginBottom: '14px'
                }}>
                  {error}
                </div>
              )}

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#161817', marginBottom: '6px' }}>
                  Shopify Store Domain (.myshopify.com)
                </label>
                <div style={{ display: 'flex', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e4e7e5' }}>
                  <input
                    type="text"
                    required
                    value={storeDomain}
                    onChange={(e) => setStoreDomain(e.target.value)}
                    placeholder="your-store-name.myshopify.com"
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      border: 'none',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Scopes Overview */}
              <div style={{
                backgroundColor: '#f8f9f8',
                border: '1px solid #eff1ef',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '11.5px', fontWeight: 600, color: '#7a7f7c', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Requested Shopify Scopes:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12.5px', color: '#161817' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={13} style={{ color: 'var(--xora-green, #00a878)' }} />
                    <span>read_products (Catalog metadata & hi-res images)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={13} style={{ color: 'var(--xora-green, #00a878)' }} />
                    <span>write_files (Push generated video creatives)</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: 'var(--xora-green, #00a878)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span>Authorize & Connect Shopify Store</span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          {step === 'authorizing' && (
            <div style={{ textAlign: 'center', padding: '24px 12px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '3px solid #e4e7e5',
                borderTopColor: 'var(--xora-green, #00a878)',
                animation: 'spinRing 1s linear infinite',
                margin: '0 auto 16px'
              }} />
              <div style={{ fontWeight: 600, fontSize: '16px', color: '#161817', marginBottom: '4px' }}>
                Verifying Shopify OAuth Permissions...
              </div>
              <p style={{ fontSize: '13px', color: '#5f6361' }}>
                Connecting to {storeDomain} and fetching product catalog schema.
              </p>
            </div>
          )}

          {step === 'success' && (
            <div style={{ textAlign: 'center', padding: '24px 12px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 168, 120, 0.10)',
                color: 'var(--xora-green, #00a878)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <CheckCircle2 size={28} />
              </div>
              <div style={{ fontWeight: 700, fontSize: '18px', color: '#161817', marginBottom: '4px' }}>
                Shopify Store Connected!
              </div>
              <p style={{ fontSize: '13.5px', color: '#5f6361' }}>
                Launching XORA Creative Workspace...
              </p>
            </div>
          )}

          <div style={{
            marginTop: '16px',
            textAlign: 'center',
            fontSize: '11.5px',
            color: '#7a7f7c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}>
            <ShieldAlert size={13} />
            <span>Shopify Official App Security Standard (HMAC verified).</span>
          </div>
        </div>
      </div>
    </div>
  );
};
