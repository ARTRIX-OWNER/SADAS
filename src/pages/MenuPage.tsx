import React, { useState, useMemo } from 'react';
import { Search, Flame, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { ALL_MENU_ITEMS, CATEGORIES } from '../data/mockData';
import { ProductItem } from '../types';
import { filterProducts } from '../utils/orderLogic';
import { motion } from 'motion/react';

interface MenuPageProps {
  favorites: string[];
  addedProductIds: string[];
  onToggleFavorite: (id: string) => void;
  onAddToCart: (product: ProductItem) => void;
  initialCategory?: string;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  favorites,
  addedProductIds,
  onToggleFavorite,
  onAddToCart,
  initialCategory = 'All',
}) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpice, setSelectedSpice] = useState('All Spices');

  const filteredItems = useMemo(() => {
    let items = filterProducts(ALL_MENU_ITEMS, selectedCategory, searchQuery);
    if (selectedSpice !== 'All Spices') {
      items = items.filter((item) => item.spiceLevel === selectedSpice);
    }
    return items;
  }, [selectedCategory, searchQuery, selectedSpice]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 animate-fadeIn">
      {/* Page Title & Tagline */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-6 rounded-full bg-[#C90024]" />
          <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-[#171717] uppercase">
            Culinary Menu Catalog
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#292929]/70">
          Precision-fried poultry, gourmet brioche burgers, and artisanal refreshments
        </p>
      </div>

      {/* Category Pills Strip */}
      <div className="no-scrollbar flex items-center gap-2 sm:gap-3 overflow-x-auto pb-3 mb-5">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.name;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap transition-colors cursor-pointer ${
                isActive ? 'text-white' : 'text-[#292929] hover:bg-[#FFF1E5] border border-[#F9EBDD] bg-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-menu-category-pill"
                  className="absolute inset-0 bg-gradient-to-r from-[#C90024] to-[#8F001B] rounded-full shadow-md shadow-[#C90024]/30"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Search & Quick Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-6">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#292929]/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search full menu..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#F9EBDD] text-xs sm:text-sm focus:outline-hidden focus:border-[#C90024]"
          />
        </div>

        {/* Spice Filter Selector */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {['All Spices', 'Mild', 'Medium', 'Carrera Hot', 'Turbo 911'].map((spice) => (
            <button
              key={spice}
              onClick={() => setSelectedSpice(spice)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedSpice === spice
                  ? 'bg-[#171717] text-white'
                  : 'bg-white text-[#292929]/70 border border-[#F9EBDD] hover:bg-[#FFF1E5]'
              }`}
            >
              {spice}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#F9EBDD] p-6">
          <p className="font-display text-base font-bold text-[#171717] mb-1">
            No dishes found matching your selection
          </p>
          <p className="text-xs text-[#292929]/60 mb-4">
            Try resetting your search query or selecting another category.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setSelectedSpice('All Spices');
            }}
            className="px-4 py-2 rounded-full bg-[#C90024] text-white text-xs font-bold guards-red-glow cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item) => {
            const isFav = favorites.includes(item.id);
            const isAdded = addedProductIds.includes(item.id);

            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl p-4 border border-[#F9EBDD] shadow-xs hover:shadow-xl flex flex-col justify-between group transition-all"
              >
                <div>
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-[#FFF1E5] mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {item.badge && (
                      <span className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider bg-[#C90024] text-white uppercase shadow-xs">
                        {item.badge}
                      </span>
                    )}

                    <button
                      onClick={() => onToggleFavorite(item.id)}
                      aria-label="Toggle favorite"
                      className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#292929] hover:text-[#C90024] cursor-pointer"
                    >
                      <span className={isFav ? 'text-[#C90024]' : 'text-[#292929]/60'}>
                        ♥
                      </span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-[#292929]/60 font-semibold mb-1">
                    <span>{item.category}</span>
                    {item.spiceLevel && (
                      <>
                        <span>·</span>
                        <span className="text-[#C90024] flex items-center gap-0.5">
                          <Flame className="w-3 h-3 inline" />
                          {item.spiceLevel}
                        </span>
                      </>
                    )}
                  </div>

                  <h4 className="font-display text-base font-bold text-[#171717] tracking-tight group-hover:text-[#C90024] transition-colors leading-snug mb-1">
                    {item.name}
                  </h4>

                  <p className="text-xs text-[#292929]/70 line-clamp-2 leading-relaxed mb-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F9EBDD]/60 flex items-center justify-between">
                  <div>
                    <span className="font-display text-lg font-black text-[#171717] tabular-nums">
                      ${item.price.toFixed(2)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs text-[#292929]/40 line-through ml-1.5 tabular-nums">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onAddToCart(item)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
                      isAdded
                        ? 'bg-[#171717] text-white'
                        : 'bg-[#C90024] hover:bg-[#E31827] text-white guards-red-glow'
                    }`}
                  >
                    {isAdded ? 'Added ✓' : '+ Add'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
