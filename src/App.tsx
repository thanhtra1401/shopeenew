import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList/ProductList";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import RegisterLayout from "./layouts/RegisterLayout";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Profile from "./pages/Profile/Profile";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
export default function App() {
  return (
    <Routes>
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
      <Route
        path="/"
        index={true}
        element={
          <MainLayout>
            <ProductList />
          </MainLayout>
        }
      ></Route>
      <Route
        path="/:id"
        index={true}
        element={
          <MainLayout>
            <ProductDetail />
          </MainLayout>
        }
      ></Route>
      <Route path="" element={<ProtectedRoute />}>
        <Route
          path="/profile"
          element={
            <MainLayout>
              <Profile />
            </MainLayout>
          }
        ></Route>
      </Route>
    </Routes>
  );
}
