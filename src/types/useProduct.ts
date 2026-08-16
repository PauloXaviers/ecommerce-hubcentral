import type { Product } from "./product";

export type LastFetch = { type: "default" } | { type: "search" | "category"; query: string };

export interface UseProduct {
  products: Product[] | null;
  selectedProduct: Product | null;
  hasMore: boolean;
  hasError: boolean;
  messageError: string | null;
  isLoading: boolean;
  isLoadingMore: boolean;
  skip: number;
  lastFetch: LastFetch;
  getAllProducts: () => Promise<void>;
  getProductById: (id: number) => Promise<void>;
  getProductByCategory: (query: string) => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  loadMore: () => Promise<void>;
}
