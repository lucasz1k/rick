import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface SuperImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: 'low' | 'medium' | 'high';
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  onLoad?: () => void;
  onError?: (error: Event) => void;
}

// Use original image source (no WebP conversion)
const getOptimizedSrc = (src: string) => {
  return src; // Return original image without modification
};

export const SuperImage: React.FC<SuperImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  quality = 'medium',
  sizes = '100vw',
  placeholder = 'blur',
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Optimized intersection observer
  useEffect(() => {
    if (priority || isInView) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority, isInView]);

  // Handle image load
  const handleLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    setHasError(false);
    
    // Optimize performance by removing will-change
    if (imgRef.current) {
      imgRef.current.style.willChange = 'auto';
    }
    
    onLoad?.();
  }, [onLoad]);

  // Handle image error with fallback
  const handleError = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    setHasError(true);
    onError?.(event as any);
  }, [onError]);

  // Preload critical images
  useEffect(() => {
    if (priority && src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = getOptimizedSrc(src);
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [priority, src]);

  const optimizedSrc = getOptimizedSrc(src);

  const shouldShowImage = priority || isInView;
  
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Placeholder */}
      {placeholder === 'blur' && !isLoaded && !hasError && shouldShowImage && (
        <div 
          className="absolute inset-0 bg-muted animate-pulse"
          style={{
            backgroundImage: `linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%), 
                             linear-gradient(-45deg, hsl(var(--muted)) 25%, transparent 25%), 
                             linear-gradient(45deg, transparent 75%, hsl(var(--muted)) 75%), 
                             linear-gradient(-45deg, transparent 75%, hsl(var(--muted)) 75%)`,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground text-sm">
          Imagem indisponível
        </div>
      )}

      {/* Main image - Always render with src, let browser handle loading */}
      <img
        ref={imgRef}
        src={optimizedSrc}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoaded ? 'opacity-100' : 'opacity-0',
          hasError && 'opacity-0'
        )}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          willChange: isLoaded ? 'auto' : 'opacity',
          contentVisibility: priority ? 'visible' : 'auto'
        }}
      />
    </div>
  );
};