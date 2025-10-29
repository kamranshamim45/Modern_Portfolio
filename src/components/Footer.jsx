import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              MD Kamran Shamim
            </h3>
            <p className="text-black dark:text-gray-400">Web Developer & Tech Enthusiast</p>
          </div>

          <div className="flex justify-center items-center space-x-2 text-black dark:text-gray-400 mb-6">
            <span>© {currentYear} MD Kamran Shamim. All rights reserved.</span>
            <span>|</span>
            <a
              href="#about"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Back to Top
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center items-center text-black dark:text-gray-400"
          >
            <span>Made with</span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mx-2"
            >
              <Heart className="w-5 h-5 text-red-500 fill-current" />
            </motion.div>
            <span>using React & Tailwind CSS</span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
