import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryShortcuts } from './components/CategoryShortcuts';
import { PopularCombos } from './components/PopularCombos';
import { ExclusiveOfferBanner } from './components/ExclusiveOfferBanner';
import { BottomNavBar, NavTab } from './components/BottomNavBar';
import { CartDrawer } from './components/CartDrawer';
import { SideMenuDrawer } from './components/SideMenuDrawer';
import { NotificationPopover } from './components/NotificationPopover';
import { FilterModal } from './components/FilterModal';
import { MenuPage } from './pages/MenuPage';
import { OffersPage } from './pages/OffersPage';
import { OrdersPage } from './pages/OrdersPage';
import { ProfilePage } from './pages/ProfilePage';
import { HyperOSCustomizerModal } from './components/HyperOSCustomizerModal';
import {
  HERO_SLIDES,
  CATEGORIES,
  POPULAR_COMBOS,
  NOTIFICATIONS,
} from './data/mockData';
import { ProductItem, HeroSlide, CartItem, NotificationItem } from './types';
import { filterProducts, toggleFavoriteId } from './utils/orderLogic';
import {
  DockSettings,
  DEFAULT_DOCK_SETTINGS,
  getLiquidGlassPresetStyles,
} from './utils/liquidNavPhysics';
import { motion, AnimatePresence } from 'motion/react';
import { Check, SlidersHorizontal, Sparkles, Zap } from 'lucide-react';

