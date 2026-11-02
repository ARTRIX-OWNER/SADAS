import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, Percent } from 'lucide-react';
import { CartItem } from '../types';
import { calculateOrderTotals } from '../utils/orderLogic';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  isDiscountApplied: boolean;
  onToggleDiscount: () => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  isDiscountApplied,
  onToggleDiscount,
  onCheckout,
}) => {
  const totals = calculateOrderTotals(items, isDiscountApplied);

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

          {/* Slide-over Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#FFF8EF] border-l border-[#F9EBDD] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#F9EBDD] flex items-center justify-between bg-white">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#171717] text-white flex items-center justify-center">
                  <ShoppingBag className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-[#171717]">
                    Your Order Bag
                  </h3>
                  <p className="text-xs text-[#292929]/60">
                    {items.length} {items.length === 1 ? 'item' : 'items'} selected
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close cart"
                className="w-9 h-9 rounded-full bg-[#F9EBDD]/60 hover:bg-[#F9EBDD] flex items-center justify-center text-[#292929] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[2]" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-[#FFF1E5] flex items-center justify-center text-[#C90024] mb-3">
                    <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-[#171717] mb-1">
                    Your bag is empty
                  </h4>
                  <p className="text-xs text-[#292929]/60 max-w-xs mb-4">
                    Explore our iconic 8 Pcs Bucket or Turbo Zinger combos to get started.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-full bg-[#C90024] text-white text-xs font-bold uppercase tracking-wider guards-red-glow cursor-pointer"
                  >
                    Start Ordering
                  </button>
                </div>
              ) : (
                items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl p-3.5 border border-[#F9EBDD] shadow-xs flex items-center gap-3.5"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-[#FFF1E5]"
                    />

                    <div className="flex-1 min-w-0">
                      <h5 className="font-display text-sm font-bold text-[#171717] truncate">
                        {product.name}
                      </h5>
                      <p className="text-xs text-[#C90024] font-bold mt-0.5 tabular-nums">
                        ${(product.price * quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-1.5 bg-[#FFF8EF] border border-[#F9EBDD] rounded-full p-1">
                      <button
                        onClick={() => onUpdateQuantity(product.id, -1)}
                        aria-label="Decrease quantity"
                        className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#292929] hover:text-[#C90024] shadow-2xs cursor-pointer"
                      >
                        <Minus className="w-3 h-3 stroke-[2.5]" />
                      </button>
                      <span className="text-xs font-bold text-[#171717] px-1 tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, 1)}
                        aria-label="Increase quantity"
                        className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#292929] hover:text-[#C90024] shadow-2xs cursor-pointer"
                      >
                        <Plus className="w-3 h-3 stroke-[2.5]" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(product.id)}
                      aria-label="Remove item"
                      className="p-1.5 text-[#292929]/40 hover:text-[#C90024] transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Calculation & Checkout */}
            {items.length > 0 && (
              <div className="p-5 bg-white border-t border-[#F9EBDD] space-y-3">
                {/* 30% Promo code perk */}
                <div
                  onClick={onToggleDiscount}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    isDiscountApplied
                      ? 'bg-[#C90024]/10 border-[#C90024] text-[#C90024]'
                      : 'bg-[#FFF8EF] border-[#F9EBDD] text-[#292929]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Percent className="w-4 h-4 text-[#C90024]" />
                    <span className="text-xs font-bold">
                      {isDiscountApplied ? '30% Exclusive Voucher Applied' : 'Apply 30% Exclusive Voucher'}
                    </span>
                  </div>
                  <span className="text-xs font-bold underline">
                    {isDiscountApplied ? 'Remove' : 'Apply'}
                  </span>
                </div>

                {/* Totals */}
                <div className="space-y-1.5 text-xs text-[#292929]/75 pt-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#171717] tabular-nums">
                      ${totals.subtotal.toFixed(2)}
                    </span>
                  </div>
                  {isDiscountApplied && (
                    <div className="flex justify-between text-[#C90024]">
                      <span>Exclusive Discount (-30%)</span>
                      <span className="font-semibold tabular-nums">
                        -${totals.discount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-semibold text-[#171717] tabular-nums">
                      {totals.deliveryFee === 0 ? 'FREE' : `$${totals.deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax</span>
                    <span className="font-semibold text-[#171717] tabular-nums">
                      ${totals.tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#171717] pt-2 border-t border-[#F9EBDD]">
                    <span className="font-display">Total</span>
                    <span className="font-display text-[#C90024] text-lg tabular-nums">
                      ${totals.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={onCheckout}
                  className="w-full py-3.5 rounded-full bg-[#C90024] hover:bg-[#E31827] text-white font-display font-bold text-sm tracking-wide shadow-lg guards-red-glow flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Complete Order</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
