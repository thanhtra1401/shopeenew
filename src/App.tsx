import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList/ProductList";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import RegisterLayout from "./layouts/RegisterLayout";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />}></Route>
      <Route
        path="/login"
        element={
          <RegisterLayout>
            <Login />
          </RegisterLayout>
        }
      ></Route>
      <Route
        path="/register"
        element={
          <RegisterLayout>
            <Register />
          </RegisterLayout>
        }
      ></Route>
    </Routes>
  );
}
