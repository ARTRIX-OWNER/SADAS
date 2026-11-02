import React, { useState } from 'react';
import { Tag, Sparkles, Copy, Check, Percent, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { RedotPayCard } from '../components/RedotPayCard';

interface OffersPageProps {
  onApplyVipDiscount: () => void;
  isDiscountApplied: boolean;
}

export const OffersPage: React.FC<OffersPageProps> = ({
  onApplyVipDiscount,
  isDiscountApplied,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const vouchers = [
    {
      code: 'CARRERA30',
      title: '30% Off Exclusive Combos',
      desc: 'Valid on 8 Pcs Chicken Buckets and Double Velocity Combos.',
      tag: 'RedotPay VIP Special',
      isVip: true,
    },
    {
      code: 'VELOCITYFREE',
      title: 'Free Priority Stuttgart Delivery',
      desc: 'Free thermal-speed delivery on all orders over $25.',
      tag: 'Speed Perk',
    },
    {
      code: 'REDOTPAY5',
      title: '$5 Off Instant Tap-to-Dine',
      desc: 'Welcome dining gift applied on your next restaurant feast.',
      tag: 'New Member',
    },
    {
      code: 'ZINGERBOGO',
      title: 'Buy 1 Get 1 Zinger Burger',
      desc: 'Midweek double crunch privilege available Tuesdays and Thursdays.',
      tag: 'Limited Run',
    },
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 animate-fadeIn">
      {/* Title */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-6 rounded-full bg-[#C90024]" />
          <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-[#171717] uppercase">
            Exclusive Offers & Privileges
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#292929]/70">
          RedotPay culinary perks, VIP vouchers, and Porsche 911 dining privileges
        </p>
      </div>

      {/* Hero Showcase with RedotPay 3D Card */}
      <div className="mb-8 rounded-3xl bg-gradient-to-br from-[#171717] via-[#241719] to-[#0F0F0F] text-white p-6 sm:p-8 border border-[#292929] shadow-xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6">
          <div className="lg:col-span-7">
            <span className="px-3 py-1 rounded-full bg-[#C90024]/20 border border-[#C90024]/40 text-[#E31827] text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>RedotPay Tap-to-Dine VIP Pass</span>
            </span>

            <h3 className="font-display text-2xl sm:text-4xl font-black uppercase text-white mb-2 leading-tight">
              Unlock 30% Instant Discount on Every Order
            </h3>

            <p className="text-xs sm:text-sm text-white/75 mb-5 max-w-lg leading-relaxed">
              Activate your virtual Karrera 911 VIP Pass powered by RedotPay. Enjoy automated 30% savings, complimentary thermal priority dispatch, and secret tasting menu drops.
            </p>

            <button
              onClick={onApplyVipDiscount}
              className={`px-6 py-3 rounded-full font-display text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg cursor-pointer transition-all ${
                isDiscountApplied
                  ? 'bg-white text-[#171717]'
                  : 'bg-[#C90024] hover:bg-[#E31827] text-white guards-red-glow'
              }`}
            >
              {isDiscountApplied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>30% Voucher Active in Bag</span>
                </>
              ) : (
                <>
                  <span>Activate 30% Pass Now</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <RedotPayCard onApplyVipDiscount={onApplyVipDiscount} />
          </div>
        </div>
      </div>

      {/* Vouchers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vouchers.map((v) => {
          const isCopied = copiedCode === v.code;
          return (
            <div
              key={v.code}
              className="bg-white rounded-2xl p-5 border border-[#F9EBDD] shadow-xs flex items-center justify-between gap-4"
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C90024] block mb-1">
                  {v.tag}
                </span>
                <h4 className="font-display text-base font-bold text-[#171717] mb-0.5">
                  {v.title}
                </h4>
                <p className="text-xs text-[#292929]/70 max-w-sm mb-2.5">
                  {v.desc}
                </p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FFF8EF] border border-[#F9EBDD] font-mono text-xs font-bold text-[#171717]">
                  <span>CODE:</span>
                  <span className="text-[#C90024]">{v.code}</span>
                </div>
              </div>

              <button
                onClick={() => handleCopy(v.code)}
                className="px-3.5 py-2 rounded-xl bg-[#FFF8EF] hover:bg-[#C90024] hover:text-white text-[#292929] text-xs font-bold border border-[#F9EBDD] flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
