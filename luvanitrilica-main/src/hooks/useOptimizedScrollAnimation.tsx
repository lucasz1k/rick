import { useEffect, useCallback, useRef } from 'react';

interface UseOptimizedScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  enableOnMobile?: boolean;
}

export const useOptimizedScrollAnimation = (options: UseOptimizedScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -10% 0px',
    enableOnMobile = false
  } = options;

  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<Set<Element>>(new Set());

  // Check if we should disable animations (performance optimization)
  const shouldAnimate = useCallback(() => {
    // Disable on mobile unless explicitly enabled
    if (!enableOnMobile && window.innerWidth < 768) return false;
    
    // Respect user preference for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    
    // Disable on slow connections
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
        return false;
      }
    }
    
    return true;
  }, [enableOnMobile]);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    if (!shouldAnimate()) return;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Add animate-in class with RAF for smooth performance
        requestAnimationFrame(() => {
          element.classList.add('animate-in');
        });
        
        // Remove from observer to prevent re-triggering
        if (observerRef.current) {
          observerRef.current.unobserve(element);
        }
        elementsRef.current.delete(element);
      }
    });
  }, [shouldAnimate]);

  useEffect(() => {
    if (!shouldAnimate()) {
      // If animations are disabled, immediately show all elements
      document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale')
        .forEach(el => el.classList.add('animate-in'));
      return;
    }

    // Create optimized observer
    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    });

    // Find and observe elements
    const elements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
    
    elements.forEach((element) => {
      if (observerRef.current && !elementsRef.current.has(element)) {
        observerRef.current.observe(element);
        elementsRef.current.add(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      elementsRef.current.clear();
    };
  }, [handleIntersection, threshold, rootMargin]);

  // Cleanup function for manual cleanup
  const cleanup = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    elementsRef.current.clear();
    
    // Remove animation styles to prevent memory leaks
    document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale')
      .forEach(el => {
        el.removeAttribute('style');
      });
  }, []);

  return { cleanup };
};

// Simplified hook for individual element animation
export const useOptimizedScrollReveal = (ref: React.RefObject<Element>, delay: number = 0) => {
  const shouldAnimate = window.innerWidth >= 768 && 
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!shouldAnimate || !ref.current) {
      // Show immediately if animations disabled
      if (ref.current) {
        ref.current.classList.add('animate-in');
      }
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            requestAnimationFrame(() => {
              entry.target.classList.add('animate-in');
            });
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [delay, shouldAnimate]);
};