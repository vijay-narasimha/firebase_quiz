
import { collection,getDocs } from 'firebase/firestore'
import React, { useEffect,useState } from 'react'
import { db } from '../firebase'

export default function Result() {
  const result=JSON.parse(localStorage.getItem('profile'))
  const [top,setTop]=useState([])

async function datafetch(){
const ref=collection(db,'results')
const res=await getDocs(ref)
let array=[]
res.docs.map(doc=>(
  array.push(doc.data())
))
array.sort((a,b)=>b.score-a.score)
// array.sort((a,b)=>b.time-a.time)
array=array.slice(0,8)
setTop(array)
}
useEffect(()=>{
datafetch()
},[])

const top10=top.map((result,index)=>{
 return <tr key={index}>
    <td>{result.name}</td>
    <td>{result.score}</td>
    <td>{result.time}</td>
  </tr>
})

  return (
    <>
    <div className='box-container'>
    <div className="box d-flex flex-column justify-content-center align-items-center">
      <div className='score mb-3'>Score:{result.score}</div>
      <div>Completed in {result.time} Seconds </div>
     
    </div>
   <div className="restart mb-4">
   <a href='/'>Restart</a>
   </div>
    <div className='d-flex text-center custom-table'>
      <table className='table '>
        <thead className='thead-light'>
        <tr>
          <th>name</th>
          <th>Score</th>
          <th>Time</th>
        </tr>

        </thead>
        <tbody>
        {top10}
        </tbody>
       

      </table>
    </div>

    </div>
   
    </>
  )
}
