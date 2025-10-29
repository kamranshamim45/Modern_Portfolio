import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../App';

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { darkMode } = useTheme();

  return (
    <section id="about" className={`py-20 transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className={`rounded-2xl p-8 shadow-xl transition-colors duration-300 ${
              darkMode
                ? 'bg-gradient-to-br from-gray-800 to-gray-700'
                : 'bg-gradient-to-br from-blue-50 to-purple-50'
            }`}
          >
            <details
              className="group"
              onToggle={(e) => setIsExpanded(e.target.open)}
            >
              <summary className="cursor-pointer text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center justify-between">
                <span>Click to reveal more</span>
                <motion.svg
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </summary>

              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: isExpanded ? 1 : 0,
                  height: isExpanded ? 'auto' : 0
                }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden"
              >
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -20 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-2xl font-bold text-black mb-4"
                >
                  Master of Computer Application (MCA) | Tech Enthusiast & Problem Solver
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -20 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-black dark:text-gray-300 text-lg leading-relaxed"
                >
                  I'm MD Kamran Shamim, a passionate Full Stack Developer skilled in building dynamic, user-friendly, and scalable web applications. I enjoy turning ideas into reality using modern technologies like React, Node.js, Express, MongoDB, and Tailwind CSS. I focus on writing clean, maintainable code and creating seamless user experiences from frontend to backend. Currently, I'm exploring new trends in web development and continuously improving my skills to deliver better digital solutions.
                </motion.p>
              </motion.div>
            </details>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
