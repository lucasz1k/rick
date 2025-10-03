import React from 'react';
import { VariantProps } from '../types';

export const OptimizedWaveVariant = ({ flip }: VariantProps) => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-primary/5 via-transparent to-accent/5">
      <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="none">
        {/* Primary Wave - Simplified Animation */}
        <path 
          d="M0,60 C300,20 600,100 1200,60 L1200,120 L0,120 Z" 
          fill="url(#primaryWave)"
          className="opacity-30"
        >
          <animate 
            attributeName="d" 
            values="M0,60 C300,20 600,100 1200,60 L1200,120 L0,120 Z;M0,60 C300,100 600,20 1200,60 L1200,120 L0,120 Z;M0,60 C300,20 600,100 1200,60 L1200,120 L0,120 Z" 
            dur="4s" 
            repeatCount="indefinite" 
          />
        </path>
        
        {/* Secondary Wave */}
        <path 
          d="M0,80 C400,40 800,120 1200,80 L1200,120 L0,120 Z" 
          fill="url(#secondaryWave)"
          className="opacity-20"
        >
          <animate 
            attributeName="d" 
            values="M0,80 C400,40 800,120 1200,80 L1200,120 L0,120 Z;M0,80 C400,120 800,40 1200,80 L1200,120 L0,120 Z;M0,80 C400,40 800,120 1200,80 L1200,120 L0,120 Z" 
            dur="3s" 
            repeatCount="indefinite" 
          />
        </path>
        
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="primaryWave" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="secondaryWave" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};