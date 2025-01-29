import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import Home from './Home';
import CreateQuizz from './CreateQuizz';
import Profile from './Profile';
import TakeQuizz from './TakeQuizz';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const user = useSelector((state) => state.users.userData);
  console.log(user.mode);
  return (
    <div className="flex bg-blue-50 justify-between items-center">
      <div className="flex ml-7 p-5 gap-5">
        <div>
          <img className="w-11 h-auto" src={logo} />
        </div>
        <div>
          <h2 className="text-2xl text-customcolor-myblue font-sans font-semibold">
            ONLINE QUIZZ
          </h2>
        </div>
      </div>
      <div className="p-5 mr-11">
        <ul className="flex gap-9 font-mono text-lg text-customcolor-myblue">
          <li>
            <Link to="/dashboard" element={<Home />}>
              HOME
            </Link>
          </li>
          {user.mode === 'creator' ? (
            <li>
              <Link to="/create" element={<CreateQuizz />}>
                CREATE QUIZZ
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/take" element={<TakeQuizz />}>
                TAKE QUIZZ
              </Link>
            </li>
          )}

          <li>
            <Link to="/profile" element={<Profile />}>
              PROFILE
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
