import { create } from 'zustand';
import { type UseProduct } from '../types/useProduct';
import {
  getAllProducts,
  getProductByCategory,
  searchProducts,
  getProductById,
} from '../api/services/products';
import type { Product } from '../types/product';

export const useProduct = create<UseProduct>((set, get) => ({
  skip: 0,
  products: null,
  selectedProduct: null,
  hasMore: false,
  hasError: false,
  messageError: null,
  isLoading: false,
  isLoadingMore: false,
  lastFetch: { type: 'default' },
  getAllProducts: async () => {
    set(() => ({ isLoading: true }));
    try {
      const response = await getAllProducts(0);
      set(() => ({
        skip: 0,
        products: response.data,
        selectedProduct: null,
        hasMore: true,
        hasError: false,
        messageError: null,
        lastFetch: { type: 'default' },
      }));
    } catch (err) {
      if (err instanceof Error) {
        set(() => ({
          hasError: true,
          messageError: 'Erro ao obter produtos',
        }));
      } else {
        set(() => ({
          hasError: true,
          messageError: 'Erro em nossos servidores, por favor tente novamente mais tarde',
        }));
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },
  searchProducts: async (query: string) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await searchProducts(query);
      if (response.data.length === 0) {
        set(() => ({
          skip: 0,
          products: null,
          selectedProduct: null,
          hasMore: false,
          hasError: true,
          messageError: 'Produtos não encontrados',
          lastFetch: { type: 'search', query: query },
        }));
      } else {
        set(() => ({
          skip: 0,
          products: response.data,
          selectedProduct: null,
          hasMore: false,
          hasError: false,
          messageError: 'Não há mais produtos a serem carregados',
          lastFetch: { type: 'search', query: query },
        }));
      }
    } catch (err) {
      if (err instanceof Error) {
        set(() => ({
          hasError: true,
          messageError: 'Erro ao buscar produtos',
        }));
      } else {
        set(() => ({
          hasError: true,
          messageError: 'Erro em nossos servidores, por favor tente novamente mais tarde',
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
      const productsByCategory = await getProductByCategory(response.data.category, 0);
      if (productsByCategory.data.length < 12) {
        set(() => ({
          skip: 0,
          products: productsByCategory.data,
          selectedProduct: response.data,
          hasMore: false,
          hasError: false,
          messageError: 'Não há mais produtos a serem carregados',
          lastFetch: { type: 'category', query: response.data.category },
        }));
        return;
      }
      set(() => ({
        skip: 0,
        products: productsByCategory.data,
        selectedProduct: response.data,
        hasMore: true,
        hasError: false,
        messageError: null,
        lastFetch: { type: 'category', query: response.data.category },
      }));
    } catch (err) {
      if (err instanceof Error) {
        set(() => ({
          hasError: true,
          messageError: 'Erro ao obter produto',
        }));
      } else {
        set(() => ({
          hasError: true,
          messageError: 'Erro em nossos servidores, por favor tente novamente mais tarde',
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
      if (response.data.length < 12) {
        set(() => ({
          skip: 0,
          products: response.data,
          selectedProduct: null,
          hasMore: false,
          hasError: false,
          messageError: 'Não há mais produtos a serem carregados',
          lastFetch: { type: 'category', query: query },
        }));
        return;
      }
      set(() => ({
        skip: 0,
        products: response.data,
        selectedProduct: null,
        hasMore: true,
        hasError: false,
        messageError: null,
        lastFetch: { type: 'category', query: query },
      }));
    } catch (err) {
      if (err instanceof Error) {
        set(() => ({
          hasError: true,
          messageError: 'Erro ao obter produtos',
        }));
      } else {
        set(() => ({
          hasError: true,
          messageError: 'Erro em nossos servidores, por favor tente novamente mais tarde',
        }));
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },
  loadMore: async () => {
    const { skip, lastFetch, products } = get();
    const nextSkip = skip + 12;
    let newData: Product[];
    set(() => ({ isLoadingMore: true }));
    try {
      switch (lastFetch.type) {
        case 'default':
          newData = (await getAllProducts(nextSkip)).data;
          break;
        case 'search':
          throw new Error('A busca não suporta carregamento adicional');
        case 'category':
          newData = (await getProductByCategory(lastFetch.query, nextSkip)).data;
          break;
      }

      if (!newData || newData.length === 0) {
        throw new Error('Não há mais produtos a serem carregados');
      }
      if (newData.length < 12) {
        set(() => ({
          skip: nextSkip,
          products: products && [...products, ...newData],
        }));
        throw new Error('Não há mais produtos a serem carregados');
      }

      set(() => ({
        skip: nextSkip,
        products: products && [...products, ...newData],
        hasMore: true,
        hasError: false,
        messageError: null,
        lastFetch: lastFetch,
      }));
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'Não há mais produtos a serem carregados') {
          set(() => ({
            hasMore: false,
            hasError: false,
            messageError: err.message,
            lastFetch: lastFetch,
          }));
        } else if (err.message === 'A busca não suporta carregamento adicional') {
          set(() => ({
            hasMore: false,
            hasError: false,
            messageError: 'Não foi possível carregar mais produtos',
            lastFetch: lastFetch,
          }));
        } else {
          set(() => ({
            hasMore: false,
            hasError: true,
            messageError: 'Erro em nossos servidores, por favor tente novamente mais tarde',
            lastFetch: lastFetch,
          }));
        }
      }
    } finally {
      set(() => ({ isLoadingMore: false }));
    }
  },
}));
