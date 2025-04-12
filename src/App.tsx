import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUpForm from "./app/auth/components/SignUpForm";
import LogInForm from "./app/auth/components/LogInForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./app/pages/Home";
import InterviewSession from "./app/pages/InterviewSession";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/log-in" element={<LogInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/interview/session/:uuid"
              element={<InterviewSession />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
