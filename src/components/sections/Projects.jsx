import React from 'react';
import CardGroup from '../common/CardGroup';

import './projects.css';

const Projects = () => {
  const projectData = [
    {
      title: 'Lorem ipsum',
      description: 'Lorem ipsum',
      link: '/project/',
    },
    {
      title: 'Lorem ipsum',
      description: 'Lorem ipsum',
      link: '/project/',
    },
    {
      title: 'Lorem ipsum',
      description: 'Lorem ipsum',
      link: '/project/',
    },
  ];

  return (
    <>
      <img className='transition-item' alt='background element' src='/images/background/background.svg' width={1920} height={202} />
      <CardGroup cards={projectData} />
    </>
  );
};

export default Projects;
