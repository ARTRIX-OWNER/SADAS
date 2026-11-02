import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Wifi, RotateCw, Check, Zap, ShieldCheck } from 'lucide-react';
import { calculateTilt, getResetTilt, TiltCalculationResult } from '../utils/tiltLogic';

export type CardSkin = 'guards-red' | 'matte-titanium' | 'chrono-gold';

interface RedotPayCardProps {
  onApplyVipDiscount?: () => void;
}

export const RedotPayCard: React.FC<RedotPayCardProps> = ({ onApplyVipDiscount }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltCalculationResult>(getResetTilt());
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentSkin, setCurrentSkin] = useState<CardSkin>('guards-red');
  const [isHovered, setIsHovered] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const result = calculateTilt(e.clientX, e.clientY, rect, 16);
    setTilt(result);
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt(getResetTilt());
  };

  const handleVipClaim = () => {
    setApplied(true);
    if (onApplyVipDiscount) onApplyVipDiscount();
    setTimeout(() => setApplied(false), 2500);
  };

  // Skin styles
  const getSkinBackground = () => {
    switch (currentSkin) {
      case 'matte-titanium':
        return 'bg-gradient-to-br from-[#1F1F1F] via-[#121212] to-[#0A0A0A] border-[#333333] shadow-black/80';
      case 'chrono-gold':
        return 'bg-gradient-to-br from-[#2D2111] via-[#1A140B] to-[#0F0C07] border-[#917134]/50 shadow-amber-950/40';
      case 'guards-red':
      default:
        return 'bg-gradient-to-br from-[#C90024] via-[#8F001B] to-[#171717] border-[#E31827]/40 shadow-[#C90024]/30';
    }
  };

  const currentRotationY = isFlipped ? 180 + tilt.rotateY : tilt.rotateY;

  return (
    <div className="w-full flex flex-col items-center select-none py-2">
      {/* 3D Perspective Viewport */}
      <div
        className="relative w-full max-w-[340px] sm:max-w-[400px] h-[215px] sm:h-[250px] cursor-pointer"
        style={{ perspective: '1200px' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Floating RedotPay-style live badge 1 (Top Left) */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-3 -left-3 sm:-left-6 z-30 px-3 py-1.5 rounded-full porsche-dark-glass text-white text-[11px] font-bold flex items-center gap-1.5 shadow-lg border border-white/20"
        >
          {/* Signature Red Dot Pulse (RedotPay DNA) */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31827] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C90024]"></span>
          </span>
          <span>RedotPay × Karrera Pass</span>
        </motion.div>

        {/* Floating RedotPay-style live badge 2 (Bottom Right) */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-3 -right-2 sm:-right-4 z-30 px-3 py-1.5 rounded-full bg-white/95 text-[#171717] text-[11px] font-bold flex items-center gap-1.5 shadow-xl border border-[#F9EBDD]"
        >
          <Zap className="w-3.5 h-3.5 text-[#C90024] fill-[#C90024]" />
          <span>Tap to Dine · 30% Off</span>
        </motion.div>

        {/* The 3D Rotating Card Container */}
        <div
          ref={cardRef}
          className={`relative w-full h-full rounded-[22px] sm:rounded-[26px] p-5 sm:p-6 border transition-all ${
            isHovered ? 'duration-75' : 'duration-500 ease-out'
          } ${getSkinBackground()}`}
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${tilt.rotateX}deg) rotateY(${currentRotationY}deg) scale3d(${
              isHovered ? '1.04' : '1'
            }, ${isHovered ? '1.04' : '1'}, 1)`,
            boxShadow: isHovered
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 35px rgba(201, 0, 36, 0.35)'
              : '0 15px 35px -10px rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* Dynamic Specular Glare Layer (RedotPay signature cursor reflection) */}
          <div
            className="absolute inset-0 rounded-[22px] sm:rounded-[26px] pointer-events-none transition-opacity duration-300"
            style={{
              opacity: tilt.glareOpacity,
              background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.08) 35%, transparent 65%)`,
            }}
          />

          {/* Holographic Iridescent Sheen Layer */}
          <div
            className="absolute inset-0 rounded-[22px] sm:rounded-[26px] pointer-events-none opacity-30 mix-blend-overlay"
            style={{
              background: `linear-gradient(${120 + tilt.rotateY * 4}deg, rgba(255,0,0,0.4), rgba(255,255,255,0.6), rgba(0,180,255,0.4), rgba(255,215,0,0.5))`,
            }}
          />

          {/* Subtle Carbon Fiber Weave texture */}
          <div className="absolute inset-0 rounded-[22px] sm:rounded-[26px] opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

          {/* FRONT FACE */}
          <div
            className="w-full h-full flex flex-col justify-between text-white relative z-10"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              display: isFlipped ? 'none' : 'flex',
            }}
          >
            {/* Top Row: Brand & Contactless Icon */}
            <div className="flex items-center justify-between" style={{ transform: 'translateZ(30px)' }}>
              <div className="flex items-center gap-2">
                {/* RedotPay style Red Dot Accent */}
                <div className="w-6 h-6 rounded-md bg-[#C90024] flex items-center justify-center text-white shadow-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
                </div>
                <div>
                  <span className="font-display text-sm sm:text-base font-black tracking-wider text-white uppercase block leading-tight">
                    KARRERA
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-white/60 uppercase">
                    REDOTPAY PLATINUM
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Wifi className="w-5 h-5 text-white/80 rotate-90" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                  PASS 911
                </span>
              </div>
            </div>

            {/* Middle Row: EMV Chip & Hologram Dot */}
            <div className="flex items-center gap-4 my-auto" style={{ transform: 'translateZ(42px)' }}>
              {/* Metallic Gold EMV Chip */}
              <div className="w-11 h-8 sm:w-12 sm:h-9 rounded-md bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 border border-amber-300/80 shadow-md flex items-center justify-center p-1 relative overflow-hidden">
                <div className="w-full h-[1px] bg-amber-800/40 absolute top-2.5" />
                <div className="w-full h-[1px] bg-amber-800/40 absolute bottom-2.5" />
                <div className="h-full w-[1px] bg-amber-800/40 absolute left-3.5" />
                <div className="h-full w-[1px] bg-amber-800/40 absolute right-3.5" />
              </div>

              {/* Red Dot Signature Light */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-xs">
                <span className="w-2 h-2 rounded-full bg-[#E31827] shadow-[0_0_8px_#E31827]" />
                <span className="text-[10px] font-bold tracking-widest text-white/80">
                  VELOCITY VIP
                </span>
              </div>
            </div>

            {/* Bottom Row: Embossed Cardholder & Expiry */}
            <div style={{ transform: 'translateZ(32px)' }}>
              <div className="font-mono text-sm sm:text-base tracking-[0.2em] text-white/95 drop-shadow-md mb-1.5">
                9110 · 2026 · 8900 · 0024
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-white/60 block">
                    CARDHOLDER
                  </span>
                  <span className="font-display text-xs sm:text-sm font-bold tracking-wider text-white uppercase">
                    STUTTGART GUEST
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[8px] font-bold uppercase tracking-widest text-white/60 block">
                    PRIVILEGE
                  </span>
                  <span className="font-mono text-xs font-bold text-white">
                    30% OFF ALL MEALS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* BACK FACE */}
          <div
            className="w-full h-full flex flex-col justify-between text-white relative z-10"
            style={{
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              display: isFlipped ? 'flex' : 'none',
            }}
          >
            {/* Magnetic Stripe */}
            <div className="w-full h-9 bg-black/90 -mx-5 sm:-mx-6 mt-1 shadow-inner" />

            {/* Signature & CVV Panel */}
            <div className="flex items-center gap-3 my-auto px-1">
              <div className="flex-1 h-7 bg-white/90 rounded-sm flex items-center px-3">
                <span className="font-mono text-[10px] text-gray-700 italic font-semibold">
                  Authorized Karrera Member
                </span>
              </div>
              <div className="px-3 py-1 bg-white text-[#171717] font-mono text-xs font-bold rounded-sm">
                911
              </div>
            </div>

            {/* Back info & Claim Action */}
            <div className="flex items-center justify-between text-[9px] text-white/70">
              <div>
                <p>RedotPay-Powered Fast-Casual Dining Pass.</p>
                <p className="text-white/50">Valid at all Karrera flagship & express hubs.</p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleVipClaim();
                }}
                className="px-3 py-1.5 rounded-full bg-[#C90024] hover:bg-[#E31827] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md cursor-pointer"
              >
                {applied ? <Check className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                <span>{applied ? 'Activated!' : 'Claim Perk'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls Strip (Flip Card & Skin Switcher) */}
      <div className="flex items-center justify-between w-full max-w-[340px] sm:max-w-[400px] mt-4 px-1 gap-2">
        {/* Flip 3D Button */}
        <button
          onClick={() => setIsFlipped((prev) => !prev)}
          className="px-3 py-1.5 rounded-full bg-white shadow-xs border border-[#F9EBDD] text-xs font-bold text-[#171717] hover:text-[#C90024] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCw className="w-3.5 h-3.5 stroke-[2.2]" />
          <span>{isFlipped ? 'View Front' : 'Flip 3D Card'}</span>
        </button>

        {/* Card Skin Switcher (RedotPay feature) */}
        <div className="flex items-center gap-1.5 bg-[#FFF8EF] border border-[#F9EBDD] rounded-full p-1">
          <button
            onClick={() => setCurrentSkin('guards-red')}
            aria-label="Guards Red Skin"
            className={`w-6 h-6 rounded-full transition-all cursor-pointer ${
              currentSkin === 'guards-red'
                ? 'ring-2 ring-[#C90024] scale-110 shadow-xs'
                : 'opacity-70 hover:opacity-100'
            }`}
            style={{ background: 'linear-gradient(135deg, #C90024, #171717)' }}
          />
          <button
            onClick={() => setCurrentSkin('matte-titanium')}
            aria-label="Matte Titanium Skin"
            className={`w-6 h-6 rounded-full transition-all cursor-pointer ${
              currentSkin === 'matte-titanium'
                ? 'ring-2 ring-white scale-110 shadow-xs'
                : 'opacity-70 hover:opacity-100'
            }`}
            style={{ background: 'linear-gradient(135deg, #2A2A2A, #0A0A0A)' }}
          />
          <button
            onClick={() => setCurrentSkin('chrono-gold')}
            aria-label="Chrono Gold Skin"
            className={`w-6 h-6 rounded-full transition-all cursor-pointer ${
              currentSkin === 'chrono-gold'
                ? 'ring-2 ring-amber-400 scale-110 shadow-xs'
                : 'opacity-70 hover:opacity-100'
            }`}
            style={{ background: 'linear-gradient(135deg, #C5A059, #3A2B14)' }}
          />
        </div>
      </div>
    </div>
  );
};
