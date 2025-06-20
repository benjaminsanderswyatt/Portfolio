import React from 'react';
import { motion } from 'framer-motion';
import CardGroup from '../common/CardGroup';

import './skills.css';


// Programming languages
const languageSkills = [
  { name: 'C#', level: 95, file: 'csharp-original.svg' },
  { name: 'Python', level: 85, file: 'python-original.svg' },
  { name: 'JavaScript', level: 80, file: 'javascript-original.svg' },
  { name: 'C++', level: 80, file: 'cplusplus-original.svg' },
  { name: 'Java', level: 70, file: 'java-original.svg' },
  { name: 'C', level: 65, file: 'c-original.svg' },
];

// Frameworks & Libraries
const frameLib = [
  'React', 'Node.js', 'Express', 'ASP.NET Core', 'Razor Pages', 'Unity'
];

// DevOps & Tools
const devTool = [
  'Git / GitHub', 'GitHub Actions',
  'Docker', 'NGINX',
  'Postman', 'JWT / 2FA',
  'REST APIs', 'WebSockets',
  'MongoDB', 'SQL',
  'OpenMP / SIMD / CUDA',
  'Android Studio',
  'Figma'
];

// Create div list from array of skills
const generateSkillsContent = (skills) => (
  <ul className="skills-list">
    {skills.map((skill, i) => (
      <li key={i}>{skill}</li>
    ))}
  </ul>
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
