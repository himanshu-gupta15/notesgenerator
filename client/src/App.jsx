import React, { useEffect } from 'react'
import Auth from './pages/Auth'
import {BrowserRouter, Routes, Route, useNavigate, Navigate} from 'react-router-dom'
import { getCurrentUser } from './services/api'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/Home'
import History from './pages/History'
import Notes from './pages/Notes'
import Pricing from './pages/Pricing'


export const serverUrl="https://himanshu-gupta15-notesgenerator.vercel.app/"
function App() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  useEffect(()=>{
    getCurrentUser(dispatch)
  },[dispatch])
  const userData=useSelector((state=>state.user.userData))
  console.log(userData)
  return (

   <Routes>
    <Route path='/' element={userData?<Home/>:<Navigate to="/auth" replace/>}/>
    <Route path='/auth' element={userData?<Navigate to="/" replace/>:<Auth/>}/>
     <Route path='/history' element={userData?<History/>:<Navigate to="/auth" replace/>}/>
     <Route path='/notes' element={userData?<Notes/>:<Navigate to="/auth" replace/>}/>
     <Route path='/pricing' element={userData?<Pricing/>:<Navigate to="/auth" replace/>}/>
   </Routes>
  
  )
}

export default App
