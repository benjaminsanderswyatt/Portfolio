export const GA_TRACKING_ID = 'G-KNTE32LKC9';

export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};
