import React, { useState } from 'react';
import { motion } from 'framer-motion';

import Tippy from '@tippyjs/react';
import 'tippy.js/animations/perspective.css';
import './contact.css';

import { SOCIAL_LINKS, EMAIL } from '../../data/socials';

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL.email);
    setCopied(true);
  };

  const resetCopyState = () => {
    setCopied(false);
  };


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };



  return (
    <section id="contact" className="section contact-section">
      <div className="contact-container">
        <motion.div
          className="contact-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >

          <motion.h2 className="section-title" variants={itemVariants}>
            Get In Touch
          </motion.h2>


          <motion.p className="contact-intro" variants={itemVariants}>
            Feel free to reach out for or just say hello!
          </motion.p>


          <motion.div className="contact-details" variants={itemVariants}>
            <div className="contact-item">
              <div className="contact-icon">
                <img
                  src={EMAIL.iconFile}
                  alt="Email"
                  width={EMAIL.width}
                  height={EMAIL.height}
                  className="mail-svg"
                />
              </div>

              <Tippy
                content={copied ? 'Copied!' : 'Click to copy'}
                animation="perspective"
                delay={[100, 200]}
                duration={300}
                placement="bottom"
                interactive={false}
                theme="custom"
                inertia
                arrow={false}
                hideOnClick={false}
                trigger="mouseenter focus"
                onShow={resetCopyState}
              >
                <button
                  type="button"
                  className="contact-link"
                  onClick={handleCopyEmail}
                  aria-label="Copy email to clipboard"
                >
                  {EMAIL.email}
                </button>
              </Tippy>
            </div>
          </motion.div>


          <motion.div className="social-links" variants={itemVariants}>
            {SOCIAL_LINKS.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="social-icon"
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <img
                  src={social.iconFile}
                  alt={social.name}
                  width={social.width}
                  height={social.height}
                  className="social-img"
                />
              </motion.a>
            ))}
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
