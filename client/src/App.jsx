import { useState } from 'react'
import { gsap } from "gsap";
import './App.css'
import Hero from './components/Hero';
import {Routes, Route} from 'react-router-dom'
import SignUp from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import CreateTask from './components/dashboard/CreateTask';
import PrivateRoute from './components/PrivateRoute';

function App() {
  

  return (
    <>
      <div>
        <Routes>
         
         <Route path="/" element={<Hero/>} />
         <Route path="/signin" element={<SignIn/>} />
         <Route path="/signup" element={<SignUp/>} />
         <Route  element={<PrivateRoute/>} >
         <Route path="/dashboard/:id" element={<Dashboard/>} />
         <Route path="/create-task" element={<CreateTask/>} />
         </Route>


        </Routes>
        
      </div>
    </>
  )
}

export default App
