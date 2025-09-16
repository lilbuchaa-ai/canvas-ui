import React, { useEffect, useRef } from 'react';
import { 
  Star, 
  Sparkles, 
  Moon, 
  Sun, 
  Zap, 
  Heart, 
  Shield, 
  Target, 
  Crown, 
  Wind, 
  Droplet,
  ArrowRight,
  ChevronDown 
} from 'lucide-react';
import AppHeader from '../components/AppHeader';
import StarfieldCanvas from '../components/StarfieldCanvas';
import ZodiacBadge from '../components/ZodiacBadge';
import SectionHeader from '../components/SectionHeader';
import ServicesCarousel from '../components/ServicesCarousel';
import GlowCard from '../components/GlowCard';
import ZodiacTeaser from '../components/ZodiacTeaser';
import TarotTeaser from '../components/TarotTeaser';
import CompatibilityTeaser from '../components/CompatibilityTeaser';

const zodiacSigns = [
  { name: 'Aries', dateRange: 'Mar 21 - Apr 19', Icon: Star, description: 'Bold and pioneering spirit' },
  { name: 'Taurus', dateRange: 'Apr 20 - May 20', Icon: Shield, description: 'Grounded and determined nature' },
  { name: 'Gemini', dateRange: 'May 21 - Jun 20', Icon: Wind, description: 'Curious and adaptable mind' },
  { name: 'Cancer', dateRange: 'Jun 21 - Jul 22', Icon: Moon, description: 'Intuitive and nurturing soul' },
  { name: 'Leo', dateRange: 'Jul 23 - Aug 22', Icon: Crown, description: 'Confident and generous heart' },
  { name: 'Virgo', dateRange: 'Aug 23 - Sep 22', Icon: Target, description: 'Analytical and helpful spirit' },
  { name: 'Libra', dateRange: 'Sep 23 - Oct 22', Icon: Heart, description: 'Harmonious and diplomatic nature' },
  { name: 'Scorpio', dateRange: 'Oct 23 - Nov 21', Icon: Zap, description: 'Intense and transformative power' },
  { name: 'Sagittarius', dateRange: 'Nov 22 - Dec 21', Icon: Target, description: 'Adventurous and philosophical mind' },
  { name: 'Capricorn', dateRange: 'Dec 22 - Jan 19', Icon: Shield, description: 'Ambitious and disciplined approach' },
  { name: 'Aquarius', dateRange: 'Jan 20 - Feb 18', Icon: Wind, description: 'Innovative and humanitarian vision' },
  { name: 'Pisces', dateRange: 'Feb 19 - Mar 20', Icon: Droplet, description: 'Compassionate and artistic soul' },
];

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const zodiacRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    // Observe zodiac cards for staggered animation
    const zodiacCards = zodiacRef.current?.querySelectorAll('[data-zodiac-card]');
    zodiacCards?.forEach((card, index) => {
      setTimeout(() => {
        observer.observe(card);
      }, index * 100);
    });

    return () => observer.disconnect();
  }, []);

  const handleParallax = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const scrollY = window.scrollY;
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach((element) => {
      const speed = parseFloat(element.getAttribute('data-parallax') || '0.5');
      const yPos = -(scrollY * speed);
      (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  return (
    <div className="min-h-screen bg-bg-950 text-text-base overflow-x-hidden">
      {/* Starfield Background */}
      <StarfieldCanvas />
      
      {/* Static starfield pattern */}
      <div className="fixed inset-0 starfield-static pointer-events-none z-0" />
      
      {/* Nebula background */}
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0"
        style={{ background: 'var(--gradient-nebula)' }}
        data-parallax="0.3"
      />

      {/* Header */}
      <AppHeader />

      <main className="relative z-10">
        {/* Hero Section */}
        <section ref={heroRef} className="min-h-screen flex items-center justify-center px-4 pt-20">
          <div className="container mx-auto text-center max-w-4xl">
            <div className="space-y-8" data-parallax="0.6">
              <div className="space-y-4">
                <h1 className="font-heading font-extrabold leading-tight">
                  Unlock Your{' '}
                  <span className="gradient-text">Cosmic</span>{' '}
                  Destiny
                </h1>
                <p className="text-xl text-text-muted leading-relaxed max-w-2xl mx-auto">
                  Discover the ancient wisdom of the stars with personalized astrology readings 
                  that illuminate your path forward.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="btn-cosmic group">
                  Start Your Journey
                  <Sparkles className="w-5 h-5 ml-2 group-hover:animate-pulse" />
                </button>
                
                <button className="flex items-center space-x-2 px-6 py-3 text-text-base hover:text-violet transition-colors duration-200 focus-cosmic">
                  <span>Explore Services</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Zodiac Preview Teaser */}
        <ZodiacTeaser />

        {/* Tarot Preview Teaser */}
        <TarotTeaser />

        {/* Compatibility Preview Teaser */}
        <CompatibilityTeaser />

        {/* Zodiac Grid Section (kept as-is) */}
        <section ref={zodiacRef} id="zodiac" className="py-24 px-4">
          <div className="container mx-auto">
            <SectionHeader
              subtitle="Your Cosmic Blueprint"
              title="Discover Your Zodiac Sign"
              description="Each sign holds unique wisdom and insight into your personality, relationships, and destiny."
              titleGradient
              className="mb-16"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {zodiacSigns.map((sign, index) => (
                <div
                  key={sign.name}
                  data-zodiac-card
                  className="opacity-0 transform translate-y-8"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'forwards',
                  }}
                >
                  <ZodiacBadge {...sign} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Carousel Section */}
        <section id="services" className="py-24 px-4">
          <div className="container mx-auto">
            <SectionHeader
              subtitle="Cosmic Services"
              title="Your Journey to Self-Discovery"
              description="Choose from our range of personalized astrology services designed to guide you on your cosmic journey."
              className="mb-16"
            />
            
            <ServicesCarousel />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto text-center">
            <GlowCard className="max-w-2xl mx-auto" hover3d glowIntensity="high">
              <div className="space-y-6">
                <div className="relative mx-auto w-16 h-16">
                  <Star className="w-16 h-16 text-violet animate-pulse" fill="currentColor" />
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                    <Star className="w-16 h-16 text-magenta opacity-30" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="font-heading font-bold gradient-text">
                    Ready to Begin Your Cosmic Journey?
                  </h2>
                  <p className="text-text-muted leading-relaxed">
                    Get personalized insights that illuminate your path, reveal your potential, 
                    and guide you toward your highest purpose.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="btn-cosmic group">
                    Get My Reading
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                  
                  <button className="px-6 py-3 text-text-muted hover:text-violet transition-colors duration-200 focus-cosmic">
                    Learn More
                  </button>
                </div>
              </div>
            </GlowCard>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t border-white/10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-violet" fill="currentColor" />
              <span className="font-heading font-bold text-lg">Cosmic</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-text-muted">
              <a href="#" className="hover:text-violet transition-colors duration-200">Privacy</a>
              <a href="#" className="hover:text-violet transition-colors duration-200">Terms</a>
              <a href="#" className="hover:text-violet transition-colors duration-200">Contact</a>
            </div>
            
            <p className="text-sm text-text-muted">
              © 2024 Cosmic Astrology. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;