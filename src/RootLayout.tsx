import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import { useRef, useEffect, useState } from "react";

const RootLayout = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []); 

  return (
    <>
      <Header ref={headerRef} />
      <div style={{ paddingTop: `${headerHeight}px` }}>
        <Outlet />
      </div>
    </>
  );
};
export default RootLayout;
