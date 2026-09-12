import { Button } from '../Button/Button';
import './PromoBanner.scss';
import { type FetchType, handleProductNavigation } from '../../utils/productNavigation';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';

/**
 * Componente de banner promocional com animações e navegação de produtos
 * @param id - ID único do banner
 * @param fetchType - Define o tipo de navegação do botão, podendo direcionar para produto, categoria ou busca
 * @param titleTag - Tag HTML para o título (h1-h6) - padrão: h4
 * @param title - Texto do título (obrigatório)
 * @param description - Descrição da promoção (obrigatório)
 * @param image - URL da imagem (opcional)
 * @param themeColor - Tema visual: 'dark' ou 'light'
 * @param imagePosition - Posição da imagem: 'right' ou 'left'
 * @param className - Classes CSS adicionais
 * @param button - Exibir botão de ação (padrão: false)
 */

type PromoBannerProps = {
  id: string;
  fetchType: FetchType;
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  title: string;
  description: string;
  image?: string;
  themeColor: 'dark' | 'light';
  imagePosition?: 'right' | 'left';
  className?: string;
  button?: boolean;
};

const PromoBanner = ({
  id,
  fetchType,
  titleTag: Component = 'h4',
  title,
  description,
  image,
  themeColor = 'light',
  imagePosition = 'right',
  className,
  button = false,
}: PromoBannerProps) => {
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const motionVariants: Variants = {
    hidden: { x: imagePosition === 'left' ? 100 : -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeInOut', delay: 0.3 } },
  };

  const handleClickProduct = (fetchType: FetchType) => {
    handleProductNavigation(
      navigate,
      setSearchParams,
      fetchType.type === 'product'
        ? { type: fetchType.type, query: fetchType.query }
        : { type: fetchType.type, query: fetchType.query },
      pathname
    );
  };

  return (
    <section className={`promo-banner ${className ?? ''} ${imagePosition}`} aria-labelledby={id}>
      <motion.div
        variants={motionVariants}
        className="promo-banner-texts"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Component className={`title ${themeColor}`} id={id}>
          {title}
        </Component>
        <p className={themeColor}>{description}</p>
        {button && (
          <Button buttonColor="gray-medium" onClick={() => handleClickProduct(fetchType)}>
            {fetchType.type === 'product' ? 'Comprar agora' : 'Ir para produtos'}
          </Button>
        )}
      </motion.div>
      {image && (
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { duration: 1, ease: 'easeInOut', delay: 0.2 } }}
          viewport={{ once: true }}
          src={image}
          loading="lazy"
          decoding="async"
          alt={`Imagem de ${title.toLowerCase()}`}
        />
      )}
    </section>
  );
};

export default PromoBanner;
