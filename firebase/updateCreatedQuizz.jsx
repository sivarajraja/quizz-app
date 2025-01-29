import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from './Firebase';
import { useState } from 'react';

export const updateCreatedQuizz = () => {
  const [firebaseUpdateError, setFirebaseUpdateError] = useState(null);

  const updateQuizz = async ({ userId, quizzId }) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      const currentCreatedQuizzes = userDoc.data()?.createdQuizzes || [];

      await updateDoc(userDocRef, { 
        createdQuizzes: arrayUnion(...currentCreatedQuizzes, quizzId) 
      });

      console.log('created quizz added:');
    } catch (error) {
        setFirebaseUpdateError(error);
    }
  };

  return { updateQuizz, firebaseUpdateError };
};
