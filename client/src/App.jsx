import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {Routes,Route} from "react-router-dom"
import Home from './pages/Home';
import Login from "./pages/Login"
import ResetPassword from "./pages/ResetPassword"
import VerifyEmail from "./pages/VerifyEmail"



const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home/>}  />
        <Route path="/login" element={<Login/>} />
        <Route path="/reset-password" element={<ResetPassword/>}  />
        <Route path="/verify-email" element={<VerifyEmail/>}  />
      </Routes>
    </div>
  )
}

export default App