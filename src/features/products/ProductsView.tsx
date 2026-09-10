import React, { useState } from 'react';
import { 
  Search, 
  RefreshCw, 
  Wand2, 
  CheckSquare, 
  Sparkles, 
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  FileText
} from 'lucide-react';
import type { ShopifyProduct, StoreContext, ActiveTab } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import type { StatusType } from '../../components/common/StatusBadge';
import { ProductDetailModal } from './ProductDetailModal';

interface ProductsViewProps {
  products: ShopifyProduct[];
  storeContext: StoreContext;
  onSyncCatalog: () => void;
  isSyncing: boolean;
  onGenerateAnglesForSelected: (selectedProducts: ShopifyProduct[]) => void;
  onNavigate?: (tab: ActiveTab) => void;
}

type FilterType = 
  | 'all' 
  | 'eligible' 
  | 'ineligible' 
  | 'missing_image' 
  | 'missing_price' 
  | 'missing_description' 
  | 'draft_generated' 
  | 'awaiting_approval' 
  | 'rendering' 
  | 'completed';

export const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  storeContext,
  onSyncCatalog,
  isSyncing,
  onGenerateAnglesForSelected,
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [activeDetailProduct, setActiveDetailProduct] = useState<ShopifyProduct | null>(null);
  const [syncToastMessage, setSyncToastMessage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Filter definitions with easy scanning labels
  const filterPills: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'eligible', label: 'Eligible' },
    { id: 'ineligible', label: 'Ineligible' },
    { id: 'missing_image', label: 'Missing Image' },
    { id: 'missing_price', label: 'Missing Price' },
    { id: 'missing_description', label: 'Missing Description' },
    { id: 'draft_generated', label: 'Draft Generated' },
    { id: 'awaiting_approval', label: 'Awaiting Approval' },
    { id: 'rendering', label: 'Rendering' },
    { id: 'completed', label: 'Completed' }
  ];

  // Helper map for status types
  const getCreativeStatus = (product: ShopifyProduct): StatusType => {
    if (product.syncStatus === 'synced' && product.aiEligibility === 'eligible') {
      return 'not_generated';
    }
    if (product.aiEligibility === 'needs_images' || product.aiEligibility === 'unsupported_category') {
      return 'needs_images';
    }
    return 'not_generated';
  };

  // Filter logic
  const filteredProducts = products.filter(p => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      p.title.toLowerCase().includes(term) || 
      p.handle.toLowerCase().includes(term) ||
      p.id.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term);

    if (!matchesSearch) return false;

    switch (activeFilter) {
      case 'eligible':
        return p.aiEligibility === 'eligible';
      case 'ineligible':
        return p.aiEligibility === 'needs_images' || p.aiEligibility === 'unsupported_category';
      case 'missing_image':
        return !p.image || p.aiEligibility === 'needs_images';
      case 'missing_price':
        return !p.price || p.price === '$0.00';
      case 'missing_description':
        return p.inventory === 0;
      case 'draft_generated':
        return p.syncStatus === 'pending';
      case 'awaiting_approval':
        return p.id === 'prod_101' || p.id === 'prod_103';
      case 'rendering':
        return p.id === 'prod_102';
      case 'completed':
        return p.id === 'prod_104';
      default:
        return true;
    }
  });

  // Pagination bounds
  const totalItems = filteredProducts.length;
  const startRange = (currentPage - 1) * pageSize + 1;
  const endRange = Math.min(currentPage * pageSize, totalItems);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Selection handlers
  const toggleSelectAll = () => {
    if (selectedProductIds.length === paginatedProducts.length && paginatedProducts.length > 0) {
      setSelectedProductIds([]);
    } else {
      setSelectedProductIds(paginatedProducts.map(p => p.id));
    }
  };

  const toggleSelectOne = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProductIds.includes(id)) {
      setSelectedProductIds(selectedProductIds.filter(item => item !== id));
    } else {
      setSelectedProductIds([...selectedProductIds, id]);
    }
  };

  const handleSyncClick = () => {
    onSyncCatalog();
    setSyncToastMessage('Syncing products...');
    setTimeout(() => {
      setSyncToastMessage('Products synced successfully.');
      setTimeout(() => setSyncToastMessage(null), 3000);
    }, 1500);
  };

  const handleBulkGenerate = () => {
    const selected = products.filter(p => selectedProductIds.includes(p.id));
    onGenerateAnglesForSelected(selected);
  };

  // 8 Skeleton Table Rows Loading State
  if (isLoading || isSyncing) {
    return (
      <div>
        <div className="page-header" style={{ marginBottom: '20px' }}>
          <div>
            <div className="skeleton" style={{ width: '180px', height: '28px', marginBottom: '8px' }} />
            <div className="skeleton" style={{ width: '380px', height: '16px' }} />
          </div>
        </div>
        <div className="xora-card" style={{ padding: 0 }}>
          <div className="table-responsive">
            <table className="xora-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}><div className="skeleton" style={{ width: '16px', height: '16px' }} /></th>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Price</th>
                  <th>Inventory</th>
                  <th>Eligibility</th>
                  <th>Creative Status</th>
                  <th>Last Synced</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <tr key={i}>
                    <td><div className="skeleton" style={{ width: '16px', height: '16px' }} /></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="skeleton" style={{ width: '40px', height: '40px', borderRadius: '4px' }} />
                        <div>
                          <div className="skeleton" style={{ width: '160px', height: '16px', marginBottom: '4px' }} />
                          <div className="skeleton" style={{ width: '100px', height: '12px' }} />
                        </div>
                      </div>
                    </td>
                    <td><div className="skeleton" style={{ width: '80px', height: '14px' }} /></td>
                    <td><div className="skeleton" style={{ width: '50px', height: '14px' }} /></td>
                    <td><div className="skeleton" style={{ width: '70px', height: '14px' }} /></td>
                    <td><div className="skeleton" style={{ width: '60px', height: '20px', borderRadius: '10px' }} /></td>
                    <td><div className="skeleton" style={{ width: '90px', height: '20px', borderRadius: '10px' }} /></td>
                    <td><div className="skeleton" style={{ width: '70px', height: '14px' }} /></td>
                    <td style={{ textAlign: 'right' }}><div className="skeleton" style={{ width: '120px', height: '30px', borderRadius: '6px', marginLeft: 'auto' }} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Error State with Retry Action
  if (hasError) {
    return (
      <div style={{ padding: '60px 0', maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
        <div className="xora-card" style={{ padding: '40px 32px', backgroundColor: 'var(--xora-critical-light)', border: '1px solid var(--xora-critical)' }}>
          <ShoppingBag size={36} style={{ color: 'var(--xora-critical)', marginBottom: '16px' }} />
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--xora-text-primary)', marginBottom: '8px' }}>
            Unable to load products
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--xora-text-secondary)', lineHeight: 1.5, marginBottom: '24px' }}>
            Unable to load products. Please try again.
          </p>
          <button 
            className="btn btn-primary" 
            onClick={() => {
              setHasError(false);
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 800);
            }}
          >
            <RefreshCw size={16} /> Retry Loading Products
          </button>
        </div>
      </div>
    );
  }

  // Catalog Empty State (No Products in Store)
  if (products.length === 0) {
    return (
      <div style={{ padding: '60px 0', maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
        <div className="xora-card" style={{ padding: '40px 32px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'var(--xora-primary-light)',
            color: 'var(--xora-primary)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <ShoppingBag size={28} />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--xora-text-primary)', marginBottom: '8px' }}>
            No products found
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--xora-text-secondary)', lineHeight: 1.5, marginBottom: '24px' }}>
            No products found. Connect your Shopify store or sync your catalog.
          </p>
          <button className="btn btn-primary" onClick={handleSyncClick}>
            <RefreshCw size={16} className={isSyncing ? 'spin' : ''} /> Sync Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Sync Toast Notification */}
      {syncToastMessage && (
        <div style={{
          position: 'fixed',
          top: '76px',
          right: '24px',
          zIndex: 110,
          backgroundColor: 'var(--xora-header-bg)',
          color: 'white',
          padding: '10px 16px',
          borderRadius: 'var(--radius-btn)',
          boxShadow: 'var(--shadow-modal)',
          fontSize: '13px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <RefreshCw size={15} className={isSyncing ? 'spin' : ''} />
          {syncToastMessage}
        </div>
      )}

      {/* 1. Header */}
      <div className="page-header" style={{ marginBottom: '20px' }}>
        <div>
          <h1 className="page-title">Products</h1>
          <p className="page-subtitle">
            Manage your Shopify catalog and select products for creative generation.
          </p>
          <div style={{ fontSize: '12px', color: 'var(--xora-text-muted)', marginTop: '4px' }}>
            Last synced {storeContext.lastSync}
          </div>
        </div>

        <button 
          className="btn btn-primary" 
          onClick={handleSyncClick}
          disabled={isSyncing}
        >
          <RefreshCw size={16} className={isSyncing ? 'spin' : ''} />
          {isSyncing ? 'Syncing products...' : 'Sync Products'}
        </button>
      </div>

      {/* 2. Filter + Search Area */}
      <div className="xora-card" style={{ marginBottom: '20px' }}>
        <div className="xora-card-body" style={{ padding: '16px' }}>
          {/* Search Input */}
          <div style={{ position: 'relative', marginBottom: '14px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--xora-text-muted)' }} />
            <input 
              type="text"
              className="xora-input"
              placeholder="Search products, SKU, or product ID"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              style={{ paddingLeft: '36px', width: '100%' }}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '8px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--xora-text-muted)',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filter Pills (Easy to Scan) */}
          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            overflowX: 'auto', 
            paddingBottom: '4px',
            alignItems: 'center' 
          }}>
            {filterPills.map((pill) => (
              <button
                key={pill.id}
                onClick={() => {
                  setActiveFilter(pill.id);
                  setCurrentPage(1);
                }}
                style={{
                  padding: '5px 12px',
                  fontSize: '12.5px',
                  fontWeight: activeFilter === pill.id ? 600 : 500,
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid ' + (activeFilter === pill.id ? 'var(--xora-primary)' : 'var(--xora-border)'),
                  backgroundColor: activeFilter === pill.id ? 'var(--xora-primary-light)' : 'var(--xora-surface)',
                  color: activeFilter === pill.id ? 'var(--xora-primary)' : 'var(--xora-text-primary)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Products Table & Mobile Cards */}
      {filteredProducts.length === 0 ? (
        /* No Search Results State */
        <div className="xora-card" style={{ textAlign: 'center', padding: '48px 20px' }}>
          <Search size={32} style={{ color: 'var(--xora-text-muted)', marginBottom: '12px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--xora-text-primary)', marginBottom: '6px' }}>
            No products match your search
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--xora-text-secondary)', marginBottom: '16px' }}>
            Try adjusting your search query or filter selection.
          </p>
          <button 
            className="btn btn-secondary"
            onClick={() => {
              setSearchTerm('');
              setActiveFilter('all');
            }}
          >
            Clear search
          </button>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="xora-card" style={{ marginBottom: '16px', padding: 0 }}>
            <div className="table-responsive">
              <table className="xora-table">
                <thead>
                  <tr>
                    <th style={{ width: '40px', textAlign: 'center' }}>
                      <input 
                        type="checkbox"
                        aria-label="Select all products on page"
                        checked={selectedProductIds.length === paginatedProducts.length && paginatedProducts.length > 0}
                        onChange={toggleSelectAll}
                        style={{ cursor: 'pointer' }}
                      />
                    </th>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Price</th>
                    <th>Inventory</th>
                    <th>Eligibility</th>
                    <th>Creative Status</th>
                    <th>Last Synced</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.map((product) => {
                    const isSelected = selectedProductIds.includes(product.id);
                    const creativeStatus = getCreativeStatus(product);

                    return (
                      <tr 
                        key={product.id}
                        onClick={() => setActiveDetailProduct(product)}
                        style={{ 
                          cursor: 'pointer',
                          backgroundColor: isSelected ? 'var(--xora-primary-light)' : undefined 
                        }}
                      >
                        <td 
                          style={{ textAlign: 'center' }}
                          onClick={(e) => toggleSelectOne(product.id, e)}
                        >
                          <input 
                            type="checkbox"
                            aria-label={`Select ${product.title}`}
                            checked={isSelected}
                            onChange={() => {}}
                            style={{ cursor: 'pointer' }}
                          />
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img 
                              src={product.image} 
                              alt={product.title} 
                              style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} 
                            />
                            <div>
                              <div style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--xora-text-primary)' }}>
                                {product.title}
                              </div>
                              <div style={{ fontSize: '11.5px', color: 'var(--xora-text-secondary)' }}>
                                ID: {product.id} • {product.category}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td style={{ fontSize: '12px', fontFamily: 'monospace', color: 'var(--xora-text-secondary)' }}>
                          {product.handle.toUpperCase()}
                        </td>
                        <td style={{ fontWeight: 600, fontSize: '13px' }}>
                          {product.price}
                        </td>
                        <td style={{ fontSize: '13px', color: product.inventory === 0 ? 'var(--xora-critical)' : 'var(--xora-text-primary)' }}>
                          {product.inventory > 0 ? `${product.inventory} in stock` : 'Out of stock'}
                        </td>
                        <td>
                          <StatusBadge status={product.aiEligibility === 'eligible' ? 'eligible' : 'needs_images'} />
                        </td>
                        <td>
                          <StatusBadge status={creativeStatus} />
                        </td>
                        <td style={{ fontSize: '12px', color: 'var(--xora-text-secondary)' }}>
                          {storeContext.lastSync}
                        </td>
                        <td style={{ textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                          <button 
                            className="btn btn-primary btn-sm"
                            onClick={() => onGenerateAnglesForSelected([product])}
                          >
                            <Wand2 size={13} /> Generate 3 Angles
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Controls Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            backgroundColor: 'var(--xora-surface)',
            border: '1px solid var(--xora-border)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '24px',
            fontSize: '13px',
            color: 'var(--xora-text-secondary)'
          }}>
            <div>
              Showing <strong>{totalItems > 0 ? startRange : 0}–{endRange}</strong> of <strong>{totalItems.toLocaleString()}</strong> products
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Rows per page:</span>
                <select 
                  className="xora-select" 
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  style={{ width: '64px', padding: '2px 6px', fontSize: '12px' }}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button 
                  className="btn btn-secondary btn-sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                  <ChevronLeft size={14} /> Previous
                </button>
                <span style={{ fontWeight: 600, color: 'var(--xora-text-primary)' }}>
                  Page {currentPage} of {Math.ceil(totalItems / pageSize) || 1}
                </span>
                <button 
                  className="btn btn-secondary btn-sm"
                  disabled={currentPage >= Math.ceil(totalItems / pageSize)}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 4. Sticky Bulk Action Bar (When 1+ Rows Selected) */}
      {selectedProductIds.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          backgroundColor: 'var(--xora-header-bg)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: 'var(--radius-panel)',
          boxShadow: 'var(--shadow-modal)',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          animation: 'slideUp 0.2s ease'
        }}>
          <div style={{ fontWeight: 600, fontSize: '14px' }}>
            <span style={{ color: '#34d399' }}>{selectedProductIds.length}</span> products selected
          </div>

          <div style={{ height: '20px', width: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button 
              className="btn btn-primary"
              onClick={handleBulkGenerate}
            >
              <Sparkles size={16} /> Generate creatives for {selectedProductIds.length} products
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => alert(`Bulk reviewing ${selectedProductIds.length} items.`)}
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <CheckSquare size={15} /> Review
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => alert(`Exporting catalog metadata for ${selectedProductIds.length} products.`)}
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <FileText size={15} /> Export
            </button>
            <button 
              className="icon-btn"
              onClick={() => setSelectedProductIds([])}
              title="Clear selection"
              style={{ color: 'rgba(255,255,255,0.7)', marginLeft: '6px' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* 5. Product Detail Modal / Drawer (/products/:productId) */}
      {activeDetailProduct && (
        <ProductDetailModal
          product={activeDetailProduct}
          storeContext={storeContext}
          onClose={() => setActiveDetailProduct(null)}
          onNavigate={onNavigate || (() => {})}
          onGenerateAngles={(prod) => onGenerateAnglesForSelected([prod])}
        />
      )}
    </div>
  );
};
