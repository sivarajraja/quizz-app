import React, { useState, useEffect } from 'react';
import Welcome from './Welcome';
import QuizzQuestions from './QuizzQuestions';
import Results from './Results';
import { useNavigate, useLocation } from 'react-router-dom';
import useFetchQuestions from '../firebase/useFetchQuestions';
import { getDoc, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase/Firebase';
import { useSelector } from 'react-redux';

const Quizzes = () => {
  const location = useLocation();
  const service = location.state?.service;
  const user = useSelector((state) => state.users.userData);

  if (!service) {
    return (
      <div className="text-center text-3xl text-gray-800 font-semibold">
        No service data found.
      </div>
    );
  }

  const { questions, loading, error } = useFetchQuestions(service.questions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [reset, setReset] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!showWelcome && startTime === null) {
      setStartTime(Date.now());
    }
  }, [showWelcome, startTime]);

  const handleNextQuestion = (selectedOption) => {
    const isCorrect = selectedOption === questions[currentQuestion].correctOption;
    console.log("Selected Option: ", selectedOption);
    console.log("Correct Option: ", questions[currentQuestion].correctOption);
    console.log("Is Correct: ", isCorrect);
  
    const newAnswer = [...answers, isCorrect ? 1 : 0];
    setAnswers(newAnswer);
  
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
  
    console.log("Current Score: ", score);
  
    if (currentQuestion >= questions.length - 1) {
      const endTime = Date.now();
      const timeTaken = Math.floor((endTime - startTime) / 1000);
      saveResultToLeaderboard(score + (isCorrect ? 1 : 0), timeTaken).then(() => {
        setShowResult(true);
      }).catch(error => {
        console.error("Error updating leaderboard: ", error);
        setShowResult(true);
      });
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setReset(prev => !prev);
    }
  };
  

  const saveResultToLeaderboard = async (score, timeTaken) => {
    const quizzDocRef = doc(db, 'quizzes', service.id);
    try {
      const quizzDoc = await getDoc(quizzDocRef);
      const leaderboard = quizzDoc.data().leaderboard || [];

      const userEntryIndex = leaderboard.findIndex(
        (entry) => entry.userId === user.id,
      );

      if (userEntryIndex !== -1) {
        const userEntry = leaderboard[userEntryIndex];
        if (
          score > userEntry.score ||
          (score === userEntry.score && timeTaken < userEntry.timeTaken)
        ) {
          leaderboard[userEntryIndex] = {
            score,
            timeTaken,
            userId: user.id,
            userName: user.name,
          };
        }
      } else {
        leaderboard.push({
          score,
          timeTaken,
          userId: user.id,
          userName: user.name,
        });
      }

      await updateDoc(quizzDocRef, { leaderboard });
    } catch (error) {
      throw new Error('Error updating leaderboard');
    }
  };

  const startTest = () => {
    setShowWelcome(false);
    setStartTime(Date.now());
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setShowWelcome(true);
    setReset(false);
    setScore(0);
    setStartTime(null);
  };

  const exitTest = () => {
    navigate('/take');
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="m-5 w-full max-w-4xl rounded-3xl bg-white p-5 shadow-lg md:m-10 md:p-10">
        {showWelcome && <Welcome onStart={startTest} service={service} />}
        {!showWelcome && !showResult && questions.length > 0 && (
          <QuizzQuestions
            question={questions[currentQuestion]}
            questionNumber={currentQuestion + 1}
            onNext={handleNextQuestion}
            reset={reset}
          />
        )}
        {showResult && (
          <Results
            answers={answers}
            restartTest={restartTest}
            exitTest={exitTest}
            totalQuestions={questions.length}
            score={score}
            quizzId={service.id}
          />
        )}
      </div>
    </div>
  );
};

export default Quizzes;
