import Nav from '../src/Components/Nav'
import Home from '../src/Components/Home'
import HomeSection from './Components/HomeSection'
import SubFooter from './Components/SubFooter'
import Section from './Components/Section'
import Footer from './Components/Footer'
 import Login from './Components/Login'  
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={
          <>
            <Home />
            <HomeSection />
            <SubFooter />
            <Section />
            <Footer />
          </>
        } />

        {/* Login Page */}
         <Route path="/login" element={<Login />} /> 
      </Routes>
    </Router>
  )
}
