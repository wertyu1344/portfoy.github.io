'use client';

import { useEffect, useRef } from 'react';
import Intro from '@/components/Intro';
import ProjectShowcase from '@/components/ProjectShowcase';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Lenis from '@studio-freight/lenis';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen">
      <Intro />
      
      <section id="projects" className="section">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-montreal tracking-widest mb-16 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            PROJELER
          </h2>
          
          <ProjectShowcase 
            title="Moodly"
            description="Sesli günlük uygulaması. Kullanıcıların günlük yaşamlarını anlattıkları ve o güne dair fotoğraf bıraktıkları duygusal bir deneyim sunuyor."
            technologies={['Flutter', 'Firebase', 'GetX', 'Cloud Storage']}
            screens={[
              { project: 1, screen: 1 },
              { project: 1, screen: 2 },
              { project: 1, screen: 3 },
              { project: 1, screen: 4 },
            ]}
          />
          
          <ProjectShowcase 
            title="Bulut Pro"
            description="Apartman ve site yönetimleri için geliştirilmiş, site sakinleri tarafından kullanılan aidat ödeme, talep oluşturma ve duyuru takibi yapabilen kapsamlı bir yönetim uygulaması."
            technologies={['Flutter', 'GetX', 'SQLite', 'Payment API']}
            screens={[
              { project: 2, screen: 1 },
              { project: 2, screen: 2 },
              { project: 2, screen: 3 },
              { project: 2, screen: 4 },
            ]}
            reverse
          />
          
          <ProjectShowcase 
            title="Boogi"
            description="Kullanıcıların kitaplar ekleyip onlara notlarını ekledikleri interaktif bir kitap takip uygulaması. Ayrıca kitabı yapay zeka ile tartışabilme özelliği sunuyor."
            technologies={['Flutter', 'Firebase', 'OpenAI API', 'GetX']}
            screens={[
              { project: 3, screen: 1 },
              { project: 3, screen: 2 },
              { project: 3, screen: 3 },
              { project: 3, screen: 4 },
            ]}
          />
        </div>
      </section>
      
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
