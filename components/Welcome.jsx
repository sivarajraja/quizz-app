import React from 'react';
import Leaderboard from './Leaderboard'

const Welcome = ({ onStart, service }) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-48 bg-gray-50 px-6 py-8">
      <div className="text-center mb-4">
        <h1 className="text-5xl font-bold text-customcolor-myblue">
          {service.title}
        </h1>
        <p className="mt-3 text-lg text-gray-500">{service.description}</p>
        <p className="mt-3 text-lg font-semibold text-gray-500">
          Creator : {service.creatorName}
        </p>

        <div className="flex flex-col justify-start">
          <p className="text-lg font-semibold text-gray-500">
            Questions : {service.questions.length} Total questions
          </p>
          <p className="text-lg font-semibold text-gray-500">
            Duration : {service.time} Seconds Per Question
          </p>
        </div>
      </div>

      <button
        onClick={onStart}
        className="bg-customcolor-myblue rounded-lg shadow-md w-full max-w-xs p-4 my-7 text-center hover:shadow-lg transition-all duration-300"
      >
        <span className="text-xl text-white font-semibold">Start Quiz</span>
      </button>
    </div>
    <Leaderboard leaderboardList={service.leaderboard}/>
    </div>
  );
};

export default Welcome;
