import Card from '../Card/Card';
import { useCart } from '../../context/useCart';
import { motion, type Variants } from 'motion/react';
import './Cart.scss';
import { XIcon } from '@phosphor-icons/react';
import { useEffect } from 'react';
import { Button } from '../Button/Button';
import { PlusIcon, MinusIcon, TrashIcon } from '@phosphor-icons/react';
import { currencyFormatter } from '../../utils/currencyFormatter';

const Cart = () => {
  const cartVariants: Variants = {
    hidden: { x: 100, transition: { ease: 'easeInOut', duration: 0.5 }, opacity: 0 },
    visible: { x: 0, transition: { ease: 'easeInOut', duration: 0.5 }, opacity: 1 },
  };

  const cart = useCart((state) => state.cart);
  const toggleCartOpen = useCart((state) => state.toggleCartOpen);
  const addCart = useCart((state) => state.addCart);
  const removeQuantity = useCart((state) => state.removeQuantity);
  const removeFromCart = useCart((state) => state.removeFromCart);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity * 5.8) / 2, 0);

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') toggleCartOpen();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflowY = 'scroll';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleCartOpen]);

  return (
    <motion.aside
      variants={cartVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      aria-label="Carrinho de compras"
    >
      <section className="cart-main">
        <button
          type="button"
          className="close-cart"
          onClick={toggleCartOpen}
          aria-label="Fechar carrinho de compras"
        >
          <XIcon size={32} />
        </button>
        {cart.length === 0 ? (
          <p>Não há produtos adicionados no carrinho</p>
        ) : (
          <div className="card-container">
            {cart.map((item) => (
              <Card
                key={item.id}
                title={item.title}
                description={item.description}
                image={item.images[0]}
                direction="row"
              >
                <p>{currencyFormatter((item.price * item.quantity * 5.8) / 2)}</p>
                <div className="controls-cart-container">
                  <button
                    type="button"
                    onClick={() => removeQuantity(item)}
                    aria-label={`Diminuir quantidade de ${item.title}`}
                  >
                    <MinusIcon size={17} weight="bold" />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => addCart(item)}
                    aria-label={`Adicionar quantidade de ${item.title}`}
                  >
                    <PlusIcon size={17} weight="bold" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item)}
                    aria-label={`Remover ${item.title} do carrinho`}
                  >
                    <TrashIcon size={17} weight="bold" color="red" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
        <div className="container-actions-footer">
          {cart.length !== 0 && (
            <>
              <p>Total: {currencyFormatter(total)}</p>
              <Button buttonColor="green" borderRadius="default">
                Finalizar compra
              </Button>
            </>
          )}
        </div>
      </section>
    </motion.aside>
  );
};

export default Cart;
