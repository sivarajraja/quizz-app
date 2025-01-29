import { useState, useEffect } from 'react';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from './Firebase'; 

const useFetchQuestions = (questionIds) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const questionsCollectionRef = collection(db, 'questions');
        const fetchedQuestions = await Promise.all(
          questionIds.map(async (questionId) => {
            const questionDocRef = doc(questionsCollectionRef, questionId);
            const questionDoc = await getDoc(questionDocRef);
            return { id: questionId, ...questionDoc.data() };
          })
        );
        setQuestions(fetchedQuestions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [questionIds]);

  return { questions, loading, error };
};

export default useFetchQuestions;
