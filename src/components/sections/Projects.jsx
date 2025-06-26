import React from 'react';
import { Link } from 'react-router';

import CardGroup from '../common/CardGroup';
import CardLabel from '../common/CardLabel';
import { motion } from 'framer-motion';
import HoverArrow from '../common/HoverArrow';

import './projects.css';

import { projectData } from '../../data/project';


const projectCards = projectData.map((proj, index) => ({
  content: (
    <article 
      className='project-item'
      style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}
      aria-label={`Project: ${proj.title}`}
    >

      <div className='project-image-wrapper'>
        
        <img 
          src={proj.image} 
          alt={`${proj.title} project screenshot`} 
          className="project-image" 
          loading="lazy"
        />

      </div>


      <div className="project-card-body">
        <h3 className='card-title'>{proj.title}</h3>

        <p className="project-description">{proj.description}</p>

        <div className="project-tags">
          {proj.tech.map((tag, i) => (
            <CardLabel key={i}>{tag}</CardLabel>
          ))}
        </div>

        <div className="project-links">
          {proj.links?.map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noreferrer" className='tooltip-target'>
              {link.name}
            </a>
          ))}
        </div>
      </div>



    </article>
  ),
}));




const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-holder">
        <h2 className="section-title">Projects</h2>

        <CardGroup cards={projectCards} stagger={0.3} amount={0.01} flexDirection='column'/>

        <motion.div
          className="view-all-projects"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 60, damping: 14 }}
          viewport={{ once: true, amount: 0.9 }}
        >

          <Link to="/project" className="view-all-link-wrapper">

            <span>View All Projects</span>
            <HoverArrow />

          </Link>


        </motion.div>

      </div>
    </section>
  );
};

export default Projects;
