import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './Firebase';

export const useFetchAllQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const quizzesCollectionRef = collection(db, 'quizzes');

    const unsubscribe = onSnapshot(quizzesCollectionRef, (snapshot) => {
      const fetchedQuizzes = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setQuizzes(fetchedQuizzes);
    });

    return () => unsubscribe();
  }, []);

  return { quizzes };
};
