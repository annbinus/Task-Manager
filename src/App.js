import React, {useEffect} from 'react';

import './dist/output.css';
import {
    Routes,
    Route,
  } from 'react-router-dom';

import Home from "./Home";
import SignIn from './SignIn';
import SignUp from './SignUp';

import 'aos/dist/aos.css';
import "./dist/output.css";
import AOS from 'aos';
import ResetPassword from './ResetPassword';
import Credits from './Credits';

function App() {
    useEffect(() => {
        AOS.init({
          once: true,
          disable: 'phone',
          duration: 600,
          easing: 'ease-out-sine',
        });
      });

    return(
        <>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/credits" element={<Credits/>} />
      </Routes>
    </>
    );
}
 
export default App;