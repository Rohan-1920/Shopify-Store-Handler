import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, Lock, Mail, Store, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'login'
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeName, setStoreName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onSuccess(email);
    }, 800);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
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
          maxWidth: '440px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid var(--xora-border, #e4e7e5)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          overflow: 'hidden',
          animation: 'fadeInScale 200ms cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div style={{
          backgroundColor: '#0c0d0e',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #303030'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              backgroundColor: 'var(--xora-green, #00a878)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '14px',
              padding: '2px 8px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Sparkles size={14} />
              XORA
            </div>
            <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '15px' }}>
              {mode === 'login' ? 'Merchant Sign In' : 'Create Merchant Account'}
            </span>
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

        {/* Form Body */}
        <div style={{ padding: '24px' }}>
          {/* Mode Switcher Tabs */}
          <div style={{
            display: 'flex',
            backgroundColor: '#f4f5f4',
            padding: '3px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <button
              type="button"
              onClick={() => { setMode('login'); setError(null); }}
              style={{
                flex: 1,
                padding: '8px',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                backgroundColor: mode === 'login' ? '#ffffff' : 'transparent',
                color: mode === 'login' ? '#161817' : '#5f6361',
                boxShadow: mode === 'login' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 150ms ease'
              }}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setError(null); }}
              style={{
                flex: 1,
                padding: '8px',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                backgroundColor: mode === 'signup' ? '#ffffff' : 'transparent',
                color: mode === 'signup' ? '#161817' : '#5f6361',
                boxShadow: mode === 'signup' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 150ms ease'
              }}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div style={{
              padding: '10px 12px',
              backgroundColor: '#fde8e8',
              border: '1px solid #f5c2c0',
              borderRadius: '8px',
              color: '#d82c0d',
              fontSize: '12.5px',
              marginBottom: '16px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {mode === 'signup' && (
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#161817', marginBottom: '4px' }}>
                  Shopify Store Name
                </label>
                <div style={{ position: 'relative' }}>
                  <Store size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: '#7a7f7c' }} />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Commerce"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px 8px 36px',
                      border: '1px solid #e4e7e5',
                      borderRadius: '8px',
                      fontSize: '13.5px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#161817', marginBottom: '4px' }}>
                Work Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: '#7a7f7c' }} />
                <input
                  type="email"
                  required
                  placeholder="merchant@store.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 36px',
                    border: '1px solid #e4e7e5',
                    borderRadius: '8px',
                    fontSize: '13.5px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#161817', marginBottom: '4px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: '#7a7f7c' }} />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 36px',
                    border: '1px solid #e4e7e5',
                    borderRadius: '8px',
                    fontSize: '13.5px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '10px 16px',
                backgroundColor: 'var(--xora-green, #00a878)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '14px',
                marginTop: '6px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>{mode === 'login' ? 'Sign In & Continue' : 'Create Account & Continue'}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div style={{
            marginTop: '20px',
            paddingTop: '14px',
            borderTop: '1px solid #eff1ef',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '11.5px',
            color: '#7a7f7c'
          }}>
            <ShieldCheck size={14} style={{ color: 'var(--xora-green, #00a878)', flexShrink: 0 }} />
            <span>Encrypted merchant authentication & Shopify OAuth 2.0 security.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
