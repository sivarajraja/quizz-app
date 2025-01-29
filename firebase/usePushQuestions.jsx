import { doc, collection, addDoc } from 'firebase/firestore';
import { db } from './Firebase';
import { useState } from 'react';

export const usePushQuestions = () => {
  const [firebaseQuestionId, setFirebaseQuestionId] = useState([]);
  const [firebaseQuestionError, setFirebaseQuestionError] = useState(null);

  const pushQuestionsData = async (questionsArray) => {
    try {
      const questionIds = [];

      for (const question of questionsArray) {
        const questionRef = await addDoc(collection(db, 'questions'), question);
        questionIds.push(questionRef.id);
        console.log('Question added with ID:', questionRef.id);
      }

      setFirebaseQuestionId(questionIds); 
    } catch (error) {
      setFirebaseQuestionError(error.message || 'An error occurred while pushing questions.'); 
    }
  };

  return { pushQuestionsData, firebaseQuestionError, firebaseQuestionId };
};