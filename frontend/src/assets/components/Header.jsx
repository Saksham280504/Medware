import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginBtn from "./LoginBtn";
import LogoHorizontal from "../img/logo.svg";
import cancelIcon from "../img/cross icon.svg";
import { useGlobalContext } from "./context";

const Header = () => {
  const { currentUser } = useGlobalContext();
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdownMenu = () => {
    setDropdown((prev) => !prev);
  };

  const handleClickOutsideDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, []);

  if(currentUser==null) return null;

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-40">
      <div className="flex justify-between items-center px-6 h-16">

        {/* Logo */}
        <Link to="/" className="h-10">
          <img
            src={LogoHorizontal}
            alt="Medware Logo"
            className="h-full object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-lg">

          {currentUser ? (
            <>
              <Link to="/predictor" className="hover:text-teal-600 transition">
                Predictor
              </Link>
              <Link to="/dashboard" className="hover:text-teal-600 transition">
                Dashboard
              </Link>
              <Link to="/contactdoctor" className="hover:text-teal-600 transition">
                Consult
              </Link>
          
              <LoginBtn mode="logout" />
            </>
          ) : (
            <>
              <a href="#services" className="hover:text-teal-600 transition">
                Services
              </a>
              <a href="#about" className="hover:text-teal-600 transition">
                About Us
              </a>
          
              <LoginBtn mode="login" />
            </>
          )}

        </nav>

        {/* Mobile Menu Button */}
        <button className="lg:hidden" onClick={toggleDropdownMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 transition-transform duration-300 hover:rotate-180"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {dropdown && (
        <div
          ref={dropdownRef}
          className="lg:hidden bg-white shadow-lg absolute top-16 right-4 w-64 rounded-xl p-5"
        >
          <nav className="flex flex-col gap-4 text-lg">

            {/* Close Button */}
            <button
              className="flex justify-end"
              onClick={() => setDropdown(false)}
            >
              <img src={cancelIcon} alt="Close menu" className="w-6" />
            </button>

            {currentUser ? (
              <>
                <Link to="/" onClick={() => setDropdown(false)}>
                  Predictor
                </Link>

                <div className="border-t border-gray-300" />

                <Link to="/dashboard" onClick={() => setDropdown(false)}>
                  Dashboard
                </Link>

                <div className="border-t border-gray-300" />

                <Link to="/contactdoctor" onClick={() => setDropdown(false)}>
                  Consult
                </Link>
              </>
            ) : (
              <>
                <a href="#services" onClick={() => setDropdown(false)}>
                  Services
                </a>

                <div className="border-t border-gray-300" />

                <a href="#about" onClick={() => setDropdown(false)}>
                  About Us
                </a>
              </>
            )}

            <div className="border-t border-gray-300" />

            <LoginBtn mode={currentUser ? "logout" : "login"} />
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
