import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchAllQuizzes } from '../firebase/useFetchAllQuizzes'
import { useSelector } from 'react-redux';

const TakeQuizz = () => {
  const navigate = useNavigate();
  const user = useSelector((state)=>state.users.userData);
  const { quizzes } = useFetchAllQuizzes();

  const handleServiceClick = (service) => {
    navigate('/quizz', {
      state: {
        service,
      },
    });
  };

  return (
    <div className="p-2 bg-gray-50">
      <div className="flex flex-col items-center mt-5 min-h-screen px-6">
        <div className="flex justify-center mb-7">
          <span className="text-4xl text-customcolor-myblue">
            Available quizzes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 w-full max-w-5xl">
          {quizzes.map((service, index) => (
            <div
              key={index}
              onClick={() => handleServiceClick(service)}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
              style={{ animationDelay:'0.1s' }} 
            >
              <h2 className="text-2xl font-semibold text-customcolor-myblue mb-3">
                {service.title}
              </h2>
              <p className="text-gray-700 text-base mb-3">
                {service.description}
              </p>
              <p className="text-gray-600 font-semibold mt-1 text-sm">
                Quizz Creator: {service.creatorName}
              </p>
              <p className="text-gray-600 font-semibold mt-1 text-sm">
                Questions: {service.questions.length} Questions
              </p>
              <p className="text-gray-600 font-semibold mt-1 text-sm">
                Time: {service.time} Seconds
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TakeQuizz;
