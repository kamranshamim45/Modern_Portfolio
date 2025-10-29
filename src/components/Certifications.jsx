import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

const Certifications = () => {
  const certifications = [
    {
      title: 'Accenture Certificate',
      link: '/Accenture certificate.pdf',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Analytics Certificate',
      link: '/Data analytics certificate.pdf',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'DSA Certificate',
      link: '/DSA Certificate.pdf',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Power BI Certificate',
      link: '/E-Certificate of MD KAMRAN SHAMIM (1) POWER BI.pdf',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'CIT Certificate',
      link: '/Md Kamran Shamim - Participation CIT Certificate.pdf',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section id="certifications" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Certifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          <motion.a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
          >
            <Award className="w-5 h-5 mr-2" />
            View My Resume
          </motion.a>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {cert.title}
                </h3>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 text-sm font-medium"
                >
                  View Certificate
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
