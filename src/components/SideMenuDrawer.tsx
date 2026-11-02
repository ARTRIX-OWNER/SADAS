import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, MapPin, Award, Flame, Phone, ShieldCheck, ChevronRight } from 'lucide-react';

interface SideMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategoryFromMenu: (categoryName: string) => void;
}

export const SideMenuDrawer: React.FC<SideMenuDrawerProps> = ({
  isOpen,
  onClose,
  onSelectCategoryFromMenu,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 cursor-pointer"
          />

          {/* Slide-out Menu */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 left-0 bottom-0 z-50 w-full max-w-sm bg-[#FFF8EF] border-r border-[#F9EBDD] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#F9EBDD] flex items-center justify-between bg-[#171717] text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#C90024] flex items-center justify-center text-white">
                  <Flame className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-black tracking-tight text-white uppercase">
                    KARRERA CRISP
                  </h3>
                  <p className="text-[10px] text-white/60 tracking-widest uppercase">
                    Stuttgart DNA · Precision Fried
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close menu"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar">
              {/* Culinary Heritage Card */}
              <div className="p-4 rounded-2xl bg-white border border-[#F9EBDD] shadow-2xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C90024]">
                  The Atelier Philosophy
                </span>
                <h4 className="font-display text-sm font-bold text-[#171717] mt-1 mb-1.5">
                  Automotive Precision in Crispy Chicken
                </h4>
                <p className="text-xs text-[#292929]/70 leading-relaxed">
                  Every piece of chicken is triple-brined in buttermilk, dredged in our 11-spice recipe, and pressure-fried at exact aerodynamic heat curves for the crispiest bite imaginable.
                </p>
              </div>

              {/* Fast Category Links */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#292929]/50 block mb-2 px-1">
                  Quick Navigation
                </span>
                <div className="space-y-1">
                  {['Buckets', 'Burgers', 'Chicken', 'Snacks', 'Drinks', 'Desserts'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        onSelectCategoryFromMenu(cat);
                        onClose();
                      }}
                      className="w-full px-3 py-2.5 rounded-xl hover:bg-white text-left text-sm font-semibold text-[#171717] hover:text-[#C90024] flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span>{cat}</span>
                      <ChevronRight className="w-4 h-4 text-[#292929]/30" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Kitchen Hours & Location */}
              <div className="space-y-2.5 pt-2 border-t border-[#F9EBDD]">
                <div className="flex items-center gap-2.5 text-xs text-[#292929]/80">
                  <Clock className="w-4 h-4 text-[#C90024] shrink-0" />
                  <span>Open Daily: 10:30 AM – 11:30 PM</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#292929]/80">
                  <MapPin className="w-4 h-4 text-[#C90024] shrink-0" />
                  <span>Stuttgart Quarter & Flagship Downtown Hub</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#292929]/80">
                  <ShieldCheck className="w-4 h-4 text-[#C90024] shrink-0" />
                  <span>100% Hormone-Free, Antibiotic-Free Poultry</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#F9EBDD] bg-white text-center">
              <span className="text-[11px] text-[#292929]/50">
                © 2026 Karrera Crisp Group. All rights reserved.
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
