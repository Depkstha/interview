import { ReactNode } from "react";
const GuestLayout = ({ children }: { children: ReactNode }) => {
  return <div className="auth-layout">{children}</div>;
};

export default GuestLayout;
