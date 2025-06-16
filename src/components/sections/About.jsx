import React from 'react';
import { motion } from 'framer-motion';
import './about.css';


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


const educationVariants = {
  hidden: { x: '-100%', opacity: 1 },
  visible: { 
    x: 0, 
    opacity: 1, 
    transition: { duration: 1.1, ease: 'easeOut' } }
};



const About = () => {
  return (
    <section id="about" className="section about-section">
      <div className="about-container">
        <motion.div
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >

          <motion.div
            className="profile-image-container"
            variants={imageVariants}
          >
            <div className="profile-frame">
              <img
                src="/images/profile.jpg"
                alt="Ben Sanders-Wyatt"
                className="profile-image"
              />
            </div>
          </motion.div>


          <motion.div className="about-text" variants={textVariants}>
            
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
              My projects include real-time web apps, cloud storage, and distributed systems, reflecting a strong focus on writing maintainable code and designing robust infrastructure.  
            </p>
            <p>
              With leadership experience mentoring peers as a PALS Leader, I’m eager to contribute to innovative software and DevOps teams.
            </p>

          </motion.div>

        </motion.div>



        <div className="card-section">

          <motion.div
            className="education-content"
            variants={educationVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.02 }}
          >

            <h3 className="education-title">Education</h3>

            <div className="education-item">

              <div className="education-header">
                <span className="degree">BSc (Hons) Computer Science</span>
                <span className="date">2022 - 2025</span>
              </div>

              <div className="university">University of Plymouth</div>
              
              <ul className="achievements">
                <li>First-Class Honours</li>
                <li>Final Year Modules: Computing Project, Full-Stack Development, Big Data Analytics, HCI</li>
                <li>Second Year: Software Engineering 2, Game Dev, AI, Info Retrieval</li>
                <li>First Year: Systems, Security, Algorithms, Software Engineering</li>
              </ul>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default About;
