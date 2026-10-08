import { useProduct } from '../context/useProduct';
import type { ParamsQuery } from '../pages/Products/Products';

type UseProductFetching = {
  filteringFetchType: (paramsQuery: ParamsQuery) => Promise<void>;
};

export const useProductFetching = (): UseProductFetching => {
  const searchProducts = useProduct((state) => state.searchProducts);
  const getProductByCategory = useProduct((state) => state.getProductByCategory);
  const getProductById = useProduct((state) => state.getProductById);

  const filteringFetchType = async (paramsQuery: ParamsQuery) => {
    switch (paramsQuery.type) {
      case 'product':
        await getProductById(Number(paramsQuery.query));
        break;
      case 'search':
        await searchProducts(paramsQuery.query);
        break;
      case 'category':
        await getProductByCategory(paramsQuery.query);
        break;
    }
  };

  return {
    filteringFetchType,
  };
};
