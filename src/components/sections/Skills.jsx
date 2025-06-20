import React from 'react';
import { motion } from 'framer-motion';
import CardGroup from '../common/CardGroup';

import Tippy from '@tippyjs/react';
import 'tippy.js/animations/perspective.css';
import '../../styles/common/tooltip.css';

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
  { name: 'React', tooltip: 'Developed dynamic applications with React, including reusable components and hooks for state management.' },
  { name: 'Node.js', tooltip: 'Built RESTful APIs and backend services using Node.js, optimising performance and scalability.' },
  { name: 'Express', tooltip: 'Created server-side routing and middleware for web applications, handling authentication and data validation.' },
  { name: 'ASP.NET Core', tooltip: 'Developed enterprise-grade web applications with ASP.NET Core, implementing MVC patterns and secure APIs.' },
  { name: 'Razor Pages', tooltip: 'Designed clean, server-rendered UI pages with Razor Pages for seamless web user experiences.' },
  { name: 'Unity', tooltip: 'Built interactive 3D and 2D simulations and games, using C# scripting and Unity’s physics engine.' },
];

// DevOps & Tools
const devTool = [
  { name: 'Git / GitHub', tooltip: 'Managed source code with Git, utilising branching, pull requests, and code reviews in GitHub.' },
  { name: 'GitHub Actions', tooltip: 'Automated CI/CD pipelines with GitHub Actions to streamline testing and deployment workflows.' },
  { name: 'Docker', tooltip: 'Containerised applications to ensure consistent development, testing, and production environments.' },
  { name: 'NGINX', tooltip: 'Configured NGINX as a reverse proxy and load balancer to enhance application performance.' },
  { name: 'Postman', tooltip: 'Tested and documented APIs using Postman to ensure reliability and integration.' },
  { name: 'JWT / 2FA', tooltip: 'Implemented JWT-based authentication and two-factor authentication for secure user access.' },
  { name: 'REST APIs', tooltip: 'Designed and consumed RESTful APIs adhering to best practices and versioning strategies.' },
  { name: 'WebSockets', tooltip: 'Built real-time communication features using WebSockets for instant updates.' },
  { name: 'MongoDB', tooltip: 'Modeled and queried NoSQL databases with MongoDB to support flexible data structures.' },
  { name: 'SQL', tooltip: 'Wrote optimised SQL queries and designed relational database schemas for efficient data access.' },
  { name: 'OpenMP / SIMD / CUDA', tooltip: 'Accelerated computations using parallel programming techniques and GPU processing.' },
  { name: 'Android Studio', tooltip: 'Developed native Android applications with Android Studio, focusing on UI/UX and performance.' },
  { name: 'Figma', tooltip: 'Collaborated on UI/UX design projects using Figma to prototype and iterate designs.' },
];



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
            interactive={true}
            theme="custom"
            inertia={true}
            arrow={false}
          >
            <span className="tooltip-target">{name}</span>
          </Tippy>

        </li>
      ))}
    </ul>

     <div className="hover-visual-cue" aria-label="Hover items for details">

      <div className="hover-icon" >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="arrow"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 8L6 14H18L12 8Z" fill="currentColor" />
        </svg>
      </div>
      
    </div>
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
