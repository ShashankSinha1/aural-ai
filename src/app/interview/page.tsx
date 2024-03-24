'use client'

import CountdownTimer from '@/components/CountdownTimer';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Question() {
  const [question, setQuestion] = useState<any>();

  const fetchQuestion = async () => {
    try {
      const { data, error } = await supabase.rpc('random_question')

      if (error) {
        throw error;
      }

      setQuestion(data);
    }
    catch (error){
      alert (JSON.stringify(error, null, 2));
    }
  }; 

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        {question ? (
          <>
            <h1>{question}</h1>
            <br/>
            <CountdownTimer/>
          </>
        ) : 
        <p>Loading...</p>}
      </div>
    </>
  );
}