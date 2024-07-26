import React, { useState, useEffect } from 'react';
import './knowledge.css';

const KnowledgeTest = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    // Fetch questions from the API
    fetch('/api/questions')
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.error('Error fetching questions:', err));
  }, []);

  const questionsPerPage = 10;
  const startIndex = currentPage * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = questions.slice(startIndex, endIndex);

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer
    });
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * questionsPerPage < questions.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmit = () => {
    // Submit answers to the server or process them
    console.log('Selected Answers:', selectedAnswers);
  };

  return (
    <div className="knowledge-test">
      <div className="book-container">
        {currentQuestions.map((q, index) => (
          <div key={index} className="question-container">
            <p>{q.question}</p>
            {q.options.map((option, idx) => (
              <label key={idx}>
                <input
                  type="radio"
                  name={q.question}
                  value={option}
                  checked={selectedAnswers[q.question] === option}
                  onChange={() => handleAnswerChange(q.question, option)}
                  disabled={selectedAnswers[q.question] !== undefined}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
      </div>
      <div className="navigation-buttons">
        {currentPage > 0 && <button onClick={handlePrevPage}>Previous</button>}
        {endIndex < questions.length && <button onClick={handleNextPage}>Next</button>}
        {endIndex >= questions.length && <button onClick={handleSubmit}>Submit</button>}
      </div>
    </div>
  );
};

export default KnowledgeTest;

