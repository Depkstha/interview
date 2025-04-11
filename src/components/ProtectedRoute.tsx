import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore"; // adjust path as needed

const ProtectedRoute = () => {
  const { token, user } = useAuthStore();

  console.log(token, user);
  

  if (!token || !user) {
    return <Navigate to="/log-in" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
