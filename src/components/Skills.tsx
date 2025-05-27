'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, LayoutGroup } from 'framer-motion';

// Minimal yetenek kategorileri
const skillCategories = [
  {
    name: 'Geliştirme',
    skills: [
      {
        name: 'Flutter',
        description: 'Cross-platform UI toolkit',
        icon: '🔷',
        level: 95,
        color: '#0175C2'
      },
      {
        name: 'Dart',
        description: 'Programming language',
        icon: '🎯',
        level: 90,
        color: '#0175C2'
      },
      {
        name: 'Kotlin',
        description: 'Android development',
        icon: '🤖',
        level: 75,
        color: '#7F52FF'
      }
    ]
  },
  {
    name: 'Backend',
    skills: [
      {
        name: 'Firebase',
        description: 'Backend & authentication',
        icon: '🔥',
        level: 85,
        color: '#FFCA28'
      },
      {
        name: 'REST API',
        description: 'API integration',
        icon: '🔌',
        level: 90,
        color: '#61DAFB'
      },
      {
        name: 'GraphQL',
        description: 'Query language',
        icon: '📊',
        level: 70,
        color: '#E535AB'
      }
    ]
  },
  {
    name: 'State Yönetimi',
    skills: [
      {
        name: 'GetX',
        description: 'State management',
        icon: '⚡',
        level: 95,
        color: '#8A2BE2'
      },
      {
        name: 'Provider',
        description: 'Dependency injection',
        icon: '🔄',
        level: 90,
        color: '#4CAF50'
      },
      {
        name: 'Bloc',
        description: 'Reactive programming',
        icon: '📊',
        level: 85,
        color: '#1E88E5'
      }
    ]
  },
  {
    name: 'UI/UX',
    skills: [
      {
        name: 'Animations',
        description: 'Custom UI animations',
        icon: '✨',
        level: 95,
        color: '#FF4081'
      },
      {
        name: 'UI Design',
        description: 'Interface design',
        icon: '🎨',
        level: 90,
        color: '#9C27B0'
      },
      {
        name: 'Responsive Design',
        description: 'Multi-device layouts',
        icon: '📱',
        level: 95,
        color: '#00BCD4'
      }
    ]
  }
];

// Minimal Yetenek Kartı
const SkillCard = ({ skill, index }: { skill: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Yavaş ve zarif animasyon için spring
  const scale = useSpring(1, { stiffness: 200, damping: 20 });
  const opacity = useSpring(0, { stiffness: 100, damping: 20 });
  const barWidth = useSpring(0, { stiffness: 60, damping: 15 });
  
  const onHoverStart = () => {
    setIsHovered(true);
    scale.set(1.03);
    opacity.set(1);
  };
  
  const onHoverEnd = () => {
    setIsHovered(false);
    scale.set(1);
    opacity.set(0);
  };
  
  // İlerleme çubuğu animasyonu
  useEffect(() => {
    const timer = setTimeout(() => {
      barWidth.set(skill.level / 100);
    }, 300 + index * 100);
    
    return () => clearTimeout(timer);
  }, [barWidth, skill.level, index]);
  
  return (
    <motion.div
      className="relative overflow-hidden rounded-lg bg-background border border-gray-800"
      style={{ scale }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl">{skill.icon}</span>
          <motion.span 
            className="text-xs font-medium px-2 py-1 rounded-full"
            style={{ 
              color: skill.color,
              backgroundColor: `${skill.color}15`,
              opacity
            }}
          >
            {skill.level}%
          </motion.span>
        </div>
        
        <h3 className="text-lg font-montreal font-medium mb-1">{skill.name}</h3>
        <p className="text-xs text-gray-400 mb-auto">{skill.description}</p>
        
        <div className="mt-4 w-full h-[2px] bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full rounded-full"
            style={{ 
              scaleX: barWidth, 
              originX: 0,
              backgroundColor: skill.color
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>(skillCategories[0].name);
  
  // Minimal paralaks efekti
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Animasyon değerleri
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  
  return (
    <section ref={containerRef} id="skills" className="section py-24 overflow-hidden">
      <div className="container-custom max-w-6xl mx-auto">
        <motion.div 
          className="mb-16 max-w-xl"
          style={{ opacity, y }}
        >
          <h2 className="text-2xl md:text-3xl font-montreal font-medium tracking-wider mb-6">
            YETENEKLER
          </h2>
          
          <p className="text-base text-gray-400">
            Flutter ekosisteminde uzmanlaşarak, yüksek performanslı ve etkileyici kullanıcı deneyimleri oluşturuyorum.
          </p>
        </motion.div>
        
        {/* Minimal kategori seçicisi */}
        <div className="mb-12 border-b border-gray-800">
          <div className="flex overflow-x-auto hide-scrollbar pb-1">
            {skillCategories.map((category, index) => (
              <motion.button
                key={category.name}
                className={`px-4 py-2 mr-6 text-sm transition-all relative ${activeCategory === category.name ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                onClick={() => setActiveCategory(category.name)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {category.name}
                {activeCategory === category.name && (
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-accent"
                    layoutId="activeCategory"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Beceri kartları */}
        <div className="relative">
          {skillCategories.map((category) => (
            <motion.div 
              key={category.name}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: activeCategory === category.name ? 1 : 0,
                y: activeCategory === category.name ? 0 : 20,
                pointerEvents: activeCategory === category.name ? 'auto' : 'none',
                position: activeCategory === category.name ? 'relative' : 'absolute',
                zIndex: activeCategory === category.name ? 1 : 0,
              }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%' }}
            >
              {category.skills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Minimal dekoratif öğe */}
      <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
    </section>
  );
};

export default Skills;
