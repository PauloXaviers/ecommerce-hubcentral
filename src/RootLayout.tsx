import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import { useRef, useEffect, useState } from 'react';
import Footer from './components/Footer/Footer';
import Cart from './components/Cart/Cart';
import { useCart } from './context/useCart';
import { AnimatePresence } from 'motion/react';

const RootLayout = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const isCartOpen = useCart((state) => state.isCartOpen);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  return (
    <>
      <Header ref={headerRef} />
      <div style={{ paddingTop: `${headerHeight + 20}px` }}>
        <AnimatePresence>{isCartOpen && <Cart />}</AnimatePresence>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default RootLayout;
