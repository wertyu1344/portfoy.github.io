'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Animasyon varyantları
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset form status after showing success message
      setTimeout(() => {
        setFormStatus('idle');
        setIsModalOpen(false);
      }, 2000);
    }, 1500);
  };
  
  return (
    <section ref={sectionRef} id="contact" className="py-24 bg-gradient-to-b from-background to-backgroundAlt relative overflow-hidden">
      {/* Dekoratif öğeler */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-accent/5 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent/5 blur-3xl"></div>
      
      <div className="container-custom max-w-6xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <h2 className="text-2xl md:text-3xl font-montreal font-medium tracking-wider mb-6">
            İLETİŞİM
          </h2>
          
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            Mobil uygulama geliştirme projeleriniz için benimle iletişime geçin. 
            Fikrinizi hayata geçirmek için birlikte çalışalım.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* İletişim Bilgileri */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp} className="bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-montreal font-medium mb-6">Benimle İletişime Geçin</h3>
              
              <div className="space-y-6">
                <motion.a 
                  href="mailto:contact@omersaid.com" 
                  className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors duration-300 group"
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-background/80 flex items-center justify-center border border-gray-700 group-hover:border-accent transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">E-posta</p>
                    <p>contact@omersaid.com</p>
                  </div>
                </motion.a>
                
                <motion.a 
                  href="https://linkedin.com/in/omersaidakcin" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors duration-300 group"
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-background/80 flex items-center justify-center border border-gray-700 group-hover:border-accent transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">LinkedIn</p>
                    <p>linkedin.com/in/omersaidakcin</p>
                  </div>
                </motion.a>
                
                <motion.a 
                  href="https://github.com/omersaidakcin" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors duration-300 group"
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-background/80 flex items-center justify-center border border-gray-700 group-hover:border-accent transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">GitHub</p>
                    <p>github.com/omersaidakcin</p>
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
          
          {/* İletişim Formu */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            custom={0.3}
            className="bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800"
          >
            <h3 className="text-xl font-montreal font-medium mb-6">Mesaj Gönderin</h3>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Adınız</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-background/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
                  placeholder="Adınız Soyadınız"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">E-posta</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-background/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
                  placeholder="ornek@mail.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Mesajınız</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full bg-background/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors resize-none"
                  placeholder="Projeniz hakkında bilgi verin..."
                  required
                />
              </div>
              
              <motion.button 
                type="submit"
                className="w-full py-3 px-6 bg-accent text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={formStatus === 'sending'}
              >
                {formStatus === 'idle' && 'Mesaj Gönder'}
                {formStatus === 'sending' && (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Gönderiliyor...
                  </>
                )}
                {formStatus === 'success' && 'Mesajınız Gönderildi!'}
                {formStatus === 'error' && 'Hata Oluştu, Tekrar Deneyin'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
      
      {/* Contact Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              className="bg-backgroundAlt p-8 rounded-2xl w-full max-w-lg shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-montreal tracking-wider">İLETİŞİM FORMU</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-accent hover:text-text transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-montreal text-accent mb-2">İSİM</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-background border border-accent/20 rounded-lg px-4 py-3 text-text focus:outline-none focus:border-accent transition-colors"
                    placeholder="Adınız Soyadınız"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-montreal text-accent mb-2">E-POSTA</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-background border border-accent/20 rounded-lg px-4 py-3 text-text focus:outline-none focus:border-accent transition-colors"
                    placeholder="ornek@mail.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-montreal text-accent mb-2">MESAJ</label>
                  <textarea 
                    id="message" 
                    rows={5}
                    className="w-full bg-background border border-accent/20 rounded-lg px-4 py-3 text-text focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Projeniz hakkında bilgi verin..."
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full btn"
                >
                  GÖNDER
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
