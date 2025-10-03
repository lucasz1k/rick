import React from "react";
import { SectionDividerProps } from "./SectionDivider/types";
import { OptimizedWaveVariant } from "./SectionDivider/variants/OptimizedWaveVariant";
import { OptimizedCurveVariant } from "./SectionDivider/variants/OptimizedCurveVariant";
import { OptimizedGradientVariant } from "./SectionDivider/variants/OptimizedGradientVariant";

const SectionDivider = ({ variant = 'wave', flip = false, className = '' }: SectionDividerProps) => {
  const getVariantClasses = () => {
    const base = "w-full relative overflow-visible";
    
    // Reduced height system - more compact
    const height = "h-4 md:h-6 lg:h-8";
    
    return `${base} ${height}`;
  };

  const renderVariant = () => {
    switch (variant) {
      case 'wave':
        return <OptimizedWaveVariant flip={flip} />;
      case 'curve':
        return <OptimizedCurveVariant flip={flip} />;
      case 'gradient':
        return <OptimizedGradientVariant flip={flip} />;
      default:
        return <OptimizedWaveVariant flip={flip} />;
    }
  };

  return (
    <div 
      className={`${getVariantClasses()} ${className}`}
      style={{ 
        transform: flip ? 'scaleY(-1)' : 'none'
      }}
    >
      {renderVariant()}
    </div>
  );
};

export default SectionDivider;