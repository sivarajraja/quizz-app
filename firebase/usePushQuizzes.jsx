import { doc,collection, setDoc } from 'firebase/firestore';
import {db} from './Firebase'
import { useState } from 'react';

export const usePushQuizzes = () => {
  
    const [firebaseQuizzId,setFirebaseQuizzId] = useState(null);
    const [firebaseQuizzError,setFirebaseQuizzError] = useState(null);

    const pushQuizzData = async ({fbData})=>{
        try{    
            const docRef = doc(collection(db,'quizzes'));
            await setDoc(docRef,fbData)
            setFirebaseQuizzId(docRef.id);
            console.log("added quizz id:",docRef.id)

        }catch(error){
            setFirebaseQuizzError(error)
        }
    }

    return {pushQuizzData,firebaseQuizzError,firebaseQuizzId}
}
