import React, { useState, useEffect } from 'react';
import { Menu, X, Star, Moon, Sun } from 'lucide-react';

const AppHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Readings', href: '#readings' },
    { name: 'Zodiac', href: '#zodiac' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
  ];

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${isScrolled ? 'py-3' : 'py-4'}
      `}
    >
      <nav className="container mx-auto px-4">
        <div className={`
          glass-surface glass-hover rounded-full px-6 py-3 
          transition-all duration-300 backdrop-blur-xl
          ${isScrolled ? 'shadow-glass' : ''}
        `}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Star className="w-8 h-8 text-violet" fill="currentColor" />
                <div className="absolute inset-0 animate-pulse">
                  <Star className="w-8 h-8 text-magenta opacity-50" />
                </div>
              </div>
              <span className="font-heading font-bold text-xl text-text-base">
                Cosmic
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative px-4 py-2 text-text-base hover:text-violet transition-colors duration-200 group focus-cosmic"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-violet to-magenta group-hover:w-full group-hover:left-0 transition-all duration-300 group-hover:shadow-glow-violet" />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button className="btn-cosmic text-sm">
                Get Reading
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full glass-surface glass-hover focus-cosmic transform-gpu transition-transform duration-200 hover:scale-110"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-text-base" />
              ) : (
                <Menu className="w-5 h-5 text-text-base" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 glass-surface rounded-2xl p-6 backdrop-blur-xl animate-fade-in-up">
            <div className="space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-text-base hover:text-violet transition-colors duration-200 rounded-lg hover:bg-surface/50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-white/10">
                <button className="btn-cosmic w-full">
                  Get Reading
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default AppHeader;