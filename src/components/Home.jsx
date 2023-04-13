import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const rules=[
    'The quiz consists of multiple-choice questions (MCQs) and multiple-select questions (MSQs).',
    'The quiz has a time limit of 3 minutes.',' Each MCQ has 3 options, out of which only 1 option is correct.',
    'Each MSQ has 4 options, out of which 2 or more options may be correct.',
    'For each correct answer, you will earn 1 point.',
    'If you do not answer a question, no points will be deducted.',
    'Once you start the quiz, the timer will begin and cannot be paused.',
    'You must answer all questions before submitting the quiz.',
    'You can only submit the quiz once.'
  ]

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
        <a href='/' className='title'>Quiz</a>
        <div className=' btn login-btn' onClick={handleLogin}>
          Login
        </div>
       
      </div>
      <div className='container mt-3 mb-4'>{displayRules}</div>
      <div className='text-center mt-5'>
        <input
          type='text'
          value={name}
          placeholder='Enter Name here..'
          onChange={(e) => setName(e.target.value)}
          className='home-input'
        />
        <div className='btn start-btn ms-3' onClick={handleStart}>
          Start Test
        </div>
      </div>
    </>
  );
}
