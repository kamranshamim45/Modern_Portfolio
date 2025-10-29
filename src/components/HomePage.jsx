import { useEffect } from 'react';
import Navigation from './Navigation';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Certifications from './Certifications';
import Contact from './Contact';
import Footer from './Footer';

function HomePage() {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <>
      <Navigation />
      <main>
        <section id="hero">
          <Hero />
        </section>
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
