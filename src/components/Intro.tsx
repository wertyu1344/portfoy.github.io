'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useAnimation, Variants } from 'framer-motion';
import Link from 'next/link';

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.8,
    },
  }),
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3,
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const Intro = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  
  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="home"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-background">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background to-backgroundAlt"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Abstract Shape */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-accent/5 filter blur-3xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 15,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Content */}
      <motion.div 
        className="container-custom relative z-10 px-4 max-w-5xl mx-auto"
        style={{ opacity, scale, y }}
      >
        <motion.div 
          className="text-center"
          initial="hidden"
          animate={controls}
        >
          {/* Inspiring Quote */}
          <motion.h1 
            className="text-3xl md:text-5xl lg:text-6xl font-montreal tracking-tight leading-tight max-w-4xl mx-auto mb-8"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              "Mobil ekranlar için tasarlandı, gerçek kullanıcılar için geliştirildi." 
              <span className="block mt-2 md:mt-4">hissettiren bir tasarımdır."</span>
            </span>
          </motion.h1>
          
          {/* Author Signature */}
          <motion.div
            className="mb-12"
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            custom={0.5}
          >
            <p className="text-xl md:text-2xl font-space tracking-wider text-text/90 font-medium">
              ÖMER SAİD AKÇİN
            </p>
            <p className="text-base md:text-lg font-space tracking-wide text-accent mt-2">
              FLUTTER DEVELOPER
            </p>
          </motion.div>
          
          {/* Social Links */}
          <motion.div 
            className="flex justify-center gap-6 mb-16"
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            custom={0.7}
          >
            <motion.a 
              href="https://github.com/omersaidakcin" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ y: -3 }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </motion.a>
            
            <motion.a 
              href="https://linkedin.com/in/omersaidakcin" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ y: -3 }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator with KEŞFET text */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5
        }}
      >
        <a href="#projects" className="flex flex-col items-center group">
          <p className="text-sm text-accent mb-2 group-hover:text-white transition-colors duration-300">KEŞFET</p>
          <div className="w-10 h-10 flex items-center justify-center rounded-full border border-accent/30 group-hover:border-accent/60 transition-all duration-300">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-accent group-hover:text-white transition-colors duration-300"
            >
              <path 
                d="M12 5V19M12 19L19 12M12 19L5 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default Intro;
