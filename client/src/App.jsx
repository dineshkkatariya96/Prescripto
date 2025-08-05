import React from 'react'
import {Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css'
import About from './pages/About.jsx'
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'
import Doctors from './pages/Doctors.jsx'
import Login from './pages/Login.jsx'
import MyAppointments from './pages/MyAppointments'
import Profile from './pages/Profile.jsx'
import Appointment from './pages/Appointments.jsx'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import CancelPayment from './pages/CancelPayment.jsx';
import CompletePayment from './pages/CompletePayment.jsx';

function App() {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/doctors" element={<Doctors/>}/>
        <Route path="/doctors/:speciality" element={<Doctors/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/my-Profile" element={<Profile/>}/>
        <Route path="/my-appointments" element={<MyAppointments/>}/>
        <Route path="/appointment/:docId" element={<Appointment/>}/>
        <Route path="/complete-payment" element={<CompletePayment/>}/>
        <Route path="/cancel-payment" element={<CancelPayment/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App