import { useState, useEffect, useCallback } from 'react';

interface ImageOptimizationConfig {
  enableWebP?: boolean;
  enableLazyLoading?: boolean;
  preloadCritical?: boolean;
  compressionQuality?: 'low' | 'medium' | 'high';
}

interface UseImageOptimizationProps {
  src: string;
  priority?: boolean;
  config?: ImageOptimizationConfig;
}

export const useImageOptimization = ({
  src,
  priority = false,
  config = {}
}: UseImageOptimizationProps) => {
  const {
    enableWebP = true,
    enableLazyLoading = true,
    preloadCritical = true,
    compressionQuality = 'medium'
  } = config;

  const [optimizedSrc, setOptimizedSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // WebP support detection
  const supportsWebP = useCallback(() => {
    if (typeof window === 'undefined') return false;
    
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }, []);

  // Generate optimized image URL
  const getOptimizedUrl = useCallback((originalSrc: string) => {
    if (!enableWebP || !supportsWebP() || !originalSrc.match(/\.(jpg|jpeg|png)$/i)) {
      return originalSrc;
    }

    // In production, integrate with image optimization service
    // For now, assume WebP versions exist
    return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }, [enableWebP, supportsWebP]);

  // Preload critical images
  useEffect(() => {
    if (priority && preloadCritical && src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = getOptimizedUrl(src);
      
      document.head.appendChild(link);
      
      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
  }, [priority, preloadCritical, src, getOptimizedUrl]);

  // Update optimized source
  useEffect(() => {
    const newOptimizedSrc = getOptimizedUrl(src);
    setOptimizedSrc(newOptimizedSrc);
  }, [src, getOptimizedUrl]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);
    
    // Fallback to original format
    if (optimizedSrc !== src) {
      setOptimizedSrc(src);
      setHasError(false);
      setIsLoading(true);
    }
  }, [optimizedSrc, src]);

  return {
    optimizedSrc,
    isLoading,
    hasError,
    handleLoad,
    handleError,
    config: {
      enableWebP,
      enableLazyLoading,
      preloadCritical,
      compressionQuality
    }
  };
};