import React from 'react';
import { VariantProps } from '../types';
import { ParticleEffect } from '../ParticleEffect';

export const DiagonalVariant = ({ flip }: VariantProps) => {
  return (
    <div className="relative w-full h-full">
      {/* Constrained Background Container */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary Diagonal Flow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
        
        {/* Secondary Diagonal Layer */}
        <div className="absolute inset-0 bg-gradient-to-tl from-accent/8 via-transparent to-primary/3" />
        
        {/* Simplified Energy Streams */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent"
              style={{
                left: `${25 + i * 25}%`,
                animation: `streamUp ${4 + i}s infinite ease-in-out ${i * 0.5}s`,
              }}
            />
          ))}
        </div>
        
        {/* Reduced Particle System */}
        <ParticleEffect count={4} variant="diagonal" className="inset-0" />
      </div>
      
      {/* Simplified Center Line */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>
      
      {/* Gentle Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/2 via-transparent to-accent/2 opacity-60" />
    </div>
  );
};