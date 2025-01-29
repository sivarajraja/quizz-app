import React, { useState, useEffect } from 'react';

const QuizzQuestions = ({ question, questionNumber, onNext, reset }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); // Set initial time to 10 seconds
  const [timeEnded, setTimeEnded] = useState(false); // Track if time has ended

  useEffect(() => {
    // Reset the state when a new question is loaded
    setSelectedOption(null);
    setIsAnswered(false);
    setTimeLeft(10); // Reset timer to 10 seconds
    setTimeEnded(false); // Reset time ended state
  }, [reset]);

  useEffect(() => {
    if (!isAnswered && timeLeft > 0) {
      const timerId = setInterval(() => setTimeLeft(prevTime => prevTime - 1), 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0 && !timeEnded) {
      setTimeEnded(true);
      setIsAnswered(true); // Mark as answered to disable options
    }
  }, [timeLeft, isAnswered, timeEnded]);

  const handleOptionClick = (option) => {
    if (!isAnswered) {
      setSelectedOption(option);
      setIsAnswered(true);
    }
  };

  const getOptionClass = (option) => {
    if (!isAnswered) {
      return 'bg-white';
    }
    if (option === question.correctOption) {
      return 'bg-green-500 text-white';
    }
    if (option === selectedOption) {
      return 'bg-red-500 text-white';
    }
    return 'bg-white';
  };

  return (
    <div className='bg-gray-50 shadow-md p-3 rounded-lg w-full'>
      <div className="max-w-full p-2 my-3 text-center">
        <h2 className="text-2xl font-semibold text-customcolor-myblue mb-3">
          Question {questionNumber}
        </h2>
        <p className="text-gray-700 text-base mb-3">{question.question}</p>
        <p className="text-gray-700 text-base font-bold mb-3">Points: 1 point</p>
        <p className="text-red-500 text-base font-bold mb-3">Time left: {timeLeft} seconds</p> {/* Display timer */}

        <div className="flex flex-col space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              disabled={isAnswered}  // Disable button after an option is clicked or time ends
              className={`rounded-full border border-gray-200 py-2 text-lg font-semibold hover:shadow-lg transition-all duration-300 ${getOptionClass(option)}`}
            >
              {option}
            </button>
          ))}
        </div>
        <div className='flex justify-end'>
          {(isAnswered || timeEnded) && (
            <button 
              onClick={() => onNext(selectedOption)} 
              className='bg-customcolor-myblue m-7 rounded-lg text-white py-2 px-4 mb-0 hover:opacity-80'>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizzQuestions;
