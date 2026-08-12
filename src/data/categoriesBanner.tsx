import { type Image } from "../types/categoriesImages";
import skinCare from "../assets/categories/skin-care.jpg";
import fragances from "../assets/categories/fragances.png";
import homeDecoration from "../assets/categories/home-decoration.jpg";
import clothes from "../assets/categories/clothes.jpg";
import furniture from "../assets/categories/furniture.png";
import vehicle from "../assets/categories/vehicle.png";
import smartphones from "../assets/categories/smartphones.png";

export const categoriesCarousel: Image[] = [
  {
    id: "smartphones",
    url: smartphones,
    alt: "Smartphones",
    text: "Smartphones",
  },
  {
    id: "fragances",
    url: fragances,
    alt: "Fragrâncias",
    text: "Fragrâncias",
  },
  {
    id: "skin-care",
    url: skinCare,
    alt: "Cuidados Pessoais",
    text: "Cuidados com a pele",
  },
  {
    id: "home-decoration",
    url: homeDecoration,
    alt: "Casa e Decoração",
    text: "Casa",
  },
  {
    id: "womens-dresses",
    url: clothes,
    alt: "Moda",
    text: "Moda",
  },
  { id: "vehicle", url: vehicle, alt: "Acessórios para veículos", text: "Veículos" },
  { id: "furniture", url: furniture, alt: "Móveis", text: "Móveis" },
];

