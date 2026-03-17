import footer_logo from "../img/footerimg.svg";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 mt-16">
      <div className="mx-auto w-full max-w-screen-xl p-6">

        {/* Top Section */}
        <div className="md:flex md:justify-between">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center space-x-3">
              <img
                src={footer_logo}
                className="h-8"
                alt="Medware Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Medware
              </span>
            </a>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-12 sm:gap-8 sm:grid-cols-2">
            {/* Follow Us */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-gray-600 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Discord
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-600 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        {/* Bottom Section */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {new Date().getFullYear()}{" "}
            <a href="/" className="hover:underline">
              Medware™
            </a>
            . All Rights Reserved.
          </span>

          {/* Social Icons */}
          <div className="flex mt-4 space-x-6 sm:mt-0">
            {/* Facebook */}
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition"
            >
              <span className="sr-only">Facebook</span>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 4.99 3.66 9.13 8.44 9.93v-7.02H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.8 8.44-4.94 8.44-9.93z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition"
            >
              <span className="sr-only">Instagram</span>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm4.25 5a5 5 0 110 10 5 5 0 010-10zm6.5-.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
              </svg>
            </a>

            {/* Twitter */}
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition"
            >
              <span className="sr-only">Twitter</span>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 19c7.55 0 11.67-6.25 11.67-11.67v-.53A8.35 8.35 0 0022 4.92a8.19 8.19 0 01-2.36.65 4.1 4.1 0 001.8-2.27 8.2 8.2 0 01-2.6.99A4.1 4.1 0 0015.5 3c-2.28 0-4.12 1.85-4.12 4.13 0 .32.04.64.1.94C7.69 7.9 4.07 6.13 1.64 3.16a4.12 4.12 0 00-.56 2.08c0 1.44.73 2.7 1.84 3.45a4.07 4.07 0 01-1.87-.52v.05c0 2.02 1.44 3.71 3.35 4.09a4.1 4.1 0 01-1.86.07c.53 1.64 2.07 2.83 3.9 2.86A8.24 8.24 0 012 17.54 11.64 11.64 0 008 19" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
