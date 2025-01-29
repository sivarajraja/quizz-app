import React from 'react';

import first from '../assets/gold.png';
import second from '../assets/silver.png';
import third from '../assets/bronze.png';
import { useSelector } from 'react-redux';

const Leaderboard = ({ leaderboardList }) => {

  const currentUser = useSelector((state)=>state.users.userData);

  const sortedLeaderboard = leaderboardList && leaderboardList.length > 0 ? 
    leaderboardList.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score; 
      } else {
        return a.timeTaken - b.timeTaken;
      }
    }) : [];

  return (
    <div className="bg-gray-50 min-h-screen p-2">
      <div className="flex justify-center my-7">
        <span className="text-4xl text-customcolor-myblue">Leaderboard</span>
      </div>

      {/* Leaderboard list */}
      <div className="bg-white border shadow-md rounded-md overflow-hidden max-w-5xl mx-auto mt-9">
        <ul className="divide-y divide-gray-200">
          {sortedLeaderboard.length === 0 && <div className='p-5 text-lg text-center'>No Records Found</div>}
          {sortedLeaderboard.map((user, index) => (
            <li
              key={user.userId}
              className={`flex items-center ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} py-4 px-6`}
            >
              <span className="text-gray-700 text-lg font-medium mr-4">
                {index + 1}.
              </span>
              <div className="flex-1 flex items-center">
                <h3 className="text-lg ml-3 font-medium text-gray-800">
                  {user.userName}
                </h3>
                
                {index === 0 && (
                  <img
                    src={first}
                    alt="1st place badge"
                    className="w-6 h-6 ml-5"
                  />
                )}
                {index === 1 && (
                  <img
                    src={second}
                    alt="2nd place badge"
                    className="w-6 h-6 ml-5"
                  />
                )}
                {index === 2 && (
                  <img
                    src={third}
                    alt="3rd place badge"
                    className="w-6 h-6 ml-5"
                  />
                )}
                {currentUser.id === user.userId && <span className='ml-3 font-semibold'>( your score )</span>}
              </div>
              <div className="flex items-center gap-11">
                <p className="text-gray-600 text-base">{user.score} points</p>
                <p className="text-gray-600 text-base">{user.timeTaken} seconds</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;
