import React, { useState } from "react";
import { Menu, X,  ChevronRight } from "lucide-react"; // npm install lucide-react
import { Link } from "react-router-dom";
// Define the type for nav links
type NavLink = {
  label: string;
  href?: string;
};

const desktopLinks: NavLink[] = [
  { label: "Plans" },
  { label: "Bank" },
  { label: "Save" },
  { label: "Invest" },
  { label: "Travel" },
  { label: "Learn" },
];

const mobileLinks: NavLink[] = [
  { label: "Plans" },
  { label: "Bank" },
  { label: "Save" },
  { label: "Invest" },
  { label: "Travel" },
  { label: "Learn" },
];

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5">
        {/* Logo */}
        <Link to="/">
        <img src="/N26.png" alt="Kuda logo" className="w-auto h-20" />
        </Link>
        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 text-gray-800 font-medium">
          {desktopLinks.map((link, idx) => (
            <li
              key={idx}
              className="flex items-center gap-1 cursor-pointer hover:text-purple-800"
            >
              {link.label}
            </li>
          ))}
        </ul>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-6">
         <Link to="/login" className="text-[rgb(8,129,119)] hover:text-purple-800 font-mediumx">
              Log in
            </Link>
          <a
            href="#"
            className="bg-[rgb(8,129,119)] text-white px-5 py-2 rounded-lg font-semibold transition"
          >
            Open Bank Account
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 py-4 shadow-lg h-screen">
          {/* Top Section: Logo + Close */}
          <div className="flex justify-between items-center mb-6">
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mb-6">
            <Link
              to="/login"
              className="bg-[rgb(8,129,119)] text-white px-4 py-2 rounded-lg font-medium flex-1 text-center"
            >
              Log in
            </Link>
            <a
              href="#"
              className="bg-[rgb(8,129,119)] text-white px-4 py-2 rounded-lg font-medium flex-1 text-center"
            >
             Open Bank Account
            </a>
          </div>

          {/* Nav Links */}
          <ul className="space-y-4 text-gray-800 font-medium">
            {mobileLinks.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center border-b border-gray-200 pb-2 cursor-pointer"
              >
                {item.label}
                <ChevronRight size={18} className="text-purple-800" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Nav;
