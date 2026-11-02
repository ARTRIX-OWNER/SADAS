import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Tag } from 'lucide-react';
import { EXCLUSIVE_OFFER_DATA } from '../data/mockData';
import { ProductItem } from '../types';

interface ExclusiveOfferBannerProps {
  onClaimOffer: (meal: ProductItem) => void;
}

export const ExclusiveOfferBanner: React.FC<ExclusiveOfferBannerProps> = ({ onClaimOffer }) => {
  const { headline, subtext, badgeText, buttonText, image, featuredMeal } = EXCLUSIVE_OFFER_DATA;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Banner Container: Cream Background with Subtle Guards Red Accents */}
      <div className="relative overflow-hidden rounded-[24px] sm:rounded-[30px] bg-gradient-to-br from-[#FFF1E5] via-[#F9EBDD] to-[#FFF8EF] border border-[#F9EBDD] shadow-sm hover:shadow-md transition-shadow duration-300">
        {/* Subtle Porsche Guards Red Ambient Contour Wave */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C90024]/8 rounded-full blur-[70px] pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-[#C90024]/5 rounded-full blur-[60px] pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 items-center p-6 sm:p-8 lg:p-10 gap-6 relative z-10">
          {/* Left Column: Headlines & Order CTA (7 cols on desktop) */}
          <div className="md:col-span-7 flex flex-col items-start justify-center">
            {/* Small Kicker */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C90024]/10 text-[#C90024] text-xs font-bold uppercase tracking-wider mb-2.5">
              <Tag className="w-3.5 h-3.5" />
              <span>Limited Midweek Privilege</span>
            </div>

            {/* Headline */}
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#171717] tracking-tight mb-2">
              {headline}
            </h3>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-[#292929]/75 font-normal max-w-md mb-6 leading-relaxed">
              {subtext}
            </p>

            {/* Red Order Now Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onClaimOffer(featuredMeal)}
              className="px-6 sm:px-7 py-3 rounded-full bg-[#C90024] hover:bg-[#E31827] text-white font-display text-sm sm:text-base font-bold tracking-wide flex items-center gap-2 shadow-md guards-red-glow transition-all duration-200 cursor-pointer group"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          {/* Right Column: Burger & Fries Photography with Circular 30% OFF Badge (5 cols) */}
          <div className="md:col-span-5 relative flex items-center justify-center">
            {/* Large Circular 30% OFF Badge (Porsche Chrono Clock / Tachometer Inspired Aesthetic) */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute -top-3 -left-3 sm:-top-5 sm:-left-5 z-20 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#171717] text-white flex flex-col items-center justify-center shadow-xl ring-4 ring-[#C90024] ring-offset-2 ring-offset-[#FFF1E5] select-none"
            >
              <span className="text-[10px] font-bold tracking-widest text-[#C7C7C7] uppercase">SAVE</span>
              <span className="font-display text-xl sm:text-2xl font-black text-[#E31827] leading-none">
                30%
              </span>
              <span className="text-[9px] font-bold text-white tracking-widest uppercase">OFF</span>
            </motion.div>

            {/* Image Container with Rounded Porsche Curves */}
            <div className="relative w-full h-48 sm:h-56 lg:h-60 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-white/60 bg-white">
              <img
                src={image}
                alt="30% Off Exclusive Combo Burger"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
