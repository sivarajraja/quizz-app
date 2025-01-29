import React, { useState } from 'react';
import { usePushQuestions } from '../firebase/usePushQuestions';
import { usePushQuizzes } from '../firebase/usePushQuizzes';
import { updateCreatedQuizz } from '../firebase/updateCreatedQuizz';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreateQuizz = () => {
  const user = useSelector((state) => state.users.userData);
  const navigate = useNavigate();

  const [next, setNext] = useState(false);
  const [qCount, setQCount] = useState(1);
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [timePerQuestion, setTimePerQuestion] = useState(10);
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctOption: '' },
  ]);
  const [inputError, setInputError] = useState(null);
  const [firebaseError, setFirebaseError] = useState(null);

  const { pushQuestionsData, firebaseQuestionError, firebaseQuestionId } =
    usePushQuestions();

  const { pushQuizzData, firebaseQuizzError, firebaseQuizzId } =
    usePushQuizzes();

  const { updateQuizz, firebaseUpdateError } = updateCreatedQuizz();

  const handleNext = () => {
    if (!quizTitle || !quizDescription) {
      setInputError('Please provide a title and description for the quiz.');
      return;
    }
    setInputError('');
    setNext(true);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === 'question') updatedQuestions[index].question = value;
    if (field.startsWith('option')) {
      const optionIndex = parseInt(field.split('-')[1], 10);
      updatedQuestions[index].options[optionIndex] = value;
    }
    if (field === 'correctOption')
      updatedQuestions[index].correctOption = value;
    setQuestions(updatedQuestions);
  };

  const addNextQuestion = () => {
    if (
      !questions[qCount - 1].question ||
      questions[qCount - 1].options.some((opt) => !opt) ||
      !questions[qCount - 1].correctOption
    ) {
      setInputError('Please fill out all fields for the current question.');
      return;
    }
    setInputError('');

    if (qCount < numQuestions) {
      setQuestions((prev) => [
        ...prev,
        { question: '', options: ['', '', '', ''], correctOption: '' },
      ]);
      setQCount((prev) => prev + 1);
    }
  };

  const saveQuiz = async () => {
    console.log({
      quizTitle,
      quizDescription,
      numQuestions,
      timePerQuestion,
      questions,
    });

    pushQuestionsData(questions);

    if (firebaseQuestionError) {
      setFirebaseError(firebaseQuestionError);
      return;
    }

    console.log('questions pushed to database');

    const quizzData = {
      creatorId: user.id,
      creatorName:user.name,
      questions: firebaseQuestionId,
      description: quizDescription,
      title: quizTitle,
      time: timePerQuestion,
      leaderboard: [],
    };

    console.log(quizzData);

    await pushQuizzData({ fbData: quizzData });
    console.log('quizzes pushed to database');

    if (firebaseQuizzError) {
      setFirebaseError(firebaseQuestionError);
      return;
    }

    await updateQuizz({userId:user.id,quizzId:firebaseQuizzId});

    if (firebaseUpdateError) {
      setFirebaseError(firebaseUpdateError);
      return;
    }

    window.alert('QUIZZ ADDED!');

    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-7">
      <div className="flex flex-col justify-center max-w-4xl mt-9 border mx-auto bg-white p-6 rounded-lg shadow-lg">
        {next ? (
          <div className="flex flex-col items-center">
            <div className="text-center mb-6">
              <span className="text-customcolor-myblue font-semibold text-2xl">
                ENTER QUESTIONS AND OPTIONS
              </span>

              <div className="mt-3">
                <span className="text-red-500 mr-2 font-semibold text-xl">
                  {qCount}
                </span>
                <span className="text-customcolor-myblue font-semibold text-xl">
                  / {numQuestions} QUESTIONS
                </span>
              </div>

              <p className="text-red-500 mt-3 text-sm">
                * Please enter correctly, you can't modify it again!
              </p>
            </div>

            <div className="w-full max-w-lg">
              <form>
                <label
                  htmlFor={`question-${qCount}`}
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Question:
                </label>
                <input
                  type="text"
                  id={`question-${qCount}`}
                  className="bg-gray-100 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  value={questions[qCount - 1].question}
                  onChange={(e) =>
                    handleQuestionChange(qCount - 1, 'question', e.target.value)
                  }
                />

                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i}>
                    <label
                      htmlFor={`option-${i}-${qCount}`}
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Option {i + 1}:
                    </label>
                    <input
                      type="text"
                      id={`option-${i}-${qCount}`}
                      className="bg-gray-100 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                      value={questions[qCount - 1].options[i]}
                      onChange={(e) =>
                        handleQuestionChange(
                          qCount - 1,
                          `option-${i}`,
                          e.target.value,
                        )
                      }
                    />
                  </div>
                ))}

                <label
                  htmlFor={`correctOption-${qCount}`}
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Correct Option:
                </label>
                <input
                  type="text"
                  id={`correctOption-${qCount}`}
                  className="bg-gray-100 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  value={questions[qCount - 1].correctOption}
                  onChange={(e) =>
                    handleQuestionChange(
                      qCount - 1,
                      'correctOption',
                      e.target.value,
                    )
                  }
                />
              </form>
            </div>

            {inputError && (
              <div className="flex justify-center w-full my-5">
                <div className="bg-red-500 text-white p-2 rounded-lg text-sm">
                  {inputError}
                </div>
              </div>
            )}

            <div className="flex justify-end w-full mt-6">
              {qCount < numQuestions ? (
                <button
                  type="button"
                  className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3"
                  onClick={addNextQuestion}
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3"
                  onClick={saveQuiz}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center mt-7">
            <div className="text-center mb-6">
              <span className="text-customcolor-myblue font-semibold text-2xl">
                CREATE NEW QUIZZ
              </span>
            </div>

            <div className="w-full max-w-lg">
              <form>
                <label
                  htmlFor="quiz-title"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Title:
                </label>
                <input
                  type="text"
                  id="quiz-title"
                  className="bg-gray-100 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                />

                <label
                  htmlFor="quiz-description"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Description:
                </label>
                <textarea
                  id="quiz-description"
                  rows="3"
                  className="block p-3 mb-3 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  value={quizDescription}
                  onChange={(e) => setQuizDescription(e.target.value)}
                ></textarea>

                <div className="flex justify-between mt-6">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="5-questions"
                      name="numQuestions"
                      value="5"
                      checked={numQuestions === 5}
                      onChange={() => setNumQuestions(5)}
                      className="mr-2"
                    />
                    <label
                      htmlFor="5-questions"
                      className="text-sm font-medium"
                    >
                      5 Questions
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="10-seconds"
                      name="timePerQuestion"
                      value="10"
                      checked={timePerQuestion === 10}
                      onChange={() => setTimePerQuestion(10)}
                      className="mr-2"
                    />
                    <label htmlFor="10-seconds" className="text-sm font-medium">
                      10 Seconds Per Question
                    </label>
                  </div>
                </div>
              </form>
            </div>

            {inputError && (
              <div className="flex justify-center w-full mt-5">
                <div className="bg-red-500 text-white p-2 rounded-lg text-sm">
                  {inputError}
                </div>
              </div>
            )}

            {firebaseError && (
              <div className="flex justify-center w-full mt-5">
                <div className="bg-red-500 text-white p-2 rounded-lg text-sm">
                  {firebaseError}
                </div>
              </div>
            )}

            <div className="flex justify-end w-full mt-6">
              <button
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateQuizz;
