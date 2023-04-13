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
  const block=sessionStorage.getItem('block') || true;

  const [mcq, setMcq] = useState([]);
  const [msq,setMsq]=useState([])
  const [show, setShow] = useState(false);
  const [show1,setShow1]=useState(false)
  const [mcqblock, setMcqblock] = useState(block);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');

  const [answer, setAnswer] = useState('');
  const [answer1 , setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');

  const [edit, setEdit] = useState(false);
  const [id, setId] = useState();

function handleBlock(){
  setMcqblock(!mcqblock)
  sessionStorage.setItem('block',mcqblock)
}


  async function datafetch() {
    const mcq = collection(db, 'mcq');
    const msq=collection(db,'msq')

    const data = await getDocs(mcq);
    const data1=await getDocs(msq)
    setMcq(data.docs);
    setMsq(data1.docs)
  }

  async function handlemcqCreateQuestion() {
    var obj = { question, options: [option1, option2, option3], answer };
    await addDoc(collection(db, 'mcq'), obj);
    setShow(false);
    window.location.reload();
  }

async function handlemsqCreateQuestion(){
  var obj={question,options:[option1,option2,option3,option4],answers:[answer1,answer2]}
  await addDoc(collection(db,'msq'),obj)
  setShow1(false)
  window.location.reload()
}


  async function handlemcqEditQuestion() {
    var obj = { question, options: [option1, option2, option3], answer };

    await updateDoc(doc(db, 'mcq', id), obj);
    window.location.reload();
  }



  async function handlemsqEditQuestion() {
    var obj={question,options:[option1,option2,option3,option4],answers:[answer1,answer2]}
  

    await updateDoc(doc(db, 'msq', id), obj);
    window.location.reload();
  }


  const mcqs = mcq.map((document, index) => {
    const optionsbox = document.data().options.map((option, index) => {
      return (
        <div key={index}>
          <div>
            {index + 1}
            <span className='ms-2'>{option}</span>
          </div>
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
        <div className='card-body'>
          <div className='question'>
            <span className='ms-2'>{document.data().question}</span>
          </div>
          <div>
            <div>Options:</div>
            <div>{optionsbox}</div>
          </div>

          <div>
            Answer : <span>Option {document.data().answer}</span>
          </div>
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



  const msqs = msq.map((document, index) => {
    const optionsbox = document.data().options.map((option, index) => {
      return (
        <div key={index}>
          <div>
            {index + 1}
            <span className='ms-2'>{option}</span>
          </div>
        </div>
      );
    });
    const deleteQuestion = async () => {
      await deleteDoc(doc(db, 'msq', document.id));
      window.location.reload();
    };
    const editQuestion = () => {
      setQuestion(document.data().question);
      setAnswer1(document.data().answers[0]);
      setAnswer2(document.data().answers[1])
      setOption1(document.data().options[0]);
      setOption2(document.data().options[1]);
      setId(document.id);
      setOption3(document.data().options[2]);
      setOption4(document.data().options[3])
      setShow1(true);
      setEdit(true);
    };
    return (
      <div key={index} className='card custom-card my-4 px-4'>
        <div className='card-body'>
          <div className='question'>
            <span className='ms-2'>{document.data().question}</span>
          </div>
          <div>
            <div>Options:</div>
            <div>{optionsbox}</div>
          </div>

          <div>
            Answer : <span>Option {document.data().answers[0]}</span> and <span>Option {document.data().answers[1]}</span>
          </div>
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
      {mcqblock ? (
        <>
          <div
            className='container d-flex justify-content-between pt-4 mb-5 '
            style={{ height: '50px' }}
          >
            <a className='title' href='/'>
              Quiz
            </a>
            <div className=' btn login-btn' onClick={handleBlock}>
          MSQ
        </div>
          </div>

          <div className='container hide-container w-100'>
            <Button
              variant='primary'
              onClick={handleShow}
              className='mcq-create'
            >
              Create MCQ
            </Button>
            <div>{mcqs}</div>
          </div>
        </>
      ) : (
        <>
        
        <div
            className='container d-flex justify-content-between pt-4 mb-5 '
            style={{ height: '50px' }}
          >
            <a className='title' href='/'>
              Quiz
            </a>
            <div className=' btn login-btn' onClick={handleBlock}>
          MCQ
        </div>
          </div>

          <div className='container hide-container w-100'>
            <Button
              variant='primary'
              onClick={handleShow1}
              className='mcq-create'
            >
              Create MSQ
            </Button>
            <div>{msqs}</div>
          </div>
        
        
        </>
      )}

      <Modal show={show} onHide={handleClose}>
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
            <Button
              variant='primary'
              className='modal-btn'
              onClick={handlemcqEditQuestion}
            >
              Edit
            </Button>
          ) : (
            <Button
              variant='primary'
              className='modal-btn'
              onClick={handlemcqCreateQuestion}
            >
              Create
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton className='custom-modal'>
          <Modal.Title>MSQ QUESTION</Modal.Title>
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
              <Form.Label>Option 2:</Form.Label>
              <Form.Control
                type='text'
                value={option2}
                onChange={(e) => setOption2(e.target.value)}
                placeholder='Enter Second Option'
                required
              />
            </Form.Group>{' '}
            <Form.Group>
              <Form.Label>Option 3:</Form.Label>
              <Form.Control
                type='text'
                value={option3}
                onChange={(e) => setOption3(e.target.value)}
                placeholder='Enter Third Option'
                required
              />
            </Form.Group>{' '}
            <Form.Group>
              <Form.Label>Option 4:</Form.Label>
              <Form.Control
                type='text'
                value={option4}
                onChange={(e) => setOption4(e.target.value)}
                placeholder='Enter Third Option'
                required
              />
            </Form.Group>{' '}
            <Form.Group>
              <Form.Label>Answer 1:</Form.Label>
              <Form.Control
                type='number'
                value={answer1}
                onChange={(e) => setAnswer1(e.target.value)}
                placeholder='Enter Answer 1'
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Answer 2:</Form.Label>
              <Form.Control
                type='number'
                value={answer2}
                onChange={(e) => setAnswer2(e.target.value)}
                placeholder='Enter Answer 2'
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className='custom-modal'>
          <Button variant='secondary' onClick={handleClose1}>
            Close
          </Button>
          {edit ? (
            <Button
              variant='primary'
              className='modal-btn'
              onClick={handlemsqEditQuestion}
            >
              Edit
            </Button>
          ) : (
            <Button
              variant='primary'
              className='modal-btn'
              onClick={handlemsqCreateQuestion}
            >
              Create
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
