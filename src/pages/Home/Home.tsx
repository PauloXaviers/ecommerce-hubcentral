import HeroBanner from "../../components/HeroBanner/HeroBanner";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import blackFridayBanner from "../../assets/black-friday-banner.jpeg";
import { categoriesCarousel } from "../../data/categoriesBanner";
import "./Home.scss";

const Home = () => {
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
    </main>
  );
};

export default Home;
