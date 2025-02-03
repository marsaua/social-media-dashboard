import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Layout } from "./components/Layout/Header";

export const AppRouters = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
