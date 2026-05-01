import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { useSelector } from 'react-redux'
import TopicForm from '../components/TopicForm'
import Sidebar from '../components/Sidebar'
import FinalResult from '../components/FinalResult'
import { generateNotes } from '../services/api'
import { updateCrdets } from '../redux/userSlice'

function Notes() {
    const navigate=useNavigate()
    const {userData}=useSelector((state)=>state.user)
    const credits=userData?.credits;
    const [loading,setLoading]=useState(false)
    const [result,setResult]=useState(null)
    const[error,setError]=useState(null)
  return (
    <div>
        <motion.header
        initial={{opacity:0,y:-60}}
        animate={{opacity:1,y:0}}
        transition={{duration:1.5}}

        className='mb-10 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 px-8 py-6 shadow-[0_20px_45px_rgba(0,0,0,0.6)] items-start flex md:items-center justify-between gap-4 flex-col md:flex-row'
        >
            <div onClick={() => navigate("/")} className='cursor-pointer'><h1 className='text-2xl font-bold bg-linear-to-r from-white via-gray-300 to-white bg-clip-text text-transparent'>ExamNotes AI</h1>
        <p className='text-sm text-gray-300 mt-1'>AI-powered exam-oriented notes & revision</p>

        </div>
        <div
        className='flex items-center gap-4 flex-wrap'>
        <button className='flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm' onClick={()=>navigate("/pricing")}>
            <span className='text-xl'>💎</span>
            <span>{credits}</span>
            <motion.span
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.97 }}
              className="ml-2 h-5 w-5 flex items-center justify-center rounded-full bg-white text-xs font-bold text-black"
            >
              ➕

            </motion.span>

        </button>
        <button>

        </button>

        </div>
        </motion.header>
        <motion.div
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.7}}
        className='max-w-3xl mx-auto rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 px-8 py-10 shadow-[0_25px_60px_rgba(0,0,0,0.7)]'
        >
      <TopicForm setResult={setResult} setLoading={setLoading} loading={loading} setError={setError}/>
        </motion.div>

        {loading &&(
          <motion.div
          animate={{opacity:[0.4,1,0.4]}}
          transition={{repeat:Infinity,duration:1.2}}
          className='text-center text-black font-medium mb-6'
          >
            Generating notes, please wait...
          </motion.div>
        )}

        {!result &&<motion.div 
        whileHover={{scale:1.02}}
        className='h-64 rounded-2xl flex flex-col items-center justify-center bg-white/60 backdrop-blur-lg border border-dashed border-gray-300 text-gray-500 shadow-inner'
    
        >
            <span className='text-4xl mb-3 '>📘</span>
            <p className='text-sm'>Generated notes will appear here</p>

        </motion.div>}


        {result && <motion.div
        initial={{opacity:0,y:30}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.4}}
        className='flex flex-col lg:grid lg:grid-cols-4 gap-6'
        >

          <div className='lg:col-span-1'>
            <Sidebar result={result}/> 


          </div>

          <div
          className='lg:col-span-3
          rounded-2xl bg-white shadow-[0_15px_40px_rgba(0,0,0,0.15)] p-6
          '
          >
            <FinalResult result={result}/>
          </div>
          </motion.div>}
    </div>
  )
  
}

export default Notes