export interface User {
  id: string;
  email: string;
  username: string;
  is_admin:boolean;
  is_customer:boolean;
}

export interface SignUpUser {
  username: string;
  email: string;
  password: string;
  is_admin?: boolean;
  is_customer?: boolean
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  category: {
    id: number;
    name: string
  };
  stock: number;
  rating: number;
  reviews: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  createdAt: string;
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface ProductsState {
  items: Product[];
  isLoading: boolean;
  searchTerm: string;
  selectedCategory: string;
  selectedProduct: Product | null;
}

export interface CartState {
  items: CartItem[];
  total: number;
  isOpen: boolean;
}

export interface OrdersState {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
}

export type Theme = 'light' | 'dark';