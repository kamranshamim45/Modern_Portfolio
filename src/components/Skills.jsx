import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { useTheme } from '../App';

const Skills = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { darkMode } = useTheme();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const skills = [
    {
      category: 'Programming Languages',
      items: ['Python', 'Java (Intermediate)'],
      color: 'from-orange-500 to-red-500'
    },
    {
      category: 'Web Development',
      items: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Tailwind CSS', 'Node.js', 'Bootstrap'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      category: 'Databases',
      items: ['MySQL', 'MongoDB'],
      color: 'from-green-500 to-teal-500'
    },
    {
      category: 'Python Libraries',
      items: ['NumPy', 'Pandas', 'Matplotlib', 'OpenCV'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      category: 'Tools',
      items: ['Git', 'GitHub', 'VS Code', 'Jupyter', 'PyCharm', 'Excel', 'Power BI'],
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <section ref={sectionRef} id="skills" className={`py-20 transition-colors duration-300 ${
      darkMode ? 'bg-gray-800' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ y }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className={`rounded-2xl p-8 shadow-xl transition-colors duration-300 ${
              darkMode ? 'bg-gray-700' : 'bg-white'
            }`}
          >
            <details
              className="group"
              onToggle={(e) => setIsExpanded(e.target.open)}
            >
              <summary className="cursor-pointer text-xl font-semibold text-black dark:text-white mb-6 flex items-center justify-between">
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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skills.map((skillGroup, index) => (
                    <motion.div
                      key={skillGroup.category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: isExpanded ? 1 : 0,
                        y: isExpanded ? 0 : 20
                      }}
                      transition={{
                        delay: isExpanded ? 0.1 * index : 0,
                        duration: 0.5
                      }}
                      className={`bg-gradient-to-br ${skillGroup.color} p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
                    >
                      <h3 className="text-xl font-bold mb-4">{skillGroup.category}</h3>
                      <ul className="space-y-2">
                        {skillGroup.items.map((skill, skillIndex) => (
                          <motion.li
                            key={skill}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{
                              opacity: isExpanded ? 1 : 0,
                              x: isExpanded ? 0 : -10
                            }}
                            transition={{
                              delay: isExpanded ? 0.2 + (index * 0.1) + (skillIndex * 0.05) : 0,
                              duration: 0.3
                            }}
                            className="flex items-center"
                          >
                            <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                            {skill}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </details>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
