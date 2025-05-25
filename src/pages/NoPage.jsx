import React from 'react';
import { useNavigate } from 'react-router';

import './no-page.css';


const NoPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Error: 404</h1>
      <p>Could not find page</p>

      <button 
        className="button"
        onClick={() => navigate("/")}
      >
        Go Home
      </button>
    </div>
  );
};


export default NoPage;
