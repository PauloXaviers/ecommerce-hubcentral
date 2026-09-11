import HeroBanner from '../../components/HeroBanner/HeroBanner';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';
import blackFridayBanner from '../../assets/black-friday-banner.jpeg';
import { categoriesCarousel } from '../../data/categoriesBanner';
import ProductsSection from '../../components/ProductsSection/ProductsSection';
import './Home.scss';
import { useEffect } from 'react';
import { useProduct } from '../../context/useProduct';
import PromoBanner from '../../components/PromoBanner/PromoBanner';
import modelTshirtImage from '../../assets/banners/tshirt-model.png';
import iphoneImage from '../../assets/banners/Apple_iPhone-13-Pro_iPhone-13-Pro-Max_09142021_inline.jpg.large-Photoroom 1.png';

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
        headingTag="h3"
        description="Todos os produtos 50% off"
      />
      <PromoBanner
        id="promo-banner-categorias-roupas"
        fetchType={{ type: 'category', query: 'mens-shirts' }}
        title="Camisetas Masculinas — Novas Tendências"
        description="Renove seu guarda‑roupa com camisetas básicas e estampadas — conforto e estilo por menos."
        themeColor="dark"
        imagePosition="right"
        button
        image={modelTshirtImage}
        titleTag="h4"
        className="promo-banner-dark"
      />
      <PromoBanner
        id="promo-banner-iphone-13-pro"
        fetchType={{ type: 'product', query: 130 }}
        title="iPhone 13 Pro — Oferta imperdível"
        description="iPhone 13 Pro com preço promocional, parcelamento em até 12x sem juros e garantia oficial. Estoque limitado — garanta já o seu antes que acabe."
        themeColor="light"
        imagePosition="left"
        button
        image={iphoneImage}
        titleTag="h5"
        className="promo-banner-light"
      />
    </main>
  );
};

export default Home;
