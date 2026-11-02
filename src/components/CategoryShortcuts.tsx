import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CategoryItem } from '../types';

interface CategoryShortcutsProps {
  categories: CategoryItem[];
  selectedCategory: string;
  onSelectCategory: (categoryName: string) => void;
}

export const CategoryShortcuts: React.FC<CategoryShortcutsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 relative">
      {/* Section Header with Subtle Accent */}
      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-5 rounded-full bg-[#C90024]" />
          <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#171717]">
            Explore Menu Categories
          </h3>
        </div>

        {/* Desktop Carousel Controls */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll categories left"
            className="w-8 h-8 rounded-full bg-white shadow-xs border border-[#F9EBDD] flex items-center justify-center text-[#292929] hover:text-[#C90024] hover:border-[#C90024]/40 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2]" />
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll categories right"
            className="w-8 h-8 rounded-full bg-white shadow-xs border border-[#F9EBDD] flex items-center justify-center text-[#292929] hover:text-[#C90024] hover:border-[#C90024]/40 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track - Noticeably BIGGER Circular Thumbnails (76-90px on mobile, 96px on desktop) */}
      <div
        ref={scrollContainerRef}
        className="no-scrollbar flex items-center gap-4 sm:gap-6 lg:gap-8 overflow-x-auto scroll-smooth py-2 px-1 -mx-1"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.name;

          return (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.94 }}
              whileHover={{ y: -3 }}
              onClick={() => onSelectCategory(cat.name)}
              className="group flex flex-col items-center shrink-0 focus:outline-hidden cursor-pointer"
            >
              {/* Circular Container with Porsche Aerodynamic Precision */}
              <div
                className={`relative w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26 rounded-full transition-all duration-300 flex items-center justify-center p-1 ${
                  isSelected
                    ? 'ring-3 ring-[#C90024] ring-offset-3 ring-offset-[#FFF8EF] shadow-lg guards-red-glow scale-105'
                    : 'bg-white shadow-xs hover:shadow-md ring-1 ring-[#F9EBDD] hover:ring-[#C90024]/40'
                }`}
              >
                {/* Real High-Res Food Thumbnail */}
                <div className="w-full h-full rounded-full overflow-hidden bg-[#FFF1E5] relative flex items-center justify-center">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Subtle glossy sheen */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/15 via-transparent to-white/20 pointer-events-none" />
                  {cat.name === 'All' && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <span className="text-[10px] sm:text-[11px] font-display font-black tracking-wider text-white uppercase px-2 py-0.5 rounded-full bg-[#C90024] shadow-xs">
                        ALL
                      </span>
                    </div>
                  )}
                </div>

                {/* Active Indicator Badge Dot */}
                {isSelected && (
                  <motion.div
                    layoutId="active-cat-indicator"
                    className="absolute -bottom-1 w-3 h-3 rounded-full bg-[#C90024] border-2 border-white"
                  />
                )}
              </div>

              {/* Category Label Below Thumbnail */}
              <span
                className={`mt-2.5 text-xs sm:text-sm font-semibold tracking-tight transition-colors duration-200 ${
                  isSelected
                    ? 'text-[#C90024] font-bold'
                    : 'text-[#292929] group-hover:text-[#C90024]'
                }`}
              >
                {cat.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};
