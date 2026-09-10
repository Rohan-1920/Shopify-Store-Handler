export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  image: string;
  price: string;
  category: string;
  inventory: number;
  syncStatus: 'synced' | 'pending' | 'syncing' | 'error';
  aiEligibility: 'eligible' | 'needs_images' | 'unsupported_category';
  description?: string;
  selected?: boolean;
}

export type MarketingAngleType = 'benefit' | 'social_proof' | 'urgency';

export interface MarketingAngle {
  id: MarketingAngleType;
  name: string;
  subtitle: string;
  description: string;
  badgeText: string;
  iconName: string;
}

export interface CreativeDraft {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  angleId: MarketingAngleType;
  angleName: string;
  hookCopy: string;
  bodyCopy: string;
  ctaText: string;
  estimatedDuration: number; // in seconds
  status: 'draft' | 'approved' | 'rejected';
  warnings: string[];
  hasDiscountClaim: boolean;
  discountValue?: string;
  updatedAt: string;
}

export interface RenderJob {
  id: string;
  draftId: string;
  productId: string;
  productTitle: string;
  productImage: string;
  angleName: string;
  status: 'queued' | 'rendering' | 'stitching' | 'completed' | 'failed' | 'cancelled';
  progress: number; // 0 - 100
  currentStage: string;
  duration: number; // seconds
  creditsUsed: number;
  videoUrl?: string;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  errorReason?: string;
}

export interface VideoAsset {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  angleName: string;
  sku?: string;
  category?: 'Product-Led' | 'Benefit-Led' | 'Offer-Led';
  thumbnail: string;
  videoUrl: string;
  duration: string;
  resolution: string;
  status: 'ready' | 'pushed_to_shopify';
  views: number;
  ctr: string;
  conversions: number;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'success' | 'warning' | 'info' | 'critical';
  read: boolean;
}

export interface StoreContext {
  storeName: string;
  storeId: string;
  domain: string;
  currency: string;
  syncedProductsCount: number;
  lastSync: string;
  connected: boolean;
}

export interface CreditBalance {
  available: number;
  total: number;
  costPerSecond: number; // credits per second, default 1 credit = $0.01 or 1 credit/s
  planName: string;
  renewsOn: string;
}

export type ActiveTab = 
  | 'dashboard'
  | 'products'
  | 'creatives'
  | 'approvals'
  | 'quote'
  | 'rendering'
  | 'videos'
  | 'analytics'
  | 'settings';
