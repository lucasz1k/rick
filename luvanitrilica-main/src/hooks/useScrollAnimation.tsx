import { useEffect, useRef } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
    // Respect user preferences for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Still add animate-in class for immediate visibility
      document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale')
        .forEach((el) => el.classList.add('animate-in'));
      return;
    }

    // Check if device is mobile for performance optimization
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    const observers = new Map();
    let rafId: number;

    const createObserver = (className: string) => {
      const observer = new IntersectionObserver(
        (entries) => {
          // Use requestAnimationFrame for smoother animations
          if (rafId) cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && !entry.target.classList.contains('animate-in')) {
                const element = entry.target as HTMLElement;
                
                // Optimize will-change usage
                element.style.willChange = 'transform, opacity';
                element.classList.add('animate-in');
                
                // Remove will-change after animation completes
                setTimeout(() => {
                  element.style.willChange = 'auto';
                }, 500);
                
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
              }
            });
          });
        },
        {
          threshold: isMobile ? 0.1 : isTablet ? 0.15 : 0.2, // Lower threshold for mobile
          rootMargin: isMobile ? '10px' : isTablet ? '15px' : '20px' // Reduced margin for mobile
        }
      );
      
      observers.set(className, observer);
      return observer;
    };

    // Optimized animation classes
    const animationClasses = [
      'scroll-animate',
      'scroll-animate-left', 
      'scroll-animate-right',
      'scroll-animate-scale'
    ];

    // Only observe elements that exist and are not already animated
    animationClasses.forEach((className) => {
      const elements = document.querySelectorAll(`.${className}:not(.animate-in)`);
      if (elements.length > 0) {
        const observer = createObserver(className);
        elements.forEach((el) => {
          // Apply CSS containment for better performance
          (el as HTMLElement).style.contain = 'layout style paint';
          observer.observe(el);
        });
      }
    });

    // Cleanup function
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      observers.forEach((observer) => {
        observer.disconnect();
      });
      // Clean up styles
      document.querySelectorAll('[style*="will-change"], [style*="contain"]').forEach((el) => {
        const element = el as HTMLElement;
        element.style.willChange = 'auto';
        element.style.contain = '';
      });
    };
  }, []);
};

export const useScrollReveal = (ref: React.RefObject<HTMLElement>, delay = 0) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Respect user preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.classList.add('animate-in');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains('animate-in')) {
            // Add will-change for performance
            (entry.target as HTMLElement).style.willChange = 'transform, opacity';
            
            setTimeout(() => {
              entry.target.classList.add('animate-in');
              // Remove will-change after animation
              setTimeout(() => {
                (entry.target as HTMLElement).style.willChange = 'auto';
              }, 400);
            }, Math.min(delay, 200)); // Cap delay at 200ms
            
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '20px'
      }
    );

    element.classList.add('scroll-animate');
    observer.observe(element);

    return () => {
      observer.disconnect();
      if (element.style.willChange) {
        element.style.willChange = 'auto';
      }
    };
  }, [delay]);
};