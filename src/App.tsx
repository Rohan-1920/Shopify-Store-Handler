import { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { CreditQuoteModal } from './components/common/CreditQuoteModal';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { VideoPlayerModal } from './components/common/VideoPlayerModal';
import { HelpModal } from './components/common/HelpModal';
import { ToastContainer } from './components/common/ToastContainer';
import type { ToastMessage } from './components/common/ToastContainer';

import { DashboardView } from './features/dashboard/DashboardView';
import { ProductsView } from './features/products/ProductsView';
import { CreativeStudioView } from './features/creatives/CreativeStudioView';
import { ApprovalsView } from './features/approvals/ApprovalsView';
import { CostQuoteView } from './features/quote/CostQuoteView';
import { RenderingView } from './features/rendering/RenderingView';
import { VideoLibraryView } from './features/videos/VideoLibraryView';
import { AnalyticsView } from './features/analytics/AnalyticsView';
import { SettingsView } from './features/settings/SettingsView';

import { 
  initialStoreContext, 
  initialCreditBalance, 
  initialProducts, 
  initialDrafts, 
  initialRenderJobs, 
  initialVideos, 
  initialNotifications,
  marketingAngles
} from './services/mockData';

import type { ActiveTab, ShopifyProduct, CreativeDraft, RenderJob, VideoAsset, NotificationItem } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [storeContext, setStoreContext] = useState(initialStoreContext);
  const [creditBalance, setCreditBalance] = useState(initialCreditBalance);
  const [products] = useState<ShopifyProduct[]>(initialProducts);
  const [drafts, setDrafts] = useState<CreativeDraft[]>(initialDrafts);
  const [renderJobs, setRenderJobs] = useState<RenderJob[]>(initialRenderJobs);
  const [videos, setVideos] = useState<VideoAsset[]>(initialVideos);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  // UI Overlays & Modal States
  const [isSyncing, setIsSyncing] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [draftsToQuote, setDraftsToQuote] = useState<CreativeDraft[]>([]);
  const [activeVideoPreview, setActiveVideoPreview] = useState<VideoAsset | null>(null);
  const [selectedProductForStudio, setSelectedProductForStudio] = useState<ShopifyProduct | null>(initialProducts[0]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Add toast helper
  const addToast = (type: 'success' | 'error' | 'info', text: string) => {
    const newToast: ToastMessage = { id: `toast_${Date.now()}`, type, text };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Simulate rendering progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRenderJobs((prevJobs) => {
        return prevJobs.map((job) => {
          if (job.status === 'rendering') {
            const nextProgress = Math.min(100, job.progress + 15);
            let nextStatus: RenderJob['status'] = job.status;
            let stage = job.currentStage;

            if (nextProgress > 30 && nextProgress <= 70) {
              stage = 'Synthesizing Neural Voiceover & Audio (Zvid Engine)';
            } else if (nextProgress > 70 && nextProgress < 100) {
              nextStatus = 'stitching';
              stage = 'Stitching MP4 Video & Aligning Subtitles';
            } else if (nextProgress >= 100) {
              nextStatus = 'completed';
              stage = 'Render Complete & Pushed to Video Library';

              // Automatically add finished video to video library if not already existing
              setVideos((prevVideos) => {
                if (prevVideos.some((v) => v.id === `vid_${job.id}`)) return prevVideos;
                const newVideo: VideoAsset = {
                  id: `vid_${job.id}`,
                  productId: job.productId,
                  productTitle: job.productTitle,
                  productImage: job.productImage,
                  angleName: job.angleName,
                  thumbnail: job.productImage,
                  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                  duration: '0:15',
                  resolution: '1080x1920 (9:16 vertical)',
                  status: 'ready',
                  views: 120,
                  ctr: '4.5%',
                  conversions: 4,
                  createdAt: 'Just now'
                };
                return [newVideo, ...prevVideos];
              });

              addToast('success', `Zvid Render Complete: ${job.productTitle} (${job.angleName})`);
            }

            return {
              ...job,
              progress: nextProgress,
              status: nextStatus,
              currentStage: stage
            };
          }
          return job;
        });
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Action Handlers
  const handleSyncCatalog = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setStoreContext((prev) => ({ ...prev, lastSync: 'Just now' }));
      addToast('success', 'Shopify product catalog & images synced successfully.');
    }, 1200);
  };

  const handleQuickGenerate = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (prod) {
      setSelectedProductForStudio(prod);
      setActiveTab('creatives');
      addToast('info', `Loaded ${prod.title} in 3-Angle Studio.`);
    }
  };

  const handleGenerateAnglesForSelected = (selectedProds: ShopifyProduct[]) => {
    if (selectedProds.length === 1) {
      setSelectedProductForStudio(selectedProds[0]);
      setActiveTab('creatives');
    } else {
      // Bulk generate drafts for selected products
      const newDrafts: CreativeDraft[] = [];
      selectedProds.forEach((prod) => {
        marketingAngles.forEach((angle) => {
          newDrafts.push({
            id: `draft_${Date.now()}_${prod.id}_${angle.id}`,
            productId: prod.id,
            productTitle: prod.title,
            productImage: prod.image,
            angleId: angle.id,
            angleName: angle.name,
            hookCopy: `Engineered performance for ${prod.title}.`,
            bodyCopy: `Experience premium quality with ${prod.title}. Available now on Shopify.`,
            ctaText: 'Shop Collection',
            estimatedDuration: 15,
            status: 'draft',
            warnings: [],
            hasDiscountClaim: false,
            updatedAt: 'Just now'
          });
        });
      });

      setDrafts((prev) => [...newDrafts, ...prev]);
      setActiveTab('approvals');
      addToast('success', `Generated ${newDrafts.length} AI draft scripts across 3 marketing angles.`);
    }
  };

  const handleSaveDraftToApprovals = (newDrafts: CreativeDraft[]) => {
    setDrafts((prev) => [...newDrafts, ...prev]);
    setActiveTab('approvals');
    addToast('success', 'Drafts saved and sent to Approvals queue.');
  };

  const handleApproveAndOpenQuote = (selected: CreativeDraft[]) => {
    setDraftsToQuote(selected);
    setActiveTab('quote');
  };

  const handleConfirmRender = (approvedDrafts: CreativeDraft[]) => {
    const totalCredits = approvedDrafts.reduce((acc, d) => acc + d.estimatedDuration * creditBalance.costPerSecond, 0);

    // Deduct credits
    setCreditBalance((prev) => ({
      ...prev,
      available: Math.max(0, prev.available - totalCredits)
    }));

    // Update draft statuses
    setDrafts((prev) =>
      prev.map((d) =>
        approvedDrafts.some((a) => a.id === d.id) ? { ...d, status: 'approved' } : d
      )
    );

    // Create render jobs
    const newJobs: RenderJob[] = approvedDrafts.map((d) => ({
      id: `job_zvid_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      draftId: d.id,
      productId: d.productId,
      productTitle: d.productTitle,
      productImage: d.productImage,
      angleName: d.angleName,
      status: 'rendering',
      progress: 15,
      currentStage: 'Initializing Zvid GPU Scene Canvas',
      duration: d.estimatedDuration,
      creditsUsed: d.estimatedDuration * creditBalance.costPerSecond,
      createdAt: 'Just now'
    }));

    setRenderJobs((prev) => [...newJobs, ...prev]);
    setActiveTab('rendering');
    addToast('success', `Dispatched ${newJobs.length} video jobs to Zvid (${totalCredits} credits).`);
  };

  const handleDeleteDraft = (draftId: string) => {
    setDrafts((prev) => prev.filter((d) => d.id !== draftId));
    addToast('info', 'Draft discarded.');
  };

  const handleRetryJob = (jobId: string) => {
    setRenderJobs((prev) =>
      prev.map((j) =>
        j.id === jobId
          ? { 
              ...j, 
              status: 'rendering', 
              progress: 10, 
              currentStage: 'Restarting scene render & GPU canvas...',
              errorReason: undefined,
              startedAt: 'Just now'
            }
          : j
      )
    );
    addToast('info', 'Restarted render job.');
  };

  const handleCancelJob = (jobId: string) => {
    setRenderJobs((prev) =>
      prev.map((j) =>
        j.id === jobId
          ? { ...j, status: 'cancelled', currentStage: 'Job cancelled by merchant' }
          : j
      )
    );
    addToast('info', 'Rendering job cancelled.');
  };

  const handlePushToShopify = (videoId: string) => {
    setVideos((prev) =>
      prev.map((v) => (v.id === videoId ? { ...v, status: 'pushed_to_shopify' } : v))
    );
    addToast('success', 'Pushed MP4 video directly to Shopify Store Media.');
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('info', 'Marked all notifications as read.');
  };

  return (
    <div className="app-shell">
      {/* Dark Header */}
      <Header
        storeContext={storeContext}
        creditBalance={creditBalance}
        onOpenSearch={() => setSearchOpen(true)}
        onToggleNotifications={() => setNotificationsOpen(!notificationsOpen)}
        onOpenHelp={() => setHelpModalOpen(true)}
        onToggleMobileMenu={() => setMobileDrawerOpen(!mobileDrawerOpen)}
        onNavigate={setActiveTab}
        unreadCount={notifications.filter((n) => !n.read).length}
      />

      {/* Mobile Drawer (Screens < 768px) */}
      {mobileDrawerOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileDrawerOpen(false)}>
          <div className="mobile-drawer-container" onClick={(e) => e.stopPropagation()}>
            <Sidebar
              activeTab={activeTab}
              onSelectTab={setActiveTab}
              pendingApprovalsCount={drafts.filter((d) => d.status === 'draft').length}
              activeRenderCount={renderJobs.filter((j) => j.status === 'rendering' || j.status === 'queued').length}
              videosCount={videos.length}
              storeContext={storeContext}
              onSyncCatalog={handleSyncCatalog}
              isSyncing={isSyncing}
              isMobileDrawer={true}
              onCloseMobileDrawer={() => setMobileDrawerOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Application Container */}
      <div className="app-container">
        {/* Desktop Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          pendingApprovalsCount={drafts.filter((d) => d.status === 'draft').length}
          activeRenderCount={renderJobs.filter((j) => j.status === 'rendering' || j.status === 'queued').length}
          videosCount={videos.length}
          storeContext={storeContext}
          onSyncCatalog={handleSyncCatalog}
          isSyncing={isSyncing}
        />

        {/* Main Work Surface */}
        <main className="main-content">
          {activeTab === 'dashboard' && (
            <DashboardView
              onNavigate={setActiveTab}
              products={products}
              drafts={drafts}
              renderJobs={renderJobs}
              videos={videos}
              storeContext={storeContext}
              creditBalance={creditBalance}
              onQuickGenerate={handleQuickGenerate}
              onPreviewVideo={(v) => setActiveVideoPreview(v)}
            />
          )}

          {activeTab === 'products' && (
            <ProductsView
              products={products}
              storeContext={storeContext}
              onSyncCatalog={handleSyncCatalog}
              isSyncing={isSyncing}
              onGenerateAnglesForSelected={handleGenerateAnglesForSelected}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'creatives' && (
            <CreativeStudioView
              products={products}
              selectedProduct={selectedProductForStudio}
              onSelectProduct={setSelectedProductForStudio}
              onSaveDraftToApprovals={handleSaveDraftToApprovals}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'approvals' && (
            <ApprovalsView
              drafts={drafts}
              creditBalance={creditBalance}
              onApproveAndOpenQuote={handleApproveAndOpenQuote}
              onDeleteDraft={handleDeleteDraft}
              onNavigateToStudio={() => setActiveTab('creatives')}
            />
          )}

          {activeTab === 'quote' && (
            <CostQuoteView
              creditBalance={creditBalance.available}
              selectedProductsCount={48}
              anglesPerProductCount={3}
              onNavigate={setActiveTab}
              onStartRendering={(count, _costCredits) => {
                handleConfirmRender(draftsToQuote.length > 0 ? draftsToQuote : drafts.slice(0, count));
                addToast('success', `Rendering started for ${count} videos.`);
              }}
            />
          )}

          {activeTab === 'rendering' && (
            <RenderingView
              renderJobs={renderJobs}
              onRetryJob={handleRetryJob}
              onCancelJob={handleCancelJob}
              onNavigateToVideos={() => setActiveTab('videos')}
            />
          )}

          {activeTab === 'videos' && (
            <VideoLibraryView
              videos={videos}
              storeContext={storeContext}
              onPreviewVideo={(v) => setActiveVideoPreview(v)}
              onPushToShopify={handlePushToShopify}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView
              videos={videos}
              storeContext={storeContext}
              onNavigateToStudio={() => setActiveTab('creatives')}
              onNavigateToRendering={() => setActiveTab('rendering')}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              storeContext={storeContext}
              creditBalance={creditBalance}
              onSaveSettings={(msg) => addToast('success', msg)}
              onSyncCatalog={handleSyncCatalog}
              isSyncing={isSyncing}
              onDisconnectStore={() => {
                addToast('info', 'Shopify Store disconnected. Automated webhooks paused.');
              }}
            />
          )}
        </main>
      </div>

      {/* Global Modals & Drawers */}
      <CreditQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        draftsToRender={draftsToQuote}
        creditBalance={creditBalance}
        onConfirmRender={handleConfirmRender}
      />

      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={products}
        videos={videos}
        onNavigate={setActiveTab}
      />

      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllNotificationsRead}
      />

      <HelpModal
        isOpen={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
      />

      <VideoPlayerModal
        video={activeVideoPreview}
        onClose={() => setActiveVideoPreview(null)}
        onPushToShopify={handlePushToShopify}
      />

      {/* Toast Feedback System */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
