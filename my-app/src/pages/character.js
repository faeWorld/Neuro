import React, { useState } from 'react';
//import './character.css';
import './charact.css';

const characters = {
  Peela: { power: 'Water Bending', personality: 'Curious and adventurous' },
  Neela: { power: 'Super Speed', personality: 'Brave and determined' },
  Surkhh: { power: 'Fire Bending', personality: 'Wise and thoughtful' },
  Sabzz: { power: 'Healing', personality: 'Kind and nurturing' },
  Siyah: { power: 'Shadow attack and Invisibility', personality: 'Mysterious and sensitive' },
  Saafed: { power: 'Light attack and Invisibility', personality: 'Optimistic and cheerful' },
};

const questions = [
  {
    question: "When faced with a challenge, what is your usual response?",
    answers: {
      a: "Analyze the situation thoroughly and plan accordingly.",
      b: "Act quickly and take decisive action.",
      c: "Seek help from others and work together.",
      d: "Look for an innovative solution or think outside the box."
    }
  },
  {
    question: "How do you spend your free time?",
    answers: {
      a: "Reading and exploring new knowledge.",
      b: "Engaging in physical activities or sports.",
      c: "Helping others or volunteering.",
      d: "Reflecting on personal thoughts and feelings."
    }
  },
  {
    question: "What is your biggest strength?",
    answers: {
      a: "Curiosity and a thirst for adventure.",
      b: "Determination and bravery.",
      c: "Wisdom and thoughtfulness.",
      d: "Kindness and nurturing nature."
    }
  },
  {
    question: "How do you handle stress?",
    answers: {
      a: "Stay calm and think things through.",
      b: "Confront the issue head-on.",
      c: "Rely on your inner strength and resilience.",
      d: "Focus on maintaining a positive outlook."
    }
  },
  {
    question: "Which environment do you feel most comfortable in?",
    answers: {
      a: "By the water, like a beach or lake.",
      b: "In a fast-paced, energetic setting.",
      c: "In a quiet, reflective space.",
      d: "In nature, surrounded by plants and animals."
    }
  }
];

const CharacterTest = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleChange = (answer) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentQuestionIndex]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const characterCount = {
      Peela: 0,
      Neela: 0,
      Surkhh: 0,
      Sabzz: 0,
      Siyah: 0,
      Saafed: 0,
    };

    // Calculate the result
    Object.keys(answers).forEach(questionIndex => {
      const answer = answers[questionIndex];
      if (answer === 'a') {
        characterCount.Peela++;
      } else if (answer === 'b') {
        characterCount.Neela++;
      } else if (answer === 'c') {
        characterCount.Surkhh++;
      } else if (answer === 'd') {
        characterCount.Sabzz++;
      }
    });

    // Determine the character with the highest count
    const character = Object.keys(characterCount).reduce((a, b) => characterCount[a] > characterCount[b] ? a : b);

    setResult(character);
    setShowResult(true);
  };

  return (
    <div className="character-test-container">
      <h1>Which Character are you?</h1>

      {!showResult ? (
        <div className="question-container">
          <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
            <div className="question">
              <p>{questions[currentQuestionIndex].question}</p>
              {Object.keys(questions[currentQuestionIndex].answers).map(answerKey => (
                <label key={answerKey}>
                  <input
                    type="radio"
                    name={`question${currentQuestionIndex}`}
                    value={answerKey}
                    onChange={() => handleChange(answerKey)}
                    required
                  />
                  {questions[currentQuestionIndex].answers[answerKey]}
                </label>
              ))}
            </div>

            <div className="navigation-buttons">
              {currentQuestionIndex > 0 && <button type="button" onClick={handlePrevious}>Previous</button>}
              <button type="button" onClick={handleNext}>
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Find Out!'}
              </button>
            </div>

            
          </form>
        </div>
      ) : (
        <div className="character-result">
          <h2>You are matched with: {result}</h2>
          <p>Power: {characters[result].power}</p>
          <p>Personality: {characters[result].personality}</p>
          <p>Code: {result}-12345</p> {/* Example code */}
        </div>
      )}
    </div>
  );
};

export default CharacterTest;
