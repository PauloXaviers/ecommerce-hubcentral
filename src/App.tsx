import { Route, Routes } from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "./pages/Home/Home";
import { SkeletonTheme } from "react-loading-skeleton";

const App = () => {
  return (
    <SkeletonTheme baseColor="#EBEBEB" highlightColor="rgba(0,0,0,0.25)">
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </SkeletonTheme>
  );
};

export default App;
