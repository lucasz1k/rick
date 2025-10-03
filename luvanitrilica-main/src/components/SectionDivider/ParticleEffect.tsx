import React from 'react';

interface ParticleEffectProps {
  count: number;
  className?: string;
  variant: string;
}

export const ParticleEffect = ({ count, className = '', variant }: ParticleEffectProps) => {
  const getParticleConfig = (variant: string, index: number) => {
    switch (variant) {
      case 'wave':
        return {
          left: `${15 + (index * 12) % 70}%`, // Keep within bounds
          top: `${30 + (index % 3) * 15}%`,
          animation: `waveParticle ${4 + (index % 2)}s infinite ease-in-out ${index * 0.7}s`,
          size: 'w-1 h-1'
        };
      case 'diagonal':
        return {
          left: `${10 + (index * 8) % 80}%`, // Constrain to viewport
          top: `${15 + (index % 4) * 20}%`,
          animation: `particleLeak ${4 + (index % 3)}s infinite ease-in-out ${index * 0.4}s`,
          size: 'w-1.5 h-1.5'
        };
      case 'curve':
        return {
          left: `${20 + (index * 15) % 60}%`, // Safer positioning
          top: `${35 + (index % 2) * 20}%`,
          animation: `curveParticle ${5 + (index % 2)}s infinite ease-in-out ${index * 1}s`,
          size: 'w-1.5 h-1.5'
        };
      case 'dots':
        return {
          left: `${10 + (index * 10) % 80}%`, // Fix overflow issue
          top: `${25 + (index % 4) * 15}%`,
          animation: `particleFlow ${4 + (index % 3)}s infinite linear ${index * 0.3}s`,
          size: 'w-1 h-1'
        };
      default:
        return {
          left: '50%',
          top: '50%',
          animation: 'none',
          size: 'w-1 h-1'
        };
    }
  };

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {[...Array(Math.min(count, 4))].map((_, i) => { // Limit particles
        const config = getParticleConfig(variant, i);
        return (
          <div
            key={i}
            className={`absolute ${config.size} rounded-full bg-primary/15 backdrop-blur-sm`}
            style={{
              left: config.left,
              top: config.top,
              animation: config.animation,
            }}
          />
        );
      })}
    </div>
  );
};