import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from './Firebase';
import { useState } from 'react';

export const updateTakenQuizz = () => {
  const [firebaseTakenError, setFirebaseTakenError] = useState(null);

  const updateQuizz = async ({ userId, quizzId }) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      const currentTakenQuizzes = userDoc.data()?.takenQuizzes || [];

      await updateDoc(userDocRef, { 
        takenQuizzes: arrayUnion(...currentTakenQuizzes, quizzId) 
      });

      console.log('taken quizz added:');
    } catch (error) {
        setFirebaseTakenError(error);
    }
  };

  return { updateQuizz, firebaseTakenError };
};
