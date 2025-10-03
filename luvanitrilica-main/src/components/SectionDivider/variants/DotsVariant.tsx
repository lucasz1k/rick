import React from 'react';
import { VariantProps } from '../types';
import { CommonGradients } from '../gradients';
import { ParticleEffect } from '../ParticleEffect';

export const DotsVariant = ({ flip }: VariantProps) => {
  return (
    <div className="relative w-full h-full overflow-visible">
      {/* Extended Wave Container */}
      <div className="absolute inset-0 -top-24 -bottom-24 -left-24 -right-24">
        <svg className="w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none" fill="none">
          {/* Primary Flowing Wave */}
          <path d="M-400,100 Q-100,40 200,100 T800,100 T1400,100 T2000,100" stroke="url(#dotsPrimary1)" strokeWidth="4" fill="none" className="animate-wave-flow-right" />
          
          {/* Secondary Counter Wave */}
          <path d="M2000,60 Q1600,120 1200,60 T400,60 T-400,60" stroke="url(#dotsSecondary1)" strokeWidth="3" fill="none" className="animate-wave-flow-left" />
          
          {/* Tertiary Slow Wave */}
          <path d="M-400,140 Q0,80 400,140 T1200,140 T2000,140" stroke="url(#dotsEnergy1)" strokeWidth="2" fill="none" className="animate-wave-flow-slow" />
          
          <CommonGradients variantPrefix="dots" />
        </svg>
      </div>
      
      {/* Dynamic Glow Effects */}
      <div className="absolute inset-0 -top-16 -bottom-16 -left-12 -right-12">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent transform -translate-y-1/2 animate-glow-sweep" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent animate-glow-sweep-reverse" />
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent animate-glow-sweep-slow" />
      </div>
      
      {/* Flowing Energy Particles */}
      <ParticleEffect count={12} variant="dots" className="-top-12 -bottom-12 -left-8 -right-8" />
    </div>
  );
};