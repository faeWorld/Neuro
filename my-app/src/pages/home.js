import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import CodeValidationComponent from '../components/codevalidation';
import SubscriptionManager from '../components/subscriptionmanager';

import './home.css'; // Import CSS file for styling

const Home = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [popupStage, setPopupStage] = useState('email');
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

  const handleButtonClick = () => {
    navigate('/knowledge');
  };
  const handleGoBack = () => {
    setPopupStage('email');
    setUserEmail('');
  };

  

  

  return (
    <div className="home">
      {showPopup && popupStage === 'code' && (
        <CodeValidationComponent
          email={userEmail} 
          onCodeValidationSuccess={handleLoginSuccess} 
          onGoBack={handleGoBack} 
        />
      )}
      {showPopup && popupStage === 'email' && (
        <div className="subscription-popup">
          <div className="subscription-popup-content">
            <SubscriptionManager onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
      
      <div className="container">
        <h1>Welcome to Neuro!</h1>
        <p>
          We are here to challenge you with your worldly knowledge. Everyone knows something, and we are sure that you would know too.
        </p>
        <p>At Neuro, we believe that no one is perfect and there's always something you don't know about!</p>
        <p>Challenge yourself today!</p>
        <button onClick={handleButtonClick}>Let's Go</button>
        {error && <p className="error-message">{error}</p>}
        </div>
    </div>
  );
};

export default Home;

/*    {showPopup && (
        <div className="subscription-popup">
          <div className="subscription-popup-content">
            <SubscriptionManager onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )} */