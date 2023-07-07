import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../store";

export default function ProtectedRoute() {
  const authState = useSelector((state: RootState) => state.user);

  const isAuthenticated = authState.isAuthenticated;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
