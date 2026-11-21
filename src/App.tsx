import { Route, Routes } from 'react-router-dom';
import RootLayout from './RootLayout';
import Home from './pages/Home/Home';
import { SkeletonTheme } from 'react-loading-skeleton';
import Products from './pages/Products/Products';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import ForgetPassword from './pages/Auth/ForgetPassword';
import { useAuth } from './context/auth/useAuth';
import { Navigate } from 'react-router-dom';

const App = () => {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, search]);

  const { user } = useAuth()
  return (
    <SkeletonTheme baseColor="#EBEBEB" highlightColor="rgba(0,0,0,0.25)">
      <Toaster
        position="bottom-left"
        toastOptions={{
          duration: 2500,
          style: { backgroundColor: '#ffffff', color: '#2c2c2c' },
        }}
      />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Route>
        <Route path="/signin" element={user ? <Navigate to="/" replace /> : <SignIn />} />
        <Route path="/signup" element={user ? <Navigate to="/" replace /> : <SignUp />} />
        <Route path="forget-password" element={<ForgetPassword />} />
      </Routes>
    </SkeletonTheme>
  );
};

export default App;
