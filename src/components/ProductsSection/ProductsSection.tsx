import "./ProductsSection.scss";
import { useProduct } from "../../context/useProduct";
import { Button } from "../Button/Button";
import type { Product } from "../../types/product";
import { currencyFormatter } from "../../utils/currencyFormatter";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useCallback } from "react";
import { handleProductNavigation } from "../../utils/productNavigation";
import SkeletonCard from "../Card/SkeletonCard";
import Card from "../Card/Card";

type ProductsSectionProps = {
  products: Product[] | null;
  headingTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  title?: string;
  description?: string;
};

const SkeletonLoadingCard = () => {
  return Array.from({ length: 12 }, (_, index) => <SkeletonCard key={index} />);
};

const ProductsSection = ({
  headingTag: Component = "h3",
  title,
  description,
  products,
}: ProductsSectionProps) => {
  const loadMore = useProduct((state) => state.loadMore);
  const isLoading = useProduct((state) => state.isLoading);
  const isLoadingMore = useProduct((state) => state.isLoadingMore);
  const hasError = useProduct((state) => state.hasError);
  const hasMore = useProduct((state) => state.hasMore);
  const messageError = useProduct((state) => state.messageError);
  const location = useLocation();
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  const handleSelectProduct = useCallback(
    (productId: number) => {
      handleProductNavigation(
        navigate,
        setSearchParams,
        { type: "product", query: productId },
        location.pathname,
      );
    },
    [location.pathname, setSearchParams, navigate],
  );

  return (
    <section className="products-section">
      {title && <Component className="title">{title}</Component>}
      {description && <p>{description}</p>}

      <div className="products-container">
        {isLoading && <SkeletonLoadingCard />}

        {products &&
          products.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              description={item.description}
              image={item.images[0]}
              onClick={() => handleSelectProduct(item.id)}
              children={
                <div className="price-container">
                  <span>{currencyFormatter(item.price * 5.8)}</span>
                  <p>{currencyFormatter((item.price * 5.8) / 2)}</p>
                </div>
              }
            />
          ))}

        {isLoadingMore && <SkeletonLoadingCard />}
      </div>
      {hasMore && (
        <Button buttonColor="gray-medium" onClick={loadMore} disabled={isLoadingMore}>
          Carregar mais produtos
        </Button>
      )}

      {(hasError || messageError) && <p>{messageError}</p>}
    </section>
  );
};

export default ProductsSection;
