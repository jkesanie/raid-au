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
  let gaId: string | undefined;
  
  // Check if we're in production based on URL
  const isProduction = window.location.hostname.includes('prod');
  const isDemo = window.location.hostname.includes('demo');
  if (isProduction) {
    gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  } else if (isDemo) {
    gaId = import.meta.env.VITE_GA_MEASUREMENT_ID_DEMO;
  } else {
    gaId = ""; // No GA in non-prod/non-demo
  }

  // Initialize GA only in production
  useEffect(() => {
    if (!gaId || (!isProduction && !isDemo)) return;

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
  }, [gaId, isProduction, isDemo]);

  // Track route changes
  useEffect(() => {
    if (gaId && (isProduction || isDemo) && window.gtag) {
      window.gtag('config', gaId, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location, gaId, isProduction, isDemo]);

  // This component doesn't render anything
  return null;
};

export default GoogleAnalytics;
