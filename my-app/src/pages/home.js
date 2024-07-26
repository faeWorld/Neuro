import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Import CSS file for styling

const Home = () => {
  return (
    <div className="home">
      <div className='container'>
      <h1>Welcome to Neuro!</h1>
      <p>
        We are here to challenge you with your worldly knowledge. Everyone knows something, and we are sure that you would know too.
      </p>
      <p>At Neuro, we believe that no one is perfect and there's always something you don't know about!</p>
      <p>Challenge yourself today!</p>
      <Link to="/knowledge">
        <button>Let's Go</button>
      </Link>
      </div>
    </div>
  );
};

export default Home;


