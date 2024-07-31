import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Popup from './components/popup';
import Home from './pages/home';
import KnowledgeTest from './pages/knowledge';
import About from './pages/about';

// Create UserContext
const UserContext = createContext();

// Create a custom hook for accessing UserContext
export const useUser = () => useContext(UserContext);

const App = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [popupStage, setPopupStage] = useState('email');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null); // Track user email
  const [error, setError] = useState('');
 
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowPopup(false);
  };

  const handlePopupSubmit = async (email, code) => {
    try {
      if (popupStage === 'email') {
        // Send email to the server for subscription
        const response = await axios.post('/subscribe', { email }); if (response.data === 'Subscription successful! Please check your email for the code.') {
         
          setPopupStage('code'); // Move to code entry stage if subscription is successful
          setUserEmail(email); // Save the email to use it for code validation
        }  
        
      }  else {
        const response = await fetch('/validate-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, code }),
        });
        const result = await response.json();
        if (result.valid) {
          handleLoginSuccess();
        } else {
          setError('Invalid code.');
        }
      }
    } catch (error) {
      setError('An error occurred.');
    }
  };

  useEffect(() => {
    // Always show popup on initial load
    setShowPopup(true);
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ userEmail, isLoggedIn }}>
        <div className="App">
          <Navbar />
          {showPopup && (
            <Popup
              popupStage={popupStage}
              onSubmit={handlePopupSubmit}
              setPopupStage={setPopupStage}
              
          
            />
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/knowledge" element={isLoggedIn ? <KnowledgeTest /> : <Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </Router>
  );
};



export default App;

