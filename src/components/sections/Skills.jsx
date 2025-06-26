import React from 'react';
import { motion } from 'framer-motion';
import CardGroup from '../common/CardGroup';
import HoverArrow from '../common/HoverArrow';

import Tippy from '@tippyjs/react';
import 'tippy.js/animations/perspective.css';
import '../../styles/common/tooltip.css';


import './skills.css';

import { languageSkills, frameLib, devTool } from '../../data/skills';



// Create div list from array of skills
const generateSkillsContent = (skills) => (
  <>
    <ul className="skills-list">
      {skills.map(({ name, tooltip }, i) => (
        <li key={i}>
          <Tippy
            content={tooltip}
            animation="perspective"
            delay={[100, 200]}
            duration={300}
            placement="top"
            interactive={false}
            theme="custom"
            inertia={true}
            arrow={false}
          >
            <span className="tooltip-target">{name}</span>
          </Tippy>

        </li>
      ))}
    </ul>

    <HoverArrow />
  </>
);

// Create cards
const skillsCards = [
  { title: 'Frameworks & Libraries', content: generateSkillsContent(frameLib) },
  { title: 'DevOps & Tools', content: generateSkillsContent(devTool) },
];




const Skills = () => {
  
  return (
    <section id="skills" className="skills-section">
      <div className="skills-holder">
        <h2 className="section-title">Skills</h2>

        {/* Skills bar of Languages */}
        <div className="skill-bar-wrapper">

          {languageSkills.map((skill, i) => (
            <motion.div
              className="skill-item"
              key={i}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 12 }}
            >
              <img
                src={`/images/icons/languages/${skill.file}`}
                alt={`${skill.name} logo`}
                className="skill-icon"
              />

              <div className="skill-text">
                <div className="skill-bar-label">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="skill-bar-bg">
                  <motion.div
                    className="skill-bar-fill"
                    initial={{ width: '5%' }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: i * 0.15 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>



        {/* Cards */}
        <CardGroup cards={skillsCards} stagger={0.4} amount={0.02} />
      </div>
    </section>
  );
};

export default Skills;
