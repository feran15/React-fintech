import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Nav from '../src/Components/Nav'
import Home from '../src/Components/Home'
import HomeSection from './Components/HomeSection'
import SubFooter from './Components/SubFooter'
import Section from './Components/Section'
import Footer from './Components/Footer'
import Login from './Components/Login'

function Layout() {
  const location = useLocation();

  // hide Nav & Footer on login
  const hideLayout = location.pathname === "/login";

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
            </>
          }
        />
        <Route path="/login" element={<Login />} />
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
