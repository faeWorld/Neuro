import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../App'; // Import the custom hook to access user context
import './knowledge.css'; // Import CSS file for styling

const KnowledgeTest = () => {
  const { userEmail } = useUser(); // Access user email from context
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [error, setError] = useState(''); // Error state for better user feedback

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/questions');
        setQuestions(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching questions.');
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  

  
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

    if (userEmail) {
      try {
        // Submit the score to the backend using axios
        await axios.post('/submit-test', {
          email: userEmail,
          score: newScore
        });
        alert('Test submitted successfully!');
      } catch (error) {
        console.error('Error submitting test:', error);
        alert('Failed to submit test. Please try again.');
      }
    }
  };

  return (
    <div className="knowledge-test">
      <div className="book-container">
        <div className="container">
          {error && <p className="error-message">{error}</p>} {/* Display error if any */}
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

export default KnowledgeTest;



