import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Popup from './components/popup';
import Home from './pages/home';
import KnowledgeTest from './pages/knowledge';
import About from './pages/about';


const App = () => {
  const [showPopup, setShowPopup] = useState(true);

  const handleSubscribe = () => {
    setShowPopup(false);
  };

  const handleEnterCode = () => {
    setShowPopup(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        {showPopup && <Popup onSubscribe={handleSubscribe} onEnterCode={handleEnterCode} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/knowledge" element={<KnowledgeTest />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
