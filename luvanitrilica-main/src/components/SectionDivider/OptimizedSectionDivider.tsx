import React, { memo } from "react";

interface OptimizedSectionDividerProps {
  variant?: 'wave' | 'curve' | 'minimal';
  flip?: boolean;
  className?: string;
}

const OptimizedSectionDivider = memo(({ 
  variant = 'minimal', 
  flip = false, 
  className = '' 
}: OptimizedSectionDividerProps) => {
  
  // Ultra-simplified - just spacing, no visual elements
  return (
    <div className={`w-full h-8 md:h-12 lg:h-16 ${className}`} />
  );
});

OptimizedSectionDivider.displayName = 'OptimizedSectionDivider';

export { OptimizedSectionDivider };