import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (path: any) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white w-full border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="text-center">
          <motion.h1
            className="text-4xl font-bold text-indigo-500"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          >
            Threadify
          </motion.h1>
        </div>

        <button
          onClick={toggleMenu}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <AnimatePresence>
          {(isMenuOpen || true) && (
            <motion.div
              key="menu"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              className={clsx(
                'w-full md:w-auto',
                isMenuOpen ? 'block' : 'hidden md:block',
              )}
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a
                    onClick={() => navigateTo('/')}
                    className={clsx(
                      'block py-2 px-3 mt-1.5 rounded md:bg-transparent md:p-0 cursor-pointer',
                      location.pathname === '/'
                        ? 'text-blue-700'
                        : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent',
                    )}
                    aria-current={
                      location.pathname === '/' ? 'page' : undefined
                    }
                  >
                    Home
                  </a>
                </li>

                <li>
                  <a
                    onClick={() => navigateTo('/my-topics')}
                    className={clsx(
                      'block py-2 px-3 mt-1.5 rounded md:bg-transparent md:p-0 cursor-pointer',
                      location.pathname === '/my-topics'
                        ? 'text-blue-700'
                        : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent',
                    )}
                    aria-current={
                      location.pathname === '/my-topics' ? 'page' : undefined
                    }
                  >
                    My Topics
                  </a>
                </li>

                <li>
                  <a
                    onClick={() => navigateTo('/profile')}
                    className={clsx(
                      'block py-2 px-3 mt-1.5 rounded md:bg-transparent md:p-0 cursor-pointer',
                      location.pathname === '/profile'
                        ? 'text-blue-700'
                        : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent',
                    )}
                    aria-current={
                      location.pathname === '/profile' ? 'page' : undefined
                    }
                  >
                    Profile
                  </a>
                </li>

                <li>
                  <button
                    onClick={() => navigateTo('/logout')}
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                  >
                    <span className="relative px-5 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      LogOut
                    </span>
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
