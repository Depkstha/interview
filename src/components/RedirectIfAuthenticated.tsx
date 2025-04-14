import { useAuthStore } from "@/stores/authStore";
import { JSX } from "react";
import { Navigate } from "react-router-dom";

const RedirectIfAuthenticated = ({ children }: { children: JSX.Element }) => {
  const { token, user } = useAuthStore();

  if (token && user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RedirectIfAuthenticated;
