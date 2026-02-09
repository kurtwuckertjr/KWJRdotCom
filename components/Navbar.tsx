
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Category } from '../types';

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const archiveCategories = [
    { name: 'Bitcoin', cat: Category.BITCOIN },
    { name: 'Business', cat: Category.BUSINESS },
    { name: 'Politics', cat: Category.POLITICS },
    { name: 'Fitness', cat: Category.FITNESS },
    { name: 'Religion', cat: Category.RELIGION },
  ];

  const handleContactClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold tracking-tighter uppercase text-teal-600">
          Kurt Wuckert Jr.
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-12 text-[10px] font-bold tracking-[0.3em]">
          <Link to="/" className="hover:text-teal-600 transition-colors uppercase">Home</Link>
          
          <div 
            className="relative h-20 flex items-center group cursor-pointer"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <span className="hover:text-teal-600 uppercase flex items-center gap-1">
              Blog <ChevronDown size={12} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </span>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full -left-4 w-56 bg-white shadow-2xl rounded-xl border border-gray-50 p-6 space-y-4"
                >
                  <nav aria-label="Blog Categories">
                    {archiveCategories.map(cat => (
                      <Link 
                        key={cat.cat}
                        to={`/archive/${cat.cat}`}
                        className="block py-1 text-gray-400 hover:text-teal-600 transition-colors uppercase tracking-widest text-[9px]"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {cat.name}
                      </Link>
                    ))}
                    <Link 
                      to="/archive/all"
                      className="block pt-2 mt-2 border-t border-gray-100 text-teal-600 hover:text-teal-700 transition-colors uppercase tracking-widest text-[9px]"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      View All
                    </Link>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link 
            to="/#contact" 
            onClick={handleContactClick}
            className="hover:text-teal-600 transition-colors uppercase"
          >
            Contact Kurt
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-teal-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <nav className="px-6 py-8 space-y-6 flex flex-col items-center text-[12px] font-bold tracking-[0.3em] uppercase">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/archive/all" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
              <Link to="/#contact" onClick={handleContactClick}>Contact Kurt</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
