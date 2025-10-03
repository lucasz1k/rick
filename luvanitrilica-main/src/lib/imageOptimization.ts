// Image optimization utilities
export interface ImageSize {
  width: number;
  height?: number;
  density?: number;
}

export interface OptimizedImageConfig {
  quality: 'low' | 'medium' | 'high';
  format: 'webp' | 'jpeg' | 'png' | 'auto';
  sizes: ImageSize[];
  lazy: boolean;
  preload: boolean;
}

// WebP support detection (cached)
let webpSupported: boolean | null = null;

export const detectWebPSupport = (): boolean => {
  if (webpSupported !== null) return webpSupported;
  
  if (typeof window === 'undefined') {
    webpSupported = false;
    return false;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  webpSupported = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  return webpSupported;
};

// Generate optimized image sources
export const generateImageSources = (
  src: string,
  config: Partial<OptimizedImageConfig> = {}
): { src: string; srcSet: string; sizes: string } => {
  const {
    quality = 'medium',
    format = 'auto',
    sizes = [
      { width: 320 },
      { width: 640 },
      { width: 1024 },
      { width: 1920 }
    ]
  } = config;

  // Determine optimal format
  const useWebP = format === 'webp' || (format === 'auto' && detectWebPSupport());
  const targetFormat = useWebP && src.match(/\.(jpg|jpeg|png)$/i) ? 'webp' : 
                     src.match(/\.(webp|jpg|jpeg|png)$/i)?.[1] || 'jpg';

  // Generate base optimized source
  const optimizedSrc = generateOptimizedUrl(src, { format: targetFormat, quality });

  // Generate srcSet for responsive images
  const srcSet = sizes
    .map(size => {
      const url = generateOptimizedUrl(src, { 
        format: targetFormat, 
        quality, 
        width: size.width 
      });
      return `${url} ${size.width}w`;
    })
    .join(', ');

  // Generate sizes attribute
  const sizesAttr = generateSizesAttribute(sizes);

  return {
    src: optimizedSrc,
    srcSet,
    sizes: sizesAttr
  };
};

// Generate optimized URL (in production, this would integrate with your CDN/service)
export const generateOptimizedUrl = (
  src: string, 
  options: {
    format?: string;
    quality?: 'low' | 'medium' | 'high';
    width?: number;
    height?: number;
  } = {}
): string => {
  const { format, quality = 'medium', width, height } = options;
  
  // In production, integrate with services like:
  // - Cloudinary: https://cloudinary.com
  // - ImageKit: https://imagekit.io  
  // - Vercel: https://vercel.com/docs/concepts/image-optimization
  
  // For now, simulate optimized URLs
  let optimizedSrc = src;
  
  // Replace extension if format specified
  if (format && src.match(/\.(jpg|jpeg|png)$/i)) {
    optimizedSrc = src.replace(/\.(jpg|jpeg|png)$/i, `.${format}`);
  }
  
  // Add size suffix for different resolutions
  if (width) {
    optimizedSrc = optimizedSrc.replace(
      /(\.[^.]+)$/, 
      `-${width}w$1`
    );
  }
  
  return optimizedSrc;
};

// Generate sizes attribute for responsive images
export const generateSizesAttribute = (sizes: ImageSize[]): string => {
  // Default responsive sizes
  return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
};

// Preload critical images
export const preloadImage = (src: string, options: { 
  as?: 'image'; 
  crossorigin?: 'anonymous' | 'use-credentials';
  fetchpriority?: 'high' | 'low' | 'auto';
} = {}): void => {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = options.as || 'image';
  link.href = src;
  
  if (options.crossorigin) {
    link.crossOrigin = options.crossorigin;
  }
  
  if (options.fetchpriority) {
    link.setAttribute('fetchpriority', options.fetchpriority);
  }
  
  document.head.appendChild(link);
};

// Image loading performance metrics
export const measureImagePerformance = (
  imageElement: HTMLImageElement,
  callback: (metrics: {
    loadTime: number;
    size: { width: number; height: number };
    renderTime: number;
  }) => void
): void => {
  const startTime = performance.now();
  
  imageElement.addEventListener('load', () => {
    const loadTime = performance.now() - startTime;
    
    // Measure render time
    requestAnimationFrame(() => {
      const renderTime = performance.now() - startTime;
      
      callback({
        loadTime,
        size: {
          width: imageElement.naturalWidth,
          height: imageElement.naturalHeight
        },
        renderTime
      });
    });
  }, { once: true });
};

// Core Web Vitals optimization
export const optimizeForCoreWebVitals = {
  // Optimize Largest Contentful Paint (LCP)
  optimizeLCP: (heroImages: string[]) => {
    heroImages.forEach(src => {
      preloadImage(src, { fetchpriority: 'high' });
    });
  },
  
  // Optimize Cumulative Layout Shift (CLS)
  preventCLS: (imageElement: HTMLImageElement, aspectRatio?: number) => {
    if (aspectRatio) {
      imageElement.style.aspectRatio = aspectRatio.toString();
    }
    imageElement.style.width = '100%';
    imageElement.style.height = 'auto';
  },
  
  // Optimize First Input Delay (FID) by lazy loading non-critical images
  optimizeFID: (images: NodeListOf<HTMLImageElement>) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    }, { rootMargin: '50px' });
    
    images.forEach(img => observer.observe(img));
    
    return observer;
  }
};