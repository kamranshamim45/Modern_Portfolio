import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Text } from '@react-three/drei';
import { useState } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../App';
import ParticleBackground from './ParticleBackground';

const Hero = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Light Mode Background Animation */}
      {!darkMode && (
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-bounce"></div>
        </div>
      )}
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Theme Toggle */}
      <motion.button
        onClick={toggleDarkMode}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle dark mode"
      >
        <motion.svg
          key={darkMode ? 'sun' : 'moon'}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3 }}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-700 dark:text-gray-300"
        >
          {darkMode ? (
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
          ) : (
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
          )}
        </motion.svg>
      </motion.button>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Creative Developer
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-black dark:text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Crafting Digital Experiences Through Code & Design
            </motion.p>

            {/* Animated Marquee */}
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg shadow-lg mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <marquee className="text-white font-medium">
                𝕳𝖊𝖑𝖑𝖔! 𝕴'𝖒 𝖆 𝖕𝖆𝖘𝖘𝖎𝖔𝖓𝖆𝖙𝖊 𝖜𝖊𝖇 𝖉𝖊𝖛𝖊𝖑𝖔𝖕𝖊𝖗 𝖜𝖎𝖙𝖍 𝖊𝖝𝖕𝖊𝖗𝖙𝖎𝖘𝖊 𝖎𝖓 𝖇𝖚𝖎𝖑𝖉𝖎𝖓𝖌 𝖒𝖔𝖉𝖊𝖗𝖓, 𝖗𝖊𝖘𝖕𝖔𝖓𝖘𝖎𝖛𝖊, 𝖆𝖓𝖉 𝖚𝖘𝖊𝖗-𝖋𝖗𝖎𝖊𝖓𝖉𝖑𝖞 𝖜𝖊𝖇𝖘𝖎𝖙𝖊𝖘. 𝕴 𝖘𝖕𝖊𝖈𝖎𝖆𝖑𝖎𝖟𝖊 𝖎𝖓 𝖋𝖗𝖔𝖓𝖙-𝖊𝖓𝖉 𝖉𝖊𝖛𝖊𝖑𝖔𝖕𝖒𝖊𝖓𝖙 𝖚𝖘𝖎𝖓𝖌 𝕳𝕿𝕸𝕷, 𝕮𝕾𝕾, 𝕵𝖆𝖛𝖆𝕾𝖈𝖗𝖎𝖕𝖙, 𝖆𝖓𝖉 𝖋𝖗𝖆𝖒𝖊𝖜𝖔𝖗𝖐𝖘 𝖑𝖎𝖐𝖊 𝕽𝖊𝖆𝖈𝖙.
              </marquee>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              className="relative inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div
                className="w-48 h-48 mx-auto lg:mx-0 rounded-full overflow-hidden border-4 border-white shadow-2xl cursor-pointer"
                onClick={() => setIsImageModalOpen(true)}
              >
                <img
                  src="/portfolio.image.png"
                  alt="MD Kamran Shamim"
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                Available for work
              </div>
            </motion.div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-black dark:text-white mb-2">MD Kamran Shamim</h2>
              <p className="text-lg text-black dark:text-gray-300">Web Developer | Passionate about Building Responsive and User-Friendly Websites</p>
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Scene */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-96 lg:h-[500px]"
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
                <mesh>
                  <boxGeometry args={[2, 2, 2]} />
                  <meshStandardMaterial color="#8b5cf6" wireframe />
                </mesh>
              </Float>
              <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.5}>
                <mesh position={[3, 1, 0]}>
                  <sphereGeometry args={[1, 32, 32]} />
                  <meshStandardMaterial color="#06b6d4" />
                </mesh>
              </Float>
              <Float speed={1.6} rotationIntensity={1.2} floatIntensity={1}>
                <Text
                  position={[0, -3, 0]}
                  fontSize={0.5}
                  color="#374151"
                  anchorX="center"
                  anchorY="middle"
                >
                  Welcome to My World
                </Text>
              </Float>
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </motion.div>
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
          onClick={() => setIsImageModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-2xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200"
              aria-label="Close modal"
            >
              <X size={32} />
            </button>
            <img
              src="/portfolio.image.png"
              alt="MD Kamran Shamim - Full Size"
              className="w-full h-full object-contain rounded-lg shadow-2xl"
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
