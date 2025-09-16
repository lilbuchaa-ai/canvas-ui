import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Crown, Droplet, Flame, Gem, Scale, Shield, Sparkles, Target, Wind, Zap, Moon } from 'lucide-react';
import SectionHeader from './SectionHeader';
import OrbitIcon from './OrbitIcon';

interface PreviewItem {
  id: string;
  name: string;
  hook: string;
  Icon: any;
}

const items: PreviewItem[] = [
  { id: 'aries', name: 'Aries', hook: 'Ignite bold beginnings', Icon: Flame },
  { id: 'taurus', name: 'Taurus', hook: 'Build lasting foundations', Icon: Gem },
  { id: 'gemini', name: 'Gemini', hook: 'Spark curious connections', Icon: Wind },
  { id: 'cancer', name: 'Cancer', hook: 'Nurture deep bonds', Icon: Moon },
  { id: 'leo', name: 'Leo', hook: 'Lead with radiant heart', Icon: Crown },
  { id: 'virgo', name: 'Virgo', hook: 'Refine with purpose', Icon: Target },
  { id: 'libra', name: 'Libra', hook: 'Find elegant balance', Icon: Scale },
  { id: 'scorpio', name: 'Scorpio', hook: 'Transform with truth', Icon: Zap },
  { id: 'sagittarius', name: 'Sagittarius', hook: 'Seek wider horizons', Icon: Target },
  { id: 'capricorn', name: 'Capricorn', hook: 'Climb with intent', Icon: Shield },
  { id: 'aquarius', name: 'Aquarius', hook: 'Invent a kinder future', Icon: Wind },
  { id: 'pisces', name: 'Pisces', hook: 'Dream in vivid color', Icon: Droplet },
];

const ZodiacTeaser: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isFocused, setIsFocused] = useState(false);

  // Compute index on scroll for emphasis
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const cardWidth = 208; // w-52
      const gap = 16; // gap-4
      const total = cardWidth + gap;
      const idx = Math.round(el.scrollLeft / total);
      setCurrentIndex(Math.max(0, Math.min(items.length - 1, idx)));
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const next = e.key === 'ArrowRight' ? currentIndex + 1 : currentIndex - 1;
    const clamped = Math.max(0, Math.min(items.length - 1, next));
    setCurrentIndex(clamped);
    const el = containerRef.current;
    if (!el) return;
    const cardWidth = 208; // w-52
    const gap = 16; // gap-4
    el.scrollTo({ left: clamped * (cardWidth + gap), behavior: 'smooth' });
  };

  const emphasisClasses = (index: number) =>
    index === currentIndex ? 'scale-100 opacity-100' : 'scale-[0.94] opacity-75';

  return (
    <section className="py-16 px-4" aria-label="Zodiac Preview — Orbit Teaser">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          subtitle="Zodiac Preview"
          title="Orbit Teaser"
          description="Glide through the signs — hover to shimmer, focus to navigate."
          className="mb-10"
          titleGradient
        />

        <div className="relative">
          {/* Edge masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-bg-950 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-bg-950 to-transparent z-10" />

          {/* Strip */}
          <div
            ref={containerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide py-4 px-2 snap-x snap-mandatory"
            role="region"
            aria-roledescription="carousel"
            aria-label="Zodiac orbit teaser"
            aria-live="polite"
            tabIndex={0}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
          >
            {items.map((item, index) => (
              <a
                key={item.id}
                href="/astro"
                className={`group flex-shrink-0 w-52 snap-center transition-all duration-200 ease-cosmic transform-gpu ${emphasisClasses(index)}`}
                aria-label={`${item.name} — ${item.hook}`}
              >
                <div className="relative flex flex-col items-center text-center">
                  {/* Circular badge */}
                  <div className="relative w-24 h-24 mb-4">
                    <OrbitIcon Icon={item.Icon} size="lg" />
                    {/* Focus ring */}
                    <div className="absolute inset-0 rounded-full ring-0 group-focus-visible:ring-2 ring-offset-2 ring-offset-bg-950 ring-amethyst/40" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-text-base">{item.name}</div>
                    <div className="text-sm text-text-muted">{item.hook}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZodiacTeaser;
