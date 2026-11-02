import React, { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Heart, Plus, Check, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { ProductItem } from '../types';
import { calculateTilt, getResetTilt, TiltCalculationResult } from '../utils/tiltLogic';

interface PopularCombosProps {
  products: ProductItem[];
  favorites: string[];
  addedProductIds: string[];
  onToggleFavorite: (productId: string) => void;
  onAddToCart: (product: ProductItem) => void;
  onViewAllClick: () => void;
}

const ProductTiltCard: React.FC<{
  product: ProductItem;
  isFavorited: boolean;
  isJustAdded: boolean;
  onToggleFavorite: (productId: string) => void;
  onAddToCart: (product: ProductItem) => void;
}> = ({ product, isFavorited, isJustAdded, onToggleFavorite, onAddToCart }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltCalculationResult>(getResetTilt());
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const result = calculateTilt(e.clientX, e.clientY, rect, 8);
    setTilt(result);
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt(getResetTilt());
  };

  return (
    <div
      style={{ perspective: '900px' }}
      className="shrink-0"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-[285px] sm:w-[320px] md:w-[340px] bg-white rounded-3xl p-4 sm:p-5 shadow-xs hover:shadow-2xl hover:shadow-black/10 border border-[#F9EBDD] flex flex-col justify-between relative group transition-all duration-200"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(${
            isHovered ? '1.02' : '1'
          }, ${isHovered ? '1.02' : '1'}, 1)`,
          scrollSnapAlign: 'start',
        }}
      >
        {/* RedotPay Dynamic Glare / Spotlight Sheen */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300 z-20"
          style={{
            opacity: tilt.glareOpacity * 0.45,
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(201, 0, 36, 0.12) 0%, rgba(255, 255, 255, 0.4) 25%, transparent 60%)`,
          }}
        />

        <div>
          {/* Image & Badges Container */}
          <div
            className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-[#FFF1E5] mb-4"
            style={{ transform: 'translateZ(20px)' }}
          >
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Gradient Scrim for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Badge */}
            {product.badge && (
              <div className="absolute top-3 left-3 z-10">
                <span
                  className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-xs ${
                    product.badgeType === 'bestseller'
                      ? 'bg-[#C90024] text-white guards-red-glow'
                      : product.badgeType === 'popular'
                      ? 'bg-[#171717] text-white'
                      : 'bg-[#8F001B] text-white'
                  }`}
                >
                  {product.badge}
                </span>
              </div>
            )}

            {/* Heart / Favorite Button */}
            <motion.button
              whileTap={{ scale: 0.82 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => onToggleFavorite(product.id)}
              aria-label={`Favorite ${product.name}`}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white backdrop-blur-sm shadow-xs flex items-center justify-center text-[#292929] transition-colors cursor-pointer"
            >
              <Heart
                className={`w-4.5 h-4.5 transition-colors ${
                  isFavorited
                    ? 'fill-[#C90024] text-[#C90024]'
                    : 'text-[#292929]/70 group-hover:text-[#C90024]'
                }`}
              />
            </motion.button>

            {/* Rating Tag */}
            <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-xs font-semibold flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              {product.reviewsCount && (
                <span className="text-white/60 text-[10px]">({product.reviewsCount})</span>
              )}
            </div>
          </div>

          {/* Product Name & Description */}
          <h4
            className="font-display text-lg sm:text-xl font-bold text-[#171717] tracking-tight mb-1.5 group-hover:text-[#C90024] transition-colors"
            style={{ transform: 'translateZ(15px)' }}
          >
            {product.name}
          </h4>

          <p className="text-xs sm:text-sm text-[#292929]/70 line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        {/* Price & Red Circular Plus Button */}
        <div
          className="pt-2 border-t border-[#F9EBDD]/60 flex items-center justify-between"
          style={{ transform: 'translateZ(25px)' }}
        >
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-xl sm:text-2xl font-black text-[#171717] tabular-nums">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#292929]/40 line-through tabular-nums">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.calories && (
              <span className="text-[10px] text-[#292929]/50 font-medium">
                {product.calories}
              </span>
            )}
          </div>

          {/* Red Circular Add-to-Cart Button with Tactile Feedback Animation */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            whileHover={{ scale: 1.08 }}
            onClick={() => onAddToCart(product)}
            aria-label={`Add ${product.name} to cart`}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer ${
              isJustAdded
                ? 'bg-[#171717] text-white scale-105'
                : 'bg-[#C90024] hover:bg-[#E31827] text-white guards-red-glow'
            }`}
          >
            <AnimatePresence mode="wait">
              {isJustAdded ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className="w-5 h-5 stroke-[2.5]" />
                </motion.div>
              ) : (
                <motion.div
                  key="plus"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export const PopularCombos: React.FC<PopularCombosProps> = ({
  products,
  favorites,
  addedProductIds,
  onToggleFavorite,
  onAddToCart,
  onViewAllClick,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-5 rounded-full bg-[#C90024]" />
            <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#171717]">
              Popular Combos
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#292929]/65 mt-0.5">
            Engineered for pure flavor and maximum crunch
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onViewAllClick}
            className="group flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#C90024] hover:text-[#8F001B] transition-colors cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Carousel Buttons */}
          <div className="hidden md:flex items-center gap-1.5 ml-2">
            <button
              onClick={() => scroll('left')}
              aria-label="Previous combo"
              className="w-8 h-8 rounded-full bg-white shadow-xs border border-[#F9EBDD] flex items-center justify-center text-[#292929] hover:text-[#C90024] hover:border-[#C90024]/40 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2]" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Next combo"
              className="w-8 h-8 rounded-full bg-white shadow-xs border border-[#F9EBDD] flex items-center justify-center text-[#292929] hover:text-[#C90024] hover:border-[#C90024]/40 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 stroke-[2]" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontally Scrollable Product Carousel with Smooth macOS Momentum */}
      <div
        ref={carouselRef}
        className="no-scrollbar flex items-stretch gap-4 sm:gap-6 overflow-x-auto scroll-smooth pb-4 pt-1 px-1 -mx-1"
        style={{ WebkitOverflowScrolling: 'touch', scrollSnapType: 'x mandatory' }}
      >
        {products.map((product) => (
          <ProductTiltCard
            key={product.id}
            product={product}
            isFavorited={favorites.includes(product.id)}
            isJustAdded={addedProductIds.includes(product.id)}
            onToggleFavorite={onToggleFavorite}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
};
