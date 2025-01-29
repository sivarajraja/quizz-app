import React, { useEffect } from 'react';
import { updateTakenQuizz } from '../firebase/updateTakenQuizz';
import { useSelector } from 'react-redux';

const Results = ({ restartTest, exitTest, totalQuestions, score, quizzId }) => {
  const user = useSelector((state) => state.users.userData);
  const { updateQuizz, firebaseTakenError } = updateTakenQuizz();

  useEffect(() => {
    const updateResults = async () => {
      try {
        await updateQuizz({ userId: user.id, quizzId });
      } catch (error) {
        console.error("Error updating quiz results: ", error);
      }
    };

    updateResults();
  }, [updateQuizz, user.id, quizzId]);

  return (
    <div className="flex flex-col gap-6 text-center">
      <h2 className="text-3xl font-bold text-customcolor-myblue">Quiz Complete!</h2>
      <p className="text-2xl font-semibold text-gray-700">
        Your score: {score} out of {totalQuestions}
      </p>

      <div className='flex justify-center gap-6'>
        <button
          onClick={restartTest}
          className="mt-4 rounded-full w-1/2 bg-red-500 px-4 py-2 text-xl text-white transition-colors hover:opacity-80"
        >
          Try Again
        </button>
        <button
          onClick={exitTest}
          className="mt-4 rounded-full w-1/2 bg-customcolor-myblue px-4 py-2 text-xl text-white transition-colors hover:opacity-80"
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default Results;
