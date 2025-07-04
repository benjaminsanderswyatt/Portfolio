import React, { Suspense, lazy, memo } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

import './no-page.css';

const LazyStarrySky = lazy(() => import('../components/starrySky/StarrySky'));

const NoPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Suspense fallback={null}>
        <LazyStarrySky />
      </Suspense>

      <div className="no-page-container">
        <div className="no-page-content">

          <motion.div 
            className="error-number"
            aria-label="404 Error"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            404
          </motion.div>
          

          <motion.h1
            className="no-page-title" 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Lost in Space?
          </motion.h1>
          

          <motion.p
            className="no-page-message"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            The page you're looking for doesn't exist.
          </motion.p>
          

          <motion.button 
            className="no-page-button"
            aria-label="Return to home page"
            onClick={() => navigate("/")}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Return to Earth
          </motion.button>

        </div>
      </div>
    </>
  );
};

export default memo(NoPage);