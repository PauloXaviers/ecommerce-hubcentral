import { Route, Routes } from 'react-router-dom';
import RootLayout from './RootLayout';
import Home from './pages/Home/Home';
import { SkeletonTheme } from 'react-loading-skeleton';
import Products from './pages/Products/Products';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const App = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, search]);
  return (
    <SkeletonTheme baseColor="#EBEBEB" highlightColor="rgba(0,0,0,0.25)">
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
    </SkeletonTheme>
  );
};

export default App;
