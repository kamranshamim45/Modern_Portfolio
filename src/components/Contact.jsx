import { motion } from 'framer-motion';
import { useState } from 'react';
import { Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'kamranshamim45@gmail.com',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Email send failed:', error);
      console.error('Error status:', error.status);
      console.error('Error text:', error.text);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/kamranshamim45',
      color: 'hover:text-gray-900 dark:hover:text-gray-100'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/md-kamran-shamim-547298209/',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:kamranshamim45@gmail.com',
      color: 'hover:text-red-600'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Contact Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Contact Information</h3>

              {/* Phone Number */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-black dark:text-gray-200 mb-4">Phone</h4>
                <div className="flex items-center text-black dark:text-gray-300">
                  <Phone size={20} className="mr-2 text-green-600" />
                  <a href="tel:+91-9065506891" className="hover:text-blue-600 transition-colors duration-200">
                    +91-9065506891
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-black dark:text-gray-200 mb-4">Connect with me</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-white dark:bg-gray-600 rounded-full text-gray-600 dark:text-gray-300 ${social.color} transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.name}
                    >
                      <social.icon size={24} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div>
                <h4 className="text-lg font-semibold text-black dark:text-gray-200 mb-4">Find Me on the Map</h4>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27898.437326755215!2d77.70087659999994!3d29.067140799999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c6f10e5d2bda1%3A0x6c9f9cc444c5396f!2sModipuram%2C%20Pavli%20Khas%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1741422574318!5m2!1sen!2sin"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl"
                  ></iframe>
                </div>
                <div className="flex items-center mt-4 text-black dark:text-gray-300">
                  <MapPin size={20} className="mr-2 text-blue-600" />
                  <span>Modipuram, Pavli Khas, Uttar Pradesh</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Send Me a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-black dark:text-gray-200 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black dark:text-gray-200 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-black dark:text-gray-200 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 resize-none"
                    placeholder="Enter your message"
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      Send Message
                    </>
                  )}
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-green-100 dark:bg-green-900 border border-green-400 text-green-700 dark:text-green-200 rounded-lg"
                  >
                    Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 rounded-lg"
                  >
                    Failed to send message. Please try again or contact me directly.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
