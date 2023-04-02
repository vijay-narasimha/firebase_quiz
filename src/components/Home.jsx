import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const rules = [
    'The quiz application will consist of 10 questions, with a  multiple-choice questions (MCQs) .',
    'The quiz will be timed for a duration of 3 minutes.',
    'Each MCQ will have 3 answer options, only one of which is correct.',
    'Each question will be worth one point, regardless of whether it is an MCQ .',
    'If the quiz taker fails to answer a question before the timer runs out, the question will be considered as unanswered and will not be scored.',
    'The participant who answers the most questions correctly in the shortest time will be declared the winner.',
  ];

  const displayRules = rules.map((rule, index) => {
    return (
      <p key={index} className='rule'>
        <span className='ms-2'>{rule}</span>
      </p>
    );
  });

  function handleLogin() {
    navigate('login');
  }
  function handleStart() {
    var profile = { name: name, score: 0, time: 0 };
    if (name) {
      localStorage.setItem('profile', JSON.stringify(profile));

      navigate('test');
    }
  }
  return (
    <>
      <div
        className='container d-flex justify-content-between pt-4 mb-5'
        style={{ height: '50px' }}
      >
        <a className='title'>Quiz</a>
        <div className='btn login-btn' onClick={handleLogin}>
          Login
        </div>
      </div>
      <div className='container mt-3 mb-4'>{displayRules}</div>
      <div className='text-center mt-3'>
        <input
          type='text'
          value={name}
          placeholder='Enter Name here..'
          onChange={(e) => setName(e.target.value)}
        />
        <div className='btn start-btn ms-3' onClick={handleStart}>
          start Test
        </div>
      </div>
    </>
  );
}
