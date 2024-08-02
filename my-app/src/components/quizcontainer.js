import React, { useState } from 'react';
import './quizcontainer.css';
import Quiz from './quiz'; // Import the Quiz component

const QuizContainer = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleQuestionsFetched = (fetchedQuestions) => {
    setQuestions(fetchedQuestions);
  };

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

  const handleSubmit = async () => {
    let newScore = 0;
    questions.forEach(q => {
      if (selectedAnswers[q._id] === q.correctAnswer) {
        newScore += 1;
      }
    });
    setScore(newScore);

    // Handle score submission here
    // e.g., send score to server or display results
  };

  return (
    <div className="knowledge-test">
      <Quiz onQuestionsFetched={handleQuestionsFetched} /> {/* Fetch questions */}
      <div className="book-container">
        <div className="container">
          {currentQuestions.map((q, index) => (
            <div key={index} className="question-container">
              <p>{q.question}</p>
              {q.answers.map((option, idx) => (
                <label key={idx}>
                  <input
                    type="radio"
                    name={`question-${q._id}`}
                    value={option}
                    checked={selectedAnswers[q._id] === option}
                    onChange={() => handleAnswerChange(q._id, option)}
                    disabled={selectedAnswers[q._id] !== undefined}
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
      {score !== null && <div className="score-display">Your score is {score}</div>}
    </div>
  );
};

export default QuizContainer;
