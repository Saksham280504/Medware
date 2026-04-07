import hero_img from "../img/hero-img.svg";
import Button from "@mui/material/Button";
import { useGlobalContext } from "./context";
import { useState, useEffect } from "react";

const Hero = () => {
  const { setLoginButtonClicked, setRegistrationToggle } =
    useGlobalContext();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="w-full flex justify-center py-20 lg:py-28 px-4 relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
      style={{
        backgroundAttachment: "fixed",
        backgroundPosition: `center ${scrollY * 0.5}px`,
      }}
    >
      {/* Background accent elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10 animate-floating"
          style={{
            background: "radial-gradient(circle, #0891b2, transparent)",
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        ></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-10 animate-floating"
          style={{
            background: "radial-gradient(circle, #06b6d4, transparent)",
            animationDelay: "1s",
            transform: `translateY(${scrollY * -0.2}px)`,
          }}
        ></div>
      </div>

      <div className="w-full lg:w-4/5 flex flex-col-reverse lg:flex-row items-center gap-10 relative z-10">
        {/* Left Content - Animated */}
        <div className="flex flex-col text-center lg:text-left max-w-xl stagger-children">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent animate-fade-in-up">
            Your Healthcare, Simplified
          </h1>

          <p className=" text-lg lg:text-xl text-slate-300 mb-8 animate-fade-in-up" style={{animationDelay: "0.2s"}}>
            Experience optimal health with our integrated platform. Monitor your vitals, consult top doctors, and predict potential health issues — all in one secure place.
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 animate-fade-in-up" style={{animationDelay: "0.4s"}}>
            <Button
              variant="contained"
              className="hover:scale-105 transition-all duration-300 shadow-lg font-semibold px-8 py-3 bg-cyan-600 hover:bg-cyan-700 activate-glow-pulse"
              onClick={() => {
                setRegistrationToggle(true);
                setLoginButtonClicked(true);
              }}
            >
              Join Us Now
            </Button>

            <Button
              variant="outlined"
              className="hover:scale-105 transition-all duration-300 border-2 border-cyan-400 text-cyan-400 font-semibold px-8 py-3 hover:bg-cyan-400 hover:text-slate-900"
              onClick={() => {
                setLoginButtonClicked(true);
                setRegistrationToggle(false);
              }}
            >
              Sign In
            </Button>
          </div>
        </div>

        {/* Right Image - Parallax effect */}
        <div
          className="w-80 sm:w-96 lg:w-1/2 flex justify-center animate-fade-in-right"
          style={{
            transform: `scale(${1 - scrollY * 0.0005})`,
          }}
        >
          <img
            src={hero_img}
            alt="Healthcare Illustration"
            className="w-full max-w-md drop-shadow-2xl hover:drop-shadow-3xl transition-shadow duration-300"
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-cyan-400 text-sm font-semibold">Scroll to explore</span>
          <svg
            className="w-6 h-6 text-cyan-400 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
