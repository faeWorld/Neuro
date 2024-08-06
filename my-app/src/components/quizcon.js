import React, { useState, useEffect, useRef } from 'react';
import './quizcon.css'; // Ensure the correct CSS file is used

import Quiz from './quiz'; // Import the Quiz component

const QuizCon = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [timer, setTimer] = useState(30); // Timer for each question
  const [loading, setLoading] = useState(true); // State to track loading
  const [questionAnswered, setQuestionAnswered] = useState(false); // Track if a question has been answered
  const [isQuestionVisible, setIsQuestionVisible] = useState(false);

  const timerRef = useRef(null);
  const totalQuestions = 10;

  // Shuffle function
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    if (loading) return; // Skip timer setup if loading

    // Clear previous interval if it exists
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Set up new interval
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current); // Clear interval when timer hits 0
          if (!questionAnswered) {
            handleNextPage(); // Move to next question if not answered
          }
          return 30; // Reset timer for the next question
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current); // Cleanup interval on unmount
  }, [loading, currentPage, questionAnswered]); // Depend on questionAnswered to handle transitions

  useEffect(() => {
    if (currentPage >= totalQuestions) {
      handleSubmit();
    }
  }, [currentPage]);

  useEffect(() => {
    if (!loading) {
      // Start timer and make question visible when questions are fetched
      setTimer(30);
      setQuestionAnswered(false); // Reset the question answered state
      setIsQuestionVisible(true);
    }
  }, [loading, currentPage]);

  const handleQuestionsFetched = (fetchedQuestions) => {
    const shuffledQuestions = shuffleArray(fetchedQuestions).slice(0, totalQuestions);
    setQuestions(shuffledQuestions);
    setLoading(false);
  };

  const handleAnswerChange = (questionId, answer) => {
    if (selectedAnswers[questionId] === undefined) {
      // Only allow answer selection if not already answered
      setSelectedAnswers({
        ...selectedAnswers,
        [questionId]: answer
      });
      setQuestionAnswered(true); // Mark question as answered
    }
  };

  const handleNextPage = () => {
    if ((currentPage + 1) < totalQuestions) {
      setCurrentPage(currentPage + 1);
      setIsQuestionVisible(false); // Hide question before moving to the next
      setQuestionAnswered(false); // Reset the question answered state
      setTimer(30); // Reset timer for each new question
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setIsQuestionVisible(false); // Hide question before moving to the previous
      setQuestionAnswered(false); // Reset the question answered state
      setTimer(30); // Reset timer for each new question
    }
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.Id] === q.correct_answer) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setTimer(0); // Stop the timer
  };

  const handleRefresh = () => {
    setQuestions([]);
    setCurrentPage(0);
    setSelectedAnswers({});
    setScore(null);
    setTimer(30);
    setLoading(true); // to show loader
    // Optionally, fetch new questions here
  };

  const questionsPerPage = 1;
  const startIndex = currentPage * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = questions.slice(startIndex, endIndex);

  return (
    <div className="knowledge-test">
      <Quiz onQuestionsFetched={handleQuestionsFetched} /> {/* Fetch questions */}

      {/* Loader Display */}
      {loading && (
        <div className="loader"></div>
      )}

      {/* Timer Display */}
      <div className="timer-display">
        Time remaining: {timer} seconds
      </div>

      {/* Score Display Popup */}
      {score !== null && (
        <div className="score-popup">
          <div className="score-popup-content">
            <h3>Quiz Completed!</h3>
            <p>Your score is: {score} out of {totalQuestions}</p>
            <button onClick={handleRefresh}>Again</button>
          </div>
        </div>
      )}

      <div className="book-container">
        {/* Question Display */}
        {!loading && isQuestionVisible && currentQuestions.map((q, index) => (
          <div key={index} className="question-container">
            <p>{q.question}</p>
            <div className="options-container">
              {q.options.map((option, idx) => (
                <label key={idx} className="option-label">
                  <input
                    type="radio"
                    name={`question-${q.Id}`}
                    value={option}
                    checked={selectedAnswers[q.Id] === option}
                    onChange={() => handleAnswerChange(q.Id, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <div className="navigation-buttons">
          {currentPage > 0 && (
            <button className="prev-button" onClick={handlePrevPage}>
              {'<'} {/* Use Unicode character for left-pointing arrow */}
            </button>
          )}
          {currentPage < totalQuestions - 1 && (
            <button className="next-button" onClick={handleNextPage}>
              {'>'} {/* Use Unicode character for right-pointing arrow */}
            </button>
          )}
          {currentPage >= totalQuestions - 1 && (
            <button onClick={handleSubmit}>Submit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizCon;






