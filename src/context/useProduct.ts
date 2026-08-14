import { create } from "zustand";
import { type UseProduct } from "../types/useProduct";
import {
  getAllProducts,
  getProductByCategory,
  searchProducts,
  getProductById,
} from "../api/services/products";
import type { Product } from "../types/product";

export const useProduct = create<UseProduct>((set, get) => ({
  skip: 0,
  products: null,
  selectedProduct: null,
  hasMore: true,
  hasError: false,
  messageError: null,
  isLoading: false,
  isLoadingMore: false,
  lastFetch: { type: "default" },
  getAllProducts: async () => {
    set(() => ({ isLoading: true }));
    try {
      const response = await getAllProducts(0);
      set(() => ({
        skip: 0,
        products: response.data,
        hasMore: true,
        lastFetch: { type: "default" },
        hasError: false,
        messageError: null,
      }));
    } catch (err) {
      if (err instanceof Error) {
        set(() => ({
          hasError: true,
          messageError: "Erro ao obter produtos",
        }));
      } else {
        set(() => ({
          hasError: true,
          messageError: "Erro em nossos servidores, por favor tente novamente mais tarde",
        }));
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },
  searchProducts: async (query: string) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await searchProducts(query, 0);
      if (response.data.length === 0) {
        set(() => ({
          hasError: true,
          messageError: "Produtos não encontrados",
        }));
      } else {
        set(() => ({
          products: response.data,
          hasMore: true,
          skip: 0,
          lastFetch: { type: "search", query: query },
          hasError: false,
          messageError: null,
        }));
      }
    } catch (err) {
      if (err instanceof Error) {
        set(() => ({
          hasError: true,
          messageError: "Erro ao buscar produtos",
        }));
      } else {
        set(() => ({
          hasError: true,
          messageError: "Erro em nossos servidores, por favor tente novamente mais tarde",
        }));
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },
  getProductById: async (id: number) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await getProductById(id);
      set(() => ({
        selectedProduct: response.data,
        hasMore: true,
        skip: 0,
        lastFetch: { type: "default" },
        hasError: false,
        messageError: null,
      }));
    } catch (err) {
      if (err instanceof Error) {
        set(() => ({
          hasError: true,
          messageError: "Erro ao obter produto",
        }));
      } else {
        set(() => ({
          hasError: true,
          messageError: "Erro em nossos servidores, por favor tente novamente mais tarde",
        }));
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },
  getProductByCategory: async (query: string) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await getProductByCategory(query, 0);
      set(() => ({
        products: response.data,
        hasMore: true,
        skip: 0,
        lastFetch: { type: "category", query: query },
        hasError: false,
        messageError: null,
      }));
    } catch (err) {
      if (err instanceof Error) {
        set(() => ({
          hasError: true,
          messageError: "Erro ao obter produtos",
        }));
      } else {
        set(() => ({
          hasError: true,
          messageError: "Erro em nossos servidores, por favor tente novamente mais tarde",
        }));
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },
  loadMore: async () => {
    const { skip, lastFetch, products } = get();
    const nextSkip = skip + 10;
    let newData: Product[];
    set(() => ({ isLoadingMore: true }));
    try {
      switch (lastFetch.type) {
        case "default":
          newData = (await getAllProducts(nextSkip)).data;
          break;
        case "search":
          newData = (await searchProducts(lastFetch.query, nextSkip)).data;
          break;
        case "category":
          newData = (await getProductByCategory(lastFetch.query, nextSkip)).data;
          break;
      }

      if (newData.length === 0 || !newData) {
        throw new Error("Não há mais produtos a serem carregados");
      }

      set(() => ({
        skip: nextSkip,
        products: [...products, ...newData],
        hasMore: true,
        hasError: false,
        messageError: null,
      }));
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === "Não há mais produtos a serem carregados") {
          set(() => ({
            hasMore: false,
            hasError: false,
            messageError: err.message,
          }));
        } else {
          set(() => ({
            hasError: true,
            messageError: "Erro em nossos servidores, por favor tente novamente mais tarde",
          }));
        }
      }
    } finally {
      set(() => ({ isLoadingMore: false }));
    }
  },
}));
