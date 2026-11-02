import React, { useState } from 'react';
import { Eye, EyeOff, Plus, TrendingUp, CreditCard, Shield, MapPin, Bell, ChevronRight, Check } from 'lucide-react';
import { RedotPayCard } from '../components/RedotPayCard';
import { maskSensitiveValue } from '../utils/orderLogic';

interface ProfilePageProps {
  onApplyVipDiscount: () => void;
  showToast: (msg: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onApplyVipDiscount, showToast }) => {
  // RedotPay signature "Hide Button" state
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const [isCardNumberHidden, setIsCardNumberHidden] = useState(false);

  const toggleHideBalance = () => {
    setIsBalanceHidden((prev) => {
      const nextState = !prev;
      showToast(nextState ? 'Balance hidden (RedotPay Privacy Mode)' : 'Balance visible');
      return nextState;
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 animate-fadeIn">
      {/* Title */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-6 rounded-full bg-[#C90024]" />
          <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-[#171717] uppercase">
            VIP Profile & RedotPay Assets
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#292929]/70">
          Manage your dining credentials, virtual passes, and privacy settings
        </p>
      </div>

      {/* RedotPay Style Asset Header with the Signature HIDE BUTTON (Eye Toggle) */}
      <div className="mb-8 rounded-3xl bg-white border border-[#F9EBDD] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F9EBDD]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#292929]/60 uppercase tracking-wider mb-1">
              <span>Est. total value</span>
              {/* THE HIDE BUTTON (RedotPay Eye Toggle) */}
              <button
                onClick={toggleHideBalance}
                aria-label={isBalanceHidden ? 'Show balance' : 'Hide balance'}
                className="p-1 rounded-full hover:bg-[#FFF8EF] text-[#292929]/70 hover:text-[#C90024] transition-colors cursor-pointer"
                title={isBalanceHidden ? 'Show balance' : 'Hide balance'}
              >
                {isBalanceHidden ? (
                  <EyeOff className="w-4 h-4 stroke-[2.2] text-[#C90024]" />
                ) : (
                  <Eye className="w-4 h-4 stroke-[2.2]" />
                )}
              </button>
            </div>

            {/* Displayed Balance (Masked when Hide button is active) */}
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl sm:text-5xl font-black text-[#171717] tabular-nums tracking-tight">
                {isBalanceHidden ? '••••••' : '142.50'}
              </span>
              <span className="font-display text-base sm:text-xl font-bold text-[#292929]/70">
                USD
              </span>
            </div>

            <div className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <span>+0.00 USD</span>
              <span className="text-[#292929]/50 font-normal">Last 24h earnings</span>
            </div>
          </div>

          {/* RedotPay-Style Quick Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => showToast('Deposit: RedotPay instant top-up ready')}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-[#171717] hover:bg-[#C90024] text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Add funds</span>
            </button>
            <button
              onClick={() => showToast('Velocity Staking: 2.04% APY active')}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-[#FFF8EF] hover:bg-[#FFF1E5] text-[#171717] border border-[#F9EBDD] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Earn</span>
            </button>
            <button
              onClick={() => showToast('VIP Dining Credit Limit: $500.00 USD')}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-[#FFF8EF] hover:bg-[#FFF1E5] text-[#171717] border border-[#F9EBDD] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Credit</span>
            </button>
          </div>
        </div>

        {/* Balance Breakdown List (RedotPay Crypto & Dining Asset List) */}
        <div className="pt-5 divide-y divide-[#F9EBDD]/50 text-xs">
          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#C90024] text-white flex items-center justify-center font-bold text-xs">
                K
              </div>
              <div>
                <span className="font-bold text-[#171717] block">Karrera Velocity Points</span>
                <span className="text-[10px] text-[#292929]/50">Dining rewards & free upgrades</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-[#171717] tabular-nums block">
                {maskSensitiveValue('1,450.00 PTS', isBalanceHidden)}
              </span>
              <span className="text-[10px] text-[#292929]/50">≈ $14.50 USD</span>
            </div>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#171717] text-white flex items-center justify-center font-bold text-xs">
                $
              </div>
              <div>
                <span className="font-bold text-[#171717] block">RedotPay Dining Cash</span>
                <span className="text-[10px] text-[#292929]/50">Instant contactless checkout</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-[#171717] tabular-nums block">
                {maskSensitiveValue('$128.00 USD', isBalanceHidden)}
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold">Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3D RedotPay Card Section */}
      <div className="mb-8 rounded-3xl bg-[#171717] text-white p-6 sm:p-8 border border-[#292929] shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C90024] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#E31827]">
                Virtual Card Terminal
              </span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold uppercase mb-2">
              Karrera 911 Titanium Card
            </h3>
            <p className="text-xs sm:text-sm text-white/70 mb-4 leading-relaxed">
              Use with Apple Pay, Google Pay, or directly tap in-restaurant for 30% discount automation and instant thermal dispatch.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/80">
              <Shield className="w-4 h-4 text-[#C90024]" />
              <span>Biometric Security · Visa & Mastercard Network</span>
            </div>
          </div>

          <div className="flex justify-center w-full md:w-auto">
            <RedotPayCard onApplyVipDiscount={onApplyVipDiscount} />
          </div>
        </div>
      </div>

      {/* User Preferences & Settings */}
      <div className="bg-white rounded-3xl border border-[#F9EBDD] p-5 sm:p-6 space-y-4">
        <h4 className="font-display text-base font-bold text-[#171717]">
          Preferences & Delivery Addresses
        </h4>

        <div className="space-y-2">
          <div className="p-3.5 rounded-2xl bg-[#FFF8EF] border border-[#F9EBDD] flex items-center justify-between cursor-pointer hover:border-[#C90024]/40 transition-colors">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#C90024]" />
              <div>
                <span className="text-xs font-bold text-[#171717] block">Primary Delivery Hub</span>
                <span className="text-[11px] text-[#292929]/70">Stuttgart Flagship Quarter, Suite 911</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#292929]/40" />
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FFF8EF] border border-[#F9EBDD] flex items-center justify-between cursor-pointer hover:border-[#C90024]/40 transition-colors">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-[#C90024]" />
              <div>
                <span className="text-xs font-bold text-[#171717] block">Order Velocity Notifications</span>
                <span className="text-[11px] text-[#292929]/70">Live push updates on pressure frying progress</span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-600">Enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};
