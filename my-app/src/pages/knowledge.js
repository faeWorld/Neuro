import React from 'react';
import QuizContainer from '../components/quizcontainer'; // Adjust the import path as needed
import './knowledge.css'; // Import CSS file for styling

const KnowledgeTest = () => {
  return (
    <div className="knowledge">
      <h1>Quiz bit</h1>
      <div className="container"></div>
 
      <QuizContainer /> {/* Display the QuizContainer component */}
   
    </div>
  );
};

export default KnowledgeTest;





