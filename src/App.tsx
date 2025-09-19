import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Nav from '../src/Components/Nav'
import Home from '../src/Components/Home'
import HomeSection from './Components/HomeSection'
import SubFooter from './Components/SubFooter'
import Section from './Components/Section'
import Footer from './Components/Footer'
import Login from './Components/Login'
import FAQs from "./Components/FAQs";
import Register from './Components/Register'
import Dashboard from "./Components/Dashboard";
function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  // hide Nav & Footer on login and signup
  const hideLayout = location.pathname === "/login" || location.pathname === "/register";
  return (
    <>
      {!hideLayout && <Nav />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* <Home />
              <HomeSection />
              <SubFooter />
              <Section />
              <Footer />
              <FAQs/> */}
              <Dashboard />
            </>
          }
        />
        <Route path="/login" element={<Login  switchToSignup={() => navigate("/register")} />} />
        <Route path="/register" element={<Register  switchToLogin={() => navigate("/login")} />} />
      </Routes>

      {!hideLayout}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
