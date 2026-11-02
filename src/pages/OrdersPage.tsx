import React from 'react';
import { Clock, CheckCircle2, Flame, MapPin, ShoppingBag, ArrowRight, RotateCcw } from 'lucide-react';
import { CartItem, ProductItem } from '../types';
import { calculateOrderTotals } from '../utils/orderLogic';

interface OrdersPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onAddToCart: (product: ProductItem) => void;
  isDiscountApplied: boolean;
  onCheckout: () => void;
  onNavigateToMenu: () => void;
}

export const OrdersPage: React.FC<OrdersPageProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onAddToCart,
  isDiscountApplied,
  onCheckout,
  onNavigateToMenu,
}) => {
  const totals = calculateOrderTotals(cartItems, isDiscountApplied);

  const pastOrders = [
    {
      id: 'ORD-91184',
      date: 'Yesterday at 7:42 PM',
      items: '8 Pcs Chicken Bucket, 2 Large Fries, 2 Dips',
      total: 24.99,
      status: 'Delivered',
    },
    {
      id: 'ORD-91162',
      date: 'Oct 28, 2026',
      items: 'Zinger Burger Combo, Truffle Fries, Condensation Cola',
      total: 15.48,
      status: 'Delivered',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 animate-fadeIn">
      {/* Title */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-6 rounded-full bg-[#C90024]" />
          <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-[#171717] uppercase">
            Orders & Kitchen Velocity
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#292929]/70">
          Track active kitchen preparation and view past feast receipts
        </p>
      </div>

      {/* Active Order Tracker */}
      <div className="mb-8 rounded-3xl bg-white border border-[#F9EBDD] p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#F9EBDD] gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C90024] block">
              Active Velocity Order #K-91102
            </span>
            <h3 className="font-display text-lg font-bold text-[#171717]">
              Preparing in Stuttgart Central Kitchen
            </h3>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF1E5] text-[#C90024] text-xs font-bold">
            <Clock className="w-4 h-4" />
            <span>ETA: ~11 Minutes</span>
          </div>
        </div>

        {/* 4-Step Progress Tracker */}
        <div className="py-6 grid grid-cols-4 gap-2 text-center relative">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#171717] text-white flex items-center justify-center text-xs font-bold mb-2">
              ✓
            </div>
            <span className="text-[11px] font-bold text-[#171717]">Order Placed</span>
            <span className="text-[10px] text-[#292929]/50">10:14 AM</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#C90024] text-white flex items-center justify-center text-xs font-bold mb-2 guards-red-glow animate-pulse">
              <Flame className="w-4 h-4 fill-current" />
            </div>
            <span className="text-[11px] font-bold text-[#C90024]">Pressure Fry</span>
            <span className="text-[10px] text-[#C90024] font-semibold">Active Now</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#F9EBDD] text-[#292929]/40 flex items-center justify-center text-xs font-bold mb-2">
              3
            </div>
            <span className="text-[11px] font-semibold text-[#292929]/60">Thermal Seal</span>
            <span className="text-[10px] text-[#292929]/40">Queued</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#F9EBDD] text-[#292929]/40 flex items-center justify-center text-xs font-bold mb-2">
              4
            </div>
            <span className="text-[11px] font-semibold text-[#292929]/60">Dispatched</span>
            <span className="text-[10px] text-[#292929]/40">Taycan Express</span>
          </div>
        </div>

        <div className="bg-[#FFF8EF] rounded-2xl p-3.5 flex items-center justify-between text-xs text-[#292929]/80">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#C90024]" />
            <span>Delivering to: <strong>Downtown Flagship Residence, Suite 911</strong></span>
          </div>
          <span className="text-[10px] font-mono text-[#292929]/50">Courier: Marcus K.</span>
        </div>
      </div>

      {/* Current Order Bag Section */}
      <div className="mb-8">
        <h3 className="font-display text-lg font-bold text-[#171717] mb-3">
          Current Order Bag ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
        </h3>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 border border-[#F9EBDD] text-center">
            <ShoppingBag className="w-10 h-10 text-[#C90024]/50 mx-auto mb-2" />
            <h4 className="font-display text-base font-bold text-[#171717] mb-1">
              Your bag is currently empty
            </h4>
            <p className="text-xs text-[#292929]/60 mb-4">
              Explore our full menu to assemble your crispy chicken banquet.
            </p>
            <button
              onClick={onNavigateToMenu}
              className="px-5 py-2.5 rounded-full bg-[#C90024] text-white text-xs font-bold uppercase tracking-wider guards-red-glow cursor-pointer"
            >
              Browse Full Menu
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-[#F9EBDD] p-5 space-y-4">
            <div className="divide-y divide-[#F9EBDD]/60">
              {cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="py-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-xl object-cover bg-[#FFF1E5]"
                    />
                    <div>
                      <h5 className="font-display text-sm font-bold text-[#171717]">
                        {product.name}
                      </h5>
                      <span className="text-xs text-[#C90024] font-bold tabular-nums">
                        ${(product.price * quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(product.id, -1)}
                      className="w-7 h-7 rounded-full bg-[#FFF8EF] border border-[#F9EBDD] flex items-center justify-center font-bold text-xs cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold px-1 tabular-nums">{quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(product.id, 1)}
                      className="w-7 h-7 rounded-full bg-[#FFF8EF] border border-[#F9EBDD] flex items-center justify-center font-bold text-xs cursor-pointer"
                    >
                      +
                    </button>
                    <button
                      onClick={() => onRemoveItem(product.id)}
                      className="text-xs text-[#292929]/40 hover:text-[#C90024] ml-2 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-3 border-t border-[#F9EBDD] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs space-y-1 w-full sm:w-auto">
                <div>Subtotal: <strong>${totals.subtotal.toFixed(2)}</strong></div>
                {isDiscountApplied && (
                  <div className="text-[#C90024]">30% VIP Voucher: <strong>-${totals.discount.toFixed(2)}</strong></div>
                )}
                <div className="text-base font-bold text-[#171717]">
                  Final Total: <span className="text-[#C90024] font-display text-lg">${totals.total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#C90024] hover:bg-[#E31827] text-white font-display text-xs font-bold uppercase tracking-wider guards-red-glow flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Complete Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Past Order Receipts */}
      <div>
        <h3 className="font-display text-lg font-bold text-[#171717] mb-3">
          Past Order History
        </h3>
        <div className="space-y-3">
          {pastOrders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white rounded-2xl p-4 border border-[#F9EBDD] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#171717]">{ord.id}</span>
                  <span className="text-[10px] text-[#292929]/50">· {ord.date}</span>
                </div>
                <p className="text-xs text-[#292929]/75 mt-0.5">{ord.items}</p>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <span className="font-display text-sm font-bold text-[#171717] tabular-nums">
                  ${ord.total.toFixed(2)}
                </span>
                <button
                  onClick={onNavigateToMenu}
                  className="px-3.5 py-1.5 rounded-full bg-[#FFF8EF] hover:bg-[#C90024] hover:text-white border border-[#F9EBDD] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reorder</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
