import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from '../components/popup'; // Import the Popup component
import './home.css'; // Import CSS file for styling

const Home = () => {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const checkLoginStatus = () => {
      // Check login status and expiry
      const sessionData = JSON.parse(localStorage.getItem('sessionData'));
      if (sessionData && new Date() < new Date(sessionData.expiry)) {
        setShowPopup(false);
      } else {
        setShowPopup(true);
      }
    };

    checkLoginStatus();

    // Check login status every minute
    const interval = setInterval(checkLoginStatus, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleLoginSuccess = () => {
    setShowPopup(false);
    // Save session data with expiry
    localStorage.setItem('sessionData', JSON.stringify({
      loggedIn: true,
      expiry: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString() // 1 hour from now
    }));
  };

  return (
    <div className="home">
      <div className="container">
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
      {showPopup && (
        <Popup 
          onSubscribe={() => setShowPopup(false)} 
          onEnterCode={handleLoginSuccess} 
        />
      )}
    </div>
  );
};

export default Home;


