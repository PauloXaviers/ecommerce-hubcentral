import { forwardRef } from "react";
import { navItems, topBarContactItems, topBarSocialtItems } from "../../data/header";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useHeader } from "../../hooks/useHeader";
import userIcon from "../../assets/icons/account_circle.svg";
import cartIcon from "../../assets/icons/add_shopping_cart.svg";
import mobileMenu from "../../assets/icons/menu_mobile.svg";
import closeMenu from "../../assets/icons/close.svg";
import "./Header.scss";
import MobileHeader from "./MobileHeader";

const Header = forwardRef<HTMLElement>((_, ref) => {
  const { showMobileMenu, toggleMobileMenu, showTopBar, setSearchQuery, handleKeyDown } = useHeader();
  return (
    <header ref={ref}>
      <AnimatePresence>
        {showTopBar && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
            exit={{ y: -50, opacity: 0, transition: { duration: 0.5 } }}
            className="topbar"
          >
            <ul>
              {topBarContactItems.map((item) => (
                <li key={item.id}>
                  <img src={item.icon} alt={`Logo do ${item.id}`} />
                  <span>{item.description}</span>
                </li>
              ))}
            </ul>
            <span>Siga-nos e tenha a chance de conseguir 80% off</span>
            <ul>
              <p>{topBarSocialtItems.description}:</p>
              {topBarSocialtItems.icons.map((item) => (
                <li key={item.id}>
                  <a href={item.url ?? "#"} aria-label={`Link para ${item.id}`}>
                    <img src={item.img} alt={`logo ${item.id}`} />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="header-main">
        <Link to="/" className="logo">
          HubCentral
        </Link>
        <div className="header-desktop">
          <nav className="navbar">
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <NavLink to={item.path} className={({ isActive }) => (isActive ? "active" : "")} >
                    {item.text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="container-icons">
            <label className="sr-only" htmlFor="header-search">
              Buscar produtos
            </label>
            <input
              onKeyDown={handleKeyDown}
              id="header-search"
              type="search"
              className="search-input"
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Iphone 13 Pro Max, Samsung, Camiseta..."
            />
            <Link to="#">
              <img src={userIcon} alt="Icone de usuário" />
              Entre/Cadastre-se
            </Link>
          </div>
        </div>

        <div className="container-actions">
          <button aria-label="Abrir carrinho de compras">
            <img src={cartIcon} alt="Icone de carrinho" />
          </button>
          <button aria-label="Abrir menu mobile" className="mobile-menu-button" onClick={toggleMobileMenu}>
            <img src={!showMobileMenu ? mobileMenu : closeMenu} alt={!showMobileMenu ? "Abrir menu" : "Fechar menu"} />
          </button>
        </div>
      </section>

      <AnimatePresence>{showMobileMenu && <MobileHeader />}</AnimatePresence>
      <label className="sr-only" htmlFor="header-search-mobile">
        Buscar produtos
      </label>
      <input
        onChange={(event) => setSearchQuery(event.target.value)}
        onKeyDown={handleKeyDown}
        id="header-search-mobile"
        type="search"
        className="search-input mobile"
        placeholder="Iphone 13 Pro Max, Samsung, Camiseta..."
      />
    </header>
  );
});

export default Header;
