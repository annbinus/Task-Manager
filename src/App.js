import React, {useEffect} from 'react';
import "./App.css";
import {
    Routes,
    Route,
  } from 'react-router-dom';

import Home from "./Home";
import SignIn from './SignIn';
import SignUp from './SignUp';

import 'aos/dist/aos.css';
import AOS from 'aos';

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
        <Route exact path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
    );
}
 
export default App;