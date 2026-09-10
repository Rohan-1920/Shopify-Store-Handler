import type { 
  ShopifyProduct, 
  MarketingAngle, 
  CreativeDraft, 
  RenderJob, 
  VideoAsset, 
  NotificationItem, 
  StoreContext, 
  CreditBalance 
} from '../types';

export const initialStoreContext: StoreContext = {
  storeName: 'Apex Apparel & Living',
  storeId: 'sh_98234109',
  domain: 'apex-apparel.myshopify.com',
  currency: 'USD',
  syncedProductsCount: 148,
  lastSync: '2 minutes ago',
  connected: true
};

export const initialCreditBalance: CreditBalance = {
  available: 2450,
  total: 5000,
  costPerSecond: 1, // 1 credit per second ($0.01/sec)
  planName: 'Merchant Scale Pro',
  renewsOn: 'Oct 1, 2026'
};

export const marketingAngles: MarketingAngle[] = [
  {
    id: 'benefit',
    name: 'Benefit & Core Value',
    subtitle: 'Direct Product Value Proposition',
    description: 'Highlights key functional benefits, material quality, and everyday utility designed to build high initial trust.',
    badgeText: 'Highest Organic CTR',
    iconName: 'Zap'
  },
  {
    id: 'social_proof',
    name: 'Social Proof & Problem Solver',
    subtitle: 'Customer Review & Pain Point Focus',
    description: 'Emphasizes customer testimonials, real-world transformation, and solving common pain points before purchasing.',
    badgeText: 'Top Conversion Rate',
    iconName: 'Users'
  },
  {
    id: 'urgency',
    name: 'Urgency & Limited Offer',
    subtitle: 'Promotional & Conversion Driver',
    description: 'Creates immediate buy intent using verified sale terms, seasonal urgency, and stock countdown triggers.',
    badgeText: 'Best for Retargeting',
    iconName: 'Flame'
  }
];

export const initialProducts: ShopifyProduct[] = [
  {
    id: 'prod_101',
    title: 'Aura Thermal Compression Hoodie',
    handle: 'aura-thermal-compression-hoodie',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
    price: '$89.00',
    category: 'Activewear',
    inventory: 142,
    syncStatus: 'synced',
    aiEligibility: 'eligible',
    selected: false
  },
  {
    id: 'prod_102',
    title: 'Nordic Minimalist Desk Mat (Vegan Leather)',
    handle: 'nordic-minimalist-desk-mat',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    price: '$45.00',
    category: 'Home & Office',
    inventory: 88,
    syncStatus: 'synced',
    aiEligibility: 'eligible',
    selected: false
  },
  {
    id: 'prod_103',
    title: 'Vanguard ANC Wireless Headphones',
    handle: 'vanguard-anc-wireless-headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    price: '$199.00',
    category: 'Electronics',
    inventory: 34,
    syncStatus: 'synced',
    aiEligibility: 'eligible',
    selected: false
  },
  {
    id: 'prod_104',
    title: 'HydraGlow Peptide Facial Serum',
    handle: 'hydraglow-peptide-facial-serum',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    price: '$64.00',
    category: 'Beauty & Skincare',
    inventory: 210,
    syncStatus: 'synced',
    aiEligibility: 'eligible',
    selected: false
  },
  {
    id: 'prod_105',
    title: 'Ergonomic Breathable Mesh Chair',
    handle: 'ergonomic-breathable-mesh-chair',
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=600&q=80',
    price: '$349.00',
    category: 'Furniture',
    inventory: 12,
    syncStatus: 'pending',
    aiEligibility: 'eligible',
    selected: false
  },
  {
    id: 'prod_106',
    title: 'Starlight Ceramic Pour-Over Kettle',
    handle: 'starlight-ceramic-kettle',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
    price: '$52.00',
    category: 'Kitchenware',
    inventory: 0,
    syncStatus: 'synced',
    aiEligibility: 'needs_images',
    selected: false
  }
];

