import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Nav from "../src/Components/Nav";
import Home from "../src/Components/Home";
import HomeSection from "./Components/HomeSection";
import SubFooter from "./Components/SubFooter";
import Section from "./Components/Section";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import FAQs from "./Components/FAQs";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Hide Nav & Footer on login, register, and dashboard
  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/dashboard";

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
          element={
            <Login
              switchToSignup={() => navigate("/register")}
              onSuccess={() => navigate("/dashboard")}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              switchToLogin={() => navigate("/login")}
              onSuccess={() => navigate("/dashboard")}
            />
          }
        />

        <Route path="/faqs" element={<FAQs />} />

        {/* ✅ Protected Dashboard */}
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
      <Layout />
      {/* ✅ Toast Container (global) */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        draggable
        theme="dark"
      />
    </AuthProvider>
  );
}
