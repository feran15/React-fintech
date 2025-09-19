import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AuthProvider} from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";

import Nav from "../src/Components/Nav";
import Home from "../src/Components/Home";
import HomeSection from "./Components/HomeSection";
import SubFooter from "./Components/SubFooter";
import Section from "./Components/Section";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import FAQs from "./Components/FAQs";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard"; // index.tsx resolves this

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  // const { login } = useAuth();

  // hide Nav & Footer on login and register
  const hideLayout = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideLayout && <Nav />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <HomeSection />
              <SubFooter />
              <Section />
              <Footer />
              <FAQs />
            </>
          }
        />
        <Route
          path="/login"
          element={<Login switchToSignup={() => navigate("/register")} onSuccess={() => navigate("/dashboard")} />}
        />
        <Route
          path="/register"
          element={<Register switchToLogin={() => navigate("/login")} onSuccess={() => navigate("/dashboard")} />}
        />

        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!hideLayout}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}
