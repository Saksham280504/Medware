import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginBtn from "./LoginBtn";
import LogoHorizontal from "../img/logo.svg";
import cancelIcon from "../img/cross icon.svg";
import { useGlobalContext } from "./context";

const Header = () => {
  const { currentUser } = useGlobalContext();
  const [dropdown, setDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutsideDropdown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg border-b border-slate-200"
          : "bg-transparent md:bg-white/50 md:backdrop-blur-sm"
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-12 h-16">

        {/* Logo with hover animation */}
        <Link to="/" className="h-10 group">
          <img
            src={LogoHorizontal}
            alt="Medware Logo"
            className="h-full object-contain hover:opacity-80 transition-all duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-base font-medium">

          {currentUser ? (
            <>
              <Link
                to="/predictor"
                className="text-slate-700 hover:text-cyan-600 relative transition-colors duration-300 group"
              >
                Predictor
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/dashboard"
                className="text-slate-700 hover:text-cyan-600 relative transition-colors duration-300 group"
              >
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/contactdoctor"
                className="text-slate-700 hover:text-cyan-600 relative transition-colors duration-300 group"
              >
                Consult
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-600 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <LoginBtn mode="logout" />
            </>
          ) : (
            <>
              <a
                href="#services"
                className="text-slate-700 hover:text-cyan-600 relative transition-colors duration-300 group"
              >
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#about"
                className="text-slate-700 hover:text-cyan-600 relative transition-colors duration-300 group"
              >
                About Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-600 group-hover:w-full transition-all duration-300"></span>
              </a>

              <LoginBtn mode="login" />
            </>
          )}

        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-slate-700 hover:text-cyan-600 transition-all duration-300"
          onClick={toggleDropdownMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-8 h-8 transition-transform duration-300 ${dropdown ? "rotate-90" : ""}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown with glassmorphism */}
      {dropdown && (
        <div
          ref={dropdownRef}
          className="lg:hidden bg-white/80 backdrop-blur-md shadow-xl absolute top-16 right-4 w-64 rounded-xl p-5 border border-white/20 animate-slide-in-right"
        >
          <nav className="flex flex-col gap-4 text-base font-medium">

            {/* Close Button */}
            <button
              className="flex justify-end text-slate-700 hover:text-cyan-600 transition-colors duration-300"
              onClick={() => setDropdown(false)}
            >
              <img src={cancelIcon} alt="Close menu" className="w-6 hover:scale-110 transition-transform" />
            </button>

            {currentUser ? (
              <>
                <Link
                  to="/"
                  onClick={() => setDropdown(false)}
                  className="text-slate-700 hover:text-cyan-600 hover:pl-2 transition py-2 duration-300"
                >
                  Predictor
                </Link>

                <div className="border-t border-slate-200" />

                <Link
                  to="/dashboard"
                  onClick={() => setDropdown(false)}
                  className="text-slate-700 hover:text-cyan-600 hover:pl-2 transition py-2 duration-300"
                >
                  Dashboard
                </Link>

                <div className="border-t border-slate-200" />

                <Link
                  to="/contactdoctor"
                  onClick={() => setDropdown(false)}
                  className="text-slate-700 hover:text-cyan-600 hover:pl-2 transition py-2 duration-300"
                >
                  Consult
                </Link>
              </>
            ) : (
              <>
                <a
                  href="#services"
                  onClick={() => setDropdown(false)}
                  className="text-slate-700 hover:text-cyan-600 hover:pl-2 transition py-2 duration-300"
                >
                  Services
                </a>

                <div className="border-t border-slate-200" />

                <a
                  href="#about"
                  onClick={() => setDropdown(false)}
                  className="text-slate-700 hover:text-cyan-600 hover:pl-2 transition py-2 duration-300"
                >
                  About Us
                </a>
              </>
            )}

            <div className="border-t border-slate-200" />

            <LoginBtn mode={currentUser ? "logout" : "login"} />
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
