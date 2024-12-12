export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'customer' | 'vendor' | 'admin';
  preferences: {
    language: string;
    currency: string;
    theme: 'light' | 'dark';
  };
  addresses: Address[];
  wishlist: string[]; // Product IDs
  cart: CartItem[];
}

export interface Address {
  id: string;
  type: 'shipping' | 'billing';
  name: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
  isDefault: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedOptions?: {
    [key: string]: string;
  };
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateCartItem: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
} 