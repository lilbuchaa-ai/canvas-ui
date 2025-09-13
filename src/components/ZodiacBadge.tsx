import React from 'react';
import { LucideIcon } from 'lucide-react';
import OrbitIcon from './OrbitIcon';

interface ZodiacBadgeProps {
  name: string;
  dateRange: string;
  Icon: LucideIcon;
  description: string;
}

const ZodiacBadge: React.FC<ZodiacBadgeProps> = ({ name, dateRange, Icon, description }) => {
  return (
    <div 
      className="group cursor-pointer transform-gpu transition-all duration-200 ease-cosmic hover:scale-105"
      style={{ 
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transition: 'transform 0.2s ease-out',
      }}
      onMouseEnter={(e) => {
        if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
          const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
          
          e.currentTarget.style.transform = 
            `perspective(1000px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) scale(1.02)`;
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 
          'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      }}
    >
      <div className="glass-surface glass-hover rounded-2xl p-6 h-full relative overflow-hidden group-hover:shadow-glow-violet">
        {/* Gradient border overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet to-magenta opacity-0 group-hover:opacity-20 transition-opacity duration-200 pointer-events-none" />
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 shimmer" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          <OrbitIcon Icon={Icon} size="lg" />
          
          <div className="space-y-1">
            <h3 className="font-heading font-bold text-text-base group-hover:gradient-text transition-all duration-200">
              {name}
            </h3>
            <p className="text-sm text-starlight font-medium">
              {dateRange}
            </p>
          </div>
          
          <p className="text-sm text-text-muted leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ZodiacBadge;