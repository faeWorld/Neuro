import React, { useState } from 'react';
import './popup.css';

const Popup = ({ show, onSubscribe, onEnterCode }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubscribe = async () => {
    try {
      const response = await fetch('/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const result = await response.text();
      if (result.includes('already registered')) {
        setError(result);
      } else {
        onSubscribe();
      }
    } catch (error) {
      setError('Subscription failed');
    }
  };

  const handleEnterCode = async () => {
    try {
      const response = await fetch('/validate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      const result = await response.json();
      if (result.valid) {
        onEnterCode();
      } else {
        setError('Invalid code');
      }
    } catch (error) {
      setError('Code validation failed');
    }
  };

  if (!show) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button onClick={handleSubscribe}>Subscribe</button>
        <button onClick={handleEnterCode}>Submit Code</button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Popup;
