import React from 'react';
import welcome from '../assets/welcome.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.userData);
  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      <div className="flex justify-center">
        <img className="w-1/5 h-auto" src={welcome} />
      </div>
      <div className="flex justify-center">
      {user.mode !== 'creator' ? (
          <h1 className="text-3xl font-semibold">
          Improve Your Knowledge By Taking More Quizzes !
        </h1>
        ) : (
          <h1 className="text-3xl font-semibold">
          Help Others To Improve Knowledge By Creating More Quizzes !
        </h1>
        )}
        
      </div>
      <div className="flex justify-center mt-9">
        {user.mode !== 'creator' ? (
          <button
            onClick={() => navigate('/take')}
            className="bg-customcolor-myblue text-white p-2 px-3 rounded-lg border"
          >
            Get Started
          </button>
        ) : (
          <button
            onClick={() => navigate('/create')}
            className="bg-customcolor-myblue text-white p-2 px-3 rounded-lg border"
          >
            Get Started
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
