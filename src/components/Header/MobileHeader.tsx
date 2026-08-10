import { motion } from "framer-motion";
import userIcon from "../../assets/icons/account_circle.svg";
import { Link, NavLink } from "react-router-dom";
import { navItems } from "../../data/header";

const MobileHeader = () => {
  const variants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      className="mobile-header"
    >
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={({isActive}) => (isActive ? "active" : "")}
              >
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <Link to="#">
        <img src={userIcon} alt="Icone de usuário" /> Entre/Cadastre-se
      </Link>
    </motion.section>
  );
};

export default MobileHeader;
