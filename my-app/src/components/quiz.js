import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './quiz.css'; // Import CSS file for styling

const Quiz = ({ onQuestionsFetched }) => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/questions');
        setQuestions(response.data);
        setLoading(false);
        if (onQuestionsFetched) {
          onQuestionsFetched(response.data); // Pass questions to parent component
        }
      } catch (err) {
        setError('Error fetching questions.');
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [onQuestionsFetched]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return null; // No rendering needed here, just fetching data
};

export default Quiz;
// fetch questions and display them is its job!
