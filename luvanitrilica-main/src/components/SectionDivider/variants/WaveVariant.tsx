import React from 'react';
import { VariantProps } from '../types';
import { CommonGradients } from '../gradients';
import { ParticleEffect } from '../ParticleEffect';

export const WaveVariant = ({ flip }: VariantProps) => {
  return (
    <div className="relative w-full h-full overflow-visible">
      {/* Extended Wave Container */}
      <div className="absolute inset-0 -top-16 -bottom-16 -left-12 -right-12">
        <svg className="w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none" fill="none">
          {/* Primary Animated Wave */}
          <path d="M-400,100 Q-100,40 200,100 T800,100 T1400,100" stroke="url(#wavePrimary1)" strokeWidth="3" fill="none">
            <animate attributeName="d" values="M-400,100 Q-100,40 200,100 T800,100 T1400,100;M-400,100 Q-100,120 200,60 T800,100 T1400,100;M-400,100 Q-100,40 200,100 T800,100 T1400,100" dur="8s" repeatCount="indefinite" />
          </path>
          
          {/* Secondary Wave */}
          <path d="M1400,80 Q1100,140 800,80 T200,80 T-400,80" stroke="url(#waveSecondary1)" strokeWidth="2" fill="none">
            <animateTransform attributeName="transform" type="translate" values="0,0;-100,0;0,0" dur="12s" repeatCount="indefinite" />
          </path>
          
          {/* Energy Wave */}
          <path d="M-400,120 Q0,60 400,120 T1200,120 T2000,120" stroke="url(#waveEnergy1)" strokeWidth="1.5" fill="none">
            <animate attributeName="d" values="M-400,120 Q0,60 400,120 T1200,120 T2000,120;M-400,120 Q0,160 400,80 T1200,120 T2000,120;M-400,120 Q0,60 400,120 T1200,120 T2000,120" dur="6s" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="translate" values="0,0;200,0;0,0" dur="15s" repeatCount="indefinite" />
          </path>
          
          <CommonGradients variantPrefix="wave" />
        </svg>
      </div>
      
      {/* Floating Particles */}
      <ParticleEffect count={6} variant="wave" className="-top-8 -bottom-8 -left-4 -right-4" />
    </div>
  );
};