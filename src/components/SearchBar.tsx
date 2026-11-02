import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { motion } from 'motion/react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenFilters: () => void;
  activeFilterCount?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onOpenFilters,
  activeFilterCount = 0,
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <div className="relative flex items-center">
        {/* Rounded Pill Container with Porsche Clean Curves */}
        <div className="relative w-full flex items-center bg-white rounded-full shadow-xs hover:shadow-md border border-[#F9EBDD] focus-within:border-[#C90024] focus-within:ring-2 focus-within:ring-[#C90024]/20 transition-all duration-300">
          {/* Search Icon */}
          <div className="pl-4 sm:pl-5 text-[#292929]/50 flex items-center pointer-events-none">
            <Search className="w-5 h-5 stroke-[2.2]" />
          </div>

          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search your favorite meals..."
            aria-label="Search your favorite meals"
            className="w-full py-3.5 sm:py-4 pl-3 pr-24 sm:pr-28 text-sm sm:text-base font-normal text-[#171717] placeholder:text-[#292929]/45 bg-transparent focus:outline-hidden"
          />

          {/* Clear Button if input has text */}
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSearchChange('')}
              aria-label="Clear search text"
              className="absolute right-14 sm:right-16 p-1.5 rounded-full hover:bg-[#F9EBDD] text-[#292929]/60 hover:text-[#171717] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[2]" />
            </motion.button>
          )}

          {/* Filter / Settings Button */}
          <div className="absolute right-1.5 sm:right-2">
            <motion.button
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
              onClick={onOpenFilters}
              aria-label="Filter meals by spice, calories or preparation"
              className={`relative h-9 sm:h-10 px-3.5 rounded-full flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeFilterCount > 0
                  ? 'bg-[#C90024] text-white shadow-xs guards-red-glow'
                  : 'bg-[#F9EBDD]/70 hover:bg-[#F9EBDD] text-[#171717]'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 stroke-[2.2]" />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-white text-[#C90024] text-[10px] font-bold flex items-center justify-center ml-0.5">
                  {activeFilterCount}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};
