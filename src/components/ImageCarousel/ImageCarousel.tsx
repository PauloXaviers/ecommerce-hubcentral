import { motion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { type Image } from "../../types/categoriesImages";
import "./ImageCarousel.scss";

interface ImageCarousel {
  position?: "center" | "bottom";
  className?: string;
  rounded?: "default" | "full";
  images: Image[];
  title?: string;
  subtitle?: string;
  handleClick?: (id: string) => void;
}

const ImageCarousel = ({
  position = "center",
  className,
  rounded = "default",
  images,
  title,
  subtitle,
  handleClick,
}: ImageCarousel) => {
  const carousel = useRef<HTMLElement | null>(null);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth);
  }, []);

  return (
    <motion.section
      className="container-carousel"
      ref={carousel}
      aria-label={title || "Carousel de categorias"}
    >
      {title && <h2>{title}</h2>}
      {subtitle && <h3>{subtitle}</h3>}
      <motion.div className="carousel" drag="x" dragConstraints={{ left: -(20 + width), right: 0 }}>
        {images.map((item) => (
          <div className="carousel-card" key={item.id}>
            <button
              key={item.id}
              onClick={() => handleClick?.(item.id)}
              className={`${position} ${rounded} ${className}`}
              style={{ backgroundImage: `url(${item.url})` }}
              aria-label={`Categoria ${item.text}`}
              title={`Ver produtos da categoria ${item.text}`}
            >
              {position === "center" && item.text}
            </button>
            {position === "bottom" && <p>{item.text}</p>}
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ImageCarousel;
