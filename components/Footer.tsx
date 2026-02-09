
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();

  const handleContactClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="py-12 border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12 text-[10px] font-bold tracking-[.4em] text-gray-400 uppercase">
          <a href="https://x.com/kurtwuckertjr" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 transition-all">X.com</a>
          <a href="https://youtube.com/@kurtwuckertjr" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 transition-all">YouTube</a>
          <Link to="/#contact" onClick={handleContactClick} className="hover:text-teal-600 transition-all">Contact Kurt</Link>
        </div>
        
        <div className="flex flex-col items-center gap-10 mb-12">
          <p className="text-[12px] text-gray-500 tracking-[0.2em] uppercase font-black">
            Copyright Kurtwuckertjr.com All Rights Reserved
          </p>
          
          <div className="flex items-center gap-6 group">
            <span className="text-xl md:text-2xl font-black uppercase tracking-[0.4em] text-slate-300 group-hover:text-teal-600 transition-colors">Hosted on</span>
            <img 
              src="https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/b27a04ddc37e2f2249828f67606388d7c1301028/public/GorillaCloud.svg" 
              alt="GorillaCloud™" 
              className="h-56 md:h-64 opacity-80 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-105"
            />
          </div>
        </div>

        <p className="text-[10px] text-gray-200 tracking-[0.8em] uppercase italic px-4">
          Epistemological self-consciousness backed by hard work.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
