import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUpForm from "./app/auth/components/SignUpForm";
import LogInForm from "./app/auth/components/LoginForm";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/log-in" element={<LogInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