export const initialDrafts: CreativeDraft[] = [
  {
    id: 'draft_201',
    productId: 'prod_101',
    productTitle: 'Aura Thermal Compression Hoodie',
    productImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
    angleId: 'benefit',
    angleName: 'Benefit & Core Value',
    hookCopy: 'Engineered for sub-zero workouts without the heavy bulk.',
    bodyCopy: 'The Aura Thermal Compression Hoodie regulates your body core temperature using responsive micro-weave fleece while maintaining 4-way stretch flexibility.',
    ctaText: 'Shop Thermal Collection',
    estimatedDuration: 15,
    status: 'draft',
    warnings: [],
    hasDiscountClaim: false,
    updatedAt: '10 mins ago'
  },
  {
    id: 'draft_202',
    productId: 'prod_101',
    productTitle: 'Aura Thermal Compression Hoodie',
    productImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
    angleId: 'social_proof',
    angleName: 'Social Proof & Problem Solver',
    hookCopy: '"Replaced three bulky winter jackets with just one Aura hoodie!"',
    bodyCopy: 'Over 4,200 marathon runners and winter athletes trust Aura for lightweight warmth. Includes water-resistant zippered pockets.',
    ctaText: 'Claim Your Size',
    estimatedDuration: 15,
    status: 'draft',
    warnings: [],
    hasDiscountClaim: false,
    updatedAt: '10 mins ago'
  },
  {
    id: 'draft_203',
    productId: 'prod_101',
    productTitle: 'Aura Thermal Compression Hoodie',
    productImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
    angleId: 'urgency',
    angleName: 'Urgency & Limited Offer',
    hookCopy: 'Flash Fall Sale: Save 20% + Free Express Shipping ends tonight!',
    bodyCopy: 'Stock is down to final 142 units in Black & Charcoal. Grab your Aura Compression Hoodie before the seasonal price restock.',
    ctaText: 'Unlock 20% Discount',
    estimatedDuration: 15,
    status: 'draft',
    warnings: ['⚠️ Unverified Discount Claim: Ensure 20% promo code is active in Shopify Discounts.'],
    hasDiscountClaim: true,
    discountValue: '20% OFF',
    updatedAt: '10 mins ago'
  },
  {
    id: 'draft_204',
    productId: 'prod_103',
    productTitle: 'Vanguard ANC Wireless Headphones',
    productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    angleId: 'benefit',
    angleName: 'Benefit & Core Value',
    hookCopy: 'Silence the noise. Amplify your focus with 45dB Active Cancellation.',
    bodyCopy: 'Featuring custom 40mm beryllium drivers and 50-hour battery stamina, Vanguard delivers studio-grade acoustics anywhere.',
    ctaText: 'Experience Pure Sound',
    estimatedDuration: 20,
    status: 'approved',
    warnings: [],
    hasDiscountClaim: false,
    updatedAt: '1 hour ago'
  }
];

