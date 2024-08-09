import React from 'react';
import QuizCon from '../components/quizcon'; // Adjust the import path as needed
import './knowledge.css'; // Import CSS file for styling

const KnowledgeTest = () => {
  return (
    <div className="knowledge">
      <h1>Quiz bit</h1>
      
      <QuizCon /> {/* Display the QuizContainer component */}
    </div>
  );
};

export default KnowledgeTest;