export default function App() {
  // Navigation: Home, Menu, Offers, Orders, Profile
  const [activeTab, setActiveTab] = useState<NavTab>('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Xiaomi HyperOS 3 Liquid Glass Dock Settings
  const [dockSettings, setDockSettings] = useState<DockSettings>(DEFAULT_DOCK_SETTINGS);

  // Search & Filtering States for Homepage
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSpice, setSelectedSpice] = useState('All Spices');
  const [sortBy, setSortBy] = useState('default');

  // Favorites & Cart States
  const [favorites, setFavorites] = useState<string[]>(['combo-1']);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: POPULAR_COMBOS[0], quantity: 1 },
  ]);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [recentlyAddedIds, setRecentlyAddedIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS);

  // Feedback Toast Helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Add Product to Cart with tactile animation
  const handleAddToCart = (product: ProductItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    // Animate button checkmark
    setRecentlyAddedIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setRecentlyAddedIds((prev) => prev.filter((id) => id !== product.id));
    }, 1400);

    showToast(`Added "${product.name}" to your order bag!`);
  };

  // Add Hero Slide Meal to Cart
  const handleOrderSlideMeal = (slide: HeroSlide) => {
    const mealItem: ProductItem = {
      id: `hero-${slide.id}`,
      name: slide.comboName,
      category: 'Buckets',
      image: slide.image,
      badge: slide.badge,
      description: slide.subheadline,
      rating: 4.9,
      price: slide.price,
    };
    handleAddToCart(mealItem);
  };

  // Claim 30% Exclusive Offer
  const handleClaimExclusiveOffer = (meal: ProductItem) => {
    setIsDiscountApplied(true);
    handleAddToCart(meal);
    showToast('30% OFF Exclusive Voucher applied to your bag!');
  };

  // Quantity updates in Cart
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Favorite toggle
  const handleToggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const updated = toggleFavoriteId(prev, productId);
      const isNowFav = updated.includes(productId);
      showToast(isNowFav ? 'Saved to your favorites!' : 'Removed from favorites');
      return updated;
    });
  };

  // Mark notifications read
  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Filtered & Sorted Combos for Homepage
  const filteredProducts = useMemo(() => {
    let result = filterProducts(POPULAR_COMBOS, selectedCategory, searchQuery);

    if (selectedSpice !== 'All Spices') {
      result = result.filter((p) => p.spiceLevel === selectedSpice);
    }

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, searchQuery, selectedSpice, sortBy]);

  // Tab change handler (RedotPay style page navigation)
  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeFilterCount =
    (selectedSpice !== 'All Spices' ? 1 : 0) + (sortBy !== 'default' ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#FFF8EF] text-[#171717] flex flex-col relative selection:bg-[#C90024] selection:text-white">
      {/* TOP HEADER */}
      <Header
        cartCount={totalCartCount}
        unreadNotificationsCount={unreadCount}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen((prev) => !prev)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Notification Dropdown Popover */}
      <NotificationPopover
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllRead}
      />

      {/* MAIN CONTENT AREA - SWITCHES PAGES ACCORDING TO BOTTOM NAV TAB */}
      <main className="flex-1 pb-36 sm:pb-40">
        {activeTab === 'Home' && (
          <div>
            {/* B. SEARCH BAR */}
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onOpenFilters={() => setIsFilterModalOpen(true)}
              activeFilterCount={activeFilterCount}
            />

            {/* C. PREMIUM HERO BANNER — MOST IMPORTANT */}
            <HeroBanner
              slides={HERO_SLIDES}
              onOrderSlideMeal={handleOrderSlideMeal}
              onApplyVipDiscount={() => {
                setIsDiscountApplied(true);
                showToast('RedotPay 30% VIP Pass activated on your order bag!');
              }}
            />

            {/* D. FOOD CATEGORY SHORTCUTS — MAKE THEM BIGGER */}
            <div id="categories-section">
              <CategoryShortcuts
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => setSelectedCategory(cat)}
              />
            </div>

            {/* E. POPULAR COMBOS / BESTSELLERS */}
            <PopularCombos
              products={filteredProducts}
              favorites={favorites}
              addedProductIds={recentlyAddedIds}
              onToggleFavorite={handleToggleFavorite}
              onAddToCart={handleAddToCart}
              onViewAllClick={() => setActiveTab('Menu')}
            />

            {/* F. EXCLUSIVE OFFER BANNER */}
            <div id="exclusive-offers">
              <ExclusiveOfferBanner onClaimOffer={handleClaimExclusiveOffer} />
            </div>

            {/* XIAOMI HYPEROS 3 LIQUID GLASS DOCK STUDIO WIDGET */}
            <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-[#171717] rounded-3xl p-5 sm:p-7 border border-neutral-800 shadow-xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#C90024]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div className="max-w-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-[#C90024] text-white">
                        Xiaomi HyperOS 3
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                        Liquid Glass Navigation
                      </span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                      Grab, Slide & Fling with Kinetic Power
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 mt-1">
                      Hold and slide the white liquid glass circle on the bottom dock. Fling it with force to leap across to Menu, Offers, Orders, or Profile based on your applied velocity!
                    </p>

                    {/* Quick Preset Pills */}
                    <div className="flex flex-wrap items-center gap-2 mt-4">
                      <span className="text-[11px] font-semibold text-neutral-400 mr-1">Presets:</span>
                      {[
                        { id: 'hyperos-liquid' as const, label: 'HyperOS 3 Liquid' },
                        { id: 'porsche-crimson' as const, label: 'Guards Crimson' },
                        { id: 'obsidian-stealth' as const, label: 'Obsidian Stealth' },
                        { id: 'hyper-chrome' as const, label: 'Hyper Chrome' },
                      ].map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setDockSettings((prev) => ({ ...prev, preset: p.id }))}
                          className={`text-xs px-3 py-1 rounded-full border transition-all cursor-pointer ${
                            dockSettings.preset === p.id
                              ? 'bg-white text-neutral-900 border-white font-bold shadow-xs'
                              : 'bg-white/10 hover:bg-white/20 border-white/10 text-neutral-300'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 shrink-0">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
                      <Zap className="w-3.5 h-3.5 text-[#C90024]" />
                      <span>Sensitivity: <strong className="text-white">{dockSettings.powerMultiplier}x</strong></span>
                    </div>
                    <button
                      onClick={() => setIsCustomizerOpen(true)}
                      className="px-5 py-2.5 rounded-full bg-[#C90024] hover:bg-[#8F001B] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#C90024]/30 flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>Customize Menu Dock</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Brand Heritage & Quality Assurance Badge Bar */}
            <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#F9EBDD] grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <span className="w-8 h-8 rounded-full bg-[#FFF1E5] text-[#C90024] flex items-center justify-center font-bold text-xs mb-2">
                    01
                  </span>
                  <h5 className="font-display text-sm font-bold text-[#171717]">
                    Triple Buttermilk Dredge
                  </h5>
                  <p className="text-xs text-[#292929]/65 mt-0.5">
                    Marinated for 24 hours for tender, mouthwatering bite.
                  </p>
                </div>

                <div className="flex flex-col items-center border-t sm:border-t-0 sm:border-x border-[#F9EBDD] pt-4 sm:pt-0">
                  <span className="w-8 h-8 rounded-full bg-[#FFF1E5] text-[#C90024] flex items-center justify-center font-bold text-xs mb-2">
                    02
                  </span>
                  <h5 className="font-display text-sm font-bold text-[#171717]">
                    Precision Pressure Fry
                  </h5>
                  <p className="text-xs text-[#292929]/65 mt-0.5">
                    Seals in moisture with ultra-crisp golden exterior.
                  </p>
                </div>

                <div className="flex flex-col items-center border-t sm:border-t-0 border-[#F9EBDD] pt-4 sm:pt-0">
                  <span className="w-8 h-8 rounded-full bg-[#FFF1E5] text-[#C90024] flex items-center justify-center font-bold text-xs mb-2">
                    03
                  </span>
                  <h5 className="font-display text-sm font-bold text-[#171717]">
                    Aerodynamic Delivery Velocity
                  </h5>
                  <p className="text-xs text-[#292929]/65 mt-0.5">
                    Thermal sealed containers ensure piping hot arrival.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* MENU PAGE */}
        {activeTab === 'Menu' && (
          <MenuPage
            favorites={favorites}
            addedProductIds={recentlyAddedIds}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={handleAddToCart}
            initialCategory={selectedCategory}
          />
        )}

        {/* OFFERS PAGE */}
        {activeTab === 'Offers' && (
          <OffersPage
            onApplyVipDiscount={() => {
              setIsDiscountApplied(true);
              showToast('30% VIP Voucher applied to your bag!');
            }}
            isDiscountApplied={isDiscountApplied}
          />
        )}

        {/* ORDERS PAGE */}
        {activeTab === 'Orders' && (
          <OrdersPage
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onAddToCart={handleAddToCart}
            isDiscountApplied={isDiscountApplied}
            onCheckout={() => {
              setCartItems([]);
              showToast('Order confirmed! Stuttgart kitchen is preparing your feast.');
            }}
            onNavigateToMenu={() => setActiveTab('Menu')}
          />
        )}

        {/* PROFILE PAGE (WITH REDOTPAY HIDE BUTTON) */}
        {activeTab === 'Profile' && (
          <ProfilePage
            onApplyVipDiscount={() => {
              setIsDiscountApplied(true);
              showToast('30% VIP Voucher applied to your account!');
            }}
            showToast={showToast}
          />
        )}
      </main>

      {/* G. BOTTOM NAVIGATION BAR (Xiaomi HyperOS 3 Liquid Glass Navigation Model) */}
      <BottomNavBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        cartCount={totalCartCount}
        settings={dockSettings}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* HyperOS 3 Dock & Menu Customizer Modal */}
      <HyperOSCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        settings={dockSettings}
        onUpdateSettings={setDockSettings}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        isDiscountApplied={isDiscountApplied}
        onToggleDiscount={() => setIsDiscountApplied((prev) => !prev)}
        onCheckout={() => {
          setIsCartOpen(false);
          setCartItems([]);
          showToast('Order confirmed! Stuttgart kitchen is preparing your feast.');
        }}
      />

      {/* Slide-out Side Menu Drawer */}
      <SideMenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectCategoryFromMenu={(cat) => {
          setSelectedCategory(cat);
          setActiveTab('Menu');
        }}
      />

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        selectedSpice={selectedSpice}
        onSelectSpice={setSelectedSpice}
        sortBy={sortBy}
        onSelectSortBy={setSortBy}
        onResetFilters={() => {
          setSelectedSpice('All Spices');
          setSortBy('default');
        }}
      />

      {/* Floating Tactile Feedback Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 sm:px-5 py-2.5 rounded-full bg-[#171717] text-white text-xs sm:text-sm font-semibold shadow-2xl flex items-center gap-2 border border-white/10"
          >
            <div className="w-5 h-5 rounded-full bg-[#C90024] text-white flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
