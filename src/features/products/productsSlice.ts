import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Product, ProductsState } from '../../types';
import { API } from '../../services';

// Mock products data
const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    price: 299.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: {
      name: 'Electronics',
      id: 1
    },
    stock: 15,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: '2',
    title: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitoring and GPS.',
    price: 199.99,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: {
      name: 'Electronics',
      id: 1
    },
    stock: 8,
    rating: 4.6,
    reviews: 89,
  },
  // {
  //   id: '3',
  //   title: 'Professional Camera',
  //   description: 'DSLR camera perfect for photography enthusiasts and professionals.',
  //   price: 899.99,
  //   image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500',
  //   category: 'Electronics',
  //   stock: 5,
  //   rating: 4.9,
  //   reviews: 67,
  // },
  // {
  //   id: '4',
  //   title: 'Ergonomic Office Chair',
  //   description: 'Comfortable office chair with lumbar support and adjustable height.',
  //   price: 349.99,
  //   image: 'https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg?auto=compress&cs=tinysrgb&w=500',
  //   category: 'Furniture',
  //   stock: 12,
  //   rating: 4.7,
  //   reviews: 156,
  // },
  // {
  //   id: '5',
  //   title: 'Minimalist Desk Lamp',
  //   description: 'LED desk lamp with adjustable brightness and modern design.',
  //   price: 79.99,
  //   image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=500',
  //   category: 'Furniture',
  //   stock: 25,
  //   rating: 4.5,
  //   reviews: 93,
  // },
  // {
  //   id: '6',
  //   title: 'Premium Coffee Beans',
  //   description: 'Organic single-origin coffee beans with rich flavor profile.',
  //   price: 24.99,
  //   image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=500',
  //   category: 'Food',
  //   stock: 50,
  //   rating: 4.8,
  //   reviews: 234,
  // },
];

// export const fetchProducts = createAsyncThunk(
//   'products/fetchProducts',
//   async () => {
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 500));
//     return mockProducts;
//   }
// );
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    // Simulate API call
    const response = await API.get("/products")
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }
);

const initialState: ProductsState = {
  items: [],
  isLoading: false,
  searchTerm: '',
  selectedCategory: '',
  selectedProduct: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.isLoading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.isLoading = false;
        state.selectedProduct = null;
      });
  },
});

export const { setSearchTerm, setSelectedCategory, clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;