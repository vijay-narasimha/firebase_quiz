import {
  collection,
  getDocs,
  deleteDoc,
  addDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { Button, Modal, Form } from 'react-bootstrap';

export default function Questions() {
  const [mcq, setMcq] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [answer, setAnswer] = useState('');
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState();

  async function datafetch() {
    const mcq = collection(db, 'mcq');
    const data = await getDocs(mcq);
    setMcq(data.docs);
  }

  async function handlemcqCreateQuestion() {
    var obj = { question, options: [option1, option2, option3], answer };
    await addDoc(collection(db, 'mcq'), obj);
    setShow(false);
    window.location.reload();
  }
  async function handlemcqEditQuestion() {
    var obj = { question, options: [option1, option2, option3], answer };

    await updateDoc(doc(db, 'mcq', id), obj);
    window.location.reload();
  }
  const mcqs = mcq.map((document, index) => {
    const optionsbox = document.data().options.map((option, index) => {
      return (
        <div key={index}>
          <div>{index+1}<span className='ms-2'>{option}</span></div>
        </div>
      );
    });
    const deleteQuestion = async () => {
      await deleteDoc(doc(db, 'mcq', document.id));
      window.location.reload();
    };
    const editQuestion = () => {
      setQuestion(document.data().question);
      setAnswer(document.data().answer);
      setOption1(document.data().options[0]);
      setOption2(document.data().options[1]);
      setId(document.id);
      setOption3(document.data().options[2]);
      setShow(true);
      setEdit(true);
    };
    return (
      <div key={index} className='card custom-card my-4 px-4'>
        <div className="card-body">

       
        <div className='question'><span className='ms-2'>
        {document.data().question}
          </span></div>
        <div>
          <div>Options:</div>
          <div>{optionsbox}</div>
        </div>

        <div>Answer :   <span>Option {document.data().answer}</span></div>
        <div className='d-flex justify-content-end'>
          <div className='btn custom-btn' onClick={editQuestion}>
            Edit
          </div>
          <div className='btn custom-btn' onClick={deleteQuestion}>
            Delete
          </div>
        </div>
        </div>
      </div>
    );
  });

  useEffect(() => {
    datafetch();
  }, []);
  return (
    <>
      <div
        className='container d-flex justify-content-between pt-4 mb-5'
        style={{ height: '50px' }}
      >
        <a className='title' href='/'>Quiz</a>
      </div>

      <div className='container hide-container w-100'>
        <Button variant='primary' onClick={handleShow} className='mcq-create'>
          Create MCQ
        </Button>
        <div>{mcqs}</div>
      </div>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton className='custom-modal'>
          <Modal.Title>MCQ QUESTION</Modal.Title>
        </Modal.Header>
        <Modal.Body className='custom-modal'>
          <Form>
            <Form.Group>
              <Form.Label>Question:</Form.Label>
              <Form.Control
                type='text'
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder='Enter Question'
                required
              />
            </Form.Group>{' '}
            <Form.Group>
              <Form.Label>Option1:</Form.Label>
              <Form.Control
                type='text'
                value={option1}
                onChange={(e) => setOption1(e.target.value)}
                placeholder='Enter first Option'
                required
              />
            </Form.Group>{' '}
            <Form.Group>
              <Form.Label>Option2:</Form.Label>
              <Form.Control
                type='text'
                value={option2}
                onChange={(e) => setOption2(e.target.value)}
                placeholder='Enter Second Option'
                required
              />
            </Form.Group>{' '}
            <Form.Group>
              <Form.Label>Option3:</Form.Label>
              <Form.Control
                type='text'
                value={option3}
                onChange={(e) => setOption3(e.target.value)}
                placeholder='Enter Third Option'
                required
              />
            </Form.Group>{' '}
            <Form.Group>
              <Form.Label>Answer:</Form.Label>
              <Form.Control
                type='number'
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder='Enter Answer'
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className='custom-modal'>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          {edit ? (
            <Button variant='primary' className='modal-btn' onClick={handlemcqEditQuestion}>
              Edit
            </Button>
          ) : (
            <Button variant='primary' className='modal-btn' onClick={handlemcqCreateQuestion}>
              Create
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
