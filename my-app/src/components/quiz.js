import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quiz = ({ onQuestionsFetched }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/questions');
        const questions = response.data;
        
        // Shuffle questions immediately without delay
        const shuffledQuestions = shuffleArray(questions);
        if (onQuestionsFetched) {
          console.log('Calling onQuestionsFetched callback with:', shuffledQuestions);
          onQuestionsFetched(shuffledQuestions);
        }
        setLoading(false);
      } catch (err) {
        setError('Error fetching questions.');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [onQuestionsFetched],[]);

  // Shuffle function
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Render loading and error states
  if (loading) {
    return <div className="loader"> </div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return null; // No rendering for the Quiz component itself
};

export default Quiz;

