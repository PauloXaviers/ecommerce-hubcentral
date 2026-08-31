import { useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { handleProductNavigation } from "../utils/productNavigation";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const useHeader = () => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [showTopBar, setShowTopBar] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { scrollY } = useScroll();
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 200) {
      setShowTopBar(false);
    } else if (latest < 200) {
      setShowTopBar(true);
    }
  });

  useEffect(() => {
    if (!searchQuery.trim()) return;
    const debounce = setTimeout(() => {
      handleProductNavigation(
        navigate,
        setSearchParams,
        { type: "search", query: searchQuery },
        location.pathname,
      );
    }, 1000);

    return () => {
      clearTimeout(debounce);
    };
  }, [searchQuery, location.pathname, setSearchParams, navigate]);

  useEffect(() => {
    const resizeScreen = () => {
      if (window.innerWidth >= 800) {
        requestAnimationFrame(() => setShowMobileMenu(false));
      }
    };
    window.addEventListener("resize", resizeScreen);

    return () => {
      window.removeEventListener("resize", resizeScreen);
    };
  }, []);

  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!searchQuery?.trim()) return;
    if (event.key === "Enter") {
      handleProductNavigation(
        navigate,
        setSearchParams,
        { type: "search", query: searchQuery },
        location.pathname,
      );
    }
  };

  return {
    showMobileMenu,
    toggleMobileMenu,
    showTopBar,
    setSearchQuery,
    handleKeyDown,
  };
};
