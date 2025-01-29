import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from './Firebase';

export const useFetchQuizzes = ({ userId }) => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const quizzesCollectionRef = collection(db, 'quizzes');
    const q = query(quizzesCollectionRef, where('creatorId', '==', userId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedQuizzes = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setQuizzes(fetchedQuizzes);
    });

    return () => unsubscribe();
  }, [userId]);

  return { quizzes };
};
