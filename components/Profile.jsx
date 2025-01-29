import React, { useReducer } from 'react';
import { useSelector } from 'react-redux';
import { useFetchQuizzes } from '../firebase/useFetchQuizzes';
import profile from '../assets/user.png';

const Profile = () => {
  const user = useSelector((state) => state.users.userData);
  const { quizzes } = useFetchQuizzes({ userId: user.id });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-8">
      <div className="flex justify-center mb-4">
        <img
          src={profile}
          className="rounded-full w-48 h-48 border-4 border-customcolor-myblue"
          alt="user"
        />
      </div>

      <div className="text-center mb-4">
        <h1 className="text-5xl font-bold text-customcolor-myblue">
          {user.name}
        </h1>
        <p className="mt-2 text-lg text-gray-500">[{user.mode}]</p>
      </div>

      <div className="bg-white rounded-lg shadow-md w-full max-w-xs p-4 my-7 text-center">
      {user.mode === 'creator' ? (
              <h5 className="text-xl font-semibold text-gray-700 mb-2">
              TOTAL CREATED QUIZZES
            </h5>
            ) : (
              <h5 className="text-xl font-semibold text-gray-700 mb-2">
              TOTAL TAKEN QUIZZES
            </h5>
            )}
        
        <p className="text-4xl font-bold text-gray-800 py-2">
          {quizzes.length}
        </p>
      </div>

      {user.mode === 'creator' && (
        <div className="flex flex-col items-center justify-center">
          <div className="my-4">
            {user.mode === 'creator' ? (
              <h1 className="text-4xl text-customcolor-myblue">
                Created Quizzes
              </h1>
            ) : (
              <h1 className="text-4xl text-customcolor-myblue">
                Taken Quizzes
              </h1>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mt-5">
            {quizzes.map((quiz, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: '0.1s' }}
              >
                <h2 className="text-2xl font-semibold text-customcolor-myblue mb-3">
                  {quiz.title}
                </h2>
                <p className="text-gray-700 text-base mb-3">
                  {quiz.description}
                </p>
                <p className="text-gray-600 font-semibold mt-1 text-sm">
                  Questions: 5 questions
                </p>
                <p className="text-gray-600 font-semibold mt-1 text-sm">
                  Time: {quiz.time} seconds
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
