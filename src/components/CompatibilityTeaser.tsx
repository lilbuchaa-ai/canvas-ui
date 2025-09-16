import React, { useEffect, useMemo, useRef, useState } from 'react';
import SectionHeader from './SectionHeader';

const CompatibilityTeaser: React.FC = () => {
  const [birth1, setBirth1] = useState('');
  const [birth2, setBirth2] = useState('');
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [floatY, setFloatY] = useState(0);
  const score = 87;
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const cb = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', cb);
    return () => mq.removeEventListener('change', cb);
  }, []);

  useEffect(() => {
    if (reduced || paused) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setFloatY(0);
      return;
    }
    timerRef.current = setInterval(() => {
      setFloatY(Math.sin(Date.now() * 0.001) * 6);
    }, 50);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reduced, paused]);

  const gradientId = 'arcGradientReact';

  return (
    <section className="py-16 px-4" aria-label="Compatibility Preview — Synastry Teaser">
      <div className="container mx-auto max-w-4xl">
        <SectionHeader
          subtitle="Compatibility Preview"
          title="Cosmic Connections"
          description="Explore the celestial chemistry between souls through synastry"
          className="mb-12"
          titleGradient
        />

        <div className="flex flex-col items-center space-y-8">
          {/* Arc viz */}
          <div
            ref={containerRef}
            className="relative w-80 h-40"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 160" aria-hidden="true">
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={`hsl(var(--amethyst))`} stopOpacity={0.8} />
                  <stop offset="100%" stopColor={`hsl(var(--aurora-teal))`} stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <path
                d="M 60 140 Q 160 20 260 140"
                stroke={`url(#${gradientId})`}
                strokeWidth={3}
                fill="none"
                style={{ filter: 'drop-shadow(0 0 8px hsl(var(--amethyst) / 0.5))' }}
              />
              {/* floating particles */}
              {[120, 160, 200].map((x, i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={[80, 40, 60][i]}
                  r={[2, 1.5, 2.5][i]}
                  fill={i === 1 ? 'hsl(200 95% 70%)' : (i === 0 ? 'hsl(var(--amethyst))' : 'hsl(var(--aurora-teal))')}
                  opacity={[0.6, 0.8, 0.5][i]}
                />
              ))}
            </svg>

            {/* Left circle */}
            <div
              className="absolute left-0 bottom-0 w-20 h-20 glass-surface rounded-full flex items-center justify-center border border-amethyst/30"
              style={{
                transform: reduced || paused ? 'none' : `translateY(${floatY}px)`,
                boxShadow: '0 0 20px hsl(var(--amethyst) / 0.35)'
              }}
            >
              <div className="w-6 h-6 rounded-full bg-amethyst" />
            </div>

            {/* Right circle */}
            <div
              className="absolute right-0 bottom-0 w-20 h-20 glass-surface rounded-full flex items-center justify-center border border-aurora-teal/30"
              style={{
                transform: reduced || paused ? 'none' : `translateY(${-floatY}px)`,
                boxShadow: '0 0 20px hsl(var(--aurora-teal) / 0.35)'
              }}
            >
              <div className="w-6 h-6 rounded-full bg-aurora-teal" />
            </div>

            {/* Score */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center">
              <div className="text-2xl font-heading font-bold gradient-text">{score}%</div>
              <div className="text-xs text-text-muted font-medium">Cosmic Match</div>
            </div>
          </div>

          {/* Simple Form */}
          <div className="w-full max-w-md space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="birth1" className="block text-sm font-medium text-text-muted mb-2">Your Birth Date</label>
                <input id="birth1" type="date" value={birth1} onChange={(e) => setBirth1(e.target.value)} className="w-full px-4 py-2 glass-surface rounded-lg border border-amethyst/20 text-text-base focus-cosmic focus:border-amethyst/50 transition-colors" />
              </div>
              <div>
                <label htmlFor="birth2" className="block text-sm font-medium text-text-muted mb-2">Their Birth Date</label>
                <input id="birth2" type="date" value={birth2} onChange={(e) => setBirth2(e.target.value)} className="w-full px-4 py-2 glass-surface rounded-lg border border-aurora-teal/20 text-text-base focus-cosmic focus:border-aurora-teal/50 transition-colors" />
              </div>
            </div>
            <div className="text-center pt-2">
              <a href="/compat" className="btn-cosmic" aria-label="Check compatibility">Check compatibility</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompatibilityTeaser;
