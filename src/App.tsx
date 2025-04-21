import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import LogInForm from "./app/auth/components/LogInForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./app/pages/Home";
import InterviewSession from "./app/pages/InterviewSession";
import Feedback from "./app/pages/Feedback";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <RedirectIfAuthenticated>
        <LogInForm />
      </RedirectIfAuthenticated>
    ),
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/interview/session/:uuid",
        element: <InterviewSession />,
      },
      {
        path: "/interview/session/:uuid/feedback",
        element: <Feedback />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
