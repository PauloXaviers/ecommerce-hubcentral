import HeroBanner from "../../components/HeroBanner/HeroBanner";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import blackFridayBanner from "../../assets/black-friday-banner.jpeg";
import { categoriesCarousel } from "../../data/categoriesBanner";
import ProductsSection from "../../components/ProductsSection/ProductsSection";
import "./Home.scss";
import { useEffect } from "react";
import { useProduct } from "../../context/useProduct";
import PromoBanner from "../../components/PromoBanner/PromoBanner";
import modelTshirtImage from "../../assets/banners/tshirt-model.png";
import iphoneImage from "../../assets/banners/Apple_iPhone-13-Pro_iPhone-13-Pro-Max_09142021_inline.jpg.large-Photoroom 1.png";

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
      <PromoBanner
        title="Camiseta manga longa"
        description="We know how large objects will act, We know how are objects will act, We know"
        id={10}
        themeColor="dark"
        imagePosition="right"
        button
        image={modelTshirtImage}
        titleTag="h5"
        className="promo-banner-dark"
      />
      <PromoBanner
        title="Compre o seu novo smartphone"
        description="Agora você tem a chance de comprar o seu novo smartphone para passar ano novo de celular novo"
        id={30}
        themeColor="light"
        imagePosition="left"
        button
        image={iphoneImage}
        titleTag="h6"
        className="promo-banner-light"
      />
    </main>
  );
};

export default Home;
