import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Flame, CreditCard, Utensils } from 'lucide-react';
import { HeroSlide } from '../types';
import { RedotPayCard } from './RedotPayCard';

interface HeroBannerProps {
  slides: HeroSlide[];
  onOrderSlideMeal: (slide: HeroSlide) => void;
  onApplyVipDiscount?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  slides,
  onOrderSlideMeal,
  onApplyVipDiscount,
}) => {
  const [heroMode, setHeroMode] = useState<'feast' | 'redotpay'>('feast');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slides every 5.5s unless hovered or in redotpay mode
  useEffect(() => {
    if (isPaused || heroMode === 'redotpay') return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, slides.length, heroMode]);

  const currentSlide = slides[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5">
      {/* Banner Container with Porsche 911 Gloss & Aerodynamic Geometry */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative w-full overflow-hidden rounded-[24px] sm:rounded-[32px] bg-[#171717] text-white shadow-xl shadow-black/20 border border-[#292929]/50 min-h-[420px] sm:min-h-[460px] md:min-h-[500px] flex items-center"
      >
        {/* Subtle Ambient Radial Lighting - Porsche Guards Red glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#C90024]/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#C90024]/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Mode Switcher in Top Right (RedotPay 3D Animation Switch) */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 flex items-center p-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
          <button
            onClick={() => setHeroMode('feast')}
            aria-label="Switch to Menu Feast view"
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              heroMode === 'feast'
                ? 'bg-[#C90024] text-white guards-red-glow'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Menu Feast</span>
          </button>
          <button
            onClick={() => setHeroMode('redotpay')}
            aria-label="Switch to RedotPay 3D Card animation"
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              heroMode === 'redotpay'
                ? 'bg-[#C90024] text-white guards-red-glow'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#E31827] shadow-[0_0_6px_#E31827] animate-pulse" />
            <CreditCard className="w-3.5 h-3.5" />
            <span>RedotPay 3D</span>
          </button>
        </div>

        {/* REDOTPAY 3D CARD ANIMATION STAGE */}
        {heroMode === 'redotpay' ? (
          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 items-center z-10 p-6 sm:p-10 lg:p-12 gap-8">
            {/* Left Column: RedotPay Style Copy & CTA */}
            <div className="lg:col-span-6 flex flex-col justify-center items-start">
              <div className="mb-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C90024]/20 border border-[#C90024]/40 text-[#E31827] text-xs font-bold uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31827] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C90024]"></span>
                </span>
                <span>REDOTPAY × KARRERA PASS</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] mb-3">
                3D VELOCITY PASS.<br />
                <span className="text-[#E31827]">TAP TO DINE.</span>
              </h2>

              <p className="text-sm sm:text-base text-white/75 font-normal max-w-md mb-6 leading-relaxed">
                Hover, tilt and interact with the 3D RedotPay card. Features dynamic cursor-following spotlight glare, 3D layer depth, customizable metallic skins, and instant 30% savings on every order.
              </p>

              <div className="flex items-center gap-4 flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    if (onApplyVipDiscount) onApplyVipDiscount();
                  }}
                  className="px-7 py-3.5 rounded-full bg-[#C90024] hover:bg-[#E31827] text-white font-display text-sm font-bold tracking-wide flex items-center gap-2 shadow-lg guards-red-glow cursor-pointer group"
                >
                  <span>Activate 30% VIP Pass</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <button
                  onClick={() => setHeroMode('feast')}
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  View Food Menu
                </button>
              </div>
            </div>

            {/* Right Column: Interactive 3D RedotPay Tilt Card */}
            <div className="lg:col-span-6 flex items-center justify-center w-full">
              <RedotPayCard onApplyVipDiscount={onApplyVipDiscount} />
            </div>
          </div>
        ) : (
          /* STANDARD FEAST CAROUSEL */
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full grid grid-cols-1 md:grid-cols-12 items-center"
            >
              {/* Left Column: Headlines & CTA (7 cols on desktop) */}
              <div className="md:col-span-7 z-10 p-6 sm:p-10 lg:p-14 flex flex-col justify-center items-start">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mb-3 sm:mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C90024]/20 border border-[#C90024]/40 text-[#E31827] text-xs font-bold uppercase tracking-wider"
                >
                  <Flame className="w-3.5 h-3.5 fill-[#E31827]" />
                  <span>{currentSlide.badge}</span>
                </motion.div>

                {/* Large Promotional Headline */}
                <motion.h2
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] mb-3 sm:mb-4 whitespace-pre-line"
                >
                  {currentSlide.headline}
                </motion.h2>

                {/* Supporting Description */}
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-sm sm:text-base md:text-lg text-white/75 font-normal max-w-lg mb-6 leading-relaxed"
                >
                  {currentSlide.subheadline}
                </motion.p>

                {/* Action Strip: Red CTA Button & Price Tag */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-center gap-4 flex-wrap"
                >
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => onOrderSlideMeal(currentSlide)}
                    className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#C90024] hover:bg-[#E31827] text-white font-display text-sm sm:text-base font-bold tracking-wide flex items-center gap-2.5 transition-all duration-200 shadow-lg guards-red-glow cursor-pointer group"
                  >
                    <span>Order Now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <div className="flex items-center gap-2 text-white/90">
                    <span className="text-xs text-white/50 uppercase tracking-widest font-mono">From</span>
                    <span className="font-display text-2xl font-black text-white tabular-nums">
                      ${currentSlide.price.toFixed(2)}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: High-Res Food Photography with subtle depth & rim lighting */}
              <div className="md:col-span-5 relative h-64 sm:h-80 md:h-[480px] w-full flex items-center justify-center p-4 sm:p-6 md:p-8">
                {/* Subtle dark gradient overlay for text readability on mobile */}
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent via-[#171717]/40 to-[#171717] z-1 pointer-events-none md:block hidden" />

                <motion.div
                  initial={{ scale: 0.92, opacity: 0, rotate: -1 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full max-h-[400px] flex items-center justify-center"
                >
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.comboName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-2xl md:rounded-3xl shadow-2xl ring-1 ring-white/10"
                  />

                  {/* Floating Micro Badge - Preparation time */}
                  <div className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-full porsche-dark-glass text-white/90 text-xs font-medium flex items-center gap-1.5 shadow-md">
                    <Clock className="w-3.5 h-3.5 text-[#E31827]" />
                    <span>9-12 min prep</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Carousel Prev/Next Arrow Buttons (Only in feast mode) */}
        {heroMode === 'feast' && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-[#C90024] text-white items-center justify-center backdrop-blur-sm border border-white/10 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next slide"
              className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-[#C90024] text-white items-center justify-center backdrop-blur-sm border border-white/10 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* Carousel Pagination Indicators (Bottom Center) */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    idx === currentIndex
                      ? 'w-8 h-2.5 bg-[#C90024] guards-red-glow'
                      : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
