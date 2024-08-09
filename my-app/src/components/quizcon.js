import React, { useState } from 'react';
import './quizcon.css'; // Ensure the correct CSS file is used
import Quiz from './quiz'; // Import the Quiz component

const QuizCon = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading
  
  // Handle questions fetched from Quiz component
  const handleQuestionsFetched = (fetchedQuestions) => {
   // console.log('Received questions:', fetchedQuestions);
   // setQuestions(fetchedQuestions); // Set all fetched questions
   console.log('Hello');
   // setCurrentPage(0); // Reset to first question
   // setLoading(false); // Hide loader
  };

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer
    }));
  };

  const handleNextQuestion = () => {
    // Check if an answer has been selected for the current question
    const currentQuestion = questions[currentPage];
    if (currentQuestion && selectedAnswers[currentQuestion.Id] === undefined) {
      alert('Select an answer');
      return;
    } else if (currentPage < questions.length - 1) {
      setCurrentPage(prevPage => prevPage + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    let newScore = 0;
    let answeredQuestions = 0;
  
    questions.forEach(q => {
      if (selectedAnswers[q.Id] !== undefined) {
        answeredQuestions++; // Count the question as answered
        if (selectedAnswers[q.Id] === q.correct_answer) {
          newScore += 1; // Increment score if the answer is correct
        }
      }
    });
  
    setScore(newScore);
  
    console.log(`You answered ${answeredQuestions} out of ${questions.length} questions.`);
  };

  const handleRefresh = () => {
    setQuestions([]);
    setCurrentPage(0);
    setSelectedAnswers({});
    setScore(null);
    setLoading(true); // to show loader
  };

  const currentQuestion = questions[currentPage];

  return (
    <div className="knowledge-test">
      
      {/* Loader Display */}
      {loading && (
        <div className="loader"> </div>
      )}

      {/* Render Quiz component and pass handleQuestionsFetched */}
      <Quiz onQuestionsFetched={handleQuestionsFetched} />

      {score !== null && (
        <div className="score-popup">
          <div className="score-popup-content">
            <h3>Quiz Completed!</h3>
            <p>You answered {Object.keys(selectedAnswers).length}</p>
            <p>Your score is: {score} out of {Object.keys(selectedAnswers).length}</p>
            <button onClick={handleRefresh}>Try Again</button>
          </div>
        </div>
      )}

      {/* Question Display */}
      {!loading && currentQuestion && (
        <div className="book-container">
          <div className="question-container">
            <p>{currentQuestion.question}</p>
            <div className="options-container">
              {Object.values(currentQuestion.options).map((option, idx) => (
                <label key={idx} className="option-label">
                  <input
                    type="radio"
                    id={`question-${currentQuestion.Id}-option-${idx}`} // Add unique id
                    name={`question-${currentQuestion.Id}`} // Add unique name
                    value={option}
                    checked={selectedAnswers[currentQuestion.Id] === option}
                    onChange={() => handleAnswerChange(currentQuestion.Id, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="navigation-buttons">
            <button
              className="next-button"
              onClick={handleNextQuestion}
              disabled={selectedAnswers[currentQuestion.Id] === undefined}
            >
              {currentPage < questions.length - 1 ? 'Next Question' : 'Submit'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizCon;


