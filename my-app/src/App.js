import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated import
import Navbar from './components/navbar';
import Home from './pages/home';
import KnowledgeTest from './pages/knowledge';
import CharacterTest from './pages/character';
import Games from './pages/games';
import About from './pages/about';
//import AnimatedSpaceship from './components/animatedspaceship'; 


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes> {/* Updated to use Routes */}
          <Route path="/" element={<Home />} /> {/* Updated to use element */}
          <Route path="/knowledge" element={<KnowledgeTest />} /> {/* Updated to use element */}
         
          <Route path="/character" element={<CharacterTest />} />
          <Route path="/games" element={<Games/>} />
          <Route path="/about" element={<About />} /> {/* Updated to use element */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
