import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import Popup from '../components/popup'; // Import the Popup component
import axios from 'axios'; // Import axios for making API requests
import './home.css'; // Import CSS file for styling



const Home = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);
  const [popupStage, setPopupStage] = useState('email'); // Manage popup stage (email/code)
  const [error, setError] = useState(''); // Manage error messages

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

  const handleSubscribe = async (email, code) => {
    try {
      if (popupStage === 'email') {
        const response = await axios.post('/subscribe', { email });
        if (response.data === 'Subscription successful! Please check your email for the code.') {
          setPopupStage('code'); // Move to code entry stage if subscription is successful
        } else {
          setError(response.data);
        }
      } else if (popupStage === 'code') {
        const response = await axios.post('/validate-code', { email, code });
        if (response.data.valid) {
          handleLoginSuccess();
        } else {
          setError('Invalid code.');
        }
      }
    } catch (err) {
      setError('An error occurred.');
    }
  };
  const handleButtonClick = () => {
    navigate('/knowledge');
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
        <button onClick={handleButtonClick}>Let's Go</button>
      </div>
      {showPopup && (
        <Popup 
          popupStage={popupStage}
          onSubmit={handleSubscribe}
          setPopupStage={setPopupStage}
          error={error} // Pass error state to Popup
        />
      )}
    </div>
  );
};

export default Home;