import { motion } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { type Image } from '../../types/categoriesImages';
import { handleProductNavigation } from '../../utils/productNavigation';
import './ImageCarousel.scss';

interface ImageCarouselProps {
  fetchType: 'category' | 'search';
  position?: 'center' | 'bottom';
  className?: string;
  rounded?: 'default' | 'full';
  images: Image[];
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  title?: string;
  description?: string;
}

const ImageCarousel = ({
  fetchType,
  position = 'center',
  className,
  rounded = 'default',
  images,
  titleTag: Component = 'h2',
  title,
  description,
}: ImageCarouselProps) => {
  const carousel = useRef<HTMLElement | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth);
  }, []);

  const handleClick = (id: string) => {
    if (!isDragging)
      handleProductNavigation(navigate, setSearchParams, { type: fetchType, query: id }, pathname);
  };

  const onDragStart = () => setIsDragging(true);

  const onDragEnd = () => setIsDragging(false);

  return (
    <motion.section
      className="container-carousel"
      ref={carousel}
      aria-label={title || 'Carrossel de imagens'}
    >
      {title && <Component className="title">{title}</Component>}
      {description && <p className="description">{description}</p>}
      <motion.div
        className="carousel"
        drag="x"
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        dragConstraints={{ left: -(20 + width), right: 0 }}
      >
        {images.map((item) => (
          <div className="carousel-card" key={item.id}>
            <button
              onClick={() => handleClick(item.id)}
              className={`${position} ${rounded} ${className}`}
              style={{ backgroundImage: `url(${item.url})` }}
              aria-label={`Ver produtos de ${item.text || item.alt}`}
              title={`Ver produtos de ${item.text || item.alt}`}
            >
              {position === 'center' && item.text}
            </button>
            {position === 'bottom' && <p>{item.text}</p>}
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ImageCarousel;
