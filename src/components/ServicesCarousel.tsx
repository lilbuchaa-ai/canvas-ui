import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Users, BookOpen, ArrowRight } from 'lucide-react';
import GlowCard from './GlowCard';

interface Service {
  id: string;
  title: string;
  description: string;
  Icon: typeof Sparkles;
}

const services: Service[] = [
  {
    id: '1',
    title: 'Personal Readings',
    description: 'Deep insights into your cosmic blueprint',
    Icon: Sparkles,
  },
  {
    id: '2',
    title: 'Relationship Analysis',
    description: 'Compatibility and connection guidance',
    Icon: Users,
  },
  {
    id: '3',
    title: 'Cosmic Education',
    description: 'Learn the ancient art of astrology',
    Icon: BookOpen,
  },
];

const ServicesCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start with middle item
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  const totalItems = services.length;

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalItems);
      }, 4000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, totalItems]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % totalItems);
  };

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + totalItems) % totalItems);
  };

  const getCardScale = (index: number) => {
    if (index === currentIndex) return 'scale-100 opacity-100';
    return 'scale-94 opacity-72';
  };

  const getCardZIndex = (index: number) => {
    return index === currentIndex ? 'z-20' : 'z-10';
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto" role="region" aria-roledescription="carousel">
      <div className="relative h-80 overflow-hidden">
        {/* Gradient edge masks */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-bg-950 to-transparent z-30 pointer-events-none" />
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-bg-950 to-transparent z-30 pointer-events-none" />
        
        {/* Carousel container */}
        <div 
          ref={scrollRef}
          className="flex items-center justify-center h-full gap-8 transition-transform duration-500 ease-cosmic"
          style={{
            transform: `translateX(-${currentIndex * 320}px)`,
          }}
        >
          {services.map((service, index) => {
            const { Icon } = service;
            
            return (
              <div
                key={service.id}
                className={`
                  flex-shrink-0 w-80 transform-gpu transition-all duration-500 ease-cosmic
                  ${getCardScale(index)} ${getCardZIndex(index)}
                `}
                style={{
                  marginLeft: index === 0 ? '160px' : '0',
                  marginRight: index === services.length - 1 ? '160px' : '0',
                }}
              >
                <GlowCard hover3d className="h-full">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full glass-surface flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <Icon className="w-8 h-8 text-violet group-hover:text-magenta transition-colors duration-200" />
                      </div>
                      {index === currentIndex && (
                        <div className="absolute inset-0 rounded-full border-2 border-violet/30 animate-pulse" />
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-xl font-heading font-bold text-text-base group-hover:gradient-text transition-all duration-200">
                        {service.title}
                      </h3>
                      <p className="text-text-muted leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    
                    <button className="inline-flex items-center space-x-2 text-violet hover:text-magenta transition-colors duration-200 font-medium group/btn">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </GlowCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-surface glass-hover flex items-center justify-center focus-cosmic group z-40"
        aria-label="Previous service"
      >
        <ChevronLeft className="w-5 h-5 text-text-base group-hover:text-violet transition-colors duration-200" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-surface glass-hover flex items-center justify-center focus-cosmic group z-40"
        aria-label="Next service"
      >
        <ChevronRight className="w-5 h-5 text-text-base group-hover:text-violet transition-colors duration-200" />
      </button>

      {/* Dots indicator */}
      <div className="flex justify-center space-x-2 mt-6">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
              w-2 h-2 rounded-full transition-all duration-200 focus-cosmic
              ${index === currentIndex 
                ? 'bg-gradient-to-r from-violet to-magenta shadow-glow-violet scale-125' 
                : 'bg-white/20 hover:bg-white/40'
              }
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Screen reader live region */}
      <div className="sr-only" aria-live="polite">
        Showing service {currentIndex + 1} of {totalItems}: {services[currentIndex]?.title}
      </div>
    </div>
  );
};

export default ServicesCarousel;