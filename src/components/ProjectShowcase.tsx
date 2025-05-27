'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Screen {
  project: number;
  screen: number;
}

const defaultScreens: Screen[] = [
  { project: 1, screen: 1 },
  { project: 1, screen: 2 },
  { project: 1, screen: 3 },
  { project: 1, screen: 4 },
  { project: 2, screen: 1 },
  { project: 2, screen: 2 },
  { project: 2, screen: 3 },
  { project: 2, screen: 4 },
  { project: 3, screen: 1 },
  { project: 3, screen: 2 },
  { project: 3, screen: 3 },
  { project: 3, screen: 4 },
];

interface ProjectShowcaseProps {
  title: string;
  description: string;
  technologies: string[];
  screens?: Screen[];
  reverse?: boolean;
}

const ProjectShowcase = ({ 
  title, 
  description, 
  technologies, 
  screens = defaultScreens, 
  reverse = false 
}: ProjectShowcaseProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentScreen, setCurrentScreen] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Transform values for Apple-style animations
  const progress = useTransform(scrollYProgress, [0, 1], [0, 5]);
  
  // Calculate which screen to show based on scroll progress
  useEffect(() => {
    const unsubscribe = progress.onChange((value: number) => {
      // Get the current stage (0-5)
      const stage = Math.floor(value);
      
      // Only use stages 0-4 for screens
      if (stage >= 0 && stage < 4) {
        setCurrentScreen(stage);
      } else if (stage >= 4) {
        // Son ekranı göster
        setCurrentScreen(3);
      }
    });
    
    return () => unsubscribe();
  }, [progress, screens]);
  
  // Animation states based on progress
  const phoneScale = useTransform(
    progress,
    [0, 1, 2, 3, 4, 5],
    [0.8, 1, 1, 1, 1, 0.9]
  );
  
  const phoneX = useTransform(
    progress,
    [0, 1, 2, 3, 4, 5],
    [0, 0, 0, 0, reverse ? 150 : -150, reverse ? 200 : -200]
  );
  
  const infoOpacity = useTransform(
    progress,
    [0, 3, 3.5, 4.5, 5],
    [0, 0, 1, 1, 0.8]
  );
  
  // Yeni animasyonlar - daha minimalist yaklaşım
  const infoY = useTransform(
    progress,
    [0, 3, 3.5, 4.5, 5],
    [30, 30, 0, 0, 0]
  );
  
  const infoBlur = useTransform(
    progress,
    [0, 3, 3.5, 4.5, 5],
    [5, 5, 0, 0, 0]
  );
  
  return (
    <div 
      ref={containerRef}
      className="min-h-[500vh] relative mb-32"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 w-full h-full flex items-center justify-center">
          {/* Phone mockup with screen */}
          <motion.div 
            className="relative z-20"
            style={{ 
              scale: phoneScale,
              x: phoneX
            }}
            transition={{ duration: 0.1 }}
          >
            <div className="relative w-[320px] h-[650px]">
              {/* Phone frame */}
              <div className="absolute inset-0 bg-gray-800 rounded-[40px] border-4 border-gray-700 shadow-lg z-10"></div>
              
              {/* Dynamic notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-2xl z-20"></div>
              
              {/* Screen content with transitions */}
              <div className="absolute inset-[4px] rounded-[32px] overflow-hidden z-10 bg-white">
                {screens.map((screenItem, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 w-full h-full ${currentScreen === index ? 'block' : 'hidden'}`}
                  >
                    {/* Screen Content - Image */}
                    <div 
                      className="w-full h-full flex items-center justify-center overflow-hidden bg-white"
                      style={{ padding: 0 }}
                    >
                      <img 
                        src={`/portfoy.github.io/project${screenItem.project}/screen${screenItem.screen}${screenItem.project === 1 ? '.png' : '.jpeg'}`}
                        alt={`Proje ${screenItem.project} - Ekran ${screenItem.screen}`}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center top' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 3D parallax background effect */}
              <div className="absolute -inset-12 -z-10 bg-gradient-to-br from-gray-700/20 to-transparent rounded-[60px] blur-xl" />
            </div>
            
            {/* Screen indicator */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2 mb-8">
              {screens.slice(0, 4).map((_, index) => (
                <div 
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentScreen === index ? 'bg-white w-6' : 'bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </motion.div>
          
          {/* Project info */}
          <motion.div 
            className={`absolute z-10 max-w-md ${reverse ? 'left-8 md:left-16 text-left' : 'right-8 md:right-16'}`}
            style={{ 
              opacity: infoOpacity,
              y: infoY
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Sade ve şık tasarım */}
            <div className={`${reverse ? '' : 'text-right'}`}>
              {/* Proje başlığı */}
              <motion.div 
                className="mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  {title}
                </h2>
              </motion.div>
              
              {/* Proje açıklaması */}
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <p className="text-lg text-gray-300">{description}</p>
              </motion.div>
              
              {/* Teknolojiler */}
              <motion.div 
                className={`flex flex-wrap gap-2 ${reverse ? '' : 'justify-end'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                {technologies.map((tech, index) => (
                  <motion.span 
                    key={index}
                    className="px-3 py-1 bg-background/20 text-white text-sm border border-gray-700 rounded-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + (index * 0.05) }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcase;
