import React, { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  titleGradient?: boolean;
  children?: ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  description,
  className = '',
  titleGradient = false,
  children
}) => {
  return (
    <div className={`text-center max-w-3xl mx-auto space-y-4 ${className}`}>
      {subtitle && (
        <p className="text-starlight font-medium text-sm uppercase tracking-wide">
          {subtitle}
        </p>
      )}
      
      <h2 className={`
        font-heading font-bold 
        ${titleGradient ? 'gradient-text' : 'text-text-base'}
      `}>
        {title}
      </h2>
      
      {description && (
        <p className="text-text-muted text-lg leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
      
      {children}
    </div>
  );
};

export default SectionHeader;