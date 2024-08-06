import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import SubscriptionManager from './components/subscriptionmanager';
import Home from './pages/home';
import KnowledgeTest from './pages/knowledge';
import About from './pages/about';

// Create UserContext
const UserContext = createContext();

// Create a custom hook for accessing UserContext
export const useUserContext = () => useContext(UserContext);

const App = () => {
  const [showSubscriptionManager, setShowSubscriptionManager] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
 
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowSubscriptionManager(false);
  };

 

  useEffect(() => {
    // Always show popup on initial load
    setShowSubscriptionManager(true);
  }, []);

  return (
    <Router>
      
      <UserContext.Provider value={{ userEmail, isLoggedIn }}>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/knowledge"  element={<KnowledgeTest />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </Router>
  );
};



export default App;

/*Renders SubscriptionManager on the initial load, ensuring the email subscription and code validation are always prompted first

isLoggedIn ? <KnowledgeTest />: If isLoggedIn is true, then the <KnowledgeTest />
 component is rendered. This means that the user will see the KnowledgeTest page
  if they are logged in.

: <Home />: If isLoggedIn is false, then the <Home />
 component is rendered instead. This means that if the user is not logged in,
  they will be redirected to the Home page.

O
*/

