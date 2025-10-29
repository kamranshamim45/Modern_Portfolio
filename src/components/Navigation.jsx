import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../App';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const navItems = [
    { name: 'Home', href: '#hero', route: '/' },
    { name: 'About', href: '#about', route: '/' },
    { name: 'Skills', href: '#skills', route: '/' },
    { name: 'Tools', href: '/tools', route: '/tools' },
    { name: 'Projects', href: '#projects', route: '/' },
    { name: 'Certifications', href: '#certifications', route: '/' },
    { name: 'Contact', href: '#contact', route: '/' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (item) => {
    if (item.route !== location.pathname) {
      navigate(item.route);
    } else if (item.href.startsWith('#')) {
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        darkMode
          ? 'bg-gray-900/80 border-gray-700'
          : 'bg-white/80 border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Kamran.me
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavigation(item)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    (location.pathname === item.route && (item.route === '/tools' || activeSection === item.href.substring(1)))
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-black dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-black dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
        className={`md:hidden overflow-hidden border-t transition-colors duration-300 ${
          darkMode
            ? 'bg-gray-900 border-gray-700'
            : 'bg-white border-gray-200'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <motion.button
              key={item.name}
              onClick={() => handleNavigation(item)}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                (location.pathname === item.route && (item.route === '/tools' || activeSection === item.href.substring(1)))
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-black dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {item.name}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navigation;
