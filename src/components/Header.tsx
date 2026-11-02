import React from 'react';
import { Menu, Bell, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  cartCount: number;
  unreadNotificationsCount: number;
  onOpenMenu: () => void;
  onOpenNotifications: () => void;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  unreadNotificationsCount,
  onOpenMenu,
  onOpenNotifications,
  onOpenCart,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#FFF8EF]/95 backdrop-blur-md border-b border-[#F9EBDD] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Hamburger Button & Personalized Greeting */}
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            onClick={onOpenMenu}
            aria-label="Open navigation menu"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-xs border border-[#F9EBDD] flex items-center justify-center text-[#292929] hover:text-[#C90024] hover:border-[#C90024]/30 transition-colors cursor-pointer shrink-0"
          >
            <Menu className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2]" />
          </motion.button>

          <div className="flex flex-col">
            <span className="text-[11px] sm:text-xs font-medium tracking-tight text-[#8F001B]/80 flex items-center gap-1 whitespace-nowrap">
              <span>Hello, Food Lover!</span>
              <span className="inline-block">👋</span>
            </span>
            <span className="hidden sm:inline-block text-[11px] text-[#292929]/70 font-semibold tracking-wide">
              Stuttgart · High-Speed Kitchen
            </span>
          </div>
        </div>

        {/* Center: Brand Logo & Title with Porsche 911 inspired aerodynamic emblem */}
        <div className="flex flex-col items-center text-center cursor-pointer select-none px-2">
          <div className="flex items-center gap-1.5">
            {/* Sleek aerodynamic silhouette emblem */}
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#C90024] flex items-center justify-center text-white shadow-xs shrink-0">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current">
                <path d="M2.5 14.5c1.8-3.2 5.5-5.5 10-5.5 4.8 0 8.2 2.3 9.8 5.5-1.5.8-3.7 1.5-6.8 1.5-4.5 0-8.8-1-13-1.5zm11.5-3.8c-2.9 0-5.5 1-7.2 2.7 2.4.3 5.3.6 8.2.6 2.1 0 4-.2 5.3-.6-1.5-1.7-3.8-2.7-6.3-2.7z" />
              </svg>
            </div>
            <span className="font-display text-lg sm:text-2xl font-black tracking-tight text-[#171717] uppercase whitespace-nowrap">
              KARRERA<span className="text-[#C90024]">.</span>
            </span>
          </div>
          <span className="text-[9px] sm:text-[11px] font-medium tracking-widest uppercase text-[#292929]/60 whitespace-nowrap">
            Precision Fried · Stuttgart DNA
          </span>
        </div>

        {/* Right: Notifications & Shopping Bag */}
        <div className="flex items-center gap-2.5">
          {/* Notification Button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            onClick={onOpenNotifications}
            aria-label="View notifications"
            className="relative w-10 h-10 rounded-full bg-white shadow-xs border border-[#F9EBDD] flex items-center justify-center text-[#292929] hover:text-[#C90024] hover:border-[#C90024]/30 transition-colors cursor-pointer"
          >
            <Bell className="w-4.5 h-4.5 stroke-[2]" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#C90024] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-[#FFF8EF]">
                {unreadNotificationsCount}
              </span>
            )}
          </motion.button>

          {/* Shopping Bag Button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            onClick={onOpenCart}
            aria-label="View shopping bag"
            className="relative w-10 h-10 rounded-full bg-[#171717] hover:bg-[#C90024] text-white shadow-xs flex items-center justify-center transition-colors duration-200 cursor-pointer"
          >
            <ShoppingBag className="w-4.5 h-4.5 stroke-[2.2]" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-[#C90024] text-white text-[10px] font-extrabold flex items-center justify-center ring-2 ring-[#FFF8EF] guards-red-glow"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
};
