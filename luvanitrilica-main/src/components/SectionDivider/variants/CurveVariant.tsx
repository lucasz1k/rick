import React from 'react';
import { VariantProps } from '../types';
import { CommonGradients } from '../gradients';
import { ParticleEffect } from '../ParticleEffect';

export const CurveVariant = ({ flip }: VariantProps) => {
  return (
    <div className="relative w-full h-full">
      {/* Constrained Curve Container */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none" fill="none">
          {/* Simplified Animated Curve */}
          <path d="M0,100 C300,60 600,140 1200,100" stroke="url(#curvePrimary1)" strokeWidth="2" fill="none">
            <animate attributeName="d" values="M0,100 C300,60 600,140 1200,100;M0,100 C300,140 600,60 1200,100;M0,100 C300,60 600,140 1200,100" dur="8s" repeatCount="indefinite" />
          </path>
          
          <CommonGradients variantPrefix="curve" />
        </svg>
      </div>
      
      {/* Reduced Curve Particles */}
      <ParticleEffect count={3} variant="curve" className="inset-0" />
      
      {/* Ambient Curve Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/3 via-transparent to-accent/3 backdrop-blur-[0.5px]" />
    </div>
  );
};