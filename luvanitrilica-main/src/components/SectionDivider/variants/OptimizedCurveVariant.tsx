import React from 'react';
import { VariantProps } from '../types';

export const OptimizedCurveVariant = ({ flip }: VariantProps) => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Simplified Curve Container */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="none">
          {/* Primary Curve */}
          <path 
            d="M0,120 C400,20 800,20 1200,120 L1200,120 L0,120 Z" 
            fill="url(#primaryCurve)"
            className="opacity-25"
          >
            <animate 
              attributeName="d" 
              values="M0,120 C400,20 800,20 1200,120 L1200,120 L0,120 Z;M0,120 C400,60 800,60 1200,120 L1200,120 L0,120 Z;M0,120 C400,20 800,20 1200,120 L1200,120 L0,120 Z" 
              dur="4s" 
              repeatCount="indefinite" 
            />
          </path>
          
          {/* Secondary Curve */}
          <path 
            d="M0,120 C300,40 900,40 1200,120 L1200,120 L0,120 Z" 
            fill="url(#secondaryCurve)"
            className="opacity-15"
          >
            <animate 
              attributeName="d" 
              values="M0,120 C300,40 900,40 1200,120 L1200,120 L0,120 Z;M0,120 C300,80 900,80 1200,120 L1200,120 L0,120 Z;M0,120 C300,40 900,40 1200,120 L1200,120 L0,120 Z" 
              dur="3s" 
              repeatCount="indefinite" 
            />
          </path>
          
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="primaryCurve" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.3" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="secondaryCurve" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Minimal Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-transparent to-primary/5 pointer-events-none" />
    </div>
  );
};