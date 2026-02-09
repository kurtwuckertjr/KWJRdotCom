
import React from 'react';
import { motion } from 'framer-motion';
import { LOGOS } from '../constants';

const LogoCarousel: React.FC = () => {
  // Triple the logos to ensure a seamless loop on any screen size
  const duplicatedLogos = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <div className="py-20 bg-white border-y border-gray-100 overflow-hidden relative group">
      <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />
      
      <motion.div 
        className="flex items-center whitespace-nowrap"
        animate={{ x: [0, -1200] }}
        transition={{ 
          repeat: Infinity, 
          duration: 40, 
          ease: "linear" 
        }}
      >
        {duplicatedLogos.map((logo, idx) => (
          <a
            key={idx}
            href={logo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-16 group transition-all duration-500 transform hover:scale-110"
          >
            <span className={`text-3xl font-black tracking-tighter uppercase ${logo.color} opacity-20 group-hover:opacity-100 transition-all duration-500 drop-shadow-[0_0_0px_rgba(20,184,166,0)] group-hover:drop-shadow-[0_0_12px_rgba(20,184,166,0.4)]`}>
              {logo.name}
            </span>
          </a>
        ))}
      </motion.div>
    </div>
  );
};

export default LogoCarousel;
