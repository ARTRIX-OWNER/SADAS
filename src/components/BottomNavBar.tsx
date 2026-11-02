/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'motion/react';
import {
  Home,
  UtensilsCrossed,
  Tag,
  ReceiptText,
  User,
  SlidersHorizontal,
  GripHorizontal,
} from 'lucide-react';
import {
  calculateVelocityTargetIndex,
  calculateLiquidStretch,
  DockSettings,
  getLiquidGlassPresetStyles,
} from '../utils/liquidNavPhysics.ts';
import { playHapticTick, playSnapThud } from '../utils/haptics.ts';

export type NavTab = 'Home' | 'Menu' | 'Offers' | 'Orders' | 'Profile';

interface BottomNavBarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  cartCount: number;
  settings: DockSettings;
  onOpenCustomizer: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
  cartCount,
  settings,
  onOpenCustomizer,
}) => {
  const navRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const dragX = useMotionValue(0);

  const tabs: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
    { id: 'Home', label: 'Home', icon: Home },
    { id: 'Menu', label: 'Menu', icon: UtensilsCrossed },
    { id: 'Offers', label: 'Offers', icon: Tag, badge: '30%' },
    { id: 'Orders', label: 'Orders', icon: ReceiptText, badge: cartCount > 0 ? String(cartCount) : undefined },
    { id: 'Profile', label: 'Profile', icon: User },
  ];

  const activeIndex = tabs.findIndex((t) => t.id === activeTab);
  const presetStyle = getLiquidGlassPresetStyles(settings.preset);

  // Dynamic liquid stretch deformation based on live drag offset
  const liquidStretch = isDragging
    ? calculateLiquidStretch(
        dragOffset,
        settings.elasticity === 'high' ? 600 : settings.elasticity === 'medium' ? 300 : 80
      )
    : { scaleX: 1, scaleY: 1, skewX: 0 };

  const handleDragStart = () => {
    setIsDragging(true);
    if (settings.hapticFeedback) playHapticTick(900);
  };

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setDragOffset(info.offset.x);
    if (settings.hapticFeedback && Math.abs(info.velocity.x) > 400 && Math.random() > 0.6) {
      playHapticTick(1050, 10);
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    setDragOffset(0);

    const navWidth = navRef.current ? navRef.current.clientWidth : 360;
    const tabWidth = navWidth / tabs.length;

    // Calculate destination based on user's applied drag distance AND velocity momentum power
    const targetIndex = calculateVelocityTargetIndex(
      activeIndex,
      info.offset.x,
      info.velocity.x,
      tabWidth,
      tabs.length,
      settings.powerMultiplier
    );

    if (targetIndex !== activeIndex) {
      if (settings.hapticFeedback) playSnapThud();
      onTabChange(tabs[targetIndex].id);
    } else {
      if (settings.hapticFeedback) playHapticTick(820);
    }
  };

  const handleTabClick = (tabId: NavTab, index: number) => {
    if (tabId === activeTab) return;
    if (settings.hapticFeedback) playHapticTick(860);
    onTabChange(tabId);
  };

  // Elastic spring config based on user preference
  const springConfig =
    settings.elasticity === 'high'
      ? { type: 'spring' as const, stiffness: 360, damping: 24, mass: 0.9 }
      : settings.elasticity === 'medium'
      ? { type: 'spring' as const, stiffness: 440, damping: 28, mass: 0.8 }
      : { type: 'spring' as const, stiffness: 550, damping: 35, mass: 0.7 };

  const isAttached = settings.dockPosition === 'attached';

  return (
    <div
      className={`fixed left-0 right-0 z-40 flex items-center justify-center pointer-events-none transition-all duration-300 ${
        isAttached ? 'bottom-0 px-0' : 'bottom-3 sm:bottom-6 px-3'
      }`}
    >
      <div className="relative flex items-center gap-2 max-w-lg w-full justify-center">
        {/* Main Xiaomi HyperOS 3 Liquid Glass Navigation Bar */}
        <nav
          ref={navRef}
          role="navigation"
          aria-label="Xiaomi HyperOS 3 Liquid Navigation"
          className={`pointer-events-auto relative flex items-center justify-around backdrop-blur-2xl transition-all duration-300 ${
            isAttached
              ? 'w-full rounded-t-3xl border-t border-[#F9EBDD] bg-[#FFF8EF]/95 px-3 py-2.5 shadow-2xl shadow-black/15'
              : 'w-full max-w-md sm:max-w-lg rounded-full border border-[#F9EBDD] bg-[#FFF8EF]/90 px-2 sm:px-3 py-1.5 shadow-2xl shadow-black/15 ring-1 ring-black/5'
          }`}
        >
          {tabs.map((tab, idx) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <div
                key={tab.id}
                className="relative flex-1 flex flex-col items-center justify-center min-w-[56px] sm:min-w-[68px] py-1 select-none"
              >
                {/* Active Interactive Draggable Liquid Glass Pill */}
                {isActive && (
                  <motion.div
                    layoutId="hyperos-liquid-pill"
                    drag="x"
                    dragConstraints={{ left: -140, right: 140 }}
                    dragElastic={0.25}
                    onDragStart={handleDragStart}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                    style={{ x: dragX }}
                    animate={{
                      scaleX: liquidStretch.scaleX,
                      scaleY: liquidStretch.scaleY,
                      skewX: liquidStretch.skewX,
                    }}
                    transition={springConfig}
                    className={`absolute inset-0 rounded-full cursor-grab active:cursor-grabbing border ${presetStyle.pillBg} ${presetStyle.pillBorder} ${presetStyle.pillShadow}`}
                  >
                    {/* Top Specular Liquid Glass Refraction Sheen */}
                    <div className="pointer-events-none absolute inset-x-2 top-0.5 h-[40%] rounded-full bg-gradient-to-b from-white/90 via-white/40 to-transparent" />

                    {/* Grip Affordance Dots (Subtle tactile hint that you can drag it) */}
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 flex items-center gap-0.5 opacity-30 hover:opacity-75 transition-opacity pointer-events-none">
                      <div className="w-1 h-1 rounded-full bg-[#171717]" />
                      <div className="w-1 h-1 rounded-full bg-[#171717]" />
                      <div className="w-1 h-1 rounded-full bg-[#171717]" />
                    </div>
                  </motion.div>
                )}

                {/* Tab Button Content */}
                <button
                  type="button"
                  onClick={() => handleTabClick(tab.id, idx)}
                  className="relative z-10 w-full flex flex-col items-center justify-center py-0.5 cursor-pointer focus:outline-hidden"
                >
                  {/* Icon Container with Badge */}
                  <div className="relative flex items-center justify-center">
                    <Icon
                      className={`w-5 h-5 transition-transform duration-200 ${
                        isActive
                          ? `${presetStyle.iconActiveColor} scale-105 stroke-[2.4]`
                          : 'text-[#292929]/70 hover:text-[#171717] stroke-[2]'
                      }`}
                    />

                    {/* Notification Badge */}
                    {tab.badge && (
                      <span
                        className={`absolute -top-1.5 -right-2.5 text-[9px] font-black px-1.5 py-0.2 rounded-full ring-1 ring-white ${
                          isActive
                            ? 'bg-[#C90024] text-white shadow-xs'
                            : 'bg-[#171717] text-white'
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </div>

                  {/* Tab Label */}
                  <span
                    className={`text-[10px] sm:text-[11px] font-semibold mt-0.5 tracking-tight transition-colors duration-200 ${
                      isActive ? `${presetStyle.labelActiveColor} font-bold` : 'text-[#292929]/75'
                    }`}
                  >
                    {tab.label}
                  </span>

                  {/* RedotPay Active Red Bar Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="redotpay-active-bar"
                      className={`w-3.5 h-[2.5px] rounded-full ${presetStyle.dotColor} mt-0.5`}
                      transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                    />
                  )}
                </button>
              </div>
            );
          })}
        </nav>

        {/* HyperOS 3 Dock Studio Customizer Trigger Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={onOpenCustomizer}
          title="Customize Menu & Dock (HyperOS 3 Liquid Glass)"
          aria-label="Customize Menu & Dock"
          className="pointer-events-auto h-11 w-11 rounded-full bg-[#171717] hover:bg-[#C90024] text-white flex items-center justify-center shadow-lg shadow-black/20 border border-white/20 transition-colors cursor-pointer shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
};
