import React from 'react';
import { motion } from 'framer-motion';
import CardGroup from "../common/CardGroup";
import CardLabel from "../common/CardLabel";

import './about.css';

import { education } from '../../data/about';



const About = () => {

  const educationContent = (
    <div className="education-item">
      <div className="education-header">

        <span className="degree">{education.degree}</span>
        <CardLabel>{education.date}</CardLabel>

      </div>
      <div className="university">{education.university}</div>
      <ul className="achievements">
        {education.achievements.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );





  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };






  return (
    <section id="about" className="section about-section">
      <div className="about-container">
        <motion.div
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >

          <motion.div
            className="profile-image-container"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="profile-frame">
              <img
                src="/images/profile-600.webp"
                width="600"
                height="600"
                alt="Ben Sanders-Wyatt"
                className="profile-image"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>


          <motion.div 
            className="about-text" 
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            
            <h2 className="section-title">About Me</h2>
            <p className="intro">
              Hi, I'm <strong>Ben Sanders-Wyatt</strong>, a
              <span className='highlight'> first-class Computer Science graduate </span>
              from the University of Plymouth with hands-on experience in full-stack development and DevOps.  
            </p>
            <p>
              I build scalable applications using React, Node.js, and C#, and work with containerization tools like Docker to streamline deployment and automate workflows.  
            </p>
            <p>
              My projects include real-time web apps, cloud storage, and distributed systems, demonstrating a strong focus on writing maintainable code and designing robust infrastructure.  
            </p>
            <p>
              With strong communication and leadership skills developed through mentoring peers, I'm eager to contribute to innovative software and DevOps teams.
            </p>

          </motion.div>

        </motion.div>



        <CardGroup
          amount={0.02}
          stagger={0.4}
          cards={[{ title: "Education", content: educationContent }]}
        />

      </div>
    </section>
  );
};

export default About;
