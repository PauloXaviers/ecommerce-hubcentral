import { motion, type Variants } from 'motion/react';
import { Link, NavLink } from 'react-router-dom';
import { navItems } from '../../data/header';
import { PackageIcon, SignOutIcon, UserIcon } from '@phosphor-icons/react';
import { useAuth } from '@/context/auth/useAuth';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { useHeader } from '@/hooks/useHeader';

const MobileHeader = () => {
  const user = useAuth((state) => state.user);
  const { handleClickSignOut } = useHeader()
  const variants: Variants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: 'auto',
      opacity: 1,
      transition: { duration: 0.5, ease: 'linear' },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.5, ease: 'linear' },
    },
  };

  return (
    <motion.section
      role="navigation"
      layout
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      style={{ overflow: 'hidden' }}
      className="mobile-header"
    >
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <NavLink to={item.path} className={({ isActive }) => (isActive ? 'active' : '')}>
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {user ? (
        <div className="container-user-settings">
          <Separator />
          <p>Conta</p>
          <NavLink to="/user-settings">
            <UserIcon />
            Meus dados
          </NavLink>
          <NavLink to="/orders">
            <PackageIcon /> Meus pedidos
          </NavLink>
          <Button variant="destructive" onClick={handleClickSignOut}>
            <SignOutIcon /> Sair da conta
          </Button>
        </div>
      ) : (
        <Link to="/signin">
          <UserIcon size={24} />
          Entre/Cadastre-se
        </Link>
      )}
    </motion.section>
  );
};

export default MobileHeader;
