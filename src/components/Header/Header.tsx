import { forwardRef } from 'react';
import { navItems, topBarContactItems, topBarSocialtItems } from '../../data/header';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useHeader } from '../../hooks/useHeader';
import {
  ShoppingCartIcon,
  UserIcon,
  XIcon,
  ListIcon,
  PackageIcon,
  SignOutIcon,
} from '@phosphor-icons/react';
import { SearchInput } from './SearchInput';
import './Header.scss';
import MobileHeader from './MobileHeader';
import { useCart } from '../../context/useCart';
import { useAuth } from '@/context/auth/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';

const Header = forwardRef<HTMLElement>((_, ref) => {
  const {
    showMobileMenu,
    toggleMobileMenu,
    showTopBar,
    setSearchQuery,
    handleKeyDown,
    handleClickSearch,
    desktopInputRef,
    mobileInputRef,
    handleClickSignOut,
  } = useHeader();

  const toggleCartOpen = useCart((state) => state.toggleCartOpen);
  const user = useAuth((state) => state.user);
  return (
    <header ref={ref}>
      <AnimatePresence>
        {showTopBar && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.5, ease: 'linear' },
            }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: 'linear' } }}
            style={{ overflow: 'hidden' }}
            className="topbar"
          >
            <ul>
              {topBarContactItems.map((item) => (
                <li key={item.id}>
                  <item.icon size={20} color="white" />
                  <span>{item.description}</span>
                </li>
              ))}
            </ul>
            <span>Siga-nos e tenha a chance de conseguir 80% off</span>
            <ul>
              <p>{topBarSocialtItems.description}:</p>
              {topBarSocialtItems.icons.map((item) => (
                <li key={item.id}>
                  <a href={item.url ?? '#'} aria-label={`Link para ${item.id}`}>
                    <item.icon size={20} color="white" />
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
                  <NavLink to={item.path} className={({ isActive }) => (isActive ? 'active' : '')}>
                    {item.text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="container-icons">
            <SearchInput
              className="search-input"
              onSearchChange={setSearchQuery}
              onKeyDown={handleKeyDown}
              handleClickSearch={handleClickSearch}
              inputRef={desktopInputRef}
            />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant={'outline'}>Conta</Button>} />
                <DropdownMenuContent className="tw:w-fit">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Conta</DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuItem>
                    <NavLink to="/user-settings" className="tw:text-inherit tw:no-underline tw:flex tw:justify-center tw:items-center">
                      <UserIcon />
                      Meus dados
                    </NavLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                     <NavLink to="/orders" className="tw:text-inherit tw:no-underline tw:flex tw:justify-center tw:items-center ">
                      <PackageIcon />
                      Meus pedidos
                    </NavLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem variant="destructive" onClick={handleClickSignOut}>
                    <SignOutIcon /> Sair da conta
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/signin">
                <UserIcon size={24} />
                Entre/Cadastre-se
              </Link>
            )}
          </div>
        </div>

        <div className="container-actions">
          <button aria-label="Abrir carrinho de compras" onClick={toggleCartOpen}>
            <ShoppingCartIcon size={26} />
          </button>
          <button
            aria-label="Abrir menu mobile"
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
          >
            {!showMobileMenu ? <ListIcon size={28} /> : <XIcon size={28} />}
          </button>
        </div>
      </section>

      <AnimatePresence>{showMobileMenu && <MobileHeader />}</AnimatePresence>
      <SearchInput
        isMobile={true}
        className="search-input mobile"
        onSearchChange={setSearchQuery}
        onKeyDown={handleKeyDown}
        handleClickSearch={handleClickSearch}
        inputRef={mobileInputRef}
      />
    </header>
  );
});

export default Header;
