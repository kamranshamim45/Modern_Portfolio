import { motion } from 'framer-motion';
import { ExternalLink, Github, Clock } from 'lucide-react';
import { useTheme } from '../App';
import { Tilt } from 'react-tilt';

const Projects = () => {
  const { darkMode } = useTheme();

  const projects = [
    {
      title: 'Myntra Clone',
      description: 'Developed a fully functional e-commerce website with user authentication, product listing, and a shopping cart',
      techStack: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com',
      live: null,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Face Recognition Attendance System',
      description: 'A smart and automated attendance management system that uses facial recognition technology to identify individuals and mark their attendance in real-time. This project eliminates manual errors, reduces time consumption, and ensures secure data handling.',
      techStack: ['Python', 'OpenCV', 'Flask', 'Tkinter', 'MySQL/SQLite', 'NumPy', 'Pandas'],
      github: 'https://github.com/kamranshamim45/portfolio',
      live: null,
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Smart-Vision: Face Detection Web Application',
      description: 'A full-stack face detection web application with real-time webcam detection and user authentication features. The project includes Login, Registration, and Forgot Password options. After logging in, users can access a Dashboard with two options — Face Detection and History.',
      techStack: ['React.js', 'Tailwind CSS', 'Node.js'],
      github: null,
      live: 'https://smart-vision-nu.vercel.app/',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Enterprise Task & Project Management Portal',
      description: 'The Enterprise Task & Project Management Portal is a full-featured web application designed to streamline task assignment, project tracking, and team collaboration within an organization. The platform allows admins to create and manage projects, assign tasks to employees, and monitor progress in real-time. Employees can upload project-related files (PDF/JPG), mark task updates, and communicate through an integrated chat system powered by Socket.io.',
      techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JWT Authentication', 'Socket.io'],
      github: null,
      live: 'https://enterprise-task-project-management.vercel.app',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80',
      isUpcoming: false
    },
    {
      title: 'Upcharsetu – Doctor Appointment Booking Application',
      description: 'Upcharsetu is a modern full-stack web application designed to simplify doctor appointment scheduling and healthcare management. The platform connects patients and doctors through a seamless online interface where users can search for doctors by specialization, view availability, and book appointments in real time. Doctors can manage their schedules, update availability, and communicate with patients efficiently.',
      techStack: ['React.js', 'Tailwind CSS', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'JWT Authentication'],
      github: null,
      live: null,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80',
      isUpcoming: true
    }
  ];

  return (
    <section id="projects" className={`py-20 transition-colors duration-300 ${
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
            Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Tilt
              key={project.title}
              options={{
                max: 25,
                scale: 1.05,
                speed: 400,
                glare: true,
                'max-glare': 0.5,
              }}
              className="w-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Upcoming Badge */}
                {project.isUpcoming && (
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      <Clock size={14} className="mr-1" />
                      Upcoming
                    </div>
                  </div>
                )}

                <div className="absolute top-4 right-4 flex space-x-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                    >
                      <Github size={20} />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-black dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-black dark:text-gray-300 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-black dark:text-gray-200 mb-2">Tech Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-black dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      <Github size={16} className="mr-2" />
                      Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-black dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Live Demo
                    </a>
                  )}
                  {project.isUpcoming && (
                    <div className="flex items-center text-orange-600 dark:text-orange-400">
                      <Clock size={16} className="mr-2" />
                      In Development
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
