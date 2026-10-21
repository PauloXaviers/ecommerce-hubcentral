import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Product } from '../types/product';
import toast from 'react-hot-toast';

type CartProduct = Product & { quantity: number };

type UseCart = {
  cart: CartProduct[];
  isCartOpen: boolean;
  toggleCartOpen: () => void;
  addCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  removeQuantity: (product: Product) => void;
};

export const useCart = create<UseCart>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,
      toggleCartOpen: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      addCart: (product) => {
        const cartState = get().cart;
        const existingProduct = cartState.find((item) => item.id === product.id);

        if (existingProduct) {
          set(() => ({
            cart: cartState.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          }));
          toast.success('Produto adicionado ao carrinho');
          return;
        }
        set(() => ({
          cart: [...cartState, { ...product, quantity: 1 }],
        }));
        toast.success('Produto adicionado ao carrinho');
      },
      removeFromCart: (product) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== product.id),
        }));
        toast.success('Produto removido do carrinho com sucesso');
      },
      removeQuantity: (product) => {
        set((state) => ({
          cart: state.cart.flatMap((item) => {
            if (item.id !== product.id) return [item];
            if (item.quantity > 1) return [{ ...item, quantity: item.quantity - 1 }];
            return [];
          }),
        }));
        toast.success('Quantidade removida com sucesso');
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
