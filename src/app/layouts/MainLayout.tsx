import { Link } from "react-router-dom";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="root-layout">
      <nav>
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="MockMate Logo" width={38} height={32} />
          <h2 className="text-primary-100">MockGenius</h2>
        </Link>
      </nav>

      {children}
    </div>
  );
};

export default MainLayout;
