import React, { ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowIntensity?: 'low' | 'medium' | 'high';
  hover3d?: boolean;
}

const GlowCard: React.FC<GlowCardProps> = ({ 
  children, 
  className = '', 
  glowIntensity = 'medium',
  hover3d = false 
}) => {
  const glowClasses = {
    low: 'group-hover:shadow-glow-violet/20',
    medium: 'group-hover:shadow-glow-violet/40',
    high: 'group-hover:shadow-glow-violet/60'
  };

  return (
    <div 
      className={`group cursor-pointer ${className}`}
      style={{ 
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transition: 'transform 0.2s ease-out',
      }}
      onMouseEnter={(e) => {
        if (hover3d && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
          const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
          
          e.currentTarget.style.transform = 
            `perspective(1000px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg) scale(1.02)`;
        }
      }}
      onMouseLeave={(e) => {
        if (hover3d) {
          e.currentTarget.style.transform = 
            'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        }
      }}
    >
      <div className={`
        glass-surface glass-hover rounded-2xl p-6 h-full relative overflow-hidden
        transform-gpu transition-all duration-200 ease-cosmic
        ${glowClasses[glowIntensity]}
      `}>
        {/* Gradient border overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet to-magenta opacity-0 group-hover:opacity-10 transition-opacity duration-200 pointer-events-none" />
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GlowCard;