import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUpForm from "./app/auth/components/SignUpForm";
import LogInForm from "./app/auth/components/LogInForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./app/pages/Home";
import InterviewSession from "./app/pages/InterviewSession";
import Feedback from "./app/pages/Feedback";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <RedirectIfAuthenticated>
                <LogInForm />
              </RedirectIfAuthenticated>
            }
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/interview/session/:uuid"
              element={<InterviewSession />}
            />
            <Route
              path="/interview/session/:uuid/feedback"
              element={<Feedback />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
