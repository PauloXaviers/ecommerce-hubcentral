import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import { categoriesCarousel } from "../../data/categoriesBanner";
import "./Home.scss";

const Home = () => {
  return (
    <main>
      <ImageCarousel
        images={categoriesCarousel}
        title="Categorias de produtos"
        subtitle="Selecione uma categoria e veja os produtos"
      />
    </main>
  );
};

export default Home;
