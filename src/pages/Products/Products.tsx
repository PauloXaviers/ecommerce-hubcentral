import { useEffect, useMemo } from 'react';
import { useProduct } from '../../context/useProduct';
import { useSearchParams } from 'react-router-dom';
import { useProductFetching } from '../../hooks/useProductFetching';
import ProductsSection from '../../components/ProductsSection/ProductsSection';
import ProductDetails from '../../components/ProductDetails/ProductDetails';
import SocialMedia from '../../components/SocialMedia/SocialMedia';
import './Products.scss';
import SkeletonProductDetails from '../../components/ProductDetails/SkeletonProductDetails';

export type ParamsQuery = { type: 'product' | 'category' | 'search'; query: string };
export type DinamicTexts = { title?: string; description?: string };

const Products = () => {
  const [searchParams] = useSearchParams();
  const { filteringFetchType } = useProductFetching();
  const isLoading = useProduct((state) => state.isLoading);

  const paramsQuery: ParamsQuery = useMemo(
    () => ({
      type: searchParams.get('type') as ParamsQuery['type'],
      query: searchParams.get('query'),
    }),
    [searchParams]
  );

  useEffect(() => {
    (async () => {
      await filteringFetchType(paramsQuery);
    })();
  }, [paramsQuery, filteringFetchType]);

  const dinamicTexts: DinamicTexts = {
    category: { title: `Resultados da categoria: ${paramsQuery.query}` },
    search: { title: `Resultados da pesquisa: ${paramsQuery.query}` },
    product: { description: 'Navegue entre produtos semelhantes...' },
  }[paramsQuery.type];

  const product = () => {
    if (paramsQuery.type === 'product') {
      return isLoading ? <SkeletonProductDetails /> : <ProductDetails />;
    }
  };

  return (
    <main>
      <div className="products-page-main">
        {product()}
        <ProductsSection
          headingTag="h2"
          {...(dinamicTexts.title && { title: dinamicTexts.title })}
          {...(dinamicTexts.description && { description: dinamicTexts.description })}
        />
      </div>
      <SocialMedia />
    </main>
  );
};
export default Products;
