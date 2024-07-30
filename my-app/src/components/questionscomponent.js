
import React, { useEffect, useState } from 'react';

import { fetchQuestions } from '../services/apiservice';

const QuestionsComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getQuestions() {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getQuestions();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Questions</h1>
      {questions.map((question) => (
        <div key={question._id}>
          <p>{question.question}</p>
          <ul>
            {question.options.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuestionsComponent;
