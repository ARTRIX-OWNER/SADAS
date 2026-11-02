import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Flame, RotateCcw } from 'lucide-react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSpice: string;
  onSelectSpice: (spice: string) => void;
  sortBy: string;
  onSelectSortBy: (sort: string) => void;
  onResetFilters: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  selectedSpice,
  onSelectSpice,
  sortBy,
  onSelectSortBy,
  onResetFilters,
}) => {
  const spiceOptions = ['All Spices', 'Mild', 'Medium', 'Carrera Hot', 'Turbo 911'];
  const sortOptions = [
    { id: 'default', label: 'Recommended' },
    { id: 'price-asc', label: 'Price: Low to High' },
    { id: 'price-desc', label: 'Price: High to Low' },
    { id: 'rating', label: 'Highest Rated' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-[#F9EBDD]"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#F9EBDD]">
              <h3 className="font-display text-lg font-bold text-[#171717]">
                Filter & Sort Meals
              </h3>
              <button
                onClick={onClose}
                aria-label="Close filter dialog"
                className="p-1.5 rounded-full hover:bg-[#F9EBDD] text-[#292929] cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[2]" />
              </button>
            </div>

            {/* Filter Content */}
            <div className="py-4 space-y-5">
              {/* Spice Level */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#292929]/70 flex items-center gap-1.5 mb-2.5">
                  <Flame className="w-4 h-4 text-[#C90024]" />
                  <span>Spice Level</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {spiceOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => onSelectSpice(opt)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        selectedSpice === opt
                          ? 'bg-[#C90024] text-white guards-red-glow'
                          : 'bg-[#FFF8EF] border border-[#F9EBDD] text-[#292929] hover:border-[#C90024]/40'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#292929]/70 block mb-2.5">
                  Sort By
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => onSelectSortBy(opt.id)}
                      className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
                        sortBy === opt.id
                          ? 'bg-[#171717] text-white shadow-xs'
                          : 'bg-[#FFF8EF] border border-[#F9EBDD] text-[#292929] hover:border-[#C90024]/40'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-[#F9EBDD] flex items-center gap-3">
              <button
                onClick={onResetFilters}
                className="flex-1 py-3 rounded-full border border-[#F9EBDD] hover:bg-[#FFF8EF] text-xs font-bold text-[#292929] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-full bg-[#C90024] hover:bg-[#E31827] text-white text-xs font-bold uppercase tracking-wider guards-red-glow transition-all cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
