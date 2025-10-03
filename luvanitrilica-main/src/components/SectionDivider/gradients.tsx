import React from 'react';

export const CommonGradients = ({ variantPrefix }: { variantPrefix: string }) => (
  <defs>
    {/* Primary Flow Gradients */}
    <linearGradient id={`${variantPrefix}Primary1`} x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0">
        <animate attributeName="stop-opacity" values="0;0.8;0" dur="4s" repeatCount="indefinite" />
      </stop>
      <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.6">
        <animate attributeName="offset" values="30%;70%;30%" dur="6s" repeatCount="indefinite" />
      </stop>
      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0">
        <animate attributeName="stop-opacity" values="0;0.4;0" dur="5s" repeatCount="indefinite" />
      </stop>
    </linearGradient>

    {/* Secondary Flow Gradients */}
    <linearGradient id={`${variantPrefix}Secondary1`} x1="100%" y1="0%" x2="0%" y2="0%">
      <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0" />
      <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.4">
        <animate attributeName="offset" values="20%;80%;20%" dur="8s" repeatCount="indefinite" />
      </stop>
      <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
    </linearGradient>

    {/* Energy Gradients */}
    <linearGradient id={`${variantPrefix}Energy1`} x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="hsl(var(--primary-foreground))" stopOpacity="0">
        <animate attributeName="stop-opacity" values="0;0.3;0" dur="3s" repeatCount="indefinite" />
      </stop>
      <stop offset="50%" stopColor="hsl(var(--primary-foreground))" stopOpacity="0.2">
        <animate attributeName="offset" values="40%;60%;40%" dur="4s" repeatCount="indefinite" />
      </stop>
      <stop offset="100%" stopColor="hsl(var(--primary-foreground))" stopOpacity="0">
        <animate attributeName="stop-opacity" values="0;0.2;0" dur="7s" repeatCount="indefinite" />
      </stop>
    </linearGradient>

    {/* Background Gradients */}
    <linearGradient id={`${variantPrefix}Background1`} x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="hsl(var(--background))" stopOpacity="0.1" />
      <stop offset="50%" stopColor="hsl(var(--muted))" stopOpacity="0.05">
        <animate attributeName="offset" values="30%;70%;30%" dur="10s" repeatCount="indefinite" />
      </stop>
      <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="0.1" />
    </linearGradient>
  </defs>
);