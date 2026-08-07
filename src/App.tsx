import { Route, Routes } from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
