// hooks/useGoogleAnalytics.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const useGoogleAnalytics = () => {
  const location = useLocation();
  
  const getGaId = (): string | null => {
    const hostname = window.location.hostname;
    
    if (hostname.includes('prod')) {
      return import.meta.env.VITE_GA_MEASUREMENT_ID || null;
    }
    if (hostname.includes('demo')) {
      return import.meta.env.VITE_GA_MEASUREMENT_ID_DEMO || null;
    }
    return null; // No GA in development
  };

  const gaId = getGaId();

  // Initialize GA
  useEffect(() => {
    if (!gaId) return;

    // Avoid loading script multiple times
    if (window.gtag) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', gaId);
  }, [gaId]);

  // Track route changes
  useEffect(() => {
    if (!gaId || !window.gtag) return;

    window.gtag('config', gaId, {
      page_path: location.pathname + location.search,
    });
  }, [location, gaId]);

  // Return tracking functions for manual events
  const trackEvent = (eventName: string, parameters: Record<string, unknown> = {}) => {
    if (gaId && window.gtag) {
      window.gtag('event', eventName, parameters);
    }
  };

  return { trackEvent, isEnabled: !!gaId };
};
