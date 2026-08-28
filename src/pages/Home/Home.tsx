import HeroBanner from "../../components/HeroBanner/HeroBanner";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import blackFridayBanner from "../../assets/black-friday-banner.jpeg";
import { categoriesCarousel } from "../../data/categoriesBanner";
import ProductsSection from "../../components/ProductsSection/ProductsSection";
import "./Home.scss";
import { useEffect } from "react";
import { useProduct } from "../../context/useProduct";

const Home = () => {
  const products = useProduct((state) => state.products);
  const getAllProducts = useProduct((state) => state.getAllProducts);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  return (
    <main>
      <HeroBanner
        title="Black Friday"
        subtitle="Todos os produtos com"
        subTitleSpan
        subTitleText="50% off"
        backgroundImage={blackFridayBanner}
        button
        buttonColor="red"
      />
      <ImageCarousel
        images={categoriesCarousel}
        title="Categorias de produtos"
        subtitle="Selecione uma categoria e veja os produtos"
      />
      <ProductsSection
        products={products}
        title="Produtos mais vendidos"
        headingTag="h4"
        description="Todos os produtos 50% off"
      />
    </main>
  );
};

export default Home;
