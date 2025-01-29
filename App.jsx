import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './Store';
import { useSelector } from 'react-redux';
import './App.css';
import Login from './components/users/Login';
import Signup from './components/users/Signup';
import ProtectedRoutes from './components/ProtectedRoutes';
import ParentComponent from './components/ParentComponent';
import Home from './components/Home';
import CreateQuizz from './components/CreateQuizz'
import TakeQuizz from './components/TakeQuizz'
import Profile from './components/Profile'
import Quizzes from './components/Quizzes'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="flex">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

const AppRoutes = () => {
  const user = useSelector((state) => state.users.userData);

  return (
    <Routes>
      {!user ? (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <Route element={<ProtectedRoutes />}>
          <Route
            path="/home"
            element={
              <ParentComponent>
                <Home/>
              </ParentComponent>
            }
          />
          <Route
            path="/create"
            element={
              <ParentComponent>
                <CreateQuizz/>
              </ParentComponent>
            }
          />
          <Route
            path="/quizz"
            element={
              <ParentComponent>
                <Quizzes/>
              </ParentComponent>
            }
          />
          <Route
            path="/take"
            element={
              <ParentComponent>
                <TakeQuizz/>
              </ParentComponent>
            }
          />
          <Route
            path="/profile"
            element={
              <ParentComponent>
                <Profile/>
              </ParentComponent>
            }
          />
          <Route path="*" element={<Navigate to="/home" />} />
        </Route>
      )}
    </Routes>
  );
};


export default App;
