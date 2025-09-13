import React from 'react';
import { LucideIcon } from 'lucide-react';

interface OrbitIconProps {
  Icon: LucideIcon;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const OrbitIcon: React.FC<OrbitIconProps> = ({ Icon, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14', 
    lg: 'w-16 h-16'
  };

  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 28
  };

  return (
    <div className={`relative ${className}`}>
      {/* Outer orbital ring */}
      <div 
        className="absolute inset-0 rounded-full border border-violet/30 orbit-ring"
        style={{
          width: `calc(100% + 16px)`,
          height: `calc(100% + 16px)`,
          left: '-8px',
          top: '-8px',
        }}
      >
        {/* Orbital dot */}
        <div className="absolute w-1 h-1 bg-gradient-to-r from-violet to-magenta rounded-full shadow-glow-violet -top-0.5 left-1/2 transform -translate-x-1/2" />
      </div>
      
      {/* Icon container */}
      <div className={`
        ${sizeClasses[size]} 
        relative flex items-center justify-center 
        glass-surface glass-hover rounded-full 
        transform-gpu transition-all duration-200 ease-cosmic
        group-hover:scale-110 group-hover:shadow-glow-violet
      `}>
        <Icon 
          size={iconSizes[size]} 
          className="text-text-base group-hover:text-violet transition-colors duration-200" 
        />
      </div>
    </div>
  );
};

export default OrbitIcon;