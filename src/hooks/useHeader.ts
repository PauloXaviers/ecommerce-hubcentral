import { useEffect, useState } from "react";

export const useHeader = () => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

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
  return {
    showMobileMenu,
    toggleMobileMenu,
  };
};
