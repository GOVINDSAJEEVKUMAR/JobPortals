import React from 'react'
import SignUp from './components/SignUp/SignUp'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import {Route,Routes} from "react-router-dom"
import Phone from './components/PhoneVerify/Phone'
import UserDetails from './components/User/UserDetails'
import {Toaster }from "react-hot-toast"
import Nav from './components/Navbar/Nav'
import Employee from './components/Employee/Employee'
import ApplicationPage from './components/Application/ApplicationPage'


const App = () => {
  return (
    <div>
      <Toaster toastOptions= {{duration: 3000}}  position="top-center" />
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/signup'  element={<SignUp />} />
        <Route path="/phone" element={<Phone />} />
        
        <Route element={<Nav/>}/>
        <Route path="/home"  element={<Home />}/>
        <Route path='/details/:_id' element={<UserDetails/>}/>
        <Route path ="/employee" element={<Employee/>}/>
        <Route path="/application/:_Id" element={<ApplicationPage/>}/>

        </Routes>
       

      
      
    </div>
  )
}

export default App


