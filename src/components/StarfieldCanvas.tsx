import React, { useRef, useEffect, useState } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

const StarfieldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Generate stars
      const starCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 20000));
      starsRef.current = Array.from({ length: starCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.2 + 0.1,
        opacity: Math.random() * 0.8 + 0.2,
      }));
    };

    const animate = (timestamp: number) => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      starsRef.current.forEach((star) => {
        ctx.save();
        ctx.globalAlpha = star.opacity;
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = star.size * 2;
        ctx.shadowColor = '#ffffff';
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        // Animate position if motion is allowed
        if (!prefersReducedMotion) {
          star.x -= star.speed;
          if (star.x < -10) {
            star.x = canvas.width + 10;
            star.y = Math.random() * canvas.height;
          }
          
          // Subtle opacity pulse
          star.opacity += Math.sin(timestamp * 0.001 + star.x * 0.01) * 0.01;
          star.opacity = Math.max(0.2, Math.min(0.8, star.opacity));
        }
      });
      
      if (!prefersReducedMotion) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    resizeCanvas();
    animate(0);
    
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'transparent',
        willChange: prefersReducedMotion ? 'auto' : 'transform',
      }}
      aria-hidden="true"
    />
  );
};

export default StarfieldCanvas;