// src/components/Popup.js
import React, { useState } from 'react';
import axios from 'axios';
import './popup.css';

const Popup = ({ popupStage, setPopupStage, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      if (popupStage === 'email') {
        const response = await axios.post('/subscribe', { email });
        if (response.data === 'Subscription successful! Please check your email for the code.') {
          setMessage(response.data);
          setPopupStage('code'); // Move to code entry stage if subscription is successful
        } else {
          setError(response.data);
        }
      } else if (popupStage === 'code') {
        const response = await axios.post('/validate-code', { email, code });
        if (response.data.valid) {
          onSubmit();  // handleLoginSuccess from the parent component
        } else {
          setError('Invalid code.');
        }
      }
    } catch (err) {
      setError('An error occurred.');
    }
  };

  return (
    <div className="popup-background">
      <div className="popup">
        <div className="popup-content">
          {popupStage === 'email' && (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={handleSubmit}>Subscribe</button>
              <p onClick={() => setPopupStage('code')} className="switch-code">
                Already have a code? Enter it here.
              </p>
            </>
          )}
          {popupStage === 'code' && (
            <>
              <input
                type="text"
                placeholder="Enter code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button onClick={handleSubmit}>Submit Code</button>
              <p onClick={() => setPopupStage('email')} className="switch-email">
                Back to subscription
              </p>
            </>
          )}
          {message && <p className="message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Popup;

