import React, { useState } from 'react';
import { LandingHeader } from './components/LandingHeader';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { WorkflowSection } from './components/WorkflowSection';
import { TrustSection } from './components/TrustSection';
import { WhyXoraSection } from './components/WhyXoraSection';
import { VisionSection } from './components/VisionSection';
import { TeamSection } from './components/TeamSection';
import { PhilosophySection } from './components/PhilosophySection';
import { FinalCTASection } from './components/FinalCTASection';
import { LandingFooter } from './components/LandingFooter';

import { AuthModal } from '../../components/common/AuthModal';
import { ConnectShopifyModal } from '../../components/common/ConnectShopifyModal';

interface LandingViewProps {
  isAuthenticated: boolean;
  onAuthenticate: (email: string) => void;
  onConnectStore: (domain: string) => void;
  onEnterApp: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  isAuthenticated,
  onAuthenticate,
  onConnectStore,
  onEnterApp
}) => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [connectModalOpen, setConnectModalOpen] = useState(false);

  const handleNavigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrimaryConnectClick = () => {
    if (isAuthenticated) {
      // If already logged in, open store connection modal directly
      setConnectModalOpen(true);
    } else {
      // If unauthenticated, trigger auth modal first
      setAuthMode('signup');
      setAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = (email: string) => {
    onAuthenticate(email);
    setAuthModalOpen(false);
    // Continue directly to Shopify Connection modal
    setConnectModalOpen(true);
  };

  const handleConnectSuccess = (domain: string) => {
    onConnectStore(domain);
    setConnectModalOpen(false);
    onEnterApp();
  };

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#161817', minHeight: '100vh' }}>
      {/* Header */}
      <LandingHeader
        onConnectShopify={handlePrimaryConnectClick}
        onOpenLogin={() => { setAuthMode('login'); setAuthModalOpen(true); }}
        onOpenSignup={() => { setAuthMode('signup'); setAuthModalOpen(true); }}
        onNavigateToSection={handleNavigateToSection}
      />

      {/* Hero Section */}
      <HeroSection
        onConnectShopify={handlePrimaryConnectClick}
        onSeeHowItWorks={() => handleNavigateToSection('how-it-works')}
      />

      {/* Problem Section */}
      <ProblemSection />

      {/* Solution Section */}
      <SolutionSection />

      {/* Workflow 6-Stage Section */}
      <WorkflowSection />

      {/* Trust & Human-in-the-Loop Section */}
      <TrustSection />

      {/* Why XORA Pillars */}
      <WhyXoraSection />

      {/* Vision Section */}
      <VisionSection />

      {/* Team Engineering Disciplines */}
      <TeamSection />

      {/* Philosophy Editorial */}
      <PhilosophySection />

      {/* Final CTA Banner */}
      <FinalCTASection
        onConnectShopify={handlePrimaryConnectClick}
        onExploreXora={onEnterApp}
      />

      {/* Public Footer */}
      <LandingFooter
        onOpenLogin={() => { setAuthMode('login'); setAuthModalOpen(true); }}
        onOpenSignup={() => { setAuthMode('signup'); setAuthModalOpen(true); }}
        onNavigateToSection={handleNavigateToSection}
      />

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      <ConnectShopifyModal
        isOpen={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
        onConnect={handleConnectSuccess}
      />
    </div>
  );
};

export default LandingView;
