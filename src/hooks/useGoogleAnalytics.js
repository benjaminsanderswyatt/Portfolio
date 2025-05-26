import { useEffect, useCallback } from 'react';

export const GA_TRACKING_ID = 'G-KNTE32LKC9';


export function useGoogleAnalytics() {
  
  const loadGAScript = useCallback(() => {
    if (window.gtag)
      return;

    // Create google analytics script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    // Initialise analytics
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID);

    return script;
  }, []);


  useEffect(() => {
    let scriptElement;

    // Load the google analytics when the document has finished loading
    if (document.readyState === 'complete') {
      scriptElement = loadGAScript();
    } else {

      const onLoad = () => {
        scriptElement = loadGAScript();
      };

      window.addEventListener('load', onLoad);

      // Cleanup
      return () => {
        window.removeEventListener('load', onLoad);

        if (scriptElement && scriptElement.parentNode) {
          scriptElement.parentNode.removeChild(scriptElement);
        }

        delete window.gtag;
        delete window.dataLayer;
      };
    }


  }, [loadGAScript]);


}