// Helper to construct realistic mock jobs matching prompt stats: 300 total (212 completed, 64 rendering, 21 queued, 3 failed)
const generateMockRenderJobs = (): RenderJob[] => {
  const jobs: RenderJob[] = [];
  const productsList = [
    { id: 'prod_101', title: 'Aura Thermal Compression Hoodie', img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80' },
    { id: 'prod_102', title: 'Nordic Minimalist Desk Mat', img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80' },
    { id: 'prod_103', title: 'Vanguard ANC Wireless Headphones', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80' },
    { id: 'prod_104', title: 'HydraGlow Peptide Facial Serum', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80' },
    { id: 'prod_105', title: 'Ergonomic Breathable Mesh Chair', img: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=600&q=80' },
    { id: 'prod_106', title: 'Starlight Ceramic Pour-Over Kettle', img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80' }
  ];

  const angles = ['Benefit & Core Value', 'Social Proof & Problem Solver', 'Urgency & Limited Offer'];

  // 3 Failed Jobs (Explicit error reasons as requested)
  const failedReasons = [
    'High motion complexity exceeded memory threshold (Zvid Node 04)',
    'Low-resolution source image asset (under 1080p requirement)',
    'Neural voiceover audio sync timeout (504 Gateway)'
  ];

  failedReasons.forEach((reason, idx) => {
    const prod = productsList[idx % productsList.length];
    jobs.push({
      id: `job_zvid_fail_${idx + 1}`,
      draftId: `draft_fail_${idx + 1}`,
      productId: prod.id,
      productTitle: prod.title,
      productImage: prod.img,
      angleName: angles[idx % angles.length],
      status: 'failed',
      progress: Math.floor(20 + idx * 25),
      currentStage: 'Render Interrupted — Pipeline Error',
      duration: 15,
      creditsUsed: 0,
      createdAt: '12 mins ago',
      startedAt: '09:24:10 AM',
      errorReason: reason
    });
  });

  // 64 Rendering Jobs
  const renderingStages = [
    'Initializing Zvid GPU Scene Canvas & Mesh Assets',
    'Synthesizing AI Voiceover & Audio Track (Zvid Engine)',
    'Applying Motion Blur & Lighting Effects',
    'Stitching MP4 Video & Aligning Subtitles'
  ];

  for (let i = 1; i <= 64; i++) {
    const prod = productsList[i % productsList.length];
    const angle = angles[i % angles.length];
    const progress = Math.floor(12 + ((i * 13) % 78));
    const stageIdx = Math.min(3, Math.floor(progress / 25));
    jobs.push({
      id: `job_zvid_rnd_${100 + i}`,
      draftId: `draft_rnd_${100 + i}`,
      productId: prod.id,
      productTitle: prod.title,
      productImage: prod.img,
      angleName: angle,
      status: 'rendering',
      progress: progress,
      currentStage: renderingStages[stageIdx],
      duration: 15,
      creditsUsed: 15,
      createdAt: `${Math.floor(i / 10) + 1} mins ago`,
      startedAt: `09:${(30 + (i % 20)).toString().padStart(2, '0')}:15 AM`
    });
  }

  // 24 Queued Jobs
  for (let i = 1; i <= 24; i++) {
    const prod = productsList[i % productsList.length];
    const angle = angles[i % angles.length];
    jobs.push({
      id: `job_zvid_q_${200 + i}`,
      draftId: `draft_q_${200 + i}`,
      productId: prod.id,
      productTitle: prod.title,
      productImage: prod.img,
      angleName: angle,
      status: 'queued',
      progress: 0,
      currentStage: 'Queued in Zvid Render Cluster Queue',
      duration: 15,
      creditsUsed: 15,
      createdAt: 'Just now'
    });
  }

  // 212 Completed Jobs
  for (let i = 1; i <= 212; i++) {
    const prod = productsList[i % productsList.length];
    const angle = angles[i % angles.length];
    jobs.push({
      id: `job_zvid_c_${500 + i}`,
      draftId: `draft_c_${500 + i}`,
      productId: prod.id,
      productTitle: prod.title,
      productImage: prod.img,
      angleName: angle,
      status: 'completed',
      progress: 100,
      currentStage: 'Render Complete & Pushed to Video Library',
      duration: 15,
      creditsUsed: 15,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      createdAt: `${Math.floor(i / 5)} mins ago`,
      startedAt: `08:${(10 + (i % 40)).toString().padStart(2, '0')}:00 AM`,
      completedAt: `08:${(12 + (i % 40)).toString().padStart(2, '0')}:24 AM`
    });
  }

  return jobs;
};

export const initialRenderJobs: RenderJob[] = generateMockRenderJobs();

export const initialVideos: VideoAsset[] = [
  {
    id: 'vid_901',
    productId: 'prod_101',
    productTitle: 'Aura Thermal Compression Hoodie',
    productImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
    angleName: 'Benefit & Core Value',
    sku: 'SKU: ATH-101-BLK',
    category: 'Benefit-Led',
    thumbnail: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '0:15',
    resolution: '1080x1920 (9:16 vertical)',
    status: 'pushed_to_shopify',
    views: 14200,
    ctr: '4.8%',
    conversions: 184,
    createdAt: 'Just now'
  },
  {
    id: 'vid_902',
    productId: 'prod_102',
    productTitle: 'Nordic Minimalist Desk Mat',
    productImage: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    angleName: 'Product-Led Spotlight',
    sku: 'SKU: NDM-202-VGN',
    category: 'Product-Led',
    thumbnail: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: '0:15',
    resolution: '1080x1920 (9:16 vertical)',
    status: 'ready',
    views: 8900,
    ctr: '3.9%',
    conversions: 92,
    createdAt: '12 mins ago'
  },
  {
    id: 'vid_903',
    productId: 'prod_103',
    productTitle: 'Vanguard ANC Wireless Headphones',
    productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    angleName: 'Urgency & Limited Offer',
    sku: 'SKU: VNG-303-SLV',
    category: 'Offer-Led',
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: '0:20',
    resolution: '1080x1920 (9:16 vertical)',
    status: 'ready',
    views: 12400,
    ctr: '5.2%',
    conversions: 210,
    createdAt: '45 mins ago'
  },
  {
    id: 'vid_904',
    productId: 'prod_104',
    productTitle: 'HydraGlow Peptide Facial Serum',
    productImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    angleName: 'Benefit & Core Value',
    sku: 'SKU: HYD-404-GLW',
    category: 'Benefit-Led',
    thumbnail: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    duration: '0:15',
    resolution: '1080x1920 (9:16 vertical)',
    status: 'pushed_to_shopify',
    views: 28400,
    ctr: '6.1%',
    conversions: 342,
    createdAt: '2 hours ago'
  },
  {
    id: 'vid_905',
    productId: 'prod_105',
    productTitle: 'Ergonomic Breathable Mesh Chair',
    productImage: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=600&q=80',
    angleName: 'Product-Led Overview',
    sku: 'SKU: CHR-505-MSH',
    category: 'Product-Led',
    thumbnail: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    duration: '0:15',
    resolution: '1080x1920 (9:16 vertical)',
    status: 'ready',
    views: 6500,
    ctr: '4.1%',
    conversions: 78,
    createdAt: 'Yesterday'
  },
  {
    id: 'vid_906',
    productId: 'prod_106',
    productTitle: 'Starlight Ceramic Pour-Over Kettle',
    productImage: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
    angleName: 'Flash Promo Discount',
    sku: 'SKU: KTL-606-CRM',
    category: 'Offer-Led',
    thumbnail: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    duration: '0:15',
    resolution: '1080x1920 (9:16 vertical)',
    status: 'ready',
    views: 19800,
    ctr: '5.8%',
    conversions: 289,
    createdAt: '2 days ago'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Products Synced Successfully',
    message: 'Products synced successfully. 148 product items and images updated from Shopify.',
    time: '12 mins ago',
    type: 'success',
    read: false
  },
  {
    id: 'notif_2',
    title: 'Approval Required',
    message: 'Approval required for 24 creatives awaiting merchant script review.',
    time: '35 mins ago',
    type: 'warning',
    read: false
  },
  {
    id: 'notif_3',
    title: 'Rendering Dispatched',
    message: 'Rendering started for 120 videos on Zvid GPU scene cluster.',
    time: '1 hour ago',
    type: 'info',
    read: false
  },
  {
    id: 'notif_4',
    title: 'Render Error Warning',
    message: '3 rendering jobs failed due to low-resolution source images.',
    time: '2 hours ago',
    type: 'critical',
    read: false
  },
  {
    id: 'notif_5',
    title: 'Credit Usage Notice',
    message: 'Your credit balance is running low. 1,450 credits remaining.',
    time: 'Yesterday',
    type: 'warning',
    read: true
  }
];
