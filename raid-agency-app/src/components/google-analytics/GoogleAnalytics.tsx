// components/GoogleAnalytics.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GoogleAnalytics = () => {
  const location = useLocation();
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  
  // Check if we're in production based on URL
  const isProduction = window.location.hostname.includes('prod');

  // Initialize GA only in production
  useEffect(() => {
    if (!gaId || !isProduction) return;

    // Load GA script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', gaId);
  }, [gaId, isProduction]);

  // Track route changes
  useEffect(() => {
    if (gaId && isProduction && window.gtag) {
      window.gtag('config', gaId, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location, gaId, isProduction]);

  // This component doesn't render anything
  return null;
};

export default GoogleAnalytics;
