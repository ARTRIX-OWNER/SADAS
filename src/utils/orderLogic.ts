import { ProductItem, CartItem } from '../types';
export type { ProductItem, CartItem };

export function filterProducts(
  products: ProductItem[],
  selectedCategory: string,
  searchQuery: string
): ProductItem[] {
  return products.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });
}

export function calculateOrderTotals(
  items: CartItem[],
  apply30PercentDiscount: boolean = false
): {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tax: number;
  total: number;
} {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discount = apply30PercentDiscount ? subtotal * 0.3 : 0;
  const taxableAmount = Math.max(0, subtotal - discount);
  const deliveryFee = subtotal > 30 || subtotal === 0 ? 0 : 3.99;
  const tax = taxableAmount * 0.0825; // standard tax rate
  const total = taxableAmount + deliveryFee + tax;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    discount: Number(discount.toFixed(2)),
    deliveryFee: Number(deliveryFee.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
}

export function toggleFavoriteId(favorites: string[], productId: string): string[] {
  if (favorites.includes(productId)) {
    return favorites.filter((id) => id !== productId);
  }
  return [...favorites, productId];
}

export function maskSensitiveValue(value: string | number, isHidden: boolean): string {
  if (!isHidden) return String(value);
  return '••••••';
}

export function maskCardNumber(cardNumber: string, isHidden: boolean): string {
  if (!isHidden) return cardNumber;
  const parts = cardNumber.split(' · ');
  if (parts.length >= 4) {
    return `${parts[0]} · •••• · •••• · ${parts[3]}`;
  }
  return '•••• · •••• · •••• · ••••';
}
