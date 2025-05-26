import { useEffect } from 'react';

export const GA_TRACKING_ID = 'G-KNTE32LKC9';

export function useGoogleAnalytics() {
  useEffect(() => {

    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Queueing gtag until google analytics async is done
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    // Initialise google analytics
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID);

    return () => {
      // Cleanup
      document.head.removeChild(script);
      delete window.gtag;
      delete window.dataLayer;
    };
  }, []);
}
