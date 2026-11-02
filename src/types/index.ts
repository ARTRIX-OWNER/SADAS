export interface ProductItem {
  id: string;
  name: string;
  category: 'Buckets' | 'Burgers' | 'Chicken' | 'Snacks' | 'Drinks' | 'Desserts';
  image: string;
  badge?: string;
  badgeType?: 'bestseller' | 'popular' | 'discount';
  description: string;
  rating: number;
  reviewsCount?: number;
  price: number;
  originalPrice?: number;
  prepTime?: string;
  calories?: string;
  spiceLevel?: 'Mild' | 'Medium' | 'Carrera Hot' | 'Turbo 911';
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface HeroSlide {
  id: string;
  headline: string;
  subheadline: string;
  badge: string;
  image: string;
  comboName: string;
  price: number;
  accent: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'offer' | 'order' | 'reward';
}
