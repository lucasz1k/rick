import React from 'react';
import { VariantProps } from '../types';

export const OptimizedGradientVariant = ({ flip }: VariantProps) => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Subtle Motion Gradient - Less Intrusive */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-accent/2 to-primary/3 opacity-60" />
      
      {/* Minimal Animated Accent */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/2 to-transparent"
          style={{
            animation: 'gentle-shift 8s ease-in-out infinite'
          }}
        />
      </div>
      
      {/* Subtle Geometric Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <pattern id="subtleGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="0.5" fill="hsl(var(--primary))" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#subtleGrid)" />
        </svg>
      </div>
    </div>
  );
};