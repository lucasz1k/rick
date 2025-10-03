import React from 'react';
import { VariantProps } from '../types';

export const GradientVariant = ({ flip }: VariantProps) => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
      <div 
        className="absolute inset-x-0 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent transform -translate-y-1/2"
        style={{
          boxShadow: '0 0 20px hsl(var(--primary) / 0.3)',
        }}
      />
    </div>
  );
};