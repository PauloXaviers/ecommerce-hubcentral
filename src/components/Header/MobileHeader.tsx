import { motion, type Variants } from 'motion/react';
import { Link, NavLink } from 'react-router-dom';
import { navItems } from '../../data/header';
import { UserIcon } from '@phosphor-icons/react';

const MobileHeader = () => {
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
      <Link to="#">
        <UserIcon size={27} /> Entre/Cadastre-se
      </Link>
    </motion.section>
  );
};

export default MobileHeader;
