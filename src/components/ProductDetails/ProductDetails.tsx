import { useProduct } from '../../context/useProduct';
import { currencyFormatter } from '../../utils/currencyFormatter';
import { Button } from '../Button/Button';
import { motion } from 'motion/react';
import './ProductDetails.scss';
import { useProductDetails } from '../../hooks/useProductDetails';
import { useEffect } from 'react';
import { useCart } from '../../context/useCart';

const ProductDetails = () => {
  const product = useProduct((state) => state.selectedProduct);
  const addCart = useCart((state) => state.addCart);

  const {
    carouselContainerRef,
    scrollWidth,
    selectedImage,
    handleClickSelectImage,
    onDragEnd,
    onDragStart,
  } = useProductDetails();

  useEffect(() => {
    if (product) {
      document.title = `Compre agora ${product.title} | Ecommerce HubCentral`;
    }
  }, [product]);

  if (!product) {
    return <p>Não há produto a ser listado</p>;
  }

  return (
    <section className="product-main">
      <div ref={carouselContainerRef} className="product-images">
        <img src={selectedImage} alt={`Imagem do produto ${product?.title}`} loading="lazy" />
        <motion.div
          {...(product?.images.length >= 2 && {
            drag: 'x',
            dragConstraints: { left: -(scrollWidth + 50), right: 0 },
            onDragStart,
            onDragEnd,
          })}
          aria-label="Galeria de imagens do produto"
          aria-roledescription="carousel"
          className="carousel-images"
        >
          {product?.images.map((item, index) => (
            <button
              onClick={() => handleClickSelectImage(index)}
              key={index}
              aria-label={`Selecionar imagem ${index + 1} do produto`}
              aria-current={selectedImage === item ? 'true' : 'false'}
              style={{
                backgroundImage: `url(${item})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
              }}
            />
          ))}
        </motion.div>
      </div>
      <div className="product-content">
        <h1>{product?.title}</h1>
        <p>{product?.description}</p>
        <div className="container">
          <p className="old-price">
            <s>{currencyFormatter(product?.price * 5.8)}</s>
          </p>
          <p className="new-price">{currencyFormatter((product?.price * 5.8) / 2)}</p>
        </div>
        <div className="container">
          <Button
            type="button"
            buttonColor="gray-medium"
            onClick={() => addCart(product)}
            aria-label={`Adicionar ${product?.title} ao carrinho`}
          >
            Adicionar ao carrinho
          </Button>
          <Button buttonColor="green">Comprar</Button>
        </div>
      </div>
    </section>
  );
};
export default ProductDetails;
