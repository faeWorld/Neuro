import React, { useState, useEffect } from 'react';
//import './quizcontainer.css';
import './quizcon.css'

import Quiz from './quiz'; // Import the Quiz component

const QuizContainer = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [timer, setTimer] = useState(30); // Timer for each question
  const [loading, setLoading] = useState(true); // State to track loading

  // Number of questions to be displayed in the quiz
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
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      if (timer === 0 && currentPage < totalQuestions - 1) {
        handleNextPage();
      }

      return () => clearInterval(interval);
    }
  }, [timer, loading, currentPage]);


  useEffect(() => {
    if (currentPage >= totalQuestions) {
      handleSubmit(); 
    }
  }, [currentPage]);
// Automatically submit the quiz after the 10th question--------------------------------------------------

  const handleQuestionsFetched = (fetchedQuestions) => {
    const shuffledQuestions = shuffleArray(fetchedQuestions).slice(0, totalQuestions);
    setQuestions(shuffledQuestions);
    setLoading(false); 
    setTimer(30);
  };
// it is using the defined shufflearay funtion on the fetched questions 
//and slicing from 0 the beggining till count of total questions.
//Set loading to false once questions are fetched and timer is set to 30 for the first question and forward



  const questionsPerPage = 1; 
  const startIndex = currentPage * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = questions.slice(startIndex, endIndex);
  // Show one question at a time and able to easily navigate through next and previous questionpage.



  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer
    });
  };
  //able to handle answers once selected for to counting the score




  const handleNextPage = () => {
    if ((currentPage + 1) < totalQuestions) {
      setCurrentPage(currentPage + 1);
      setTimer(30); // Reset timer for each new question
    }
  };
  //futher definin the next page transition into a function to use ahead.

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setTimer(30); // Reset timer for each new question
    }
  };
  //futher definin the previous page transition into a function to use ahead.


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
  //this will submit the quiz and calculate the score of the quiz.

  const handleRefresh = () => {
    setQuestions([]);
    setCurrentPage(0);
    setSelectedAnswers({});
    setScore(null);
    setTimer(30);
    setLoading(true); //to show loader
    // Optionally, fetch new questions hereFor example, call a function to fetch questions again
  
  };
  //it will re-load the quiz if the user wants to do it again once clicked upon.



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
        {!loading && currentQuestions.map((q, index) => (
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

export default QuizContainer;



