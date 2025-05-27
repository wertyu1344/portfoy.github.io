'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TestImageProps {
  index?: number;
}

const TestImage: React.FC<TestImageProps> = ({ index = 0 }) => {
  // Farklı ekran içerikleri için varyasyonlar
  const colors = ['#4299E1', '#48BB78', '#ED8936', '#9F7AEA', '#F56565'];
  const titles = ['Flutter UI', 'Responsive Design', 'Clean Architecture', 'State Management', 'Custom Animations'];
  const descriptions = [
    'Modern ve kullanıcı dostu arayüzler',
    'Tüm cihazlarda mükemmel deneyim',
    'Sürdürülebilir kod yapısı',
    'Verimli durum yönetimi',
    'Etkileyici özel animasyonlar'
  ];
  
  // Renk indeksini belirle (döngüsel)
  const colorIndex = index % colors.length;
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white p-4">
      <motion.div 
        className="w-20 h-20 mb-6 rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: colors[colorIndex] }}
        initial={{ scale: 0.8, rotate: -5 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM15.88 8.29L10 14.17L8.12 12.29C7.73 11.9 7.1 11.9 6.71 12.29C6.32 12.68 6.32 13.31 6.71 13.7L9.3 16.29C9.69 16.68 10.32 16.68 10.71 16.29L17.3 9.7C17.69 9.31 17.69 8.68 17.3 8.29C16.91 7.9 16.27 7.9 15.88 8.29Z" fill="white"/>
        </svg>
      </motion.div>
      
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-black font-bold text-xl mb-3">{titles[colorIndex]}</h3>
        <p className="text-gray-600 text-center text-sm px-4">{descriptions[colorIndex]}</p>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-8 w-32 h-1 bg-gray-200 rounded-full overflow-hidden mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div 
          className="h-full rounded-full"
          style={{ backgroundColor: colors[colorIndex] }}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
        />
      </motion.div>
    </div>
  );
};

export default TestImage;
