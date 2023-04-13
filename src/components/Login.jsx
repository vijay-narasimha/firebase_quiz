import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const userCollection = collection(db, 'admin');

  const [name, setName] = useState('');
  const [err, setErr] = useState('');
  const [password, setPassword] = useState('');
  const [adminname, setAdminname] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const navigate = useNavigate();
  function handleSubmit() {
    if (name === adminname && password === adminPassword) {
      setErr('');
      navigate('/questions');
    } else {
      setErr('invalid name and password');
    }
  }
  async function datafetch() {
    const data = await getDocs(userCollection);
    data.docs.map(
      (doc) => (
        setAdminname(doc.data().name),
         setAdminPassword(doc.data().password)
      )
    );
  }

  useEffect(() => {
    datafetch();
  }, []);
  return (
    <>
      <div
        className='container d-flex justify-content-center align-items-center login-container'
        style={{ minHeight: '100vh' }}
      >
        <div className='card custom-card'>
          <div className='card-body'>
            <p className='h2 text-center login-title'>Login</p>
            {err && <div className='alert alert-danger'>{err}</div>}
            <form onSubmit={handleSubmit}>
              <div className='form-group my-3'>
                <label>Name:</label>
                <input
                  type='text'
                  id='name'
                  className=' form-control'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete='off'
                />
              </div>
              <div className='form-group my-3'>
                <label>Password:</label>
                <input
                  type='password'
                  id='password'
                  className='form-control'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className='btn w-100 submit-btn'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
