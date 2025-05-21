import React from 'react';
import { useNavigate } from 'react-router';


const Home = () => {
  const navigate = useNavigate();

  const goToProjects = () => {
    navigate('/project');
  };


  return (
    <div>
      <h1>Portfolio</h1>
      <button onClick={goToProjects}>View Projects</button>
    </div>
  );
};

export default Home;
