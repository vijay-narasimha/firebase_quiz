import React, { useEffect, useState } from 'react';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Test() {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(300);
  const [mcq, setMcq] = useState([]);
  const [number, setNumber] = useState(0);
  const navigate = useNavigate();

  function nav(){
    navigate('/result')
  }
  async function handleexit() {
    const profile = JSON.parse(localStorage.getItem('profile'));
    profile.score = score;
    profile.time = 300 - time;
    localStorage.setItem('profile', JSON.stringify(profile));
    var obj = { name: profile.name, score: profile.score, time: profile.time };
    addDoc(collection(db, 'results'), obj)
    
    nav()
    
  }
  if (time === 0 || number>9) {
    handleexit();
  }
  
  async function datafetch() {
    const ref = collection(db, 'mcq');
    const data = await getDocs(ref);
    const array = data.docs;
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    const questions = array.slice(0, 10);
    setMcq(questions);
  }
  const handlebox = () => {
    setNumber(number + 1);
  };
  const test = mcq.map((question, index) => {
    const checkAnswer = (e) => {
      e.preventDefault();
      if (question.data().answer === e.target.value) {
        setScore(score + 1);
      }
      handlebox();
    };
   
    return (
      <div key={index} className={number === index ? '' : 'hide'}>
        <div className='box-question mb-4'>{question.data().question}</div>
        <div>
          <div className='d-flex'>
            <input
              type='radio'
              value='1'
              name={question.data().question}
              id='1'
              onClick={(e) => checkAnswer(e)}
            />
            <label htmlFor='1'>{question.data().options[0]}</label>
          </div>
          <div className='d-flex'>
            <input
              type='radio'
              value='2'
              name={question.data().question}
              id='2'
              onClick={(e) => checkAnswer(e)}
            />
            <label htmlFor='2'>{question.data().options[1]}</label>
          </div>{' '}
          <div className='d-flex'>
            <input
              type='radio'
              value='3'
              name={question.data().question}
              id='3'
              onClick={(e) => checkAnswer(e)}
            />
            <label htmlFor='3'>{question.data().options[2]}</label>
          </div>
        </div>
        <div className='btn' onClick={()=>handleexit}>
          Exit Quiz
        </div>
      </div>
    );
  });

  useEffect(() => {
    datafetch();
  }, []);

  setTimeout(() => {
    setTime(time - 1);
  }, 1000);
  return (
    <div className='container test-box d-flex flex-column justify-content-center align-items-center'>
      <div className='details d-flex justify-content-around w-100 mb-4'>
        <div className='score'>Score:{score}</div>
        <div className='timer'>Time: {time} </div>
      </div>
      <div className='question-box'>{test}</div>
    </div>
  );
}
