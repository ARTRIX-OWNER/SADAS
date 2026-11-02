import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterProducts,
  calculateOrderTotals,
  toggleFavoriteId,
  maskSensitiveValue,
  maskCardNumber,
  ProductItem,
} from './orderLogic.ts';

const mockProducts: ProductItem[] = [
  {
    id: 'p1',
    name: '8 Pcs Chicken Bucket',
    category: 'Buckets',
    image: '/test1.jpg',
    badge: 'BESTSELLER',
    description: '8 Pieces Chicken + 2 Large Fries + 2 Dips + 2 Drinks.',
    rating: 4.8,
    price: 24.99,
  },
  {
    id: 'p2',
    name: 'Zinger Burger Combo',
    category: 'Burgers',
    image: '/test2.jpg',
    badge: 'POPULAR',
    description: 'Zinger Burger + Fries + Drink.',
    rating: 4.7,
    price: 9.99,
  },
  {
    id: 'p3',
    name: '5 Pcs Hot & Crispy',
    category: 'Chicken',
    image: '/test3.jpg',
    badge: 'SAVE 15%',
    description: '5 Pieces Chicken + Fries + Drink.',
    rating: 4.6,
    price: 15.99,
  },
];

test('filterProducts returns all products when All category is selected', () => {
  const result = filterProducts(mockProducts, 'All', '');
  assert.equal(result.length, 3);
});

test('filterProducts filters by category accurately', () => {
  const result = filterProducts(mockProducts, 'Burgers', '');
  assert.equal(result.length, 1);
  assert.equal(result[0].name, 'Zinger Burger Combo');
});

test('filterProducts filters by search query string', () => {
  const result = filterProducts(mockProducts, 'All', 'zinger');
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'p2');
});

test('calculateOrderTotals handles empty cart', () => {
  const totals = calculateOrderTotals([]);
  assert.equal(totals.subtotal, 0);
  assert.equal(totals.total, 0);
});

test('calculateOrderTotals computes subtotal, free delivery threshold, and 30% discount', () => {
  const items = [
    { product: mockProducts[0], quantity: 1 }, // 24.99
    { product: mockProducts[1], quantity: 1 }, // 9.99 -> subtotal 34.98 (>30, delivery 0)
  ];
  const totalsWithDiscount = calculateOrderTotals(items, true);
  assert.equal(totalsWithDiscount.subtotal, 34.98);
  assert.equal(totalsWithDiscount.discount, 10.49);
  assert.equal(totalsWithDiscount.deliveryFee, 0);
  assert.ok(totalsWithDiscount.total > 0);
});

test('toggleFavoriteId adds and removes IDs immutably', () => {
  let favs = ['p1'];
  favs = toggleFavoriteId(favs, 'p2');
  assert.deepEqual(favs, ['p1', 'p2']);
  favs = toggleFavoriteId(favs, 'p1');
  assert.deepEqual(favs, ['p2']);
});

test('maskSensitiveValue hides values when isHidden is true', () => {
  assert.equal(maskSensitiveValue('$142.50', true), '••••••');
  assert.equal(maskSensitiveValue('$142.50', false), '$142.50');
});

test('maskCardNumber partially masks card number digits when isHidden is true', () => {
  assert.equal(
    maskCardNumber('9110 · 2026 · 8900 · 0024', true),
    '9110 · •••• · •••• · 0024'
  );
  assert.equal(
    maskCardNumber('9110 · 2026 · 8900 · 0024', false),
    '9110 · 2026 · 8900 · 0024'
  );
});
