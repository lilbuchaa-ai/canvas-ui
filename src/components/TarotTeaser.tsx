import React, { useEffect, useRef, useState } from 'react';
import SectionHeader from './SectionHeader';
import GlowCard from './GlowCard';

const TarotTeaser: React.FC = () => {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const anglesRef = useRef([ -8, 0, 8 ]);
  const [tick, setTick] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const cb = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', cb);
    return () => mq.removeEventListener('change', cb);
  }, []);

  useEffect(() => {
    if (paused || reduced) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    timerRef.current = setInterval(() => {
      // tiny shuffle: +/- 0.6deg oscillation
      anglesRef.current = anglesRef.current.map((a, i) => a + (i - 1) * 0.05);
      setTick((t) => t + 1);
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, reduced]);

  const cards = [
    { id: 'left', title: 'Intuition', hint: 'Clarity emerges' },
    { id: 'mid', title: 'Focus', hint: 'A path reveals' },
    { id: 'right', title: 'Change', hint: 'Turn the page' },
  ];

  const href = '/tarot';

  return (
    <section className="py-16 px-4" aria-label="Tarot Preview — Deck Teaser">
      <div className="container mx-auto max-w-5xl">
        <SectionHeader
          subtitle="Tarot Preview"
          title="Deck Teaser"
          description="A quiet 3-card fan — hover to flip, focus to pause."
          className="mb-10"
          titleGradient
        />

        <div
          className="relative flex items-center justify-center select-none"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="relative h-[260px] w-[520px]">
            {cards.map((c, i) => (
              <a
                href={href}
                key={c.id}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block"
                aria-label={`Tarot card: ${c.title}`}
              >
                <div
                  className="[perspective:1200px]"
                  style={{ transform: `rotate(${anglesRef.current[i]}deg) translateX(${(i - 1) * 80}px)` }}
                >
                  <GlowCard hover3d className="w-44 h-64">
                    <div className="w-full h-full rounded-xl flex flex-col items-center justify-center text-center">
                      <div className="w-10 h-10 rounded-full glass-surface mb-3" />
                      <div className="font-heading font-bold text-text-base">{c.title}</div>
                      <div className="text-sm text-text-muted">{c.hint}</div>
                    </div>
                  </GlowCard>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <a href={href} className="btn-cosmic" aria-label="Draw a daily card">
            Draw a daily card
          </a>
        </div>
      </div>
    </section>
  );
};

export default TarotTeaser;
