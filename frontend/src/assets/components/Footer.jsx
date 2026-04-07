import footer_logo from "../img/footerimg.svg";
import { useState } from "react";

export default function Footer() {
  const [newsletter, setNewsletter] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubscribe = (e) => {
    e.preventDefault();
    if (newsletter.trim()) {
      setSubscribed(true);
      setNewsletter("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-100 border-t border-slate-700 mt-auto">
      <div className="mx-auto w-full max-w-screen-xl px-6 py-12 md:p-16">

        {/* Newsletter Section */}
        <div className="mb-12 pb-12 border-b border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">Stay Updated</h2>
              <p className="text-slate-400 text-base">
                Subscribe to our newsletter for the latest healthcare insights and product updates.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubscribe} className="flex flex-col gap-3">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletter}
                  onChange={(e) => setNewsletter(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:border-cyan-500 focus:outline-none placeholder-slate-500 transition"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition shadow-lg"
                >
                  Subscribe
                </button>
              </div>
              {subscribed && (
                <p className="text-cyan-400 text-sm font-medium">
                  ✓ Thanks for subscribing!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">

          {/* Logo & Company Info */}
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center space-x-3 mb-4">
              <img
                src={footer_logo}
                className="h-8"
                alt="Medware Logo"
              />
              <span className="text-2xl font-bold text-white">
                Medware
              </span>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed">
              Advanced disease prediction powered by machine learning and medical expertise.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wide mb-4">
              Product
            </h3>
            <ul className="text-slate-400 font-medium space-y-3">
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Disease Predictor
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wide mb-4">
              Company
            </h3>
            <ul className="text-slate-400 font-medium space-y-3">
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wide mb-4">
              Resources
            </h3>
            <ul className="text-slate-400 font-medium space-y-3">
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  System Status
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wide mb-4">
              Legal
            </h3>
            <ul className="text-slate-400 font-medium space-y-3">
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Compliance
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Divider */}
        <hr className="border-slate-700 mb-6" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="text-xs md:text-sm text-slate-400">
            © {new Date().getFullYear()}{" "}
            <a href="/" className="hover:text-cyan-400 transition font-semibold">
              Medware™
            </a>
            . All Rights Reserved.
          </div>

          {/* Social Icons */}
          <div className="flex gap-6">
            {/* Facebook */}
            <a
              href="#"
              className="text-slate-400 hover:text-cyan-400 transition duration-300"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 4.99 3.66 9.13 8.44 9.93v-7.02H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.8 8.44-4.94 8.44-9.93z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="#"
              className="text-slate-400 hover:text-cyan-400 transition duration-300"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm4.25 5a5 5 0 110 10 5 5 0 010-10zm6.5-.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
              </svg>
            </a>

            {/* Twitter */}
            <a
              href="#"
              className="text-slate-400 hover:text-cyan-400 transition duration-300"
              aria-label="Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 19c7.55 0 11.67-6.25 11.67-11.67v-.53A8.35 8.35 0 0022 4.92a8.19 8.19 0 01-2.36.65 4.1 4.1 0 001.8-2.27 8.2 8.2 0 01-2.6.99A4.1 4.1 0 0015.5 3c-2.28 0-4.12 1.85-4.12 4.13 0 .32.04.64.1.94C7.69 7.9 4.07 6.13 1.64 3.16a4.12 4.12 0 00-.56 2.08c0 1.44.73 2.7 1.84 3.45a4.07 4.07 0 01-1.87-.52v.05c0 2.02 1.44 3.71 3.35 4.09a4.1 4.1 0 01-1.86.07c.53 1.64 2.07 2.83 3.9 2.86A8.24 8.24 0 012 17.54 11.64 11.64 0 008 19" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="#"
              className="text-slate-400 hover:text-cyan-400 transition duration-300"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
